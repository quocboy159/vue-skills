<template>
  <div class="row">
    <div class="col-12">
      <q-card flat bordered :class="{ pending: pendingVerification }">
        <q-card-section>
          <div class="header-row row items-center">
            <div
              id="notifications-item"
              ref="notificationsItem"
              class="detail-rows col-12"
            >
              <div
                class="displayMode row items-center q-col-gutter-x-md q-col-gutter-y-md"
                v-if="addMode == false"
              >
                <div
                  id="email-address-option"
                  class="col-12 col-md-5"
                  :class="displayParent"
                  style="word-break: break-all; word-wrap: break-word;"
                >
                  {{ alternateEmailAddress }}
                </div>

                <div
                  id="notifications-option"
                  class="col-12 col-md-3"
                  :class="displayParent"
                >
                  <!--notifications-->
                  <div class="row" v-if="!notificationSet">
                    <div class="col-12">
                      <div class="row">
                        <div class="col-auto">
                          <div class="row justify-center">
                            <div class="col-auto">
                              <q-btn
                                outline
                                text-color="grey-7"
                                :icon="
                                  notificationSet
                                    ? 'check_box'
                                    : 'check_box_outline_blank'
                                "
                                @click="showNotificationConfirmDlg()"
                                label="Notifications"
                              />
                            </div>
                          </div>
                          <div class="row justify-center">
                            <div class="col-auto">
                              <q-item-label caption class="notieLabel">
                                (Set as primary for notifications)
                              </q-item-label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="notificationSet == true">
                    <div class="col-12">
                      <span :class="{ 'text-pending': pendingVerification }">
                        <q-icon name="notifications" />
                        Notifications Email Address
                      </span>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-2" :class="displayParent">
                  <div class="row">
                    <div class="col-12" v-if="pendingVerification == true">
                      <span
                        id="pending-verification"
                        class="text-caption text-label"
                        :class="LayoutChild1"
                      >
                        awaiting verification
                      </span>
                    </div>
                    <div class="col-12" v-if="verified == true">
                      <div
                        id="verified"
                        class="text-caption"
                        :class="LayoutChild1"
                      >
                        verified
                      </div>
                    </div>
                  </div>
                </div>

                <!--buttons   -->
                <div class="col-12 col-md-2" :class="displayParent">
                  <div class="col-auto float-right self-end" v-if="isDeletable">
                    <q-btn
                      @click="showDeleteEmailConfirmDlg()"
                      flat
                      icon="delete"
                      label
                      color="primary"
                      class="float-right"
                    />
                  </div>
                  <div
                    class="col-auto float-right self-end"
                    v-if="isCurrentlyLoggedIn"
                  >
                    <div
                      style="text-align: right;"
                      class="text-caption"
                      :class="LayoutChild1"
                    >
                      Currently logged in
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="editMode row items-center q-col-gutter-x-md q-col-gutter-y-md"
                v-if="addMode == true"
              >
                <!-- add mode -->

                <!-- email -->
                <div
                  id="email-address-option"
                  class="col-12 col-md-5"
                  :class="editParent"
                >
                  <q-input
                    dense
                    v-model="alternateEmailAddress"
                    label="Email Address"
                    bottom-slots
                    :error-message="alternateEmailAddressErrors"
                    :error="$v.alternateEmailAddress.$error"
                    ref="alternateEmailAddress"
                    bg-color="fieldbg"
                    color="field"
                    :maxlength="emailMaxLength"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mail"></q-icon>
                    </template>
                  </q-input>
                </div>

                <!--notifications-->
                <div
                  id="notifications-option-2"
                  class="col-12 col-md-3"
                  :class="editParent"
                >
                  <div class="row" v-if="!isInitialEmail">
                    <div class="col-12">
                      <div class="row">
                        <div class="col-auto">
                          <div class="row justify-center">
                            <div class="col-auto">
                              <q-btn
                                outline
                                text-color="grey-7"
                                :icon="
                                  notificationSet
                                    ? 'check_box'
                                    : 'check_box_outline_blank'
                                "
                                @click="showNotificationConfirmDlg()"
                                label="Notifications"
                              />
                            </div>
                          </div>
                          <div class="row justify-center">
                            <div class="col-auto">
                              <q-item-label caption class="notieLabel">
                                (Set as primary for notifications)
                              </q-item-label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="isInitialEmail == true">
                    <div class="col-12">
                      <span :class="{ 'text-pending': pendingVerification }">
                        <q-icon name="notifications" />
                        Notifications Email Address
                      </span>
                    </div>
                  </div>
                </div>

                <!--buttons   -->
                <div id="buttons" class="col-12 col-md-4" :class="editParent">
                  <div class="row float-right q-gutter-x-sm q-gutter-y-sm">
                    <div class="col-auto float-right">
                      <q-btn
                        @click="cancelAddingEmail()"
                        flat
                        icon="close"
                        label="Cancel"
                        color="primary"
                        class="float-right"
                      />
                    </div>
                    <div class="col-auto float-right">
                      <q-btn
                        @click="saveEmail()"
                        icon="save"
                        label="Save"
                        color="primary"
                        class="float-right"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="col-12 error-messasge">
        <div class="row">
          <div class="col-12">
            <particular-summary-error :error="error"></particular-summary-error>
          </div>

          <div class="col-12" v-if="pendingVerification == true">
            <span
              id="pending-verification-message"
              class="text-caption text-label"
              :class="LayoutChild1"
            >
              Please check this email address for instructions to verify.
            </span>
          </div>
        </div>
      </div>
    </div>
    <!--confirm Assign Notifications item-->
    <q-dialog v-model="notificationsDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Are you sure you wish to set {{ alternateEmailAddress }} to receive
            notifications?
          </div>
        </q-card-section>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            By setting this email address to receive notifications, your other
            email addresses will no longer receive notifications.
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn
            @click="assignNotification()"
            flat
            label="Yes"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--confirm remove item-->
    <q-dialog v-model="confirmRemoveDlg">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Are you sure you wish to delete this email address?
          </div>
        </q-card-section>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            You will no longer be able to use this email address to log in to
            {{ companyName }}
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn
            @click="deleteEmailNotification()"
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
const whitelabel = require('../whitelabel/configuration')
import { required, email } from 'vuelidate/lib/validators' // using required validation from vuelidate
import ParticularSummaryError from './error/ParticularSummaryError.vue'
import { Constants } from '@/valueObjects'

