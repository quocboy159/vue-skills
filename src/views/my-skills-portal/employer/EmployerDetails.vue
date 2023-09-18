<template>
  <div>
    <div class="row">
      <label class="text-h4">Update Company Details</label>
    </div>

    <success-message ref="successMessage" />

    <failure-message ref="failureMessage" />

    <div class="row q-pt-lg">
      <div class="col-12">
        <q-card>
          <q-card-section class="q-pa-lg">
            <h1 class="text-h5">General Information</h1>

            <div class="row">
              <div class="row col-md-4 col-xs-12 form-group">
                <label class="field-name">Company Name</label>
                <div class="field-text">{{ employer.companyName }}</div>
              </div>

              <div class="row col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Account Manager</label>
                <div class="field-text">{{ employer.accountManager }}</div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <PhoneNumber
                  title="Main Phone"
                  titleClass="field-name"
                  :data="employer.mainPhone"
                  :key="employer.mainPhone"
                  ref="mainPhone"
                  propertyName="mainPhone"
                  :maxLength="parseInt(50)"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <PhoneNumber
                  title="Fax"
                  titleClass="field-name"
                  :data="employer.fax"
                  :key="employer.fax"
                  ref="fax"
                  propertyName="fax"
                  :maxLength="parseInt(50)"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Web</label>
                <q-input dense v-model="employer.web" maxlength="200" />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Email</label>
                <q-input
                  dense
                  v-model="employer.email"
                  :error-message="emailErrors"
                  :error="$v.employer.email.$error"
                  @input="$v.employer.email.$touch"
                  @blur="$v.employer.email.$touch"
                  maxlength="100"
                >
                  <template v-slot:before>
                    <q-icon name="mail" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-lg">
            <h1 class="text-h5">Postal Address</h1>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Street</label>
                <q-input
                  dense
                  v-model="employer.postalAddress.street"
                  :error-message="postalAddressStreetErrors"
                  :error="$v.employer.postalAddress.street.$error"
                  @input="$v.employer.postalAddress.street.$touch"
                  @blur="$v.employer.postalAddress.street.$touch"
                  :maxlength="100"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">City</label>
                <q-input
                  dense
                  v-model="employer.postalAddress.city"
                  :error-message="postalAddressCityErrors"
                  :error="$v.employer.postalAddress.city.$error"
                  @input="$v.employer.postalAddress.city.$touch"
                  @blur="$v.employer.postalAddress.city.$touch"
                  :maxlength="80"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Suburb</label>
                <q-input
                  dense
                  v-model="employer.postalAddress.suburb"
                  :maxlength="100"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Post Code</label>
                <q-input
                  dense
                  type="number"
                  v-model="employer.postalAddress.postCode"
                  :error-message="postalAddressPostCodeErrors"
                  :error="$v.employer.postalAddress.postCode.$error"
                  @input="$v.employer.postalAddress.postCode.$touch"
                  @blur="$v.employer.postalAddress.postCode.$touch"
                  @keydown="allowDigits"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-lg">
            <h1 class="text-h5">Physical Address</h1>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Street</label>
                <q-input
                  dense
                  v-model="employer.physicalAddress.street"
                  :error-message="physicalAddressStreetErrors"
                  :error="$v.employer.physicalAddress.street.$error"
                  @input="$v.employer.physicalAddress.street.$touch"
                  @blur="$v.employer.physicalAddress.street.$touch"
                  :maxlength="250"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">City</label>
                <q-input
                  dense
                  v-model="employer.physicalAddress.city"
                  :error-message="physicalAddressCityErrors"
                  :error="$v.employer.physicalAddress.city.$error"
                  @input="$v.employer.physicalAddress.city.$touch"
                  @blur="$v.employer.physicalAddress.city.$touch"
                  :maxlength="80"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Suburb</label>
                <q-input
                  dense
                  v-model="employer.physicalAddress.suburb"
                  :maxlength="250"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Post Code</label>
                <q-input
                  dense
                  type="number"
                  v-model="employer.physicalAddress.postCode"
                  :error-message="physicalAddressPostCodeErrors"
                  :error="$v.employer.physicalAddress.postCode.$error"
                  @input="$v.employer.physicalAddress.postCode.$touch"
                  @blur="$v.employer.physicalAddress.postCode.$touch"
                  @keydown="allowDigits"
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
      </div>
    </div>
  </div>
