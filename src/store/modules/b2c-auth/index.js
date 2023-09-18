import * as types from './mutation-types'
import { b2CsignOut } from '../../../common/b2cAuth.js'
import store from '../../index'

const initialState = {
  b2cCurrentUser: {
    username: '',
    homeAccountId: '',
    firstName: '',
    lastName: '',
  },
}

const state = { ...initialState }

const mutations = {
  [types.B2C_CURRENT_USER](state, data) {
    state.b2cCurrentUser = data
  },

  [types.LOGGED_OUT](state, redirectUrl) {
    const homeAccountId = state.b2cCurrentUser.homeAccountId
    state.b2cCurrentUser = initialState.b2cCurrentUser
    store.dispatch('skills-group-contact/resetCRMContact')
    b2CsignOut(homeAccountId, redirectUrl)
  },
}

const actions = {
  updateB2cCurrentUser({ commit }, data) {
    commit(types.B2C_CURRENT_USER, data)
  },

  signOut({ commit }, redirectUrl) {
    commit(types.LOGGED_OUT, redirectUrl)
  },
}

const getters = {
  b2cCurrentUser: (state) => {
    return { ...state.b2cCurrentUser }
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
