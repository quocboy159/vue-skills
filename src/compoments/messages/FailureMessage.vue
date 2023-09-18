<template>
  <div class="row col-12" v-if="isShowMessage">
    <div class="col-12">
      <q-banner rounded inline-actions class="bg-red-2 text-red-10">
        <label v-html="message"></label>
        <template v-slot:action>
          <q-btn
            flat
            color="text-red-10"
            icon="close"
            @click="onCloseMessage"
          />
        </template>
      </q-banner>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FailureMessage',

  props: {
    message: {
      type: String,
      required: false,
      default: '<strong>Failure,</strong> Your details have not been updated.',
    },
  },

  data() {
    return {
      isShowMessage: false,
    }
  },

  methods: {
    onCloseMessage() {
      this.isShowMessage = false
    },

    onOpenMessage() {
      this.isShowMessage = true
    },
  },
}
</script>
