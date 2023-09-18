<template>
  <trainee-search
    :id="crmCurrentUser.accountId"
    :employee-details-route-name="employerRouteNames.TRAINEE_DETAILS"
    search-page="employerSearch"
  />
</template>
<script>
import TraineeSearch from '../../../containers/TraineeSearch.vue'
import { employerRouteNames } from '../../../common/constants.js'
import { mapGetters } from 'vuex'

export default {
  name: 'EmployerTraineeSearch',

  components: {
    TraineeSearch,
  },

  data() {
    return {
      employerRouteNames,
    }
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },
}
</script>
