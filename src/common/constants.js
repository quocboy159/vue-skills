export const WELLBEING_PROVIDER_ONBOARDING_UPDATE_EVENT =
  'WellbeingProviderOnboardingValidateEvent'
export const WELLBEING_PROVIDER_ONBOARDING_VALIDATE_EVENT =
  'WellbeingProviderOnboardingValidateEvent'
export const APPLICATION_DRIVE_NAME =
  process.env.VUE_APP_APPLICATION_DRIVE_NAME || 'Application'
export const CONTACT_DRIVE_NAME =
  process.env.VUE_APP_CONTACT_DRIVE_NAME || 'Contact'
export const SKILLS_DASH_BOARD = '/:label?/skills-group'
export const DDMMYYY = 'DD/MM/YYYY'
export const DDMMYYYHMM = 'DD/MM/YYYY h:mm'
export const DEFAULT_WHITE_LABEL = 'skills'
export const CANDIDATE_HANDBOOK = 'CandidateHandbook'
export const CHOOSE_USERNAME_NAME = 'ChooseUsername'
export const HOME = 'home'
export const SKILLS_GROUP_PORTAL_API = 'api/v1/skills-portal'
export const SKILLS_PHONE = '0508 754 557'
export const SKILLS_PHONE_TEXT = '0508 SKILLS (0508 754 557)'
export const SKILLS_INTERNATIONAL_PHONE = '64 9 525 2590'
export const SKILLS_INTERNATIONAL_PHONE_TEXT =
  'If you are overseas, please phone +64 9 525 2590'
export const SKILLS_RECOGNITION_MAIL = 'recognition@skills.org.nz'
export const NEW_ZEALAND = 'New Zealand'
export const GENDER_DIVERSE = 'Gender Diverse'
export const US_LOCALE = 'en-US'
export const USD_CURRENCY = 'USD'
export const PAYMENT_APPROVED_STATUS = 'APPROVED'
export const PAYMENT_DECLINED_STATUS = 'DECLINED'
export const PAYMENT_UNKNOWN_STATUS = 'UNKNOWN'
export const PAYMENT_SUCCESSFUL_MESSAGE =
  'Payment successful. The Skills Recognition Team will be in touch shortly'
export const REAL_ESTATE_PAYMENT_SUCCESSFUL_MESSAGE =
  'Payment successful. The Real Estate Team will be in touch shortly'
export const PAYMENT_UNSUCCESSFUL_MESSAGE = 'Payment failed, please try again'
export const PAYMENT_UNKNOWN_MESSAGE =
  'Your payment status is unknown. Please contact the <a href="mailto:recognition@skills.org.nz"> Skills Recognition Team</a>'
export const REAL_ESTATE_PAYMENT_UNKNOWN_MESSAGE =
  'Your payment status is unknown. Please contact the <a href="mailto:realestate@skills.org.nz"> Real Estate Team</a>'
export const APPLICATION_SUCCESSFUL_MESSAGE =
  '<strong>Success,</strong> Your application has been updated.'
export const UPDATE_APPLICATION_FAIL_MESSAGE =
  '<strong>Failure,</strong> Your application has not been updated.'
export const COMPLETE_APPLICATION_FAIL_MESSAGE =
  'Your application has been saved, but there was a problem with completing your application. Please try again.'
export const COMPLETE_APPLICATION_SUCCESSFUL_MESSAGE =
  'Your application has been submitted. The Skills Recognition Team will be in touch shortly'
export const REAL_ESTATE_COMPLETE_APPLICATION_SUCCESSFUL_MESSAGE =
  'Your application has been submitted. The Real Estate Team will be in touch shortly'
export const PAYMENT_FAIL_MESSAGE =
  'Your application has been saved, but there was a problem with starting your payment. Please try to Apply & Pay again.'
export const APPLICATION_TYPE_CODE_NAME_NOT_EQUALS_PGD_ERROR_MESSAGE =
  'An error has occurred with your application. Please contact the <a href="mailto:recognition@skills.org.nz"> Skills Recognition Team</a>'
export const SKILLS_GROUP_PORTAL_UNAVAILABLE_MESSAGE =
  'Skills Group Portal is unavailable, please try again later.'
export const VALIDATION_ERROR_MESSAGE =
  'Some information is in the wrong format or missing. Please scroll down and update based on the red text.'
export const PROOF_OF_RESIDENCY = 'Proof of Residency'
export const PROOF_OF_IDENTITY = 'Proof of Identity'

