import * as types from './mutation-types'

const state = {
  isSaveApplicationSuccess: false,
  isIndustryTypeCodeNotValidError: false,
  isSavePaymentUnsuccess: false,
  approvedPaymentInfo: {
    applicationId: null,
    industryTypeCode: null,
  },
  unknownPaymentInfo: {
    applicationId: null,
    industryTypeCode: null,
  },
  completeApplicationInfo: {
    applicationId: null,
    industryTypeCode: null,
  },
}

const actions = {
  setEventSavePaymentUnsuccess: ({ commit }, unsuccess) => {
    commit(types.SET_EVENT_PAYMENT_UNSUCCESS, unsuccess)
  },

  setEventSaveApplicationSuccess: ({ commit }, success) => {
    commit(types.SET_EVENT_SAVE_APPLICATION_SUCCESS, success)
  },

  setIndustryTypeCodeNotValidError: ({ commit }, data) => {
    commit(types.SET_INDUSTRY_TYPE_CODE_NOT_VALID_ERROR, data)
  },
  commitApprovedPaymentInfo: ({ commit }, data) => {
    commit(types.COMMIT_APPROVED_PAYMENT_INFO, data)
  },
  commitUnknownPaymentInfo: ({ commit }, data) => {
    commit(types.COMMIT_UNKNOWN_PAYMENT_INFO, data)
  },
  commitCompleteApplicationInfo: ({ commit }, data) => {
    commit(types.COMMIT_COMPLETE_APPLICATION_INFO, data)
  },
}

const mutations = {
  [types.SET_EVENT_PAYMENT_UNSUCCESS](state, unsuccess) {
    state.isSavePaymentUnsuccess = unsuccess
  },

  [types.SET_EVENT_SAVE_APPLICATION_SUCCESS](state, success) {
    state.isSaveApplicationSuccess = success
  },

  [types.SET_INDUSTRY_TYPE_CODE_NOT_VALID_ERROR](state, data) {
    state.isIndustryTypeCodeNotValidError = data
  },
  [types.COMMIT_APPROVED_PAYMENT_INFO](state, data) {
    state.approvedPaymentInfo = data
  },
  [types.COMMIT_UNKNOWN_PAYMENT_INFO](state, data) {
    state.unknownPaymentInfo = data
  },
  [types.COMMIT_COMPLETE_APPLICATION_INFO](state, data) {
    state.completeApplicationInfo = data
  },
}

const getters = {
  isSavePaymentUnsuccess: (state) => {
    return state.isSavePaymentUnsuccess
  },

  isSaveApplicationSuccess: (state) => {
    return state.isSaveApplicationSuccess
  },

  isIndustryTypeCodeNotValidError: (state) =>
    state.isIndustryTypeCodeNotValidError,

  approvedPaymentInfo: (state) => {
    return state.approvedPaymentInfo
  },
  unknownPaymentInfo: (state) => {
    return state.unknownPaymentInfo
  },
  completeApplicationInfo: (state) => {
    return state.completeApplicationInfo
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
