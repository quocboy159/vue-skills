import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import './styles/themes/SkillsDefault/skillsDefault.styl'
import './styles/themes/SkillsDefault/SkillsDefault.js'
import './quasar'
import SkillsLayout from './layouts/SkillsLayout.vue'
import SmallCenteredLayout1 from './layouts/SmallCenteredLayout1.vue'
import UserSettingsLayout from './layouts/UserSettingsLayout.vue'
import axiosInterceptor from './common/interceptors'
import { notification } from './common/notification'
import sentry from './common/sentry'
import analytics from './common/analytics'
Vue.component('SmallCenteredLayout1', SmallCenteredLayout1)
Vue.component('SkillsLayout', SkillsLayout)
Vue.component('UserSettingsLayout', UserSettingsLayout)
import './styles/whitelabel/index.scss'
import './styles/whitelabel/skills-group-portal/index.scss'
import { registerFilters } from './common/filters'

Vue.config.productionTip = false

analytics.setup()
sentry.setup()
axiosInterceptor.setup()
notification.setup()
registerFilters()

Vue.use(VueMoment, { moment })

Vue.mixin({
  methods: {
    generateUniqueId() {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9)
    },
  },

  computed: {
    $globalLabel() {
      const label = (this.$route.params.label || '').toLowerCase()
      return label
    },
  },
})

// eslint-disable-next-line no-unused-vars
Vue.config.errorHandler = function (err, vm, info) {
  // eslint-disable-next-line no-console
  console.log('err: ', err)
  if (err) {
    throw err
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
