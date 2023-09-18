import axios from 'axios'

export default {
  getDocumentByName(name) {
    let url = `api/v1/documents/${name}`
    return axios({
      method: 'get',
      url: url,
    })
  },
}