</template>
<script>
import FailureMessage from '../../../compoments/messages/FailureMessage.vue'
import SuccessMessage from '../../../compoments/messages/SuccessMessage.vue'
import PhoneNumber from '../../../compoments/PhoneNumber.vue'
import EmployerApi from '../../../apis/employerApi.js'
import { ErrorMessages } from '../../../common/constants.js'
import { mustBeFourDigits } from '../../../common/customValidators.js'
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'EmployerDetails',

  components: {
    FailureMessage,
    PhoneNumber,
    SuccessMessage,
  },

  data() {
    return {
      originalEmployer: null,
      employer: {
        companyName: null,
        accountManager: null,
        mainPhone: null,
        fax: null,
        web: null,
        email: null,
        physicalAddress: {
          street: null,
          suburb: null,
          city: null,
          postCode: null,
        },
        postalAddress: {
          street: null,
          suburb: null,
          city: null,
          postCode: null,
        },
      },
    }
  },

  validations: {
    employer: {
      email: {
        email,
      },
      physicalAddress: {
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
      },
      postalAddress: {
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
      },
    },
  },

  async created() {
    await this.fetchData()
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),

    emailErrors() {
      if (this.$v.employer.email.$dirty && !this.$v.employer.email.email) {
        return ErrorMessages.INVALID_EMAIL
      }

      return ''
    },

    postalAddressStreetErrors() {
      if (
        this.$v.employer.postalAddress.street.$dirty &&
        !this.$v.employer.postalAddress.street.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    postalAddressCityErrors() {
      if (
        this.$v.employer.postalAddress.city.$dirty &&
        !this.$v.employer.postalAddress.city.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    postalAddressPostCodeErrors() {
      if (this.$v.employer.postalAddress.postCode.$dirty) {
        if (!this.$v.employer.postalAddress.postCode.required) {
          return ErrorMessages.REQUIRED_FIELD('Post Code')
        }

        if (!this.$v.employer.postalAddress.postCode.mustBeFourDigits) {
          return ErrorMessages.INVALID_POST_CODE
        }
      }

      return ''
    },

    physicalAddressStreetErrors() {
      if (
        this.$v.employer.physicalAddress.street.$dirty &&
        !this.$v.employer.physicalAddress.street.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    physicalAddressCityErrors() {
      if (
        this.$v.employer.physicalAddress.city.$dirty &&
        !this.$v.employer.physicalAddress.city.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    physicalAddressPostCodeErrors() {
      if (this.$v.employer.physicalAddress.postCode.$dirty) {
        if (!this.$v.employer.physicalAddress.postCode.required) {
          return ErrorMessages.REQUIRED_FIELD('Post Code')
        }

        if (!this.$v.employer.physicalAddress.postCode.mustBeFourDigits) {
          return ErrorMessages.INVALID_POST_CODE
        }
      }

      return ''
    },
  },

  methods: {
    allowDigits(event) {
      /* https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes */
      if ((event.which !== 0 && event.which < 8) || event.which > 57) {
        event.preventDefault()
      }
    },

    async fetchData() {
      const result = await EmployerApi.getEmployerById(
        this.crmCurrentUser.accountId
      )
      this.employer = { ...result.data }
      this.originalEmployer = {
        ...this.employer,
        postalAddress: { ...this.employer.postalAddress },
        physicalAddress: { ...this.employer.physicalAddress },
      }
    },

    async onSave() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          this.employer = {
            ...this.employer,
            mainPhone: this.$refs.mainPhone.getPhoneNumber(),
            fax: this.$refs.fax.getPhoneNumber(),
          }
          await EmployerApi.updateEmployer(
            this.crmCurrentUser.accountId,
            this.employer
          )
          this.originalEmployer = {
            ...this.employer,
            postalAddress: { ...this.employer.postalAddress },
            physicalAddress: { ...this.employer.physicalAddress },
          }
          this.$refs.failureMessage.onCloseMessage()
          this.$refs.successMessage.onOpenMessage()
        } catch (e) {
          this.$refs.successMessage.onCloseMessage()
          this.$refs.failureMessage.onOpenMessage()
          /* eslint-disable */
          console.error(e)
        }
      }
    },

    onReset() {
      this.employer = {
        ...this.originalEmployer,
        postalAddress: { ...this.originalEmployer.postalAddress },
        physicalAddress: { ...this.originalEmployer.physicalAddress },
      }
      this.$refs.mainPhone.setPhoneNumber(this.originalEmployer.mainPhone)
      this.$refs.fax.setPhoneNumber(this.originalEmployer.fax)
      this.$v.$reset()
      this.$refs.successMessage.onCloseMessage()
      this.$refs.failureMessage.onCloseMessage()
    },
  },
}
</script>