export const roles = {
  TRAINEE: 0,
  EMPLOYER: 1,
  FS_CANDIDATE: 2,
  FS_ASSESSOR: 3,
  MA_COORDINATOR: 4,
  STAFF: 5,
  SKILLS_ACCOUNT_MANAGER: 6,
  PROVIDER: 7,
  WEB_MOODLE: 8,
  ASSESSOR: 9,
  EASSESS: 10,
}

export const traineeRouteNames = {
  TRAINEE: 'trainee',
  TRAINING_PLAN_DETAILS: 'traineeTrainingPlanDetails',
  COURSE_DETAILS: 'traineeCourseDetails',
  INDUSTRY_STANDARDS_LINK: 'industryStandardsLink',
  RESOURCES: 'traineeResources',
  REPORTS: 'traineeReports',
  MY_ROA: 'myROA',
  MY_DETAILS: 'traineeMyDetails',
}

export const employerRouteNames = {
  COMPANY_DETAILS: 'employerCompanyDetails',
  TRAINEES: 'employerTrainees',
  TRAINEES_SEARCH: 'employerTraineesSearch',
  TRAINING_PLAN_DETAILS: 'employerTrainingPlanDetails',
  COURSE_DETAILS: 'employerCourseDetails',
  REPORTS: 'employerReports',
  MY_DETAILS: 'employerMyDetails',
  TRAINEE_DETAILS: 'employerTraineeDetails',
  TRAINEE_DETAILS_TRAINING: 'employerTraineeDetailsTraining',
  TRAINEE_DETAILS_ROA: 'employerTraineeDetailsROA',
  TRAINEE_DETAILS_REPORTS: 'employerTraineeDetailsReports',
  RESOURCES: 'employerResources',
}

export const amRouteNames = {
  TRAINEE_TRAINING_PLAN_DETAILS: 'amTraineeTrainingPlanDetails',
  TRAINEE_COURSE_DETAILS: 'amTraineeCourseDetails',
  TRAINEE_SITE_VISIT_DETAILS: 'amTraineeSiteVisitDetails',
  TRAINEE_APPRENTICE_VISIT_NEW: 'amTraineeApprenticeVisitNew',
  TRAINEES_SEARCH: 'amTraineesSearch',
  MY_DETAILS: 'amMyDetails',
  TRAINEE_DETAILS: 'amTraineeDetails',
  TRAINEE_DETAILS_TRAINING: 'amTraineeDetailsTraining',
  TRAINEE_DETAILS_ROA: 'amTraineeDetailsROA',
  TRAINEE_DETAILS_REPORTS: 'amTraineeDetailsReports',
  TRAINEE_DETAILS_APPRENTICE_VISIT: 'amTraineeDetailsApprenticeVisit',
}

export const macRouteNames = {
  MY_DETAILS: 'macMyDetails',
  TRAINEES_SEARCH: 'macTraineesSearch',
  COMPANY_DETAILS: 'macCompanyDetails',
  TRAINEE_SITE_VISIT_DETAILS: 'macTraineeSiteVisitDetails',
  TRAINEE_APPRENTICE_VISIT_NEW: 'macTraineeApprenticeVisitNew',
  TRAINEE_APPRENTICE_VISIT_NEW_SELECT_TRAINEE:
    'macTraineeApprenticeVisitNewSelectTrainee',
  TRAINEE_COURSE_DETAILS: 'macTraineeCourseDetails',
  TRAINEE_TRAINING_PLAN_DETAILS: 'macTraineeTrainingPlanDetails',
  TRAINEES: 'macTrainees',
  REPORTS: 'macReports',
  TRAINEE_DETAILS: 'macTraineeDetails',
  TRAINEE_DETAILS_TRAINING: 'macTraineeDetailsTraining',
  TRAINEE_DETAILS_ROA: 'macTraineeDetailsROA',
  TRAINEE_DETAILS_REPORTS: 'macTraineeDetailsReports',
  TRAINEE_DETAILS_APPRENTICE_VISIT: 'macTraineeDetailsApprenticeVisit',
}

export const fsCandidateRouteNames = {
  INDEX: 'fscandidate',
  MY_DETAILS: 'fscandidateMyDetails',
  CANDIDATE_HANDBOOK: 'fscandidateCandidateHandbook',
  REPORTS: 'fscandidateReports',
}

