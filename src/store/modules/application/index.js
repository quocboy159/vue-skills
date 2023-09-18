import * as types from './mutation-types.js'

const state = {
  currentRole: null,
  contactId: '',
  applicationError: {
    message: null,
    statusCode: null,
    errors: [],
  },
  isLoadSpining: false,
}

const actions = {
  setCurrentRole({ commit }, value) {
    commit(types.SET_CURRENT_ROLE, value)
  },

  setContactId({ commit }, value) {
    commit(types.SET_CONTACT_ID, value)
  },

  setApplicationError({ commit }, error) {
    commit(types.SET_APPLICATION_ERROR, error)
  },

  clearApplicationError({ commit }) {
    commit(types.CLEAR_APPLICATION_ERROR)
  },

  loadSpinning({ commit }) {
    commit(types.LOAD_SPINNING)
  },

  unloadSpinning({ commit }) {
    commit(types.UNLOAD_SPINNING)
  },
}

const mutations = {
  [types.SET_CURRENT_ROLE](state, value) {
    state.currentRole = value
  },

  [types.SET_CONTACT_ID](state, value) {
    state.contactId = value
  },

  [types.SET_APPLICATION_ERROR](state, error) {
    state.applicationError = error.payload
  },

  [types.CLEAR_APPLICATION_ERROR](state) {
    state.applicationError = {
      message: null,
      statusCode: null,
      errors: [],
    }
  },

  [types.LOAD_SPINNING](state) {
    state.isLoadSpining = true
  },

  [types.UNLOAD_SPINNING](state) {
    state.isLoadSpining = false
  },
}

const getters = {
  contactId: (state) => state.contactId,
  currentRole: (state) => state.currentRole,
  applicationError: (state) => state.applicationError,
  isLoadSpining: (state) => state.isLoadSpining,
}

export default {
  state,
  getters,
  actions,
  mutations,
}
