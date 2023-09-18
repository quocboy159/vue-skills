<template>
  <user-profile
    :id="crmCurrentUser.contactId"
    :is-email-editable="true"
    :is-physical-address-editable="false"
    :is-postal-address-editable="true"
    :is-self-profile="true"
  />
</template>
<script>
import UserProfile from '../../../containers/UserProfile.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'SelfUserProfile',

  components: {
    UserProfile,
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },
}
</script>
