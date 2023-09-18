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
              <div class="col-md-1 col-xs-2">
                <label class="field-name">First Name</label>
              </div>
              <div class="col-md-3 col-xs-3">{{ model.firstName }}</div>
              <div class="col-md-1 col-xs-2"></div>
              <div class="col-md-1 col-xs-2">
                <label class="field-name">Last Name</label>
              </div>
              <div class="col-md-3 col-xs-3">{{ model.lastName }}</div>
            </div>
            <div class="row more-space"></div>
            <div class="row">
              <div class="col-md-4 col-xs-5">
                <label class="field-name">Mobile Phone</label>
                <q-input
                  dense
                  v-model="model.mobilePhone"
                  type="tel"
                  :maxlength="50"
                />
              </div>
              <div class="col-md-1 col-xs-2"></div>

              <div class="col-md-4 col-xs-5">
                <label class="field-name">Work Phone</label>
                <q-input
                  dense
                  v-model="model.workPhone"
                  type="tel"
                  :maxlength="50"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12"><q-space class="more-space" /></div>
            </div>
            <div class="row" v-if="isEmailEditable">
              <div class="col-md-4 col-xs-5">
                <label class="field-name">Email Address</label>
                <q-input
                  dense
                  v-model="model.emailAddress"
                  :error-message="emailErrors"
                  :error="$v.model.emailAddress.$error"
                  @blur="$v.model.emailAddress.$touch"
                  @input="$v.model.emailAddress.$touch"
                  maxlength="100"
                >
                  <template v-slot:before>
                    <q-icon name="mail" />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-md-1 col-xs-2">
                <label class="field-name">Email Address</label>
              </div>
              <div class="col-md-3 col-xs-3">{{ model.emailAddress }}</div>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-lg" v-if="isPhysicalAddressEditable">
            <h1 class="text-h5">Physical Address</h1>
            <div class="row">
              <div class="col-md-4 col-xs-5">
                <label class="field-name">Street</label>
                <skills-suggestions-address
                  dense
                  v-model="model.homeAddress.street"
                  :error-message="physicalAddressStreetErrors"
                  :error="$v.model.homeAddress.street.$error"
                  @blur="$v.model.homeAddress.street.$touch"
                  @input="$v.model.homeAddress.street.$touch"
                  maxlength="250"
                  :onItemSelected="onPhysicalAddressStreetSelected"
                />
              </div>
              <div class="col-md-1 col-xs-2"></div>
              <div class="col-md-4 col-xs-5">
                <label class="field-name">City</label>
                <q-input
                  dense
                  v-model="model.homeAddress.city"
                  :error-message="physicalAddressCityErrors"
                  :error="$v.model.homeAddress.city.$error"
                  @blur="$v.model.homeAddress.city.$touch"
                  @input="$v.model.homeAddress.city.$touch"
                  maxlength="80"
                  readonly
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-xs-5">
                <label class="field-name">Suburb</label>
                <q-input
                  dense
                  v-model="model.homeAddress.suburb"
                  maxlength="250"
                  readonly
                />
              </div>
              <div class="col-md-1 col-xs-2"></div>
              <div class="col-md-4 col-xs-5">
                <label class="field-name">Post Code</label>
                <q-input
                  dense
                  mask="####"
                  v-model="model.homeAddress.postCode"
                  :error-message="physicalAddressPostCodeErrors"
                  :error="$v.model.homeAddress.postCode.$error"
                  @blur="$v.model.homeAddress.postCode.$touch"
                  @input="$v.model.homeAddress.postCode.$touch"
                  readonly
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-lg" v-else-if="isPostalAddressEditable">
            <h1 class="text-h5">Address</h1>
            <div class="row">
              <div class="col-md-4 col-xs-5">
                <label class="field-name">Street</label>
                <skills-suggestions-address
                  dense
                  v-model="model.postalAddress.street"
                  :error-message="postalAddressStreetErrors"
                  :error="$v.model.postalAddress.street.$error"
                  @blur="$v.model.postalAddress.street.$touch"
                  @input="$v.model.postalAddress.street.$touch"
                  maxlength="250"
                  :onItemSelected="onPostalAddressStreetSelected"
                />
              </div>
              <div class="col-md-1 col-xs-2"></div>
              <div class="col-md-4 col-xs-5">
                <label class="field-name">City</label>
                <q-input
                  dense
                  v-model="model.postalAddress.city"
                  :error-message="postalAddressCityErrors"
                  :error="$v.model.postalAddress.city.$error"
                  @blur="$v.model.postalAddress.city.$touch"
                  @input="$v.model.postalAddress.city.$touch"
                  maxlength="80"
                  readonly
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-xs-5">
                <label class="field-name">Suburb</label>
                <q-input
                  dense
                  v-model="model.postalAddress.suburb"
                  maxlength="250"
                  readonly
                />
              </div>
              <div class="col-md-1 col-xs-2"></div>
              <div class="col-md-4 col-xs-5">
                <label class="field-name">Post Code</label>
                <q-input
                  dense
                  mask="####"
                  v-model="model.postalAddress.postCode"
                  :error-message="postalAddressPostCodeErrors"
                  :error="$v.model.postalAddress.postCode.$error"
                  @blur="$v.model.postalAddress.postCode.$touch"
                  @input="$v.model.postalAddress.postCode.$touch"
                  readonly
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-xs-5">
                <label class="field-name">Country</label>
                <q-input
                  dense
                  v-model="model.postalAddress.country"
                  :maxlength="80"
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
import Utilities from '../common/utilities.js'
import ContactApi from '../apis/contactApi.js'
import { required, email, maxLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { ErrorMessages } from '../common/constants.js'
import { mustBeFourDigits } from '../common/customValidators.js'

export default {
  name: 'UserProfile',

  components: {
    SkillsSuggestionsAddress: () =>
      import('../compoments/SkillsSuggestionsAddress.vue'),
  },

  data() {
    return {
      model: {
        homeAddress: {},
        postalAddress: {},
      },
      originalModel: {},
      displaySuccessMsg: false,
      displayErrorMsg: false,
    }
  },

  validations() {
    let model = {}
    if (this.isEmailEditable) {
      model = {
        ...model,
        emailAddress: {
          email,
          maxLength: maxLength(100),
        },
      }
    }

    if (this.isPhysicalAddressEditable) {
      model = {
        ...model,
        homeAddress: {
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
      }
    } else if (this.isPostalAddressEditable) {
      model = {
        ...model,
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
      }
    }

    return { model }
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    isEmailEditable: {
      type: Boolean,
      required: true,
    },
    isSelfProfile: {
      type: Boolean,
      required: true,
    },
    isPhysicalAddressEditable: {
      type: Boolean,
      required: true,
    },
    isPostalAddressEditable: {
      type: Boolean,
      required: true,
    },
  },

  async created() {
    await this.fetchData()
  },

  computed: {
    emailErrors() {
      if (this.$v.model.emailAddress.$dirty) {
        if (!this.$v.model.emailAddress.email) {
          return ErrorMessages.INVALID_EMAIL
        }

        if (!this.$v.model.emailAddress.maxLength) {
          return ErrorMessages.EXCEED_MAXLENGTH('Email')
        }
      }

      return ''
    },

    postalAddressStreetErrors() {
      if (
        this.$v.model.postalAddress.street.$dirty &&
        !this.$v.model.postalAddress.street.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    postalAddressCityErrors() {
      if (
        this.$v.model.postalAddress.city.$dirty &&
        !this.$v.model.postalAddress.city.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    postalAddressPostCodeErrors() {
      if (this.$v.model.postalAddress.postCode.$dirty) {
        if (!this.$v.model.postalAddress.postCode.required) {
          return ErrorMessages.REQUIRED_FIELD('Post Code')
        }

        if (!this.$v.model.postalAddress.postCode.mustBeFourDigits) {
          return ErrorMessages.INVALID_POST_CODE
        }
      }

      return ''
    },

    physicalAddressStreetErrors() {
      if (
        this.$v.model.homeAddress.street.$dirty &&
        !this.$v.model.homeAddress.street.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    physicalAddressCityErrors() {
      if (
        this.$v.model.homeAddress.city.$dirty &&
        !this.$v.model.homeAddress.city.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    physicalAddressPostCodeErrors() {
      if (this.$v.model.homeAddress.postCode.$dirty) {
        if (!this.$v.model.homeAddress.postCode.required) {
          return ErrorMessages.REQUIRED_FIELD('Post Code')
        }

        if (!this.$v.model.homeAddress.postCode.mustBeFourDigits) {
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
        const result = await ContactApi.getContactByContactId(this.id)
        this.model = {
          ...result.data,
          postalAddress: { ...(result.data.postalAddress ?? {}) },
          homeAddress: { ...(result.data.homeAddress ?? {}) },
        }
        this.model.postalAddress = this.model.postalAddress ?? {}
        this.model.homeAddress = this.model.homeAddress ?? {}
        this.originalModel = {
          ...this.model,
          postalAddress: { ...this.model.postalAddress },
          homeAddress: { ...this.model.homeAddress },
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
      this.model.homeAddress = this.model.homeAddress
        ? this.model.homeAddress
        : {}
    },

    onSave() {
      this.$v.$touch()
      this.displaySuccessMsg = false
      this.displayErrorMsg = false

      if (!this.$v.$invalid) {
        let vm = this
        let contactToUpdate = Utilities.cloneContact(vm.model)

        if (!this.isEmailEditable) {
          contactToUpdate.emailAddress = null
        }

        if (!this.isPhysicalAddressEditable) {
          contactToUpdate.homeAddress = null
        }

        if (!this.isPostalAddressEditable) {
          contactToUpdate.postalAddress = null
        }

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
      if (this.model.postalAddress.street === street) {
        this.$forceUpdate()
      }

      this.model.postalAddress.street = street
      this.model.postalAddress.suburb = suburb
      this.model.postalAddress.city = city
      this.model.postalAddress.postCode = postCode
    },

    onPhysicalAddressStreetSelected({ street, suburb, city, postCode }) {
      // strict code because if the old value street equals the new value street => vue will not render then we have to force update
      if (this.model.homeAddress.street === street) {
        this.$forceUpdate()
      }

      this.model.homeAddress.street = street
      this.model.homeAddress.suburb = suburb
      this.model.homeAddress.city = city
      this.model.homeAddress.postCode = postCode
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
