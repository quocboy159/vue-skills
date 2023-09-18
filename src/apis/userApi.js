import axios from 'axios'

export default {
  async getUserDetails(username) {
    let url = `api/v1/users/details/${username}/`
    return await axios({
      method: 'get',
      url: url,
    })
  },
}
