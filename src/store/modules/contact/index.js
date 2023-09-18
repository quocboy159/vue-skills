import * as types from './mutation-types'
import Utilities from '../../../common/utilities.js'

const state = {
  contact: {},
}

const actions = {
  updateCRMContact({ commit }, data) {
    commit(types.UPDATE_CONTACT, data)
  },
}

const mutations = {
  [types.UPDATE_CONTACT](state, data) {
    state.contact = data
  },
}

const getters = {
  contact: (state) => {
    return Utilities.cloneContact(state.contact)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
