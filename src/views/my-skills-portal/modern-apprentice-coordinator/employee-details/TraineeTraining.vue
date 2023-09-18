<template>
  <training
    :id="id"
    pageTitle="Training"
    trainingPlansTableTitle="Training Plans"
    upComingCoursesTableTitle="Upcoming Courses"
    :trainingPlanDetailsRouteName="macRouteNames.TRAINEE_TRAINING_PLAN_DETAILS"
    :courseDetailsRouteName="macRouteNames.TRAINEE_COURSE_DETAILS"
  />
</template>
<script>
import Training from '../../../../containers/training/Training.vue'
import { macRouteNames } from '../../../../common/constants.js'
export default {
  name: 'TraineeTraining',

  components: {
    Training,
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
