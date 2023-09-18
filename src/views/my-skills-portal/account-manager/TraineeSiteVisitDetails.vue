<template>
  <site-visit-details :id="id" />
</template>
<script>
import SiteVisitDetails from '../../../containers/site-visit/SiteVisitDetails.vue'
export default {
  name: 'TraineeSiteVisitDetails',

  components: {
    SiteVisitDetails,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
