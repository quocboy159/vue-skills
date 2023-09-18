import Vue from 'vue'

import './styles/quasar.styl'
import 'quasar/dist/quasar.ie.polyfills'
// import lang from 'quasar/lang/(en-us).js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import Quasar from 'quasar'
import { Notify, Dialog } from 'quasar'
import Vuelidate from 'vuelidate'

Vue.use(Quasar, {
  plugins: {
    Notify,
    Dialog,
  },
  config: {
    notify: {},
  },
})

Vue.use(Vuelidate)
