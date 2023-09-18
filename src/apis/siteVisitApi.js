import axios from 'axios'

export default {
  getSiteVisitById(id) {
    let url = `api/v1/sitevisits/${id}`
    return axios({
      method: 'get',
      url: url,
    })
  },

  async insertSiteVisit(siteVisit) {
    let url = `api/v1/sitevisits`
    return await axios({
      method: 'post',
      url: url,
      data: siteVisit,
    })
  },
}