export default {
  name: 'NotificationsItem',

  props: ['notificationRecord'],

  components: {
    ParticularSummaryError,
  },

  data() {
    return {
      /*START passing data of component*/
      addMode: true,
      notificationSet: false, // select to receive Notification
      pendingVerification: null, // Status of Verification process
      verified: false, // Status of Verification process
      isDeletable: true, // can not deleted if there is only one email, or this is set to receive Notification (only one email is set to receive Notification)
      alternateEmailAddress: '',
      isInitialEmail: false,
      id: null,
      error: null,
      isCurrentlyLoggedIn: false,
      /*END passing data of component*/

      notificationsDialog: false, //showing Dialog
      confirmRemoveDlg: false, //showing Dialog
      companyName: '',
      emailMaxLength: Constants.EMAIL_MAX_LENGTH,
      //title: 'NotificationsItem',
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],

      //custom-style-class-sets

      //paddings 1
      displayParent: ['display-parent'],
      LayoutParentEdit: ['layout-parent'],
      LayoutChild1: ['layout-child-1 col-12'],
      editParent: ['edit-parent'],

      //responsive helpers

      //FIX - get these to work

      //add this to control edit button position
      Responsive1: ['order-last'],

      //add this to display mode and edit mode for desktop
      Responsive2: ['responsive-2'],

      //END custom-style-class-sets
    }
  },
  mounted() {
    var config = whitelabel.WhitelabelConfig[this.$globalLabel]
    if (config) {
      this.companyName = config.companyName
    }
  },
  created() {
    if (this.notificationRecord) {
      this.id = this.notificationRecord.id
      this.addMode = this.notificationRecord.addMode
      this.notificationSet = this.notificationRecord.notificationSet
      this.pendingVerification = this.notificationRecord.pendingVerification
      this.verified = this.notificationRecord.verified
      this.alternateEmailAddress = this.notificationRecord.alternateEmailAddress
      this.isDeletable = this.notificationRecord.isDeletable
      this.isInitialEmail = this.notificationRecord.isInitialEmail
      this.isCurrentlyLoggedIn = this.notificationRecord.isCurrentlyLoggedIn
    }
  },
  validations: {
    // define each value you want to validate
    alternateEmailAddress: {
      required,
      email,
    },
  },
  computed: {
    alternateEmailAddressErrors() {
      if (this.$v.alternateEmailAddress.$dirty) {
        if (!this.$v.alternateEmailAddress.email)
          return 'Email is incorrect format.'
        if (!this.$v.alternateEmailAddress.required) return 'Field is required'
      }
      return ''
    },
  },
  methods: {
    assignNotification() {
      this.notificationSet = true
      if (!this.addMode) {
        // if DISPLAY mode => call the parent vue to update this flag
        this.pendingVerification = true
        this.isDeletable = this.pendingVerification
        this.$emit('setNotificationEmail', this.id)
      }
    },
    showNotificationConfirmDlg() {
      // if uncheck => show dialog to confirm
      if (!this.notificationSet) {
        this.notificationsDialog = true
      } else {
        this.notificationSet = false
      }
    },
    showDeleteEmailConfirmDlg() {
      this.confirmRemoveDlg = true
    },
    deleteEmailNotification() {
      this.$emit('deleteEmailNotification', this.id)
    },
    saveEmail() {
      var vm = this
      this.validate().then(
        function () {
          vm.$emit('saveEmailNotification', {
            id: vm.id,
            addMode: false,
            notificationSet: vm.notificationSet,
            pendingVerification: vm.pendingVerification,
            verified: vm.verified,
            alternateEmailAddress: vm.alternateEmailAddress,
            isDeletable: vm.isDeletable,
            callbackFn: vm.callbackOfSaving,
          })
        },
        function () {
          // reject
        }
      )
    },
    callbackOfSaving(isSuccess, error) {
      var vm = this
      if (isSuccess) {
        vm.addMode = false
        vm.pendingVerification = vm.notificationSet
        vm.verified = false
        vm.isDeletable = vm.pendingVerification || vm.notificationSet == false // pending verification state will always have a delete btn
        vm.error = null
      } else {
        vm.error = error
      }
    },
    cancelAddingEmail() {
      this.$emit('cancelEmailNotification', this.id)
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
  },
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');

#notifications-item .detail-rows .row {
  align-items: normal;
}

.layout-parent, .layout-child-1 {
  min-width: 200px !important;
}

#check {
  padding-left: 0px;
}

.notieLabel {
  padding-top: 4px;
  // padding-left:1rem
}

.pending {
  border-style: dashed;
}

.header-row {
  min-height: 58px;
}

.error-messasge {
  float: left;
}
</style>
