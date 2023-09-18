import axios from 'axios'
import store from '../store'
import { getTokens } from '../store/modules/auth'
import { getB2CTokens } from './b2cAuth'
import * as Sentry from '@sentry/browser'

const axiosInterceptor = {
  setup() {
    axios.interceptors.request.use(
      async (config) => {
        store.dispatch({ type: 'loadSpinning' })

        if (!config.headers['Content-Type']) {
          config.headers['Content-Type'] = 'application/json; charset=utf-8'
        }

        const isSkillsGroupPortal = isSkillsGroupPortalApi(config)
        if (isSkillsGroupPortal) {
          const b2cHomeAccountId = store.state.azureADB2C.b2cCurrentUser
            .homeAccountId
            ? store.state.azureADB2C.b2cCurrentUser.homeAccountId
            : ''
          const tokens = await getB2CTokens(b2cHomeAccountId)
          config.headers['Authorization'] = `Bearer ${tokens.accessToken}`
          const apiBaseUrl = process.env.VUE_APP_ROOT_API
          config.url = `${apiBaseUrl}/${config.url}`
          return config
        } else {
          const apiBaseUrl = process.env.VUE_APP_ROOT_API
          const crmBaseUrl = process.env.VUE_APP_CRM_API
          const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me' // Fixed and not likely to change unless MS is upgrading their stuff
          const { currentUser } = store.state.auth
          let accessToken, idToken

          try {
            const tokens = await getTokens(currentUser)
            accessToken = tokens.accessToken
            idToken = tokens.idToken
          } catch (err) {
            Sentry.captureException(err)
            store.dispatch('auth/signOut')
          }

          // All internal requests should use id_token
          if (idToken) {
            config.headers['Authorization'] = `Bearer ${idToken}`
          }
          if (config.url.indexOf('crm/') >= 0) {
            config.url = `${crmBaseUrl}${config.url.replace('crm/', '')}`
          } else if (config.url.indexOf('api/') >= 0) {
            config.url = `${apiBaseUrl}/${config.url}`
          } else if (config.url.indexOf('graph/') >= 0) {
            config.url = `${GRAPH_ENDPOINT}${config.url.replace('graph/', '/')}`
            // Graph API will use access_token instead
            if (accessToken) {
              config.headers['Authorization'] = `Bearer ${accessToken}`
            }
          }
          return config
        }
      },
      (err) => {
        store.dispatch({ type: 'unloadSpinning' })
        return Promise.reject(err)
      }
    )

    axios.interceptors.response.use(
      function (response) {
        //Clear application error
        store.dispatch({
          type: 'clearApplicationError',
        })

        store.dispatch({ type: 'unloadSpinning' })

        return response
      },
      function (error) {
        Sentry.captureException(error)
        store.dispatch({ type: 'unloadSpinning' })

        if (error.response && error.response.status === 401) {
          if (isSkillsGroupPortalApi(error.response)) {
            store.dispatch('signOut')
          } else {
            store.dispatch('auth/signOut')
          }
        }

        // Do something with response error
        const errorInfo = (error.response && error.response.data) || {
          message: error,
        }

        if (typeof errorInfo !== 'string') {
          errorInfo.config = error.config
        }

        store.dispatch({
          type: 'setApplicationError',
          payload: errorInfo,
        })

        return Promise.reject(error)
      }
    )
  },
}

const isSkillsGroupPortalApi = (config) => {
  return (
    config.url.toLowerCase().indexOf('/skills-portal/') >= 0 ||
    !!config.isSkillsGroupPortal
  )
}

export default axiosInterceptor
