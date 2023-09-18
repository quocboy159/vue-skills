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
                <div class="field-text">{{ company.companyName }}</div>
              </div>

              <div class="row col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Account Manager</label>
                <div class="field-text">{{ company.accountManager }}</div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Main Phone</label>
                <q-input dense v-model="company.mainPhone" maxlength="50" />
              </div>
              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Fax</label>
                <q-input dense v-model="company.fax" maxlength="50" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Web</label>
                <q-input dense v-model="company.web" maxlength="200" />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Email</label>
                <q-input
                  dense
                  v-model="company.email"
                  :error-message="emailErrors"
                  :error="$v.company.email.$error"
                  @input="$v.company.email.$touch"
                  @blur="$v.company.email.$touch"
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
                <skills-suggestions-address
                  dense
                  v-model="company.postalAddress.street"
                  :error-message="postalAddressStreetErrors"
                  :error="$v.company.postalAddress.street.$error"
                  @input="$v.company.postalAddress.street.$touch"
                  @blur="$v.company.postalAddress.street.$touch"
                  :maxlength="100"
                  :onItemSelected="onPostalAddressStreetSelected"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">City</label>
                <q-input
                  dense
                  v-model="company.postalAddress.city"
                  :error-message="postalAddressCityErrors"
                  :error="$v.company.postalAddress.city.$error"
                  @input="$v.company.postalAddress.city.$touch"
                  @blur="$v.company.postalAddress.city.$touch"
                  :maxlength="80"
                  readonly
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Suburb</label>
                <q-input
                  dense
                  v-model="company.postalAddress.suburb"
                  :maxlength="100"
                  readonly
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Post Code</label>
                <q-input
                  dense
                  mask="####"
                  v-model="company.postalAddress.postCode"
                  :error-message="postalAddressPostCodeErrors"
                  :error="$v.company.postalAddress.postCode.$error"
                  @input="$v.company.postalAddress.postCode.$touch"
                  @blur="$v.company.postalAddress.postCode.$touch"
                  readonly
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-lg">
            <h1 class="text-h5">Physical Address</h1>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Street</label>
                <skills-suggestions-address
                  dense
                  v-model="company.physicalAddress.street"
                  :error-message="physicalAddressStreetErrors"
                  :error="$v.company.physicalAddress.street.$error"
                  @input="$v.company.physicalAddress.street.$touch"
                  @blur="$v.company.physicalAddress.street.$touch"
                  :maxlength="250"
                  :onItemSelected="onPhysicalAddressStreetSelected"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">City</label>
                <q-input
                  dense
                  v-model="company.physicalAddress.city"
                  :error-message="physicalAddressCityErrors"
                  :error="$v.company.physicalAddress.city.$error"
                  @input="$v.company.physicalAddress.city.$touch"
                  @blur="$v.company.physicalAddress.city.$touch"
                  :maxlength="80"
                  readonly
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Suburb</label>
                <q-input
                  dense
                  v-model="company.physicalAddress.suburb"
                  :maxlength="250"
                  readonly
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Post Code</label>
                <q-input
                  dense
                  mask="####"
                  v-model="company.physicalAddress.postCode"
                  :error-message="physicalAddressPostCodeErrors"
                  :error="$v.company.physicalAddress.postCode.$error"
                  @input="$v.company.physicalAddress.postCode.$touch"
                  @blur="$v.company.physicalAddress.postCode.$touch"
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
      </div>
    </div>
  </div>
</template>
<script>
import EmployerApi from '../apis/employerApi.js'
import { ErrorMessages } from '../common/constants.js'
import { mustBeFourDigits } from '../common/customValidators.js'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'CompanyDetails',

  components: {
    SuccessMessage: () => import('../compoments/messages/SuccessMessage.vue'),
    FailureMessage: () => import('../compoments/messages/FailureMessage.vue'),
    SkillsSuggestionsAddress: () =>
      import('../compoments/SkillsSuggestionsAddress.vue'),
  },

  data() {
    return {
      query: '',
      originalCompany: null,
      company: {
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
    company: {
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

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  async created() {
    await this.fetchData(this.id)
  },

  computed: {
    emailErrors() {
      if (this.$v.company.email.$dirty && !this.$v.company.email.email) {
        return ErrorMessages.INVALID_EMAIL
      }

      return ''
    },
    postalAddressStreetErrors() {
      if (
        this.$v.company.postalAddress.street.$dirty &&
        !this.$v.company.postalAddress.street.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    postalAddressCityErrors() {
      if (
        this.$v.company.postalAddress.city.$dirty &&
        !this.$v.company.postalAddress.city.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    postalAddressPostCodeErrors() {
      if (this.$v.company.postalAddress.postCode.$dirty) {
        if (!this.$v.company.postalAddress.postCode.required) {
          return ErrorMessages.REQUIRED_FIELD('Post Code')
        }

        if (!this.$v.company.postalAddress.postCode.mustBeFourDigits) {
          return ErrorMessages.INVALID_POST_CODE
        }
      }

      return ''
    },

    physicalAddressStreetErrors() {
      if (
        this.$v.company.physicalAddress.street.$dirty &&
        !this.$v.company.physicalAddress.street.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    physicalAddressCityErrors() {
      if (
        this.$v.company.physicalAddress.city.$dirty &&
        !this.$v.company.physicalAddress.city.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    physicalAddressPostCodeErrors() {
      if (this.$v.company.physicalAddress.postCode.$dirty) {
        if (!this.$v.company.physicalAddress.postCode.required) {
          return ErrorMessages.REQUIRED_FIELD('Post Code')
        }

        if (!this.$v.company.physicalAddress.postCode.mustBeFourDigits) {
          return ErrorMessages.INVALID_POST_CODE
        }
      }

      return ''
    },
  },

  methods: {
    async fetchData(accountId) {
      const result = await EmployerApi.getEmployerById(accountId)
      this.company = { ...result.data }
      this.originalCompany = {
        ...this.company,
        postalAddress: { ...this.company.postalAddress },
        physicalAddress: { ...this.company.physicalAddress },
      }
    },

    async onSave() {
      this.$refs.successMessage.onCloseMessage()
      this.$refs.failureMessage.onCloseMessage()
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          await EmployerApi.updateEmployer(this.id, this.company)
          this.originalCompany = {
            ...this.company,
            postalAddress: { ...this.company.postalAddress },
            physicalAddress: { ...this.company.physicalAddress },
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
      this.company = {
        ...this.originalCompany,
        postalAddress: { ...this.originalCompany.postalAddress },
        physicalAddress: { ...this.originalCompany.physicalAddress },
      }
      this.$v.$reset()
      this.$refs.successMessage.onCloseMessage()
      this.$refs.failureMessage.onCloseMessage()
    },

    onPostalAddressStreetSelected({ street, suburb, city, postCode }) {
      this.company.postalAddress.street = street
      this.company.postalAddress.suburb = suburb
      this.company.postalAddress.city = city
      this.company.postalAddress.postCode = postCode
    },

    onPhysicalAddressStreetSelected({ street, suburb, city, postCode }) {
      this.company.physicalAddress.street = street
      this.company.physicalAddress.suburb = suburb
      this.company.physicalAddress.city = city
      this.company.physicalAddress.postCode = postCode
    },
  },
}
</script>
