import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {
  authModule,
  userProfileModule,
  applicationModule,
  calendarModule,
  contactModule,
  skillsGroupContactModule,
  skillsGroupApplicationModule,
  azureADB2CModule,
} from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    userProfile: userProfileModule,
    application: applicationModule,
    calendar: calendarModule,
    contact: contactModule,
    'skills-group-contact': skillsGroupContactModule,
    'skills-group-application': skillsGroupApplicationModule,
    azureADB2C: azureADB2CModule,
  },
  plugins: [
    createPersistedState({
      key: 'skills-portal-v2',
      paths: [
        'auth.currentUser',
        'auth.currentLabel',
        'auth.redirectUrl',
        'userProfile.crmCurrentUser',
        'azureADB2C.b2cCurrentUser',
        'skills-group-contact.contact',
        'skills-group-application.application',
      ],
    }),
  ],
})

export default store
