import {
  traineeRouteNames,
  employerRouteNames,
  amRouteNames,
  macRouteNames,
  fsCandidateRouteNames,
  FinancialServiceAssessorRouteNames,
} from './constants.js'

export const HttpStatusCode = {
  Forbidden: 403,
}

export const Roles = {
  TRAINEE: {
    value: 0,
    description: 'Trainee',
    routerName: traineeRouteNames.TRAINEE,
  },
  EMPLOYER: {
    value: 1,
    description: 'Employer',
    routerName: employerRouteNames.TRAINEES,
  },
  FSCANDIDATE: {
    value: 2,
    description: 'Financial Services Candidate',
    routerName: fsCandidateRouteNames.INDEX,
  },
  FSASSESSOR: {
    value: 3,
    description: 'Financial Services Accessor',
    routerName: FinancialServiceAssessorRouteNames.INDEX,
  },
  MACOORDINATOR: {
    value: 4,
    description: 'Modern Apprentice Coordinator',
    routerName: macRouteNames.TRAINEES,
  },
  STAFF: { value: 5, description: 'Staff', routerName: '' },
  SKILLSACCOUNTMANAGER: {
    value: 6,
    description: 'Skills Account Manager',
    routerName: amRouteNames.TRAINEES_SEARCH,
  },
  PROVIDER: { value: 7, description: 'Provider', routerName: '' },
  WEBMOODLE: { value: 8, description: 'Web Moodle', routerName: '' },
  ASSESSOR: { value: 9, description: 'Accessor', routerName: '' },
  EASSESS: { value: 10, description: 'Eassess', routerName: '' },
}
