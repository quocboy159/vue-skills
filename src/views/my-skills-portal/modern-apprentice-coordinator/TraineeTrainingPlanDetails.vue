<template>
  <training-plan-details :id="id" />
</template>
<script>
import TrainingPlanDetails from '../../../containers/training/TrainingPlanDetails.vue'
export default {
  name: 'TraineeTrainingPlanDetails',

  components: {
    TrainingPlanDetails,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
