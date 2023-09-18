<template>
  <course-details :id="id" />
</template>
<script>
import CourseDetails from '../../../containers/CourseDetails.vue'
export default {
  name: 'TraineeCourseDetails',

  components: {
    CourseDetails,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
