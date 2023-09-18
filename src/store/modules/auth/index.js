import axios from 'axios'
import { Dialog } from 'quasar'
import {
  PublicClientApplication,
  InteractionRequiredAuthError,
  BrowserAuthError,
} from '@azure/msal-browser'
import router, { redirects } from '@/router/router'

import {
  LOGGED_IN,
  PROVIDER_BUSY,
  CURRENT_USER,
  CURRENT_LABEL,
  REDIRECT_URL,
  LOGGED_OUT,
} from './mutation-types'

import { DEFAULT_WHITE_LABEL } from '../../../common/constants'

const clientId =
  process.env.VUE_APP_AAD_CLIENT_ID || '86d3903c-f0b4-4edb-aa1a-985167e1940f'

const tenantId = process.env.VUE_APP_AAD_TENANT_ID || 'common'

// For graph etc.
// This will require another call the AAD after login request
const accessTokenRequest = {
  scopes: ['calendars.read'],
}

const msalInstance = new PublicClientApplication({
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: `${location.origin}/sign-in-callback`,
    navigateToLoginRequestUrl: false,
  },
  system: {
    iframeHashTimeout: 10000,
    windowHashTimeout: 60000,
    loadFrameTimeout: 0,
  },
})

const initState = {
  providerBusy: false,
  redirectUrl: '',
  currentUser: '',
  currentLabel: DEFAULT_WHITE_LABEL,
}

const mutations = {
  [LOGGED_IN](state, { accessToken, refreshToken }) {
    state.accessToken = accessToken
    state.refreshToken = refreshToken
  },
  [PROVIDER_BUSY](state, busy) {
    state.providerBusy = busy
  },
  [CURRENT_USER](state, email) {
    state.currentUser = email
  },
  [CURRENT_LABEL](state, label) {
    // Only set the label if it is set
    // i.e. label changes should not be triggered on generic views, where label is NULL
    if (label) state.currentLabel = label
  },
  [REDIRECT_URL](state, url) {
    state.redirectUrl = url
  },

  [LOGGED_OUT](state) {
    state.currentUser = ''
  },
}

// Get AAD account from MSAL instance
const getAccount = (username) => msalInstance.getAccountByUsername(username)

// Get AAD tokens from MSAL
const getTokens = async (username) => {
  const account = getAccount(username)

  if (account) {
    const tokenResponse = await msalInstance.acquireTokenSilent({
      ...accessTokenRequest,
      account: getAccount(username),
    })

    const { accessToken, idToken, scopes } = tokenResponse || {}
    return { accessToken, idToken, scopes }
  }

  return {}
}

// Handle login result and redirect user to the post login view
// Fallback if the ?redirectUrl= query not set
// If no redirect/fallback set, it will reload the current route
// It is neccessary to trigger a reload for the UI to be updated with the new state
const handleLogin = (
  { commit, state },
  { tokenResponse, redirectFallback }
) => {
  if (tokenResponse) {
    // Update state
    commit(CURRENT_USER, tokenResponse.account.username)
    // Redirect
    const { redirectUrl } = state
    const next = redirectUrl || redirectFallback
    if (next) router.push(next)
    else router.go()
  }
}

// Try to sign in silently with SSO or cache
// Will throw exception if cannot proceed, so we need to handle the exception accordingly
const signInSilent = async ({ commit, state }) => {
  commit(PROVIDER_BUSY, true)
  const { currentUser } = state
  let tokenResponse

  // Try get token in the cache first
  const account = getAccount(currentUser)
  if (account) {
    tokenResponse = await msalInstance.acquireTokenSilent({
      account,
    })
  }

  // Then from SSO instance (login previously using login.microsoft.com)
  if (!tokenResponse) {
    tokenResponse = await msalInstance.ssoSilent({
      loginHint: currentUser,
    })
  }

  commit(PROVIDER_BUSY, false)
  handleLogin({ state, commit }, { tokenResponse })
}

const actions = {
  // This to handle the authorization code flow redirect from AAD
  handleSignInRedirect({ commit, state }) {
    msalInstance
      .handleRedirectPromise()
      .then((tokenResponse) => {
        if (tokenResponse) {
          const { currentLabel } = state
          handleLogin(
            { commit, state },
            { tokenResponse, redirectFallback: `/${currentLabel}/sign-in` }
          )
        }
      })
      .catch((error) => {
        let { errorMessage, errorCode: code, message } = error
        message = errorMessage || message
        redirects.genericError(code, message)
      })
  },

  async trySignInSilent({ commit, state }) {
    try {
      await signInSilent({ commit, state })
    } catch {
      /* Intentionally ignore the exception because we only just attempt trying to sign in silently */
      commit(PROVIDER_BUSY, false)
    }
  },

  async signInRedirect({ commit, state }) {
    // Try the silent flow first
    try {
      await signInSilent({ commit, state })
    } catch (err) {
      const unhandledError = (err) => {
        Dialog.create({
          title: 'Please sign out and sign back it',
          message:
            err.errorMessage ||
            'We has encountered an issue while signing you in.',
          persistent: true,
        }).onOk(() => {
          msalInstance.logout()
        })
      }

      // If we reach this far then it is not possible to get the tokens silently
      // i.e. the user need to do the interactive login

      if (
        err instanceof InteractionRequiredAuthError ||
        err instanceof BrowserAuthError
      ) {
        try {
          await msalInstance.loginRedirect({
            scopes: [...accessTokenRequest.scopes, 'offline_access'],
          })
        } catch (loginError) {
          unhandledError(loginError)
        }
      } else {
        unhandledError(err)
      }
    }
  },

  async signOut({ commit }) {
    commit(LOGGED_OUT)
    return msalInstance.logout()
  },

  async signUp({ commit }, request) {
    const {
      signUpModel: { userName },
      label,
    } = request
    const url = `api/account/${label}/sign-up`
    await axios({
      method: 'post',
      url: url,
      data: request.signUpModel,
    })
    commit(CURRENT_USER, userName)
    commit(CURRENT_LABEL, label)
  },

  async resendEmail({ state }) {
    const { currentLabel, currentUser } = state
    let url = `api/account/${currentLabel}/resend-invitation?email=${currentUser}`
    return await axios({
      method: 'get',
      url: url,
    })
  },
}

const getters = {
  email: (state) => state.currentUser,
  isAuthenticated: (state) => !!getAccount(state.currentUser),
  currentName: (state) => getAccount(state.currentUser)?.name,
}

// Expose these to access the MSAL instance indirectly
export { getAccount, getTokens }

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
}
