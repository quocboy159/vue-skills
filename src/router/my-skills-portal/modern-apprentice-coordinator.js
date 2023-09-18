const ROATab = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/employee-details/ROATab.vue'
  )
const ReportsTab = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/employee-details/ReportsTab.vue'
  )
const TraineeTraining = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/employee-details/TraineeTraining.vue'
  )
const TraineeUserProfile = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/employee-details/TraineeUserProfile.vue'
  )
const MACEmployeeDetails = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/MACEmployeeDetails.vue'
  )
const MACEmployees = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/MACEmployees.vue'
  )
const TraineeApprenticeSiteVisits = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/employee-details/TraineeApprenticeSiteVisits.vue'
  )
const TraineeTrainingPlanDetails = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/TraineeTrainingPlanDetails.vue'
  )
const TraineeCourseDetails = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/TraineeCourseDetails.vue'
  )
const TraineeSiteVisitDetails = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/TraineeSiteVisitDetails.vue'
  )
const MACNewSiteVisit = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/site-visit/MACNewSiteVisit.vue'
  )
const MACNewSiteVisitSelectTrainee = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/MACNewSiteVisitSelectTrainee.vue'
  )

const MyCompanyDetails = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/MyCompanyDetails.vue'
  )
const TraineeSearch = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/TraineeSearch.vue'
  )
const MACReports = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/reports/MACReports.vue'
  )
const MyDetails = () =>
  import(
    '../../views/my-skills-portal/modern-apprentice-coordinator/MyDetails.vue'
  )

import SkillsLayout from '../../layouts/SkillsLayout.vue'

import { roles, macRouteNames } from '../../common/constants.js'

const routes = [
  {
    path: '/:label/macoordinator/my-details',
    name: macRouteNames.MY_DETAILS,
    component: MyDetails,
    meta: {
      layout: SkillsLayout,
      title: 'My Details',
      requiresAuth: true,
      role: roles.MA_COORDINATOR,
    },
  },
  {
    name: macRouteNames.TRAINEE_APPRENTICE_VISIT_NEW_SELECT_TRAINEE,
    path: '/:label/macoordinator/sitevisit/create',
    component: MACNewSiteVisitSelectTrainee,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'New Apprentice Visit',
      requiresAuth: true,
      role: roles.MA_COORDINATOR,
    },
  },
  {
    path: '/:label/macoordinator/search',
    name: macRouteNames.TRAINEES_SEARCH,
    component: TraineeSearch,
    meta: {
      layout: SkillsLayout,
      title: 'Trainee Search',
      requiresAuth: true,
      role: roles.MA_COORDINATOR,
    },
  },
  {
    path: '/:label/macoordinator/company-details',
    name: macRouteNames.COMPANY_DETAILS,
    component: MyCompanyDetails,
    meta: {
      layout: SkillsLayout,
      title: 'Update Company Details',
      requiresAuth: true,
      role: roles.MA_COORDINATOR,
    },
  },
  {
    path: '/:label/macoordinator/site-visit-details/:id',
    name: macRouteNames.TRAINEE_SITE_VISIT_DETAILS,
    component: TraineeSiteVisitDetails,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'Site Visit Details',
      requiresAuth: true,
      role: roles.MA_COORDINATOR,
    },
  },
  {
    name: macRouteNames.TRAINEE_APPRENTICE_VISIT_NEW,
    path: '/:label/macoordinator/sitevisit/create/:contactId',
    component: MACNewSiteVisit,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'New Apprentice Visit',
      requiresAuth: true,
      role: roles.MA_COORDINATOR,
    },
  },
  {
    path: '/:label/macoordinator/course-details/:id',
    name: macRouteNames.TRAINEE_COURSE_DETAILS,
    component: TraineeCourseDetails,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'Course Details',
      requiresAuth: true,
      role: roles.MA_COORDINATOR,
    },
  },
  {
    path: '/:label/macoordinator/training-plan-details/:id',
    name: macRouteNames.TRAINEE_TRAINING_PLAN_DETAILS,
    component: TraineeTrainingPlanDetails,
    props: true,
    meta: {
      layout: SkillsLayout,
      title: 'Training Plan Details',
      requiresAuth: true,
      role: roles.MA_COORDINATOR,
    },
  },
  {
    path: '/:label/macoordinator/trainees',
    name: macRouteNames.TRAINEES,
    component: MACEmployees,
    meta: {
      layout: SkillsLayout,
      title: 'Modern Apprentice Coordinator',
      requiresAuth: true,
      role: roles.MA_COORDINATOR,
    },
  },
  {
    path: '/:label/macoordinator/reports',
    name: macRouteNames.REPORTS,
    component: MACReports,
    meta: {
      layout: SkillsLayout,
      title: 'Reports',
      requiresAuth: true,
      role: roles.MA_COORDINATOR,
    },
  },
  {
    path: '/:label/macoordinator/employee-details/:id',
    component: MACEmployeeDetails,
    meta: {
      layout: SkillsLayout,
      title: 'Employee Details',
      requiresAuth: true,
      role: roles.MA_COORDINATOR,
    },
    children: [
      {
        name: macRouteNames.TRAINEE_DETAILS,
        path: '/',
        component: TraineeUserProfile,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.MA_COORDINATOR,
        },
      },
      {
        name: macRouteNames.TRAINEE_DETAILS_TRAINING,
        path: 'employee-details-training',
        component: TraineeTraining,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.MA_COORDINATOR,
        },
      },
      {
        name: macRouteNames.TRAINEE_DETAILS_ROA,
        path: 'employee-details-roa',
        component: ROATab,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.MA_COORDINATOR,
        },
      },
      {
        name: macRouteNames.TRAINEE_DETAILS_REPORTS,
        path: 'employee-details-reports',
        component: ReportsTab,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.MA_COORDINATOR,
        },
      },
      {
        name: macRouteNames.TRAINEE_DETAILS_APPRENTICE_VISIT,
        path: 'apprentice-visits',
        component: TraineeApprenticeSiteVisits,
        props: true,
        meta: {
          layout: SkillsLayout,
          title: 'Employee Details',
          requiresAuth: true,
          role: roles.MA_COORDINATOR,
        },
      },
    ],
  },
]

export default routes
