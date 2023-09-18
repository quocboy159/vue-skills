import { DDMMYYY, US_LOCALE, USD_CURRENCY } from './constants'
import moment from 'moment'
import Vue from 'vue'

export const FILTERS = {
  formatDate: (value, format = DDMMYYY) => {
    return value ? `${moment(value).format(format)}` : ''
  },

  currency: (
    value,
    locale = US_LOCALE,
    currency = USD_CURRENCY,
    minimumFractionDigits = 2
  ) => {
    return value
      ? new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: minimumFractionDigits,
        }).format(value)
      : ''
  },
}

export const registerFilters = () => {
  Object.keys(FILTERS).forEach((key) => {
    Vue.filter(key, FILTERS[key])
  })
}
