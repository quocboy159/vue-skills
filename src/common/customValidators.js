import moment from 'moment'
import { DDMMYYY } from './constants'
import { validDate } from './datetime'

export const mustBeFourDigits = (value) => /^\d{4}$/.test(value)

export const notEmptyArray = (list) => list.length > 0

export const isAfterDate = (fieldName) => (value, model) => {
  const afterDate = model[fieldName]

  if (!value || !afterDate || !validDate(value) || !validDate(afterDate)) {
    return true
  }

  const differentDays = moment(afterDate, DDMMYYY).diff(
    moment(value, DDMMYYY),
    'days'
  )

  return differentDays >= 0
}
