import {
  PublicClientApplication,
  InteractionRequiredAuthError,
} from '@azure/msal-browser'
import Configs from './b2cConfigs'
import store from '../store'
import router from '@/router/router'
import { success } from './notification'
import * as Sentry from '@sentry/browser'

const b2cMsalInstance = new PublicClientApplication(Configs.msalConfig)

const handleResponse = async (response) => {
  /**
   * To see the full list of response object properties, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
   */
  handlePolicyChange(response)

  if (response && response.account) {
    const account = {
      homeAccountId: response.account.homeAccountId,
      username: response.account.username,
      firstName: response.idTokenClaims.given_name,
      lastName: response.idTokenClaims.family_name,
    }

    await store.dispatch('updateB2cCurrentUser', account)
    const next = response ? response.state : Configs.loginRequest.state

    try {
      await store.dispatch('skills-group-contact/setCRMContact')
    } catch (error) {
      Sentry.captureException(error)
      // if get API fail then sign out
      // store.dispatch('signOut', next)
    }

    router.push(next)

    return
  }

  store.dispatch('signOut')
}

b2cMsalInstance
  .handleRedirectPromise()
  .then((response) => {
    if (response) {
      handleResponse(response)
    }
  })
  .catch((error) => {
    handleError(error, Configs.loginRequest.state)
  })

const handlePolicyChange = (response) => {
  /**
   * We need to reject id tokens that were not issued with the default sign-in policy.
   * "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr").
   * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
   */
  if (
    response.idTokenClaims['tfp'] === Configs.b2cPolicies.names.forgotPassword
  ) {
    success({
      message:
        'Password has been reset successfully.<br/>Please sign-in with your new password.',
      html: true,
    })
    b2CsignIn(Configs.loginRequest.state)
  } else if (
    response.idTokenClaims['tfp'] === Configs.b2cPolicies.names.editProfile
  ) {
    success({
      message:
        'Profile has been updated successfully.<br/>Please sign-in again.',
      html: true,
    })

    store.dispatch('signOut', Configs.loginRequest.state)
  }
}

const isAuthenticated = () => {
  if (!store.state.azureADB2C.b2cCurrentUser.homeAccountId) {
    return false
  }

  const account = b2cMsalInstance.getAccountByHomeId(
    store.state.azureADB2C.b2cCurrentUser.homeAccountId
  )

  return account && account.username
}

const b2CsignIn = (state) => {
  if (state) {
    Configs.loginRequest.state = state
  }

  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */

  b2cMsalInstance.loginRedirect(Configs.loginRequest).catch(() => {})
}

const handleError = (error, state) => {
  // Error handling
  if (error.errorMessage) {
    const cancellationCode = 'AADB2C90091'
    const forgotPasswordCode = 'AADB2C90118'

    // Check for forgot password error
    // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
    if (error.errorMessage.indexOf(forgotPasswordCode) > -1) {
      b2cMsalInstance.loginRedirect(
        Configs.b2cPolicies.authorities.forgotPassword
      )
    }

    // when user click cancel button
    if (error.errorMessage.indexOf(cancellationCode) > -1) {
      b2CsignIn(state)
    }
  } else {
    throw error
  }
}

const getB2CTokens = (homeAccountId) => {
  Configs.tokenRequest.account =
    b2cMsalInstance.getAccountByHomeId(homeAccountId)

  return b2cMsalInstance
    .acquireTokenSilent(Configs.tokenRequest)
    .then((response) => {
      // In case the response from B2C server has an empty accessToken field
      // throw an error to initiate token acquisition
      if (!response.accessToken) {
        throw new InteractionRequiredAuthError()
      }
      return response
    })
    .catch((error) => {
      if (
        error instanceof InteractionRequiredAuthError ||
        error.errorCode === 'silent_sso_error'
      ) {
        // fallback to interaction when silent call fails
        return b2cMsalInstance.acquireTokenRedirect(Configs.tokenRequest)
      } else {
        throw error
      }
    })
}

const b2CsignOut = (homeAccountId, redirectUrl = '') => {
  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */

  if (homeAccountId) {
    const logoutRequest = {
      account: b2cMsalInstance.getAccountByHomeId(homeAccountId),
    }

    if (redirectUrl) {
      logoutRequest.postLogoutRedirectUri = redirectUrl
    }
    b2cMsalInstance.logout(logoutRequest)
  } else {
    b2cMsalInstance.logout()
  }
}

export { getB2CTokens, b2CsignOut, b2CsignIn, isAuthenticated }
