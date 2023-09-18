<template>
  <div id="myProfile" class="q-pa-lg">
    <div class="row">
      <label class="text-h4">Update Details</label>
    </div>

    <div class="row" v-bind:class="{ hidden: !displaySuccessMsg }">
      <div class="col-12">
        <hr />
        <q-space class="more-space" />
        <q-banner rounded inline-actions class="bg-light-green-2 text-green-10">
          <label>Success! Your details have been updated.</label>
          <template v-slot:action>
            <q-btn
              flat
              color="text-green-10"
              label="X"
              @click="closeSuccessMsg"
            />
          </template>
        </q-banner>
      </div>
    </div>

    <div class="row" v-bind:class="{ hidden: !displayErrorMsg }">
      <div class="col-12">
        <hr />
        <q-space class="more-space" />
        <q-banner rounded inline-actions class="bg-red-2 text-red-10">
          <label>
            <strong>Failure,</strong>
            Your details have not been updated.
          </label>
          <template v-slot:action>
            <q-btn flat color="text-red-10" label="X" @click="closeErrorMsg" />
          </template>
        </q-banner>
      </div>
    </div>

    <div class="row">
      <div class="col-12"><q-space class="more-space" /></div>
    </div>

    <div class="row">
      <q-form id="frmUserProfile" class="full-width">
        <q-card>
          <q-card-section class="q-pa-lg">
            <h1 class="text-h5">General Information</h1>

            <div class="row">
              <div class="row col-md-4 col-xs-12 form-group">
                <label class="field-name">First Name</label>
                <div class="field-text-1">{{ model.firstName }}</div>
              </div>

              <div class="row col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Email Address</label>
                <div class="field-text">{{ model.primaryEmail }}</div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Middle Name</label>
                <q-input
                  dense
                  v-model="model.middleName"
                  maxlength="50"
                  class="field-input"
                />
              </div>

              <div class="row col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name col-12" ref="lbDateOfBirth">
                  Date of Birth
                </label>
                <app-date
                  class="field-input"
                  v-model="model.dateOfBirth"
                  :error-message="dateOfBirthErrors"
                  :error="$v.model.dateOfBirth.$error"
                  @input="$v.model.dateOfBirth.$touch"
                  @blur="$v.model.dateOfBirth.$touch"
                />
              </div>
            </div>

            <div class="row">
              <div class="row col-md-4 col-xs-12 form-group">
                <label class="field-name">Last Name</label>
                <div class="field-text-1">{{ model.lastName }}</div>
              </div>

              <div class="row col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name col-12">Gender</label>
                <app-select
                  v-model="model.gender"
                  :options="Genders"
                  class="field-input"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Home Phone</label>
                <q-input
                  dense
                  v-model="model.businessPhone"
                  maxlength="20"
                  class="field-input"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Mobile Phone</label>
                <q-input
                  dense
                  v-model="model.phoneNumber"
                  maxlength="20"
                  class="field-input"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-lg">
            <h1 class="text-h5">Address</h1>
            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Country</label>
                <app-select
                  v-model="model.country"
                  :options="countryOptions"
                  @input="onChangeCountry"
                  class="field-input"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Street</label>
                <skills-suggestions-address
                  dense
                  v-model="model.street"
                  maxlength="250"
                  :onItemSelected="onPostalAddressStreetSelected"
                  v-if="isNewZealand"
                  class="field-input"
                  isSkillsGroupPortal
                />
                <q-input
                  dense
                  v-model="model.street"
                  maxlength="250"
                  :readonly="!isHasValueCountry"
                  v-else
                  class="field-input"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">City</label>
                <q-input
                  dense
                  v-model="model.city"
                  maxlength="80"
                  :readonly="isNewZealand || !isHasValueCountry"
                  class="field-input"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Suburb</label>
                <q-input
                  dense
                  v-model="model.suburb"
                  maxlength="250"
                  :readonly="isNewZealand || !isHasValueCountry"
                  class="field-input"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Post Code</label>
                <skills-post-code
                  v-model="model.postCode"
                  :country="model.country"
                  class="field-input"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-xs-12 form-group">
                <custom-checkbox
                  v-model="model.marketingConsent"
                  label="Yes, I would like to receive communications from Skills Consulting Group."
                ></custom-checkbox>
              </div>
            </div>
          </q-card-section>

          <q-card-actions horizontal align="right" class="q-pa-lg">
            <q-btn
              flat
              icon="close"
              label="Reset"
              color="primary"
              class="float-right"
              @click="onReset()"
            />
            <q-btn
              icon="save"
              label="Save"
              color="primary"
              class="float-right"
              @click="onSave()"
            />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </div>
