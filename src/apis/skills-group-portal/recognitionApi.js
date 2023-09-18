import axios from 'axios'
import { SKILLS_GROUP_PORTAL_API } from '../../common/constants'

export default {
  async getPaymentComplete(sessionId, applicationId, email) {
    let url = `${SKILLS_GROUP_PORTAL_API}/recognitions/payments/complete/${sessionId}?applicationId=${applicationId}&email=${email}`
    return axios({
      method: 'get',
      url: url,
      headers: {
        noShowNetworkError: true,
      },
    })
  },

  async applyAndPayApplication(data) {
    let url = `${SKILLS_GROUP_PORTAL_API}/recognitions/payments/initiate`
    return await axios({
      method: 'post',
      url: url,
      data: data,
    })
  },

  async getRecognitionApplicationById(applicationId) {
    let url = `${SKILLS_GROUP_PORTAL_API}/recognitions/applications/${applicationId}`
    return axios({
      method: 'get',
      url: url,
    })
  },

  async createRecognitionApplication(data) {
    let url = `${SKILLS_GROUP_PORTAL_API}/recognitions/applications`
    return await axios({
      method: 'post',
      url: url,
      data: data,
    })
  },

  async updateRecognitionApplication(applicationId, data) {
    const url = `${SKILLS_GROUP_PORTAL_API}/recognitions/applications/${applicationId}`

    return await axios({
      method: 'put',
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    })
  },

  async completeRecognitionApplication(data) {
    let url = `${SKILLS_GROUP_PORTAL_API}/recognitions/applications/complete`
    return await axios({
      method: 'post',
      url: url,
      data: data,
    })
  },
}
