const FSAccessor = () =>
  import('../../views/my-skills-portal/fsaccessor/Index.vue')
import SkillsLayout from '../../layouts/SkillsLayout.vue'
const SelfUserProfile = () =>
  import('../../views/my-skills-portal/fsaccessor/SelfUserProfile.vue')
import {
  FinancialServiceAssessorRouteNames,
  roles,
} from '../../common/constants.js'

const defaultPath = '/:label/fsaccessor'
const routes = [
  {
    path: defaultPath,
    name: FinancialServiceAssessorRouteNames.INDEX,
    component: FSAccessor,
    meta: {
      layout: SkillsLayout,
      title: 'Financial Services Assessor',
      requiresAuth: true,
      role: roles.FS_ASSESSOR,
    },
  },
  {
    path: `${defaultPath}/my-details`,
    name: FinancialServiceAssessorRouteNames.MY_DETAILS,
    component: SelfUserProfile,
    meta: {
      layout: SkillsLayout,
      title: 'My Details',
      requiresAuth: true,
      role: roles.FS_ASSESSOR,
    },
  },
]

export default routes
