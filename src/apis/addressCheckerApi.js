import axios from 'axios'

export default {
  async getAddresses(query, isSkillsGroupPortal = false) {
    let url = `api/v1/addresscheckers/suggest/${query}`
    return await axios({
      method: 'get',
      url: url,
      isSkillsGroupPortal,
    })
  },
}
