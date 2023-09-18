import axios from 'axios'

export default {
  getMacAgreementsByTrainingprogrammesId(trainingprogrammeId) {
    let url = `api/v1/trainingprogrammes/${trainingprogrammeId}/macagreements`
    return axios({
      method: 'get',
      url: url,
    })
  },
}
