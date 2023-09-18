<template>
  <div class="row" v-if="userProfile">
    <div class="col-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="header-row row q-pa-md">
            <div class="col-12">
              <h3 class="text-h3 float-left">Account Recovery</h3>
            </div>
          </div>

          <div
            id="account-recovery"
            ref="accountRecovery"
            class="detail-rows q-pa-md"
          >
            <div class="q-col-gutter-x-sm q-col-gutter-y-md" v-if="!editMode">
              <div class="row" v-if="!userProfile.recoveryEmail">
                <div class="col-12 col-md-6" :class="LayoutParent">
                  <p>
                    Recover your account using an alternate email address.
                    <br />
                    <a target="_blank" :href="recoverAccountInfoUrl">
                      Read more about recovering your Skills account
                    </a>
                  </p>
                </div>
                <div class="col-12 col-md-6" :class="LayoutParent">
                  <q-btn
                    flat
                    @click="addFn()"
                    icon="add"
                    label="Add Recovery Address"
                    color="primary"
                    class="float-left"
                  />
                </div>
              </div>
              <div class="row" v-if="userProfile.recoveryEmail">
                <div class="col-12 col-md-6">
                  <p>{{ userProfile.recoveryEmail }}</p>
                </div>

                <div class="col-12 col-md-6">
                  <q-btn
                    @click="onEdit()"
                    flat
                    icon="edit"
                    label="Edit"
                    color="primary"
                    class="float-right"
                  />
                  <q-btn
                    @click="onConfirmDelete()"
                    flat
                    icon="delete"
                    label="Delete"
                    color="primary"
                    class="float-right"
                  />
                </div>
              </div>
            </div>

            <div class="q-gutter-sm" v-if="editMode">
              <div class="row" :class="LayoutParent">
                <div id="add-recovery-email" class="col-12 col-md-6">
                  <q-input
                    dense
                    v-model="recoveryEmailAddress"
                    label="Recovery Email"
                    bottom-slots
                    :error-message="recoveryEmailAddressErrors"
                    :error="$v.recoveryEmailAddress.$error"
                    ref="recoveryEmailAddress"
                    bg-color="fieldbg"
                    color="field"
                    :maxlength="emailMaxLength"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mail" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        name="close"
                        @click="recoveryEmailAddress = ''"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                  <div class="col-12 col-md-12 error-messasge">
                    <particular-summary-error
                      :error="error"
                    ></particular-summary-error>
                  </div>
                </div>

                <div
                  class="col-12 col-md-6 float-right q-gutter-x-sm q-gutter-y-sm"
                >
                  <q-btn
                    @click="onSave()"
                    icon="save"
                    label="Save"
                    color="primary"
                    class="float-right"
                    :disable="isSubmitting"
                  />
                  <q-btn
                    @click="onCancel()"
                    flat
                    icon="close"
                    label="Cancel"
                    color="primary"
                    class="float-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="confirmRemove" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Delete.</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            Are you sure you wish to delete the recovery email address
            {{ userProfile.recoveryEmail }}?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn
            @click="onRemove()"
            flat
            label="Yes"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import ParticularSummaryError from './error/ParticularSummaryError.vue'
const whitelabel = require('../whitelabel/configuration')
import { Constants } from '@/valueObjects'

export default {
  name: 'AccountRecovery',

  components: {
    ParticularSummaryError,
  },

  mounted() {
    var config = whitelabel.WhitelabelConfig[this.$globalLabel]
    if (config) {
      this.recoverAccountInfoUrl = config.recoverAccountInfoUrl
    }
  },

  data() {
    return {
      error: null,
      displayMode: true,
      editMode: false,
      recoveryEmailAddress: '',
      confirmRemove: false,
      recoverAccountInfoUrl: '',
      isSubmitting: false,
      title: 'AccountRecovery',
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
      LayoutParent: ['layout-parent q-col-gutter-x-lg q-col-gutter-y-xm'],
      LayoutChild1: ['col-12 col-md-2'],
      LayoutChild2: ['col12 col-md-10'],
      emailMaxLength: Constants.EMAIL_MAX_LENGTH,
    }
  },

  validations: {
    recoveryEmailAddress: {
      required,
      email,
    },
  },

  watch: {
    userProfile: {
      handler() {
        this.recoveryEmailAddress = this.userProfile.recoveryEmail
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters(['userProfile']),

    recoveryEmailAddressErrors() {
      if (this.$v.recoveryEmailAddress.$dirty) {
        if (!this.$v.recoveryEmailAddress.required) {
          return 'Field is required'
        }

        if (!this.$v.recoveryEmailAddress.email) {
          return 'Email is incorrect format.'
        }
      }

      return ''
    },
  },

  methods: {
    ...mapActions(['updateRecoveryEmail', 'deleteRecoveryEmail']),

    reset() {
      this.error = null
      this.editMode = false
      this.recoveryEmailAddress = this.userProfile.recoveryEmail
      this.$v.$reset()
    },

    onSave() {
      const selfComponent = this
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isSubmitting = true
        const request = {
          upn: this.userProfile.upn,
          recoveryEmail: this.recoveryEmailAddress,
        }
        this.updateRecoveryEmail(request)
          .then(() => {
            selfComponent.reset()
          })
          .catch((e) => {
            selfComponent.error = e.response.data
          })
          .finally(() => {
            selfComponent.isSubmitting = false
          })
      }
    },

    addFn() {
      this.editMode = true
    },

    onEdit() {
      this.editMode = true
    },

    onCancel() {
      this.reset()
    },

    onConfirmDelete() {
      this.confirmRemove = true
    },

    onRemove() {
      const selfComponent = this
      this.confirmRemove = false
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isSubmitting = true
        const request = {
          upn: this.userProfile.upn,
        }
        this.deleteRecoveryEmail(request)
          .then(() => {
            selfComponent.$v.$reset()
          })
          .catch((e) => {
            selfComponent.$notify.info({ message: e.response.data.message })
            selfComponent.recoveryEmailAddress =
              selfComponent.userProfile.recoveryEmail
          })
          .finally(() => {
            selfComponent.isSubmitting = false
          })
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');
@import ('../styles/themes/SkillsDefault/skillsDefault.styl');

#account-recovery .layout-parent {
  align-items: center;
}

.q-field {
  max-width: $fieldWidth2;
}

.error-messasge {
  float: left;
}
</style>
