import axios from 'axios'

export default {
  async getMACEmployeesInTraining(accountId, name) {
    let url = `api/v1/macoordinators/${accountId}/trainees`
    if (name) {
      url += `?name=${name}`
    }

    return await axios({
      method: 'get',
      url: url,
    })
  },
}
