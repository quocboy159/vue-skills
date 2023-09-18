import Vue from 'vue'
import router from '../router/router'
import VueAnalytics from 'vue-analytics'

const analytics = {
  setup() {
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev)
    {
      Vue.use(VueAnalytics, {
        id: process.env.VUE_APP_ANALYTICS || 'UA-1538454-7',
        router,
      })
    }
  },
}

export default analytics
