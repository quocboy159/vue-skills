<template>
  <div>
    <q-btn
      no-caps
      flat
      :label="label"
      @click="onClick"
      class="q-btn-log-out"
      icon-right="login"
    ></q-btn>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SkillsLogoutButton',

  props: {
    label: {
      type: String,
      default: 'Log out',
    },
  },

  methods: {
    ...mapActions(['signOut']),

    async onClick() {
      let logoutUrl = process.env.VUE_APP_B2C_POST_LOG_OUT_REDIRECT_URI
      if (this.$route.params.label) {
        logoutUrl = `/${this.$route.params.label}${logoutUrl}`
      }
      await this.signOut(logoutUrl)
    },
  },
}
</script>

<style lang="scss">
.q-btn-log-out {
  .on-right {
    margin-left: 0px !important;
  }
}
</style>
