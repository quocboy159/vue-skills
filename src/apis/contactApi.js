import axios from 'axios'

export default {
  getSiteVisitsByContactId(contactId) {
    let url = `api/v1/contact/${contactId}/sitevisits`
    return axios({
      method: 'get',
      url: url,
    })
  },

  async putContact(contact) {
    let url = `api/v1/contact/${contact.id}`
    return axios({
      method: 'put',
      url: url,
      data: contact,
    })
  },

  getContactByContactId(contactId) {
    let url = `api/v1/contact/${contactId}`
    return axios({
      method: 'get',
      url: url,
    })
  },

  getNotCompletedUnitStandardsByContactId(contactId) {
    let url = `api/v1/contact/${contactId}/unitstandards/incomplete`
    return axios({
      method: 'get',
      url: url,
    })
  },

  getCompletedUnitStandardsByContactId(contactId) {
    let url = `api/v1/contact/${contactId}/unitstandards/completed`
    return axios({
      method: 'get',
      url: url,
    })
  },

  getQualificationsByContactId(contactId) {
    let url = `api/v1/contact/${contactId}/qualifications`
    return axios({
      method: 'get',
      url: url,
    })
  },

  getTrainingPlansByContactId(contactId) {
    let url = `api/v1/contact/${contactId}/trainingplans`
    return axios({
      method: 'get',
      url: url,
    })
  },
  getTrainingProgrammesByContactId(contactId) {
    let url = `api/v1/contact/${contactId}/trainingprogrammes`
    return axios({
      method: 'get',
      url: url,
    })
  },

  getUpcomingCoursesByContactId(contactId) {
    let url = `api/v1/contact/${contactId}/courses/upcoming`
    return axios({
      method: 'get',
      url: url,
    })
  },

  getLinksByContactIdAndName(contactId, name) {
    let url = `api/v1/contact/${contactId}/links/${name}`
    return axios({
      method: 'get',
      url: url,
    })
  },
}
