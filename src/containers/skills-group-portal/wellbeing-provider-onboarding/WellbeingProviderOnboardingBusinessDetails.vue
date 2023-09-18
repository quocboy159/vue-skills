<template>
  <q-card-section class="q-pa-lg">
    <div class="row">
      <div class="col-md-4 col-xs-12 form-group">
        <label class="field-name">Business Arrangement</label>
        <base-radio
          :options="BusinessArrangements"
          v-model="model.businessDetails.arrangement"
          :error-message="arrangementErrors"
          :error="$v.model.businessDetails.arrangement.$error"
          @change="
            update('businessDetails.arrangement', $event)
            $v.model.businessDetails.arrangement.$touch()
          "
          class="field-input"
        />
      </div>

      <div class="col-md-4 offset-md-1 col-xs-12 form-group">
        <label class="field-name">Name</label>
        <q-input
          v-model="model.businessDetails.name"
          :error-message="nameErrors"
          :error="$v.model.businessDetails.name.$error"
          @input="
            $v.model.businessDetails.name.$touch()
            update('businessDetails.name', $event)
          "
          @blur="$v.model.businessDetails.name.$touch"
          dense
          class="field-input"
        />
      </div>
    </div>

    <h1 class="text-h5">Business Address</h1>

    <div class="row">
      <div class="col-md-4 col-xs-12 form-group">
        <label class="field-name">Country</label>
        <app-select
          v-model="model.businessDetails.address.country"
          :options="countryOptions"
          @input="update('businessDetails.address.country', $event, true)"
          class="field-input"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 col-xs-12 form-group">
        <label class="field-name">Street</label>
        <skills-suggestions-address
          dense
          v-model="model.businessDetails.address.street"
          :error-message="streetErrors"
          :error="$v.model.businessDetails.address.street.$error"
          @input="
            update('businessDetails.address.street', $event)
            $v.model.businessDetails.address.street.$touch()
          "
          @blur="$v.model.businessDetails.address.street.$touch"
          :maxlength="100"
          :onItemSelected="onStreetSelected"
          isSkillsGroupPortal
          v-if="displaySuggestionsAddress"
        />
        <q-input
          v-else
          dense
          :error-message="streetErrors"
          :error="$v.model.businessDetails.address.street.$error"
          @input="
            update('businessDetails.address.street', $event)
            $v.model.businessDetails.address.street.$touch()
          "
          @blur="$v.model.businessDetails.address.street.$touch"
          v-model="model.businessDetails.address.street"
          maxlength="250"
          :readonly="disableStreet"
          class="field-input"
        />
      </div>

      <div class="col-md-4 offset-md-1 col-xs-12 form-group">
        <label class="field-name">City</label>
        <q-input
          dense
          v-model="model.businessDetails.address.city"
          :error-message="cityErrors"
          :error="$v.model.businessDetails.address.city.$error"
          @input="
            update('businessDetails.address.city', $event)
            $v.model.businessDetails.address.city.$touch()
          "
          @blur="$v.model.businessDetails.address.city.$touch"
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
          v-model="model.businessDetails.address.suburb"
          :maxlength="100"
          :readonly="disableCitySuburbPostcode"
        />
      </div>

      <div class="col-md-4 offset-md-1 col-xs-12 form-group">
        <label class="field-name">Post Code</label>
        <skills-post-code
          dense
          v-model="model.businessDetails.address.postCode"
          :country="model.businessDetails.address.country"
          :error-message="postCodeErrors"
          :error="$v.model.businessDetails.address.postCode.$error"
          @input="
            update('businessDetails.address.postCode', $event)
            $v.model.businessDetails.address.postCode.$touch()
          "
          @blur="$v.model.businessDetails.address.$touch"
          :readonly="disableCitySuburbPostcode"
        />
      </div>
    </div>

    <div class="row q-pt-md">
      <div class="col-md-4 col-xs-12 form-group">
        <label class="field-name">Business Mobile</label>
        <q-input
          v-model="model.businessDetails.mobile"
          :error-message="mobileErrors"
          :error="$v.model.businessDetails.mobile.$error"
          @input="
            update('businessDetails.mobile', $event)
            $v.model.businessDetails.mobile.$touch()
          "
          @blur="$v.model.businessDetails.mobile.$touch"
          dense
          class="field-input"
        />
      </div>

      <div class="col-md-4 offset-md-1 col-xs-12 form-group">
        <label class="field-name">Business Phone</label>
        <q-input
          v-model="model.businessDetails.phone"
          @input="update('businessDetails.phone', $event)"
          dense
          class="field-input"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 col-xs-12 form-group">
        <label class="field-name">Website</label>
        <q-input
          v-model="model.businessDetails.website"
          :error-message="websiteErrors"
          :error="$v.model.businessDetails.website.$error"
          @input="
            $v.model.businessDetails.firstName.$touch()
            update('businessDetails.website', $event)
          "
          @blur="$v.model.businessDetails.website.$touch"
          dense
          class="field-input"
        />
      </div>
      <div class="col-md-4 offset-md-1 col-xs-12 form-group">
        <label class="field-name">Email Address</label>
        <q-input
          v-model="model.businessDetails.emailAddress"
          :error-message="emailAddressErrors"
          :error="$v.model.businessDetails.emailAddress.$error"
          @input="
            $v.model.businessDetails.emailAddress.$touch()
            update('businessDetails.emailAddress', $event)
          "
          @blur="$v.model.businessDetails.emailAddress.$touch"
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
  BusinessArrangements,
  NEW_ZEALAND,
  WELLBEING_PROVIDER_ONBOARDING_VALIDATE_EVENT,
} from '../../../common/constants.js'
import { cloneDeep, tap, set } from 'lodash'
import { required, email, url } from 'vuelidate/lib/validators'
import { EventBus } from '@/common/eventBus'
import Utilities from '@/common/utilities.js'

