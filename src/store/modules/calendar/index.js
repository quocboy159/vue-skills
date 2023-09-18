import axios from 'axios'
import moment from 'moment'

export const SET_EVENTS = 'SET_EVENTS'

const state = {
  events: {},
  busy: false,
}

const mutations = {
  [SET_EVENTS]: (state, events) => {
    state.events = events
  },
}
const actions = {
  fetchEvents: async ({ commit }) => {
    const url = `graph/calendar/events`
    const result = await axios({
      method: 'get',
      url: url,
    })

    // Only map the relevant details
    const raw = result.data.value.map((x) => ({
      subject: x.subject,
      start: moment.utc(x.start.dateTime),
      end: moment.utc(x.end.dateTime),
    }))

    // sort
    raw.sort((a, b) =>
      a.start.isSame(b.start) ? 0 : a.start.isBefore(b.start) ? -1 : 1
    )

    // The state
    const events = {}

    raw.forEach((x) => {
      const { start, end, subject } = x
      const key = start.local().format('DD/MMM/YYYY')
      if (!events[key]) events[key] = []
      events[key].push({
        subject,
        start: start.local().format('hh:mm a'),
        end: end.local().format('hh:mm a'),
      })
    })
    commit(SET_EVENTS, events)
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
