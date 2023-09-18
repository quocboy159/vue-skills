<template>
  <reports title="Reports" :id="id" />
</template>
<script>
import Reports from '../../../../containers/Reports.vue'
export default {
  name: 'ReportsTab',

  components: {
    Reports,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
