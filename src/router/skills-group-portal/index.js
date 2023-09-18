const MyDashboard = () =>
  import('../../views/skills-group-portal/MyDashboard.vue')
const MyProfile = () => import('../../views/skills-group-portal/MyProfile.vue')
const Application = () =>
  import('../../views/skills-group-portal/recognition/Application.vue')
const PaymentResponse = () =>
  import('../../views/skills-group-portal/recognition/PaymentResponse.vue')
const WellbeingProviderOnboarding = () =>
  import('../../views/skills-group-portal/WellbeingProviderOnboardingV2.vue')
const SkillsGroupPortalLayout = () =>
  import('../../layouts/SkillsGroupPortalLayout.vue')
const SkillsGroupPortalAnonymousLayout = () =>
  import('../../layouts/SkillsGroupPortalAnonymousLayout.vue')
import {
  SkillsGroupPortalRouteNames,
  SKILLS_DASH_BOARD,
} from '../../common/constants.js'
import B2CSignIn from '../../views/B2CSignIn.vue'

const routes = [
  {
    path: `${SKILLS_DASH_BOARD}/wellbeing-provider-onboarding`,
    name: SkillsGroupPortalRouteNames.WELLBEING_PROVIDER_ONBOARDING,
    component: WellbeingProviderOnboarding,
    meta: {
      layout: SkillsGroupPortalLayout,
      title: 'Wellbeing Provider Onboarding',
      requiresAuth: true,
      isSkillsGroupPortal: true,
    },
  },
  {
    path: `${SKILLS_DASH_BOARD}/payment-response/:applicationId?`,
    name: 'payment-response',
    component: PaymentResponse,
    meta: {
      layout: SkillsGroupPortalAnonymousLayout,
      title: 'Payment response',
      requiresAuth: true,
      isSkillsGroupPortal: true,
    },
  },
  {
    path: `${SKILLS_DASH_BOARD}/recognition/application/:id?`,
    name: SkillsGroupPortalRouteNames.RECOGNITION_APPLICATION,
    component: Application,
    meta: {
      layout: SkillsGroupPortalLayout,
      title: 'Application',
      requiresAuth: true,
      isSkillsGroupPortal: true,
    },
  },
  {
    path: SKILLS_DASH_BOARD,
    name: SkillsGroupPortalRouteNames.HOME,
    component: MyDashboard,
    meta: {
      layout: SkillsGroupPortalLayout,
      title: 'My Dashboard',
      requiresAuth: true,
      isSkillsGroupPortal: true,
    },
  },
  {
    path: `${SKILLS_DASH_BOARD}/dashboard`,
    name: SkillsGroupPortalRouteNames.MY_DASHBOARD,
    component: MyDashboard,
    meta: {
      layout: SkillsGroupPortalLayout,
      title: 'My Dashboard',
      requiresAuth: true,
      isSkillsGroupPortal: true,
    },
  },
  {
    path: `${SKILLS_DASH_BOARD}/my-profile`,
    name: SkillsGroupPortalRouteNames.MY_PROFILE,
    component: MyProfile,
    meta: {
      layout: SkillsGroupPortalLayout,
      title: 'My Profile',
      requiresAuth: true,
      isSkillsGroupPortal: true,
    },
  },
  {
    path: `${SKILLS_DASH_BOARD}/b2c-sign-in`,
    name: SkillsGroupPortalRouteNames.B2C_SIGNIN,
    component: B2CSignIn,
    meta: {
      layout: SkillsGroupPortalAnonymousLayout,
      title: 'Signing in...',
      isSkillsGroupPortal: true,
    },
  },
]

export default routes
