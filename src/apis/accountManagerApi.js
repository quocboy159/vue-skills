import axios from 'axios'

export default {
  async getEmployeesInTraining(name) {
    let url = `api/v1/accountmanagers/trainees?name=${name}`
    return await axios({
      method: 'get',
      url: url,
    })
  },
}
