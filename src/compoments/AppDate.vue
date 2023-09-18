<template>
  <q-input
    dense
    :value="value"
    @input="input"
    v-on="$listeners"
    v-bind="$attrs"
    bottom-slots
    bg-color="fieldbg"
    color="field"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            :value="value"
            :mask="dateFormat"
            minimal
            @input="dateChanged"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
/* eslint-disable no-unused-vars */
import { Constants } from '@/valueObjects'
export default {
  name: 'AppDate',
  props: {
    value: null,
    options: {
      type: Function,
      default: () => {
        return true
      },
    },
  },

  data() {
    return {
      dateFormat: Constants.DATE_FORMAT,
    }
  },

  methods: {
    input(event) {
      this.$emit('input', event)
    },
    dateChanged(newValue) {
      this.$refs.qDateProxy.hide()
      this.$emit('input', newValue)
    },
  },
}
</script>
