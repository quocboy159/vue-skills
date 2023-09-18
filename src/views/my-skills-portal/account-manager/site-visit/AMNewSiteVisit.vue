<template>
  <new-site-visit
    :contactId="contactId"
    :siteVisitsRouteName="amRouteNames.TRAINEE_DETAILS_APPRENTICE_VISIT"
  />
</template>
<script>
import NewSiteVisit from '../../../../containers/site-visit/NewSiteVisit.vue'

import { amRouteNames } from '../../../../common/constants.js'
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
      amRouteNames,
    }
  },
}
</script>
