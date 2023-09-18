<template>
  <roa title="Record of Achievement" :id="id" />
</template>
<script>
import Roa from '../../../../containers/ROA.vue'
export default {
  name: 'ROATab',

  components: {
    Roa,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
