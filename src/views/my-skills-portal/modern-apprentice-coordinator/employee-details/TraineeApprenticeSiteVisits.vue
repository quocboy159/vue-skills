<template>
  <apprentice-site-visits
    :id="id"
    :site-visit-details-route-name="macRouteNames.TRAINEE_SITE_VISIT_DETAILS"
    :new-router-name="macRouteNames.TRAINEE_APPRENTICE_VISIT_NEW"
  />
</template>
<script>
import ApprenticeSiteVisits from '../../../../containers/site-visit/ApprenticeSiteVisits.vue'
import { macRouteNames } from '../../../../common/constants.js'
export default {
  name: 'TraineeApprenticeSiteVisits',

  components: {
    ApprenticeSiteVisits,
  },

  data() {
    return {
      macRouteNames,
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
