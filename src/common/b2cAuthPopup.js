import {
  PublicClientApplication,
  InteractionRequiredAuthError,
} from '@azure/msal-browser'
import Configs from './b2cConfigs'
import store from '../store'
import router from '@/router/router'
import { success } from './notification'
import jwt_decode from 'jwt-decode'

const b2cMsalInstance = new PublicClientApplication(Configs.msalConfig)

const selectAccount = () => {
  /**
   * See here for more info on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */

  const currentAccounts = b2cMsalInstance.getAllAccounts()

  if (currentAccounts.length === 0) {
    return null
  } else {
    // if (currentAccounts.length > 1) {
    //   // Add your account choosing logic here
    //   console.log("Multiple accounts detected.");
    // }
    return currentAccounts[0]
  }
}

const handleResponse = async (response) => {
  /**
   * To see the full list of response object properties, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
   */

  let tempAcc = null

  if (response !== null && response.account !== null) {
    tempAcc = {}
    tempAcc.homeAccountId = response.account.homeAccountId
    tempAcc.username = response.account.username
    tempAcc.firstName = response.idTokenClaims.given_name
    tempAcc.lastName = response.idTokenClaims.family_name
  } else {
    let b2cAccount = selectAccount()
    if (b2cAccount) {
      const tokens = await getB2CTokens(b2cAccount.homeAccountId)
      var decodedAccessToken = jwt_decode(tokens.accessToken)
      tempAcc = {}
      tempAcc.homeAccountId = b2cAccount.homeAccountId
      tempAcc.username = b2cAccount.username
      tempAcc.firstName = decodedAccessToken.given_name
      tempAcc.lastName = decodedAccessToken.family_name
    } else {
      store.dispatch('signOut')
    }
  }
  if (tempAcc) {
    await store.dispatch('updateB2cCurrentUser', tempAcc)
    await store.dispatch('skills-group-contact/setCRMContact')

    const next = response ? response.state : Configs.loginRequest.state
    router.push(next)
  } else {
    store.dispatch('signOut')
  }
}

const handlePolicyChange = (response, state) => {
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

    b2CsignIn(state)
  } else if (
    response.idTokenClaims['acr'] === Configs.b2cPolicies.names.editProfile
  ) {
    success({
      message:
        'Profile has been updated successfully.<br/>Please sign-in again.',
      html: true,
    })
    b2cMsalInstance.logout()
  }
}

const b2CGetAccount = (homeAccountId) =>
  b2cMsalInstance.getAccountByHomeId(homeAccountId)

const b2CsignIn = async (state) => {
  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */
  Configs.loginRequest.state = state

  return await b2cMsalInstance
    .loginPopup(Configs.loginRequest)
    .then(handleResponse)
    .catch((error) => {
      handleError(error, state)
    })
}

const handleError = (error, state) => {
  // Error handling
  if (error.errorMessage) {
    const cancellationCode = 'AADB2C90091'
    const forgotPasswordCode = 'AADB2C90118'

    // Check for forgot password error
    // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
    if (error.errorMessage.indexOf(forgotPasswordCode) > -1) {
      b2cMsalInstance
        .loginPopup(Configs.b2cPolicies.authorities.forgotPassword)
        .then((response) => handlePolicyChange(response, state))
        .catch((error) => {
          handleError(error, state)
        })
    }

    // when user click cancel button
    if (error.errorMessage.indexOf(cancellationCode) > -1) {
      b2CsignIn(state)
    }
  } else {
    throw error
  }
}

const getB2CTokens = async (homeAccountId) => {
  Configs.tokenRequest.account = b2cMsalInstance.getAccountByHomeId(
    homeAccountId
  )

  return await b2cMsalInstance
    .acquireTokenSilent(Configs.tokenRequest)
    .then((response) => {
      // In case the response from B2C server has an empty accessToken field
      // throw an error to initiate token acquisition
      if (!response.accessToken || response.accessToken === '') {
        throw new InteractionRequiredAuthError()
      }
      return response
    })
    .catch((error) => {
      if (error instanceof InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        return b2cMsalInstance
          .acquireTokenPopup(Configs.tokenRequest)
          .then((response) => {
            return response
          })
          .catch((error) => {
            throw error
          })
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

export { getB2CTokens, b2CsignOut, b2CGetAccount, b2CsignIn }
