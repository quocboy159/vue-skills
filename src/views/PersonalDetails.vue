<template>
  <div class="row" v-if="userProfile">
    <div class="col-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="header-row row">
            <div class="col-12 q-pa-md">
              <h3 class="text-h3 float-left">Personal Details</h3>
              <q-btn
                id="editPersonalDetails"
                @click="editModeTrigger()"
                flat
                round
                icon="edit"
                color="primary"
                class="float-right"
                v-if="!editMode"
              />
            </div>
          </div>

          <div
            id="personal-details"
            ref="personalDetails"
            class="detail-rows q-pa-md"
          >
            <div class="displayMode q-col-gutter-x-sm q-col-gutter-y-md">
              <div class="row items-center" :class="LayoutParent">
                <q-item-label
                  id="f-name"
                  class="text-label"
                  :class="LayoutChild1"
                >
                  First name
                </q-item-label>
                <div id="l-name" class :class="LayoutChild2">
                  {{ userProfile.firstName }}
                </div>
              </div>
              <div class="row items-center" :class="LayoutParent">
                <q-item-label class="text-label" :class="LayoutChild1">
                  Last name
                </q-item-label>
                <div class :class="LayoutChild2">
                  {{ userProfile.lastName }}
                </div>
              </div>

              <div
                class="row items-center"
                :class="LayoutParent"
                v-if="!editMode"
              >
                <q-item-label class="text-label" :class="LayoutChild1">
                  Date of birth
                </q-item-label>
                <div class :class="LayoutChild2">
                  {{ userProfile.dateOfBirth | moment(dateFormat) }}
                </div>
              </div>
              <div class="row" :class="LayoutParent" v-else>
                <div class="col-12" :class="LayoutChild3">
                  <q-input
                    dense
                    v-model="model.dateOfBirth"
                    label="Date of Birth"
                    :class="LayoutChild2"
                    bottom-slots
                    :error-message="dateOfBirthErrors"
                    :error="$v.model.dateOfBirth.$error"
                    @input="$v.model.dateOfBirth.$touch"
                    @blur="$v.model.dateOfBirth.$touch"
                    bg-color="fieldbg"
                    color="field"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="model.dateOfBirth"
                            :mask="dateFormat"
                            minimal
                            @input="() => $refs.qDateProxy.hide()"
                            :options="optionsBirthday"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <div
                class="row items-center"
                :class="LayoutParent"
                v-if="!editMode"
              >
                <q-item-label class="text-label" :class="LayoutChild1">
                  Mobile Number
                </q-item-label>
                <div class :class="LayoutChild2">
                  {{ userProfile.phoneNumber }}
                </div>
              </div>
              <div class="row" :class="LayoutParent" v-else>
                <q-item-label class="col-12 text-label" :class="LayoutChild4">
                  Mobile Number
                </q-item-label>
                <div id="country-code" class="col-12" :class="LayoutChild2">
                  <q-select
                    dense
                    v-model="model.countryCode"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    :options="countryCodeOptions"
                    @filter="filterCountryCode"
                    :error-message="countryCodeErrors"
                    :error="$v.model.countryCode.$error"
                    @input="$v.model.countryCode.$touch"
                    @blur="$v.model.countryCode.$touch"
                    label="Country Code"
                    color="field"
                    bg-color="fieldbg"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section>
                          <q-item-label>
                            {{ scope.opt.description }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div
                  id="phone-section-2"
                  class="col-12"
                  :class="{ LayoutChild2, LayoutChild3 }"
                >
                  <q-input
                    dense
                    v-model="model.phone"
                    label="Number"
                    type="tel"
                    mask="###############"
                    :error-message="phoneErrors"
                    :error="$v.model.phone.$error"
                    @input="$v.model.phone.$touch"
                    @blur="$v.model.phone.$touch"
                    bg-color="fieldbg"
                    color="field"
                  />
                </div>
              </div>

              <div
                class="row items-center"
                :class="LayoutParent"
                v-if="editMode"
              >
                <particular-summary-error
                  :error="error"
                ></particular-summary-error>
              </div>
            </div>

            <div class="editMode q-gutter-sm" v-if="editMode">
              <div class="row">
                <div class="col-12 q-gutter-x-sm q-gutter-y-sm">
                  <q-btn
                    @click="onSave()"
                    icon="save"
                    label="Save"
                    color="primary"
                    class="float-right"
                    :disable="isSubmitting || $v.$invalid"
                  />
                  <q-btn
                    @click="onCancel()"
                    flat
                    icon="close"
                    label="Cancel"
                    color="primary"
                    class="float-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { Constants } from '@/valueObjects'
import moment from 'moment'
import phoneCodeCountries from '../valueObjects/PhoneCodeCountries'
import { required } from 'vuelidate/lib/validators'
import ParticularSummaryError from '../compoments/error/ParticularSummaryError.vue'
import {
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from 'libphonenumber-js'
import { validDate } from '../common/datetime.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PersonalDetails',

  components: {
    ParticularSummaryError,
  },

  validations: {
    model: {
      dateOfBirth: {
        required,
        validDate,
      },
      countryCode: {
        required,
      },
      phone: {
        required,
        maxLength: (text, model) => {
          const value = (text || '').replace(/ /g, '')
          if (!value) return true
          const length = value.length + model.countryCode.value.length
          const validLength = length <= 15
          return validLength
        },
      },
    },
  },

  data() {
    return {
      error: null,
      editMode: false,
      model: {
        dateOfBirth: '',
        phoneNumber: '',
        countryCode: '',
        phone: '',
      },
      isSubmitting: false,
      formattedCountryList: null,
      countryCodeOptions: null,
      dateFormat: Constants.DATE_FORMAT,
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
      LayoutParent: ['q-col-gutter-x-lg q-col-gutter-y-xm'],
      LayoutChild1: ['col-12 col-md-2'],
      LayoutChild2: ['layout-child-2'],
      LayoutChild3: ['layout-child-3'],
      LayoutChild4: ['layout-child-4'],
    }
  },

  async created() {
    this.formattedCountryList = phoneCodeCountries.allCountries.map((item) => {
      let callingCode = getCountryCallingCode(item[1].toUpperCase())
      return {
        label: `+${callingCode}`,
        value: `+${callingCode}`,
        description: `${item[0]} +${callingCode}`,
      }
    })

    this.countryCodeOptions = this.formattedCountryList
  },

  computed: {
    ...mapGetters(['userProfile']),

    dateOfBirthErrors() {
      if (this.$v.model.dateOfBirth.$dirty) {
        if (!this.$v.model.dateOfBirth.required) {
          return 'Field is required.'
        }

        if (!this.$v.model.dateOfBirth.validDate) {
          return 'Date is incorrect format.'
        }
      }

      return ''
    },

    countryCodeErrors() {
      if (this.$v.model.countryCode.$dirty) {
        if (!this.$v.model.countryCode.required) {
          return 'Field is required.'
        }
      }

      return ''
    },

    phoneErrors() {
      if (this.$v.model.phone.$dirty) {
        if (!this.$v.model.phone.required) {
          return 'Field is required.'
        }

        if (!this.$v.model.phone.maxLength) {
          return 'Phone exceed limit length.'
        }
      }

      return ''
    },
  },

  watch: {
    userProfile: {
      handler() {
        this.bindingUserInformation()
      },
    },
  },

  methods: {
    ...mapActions(['updateContact']),

    bindingUserInformation() {
      if (this.userProfile && this.userProfile.dateOfBirth) {
        this.model.dateOfBirth = moment(this.userProfile.dateOfBirth).format(
          this.dateFormat
        )
      } else {
        this.model.dateOfBirth = ''
      }

      if (this.userProfile && this.userProfile.phoneNumber) {
        this.model.phoneNumber = this.userProfile.phoneNumber
        this.displayPhoneNumber(this.model.phoneNumber)
      } else {
        this.model.phoneNumber = ''
        this.model.countryCode = ''
        this.model.phone = ''
      }
    },

    displayPhoneNumber(phoneNumber) {
      let phoneNumberParser = parsePhoneNumberFromString(phoneNumber)
      let internationPhone = phoneNumberParser.formatInternational()

      var dialCalling = internationPhone.substr(
        0,
        internationPhone.indexOf(' ')
      )

      this.model.countryCode = this.formattedCountryList.find(
        (s) => s.value == dialCalling
      )

      this.model.phone = internationPhone.substr(
        internationPhone.indexOf(' ') + 1
      )
    },

    optionsBirthday(date) {
      return (
        date >= Constants.MIN_DATE_OF_BIRTH &&
        date <= moment().format('YYYY/MM/DD')
      )
    },

    onCancel() {
      this.reset()
    },

    reset() {
      this.bindingUserInformation()
      this.editMode = false
      this.error = null
      this.$v.$reset()
    },

    onSave() {
      const selfComponent = this
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isSubmitting = true
        this.model.phoneNumber = `${
          this.model.countryCode.value
        }${this.model.phone.replace(/\s/g, '')}`
        const request = {
          upn: this.userProfile.upn,
          dateOfBirth: moment(this.model.dateOfBirth, this.dateFormat, true)._d,
          phoneNumber: this.model.phoneNumber,
        }
        this.updateContact(request)
          .then(() => {
            selfComponent.reset()
          })
          .catch((e) => {
            selfComponent.error = e.response.data
          })
          .finally(() => {
            selfComponent.isSubmitting = false
          })
      }
    },

    filterCountryCode(val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryCodeOptions = this.formattedCountryList.filter(
          (v) => v.description.toLowerCase().indexOf(needle) > -1
        )
      })
    },

    editModeTrigger() {
      this.editMode = true
      this.$emit('editInProgress', this.id)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');
@import ('../styles/themes/SkillsDefault/skillsDefault.styl');

#personal-details .detail-rows .row {
  align-items: center;
}

.layout-child-2 {
  max-width: $fieldWidth2;
}

.layout-child-3 {
  padding-bottom: 1em;
}

.layout-child-4 {
  padding-bottom: 0.5em;
}

#country-code {
  max-width: 160px;
}

#phone-section-2 {
  max-width: 210px;
}
</style>
