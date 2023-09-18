<template>
  <q-card-section class="q-pa-lg">
    <div class="row">
      <div class="col-md-4 col-xs-12 form-group">
        <label class="field-name">First Name</label>
        <q-input
          :value="model.personalDetails.firstName"
          :error-message="firstNameErrors"
          :error="$v.model.personalDetails.firstName.$error"
          @input="
            update('personalDetails.firstName', $event)
            $v.model.personalDetails.firstName.$touch()
          "
          @blur="$v.model.personalDetails.firstName.$touch"
          dense
          class="field-input"
        />
      </div>

      <div class="col-md-4 offset-md-1 col-xs-12 form-group">
        <label class="field-name">Last Name</label>
        <q-input
          :value="model.personalDetails.lastName"
          :error-message="lastNameErrors"
          :error="$v.model.personalDetails.lastName.$error"
          @input="
            $v.model.personalDetails.lastName.$touch()
            update('personalDetails.lastName', $event)
          "
          @blur="$v.model.personalDetails.lastName.$touch"
          dense
          class="field-input"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 col-xs-12 form-group">
        <label class="field-name">Middle Name</label>
        <q-input
          :value="model.personalDetails.middleName"
          :error-message="middleNameErrors"
          :error="$v.model.personalDetails.middleName.$error"
          @input="
            $v.model.personalDetails.middleName.$touch()
            update('personalDetails.middleName', $event)
          "
          @blur="$v.model.personalDetails.middleName.$touch"
          dense
          class="field-input"
        />
      </div>

      <div class="col-md-4 offset-md-1 col-xs-12 form-group">
        <label class="field-name">Email</label>
        <q-input
          :value="model.personalDetails.email"
          :error-message="emailErrors"
          :error="$v.model.personalDetails.email.$error"
          @input="
            $v.model.personalDetails.email.$touch()
            update('personalDetails.email', $event)
          "
          @blur="$v.model.personalDetails.email.$touch"
          dense
          class="field-input"
        />
      </div>
    </div>

    <h1 class="text-h5">Postal Address</h1>

    <div class="row">
      <div class="col-md-4 col-xs-12 form-group">
        <label class="field-name">Country</label>
        <app-select
          :value="model.personalDetails.address.country"
          :options="countryOptions"
          @input="update('personalDetails.address.country', $event, true)"
          class="field-input"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 col-xs-12 form-group">
        <label class="field-name">Street</label>
        <skills-suggestions-address
          dense
          :value="model.personalDetails.address.street"
          :error-message="streetErrors"
          :error="$v.model.personalDetails.address.street.$error"
          @input="
            update('personalDetails.address.street', $event)
            $v.model.personalDetails.address.street.$touch()
          "
          @blur="$v.model.personalDetails.address.street.$touch"
          :maxlength="100"
          :onItemSelected="onStreetSelected"
          isSkillsGroupPortal
          v-if="displaySuggestionsAddress"
        />
        <q-input
          v-else
          dense
          :error-message="streetErrors"
          :error="$v.model.personalDetails.address.street.$error"
          @input="
            update('personalDetails.address.street', $event)
            $v.model.personalDetails.address.street.$touch()
          "
          @blur="$v.model.personalDetails.address.street.$touch"
          :value="model.personalDetails.address.street"
          maxlength="250"
          :readonly="disableStreet"
          class="field-input"
        />
      </div>

      <div class="col-md-4 offset-md-1 col-xs-12 form-group">
        <label class="field-name">City</label>
        <q-input
          dense
          :value="model.personalDetails.address.city"
          :error-message="cityErrors"
          :error="$v.model.personalDetails.address.city.$error"
          @input="
            update('personalDetails.address.city', $event)
            $v.model.personalDetails.address.city.$touch()
          "
          @blur="$v.model.personalDetails.address.city.$touch"
          :maxlength="80"
          :readonly="disableCitySuburbPostcode"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 col-xs-12 form-group">
        <label class="field-name">Suburb</label>
        <q-input
          dense
          :value="model.personalDetails.address.suburb"
          @input="update('personalDetails.address.suburb', $event)"
          :maxlength="100"
          :readonly="disableCitySuburbPostcode"
        />
      </div>

      <div class="col-md-4 offset-md-1 col-xs-12 form-group">
        <label class="field-name">Post Code</label>
        <skills-post-code
          dense
          :value="model.personalDetails.address.postCode"
          :country="model.personalDetails.address.country"
          :error-message="postCodeErrors"
          :error="$v.model.personalDetails.address.postCode.$error"
          @input="
            update('personalDetails.address.postCode', $event)
            $v.model.personalDetails.address.postCode.$touch()
          "
          @blur="$v.model.personalDetails.address.$touch"
          :readonly="disableCitySuburbPostcode"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 col-xs-12 form-group">
        <label class="field-name">Website</label>
        <q-input
          :value="model.personalDetails.website"
          :error-message="websiteErrors"
          :error="$v.model.personalDetails.website.$error"
          @input="
            $v.model.personalDetails.firstName.$touch()
            update('personalDetails.website', $event)
          "
          @blur="$v.model.personalDetails.website.$touch"
          dense
          class="field-input"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-9 col-xs-12 form-group">
        <label class="field-name">
          Please advise the focus of your professional services and specific
          modes you most often use (3 – 4 sentences for clients to refer to):
        </label>
        <q-input
          :value="model.note"
          @input="update('personalDetails.note', $event)"
          type="textarea"
          dense
          class="field-input"
        />
      </div>
    </div>
  </q-card-section>
