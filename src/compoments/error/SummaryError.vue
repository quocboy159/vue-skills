<template>
  <div class="row" v-if="applicationError.message || applicationError.errors">
    <div class="col-12">
      <div class="row">
        <div class="col-12 text-center">
          <p class="text-negative" v-html="applicationError.message"></p>
          <div v-for="item in applicationError.errors" :key="item.key">
            <p class="text-negative" v-html="item.errorMessage"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['applicationError']),
  },
}
</script>
