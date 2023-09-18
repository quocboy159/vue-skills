import country from 'country-list-js'
import moment from 'moment'
import { NEW_ZEALAND, DDMMYYY } from './constants'

export default {
  getKeyNameByValue(object, valueObject) {
    return Object.entries(object).find(
      ([key, value]) => key && value == valueObject
    )[0]
  },

  convertObjectToOptionList(data) {
    const result = []
    for (let propertyName in data) {
      result.unshift({
        value: data[propertyName],
        label: propertyName,
      })
    }

    return result
  },

  getContentLengthMB(data) {
    const formDataEntries = [...data.entries()]

    const contentLength = formDataEntries.reduce((acc, [key, value]) => {
      if (key && typeof value === 'string') {
        return acc + value.length
      }

      if (key && typeof value === 'object') {
        return acc + value.size
      }

      return acc
    }, 0)

    return Math.round((contentLength / 1024 / 1024) * 10) / 10
  },

  convertObjectToFormData(model, form, namespace = '') {
    let formData = form || new FormData()

    if (namespace && typeof model !== 'object' && model !== 'array') {
      formData.append(namespace, model)
    } else {
      for (let propertyName in model) {
        if (model[propertyName] === null || model[propertyName] === undefined) {
          continue
        }

        let formKey = namespace ? `${namespace}.${propertyName}` : propertyName
        if (model[propertyName] instanceof Date) {
          formData.append(formKey, model[propertyName].toISOString())
        } else if (model[propertyName] instanceof Array) {
          model[propertyName].map((item, index) => {
            if (item instanceof File) {
              const tempFormKey = `${formKey}`
              formData.append(tempFormKey, item)
            } else {
              const tempFormKey = `${formKey}[${index}]`
              this.convertObjectToFormData(item, formData, tempFormKey)
            }
          })
        } else if (
          typeof model[propertyName] === 'object' &&
          !(model[propertyName] instanceof File)
        ) {
          this.convertObjectToFormData(model[propertyName], formData, formKey)
        } else {
          formData.append(formKey, model[propertyName])
        }
      }
    }

    return formData
  },

  cloneContact(val) {
    if (val == null) return null
    let clonedVal = Object.assign({}, val)
    clonedVal.homeAddress =
      val.homeAddress == null ? null : Object.assign({}, val.homeAddress)
    clonedVal.postalAddress =
      val.postalAddress == null ? null : Object.assign({}, val.postalAddress)
    return clonedVal
  },

  downloadFile({ response, fileName, isDownloadDirectly = false }) {
    const blob = new Blob([response.data], {
      type: response.data.type,
    })
    const link = document.createElement('a')

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)

      if (isDownloadDirectly) {
        link.setAttribute('download', fileName)
      } else {
        //the browser open in new window to save file with random filename.
        link.setAttribute('target', '_blank')
      }

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  },

  getCountries(countryFirst = NEW_ZEALAND) {
    const filteredItems = country
      .names()
      .filter(function (item) {
        return item !== countryFirst
      })
      .sort()

    const result = [countryFirst, ...filteredItems].map((x) => ({
      label: x,
      value: x,
    }))

    return result
  },

  convertStringDateToDate(value, format = DDMMYYY) {
    if (!value || !moment(value, format).isValid()) {
      return null
    }

    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone
    const result = moment(value, format, true).tz(timezoneName)._d
    return result
  },

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  },
}
