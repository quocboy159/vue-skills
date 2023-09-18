const ROATab = () =>
  import(
    '../../views/my-skills-portal/account-manager/employee-details/ROATab.vue'
  )
const ReportsTab = () =>
  import(
    '../../views/my-skills-portal/account-manager/employee-details/ReportsTab.vue'
  )
const TraineeTraining = () =>
  import(
    '../../views/my-skills-portal/account-manager/employee-details/TraineeTraining.vue'
  )
const TraineeUserProfile = () =>
  import(
    '../../views/my-skills-portal/account-manager/employee-details/TraineeUserProfile.vue'
  )
const SelfUserProfile = () =>
  import('../../views/my-skills-portal/account-manager/SelfUserProfile.vue')
const ACEmployeeDetails = () =>
  import('../../views/my-skills-portal/account-manager/ACEmployeeDetails.vue')
const TraineeApprenticeSiteVisits = () =>
  import(
    '../../views/my-skills-portal/account-manager/employee-details/TraineeApprenticeSiteVisits.vue'
  )
const AMTraineeSearch = () =>
  import('../../views/my-skills-portal/account-manager/AMTraineeSearch.vue')
const TraineeSiteVisitDetails = () =>
  import(
    '../../views/my-skills-portal/account-manager/TraineeSiteVisitDetails.vue'
  )
const TraineeCourseDetails = () =>
  import(
    '../../views/my-skills-portal/account-manager/TraineeCourseDetails.vue'
  )
const TraineeTrainingPlanDetails = () =>
  import(
    '../../views/my-skills-portal/account-manager/TraineeTrainingPlanDetails.vue'
  )
const AMNewSiteVisit = () =>
  import(
    '../../views/my-skills-portal/account-manager/site-visit/AMNewSiteVisit.vue'
  )

import SkillsLayout from '../../layouts/SkillsLayout.vue'
import { roles, amRouteNames } from '../../common/constants.js'

const routes = [
  {
    path: '/:label/account-manager/training-plan-details/:id',
    name: amRouteNames.TRAINEE_TRAINING_PLAN_DETAILS,
    component: TraineeTrainingPlanDetails,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'Training Plan Details',
      requiresAuth: true,
      role: roles.SKILLS_ACCOUNT_MANAGER,
    },
  },
  {
    path: '/:label/account-manager/course-details/:id',
    name: amRouteNames.TRAINEE_COURSE_DETAILS,
    component: TraineeCourseDetails,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'Course Details',
      requiresAuth: true,
      role: roles.SKILLS_ACCOUNT_MANAGER,
    },
  },
  {
    path: '/:label/account-manager/site-visit-details/:id',
    name: amRouteNames.TRAINEE_SITE_VISIT_DETAILS,
    component: TraineeSiteVisitDetails,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'Site Visit Details',
      requiresAuth: true,
      role: roles.SKILLS_ACCOUNT_MANAGER,
    },
  },
  {
    name: amRouteNames.TRAINEE_APPRENTICE_VISIT_NEW,
    path: '/:label/account-manager/sitevisit/create/:contactId',
    component: AMNewSiteVisit,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'New Apprentice Visit',
      requiresAuth: true,
      role: roles.SKILLS_ACCOUNT_MANAGER,
    },
  },
  {
    path: '/:label/account-manager/search/',
    name: amRouteNames.TRAINEES_SEARCH,
    component: AMTraineeSearch,
    meta: {
      layout: SkillsLayout,
      title: 'Search',
      requiresAuth: true,
      role: roles.SKILLS_ACCOUNT_MANAGER,
    },
  },
  {
    path: '/:label/account-manager/my-details',
    name: amRouteNames.MY_DETAILS,
    component: SelfUserProfile,
    meta: {
      layout: SkillsLayout,
      title: 'My Details',
      requiresAuth: true,
      role: roles.SKILLS_ACCOUNT_MANAGER,
    },
  },
  {
    path: '/:label/account-manager/employee-details/:id',
    component: ACEmployeeDetails,
    meta: {
      layout: SkillsLayout,
      title: 'Employee Details',
      requiresAuth: true,
      role: roles.SKILLS_ACCOUNT_MANAGER,
    },
    children: [
      {
        name: amRouteNames.TRAINEE_DETAILS,
        path: '/',
        component: TraineeUserProfile,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.SKILLS_ACCOUNT_MANAGER,
        },
      },
      {
        name: amRouteNames.TRAINEE_DETAILS_TRAINING,
        path: 'employee-details-training',
        component: TraineeTraining,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.SKILLS_ACCOUNT_MANAGER,
        },
      },
      {
        name: amRouteNames.TRAINEE_DETAILS_ROA,
        path: 'employee-details-roa',
        component: ROATab,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.SKILLS_ACCOUNT_MANAGER,
        },
      },
      {
        name: amRouteNames.TRAINEE_DETAILS_REPORTS,
        path: 'employee-details-reports',
        component: ReportsTab,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.SKILLS_ACCOUNT_MANAGER,
        },
      },
      {
        name: amRouteNames.TRAINEE_DETAILS_APPRENTICE_VISIT,
        path: 'apprentice-visits',
        component: TraineeApprenticeSiteVisits,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.SKILLS_ACCOUNT_MANAGER,
        },
      },
    ],
  },
]

export default routes
