/* eslint-disable no-console */
import { LogLevel } from '@azure/msal-browser'
import * as Sentry from '@sentry/browser'

const apiBaseUrl = `https://${process.env.VUE_APP_AAD_DOMAIN}/${process.env.VUE_APP_B2C_SKILLS_GROUP_PORTAL_API}`
const apiConfig = {
  b2cScopes: [`${apiBaseUrl}/read`, `${apiBaseUrl}/write`],
}

const b2cPolicies = {
  names: {
    signUpSignIn: process.env.VUE_APP_B2C_SIGNUP_SIGNIN_POLICY_ID,
    forgotPassword: process.env.VUE_APP_B2C_PASSWORD_RESET_POLICY_ID,
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${process.env.VUE_APP_B2C_AUTHORITY_DOMAIN}/${process.env.VUE_APP_AAD_DOMAIN}/${process.env.VUE_APP_B2C_SIGNUP_SIGNIN_POLICY_ID}`,
    },
    forgotPassword: {
      authority: `https://${process.env.VUE_APP_B2C_AUTHORITY_DOMAIN}/${process.env.VUE_APP_AAD_DOMAIN}/${process.env.VUE_APP_B2C_PASSWORD_RESET_POLICY_ID}`,
    },
  },
  authorityDomain: process.env.VUE_APP_B2C_AUTHORITY_DOMAIN,
}

const msalConfig = {
  auth: {
    clientId: process.env.VUE_APP_B2C_SKILLS_GROUP_PORTAL_SITE_CLIENT_ID,
    authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose sign-up/sign-in user-flow as your default.
    validateAuthority: false,
    knownAuthorities: [
      b2cPolicies.authorityDomain,
      'https://login.microsoftonline.com/common',
    ], // You must identify your tenant's domain as a known authority.
    redirectUri: process.env.VUE_APP_B2C_REDIRECT_URI, // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
    postLogoutRedirectUri: process.env.VUE_APP_B2C_POST_LOG_OUT_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'localStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO.
    storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            Sentry.captureMessage('error:' + message)
            console.error(message)
            return
          case LogLevel.Info:
            // console.info(message)
            return
          case LogLevel.Verbose:
            // console.debug(message)
            return
          case LogLevel.Warning:
            // console.warn(message)
            return
        }
      },
    },
  },
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const loginRequest = {
  scopes: ['openid', ...apiConfig.b2cScopes],
}

const tokenRequest = {
  scopes: [...apiConfig.b2cScopes],
}

export default {
  b2cPolicies,
  msalConfig,
  loginRequest,
  tokenRequest,
}
