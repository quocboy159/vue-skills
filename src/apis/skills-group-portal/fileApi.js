import axios from 'axios'
import Utilities from '../../common/utilities'
import { SKILLS_GROUP_PORTAL_API } from '../../common/constants'

export default {
  async downloadFile(fileId, driveName) {
    const url = `${SKILLS_GROUP_PORTAL_API}/files/${fileId}/download?driveName=${driveName}`
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
