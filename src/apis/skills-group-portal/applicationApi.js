import axios from 'axios'
import { SKILLS_GROUP_PORTAL_API } from '../../common/constants'

export default {
  async getApplicationsByTargetCRMContactId(targetCRMContactId, contactName) {
    let url = `${SKILLS_GROUP_PORTAL_API}/applications/contacts/${targetCRMContactId}?contactName=${contactName}`
    return axios({
      method: 'get',
      url: url,
    })
  },
}
