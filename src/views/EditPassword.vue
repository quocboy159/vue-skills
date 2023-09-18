<template>
  <div class="row" id="password" :class="LayoutParent" v-if="!editMode">
    <div class="col">
      <div class="col-auto float-left" :class="LayoutChild1">
        <q-item-label class="text-label">Password</q-item-label>
        <div class>********</div>
      </div>
      <div class="col-auto float-right btn-align-1" :class="LayoutChild1">
        <q-btn
          @click="editFn()"
          flat
          round
          icon="edit"
          color="primary"
          class="float-right"
        />
      </div>
    </div>
  </div>

  <div class="row" v-else>
    <q-card flat class="col">
      <!--bordered-->
      <q-card-section id="password-card">
        <div class="col-12">
          <div class="row">
            <div class="col-12 float-left q-pb-lg">
              <p class>
                Once your password is reset, you will be logged out of the
                portal, and asked to log in again.
              </p>
            </div>
            <div class="col-12 float-left">
              <div class="col-6" :class="LayoutChild1">
                <q-input
                  dense
                  v-model="existingPassword"
                  :type="isPwd ? 'password' : 'text'"
                  hint
                  label="Enter Existing Password *"
                  bottom-slots
                  :error-message="existingPasswordErrors"
                  :error="$v.existingPassword.$error"
                  bg-color="fieldbg"
                  color="field"
                  maxlength="50"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col-6 enter-new-password" :class="LayoutChild1">
                <q-input
                  dense
                  v-model="passwordEntry1"
                  :type="isPwd ? 'password' : 'text'"
                  :hint="passwordHintText"
                  label="Enter New Password *"
                  bottom-slots
                  :error-message="passwordEntry1Errors"
                  :error="$v.passwordEntry1.$error"
                  bg-color="fieldbg"
                  color="field"
                  maxlength="50"
                ></q-input>
              </div>
              <div class="col-6" :class="LayoutChild1">
                <q-input
                  dense
                  v-model="passwordEntry2"
                  :type="isPwd ? 'password' : 'text'"
                  hint
                  label="Confirm New Password *"
                  bottom-slots
                  :error-message="passwordEntry2Errors"
                  :error="$v.passwordEntry2.$error"
                  bg-color="fieldbg"
                  color="field"
                  maxlength="50"
                ></q-input>
              </div>
            </div>
          </div>

          <particular-summary-error :error="error"></particular-summary-error>

          <div class="row">
            <div
              class="col-12 float-right btn-align-1 q-gutter-x-sm q-gutter-y-sm"
              :class="LayoutChild1"
            >
              <q-btn
                @click="saveFn()"
                icon="save"
                label="Save Password"
                color="primary"
                class="float-right"
              />
              <q-btn
                @click="cancelFn()"
                flat
                icon="close"
                label="Cancel"
                color="primary"
                class="float-right"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { required, sameAs } from 'vuelidate/lib/validators' // using required validation from vuelidate
import { mapGetters, mapActions } from 'vuex'
import ParticularSummaryError from './error/ParticularSummaryError.vue'
import { Constants } from '@/valueObjects'

export default {
  name: 'EditPassword',

  data() {
    return {
      error: null,
      signedUp: null,
      editMode: false,
      existingPassword: '', //the field the user will type into to check against their existing password
      password: '', // holds the true value of the user's current password. The value of "existingPassword" will be checked against this value in the back end, for validation.
      passwordEntry1: '',
      passwordEntry2: '',
      isPwd: true,
      title: 'EditPassword',
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
      passwordHintText: Constants.PASSWORD_HINT_TEXT,
      //custom-style-class-sets

      //paddings 1
      LayoutParent: ['layout-parent q-col-gutter-x-sm q-col-gutter-y-lg'],
      LayoutChild1: ['layout-child-1'],
      LayoutChild2: ['layout-child-2'],
    }
  },

  validations: {
    // define each value you want to validate
    existingPassword: {
      required,
    },
    passwordEntry1: {
      required,
    },
    passwordEntry2: {
      required,
      sameAsPassword: sameAs('passwordEntry1'),
    },
  },

  computed: {
    ...mapGetters(['adUserProfile']),
    existingPasswordErrors() {
      if (this.$v.existingPassword.$dirty) {
        if (!this.$v.existingPassword.required) return 'Field is required'
      }
      return ''
    },
    passwordEntry1Errors() {
      if (this.$v.passwordEntry1.$dirty) {
        if (!this.$v.passwordEntry1.required) return 'Field is required'
      }
      return ''
    },
    passwordEntry2Errors() {
      if (this.$v.passwordEntry2.$dirty) {
        if (!this.$v.passwordEntry2.sameAsPassword)
          return 'Confirm Password must match New Password'
        if (!this.$v.passwordEntry2.required) return 'Field is required'
      }
      return ''
    },
  },
  methods: {
    ...mapActions(['changePassword', 'signOut']),

    resetPasswordSection() {
      var vm = this
      vm.existingPassword = ''
      vm.passwordEntry1 = ''
      vm.passwordEntry2 = ''
      vm.$v.$reset()
      vm.isPwd = true
      vm.error = null
    },

    saveFn() {
      var vm = this
      this.validate().then(
        function () {
          var changePasswordRequest = {
            UserPrincipalName: vm.adUserProfile.userPrincipalName,
            OldPassword: vm.existingPassword,
            Password: vm.passwordEntry1,
          }
          vm.changePassword({
            label: vm.$globalLabel,
            changePasswordRequest,
          })
            .then((response) => {
              if (response.data === true) {
                vm.editMode = false
                vm.resetPasswordSection()
                vm.signOut()
              }
            })
            .catch((e) => {
              vm.error = e.response.data
            })
            .finally(() => {})
        },
        function () {
          // reject
        }
      )
    },

    cancelFn() {
      var vm = this
      vm.editMode = false
      vm.resetPasswordSection()
    },

    validate() {
      //validate all fields needed
      return new Promise((resolve, reject) => {
        this.$v.$touch() // trigger vuelidate to validate all defined validations field, which is dirty
        if (this.$v.$invalid) {
          reject()
        } else {
          resolve()
        }
      })
    },

    editFn() {
      var vm = this
      vm.editMode = true
    },
  },

  components: {
    ParticularSummaryError,
  },
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');

#user-name .detail-rows .row {
  align-items: center;
}

.layout-parent {
  align-items: center;
}

.layout-child-1 {
  max-width: $fieldWidth2;
}

.layout-child-2 {
  padding-bottom: 0.5rem;
}

.btn-align-1 {
  padding-top: 6px;
}

#password-card {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}

.enter-new-password {
  padding-bottom: 1rem;
}
</style>
