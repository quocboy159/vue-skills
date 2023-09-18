import Vue from 'vue'
import { Notify } from 'quasar'

const info = ({
  message,
  position = 'bottom',
  timeout = 3000,
  html = false,
}) => {
  Notify.create({
    color: 'grey-9',
    textColor: 'white',
    icon: 'info',
    multiLine: true,
    message: message,
    position: position,
    timeout: timeout,
    html: html,
  })
}

const warning = ({
  message,
  position = 'bottom',
  timeout = 3000,
  html = false,
}) => {
  Notify.create({
    color: 'warning',
    textColor: 'white',
    icon: 'warning',
    multiLine: true,
    message: message,
    position: position,
    timeout: timeout,
    html: html,
  })
}

const success = ({
  message,
  position = 'bottom',
  timeout = 3000,
  html = false,
}) => {
  Notify.create({
    color: 'secondary',
    textColor: 'white',
    icon: 'done',
    multiLine: true,
    message: message,
    position: position,
    timeout: timeout,
    html: html,
  })
}

const error = ({
  message,
  position = 'bottom',
  timeout = 3000,
  html = false,
  useWhiteBackground = false,
}) => {
  Notify.create({
    color: useWhiteBackground ? 'white' : 'negative',
    textColor: useWhiteBackground ? 'negative' : 'white',
    icon: 'report_problem',
    multiLine: true,
    message: message,
    position: position,
    timeout: timeout,
    html: html,
  })
}

const notify = (config) => {
  Notify.create(config)
}

const notification = {
  setup() {
    Vue.prototype.$notify = {
      success,
      error,
      warning,
      info,
      notify,
    }
  },
}

export { notification, info, warning, success, error, notify }
