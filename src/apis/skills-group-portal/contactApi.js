import axios from 'axios'
import { SKILLS_GROUP_PORTAL_API } from '../../common/constants'

export default {
  async getRecognitionBySkillsId(skillsId) {
    let url = `${SKILLS_GROUP_PORTAL_API}/contacts/recognition/${skillsId}`
    return axios({
      method: 'get',
      url: url,
    })
  },

  async getContactByEmail(request) {
    let url = `${SKILLS_GROUP_PORTAL_API}/contacts/email/${request.primaryEmail}`
    return axios({
      method: 'post',
      url: url,
      data: request,
    })
  },

  async putContact(contact) {
    let url = `${SKILLS_GROUP_PORTAL_API}/contacts/${contact.primaryEmail}`
    return axios({
      method: 'put',
      url: url,
      data: contact,
    })
  },
}
