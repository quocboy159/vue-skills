import Settings from '../views/Settings.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'
import FontStyles from '../views/FontStyles.vue'
import Logout from '../views/Logout.vue'
import SignInCallback from '../views/SignInCallback.vue'
import GenericError from '../compoments/error/GenericError.vue'
import Welcome from '../views/Welcome.vue'
import ChooseUsername from '../views/ChooseUsername.vue'

import UserSettingsLayout from '../layouts/UserSettingsLayout.vue'
import SmallCenteredLayout1 from '../layouts/SmallCenteredLayout1.vue'
import SkillsLayout from '../layouts/SkillsLayout.vue'
import SkillsNoMenuLayout from '../layouts/SkillsNoMenuLayout.vue'

import {
  DEFAULT_WHITE_LABEL,
  CHOOSE_USERNAME_NAME,
} from '../common/constants.js'

const routes = [
  {
    path: '/:label/choose-username',
    name: CHOOSE_USERNAME_NAME,
    component: ChooseUsername,
    meta: {
      layout: SkillsLayout,
      title: 'Choose Username',
      requiresAuth: true,
    },
  },
  {
    path: '/',
    redirect: `${DEFAULT_WHITE_LABEL}/welcome`,
  },
  {
    path: '/:label/welcome',
    name: 'welcome',
    component: Welcome,
    meta: {
      layout: SkillsNoMenuLayout,
      title: 'Welcome',
    },
  },
  {
    path: '/:label/home',
    name: 'home',
    component: Home,
    meta: {
      layout: SkillsLayout,
      title: 'Home',
      requiresAuth: true,
    },
  },

  {
    path: '/:label/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: {
      layout: SmallCenteredLayout1,
      title: 'Sign Up',
    },
  },
  {
    path: '/:label/sign-in',
    name: 'sign-in',
    component: SignIn,
    meta: {
      layout: SmallCenteredLayout1,
      title: 'Sign In',
    },
  },
  {
    path: '/:label/settings',
    name: 'settings',
    component: Settings,
    meta: {
      layout: UserSettingsLayout,
      title: 'Settings',
      requiresAuth: true,
    },
  },
  {
    path: '/:label/font-styles',
    name: 'FontStyles',
    component: FontStyles,
    meta: {
      title: 'Font Styles',
    },
  },
  {
    path: '/:label/logout',
    name: 'logout',
    component: Logout,
    meta: {
      layout: UserSettingsLayout,
      title: 'Logout',
      requiresAuth: true,
    },
  },
  {
    path: '/error/:code/:message',
    props: true,
    name: 'generic-error',
    component: GenericError,
    meta: {
      layout: UserSettingsLayout,
      title: 'Something has gone wrong',
    },
  },
  {
    path: '/sign-in-callback',
    name: 'sign-in-callback',
    component: SignInCallback,
    meta: {
      layout: SmallCenteredLayout1,
      title: 'Signing in...',
    },
  },
]

export default routes
