import axios from 'axios'
import Utilities from '../common/utilities'

export default {
  async generateReportByName(name, id) {
    const url = `api/v1/reports/${name}/id/${id}`
    const result = await axios({
      method: 'get',
      url: url,
      responseType: 'blob',
    })
    Utilities.downloadFile({
      response: result,
    })
  },
}
