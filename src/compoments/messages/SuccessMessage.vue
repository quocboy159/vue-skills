<template>
  <div class="row col-12" v-bind:class="{ hidden: !isShowMessage }">
    <div class="col-12">
      <q-banner rounded inline-actions class="bg-light-green-2 text-green-10">
        <label v-html="message"></label>
        <template v-slot:action>
          <q-btn
            flat
            color="text-green-10"
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
  name: 'SuccessMessage',

  props: {
    message: {
      type: String,
      required: false,
      default: '<strong>Success!</strong> Your details have been updated.',
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
