<template>
  <q-select
    ref="qSelectRef"
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
    @blur="onBlur"
    :options="filteredOptions"
  ></q-select>
</template>

<script>
/* eslint-disable no-unused-vars */
import MACApi from '../../apis/macoordinatorApi.js'
export default {
  name: 'ContactSearchSelect',
  props: {
    value: null,
    accountId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filteredOptions: [],
    }
  },
  computed: {
    listeners() {
      const { input, filter, ...listeners } = this.$listeners
      return listeners
    },
    attrs() {
      const { ...attrs } = this.$attrs
      return attrs
    },
  },
  created() {
    this.list = []
    this.lastValSearch = ''
    this.searchingText = ''
  },
  methods: {
    onBlur(event) {
      if (this.lastValSearch.length < 4) {
        this.$emit('input', '')
        this.list = []
        this.filteredOptions = this.list
        this.searchingText = null
      }
    },

    input(event) {
      this.$emit('input', event)
    },
    filterFn(val, update) {
      this.lastValSearch = val
      update(
        async () => {
          if (val === '') {
            return
          }
          if (this.lastValSearch.length < 4) {
            this.list = []
            this.filteredOptions = this.list
            this.searchingText = null
          } else {
            if (
              val.length >= 4 &&
              this.lastValSearch.length >= 4 &&
              this.searchingText !== this.lastValSearch.substring(0, 4)
            ) {
              this.searchingText = val.substring(0, 4)
              const result = await MACApi.getMACEmployeesInTraining(
                this.accountId,
                this.searchingText
              )
              this.list = result.data.map((x) => ({
                value: x.id,
                label: `${x.firstName} ${x.lastName}`,
              }))
            }
            if (this.searchingText === this.lastValSearch.substring(0, 4)) {
              if (this.lastValSearch === 4) {
                this.filteredOptions = this.list
              } else {
                const needle = this.lastValSearch.toLowerCase()
                this.filteredOptions = this.list.filter(
                  (v) => v.label.toLowerCase().indexOf(needle) > -1
                )
              }
            }
            this.$refs.qSelectRef && this.$refs.qSelectRef.showPopup()
          }
        },
        // next function is available in Quasar v1.7.4+;
        // "ref" is the Vue reference to the QSelect
        (ref) => {
          if (val !== '' && ref.options.length > 0) {
            ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
            ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
          }
        }
      )
    },
  },
}
</script>
