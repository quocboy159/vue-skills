<template>
  <training
    :id="id"
    pageTitle="Training"
    trainingPlansTableTitle="Training Plans"
    upComingCoursesTableTitle="Upcoming Courses"
    :trainingPlanDetailsRouteName="employerRouteNames.TRAINING_PLAN_DETAILS"
    :courseDetailsRouteName="employerRouteNames.COURSE_DETAILS"
  />
</template>
<script>
import Training from '../../../../containers/training/Training.vue'
import { employerRouteNames } from '../../../../common/constants.js'
export default {
  name: 'TraineeTraining',

  components: {
    Training,
  },

  data() {
    return {
      employerRouteNames,
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
