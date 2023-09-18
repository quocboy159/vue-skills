<template>
  <div>
    <div v-if="inline">
      <q-checkbox
        v-for="option in options"
        :key="option.value"
        v-on="$listeners"
        v-bind="$attrs"
        v-model="localValue"
        :val="option.value"
        :label="option.label"
        :keep-color="$attrs.error"
        :color="$attrs.error ? 'red' : ''"
      />
    </div>
    <div v-else>
      <q-option-group
        v-on="$listeners"
        v-bind="$attrs"
        v-model="localValue"
        type="checkbox"
        :options="options"
        :keep-color="$attrs.error"
        :color="$attrs.error ? 'red' : ''"
      />
    </div>

    <!-- do manually error messsage section because checkbox and radio have no error attribute -->
    <div v-show="$attrs.error" class="q-field__bottom row">
      <div class="base-checkbox-messages col">
        <div>
          <q-icon name="error" class="text-red" size="sm" />
          {{ $attrs['error-message'] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',

  props: {
    value: null,
    options: {
      type: Array,
      default: () => [],
    },
    inline: {
      type: Boolean,
      default: () => false,
    },
  },

  computed: {
    localValue: {
      get: function () {
        return this.value
      },
      set: function (newValue) {
        this.$emit('change', newValue)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.base-checkbox-messages {
  color: var(--q-color-negative);
}
</style>
