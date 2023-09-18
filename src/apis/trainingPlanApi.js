import axios from 'axios'

export default {
  getTrainingPlansById(id) {
    let url = `api/v1/trainingplans/${id}`
    return axios({
      method: 'get',
      url: url,
    })
  },

  getUnitStandardsByTrainingPlanId(trainingPlanId) {
    let url = `api/v1/trainingplans/${trainingPlanId}/unitstandards`
    return axios({
      method: 'get',
      url: url,
    })
  },

  getQualificationsByTrainingPlanId(trainingPlanId) {
    let url = `api/v1/trainingplans/${trainingPlanId}/qualifications`
    return axios({
      method: 'get',
      url: url,
    })
  },
}
