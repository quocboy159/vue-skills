<template>
  <training
    :id="id"
    pageTitle="Training"
    trainingPlansTableTitle="Training Plans"
    upComingCoursesTableTitle="Upcoming Courses"
    :trainingPlanDetailsRouteName="amRouteNames.TRAINEE_TRAINING_PLAN_DETAILS"
    :courseDetailsRouteName="amRouteNames.TRAINEE_COURSE_DETAILS"
  />
</template>
<script>
import Training from '../../../../containers/training/Training.vue'
import { amRouteNames } from '../../../../common/constants.js'
export default {
  name: 'TraineeTraining',

  components: {
    Training,
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
