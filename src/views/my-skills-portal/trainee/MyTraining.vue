<template>
  <training
    :id="crmCurrentUser.contactId"
    pageTitle="Trainee"
    trainingPlansTableTitle="My Training Plans"
    upComingCoursesTableTitle="My Upcoming Courses"
    :trainingPlanDetailsRouteName="traineeRouteNames.TRAINING_PLAN_DETAILS"
    :courseDetailsRouteName="traineeRouteNames.COURSE_DETAILS"
  />
</template>
<script>
import Training from '../../../containers/training/Training.vue'
import { traineeRouteNames } from '../../../common/constants.js'
import { mapGetters } from 'vuex'

export default {
  name: 'MyTraining',

  components: {
    Training,
  },

  data() {
    return {
      traineeRouteNames,
    }
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },
}
</script>
