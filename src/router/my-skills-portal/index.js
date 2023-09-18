import AccountManagerRoutes from './account-manager.js'
import EmployerRoutes from './employer.js'
import TraineeRoutes from './trainee.js'
import MACRoutes from './modern-apprentice-coordinator.js'
import FSAccessorRoutes from './fsassessor.js'
import FSCandidateRoutes from './fscandidate.js'

const allroutes = [
  ...AccountManagerRoutes,
  ...EmployerRoutes,
  ...TraineeRoutes,
  ...MACRoutes,
  ...FSCandidateRoutes,
  ...FSAccessorRoutes,
]

export default allroutes
