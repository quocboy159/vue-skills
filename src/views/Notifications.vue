<template>
  <div class="row">
    <div class="col-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="header-row row q-pa-md">
            <div class="col-12">
              <h3 class="text-h3">Login and Notifications</h3>
              <p>
                Configure email addresses to use for login and receiving
                notifications.
              </p>
            </div>
          </div>

          <!--<div id="sorter" class="row justify-end">                                
                                    <div id="sort" class="col-2">
                                      <q-select :options="sortOptions" label="Sort" />                  
                                    </div>                
          </div>-->

          <div class="notifications-item q-pa-md">
            <user-name v-bind:userPrincipalName="userPrincipalName"></user-name>

            <!--<notifications-item :notificationsItems="theNotificationsItems"></notifications-item>-->
            <!--<notifications-item @addRecord="addNotificationsItem"></notifications-item>-->
            <!-- <notifications-item></notifications-item>
                      <notifications-item></notifications-item>
            <notifications-item></notifications-item>-->
            <div>
              <notifications-item
                v-for="item in theNotificationsItems"
                v-bind:key="item._componentKey"
                :notification-record="item"
                @saveEmailNotification="saveEmailNotification"
                @deleteEmailNotification="deleteEmailNotification"
                @setNotificationEmail="setNotificationEmail"
                @cancelEmailNotification="cancelEmailNotification"
                class="notifications-object"
              ></notifications-item>
            </div>

            <div class="row">
              <div class="col-12">
                <div class="col-auto float-right self-end">
                  <q-btn
                    flat
                    icon="add"
                    label="Add Email Address"
                    color="primary"
                    class="float-right"
                    @click="addNewEmailAddress()"
                    :disable="isExistAddNewEmailForm"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import NotificationsItem from './NotificationsItem.vue'
