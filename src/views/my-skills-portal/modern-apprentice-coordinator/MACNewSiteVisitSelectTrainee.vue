<template>
  <new-site-visit
    :accountId="crmCurrentUser.accountId"
    :siteVisitsRouteName="macRouteNames.TRAINEE_DETAILS_APPRENTICE_VISIT"
  />
</template>
<script>
import NewSiteVisit from '../../../containers/site-visit/NewSiteVisit.vue'
import { macRouteNames } from '../../../common/constants.js'
import { mapGetters } from 'vuex'

export default {
  name: 'MACNewSiteVisitSelectTrainee',

  components: {
    NewSiteVisit,
  },

  data() {
    return {
      macRouteNames,
    }
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },
}
</script>
