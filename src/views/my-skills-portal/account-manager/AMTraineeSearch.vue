<template>
  <trainee-search
    :id="crmCurrentUser.accountId"
    :employee-details-route-name="amRouteNames.TRAINEE_DETAILS"
    search-page="amSearch"
  />
</template>
<script>
import TraineeSearch from '../../../containers/TraineeSearch.vue'
import { amRouteNames } from '../../../common/constants.js'
import { mapGetters } from 'vuex'

export default {
  name: 'AMTraineeSearch',

  components: {
    TraineeSearch,
  },

  data() {
    return {
      amRouteNames,
    }
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },
}
</script>
