import axios from 'axios'

export default {
  getCourseById(id) {
    let url = `api/v1/courses/${id}`
    return axios({
      method: 'get',
      url: url,
    })
  },

  getUnitStandardsByCourseId(courseId) {
    let url = `api/v1/courses/${courseId}/unitstandards`
    return axios({
      method: 'get',
      url: url,
    })
  },
}
