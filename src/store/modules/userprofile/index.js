import * as types from './mutation-types'
import axios from 'axios'

const state = {
  currentScreenWidth: 100,
  userSettings: {
    notificationEmails: [],
  },
  userProfile: {},
  adUserProfile: {},
  crmCurrentUser: {},
}

const actions = {
  clearCRMCurrentUser: ({ commit }) => {
    commit(types.CLEAR_CRM_CURRENT_USER)
  },

  setCRMCurrentUser: ({ commit }, user) => {
    commit(types.SET_CRM_CURRENT_USER, user)
  },

  setScreenWidth: ({ commit }, width) => {
    commit(types.SET_SCREEN_WITH, width)
  },

  // eslint-disable-next-line
  async getAdUserProfile({ commit, dispatch }, request) {
    let url = `api/account/${request.label}/user?email=${encodeURIComponent(
      request.email
    )}`
    return await axios({
      method: 'get',
      url: url,
    }).then((response) => {
      if (response.data && response.status === 200) {
        commit(
          types.GET_AD_USER_PRINCIPAL_NAME,
          response.data.userPrincipalName
        )
        dispatch('getUserProfile', response.data.userPrincipalName)
      }
      return response
    })
  },

  // eslint-disable-next-line
  async addNewNotificationEmail({}, request) {
    // call API
    let url = `api/account/${request.label}/user/add-email-address`
    return await axios({
      method: 'post',
      url: url,
      data: request.addEmailAddressRequest,
    })
    // .then(response => {
    //     if (response.data && response.status === 200) {
    //         commit(types.ADD_NEW_NOTIFICATION_EMAIL, request.addEmailAddressRequest);
    //     }
    // });
  },

  // eslint-disable-next-line
  async deleteNotificationEmail({}, request) {
    // call API
    let url = `api/account/${request.label}/user/delete-email-address`
    return await axios({
      method: 'post',
      url: url,
      data: request.deleteEmailAddressRequest,
    })
  },

  // eslint-disable-next-line
  async setEmailToPrimary({}, request) {
    let url = `api/account/${request.label}/user/update-email-address-to-primary`
    return await axios({
      method: 'put',
      url: url,
      data: request.updateEmailAddressToPrimaryRequest,
    })
  },

  // eslint-disable-next-line
  async verifyEmailNotification({}, request) {
    let url = `api/account/${request.label}/verify-email-notification?code=${request.code}&storedKey=${request.storedKey}`
    await axios({
      method: 'get',
      url: url,
    })
  },

  // eslint-disable-next-line
  async changePassword({}, request) {
    let url = `api/account/${request.label}/user/change-password`
    return await axios({
      method: 'put',
      url: url,
      data: request.changePasswordRequest,
    })
  },

  async getUserProfile({ commit }, upn) {
    // TODO: CRM API need a slash at sufix in url
    let url = `api/contact/${encodeURIComponent(upn + '/')}`
    await axios({
      method: 'get',
      url: url,
    }).then((response) => {
      if (response.data && response.status === 200) {
        commit(types.GET_USER_PROFILE, response.data)
      }
    })
  },

  // eslint-disable-next-line
  async recoverAccount({}, request) {
    let url = `api/contact/${request.label}/recover-account`
    return await axios({
      method: 'post',
      url: url,
      data: { recoveryEmail: request.recoveryEmail },
    })
  },

  async updateContact({ commit }, request) {
    const url = `api/contact/${request.upn}/update-contact`
    await axios({
      method: 'put',
      url: url,
      data: request,
    }).then((response) => {
      if (response.status === 200) {
        commit(types.UPDATE_USER_PROFILE, request)
      }
    })
  },

  async updateRecoveryEmail({ commit }, request) {
    const url = `api/contact/${request.upn}/update-recovery-email`
    await axios({
      method: 'put',
      url: url,
      data: request,
    }).then((response) => {
      if (response.status === 200) {
        commit(types.UPDATE_RECOVERY_EMAIL, request.recoveryEmail)
      }
    })
  },

  async deleteRecoveryEmail({ commit }, request) {
    const url = `api/contact/${request.upn}/delete-recovery-email`
    await axios({
      method: 'delete',
      url: url,
    }).then((response) => {
      if (response.status === 200) {
        commit(types.DELETE_RECOVERY_EMAIL)
      }
    })
  },
}

const mutations = {
  [types.SET_CRM_CURRENT_USER](state, user) {
    state.crmCurrentUser = user
  },

  [types.SET_SCREEN_WITH](state, width) {
    state.currentScreenWidth = width
  },

  [types.ADD_NEW_NOTIFICATION_EMAIL](state, email) {
    state.userSettings.notificationEmails.push(email)
  },

  [types.SET_USER_SETTINGS_NOTIFICATION_EMAILS](state, emails) {
    state.userSettings.notificationEmails = emails
  },

  [types.GET_USER_PROFILE](state, user) {
    state.userProfile = user
  },

  [types.UPDATE_USER_PROFILE](state, data) {
    state.userProfile.dateOfBirth = data.dateOfBirth
    state.userProfile.phoneNumber = data.phoneNumber
  },

  [types.GET_AD_USER_PRINCIPAL_NAME](state, data) {
    state.adUserProfile.userPrincipalName = data
  },

  [types.UPDATE_RECOVERY_EMAIL](state, recoveryEmail) {
    state.userProfile.recoveryEmail = recoveryEmail
  },

  [types.CLEAR_CRM_CURRENT_USER](state) {
    state.crmCurrentUser = {}
  },
}

const getters = {
  notificationEmails: (state) => {
    return [...state.userSettings.notificationEmails] // clone the object instead of returing it directly
  },
  userProfile: (state) => {
    return state.userProfile
  },
  adUserProfile: (state) => {
    return state.adUserProfile
  },
  crmCurrentUser: (state) => {
    return state.crmCurrentUser
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