// FSASSESSOR
export const FinancialServiceAssessorRouteNames = {
  INDEX: 'fsaccessor',
  MY_DETAILS: 'fsaccessorMyDetails',
}

export const SkillsGroupPortalRouteNames = {
  HOME: 'skillsGroupPortal',
  MY_DASHBOARD: 'skillsGroupPortalMyDashboard',
  MY_PROFILE: 'skillsGroupPortalMyProfile',
  RECOGNITION_APPLICATION: 'skillsGroupPortalRecognitionApplication',
  B2C_SIGNIN: 'skillsGroupPortalB2CSignIn',
  WELLBEING_PROVIDER_ONBOARDING: 'skillsGroupPortalWellbeingProviderOnboarding',
}

export const ErrorMessages = {
  INVALID_MIN_VALUE: (fieldName, minValue) =>
    `The ${fieldName} must be equal or greater than ${minValue}`,
  EMPTY_ARRAY: (fieldName) => `Please choose at least one ${fieldName}`,
  INVALID_URL: 'Invalid URL.',
  INVALID_EMAIL: 'Invalid Email.',
  INVALID_POST_CODE: 'Post Code must have 4 digits',
  REQUIRED_FIELD: (fieldName) => `${fieldName} should not be empty.`,
  EXCEED_MAXLENGTH: (fieldName) => `${fieldName} exceed limit length.`,
  INVALID_FORMAT_DATE: `Date must have format 'dd/mm/yyyy'.`,
  INVALID_CHECKBOX: `This field must be checked before continuing`,
}

export const GenderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
]

export const ApplicantTypes = [
  { value: 'New Applicant', label: 'New Applicant' },
  { value: 'Returning Applicant', label: 'Returning Applicant' },
]

export const RegistrationClasses = [
  { value: 'Plumbing', label: 'Plumbing' },
  { value: 'Gas fitting', label: 'Gas fitting' },
  { value: 'Drain laying', label: 'Drain laying' },
]

export const Genders = [
  {
    value: 1,
    label: 'Male',
  },
  {
    value: 2,
    label: 'Female',
  },
  {
    value: 559760000,
    label: 'Gender Diverse',
  },
]

export const YesOrNo = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
]

export const BusinessArrangements = [
  {
    value: 1,
    label: 'Self employed',
  },
  {
    value: 2,
    label: 'Sub contractor',
  },
  {
    value: 3,
    label: 'Employee of practice',
  },
]

export const RegulatoryBodies = [
  {
    value: 1,
    label: 'NZ Psychologist Board',
  },
  {
    value: 2,
    label: 'Psychotherapist Board of NZ (PBANZ)',
  },
  {
    value: 3,
    label: 'Social Workers Registration Board of NZ',
  },
]

export const RegulatoryStatuses = [
  {
    value: 1,
    label: 'Currently Registered',
  },
  {
    value: 2,
    label: 'Hold current Annual Practicing Certificate',
  },
  {
    value: 3,
    label:
      'Are being or have been investigated for concerns about your professional conduct (please send outline separately to Instep)',
  },
]

export const ProfessionalAffiliations = [
  {
    value: 1,
    label: 'NZ Psychological Society',
  },
  {
    value: 2,
    label: 'NZ College of Clinical Psychologists',
  },
  {
    value: 3,
    label: 'NZ Association of Counsellors (NZAC)',
  },
  {
    value: 4,
    label: 'NZ Christian Counsellors Association (NZCCA)',
  },
  {
    value: 5,
    label: 'NZ Association of Psychotherapists (NZAP)',
  },
  {
    value: 6,
    label: 'DAPAANZ',
  },
  {
    value: 7,
    label: 'ANZASW (Social Workers)',
  },
  {
    value: 8,
    label: 'CDANZ',
  },
  {
    value: 9,
    label: 'Arbitrators and Mediators Institute of NZ',
  },
  {
    value: 10,
    label: 'Other (free text)',
  },
  {
    value: 11,
    label: 'Current membership type (specify)',
  },
]

export const DeliveryModes = [
  {
    value: 1,
    label: 'In person at your workplace',
  },
  {
    value: 2,
    label: 'By voice, eg, phone',
  },
  {
    value: 3,
    label: 'By video, eg, online',
  },
]

