const MyTrainingPlanDetails = () =>
  import('../../views/my-skills-portal/trainee/MyTrainingPlanDetails.vue')
const MyROA = () => import('../../views/my-skills-portal/trainee/MyROA.vue')
const MyReports = () =>
  import('../../views/my-skills-portal/trainee/MyReports.vue')
const MyTraining = () =>
  import('../../views/my-skills-portal/trainee/MyTraining.vue')
const SelfUserProfile = () =>
  import('../../views/my-skills-portal/trainee/SelfUserProfile.vue')
const IndustryStandardsLink = () =>
  import('../../views/my-skills-portal/trainee/links/IndustryStandardsLink.vue')
const MyCourseDetails = () =>
  import('../../views/my-skills-portal/trainee/MyCourseDetails.vue')
import Resources from '../../views/my-skills-portal/trainee/Resources.vue'

import SkillsLayout from '../../layouts/SkillsLayout.vue'

import { traineeRouteNames, roles } from '../../common/constants.js'

const routes = [
  {
    path: '/:label/trainee/course/:id',
    name: traineeRouteNames.COURSE_DETAILS,
    component: MyCourseDetails,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'Course Details',
      requiresAuth: true,
      role: roles.TRAINEE,
    },
  },
  {
    path: '/:label/trainee/links/industrystandards',
    name: traineeRouteNames.INDUSTRY_STANDARDS_LINK,
    component: IndustryStandardsLink,
    meta: {
      layout: SkillsLayout,
      title: 'Industry Standards',
      requiresAuth: true,
      role: roles.TRAINEE,
    },
  },
  {
    path: '/:label/trainee/resources',
    name: traineeRouteNames.RESOURCES,
    component: Resources,
    meta: {
      layout: SkillsLayout,
      title: 'Resources',
      requiresAuth: true,
      role: roles.TRAINEE,
    },
  },
  {
    path: '/:label/trainee/reports',
    name: traineeRouteNames.REPORTS,
    component: MyReports,
    meta: {
      layout: SkillsLayout,
      title: 'Reports',
      requiresAuth: true,
      role: roles.TRAINEE,
    },
  },
  {
    path: '/:label/trainee/trainingplan/:id',
    name: traineeRouteNames.TRAINING_PLAN_DETAILS,
    component: MyTrainingPlanDetails,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'Training Plan Details',
      requiresAuth: true,
      role: roles.TRAINEE,
    },
  },
  {
    path: '/:label/trainee',
    name: traineeRouteNames.TRAINEE,
    component: MyTraining,
    meta: {
      layout: SkillsLayout,
      title: 'Trainee',
      requiresAuth: true,
      role: roles.TRAINEE,
    },
  },
  {
    path: '/:label/trainee/my-roa',
    name: traineeRouteNames.MY_ROA,
    component: MyROA,
    meta: {
      layout: SkillsLayout,
      title: 'MyROA',
      requiresAuth: true,
      role: roles.TRAINEE,
    },
  },
  {
    path: '/:label/trainee/my-details',
    name: traineeRouteNames.MY_DETAILS,
    component: SelfUserProfile,
    meta: {
      layout: SkillsLayout,
      title: 'My Details',
      requiresAuth: true,
      role: roles.TRAINEE,
    },
  },
]

export default routes
