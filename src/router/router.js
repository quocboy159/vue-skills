import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { getAccount } from '../store/modules/auth'

import SkillsGroupRoutes from './skills-group-portal/index.js'
import MySkillsRoutes from './my-skills-portal/index.js'
import SharingRoutes from '../router/sharing.js'
import {
  CHOOSE_USERNAME_NAME,
  DEFAULT_WHITE_LABEL,
  HOME,
} from '../common/constants.js'
import { isAuthenticated } from '../common/b2cAuth.js'
import {
  WhitelabelConfig,
  SkillsGroupPortalWhiteLabelConfiguration,
} from '../whitelabel/configuration'
const allroutes = [...SkillsGroupRoutes, ...MySkillsRoutes, ...SharingRoutes]

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: allroutes,
})

export default router

router.beforeEach((to, from, next) => {
  const isRequiredAuthRoute = to.matched.some(
    (record) => record.meta.requiresAuth
  )

  if (isRequiredAuthRoute) {
    if (to.meta.isSkillsGroupPortal) {
      if (!isAuthenticated()) {
        let url = `/skills-group/b2c-sign-in?redirectUrl=${encodeURIComponent(
          to.fullPath
        )}`
        if (to.params.label) {
          url = `/${to.params.label}${url}`
        }

        return next(url)
      }

      return next()
    } else {
      const label = to.params.label || DEFAULT_WHITE_LABEL
      const currentAccount = getAccount(store.state.auth.currentUser)
      if (!currentAccount) {
        return next(`/${label}/sign-in?redirectUrl=${to.path}`)
      }

      if (to.name === CHOOSE_USERNAME_NAME) {
        return next()
      }

      // if crmCurrentUser is empty then redirect to home to choose user page to possible get current user
      const crmCurrentUser = store.state.userProfile.crmCurrentUser
      if (!Object.keys(crmCurrentUser).length) {
        return next(`/${label}/choose-username`)
      }

      // prevent the current user is possible access right page by their roles
      if (
        Object.keys(crmCurrentUser).length &&
        !crmCurrentUser.roles.some((x) => x === to.meta.role) &&
        to.name !== HOME
      ) {
        return next(`/${label}/${HOME}`)
      }
    }
  }

  next()
})

router.afterEach((to) => {
  // change icon
  const whitelabel = to.params.label?.toLocaleLowerCase()
  if (whitelabel) {
    const favicon = document.getElementById('favicon')

    if (to.meta?.isSkillsGroupPortal) {
      const config = SkillsGroupPortalWhiteLabelConfiguration[whitelabel]
      if (config) {
        favicon.href = config.favicon
      }
    } else {
      const config = WhitelabelConfig[whitelabel]
      if (config) {
        favicon.href = config.favicon
      }
    }
  }

  // change title
  document.title = to.meta.title || 'Skills'

  store.dispatch({
    type: 'clearApplicationError',
  })

  if (to.meta.role || to.meta.role >= 0) {
    store.dispatch('setCurrentRole', to.meta.role)
  }
})

export const redirects = {
  genericError: (code, message) => {
    router.push({
      name: 'generic-error',
      params: {
        code,
        message,
      },
    })
  },
}
