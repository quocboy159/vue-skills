<template>
  <q-dialog v-model="model" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-weight-bold text-blue-9">
          <slot v-if="$slots['header']" name="header"></slot>
          <div v-else class="text-h6 text-weight-bold">Alert</div>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section class="row items-center text-body1">
        <slot v-if="$slots['body']" name="body"></slot>
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <slot v-if="$slots['footer']" name="footer"></slot>
        <div v-else>
          <q-btn flat label="OK" color="primary" @click="onOk" v-close-popup />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'BaseDialog',

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      model: false,
    }
  },

  watch: {
    isOpen: {
      handler(data) {
        this.model = data
      },
      immediate: true,
    },
  },

  methods: {
    onOk() {
      if (this.$listeners?.onOk) {
        this.$emit('onOk')
      }
    },
  },
}
</script>
