import * as types from './mutation-types'
import ContactApi from '../../../../apis/skills-group-portal/contactApi'
import store from '@/store'

const initialState = {
  contact: {},
  isSetContactCRMFail: false,
}

const state = {
  ...initialState,
}

const actions = {
  setIsSetContactCRMFail: ({ commit }, value) => {
    commit(types.SET_CRM_CONTACT_FAIL, value)
  },

  resetCRMContact: ({ commit }) => {
    commit(types.RESET_CRM_CONTACT)
  },

  setCRMContact: async ({ commit }) => {
    commit(types.SET_CRM_CONTACT_FAIL, false)

    try {
      const request = {
        firstName: store.state.azureADB2C.b2cCurrentUser.firstName,
        lastName: store.state.azureADB2C.b2cCurrentUser.lastName,
        primaryEmail: store.state.azureADB2C.b2cCurrentUser.username,
        targetCRM: +process.env.VUE_APP_TARGET_CRM,
      }
      const result = await ContactApi.getContactByEmail(request)
      const contact = result.data

      commit(types.SET_CRM_CONTACT, contact)
    } catch (error) {
      commit(types.SET_CRM_CONTACT_FAIL, true)
      throw error
    }
  },

  updateCRMContact: async ({ commit }, request) => {
    const result = await ContactApi.putContact(request)
    const contact = result.data

    commit(types.SET_CRM_CONTACT, contact)
  },
}

const mutations = {
  [types.SET_CRM_CONTACT_FAIL](state, isFail) {
    state.isSetContactCRMFail = isFail
  },

  [types.SET_CRM_CONTACT](state, contact) {
    state.contact = contact
  },

  [types.RESET_CRM_CONTACT](state) {
    state.contact = initialState.contact
  },
}

const getters = {
  contact: (state) => {
    return state.contact
  },

  isSetContactCRMFail: (state) => {
    return state.isSetContactCRMFail
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
