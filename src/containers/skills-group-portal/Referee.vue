<template>
  <div>
    <h1 class="text-h6">{{ title }}</h1>

    <div class="col-xs-12 form-group">
      <label class="field-name">First Name</label>
      <q-input
        dense
        v-model="referee.firstName"
        :error-message="firstNameError"
        :error="$v.referee.firstName.$error"
        @input="$v.referee.firstName.$touch"
        @blur="$v.referee.firstName.$touch"
        maxlength="50"
        class="field-input"
        :disable="isDiabled"
      />
    </div>

    <div class="col-xs-12 form-group">
      <label class="field-name">Last Name</label>
      <q-input
        dense
        v-model="referee.lastName"
        :error-message="lastNameError"
        :error="$v.referee.lastName.$error"
        @input="$v.referee.lastName.$touch"
        @blur="$v.referee.lastName.$touch"
        maxlength="50"
        class="field-input"
        :disable="isDiabled"
      />
    </div>

    <div class="col-xs-12 form-group">
      <label class="field-name">Organisation</label>
      <q-input
        dense
        v-model="referee.organisation"
        :error-message="organisationError"
        :error="$v.referee.organisation.$error"
        @input="$v.referee.organisation.$touch"
        @blur="$v.referee.organisation.$touch"
        maxlength="100"
        class="field-input"
        :disable="isDiabled"
      />
    </div>

    <div class="col-xs-12 form-group">
      <label class="field-name">Position</label>
      <q-input
        dense
        v-model="referee.position"
        :error-message="positionError"
        :error="$v.referee.position.$error"
        @input="$v.referee.position.$touch"
        @blur="$v.referee.position.$touch"
        maxlength="100"
        class="field-input"
        :disable="isDiabled"
      />
    </div>

    <div class="col-xs-12 form-group">
      <label class="field-name">Email Address</label>
      <q-input
        dense
        v-model="referee.email"
        :error-message="emailError"
        :error="$v.referee.email.$error"
        @input="$v.referee.email.$touch"
        @blur="$v.referee.email.$touch"
        maxlength="50"
        class="field-input"
        :disable="isDiabled"
      />
    </div>

    <div class="col-xs-12 form-group">
      <label class="field-name">Mobile Phone</label>
      <q-input
        dense
        v-model="referee.mobilePhone"
        :error-message="mobilePhoneError"
        :error="$v.referee.mobilePhone.$error"
        @input="$v.referee.mobilePhone.$touch"
        @blur="$v.referee.mobilePhone.$touch"
        maxlength="100"
        class="field-input"
        :disable="isDiabled"
      />
    </div>

    <div class="col-xs-12 form-group">
      <label class="field-name">Other Phone (if available)</label>
      <q-input
        dense
        v-model="referee.phone"
        maxlength="100"
        class="field-input"
        :disable="isDiabled"
      />
    </div>
  </div>
</template>

<script>
import {
  required,
  email as validEmail,
  helpers,
} from 'vuelidate/lib/validators'
import { ErrorMessages } from '@/common/constants.js'

const mustBeDifferent = (param) => (value) => {
  const isValid =
    !helpers.req(value) || !param || value.toLowerCase() !== param.toLowerCase()
  // console.log('isValid: ', isValid)
  return isValid
}

export default {
  props: {
    data: Object,
    title: String,
    isDiabled: Boolean,
    canValidateForm: Boolean,
    secondRefereeEmail: String,
  },
  data() {
    return {
      referee: this.data,
    }
  },
  computed: {
    firstNameError() {
      if (
        this.$v.referee.firstName.$dirty &&
        !this.$v.referee.firstName.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('First Name')
      }
      return ''
    },
    lastNameError() {
      if (
        this.$v.referee.lastName.$dirty &&
        !this.$v.referee.lastName.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Last Name')
      }
      return ''
    },
    organisationError() {
      if (
        this.$v.referee.organisation.$dirty &&
        !this.$v.referee.organisation.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Organisation')
      }
      return ''
    },
    positionError() {
      if (
        this.$v.referee.position.$dirty &&
        !this.$v.referee.position.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Position')
      }
      return ''
    },
    emailError() {
      if (this.$v.referee.email.$dirty) {
        if (
          typeof this.$v.referee.email.validEmail !== 'undefined' &&
          !this.$v.referee.email.validEmail
        ) {
          return ErrorMessages.INVALID_EMAIL
        }

        if (
          typeof this.$v.referee.email.required !== 'undefined' &&
          !this.$v.referee.email.required
        ) {
          return ErrorMessages.REQUIRED_FIELD('Email')
        }

        if (!this.$v.referee.email.mustBeDifferentEmail) {
          return 'Email address must be different for each referee'
        }
      }
      return ''
    },
    mobilePhoneError() {
      if (
        this.$v.referee.mobilePhone.$dirty &&
        !this.$v.referee.mobilePhone.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Mobile Phone')
      }
      return ''
    },
  },
  validations() {
    if (this.canValidateForm) {
      return {
        referee: {
          firstName: {
            required,
          },
          lastName: {
            required,
          },
          organisation: {
            required,
          },
          position: {
            required,
          },
          email: {
            required,
            validEmail,
            mustBeDifferentEmail: mustBeDifferent(this.secondRefereeEmail),
          },
          mobilePhone: {
            required,
          },
        },
      }
    } else {
      return {
        referee: {
          firstName: {},
          lastName: {},
          organisation: {},
          position: {},
          email: {
            validEmail,
          },
          mobilePhone: {},
        },
      }
    }
  },
  methods: {
    isValid() {
      this.$v.$touch()
      return !this.$v.$invalid
    },
    getData() {
      return this.referee
    },
    resetValidation() {
      this.$v.$reset()
    },
  },
  watch: {
    data(newValue) {
      this.referee = newValue
    },
    'referee.email'(newValue) {
      if (this.$v.referee.email.validEmail) {
        this.$emit('emailChanged', newValue)
      }
    },
  },
}
</script>