</template>
<script>
import Utilities from '@/common/utilities.js'
import { mapActions, mapGetters } from 'vuex'
import {
  ErrorMessages,
  Genders,
  DDMMYYY,
  NEW_ZEALAND,
} from '../../common/constants.js'
import { validDate } from '../../common/datetime.js'
import moment from 'moment'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'MyProfile',

  components: {
    AppSelect: () =>
      import(
        /* webpackPrefetch: true */ '../../compoments/select/AppSelect.vue'
      ),
    AppDate: () =>
      import(/* webpackPrefetch: true */ '../../compoments/AppDate.vue'),
    SkillsSuggestionsAddress: () =>
      import(
        /* webpackPrefetch: true */ '../../compoments/SkillsSuggestionsAddress.vue'
      ),
    SkillsPostCode: () =>
      import(/* webpackPrefetch: true */ '@/compoments/SkillsPostCode.vue'),
    CustomCheckbox: () =>
      import(
        /* webpackPrefetch: true */ '@/compoments/checkboxes/CustomCheckbox.vue'
      ),
  },

  data() {
    return {
      Countries: [],
      countryOptions: Utilities.getCountries(),
      Genders,
      model: {},
      displaySuccessMsg: false,
      displayErrorMsg: false,
      originalModel: {},
    }
  },

  validations() {
    let model = {}

    model = {
      ...model,
      dateOfBirth: { validDate },
    }

    return { model }
  },

  async created() {
    if (this.contact) {
      this.fetchContactModel(this.contact)
    }

    this.fetchData()
  },

  watch: {
    contact: {
      handler(data) {
        this.fetchContactModel(data)
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters('auth', ['email', 'currentName']),
    ...mapGetters('skills-group-contact', ['contact']),

    dateOfBirthErrors() {
      if (
        this.$v.model.dateOfBirth.$dirty &&
        !this.$v.model.dateOfBirth.validDate
      ) {
        return ErrorMessages.INVALID_FORMAT_DATE
      }

      return ''
    },

    isNewZealand() {
      return this.model.country?.value === NEW_ZEALAND
    },

    isHasValueCountry() {
      return !!this.model.country?.value
    },
  },

  methods: {
    ...mapActions('skills-group-contact', [
      'updateCRMContact',
      'setCRMContact',
    ]),

    onChangeCountry() {
      this.model.street = ''
      this.model.suburb = ''
      this.model.city = ''
      this.model.postCode = ''
    },

    fetchContactModel(contact) {
      this.model = {
        ...contact,
        id: contact.contactID,
        gender: Genders.find((item) => item.value == contact.gender),
        dateOfBirth: contact.dateOfBirth
          ? moment(contact.dateOfBirth).format(DDMMYYY)
          : '',
        country: this.countryOptions.find(
          (item) => item.value == contact.country
        ),
      }
      this.originalModel = { ...this.model }
    },

    async fetchData() {
      await this.setCRMContact()
    },

    filterFn(val, update) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.countryOptions = this.Countries.filter(
          (v) => v.toLocaleLowerCase().indexOf(needle) > -1
        )
      })
    },

    setModel(val) {
      this.model.country = val
    },

    closeSuccessMsg() {
      this.displaySuccessMsg = false
    },

    closeErrorMsg() {
      this.displayErrorMsg = false
    },

    onReset() {
      this.displaySuccessMsg = false
      this.displayErrorMsg = false
      this.model = Utilities.cloneContact(this.originalModel)
      this.$nextTick(() => {
        this.model.postCode = this.originalModel.postCode
      })
    },

    async onSave() {
      this.$v.$touch()
      this.displaySuccessMsg = false
      this.displayErrorMsg = false

      if (!this.$v.$invalid) {
        const contactToUpdate = {
          ...this.model,
          country: this.model.country?.value ?? '',
          gender: this.model.gender?.value,
          dateOfBirth: Utilities.convertStringDateToDate(
            this.model.dateOfBirth
          ),
        }

        try {
          await this.updateCRMContact(contactToUpdate)
          this.displaySuccessMsg = true
          this.displayErrorMsg = false
        } catch {
          this.displayErrorMsg = true
          this.displaySuccessMsg = false
        }

        window.scrollTo(0, 0)
      } else {
        this.scrollToInvalidField()
      }
    },
    scrollToInvalidField() {
      if (this.model.dateOfBirth && this.$v.model.dateOfBirth.$invalid) {
        this.scrollToElement(this.$refs.lbDateOfBirth)
      }
    },
    scrollToElement(el) {
      const target = getScrollTarget(el)
      let offset = el.offsetTop
      if (this.$q.platform.is.mobile) {
        offset = this.$q.screen.xs ? offset + 300 : offset + 600
      }
      const duration = 500
      setScrollPosition(target, offset, duration)
    },
    onPostalAddressStreetSelected({ street, suburb, city, postCode }) {
      this.model.street = street
      this.model.suburb = suburb
      this.model.city = city
      this.model.postCode = postCode
    },
  },
}
</script>

<style lang="stylus" scoped>
hr
  margin-block-end: 0;

.more-space
  height : 20px

.q-card-sections
  padding : 30px !important

.q-btn
  font-size: 18px

.q-banner
  label
    font-size : 18px
</style>
