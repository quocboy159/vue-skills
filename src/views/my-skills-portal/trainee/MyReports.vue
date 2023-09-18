<template>
  <reports title="Available Reports" :id="crmCurrentUser.contactId" />
</template>
<script>
import Reports from '../../../containers/Reports.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MyReports',

  components: {
    Reports,
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },
}
</script>
