<template>
  <q-input
    v-if="isNewZealand"
    dense
    mask="####"
    :value="value"
    v-on="$listeners"
    v-bind="$attrs"
    @input="input"
    readonly
  />
  <q-input
    v-else
    dense
    :value="value"
    mask="NNNNNNNNNNNN"
    v-on="$listeners"
    v-bind="$attrs"
    @input="input"
    :readonly="!isHasValueCountry"
  />
</template>
<script>
import { NEW_ZEALAND } from '../common/constants.js'

export default {
  name: 'SkillsPostCode',
  props: {
    value: null,
    country: {
      type: Object,
      required: false,
      default: () => {
        return { label: NEW_ZEALAND, value: NEW_ZEALAND }
      },
    },
  },

  computed: {
    isNewZealand() {
      return this.country?.value === NEW_ZEALAND
    },

    isHasValueCountry() {
      return !!this.country?.value
    },
  },

  methods: {
    input(event) {
      this.$emit('input', event)
    },
  },
}
</script>
