<template>
  <div class="checkbox-container">
    <q-checkbox
      :class="{ 'border-bottom-red ': error }"
      v-model="isChecked"
      :label="label"
      :disable="disabled"
    />
    <div v-if="error" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-checkbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    label: String,
    checked: Boolean,
    error: Boolean,
    errorMessage: String,
    disabled: Boolean,
  },
  data() {
    return {
      isChecked: this.checked,
    }
  },
  watch: {
    checked(newValue) {
      this.isChecked = newValue
    },
    isChecked(newValue) {
      this.$emit('change', newValue)
    },
  },
}
</script>

<style lang="stylus" scoped>

.checkbox-container {
  min-height : 63px
}

.border-bottom-red {
  border-bottom : 2px solid red
}

.error-message {
  color: red !important;
  font-size : 11px !important
  margin-left : 10px
  margin-top : 5px
}
</style>
