<template>
  <div class="column items-center q-pt-lg">
    <div class="column">
      <template v-if="content">
        <p v-html="content"></p>
      </template>
      <p v-else>
        Need help?
        <a class="blue-link" href="mailto: support@skills.org.nz">
          Email support@skills.org.nz
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpLink',
  props: {
    content: {
      type: String,
      require: false,
      default: '',
    },
  },
}
</script>
