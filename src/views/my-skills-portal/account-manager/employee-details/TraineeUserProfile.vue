<template>
  <user-profile
    :id="id"
    :is-email-editable="false"
    :is-physical-address-editable="true"
    :is-postal-address-editable="false"
    :is-self-profile="false"
  />
</template>
<script>
import UserProfile from '../../../../containers/UserProfile.vue'
export default {
  name: 'TraineeUserProfile',

  components: {
    UserProfile,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