import UserName from './UserName.vue'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'notifications',
  components: {
    notificationsItem: NotificationsItem,
    userName: UserName,
  },
  props: ['notifications', 'notificationsItem', 'loginEmail'],

  data() {
    return {
      //An array to hold the email address modules
      theNotificationsItems: [],
      userPrincipalName: '',
      //dummy data
      editMode: false,
      //end dummy data

      //created data
      date: '1990/01/01',
      //end created data

      title: 'Notifications',
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],

      //custom-style-class-sets

      //modelled data
      model: null,
      sortOptions: [
        'Portal',
        'Email Address',
        'Alternate Username',
        'Notifications',
      ],
      // END modelled data
    }
  },

  created() {
    //this.theNotificationsItems = this.notificationEmails; // get from Store
    var vm = this
    let label = this.$globalLabel
    vm.getAdUserProfile({ label, email: vm.loginEmail })
      .then((response) => {
        if (response.status == 200) {
          var adUser = response.data
          vm.userPrincipalName = adUser.userPrincipalName
          if (adUser.emailAddresses) {
            var listOfEmails = []
            adUser.emailAddresses.forEach(function (item) {
              let addedEmail = {
                id: listOfEmails.length,
                notificationSet: item.isPrimary,
                pendingVerification: item.isPendingVerification,
                verified: item.isVerified,
                alternateEmailAddress: item.email,
                isDeletable: item.isDeletable,
                isCurrentlyLoggedIn: item.email == vm.loginEmail,
                _componentKey: vm.generateUniqueId(),
                addMode: false,
              }
              listOfEmails.push(addedEmail)
            })
            vm.theNotificationsItems = listOfEmails
          }
        }
      })
      .catch(() => {
        vm.$notify.info({ message: 'Can not get user data from AD Server.' })
      })
      .finally(() => {})
  },

  computed: {
    ...mapGetters(['notificationEmails']),

    isExistAddNewEmailForm() {
      return this.theNotificationsItems.some((x) => x.addMode)
    },
  },

  methods: {
    ...mapActions([
      'addNewNotificationEmail',
      'deleteNotificationEmail',
      'setEmailToPrimary',
      'getAdUserProfile',
    ]),

    addNewEmailAddress() {
      let emtyItem = {
        id: this.theNotificationsItems.length,
        addMode: true,
        notificationSet: false,
        pendingVerification: false,
        verified: false,
        alternateEmailAddress: '',
        isDeletable: true,
        _componentKey: this.generateUniqueId(),
      }
      // 1st email of account
      if (
        !this.theNotificationsItems ||
        this.theNotificationsItems.length == 0
      ) {
        emtyItem.notificationSet = true
        emtyItem.isInitialEmail = true
      }
      this.theNotificationsItems.push(emtyItem)
    },

    saveEmailNotification(email) {
      // call from child component noticationsItem - save function
      var vm = this
      var addEmailAddressRequest = {
        UserPrincipalName: vm.userPrincipalName,
        Email: email.alternateEmailAddress,
        IsPrimary: email.notificationSet,
      }
      vm.addNewNotificationEmail({
        label: vm.$globalLabel,
        addEmailAddressRequest,
      })
        .then((response) => {
          if (response.status === 200) {
            email.callbackFn(true)
            if (email.notificationSet) {
              vm.theNotificationsItems.forEach(function (item) {
                if (item.notificationSet && !item.verified) {
                  // rerender for other record except the current Primary has been verified
                  item.notificationSet = false
                  item.isDeletable = true
                  item.pendingVerification = false
                  item._componentKey = vm.generateUniqueId() //force rerender
                }
              })
            }
            var editingEmail = vm.theNotificationsItems.find(
              (e) => e.id == email.id
            )
            if (editingEmail) {
              // update
              editingEmail.alternateEmailAddress = email.alternateEmailAddress
              editingEmail.notificationSet = email.notificationSet
              editingEmail.addMode = false
              editingEmail.isDeletable = email.isDeletable
              editingEmail.pendingVerification = email.pendingVerification
              editingEmail.verified = email.verified
            } else {
              vm.theNotificationsItems.push(email)
            }
          }
        })
        .catch((ex) => {
          email.callbackFn(false, ex.response.data)
        })
    },

    cancelEmailNotification(emailId) {
      // call from child component noticationsItem - cancel function
      this.theNotificationsItems = this.theNotificationsItems.filter(
        (x) => x.id !== emailId
      )
    },

    deleteEmailNotification(emailId) {
      // call from child component noticationsItem - delete function
      var vm = this
      var deletingEmail = vm.theNotificationsItems.find((e) => e.id == emailId)
      var deleteEmailAddressRequest = {
        UserPrincipalName: vm.userPrincipalName,
        Email: deletingEmail.alternateEmailAddress,
      }
      vm.deleteNotificationEmail({
        label: vm.$globalLabel,
        deleteEmailAddressRequest,
      }).then((response) => {
        if (response.status === 200) {
          vm.theNotificationsItems = vm.theNotificationsItems.filter(
            (item) => item.id !== emailId
          )
          vm.$notify.info({ message: 'Email Address was removed.' })
        }
      })
    },
    setNotificationEmail(emailId) {
      //call from child component noticationsItem - tick to check box Notification in DISPLAY mode
      var vm = this
      var updatingEmail = vm.theNotificationsItems.find((e) => e.id == emailId)
      var updateEmailAddressToPrimaryRequest = {
        UserPrincipalName: vm.userPrincipalName,
        Email: updatingEmail.alternateEmailAddress,
      }
      vm.setEmailToPrimary({
        label: vm.$globalLabel,
        updateEmailAddressToPrimaryRequest,
      }).then((response) => {
        if (response.status === 200) {
          vm.theNotificationsItems.forEach(function (item) {
            if (item.notificationSet && !item.verified && item.id != emailId) {
              // rerender for other record except the current Primary has been verified
              item.notificationSet = false
              item.pendingVerification = false
              item.isDeletable = true
              item._componentKey = vm.generateUniqueId() //force rerender
            }
          })

          var editingEmail = vm.theNotificationsItems.find(
            (e) => e.id == emailId
          )
          if (editingEmail) {
            editingEmail.notificationSet = true
            editingEmail.pendingVerification = true
            editingEmail.isDeletable = false
          }
        }
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');

.notifications-item >*, #sorter {
  margin-bottom: 1rem;
}

.notifications-object {
  margin-bottom: 1rem;
}
</style>
