<template>
  <new-site-visit
    :contactId="contactId"
    :siteVisitsRouteName="macRouteNames.TRAINEE_DETAILS_APPRENTICE_VISIT"
  />
</template>
<script>
import NewSiteVisit from '../../../../containers/site-visit/NewSiteVisit.vue'

import { macRouteNames } from '../../../../common/constants.js'
export default {
  name: 'MACNewSiteVisit',

  components: {
    NewSiteVisit,
  },

  props: {
    contactId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      macRouteNames,
    }
  },
}
</script>
