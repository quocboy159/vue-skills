<template>
  <q-page padding>
    <div id="sign-up" class="row">
      <div class="col-12">
        <div class="row text-center">
          <div class="col-12">
            <h1 class="text-h1">Sign Up</h1>
          </div>
        </div>
        <q-form class="row text-center" v-if="!isSuccess">
          <div class="col-12" :class="LayoutChild1">
            <p class="text-subtitle1">
              Provide the following details to create a
              {{ companyName }} account.
            </p>
          </div>

          <div class="row module-container">
            <div class="row contents">
              <div id="sign-up-modules" class="col-12">
                <div class="row" :class="LayoutParent">
                  <div class="col-12" :class="LayoutChild2">
                    <div class="row justify-center">
                      <div class="col-12 centerer" :class="LayoutChild2">
                        <q-input
                          dense
                          id="f-name"
                          v-model="fName"
                          label="First Name *"
                          bottom-slots
                          error-message="Field is required"
                          :error="$v.fName.$error"
                          bg-color="fieldbg"
                          color="field"
                          maxlength="25"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="close"
                              @click="fName = ''"
                              class="cursor-pointer"
                            />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row justify-center">
                      <div class="col-12 centerer" :class="LayoutChild2">
                        <q-input
                          dense
                          id="l-name"
                          v-model="lName"
                          class
                          label="Last Name *"
                          bottom-slots
                          error-message="Field is required"
                          :error="$v.lName.$error"
                          bg-color="fieldbg"
                          color="field"
                          maxlength="25"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="close"
                              @click="lName = ''"
                              class="cursor-pointer"
                            />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row justify-center">
                      <div class="col-12 centerer" :class="LayoutChild2">
                        <q-input
                          dense
                          id="email-address-original"
                          v-model="emailAddress"
                          class
                          label="Email Address *"
                          bottom-slots
                          :error-message="emailAddressErrors"
                          :error="$v.emailAddress.$error"
                          bg-color="fieldbg"
                          color="field"
                          :maxlength="emailMaxLength"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="close"
                              @click="emailAddress = ''"
                              class="cursor-pointer"
                            />
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </div>

                  <div class="col-12" :class="LayoutChild1">
                    <div class="row justify-center">
                      <div class="col-auto">
                        <summary-error></summary-error>
                        <vue-recaptcha
                          ref="recaptcha"
                          :sitekey="reCaptchaSiteKey"
                          @verify="register"
                          @expired="onCaptchaExpired"
                          :loadRecaptchaScript="true"
                        >
                          <q-btn
                            label="Sign Up"
                            color="primary"
                            class
                            size="lg"
                          />
                        </vue-recaptcha>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-form>

        <div class="row justify-center" v-else>
          <div class="col-12 text-center" :class="LayoutChild1">
            <p :class="LayoutChild1">
              An invitation email has been sent to your email
              <em>{{ emailAddress }}</em>
              .
              <br />
              Complete this account setup by clicking on the link provided in
              this email.
            </p>
            <p>
              <span class="text-caption">Didn't receive an email?</span>
              <span>
                <a href="javascript:void(0);" @click="resendSignUpEmail()">
                  Re-send Email
                </a>
              </span>
            </p>
          </div>
        </div>
        <div id="sign-up-info" class="row" v-if="!isSuccess">
          <div class="col-12 q-gutter-y-xs text-center" :class="LayoutChild1">
            <p class="text-caption">
              By signing up, you agree with Skills'
              <span class="text-caption">
                <a
                  target="_blank"
                  title="Privacy Policy"
                  :href="privacyPolicyUrl"
                >
                  Privacy Policy
                </a>
                and
                <a
                  target="_blank"
                  title="Cookie Policy"
                  :href="cookiePolicyUrl"
                >
                  Cookie Policy
                </a>
              </span>
            </p>
            <p class="text-caption">
              Already have an account?
              <span class="text-caption">
                <router-link :to="signInUrl">Sign in here</router-link>
              </span>
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator :class="LayoutChild1" />
            <contact-details></contact-details>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ContactDetails from './ContactDetails.vue'
import SummaryError from '../compoments/error/SummaryError.vue'
import { required, email } from 'vuelidate/lib/validators' // using required validation from vuelidate
import SignUpModel from '../valueObjects/SignUpModel'
import { mapActions } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'
const whitelabel = require('../whitelabel/configuration')
import { Constants } from '@/valueObjects'

export default {
  name: 'SignUp',

  components: {
    contactDetails: ContactDetails,
    SummaryError,
    VueRecaptcha,
  },

  mounted() {
    var config = whitelabel.WhitelabelConfig[this.$globalLabel]
    if (config) {
      this.signInUrl = config.signInUrl
      this.companyName = config.companyName
      this.cookiePolicyUrl = config.cookiePolicyUrl
      this.termsAndConditionsUrl = config.termsAndConditionsUrl
      this.privacyPolicyUrl = config.privacyPolicyUrl
    }
  },

  data() {
    return {
      fName: null,
      lName: null,
      isSuccess: null,
      emailAddress: null,
      model: '',
      LayoutParent: ['q-col-gutter-x-lg q-col-gutter-y-xm'],
      LayoutChild1: ['layout-child-1'],
      LayoutChild2: ['layout-child-2'],
      termsAndConditionsUrl: '',
      signInUrl: '',
      cookiePolicyUrl: '',
      companyName: '',
      reCaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITEKEY,
      privacyPolicyUrl: '',
      emailMaxLength: Constants.EMAIL_MAX_LENGTH,
    }
  },

  validations: {
    fName: {
      required,
    },
    lName: {
      required,
    },
    emailAddress: {
      required,
      email,
    },
  },

  computed: {
    emailAddressErrors() {
      if (this.$v.emailAddress.$dirty) {
        if (!this.$v.emailAddress.email) return 'Email is incorrect format.'
        if (!this.$v.emailAddress.required) return 'Field is required'
      }
      return ''
    },
  },

  methods: {
    ...mapActions('auth', ['signUp', 'resendEmail']),

    reset() {
      this.$refs.input.resetValidation()
    },

    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },

    async register(token) {
      this.$refs.recaptcha.reset()
      this.validate()
        .then(() => {
          let signUpModel = new SignUpModel(
            this.fName.trim(),
            this.lName.trim(),
            this.emailAddress.trim(),
            token
          )
          signUpModel.UTM = {
            utm_source: localStorage.getItem('utm_source'),
            utm_medium: localStorage.getItem('utm_medium'),
            utm_campaign: localStorage.getItem('utm_campaign'),
          }
          this.signUp({ label: this.$globalLabel, signUpModel })
            .then(() => {
              this.isSuccess = true
            })
            .catch(() => {})
            .finally(() => {})
        })
        .catch(() => {})
    },

    validate() {
      return new Promise((resolve, reject) => {
        this.$v.$touch()
        if (this.$v.$invalid) {
          reject()
        } else {
          resolve()
        }
      })
    },

    resendSignUpEmail() {
      this.resendEmail()
        .then(() => {
          this.$notify.info({ message: 'The email was resent!' })
        })
        .catch((e) => {
          this.$notify.info({ message: e.response.data.message })
        })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');
@import ('../styles/themes/SkillsDefault/skillsDefault.styl');

.layout-child-1 {
  margin-bottom: 2rem;
}

.layout-child-2 {
  margin-bottom: 0.5rem;
}

.centerer {
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: $fieldWidth2 !important;
}

.q-field {
  max-width: $fieldWidth2;
}

#enter-password {
  padding-bottom: 1rem;
}

.module-container{
  max-width 400px;
  margin 0 auto;
}
</style>
