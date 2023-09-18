<template>
  <company-details :id="crmCurrentUser.accountId" />
</template>
<script>
import CompanyDetails from '../../../containers/CompanyDetails.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MyCompanyDetails',

  components: {
    CompanyDetails,
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },
}
</script>
