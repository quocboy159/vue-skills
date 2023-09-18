<template>
  <q-page padding>
    <div id="sign-in" class="row">
      <div class="col-12">
        <div v-if="signInSilentCheck">
          <q-btn
            flat
            color="primary"
            size="lg"
            :loading="true"
            style="width: 100%"
          >
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Checking your current session...
            </template>
          </q-btn>
        </div>
        <div v-else>
          <div class="row">
            <div class="col-12 text-center">
              <h1 class="text-h1">Sign In</h1>
            </div>
          </div>
          <div v-if="isAuthenticated">
            <div class="row">
              <div class="col">
                <div class="col-12">
                  <p class="text-caption">
                    You are signed in with
                    <em>{{ email }}</em>
                    <br />
                    <span class="text-caption">
                      <a href="#" @click="signOut">Sign Out</a>
                      |
                      <router-link to="settings">Profile</router-link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="row">
              <div class="col">
                <div class="col-12" :class="LayoutChild1">
                  <div class="row justify-center" :class="LayoutChild2">
                    <div class="col-12">
                      <summary-error></summary-error>
                    </div>
                    <q-btn
                      @click="signInRedirect"
                      label="Sign In"
                      color="primary"
                      class="items-stretch"
                      size="lg"
                      :style="{ width: providerBusy ? '240px' : '140px' }"
                      :loading="providerBusy"
                    >
                      <template v-slot:loading>
                        <q-spinner-hourglass class="on-left" />
                        Please wait...
                      </template>
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="sign-up-info"
              class="row text-center"
              :class="LayoutChild2"
            >
              <div class="col-12">
                <p class="text-caption">
                  Don't have an account?
                  <span class="text-caption">
                    <router-link :to="signUpUrl">Sign up!</router-link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-separator :class="LayoutChild2" />
              <contact-details></contact-details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ContactDetails from './ContactDetails.vue'
import SummaryError from '../compoments/error/SummaryError.vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { Constants } from '@/valueObjects'
import { REDIRECT_URL } from '@/store/modules/auth/mutation-types'

const whitelabel = require('../whitelabel/configuration')

export default {
  name: 'SignIn',
  components: {
    contactDetails: ContactDetails,
    SummaryError,
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'email']),
    ...mapState('auth', ['providerBusy']),
  },

  mounted() {
    var config = whitelabel.WhitelabelConfig[this.$globalLabel]
    if (config) {
      this.signUpUrl = config.signUpUrl
      this.forgotPasswordUrl = config.forgotPasswordUrl
      this.recoverAccountUrl = config.recoverAccountUrl
      this.cookiePolicyUrl = config.cookiePolicyUrl
    }

    // Silently sign in
    if (!this.isAuthenticated) {
      this.signInSilentCheck = true
      this.trySignInSilent().then(() => (this.signInSilentCheck = false))
    }

    // Register redirect url
    this.setRedirectUrl(this.$router.currentRoute.query.redirectUrl)
  },

  data() {
    return {
      passwordEntry: '',
      isPwd: true,
      emailAddress: null,
      LayoutParent: ['q-col-gutter-x-lg q-col-gutter-y-xm'],
      LayoutChild1: ['layout-child-1'],
      LayoutChild2: ['layout-child-2'],
      signUpUrl: '',
      forgotPasswordUrl: '',
      recoverAccountUrl: '',
      cookiePolicyUrl: '',
      emailMaxLength: Constants.EMAIL_MAX_LENGTH,
      existingCrmBaseUrl: process.env.VUE_APP_ROOT_EXISTING_CRM,
      portalSecrectKey: process.env.VUE_APP_PORTAL_SECRECTKEY,
      signInSilentCheck: false,
    }
  },

  methods: {
    ...mapActions('auth', ['signInRedirect', 'trySignInSilent', 'signOut']),
    ...mapMutations('auth', {
      setRedirectUrl: REDIRECT_URL,
    }),
  },
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');
@import ('../styles/themes/SkillsDefault/skillsDefault.styl');

// FIX - import these from the global style file

// TEXT
.helper-text {
  // color $primary
}

// END FIX - import these from the global style file

// START custom width styles

// END custom width style
#sign-in-modules {
  margin-top: 1rem;
}

.layout-child-1 {
  margin-bottom: 0.5rem;
}

.layout-child-2 {
  margin-bottom: 2rem;
}

.centerer {
  margin-left: auto !important;
  margin-right: auto !important;
  width: $fieldWidth2 !important;
}

.centerer2 {
  margin-left: auto !important;
  margin-right: auto !important;
  width: $fieldWidth2 !important;
}

#forgot-password-link {
  margin-top: 20px;
}
</style>