</template>
<script>
import {
  ErrorMessages,
  NEW_ZEALAND,
  WELLBEING_PROVIDER_ONBOARDING_VALIDATE_EVENT,
} from '../../../common/constants.js'
import { cloneDeep, tap, set } from 'lodash'
import { required, email, url } from 'vuelidate/lib/validators'
import { EventBus } from '@/common/eventBus'
import Utilities from '@/common/utilities.js'
export default {
  name: 'WellbeingProviderOnboardingPersonalDetails',

  components: {
    SkillsSuggestionsAddress: () =>
      import('@/compoments/SkillsSuggestionsAddress.vue'),
    AppSelect: () => import('@/compoments/select/AppSelect.vue'),
    SkillsPostCode: () => import('@/compoments/SkillsPostCode.vue'),
  },

  props: {
    value: {
      type: Object,
      required: false,
    },
    tab: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      countryOptions: Utilities.getCountries(),
    }
  },

  validations: {
    model: {
      personalDetails: {
        firstName: { required },
        lastName: { required },
        middleName: { required },
        email: { email },
        website: { url },
        address: {
          street: {
            required,
          },
          city: {
            required,
          },
          postCode: {
            required,
          },
        },
      },
    },
  },

  created() {
    EventBus.$on(WELLBEING_PROVIDER_ONBOARDING_VALIDATE_EVENT, () => {
      this.validate()
    })
  },

  computed: {
    model() {
      return (
        this.value ?? {
          personalDetails: {
            firstName: null,
            middleName: null,
            lastName: null,
            address: {
              country: null,
              street: null,
              suburb: null,
              city: null,
              postCode: null,
            },
            mobileNumber: null,
            homeNumber: null,
            email: null,
            website: null,
            note: null,
          },
        }
      )
    },

    disableCitySuburbPostcode() {
      if (
        !this.model.personalDetails.address.country?.value ||
        this.model.personalDetails.address.country?.value === NEW_ZEALAND
      )
        return true
      return false
    },

    disableStreet() {
      if (this.model.personalDetails.address.country?.value) return false
      return true
    },

    displaySuggestionsAddress() {
      return this.model.personalDetails.address.country?.value === NEW_ZEALAND
    },

    firstNameErrors() {
      if (
        this.$v.model.personalDetails.firstName.$dirty &&
        !this.$v.model.personalDetails.firstName.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('First Name')
      }

      return ''
    },

    lastNameErrors() {
      if (
        this.$v.model.personalDetails.lastName.$dirty &&
        !this.$v.model.personalDetails.lastName.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Last Name')
      }

      return ''
    },

    middleNameErrors() {
      if (
        this.$v.model.personalDetails.middleName.$dirty &&
        !this.$v.model.personalDetails.middleName.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Middle Name')
      }

      return ''
    },

    emailErrors() {
      if (this.$v.model.personalDetails.email.$dirty) {
        if (!this.$v.model.personalDetails.email.required)
          return ErrorMessages.REQUIRED_FIELD('Email')

        if (!this.$v.model.personalDetails.email.email)
          return ErrorMessages.INVALID_EMAIL
      }

      return ''
    },

    streetErrors() {
      if (
        this.$v.model.personalDetails.address.street.$dirty &&
        !this.$v.model.personalDetails.address.street.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    cityErrors() {
      if (
        this.$v.model.personalDetails.address.city.$dirty &&
        !this.$v.model.personalDetails.address.city.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    postCodeErrors() {
      if (
        this.$v.model.personalDetails.address.postCode.$dirty &&
        !this.$v.model.personalDetails.address.postCode.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Post Code')
      }

      return ''
    },

    websiteErrors() {
      if (
        this.$v.model.personalDetails.website.$dirty &&
        !this.$v.model.personalDetails.website.url
      ) {
        return ErrorMessages.INVALID_URL
      }

      return ''
    },
  },

  methods: {
    onChangeAddressCountry() {
      this.model.personalDetails.address.street = ''
      this.model.personalDetails.address.suburb = ''
      this.model.personalDetails.address.city = ''
      this.model.personalDetails.address.postCode = ''
    },

    onStreetSelected({ street, suburb, city, postCode }) {
      this.model.personalDetails.address.street = street
      this.model.personalDetails.address.suburb = suburb
      this.model.personalDetails.address.city = city
      this.model.personalDetails.address.postCode = postCode
    },

    update(key, value, isCountry = false) {
      if (isCountry) {
        this.onChangeAddressCountry()
      }

      // tap: a interceptor of a object
      // set: a function to set the value at path of object
      const data = tap(cloneDeep(this.model), (v) => set(v, key, value))
      this.$emit('input', data)
    },

    validate() {
      this.$v.$touch()
    },
  },
}
</script>
