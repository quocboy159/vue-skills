<template>
  <roa title="My Record of Achievement" :id="crmCurrentUser.contactId" />
</template>
<script>
import Roa from '../../../containers/ROA.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MyROA',

  components: {
    Roa,
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },
}
</script>
