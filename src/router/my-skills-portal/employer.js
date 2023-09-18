const ROATab = () =>
  import('../../views/my-skills-portal/employer/employee-details/ROATab.vue')
const ReportsTab = () =>
  import(
    '../../views/my-skills-portal/employer/employee-details/ReportsTab.vue'
  )
const TraineeTraining = () =>
  import(
    '../../views/my-skills-portal/employer/employee-details/TraineeTraining.vue'
  )
const TraineeUserProfile = () =>
  import(
    '../../views/my-skills-portal/employer/employee-details/TraineeUserProfile.vue'
  )
const SelfUserProfile = () =>
  import('../../views/my-skills-portal/employer/SelfUserProfile.vue')
const MyCompanyDetails = () =>
  import('../../views/my-skills-portal/employer/MyCompanyDetails.vue')
const TraineeReports = () =>
  import('../../views/my-skills-portal/employer/TraineeReports.vue')
const EmployeeDetails = () =>
  import('../../views/my-skills-portal/employer/EmployeeDetails.vue')
const Employer = () =>
  import('../../views/my-skills-portal/employer/Employer.vue')
const TraineeCourseDetails = () =>
  import('../../views/my-skills-portal/employer/TraineeCourseDetails.vue')
const TraineeTrainingPlanDetails = () =>
  import('../../views/my-skills-portal/employer/TraineeTrainingPlanDetails.vue')
const EmployerTraineeSearch = () =>
  import('../../views/my-skills-portal/employer/EmployerTraineeSearch.vue')
const Resources = () =>
  import('../../views/my-skills-portal/employer/Resources.vue')

import SkillsLayout from '../../layouts/SkillsLayout.vue'

import { roles, employerRouteNames } from '../../common/constants.js'

const routes = [
  {
    path: '/:label/employer/company-details',
    name: employerRouteNames.COMPANY_DETAILS,
    component: MyCompanyDetails,
    meta: {
      layout: SkillsLayout,
      title: 'Update Company Details',
      requiresAuth: true,
      role: roles.EMPLOYER,
    },
  },
  {
    path: '/:label/employer/trainees',
    name: employerRouteNames.TRAINEES,
    component: Employer,
    meta: {
      layout: SkillsLayout,
      title: 'Employer',
      requiresAuth: true,
      role: roles.EMPLOYER,
    },
  },
  {
    path: '/:label/employer/search',
    name: employerRouteNames.TRAINEES_SEARCH,
    component: EmployerTraineeSearch,
    meta: {
      layout: SkillsLayout,
      title: 'Trainee Search',
      requiresAuth: true,
      role: roles.EMPLOYER,
    },
  },
  {
    path: '/:label/employer/resources',
    name: employerRouteNames.RESOURCES,
    component: Resources,
    meta: {
      layout: SkillsLayout,
      title: 'Redirect',
      requiresAuth: true,
      role: roles.EMPLOYER,
    },
  },
  {
    path: '/:label/employer/training-plan-details/:id',
    name: employerRouteNames.TRAINING_PLAN_DETAILS,
    component: TraineeTrainingPlanDetails,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'Training Plan Details',
      requiresAuth: true,
      role: roles.EMPLOYER,
    },
  },
  {
    path: '/:label/employer/course-details/:id',
    name: employerRouteNames.COURSE_DETAILS,
    component: TraineeCourseDetails,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'Course Details',
      requiresAuth: true,
      role: roles.EMPLOYER,
    },
  },
  {
    path: '/:label/employer/reports',
    name: employerRouteNames.REPORTS,
    component: TraineeReports,
    meta: {
      layout: SkillsLayout,
      title: 'Reports',
      requiresAuth: true,
      role: roles.EMPLOYER,
    },
  },
  {
    path: '/:label/employer/my-details',
    name: employerRouteNames.MY_DETAILS,
    component: SelfUserProfile,
    meta: {
      layout: SkillsLayout,
      title: 'My Details',
      requiresAuth: true,
      role: roles.EMPLOYER,
    },
  },
  {
    path: '/:label/employer/employee-details/:id',
    component: EmployeeDetails,
    meta: {
      layout: SkillsLayout,
      title: 'Employee Details',
      requiresAuth: true,
      role: roles.EMPLOYER,
    },
    children: [
      {
        name: employerRouteNames.TRAINEE_DETAILS,
        path: '/',
        component: TraineeUserProfile,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.EMPLOYER,
        },
      },
      {
        name: employerRouteNames.TRAINEE_DETAILS_TRAINING,
        path: 'employee-details-training',
        component: TraineeTraining,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.EMPLOYER,
        },
      },
      {
        name: employerRouteNames.TRAINEE_DETAILS_ROA,
        path: 'employee-details-roa',
        component: ROATab,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.EMPLOYER,
        },
      },
      {
        name: employerRouteNames.TRAINEE_DETAILS_REPORTS,
        path: 'employee-details-reports',
        component: ReportsTab,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.EMPLOYER,
        },
      },
    ],
  },
]

export default routes