export const ClientPurposes = [
  {
    value: 1,
    label: 'Work place performance and relationships',
  },
  {
    value: 2,
    label: 'Intimate relationships as couples',
  },
  {
    value: 3,
    label: 'Career and life decisions',
  },
  {
    value: 4,
    label: 'Grief and loss',
  },
  {
    value: 5,
    label: 'Anger or violence',
  },
  {
    value: 6,
    label: 'Feeling pressured or stressed',
  },
  {
    value: 7,
    label: 'Family relationships and problems',
  },
  {
    value: 8,
    label: 'Mental distress including anxiety or depression',
  },
  {
    value: 9,
    label: 'Addictions (please specify kind)',
  },
]

export const ClientTypes = [
  {
    value: 1,
    label: 'Adult individually',
  },
  {
    value: 2,
    label: 'Youth 13-18 years',
  },
  {
    value: 3,
    label: 'Children 4-12 years',
  },
  {
    value: 4,
    label: 'Couples as couples',
  },
]

export const SpecialistAreas = [
  {
    value: 1,
    label: 'Addictions - Alcohol',
  },
  {
    value: 2,
    label: 'Addictions - Drugs',
  },
  {
    value: 3,
    label: 'Addictions - Gambling',
  },
  {
    value: 4,
    label: 'ADHD',
  },
  {
    value: 5,
    label: 'Anger',
  },
  {
    value: 6,
    label: "Asperger's syndrome",
  },
  {
    value: 7,
    label: 'Autism',
  },
  {
    value: 8,
    label: 'Behavior problems',
  },
  {
    value: 9,
    label: 'Budgeting / Financial Coach',
  },
  {
    value: 10,
    label: 'Bullying',
  },
  {
    value: 11,
    label: 'Career Guidance / Development',
  },
  {
    value: 12,
    label: 'Conflict Resolution',
  },
  {
    value: 13,
    label: 'Couples therapy - Imago',
  },
  {
    value: 14,
    label: 'Couples therapy as couples',
  },
  {
    value: 15,
    label: 'Depression/Anxiety',
  },
  {
    value: 16,
    label: 'Divorce/Separation/Custody',
  },
  {
    value: 17,
    label: 'Domestic Violence',
  },
  {
    value: 18,
    label: 'Eating disorder',
  },
  {
    value: 19,
    label: 'Fatigue and sleep problems',
  },
  {
    value: 20,
    label: 'Fears/Phobias',
  },
  {
    value: 21,
    label: 'Grief or major Loss',
  },
  {
    value: 22,
    label: 'Health and Physical Issues',
  },
  {
    value: 23,
    label: 'Infertility/Pregnancy issues',
  },
  {
    value: 24,
    label: 'Mediation',
  },
  {
    value: 25,
    label: 'Other mental illness, being treated',
  },
  {
    value: 26,
    label: 'Pain management',
  },
  {
    value: 27,
    label: 'Parenting/Family',
  },
  {
    value: 28,
    label: 'Past trauma',
  },
  {
    value: 29,
    label: 'Performance at work',
  },
  {
    value: 30,
    label: 'Post-natal depression',
  },
  {
    value: 31,
    label: 'Pregnancy loss',
  },
  {
    value: 32,
    label: 'PTSD',
  },
  {
    value: 33,
    label: 'Rape',
  },
  {
    value: 34,
    label: 'Redundancy/Restructure',
  },
  {
    value: 35,
    label: 'Relationship',
  },
  {
    value: 36,
    label: 'Relaxation',
  },
  {
    value: 37,
    label: 'Self-Concept/Esteem',
  },
  {
    value: 38,
    label: 'Sex therapy',
  },
  {
    value: 39,
    label: 'Sexual abuse',
  },
  {
    value: 40,
    label: 'Sexual Harassment',
  },
  {
    value: 41,
    label: 'Sexuality',
  },
  {
    value: 42,
    label: 'Spirituality',
  },
  {
    value: 43,
    label: 'Suicidal concerns',
  },
  {
    value: 44,
    label: 'Time Management',
  },
  {
    value: 45,
    label: 'Trauma & stress disorder',
  },
  {
    value: 46,
    label: 'Workplace issues',
  },
]

export const TreatmentAreas = [
  {
    value: 1,
    label: 'ACT',
  },
  {
    value: 2,
    label: 'CBT',
  },
  {
    value: 3,
    label: 'EMDR',
  },
]

export const SpecialistServices = [
  {
    value: 1,
    label: 'ACC (Contracted)',
  },
  {
    value: 2,
    label: 'Family Court approved',
  },
  {
    value: 3,
    label: 'Professional Supervisor with my professional body',
  },
]
