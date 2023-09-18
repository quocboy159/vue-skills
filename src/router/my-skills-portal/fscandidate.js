const FSCandidate = () =>
  import('../../views/my-skills-portal/fscandidate/Index.vue')
import SkillsLayout from '../../layouts/SkillsLayout.vue'
const SelfUserProfile = () =>
  import('../../views/my-skills-portal/fscandidate/SelfUserProfile.vue')
const Reports = () =>
  import('../../views/my-skills-portal/fscandidate/Reports.vue')
import { roles, fsCandidateRouteNames } from '../../common/constants.js'

const defaultPath = '/:label/fscandidate'
const routes = [
  {
    path: defaultPath,
    name: fsCandidateRouteNames.INDEX,
    component: FSCandidate,
    meta: {
      layout: SkillsLayout,
      title: 'Financial Services Candidate',
      requiresAuth: true,
      role: roles.FS_CANDIDATE,
    },
  },
  {
    path: `${defaultPath}/my-details`,
    name: fsCandidateRouteNames.MY_DETAILS,
    component: SelfUserProfile,
    meta: {
      layout: SkillsLayout,
      title: 'My Details',
      requiresAuth: true,
      role: roles.FS_CANDIDATE,
    },
  },
  {
    path: `${defaultPath}/reports`,
    name: fsCandidateRouteNames.REPORTS,
    component: Reports,
    meta: {
      layout: SkillsLayout,
      title: 'Reports',
      requiresAuth: true,
      role: roles.FS_CANDIDATE,
    },
  },
]

export default routes