export default {
  name: 'WellbeingProviderOnboardingBusinessDetails',

  components: {
    BaseRadio: () => import('@/compoments/inputs/BaseRadio'),
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
  },

  data() {
    return {
      countryOptions: Utilities.getCountries(),
      BusinessArrangements,
    }
  },

  validations: {
    model: {
      businessDetails: {
        arrangement: { required },
        name: { required },
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
        mobile: { required },
        phone: { required },
        website: { url },
        emailAddress: { email },
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
          businessDetails: {
            arrangement: null,
            name: null,
            address: {
              country: null,
              street: null,
              suburb: null,
              city: null,
              postCode: null,
            },
            mobile: null,
            phone: null,
            emailAddress: null,
            website: null,
          },
        }
      )
    },

    disableCitySuburbPostcode() {
      if (
        !this.model.businessDetails.address.country?.value ||
        this.model.businessDetails.address.country?.value === NEW_ZEALAND
      )
        return true
      return false
    },

    disableStreet() {
      if (this.model.businessDetails.address.country?.value) return false
      return true
    },

    displaySuggestionsAddress() {
      return this.model.businessDetails.address.country?.value === NEW_ZEALAND
    },

    arrangementErrors() {
      if (
        this.$v.model.businessDetails.arrangement.$dirty &&
        !this.$v.model.businessDetails.arrangement.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Business Arrangement')
      }

      return ''
    },

    nameErrors() {
      if (
        this.$v.model.businessDetails.name.$dirty &&
        !this.$v.model.businessDetails.name.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Business Name')
      }

      return ''
    },

    mobileErrors() {
      if (
        this.$v.model.businessDetails.mobile.$dirty &&
        !this.$v.model.businessDetails.mobile.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Business Mobile')
      }

      return ''
    },

    phoneErrors() {
      if (
        this.$v.model.businessDetails.phone.$dirty &&
        !this.$v.model.businessDetails.phone.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Business Phone')
      }

      return ''
    },

    emailAddressErrors() {
      if (this.$v.model.businessDetails.emailAddress.$dirty) {
        if (!this.$v.model.businessDetails.emailAddress.required)
          return ErrorMessages.REQUIRED_FIELD('Email Address')

        if (!this.$v.model.businessDetails.emailAddress.email)
          return ErrorMessages.INVALID_EMAIL
      }

      return ''
    },

    streetErrors() {
      if (
        this.$v.model.businessDetails.address.street.$dirty &&
        !this.$v.model.businessDetails.address.street.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    cityErrors() {
      if (
        this.$v.model.businessDetails.address.city.$dirty &&
        !this.$v.model.businessDetails.address.city.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    postCodeErrors() {
      if (
        this.$v.model.businessDetails.address.postCode.$dirty &&
        !this.$v.model.businessDetails.address.postCode.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Post Code')
      }

      return ''
    },

    websiteErrors() {
      if (
        this.$v.model.businessDetails.website.$dirty &&
        !this.$v.model.businessDetails.website.url
      ) {
        return ErrorMessages.INVALID_URL
      }

      return ''
    },
  },

  methods: {
    onChangeAddressCountry() {
      this.model.businessDetails.address.street = ''
      this.model.businessDetails.address.suburb = ''
      this.model.businessDetails.address.city = ''
      this.model.businessDetails.address.postCode = ''
    },

    onStreetSelected({ street, suburb, city, postCode }) {
      this.model.businessDetails.address.street = street
      this.model.businessDetails.address.suburb = suburb
      this.model.businessDetails.address.city = city
      this.model.businessDetails.address.postCode = postCode
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
