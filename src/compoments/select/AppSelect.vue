<template>
  <q-select
    dense
    clearable
    use-input
    hide-selected
    fill-input
    :value="value"
    @input="input"
    v-on="listeners"
    v-bind="attrs"
    input-debounce="0"
    @filter="filterFn"
    :options="filteredOptions"
  ></q-select>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  name: 'AppSelect',
  props: {
    value: null,
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      filteredOptions: [],
    }
  },
  watch: {
    options(value) {
      this.filteredOptions = value
    },
  },
  computed: {
    listeners() {
      const { input, filter, ...listeners } = this.$listeners
      return listeners
    },
    attrs() {
      const { options, ...attrs } = this.$attrs
      return attrs
    },
  },
  created() {},
  methods: {
    input(event) {
      this.$emit('input', event)
    },
    filterFn(val, update) {
      setTimeout(() => {
        update(
          () => {
            if (val === '') {
              this.filteredOptions = this.options
            } else {
              const needle = val.toLowerCase()
              this.filteredOptions = this.options.filter((v) => {
                if (v.label) {
                  return v.label.toLowerCase().indexOf(needle) > -1
                } else if (v) {
                  return v.toLowerCase().indexOf(needle) > -1
                }
              })
            }
          },
          // next function is available in Quasar v1.7.4+;
          // "ref" is the Vue reference to the QSelect
          (ref) => {
            if (
              val !== '' &&
              ref.options.length > 0 &&
              val.trim().toLowerCase() === ref.options[0].label.toLowerCase()
            ) {
              ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            }
          }
        )
      }, 250)
    },
  },
}
</script>
