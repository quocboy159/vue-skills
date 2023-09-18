<template>
  <div class="row" v-if="error">
    <div class="col-12">
      <div class="row">
        <div class="col-12 text-center">
          <p class="text-negative" v-html="error.message"></p>
          <div v-for="item in error.errors" :key="item.key">
            <p class="text-negative" v-html="item.errorMessage"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: null,
  },
}
</script>
