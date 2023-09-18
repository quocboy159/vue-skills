<template>
  <div id="userProfile">
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
                <div class="field-text">{{ model.firstName }}</div>
              </div>

              <div class="row col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Last Name</label>
                <div class="field-text">{{ model.lastName }}</div>
              </div>
            </div>

            <div class="row">
              <div class="row col-md-4 col-xs-12 form-group">
                <label class="field-name">Email Address</label>
                <div class="field-text">{{ model.primaryEmail }}</div>
              </div>

              <div class="row col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name col-md-12">Date of Birth</label>
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
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Gender</label>
                <app-select
                  v-model="model.gender"
                  :options="GenderOptions"
                  :error-message="genderErrors"
                  :error="$v.model.gender.$error"
                  @input="$v.model.gender.$touch"
                  @blur="$v.model.gender.$touch"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Mobile Phone</label>
                <q-input dense v-model="model.mobilePhone" maxlength="20" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Home Phone</label>
                <q-input dense v-model="model.homePhone" maxlength="20" />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-lg">
            <h1 class="text-h5">Address</h1>
            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Country</label>
                <q-input dense v-model="model.country" :maxlength="80" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Street</label>
                <skills-suggestions-address
                  dense
                  v-model="model.street"
                  :error-message="postalAddressStreetErrors"
                  :error="$v.model.street.$error"
                  @blur="$v.model.street.$touch"
                  @input="$v.model.street.$touch"
                  maxlength="250"
                  :onItemSelected="onPostalAddressStreetSelected"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">City</label>
                <q-input
                  dense
                  v-model="model.city"
                  :error-message="postalAddressCityErrors"
                  :error="$v.model.city.$error"
                  @blur="$v.model.city.$touch"
                  @input="$v.model.city.$touch"
                  maxlength="80"
                  readonly
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
                  readonly
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Post Code</label>
                <q-input
                  dense
                  mask="####"
                  v-model="model.postCode"
                  :error-message="postalAddressPostCodeErrors"
                  :error="$v.model.postCode.$error"
                  @blur="$v.model.postCode.$touch"
                  @input="$v.model.postCode.$touch"
                  readonly
                />
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
import Utilities from '../../common/utilities.js'
import ContactApi from '../../apis/skills-group-portal/contactApi.js'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { ErrorMessages, GenderOptions } from '../../common/constants.js'
import { mustBeFourDigits } from '../../common/customValidators.js'
import { validDate } from '../../common/datetime.js'

export default {
  name: 'UserProfile',

  components: {
    AppSelect: () => import('../../compoments/select/AppSelect.vue'),
    AppDate: () => import('../../compoments/AppDate.vue'),
    SkillsSuggestionsAddress: () =>
      import('../../compoments/SkillsSuggestionsAddress.vue'),
  },

  data() {
    return {
      GenderOptions,
      model: {},
      originalModel: {},
      displaySuccessMsg: false,
      displayErrorMsg: false,
    }
  },

  validations() {
    let model = {}

    model = {
      ...model,
      dateOfBirth: { required, validDate },
      gender: { required },
      street: {
        required,
      },
      city: {
        required,
      },
      postCode: {
        required,
        mustBeFourDigits,
      },
    }

    return { model }
  },

  props: {
    isSelfProfile: {
      type: Boolean,
      required: true,
    },
  },

  async created() {
    await this.fetchData()
  },

  computed: {
    ...mapGetters('auth', ['email']),
    ...mapGetters('skills-group-contact', ['contact']),

    dateOfBirthErrors() {
      if (this.$v.model.dateOfBirth.$dirty) {
        if (!this.$v.model.dateOfBirth.required) {
          return ErrorMessages.REQUIRED_FIELD('Date of Birth')
        }

        if (!this.$v.model.dateOfBirth.validDate) {
          return ErrorMessages.INVALID_FORMAT_DATE
        }
      }

      return ''
    },

    genderErrors() {
      if (this.$v.model.gender.$dirty && !this.$v.model.gender.required) {
        return ErrorMessages.REQUIRED_FIELD('Gender')
      }

      return ''
    },

    postalAddressStreetErrors() {
      if (this.$v.model.street.$dirty && !this.$v.model.street.required) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    postalAddressCityErrors() {
      if (this.$v.model.city.$dirty && !this.$v.model.city.required) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    postalAddressPostCodeErrors() {
      if (this.$v.model.postCode.$dirty) {
        if (!this.$v.model.postCode.required) {
          return ErrorMessages.REQUIRED_FIELD('Post Code')
        }

        if (!this.$v.model.postCode.mustBeFourDigits) {
          return ErrorMessages.INVALID_POST_CODE
        }
      }

      return ''
    },
  },

  methods: {
    ...mapActions(['updateCRMContact']),

    async fetchData() {
      this.displaySuccessMsg = false
      this.displayErrorMsg = false
      try {
        this.model = {
          ...this.contact,
          postalAddress: { ...(this.contact.postalAddress ?? {}) },
        }
        this.model.postalAddress = this.model.postalAddress ?? {}
        this.originalModel = {
          ...this.model,
          postalAddress: { ...this.model.postalAddress },
        }
      } catch {
        this.$notify.info({ message: 'Cannot get contact from Server.' })
      }

      this.updateContactInStateStore(this.originalModel)
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
    },

    onSave() {
      this.$v.$touch()
      this.displaySuccessMsg = false
      this.displayErrorMsg = false

      if (!this.$v.$invalid) {
        let vm = this
        let contactToUpdate = Utilities.cloneContact(vm.model)

        ContactApi.putContact(contactToUpdate)
          .then((response) => {
            if (response.status == 200) {
              vm.displaySuccessMsg = true
              vm.displayErrorMsg = false
              vm.originalModel = Utilities.cloneContact(vm.model)
              vm.updateContactInStateStore(vm.model)
            } else {
              vm.displayErrorMsg = true
              vm.displaySuccessMsg = false
            }
          })
          .catch(() => {
            vm.displayErrorMsg = true
            vm.displaySuccessMsg = false
          })
          .finally(() => {})
      }
    },

    updateContactInStateStore(contact) {
      if (this.isSelfProfile) {
        this.updateCRMContact(contact)
      }
    },

    onPostalAddressStreetSelected({ street, suburb, city, postCode }) {
      if (this.model.street === street) {
        this.$forceUpdate()
      }

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
