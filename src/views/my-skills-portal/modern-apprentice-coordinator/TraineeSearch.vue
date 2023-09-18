<template>
  <trainee-search
    :id="crmCurrentUser.accountId"
    :employee-details-route-name="macRouteNames.TRAINEE_DETAILS"
    search-page="macSearch"
  />
</template>
<script>
import TraineeSearch from '../../../containers/TraineeSearch.vue'
import { macRouteNames } from '../../../common/constants.js'
import { mapGetters } from 'vuex'

export default {
  name: 'MACTraineeSearch',

  components: {
    TraineeSearch,
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
