<template>
  <apprentice-site-visits
    :id="id"
    :site-visit-details-route-name="amRouteNames.TRAINEE_SITE_VISIT_DETAILS"
    :new-router-name="amRouteNames.TRAINEE_APPRENTICE_VISIT_NEW"
  />
</template>
<script>
import ApprenticeSiteVisits from '../../../../containers/site-visit/ApprenticeSiteVisits.vue'
import { amRouteNames } from '../../../../common/constants.js'
export default {
  name: 'TraineeApprenticeSiteVisits',

  components: {
    ApprenticeSiteVisits,
  },

  data() {
    return {
      amRouteNames,
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
