import moment from 'moment'
import { Constants } from '@/valueObjects'
export const todayDateString = moment().format(Constants.DATE_FORMAT)

export const getDateFromString = (dateString) =>
  moment(dateString, Constants.DATE_FORMAT, true)._d

export const validDate = (value) => {
  if (!value) return true
  const dateParse = moment(value, Constants.DATE_FORMAT, true)
  return dateParse.isValid()
}

export const dateToString = (value) => {
  if (value == null) return ''
  const dateParse = moment(value).format(Constants.DATE_FORMAT)
  return dateParse == Constants.NULL_DATE_VALUE ? '' : dateParse
}
