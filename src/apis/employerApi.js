import axios from 'axios'

export default {
  async getEmployeesInTraining(accountId, name) {
    let url = `api/v1/employers/${accountId}/trainees`
    if (name) {
      url += `?name=${name}`
    }

    return await axios({
      method: 'get',
      url: url,
    })
  },

  async getEmployerById(id) {
    let url = `api/v1/employers/${id}`
    return await axios({
      method: 'get',
      url: url,
    })
  },

  async updateEmployer(id, employer) {
    let url = `api/v1/employers/${id}`
    return await axios({
      method: 'put',
      url: url,
      data: { ...employer, companyName: null, accountManager: null },
    })
  },
}
