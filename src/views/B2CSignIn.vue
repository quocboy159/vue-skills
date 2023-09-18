<template>
  <q-page padding>
    <summary-error v-bind:class="[isError() ? '' : 'hidden']"></summary-error>
    <q-btn
      flat
      color="primary"
      size="lg"
      :loading="true"
      style="width: 100%"
      v-bind:class="[isError() ? 'hidden' : '']"
    >
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Please wait ...
      </template>
    </q-btn>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { b2CsignIn, isAuthenticated } from '../common/b2cAuth.js'
import SummaryError from '../compoments/error/SummaryError.vue'
import { SkillsGroupPortalRouteNames } from '../common/constants.js'

export default {
  name: 'B2CSignIn',
  components: { SummaryError },

  computed: {
    ...mapGetters(['applicationError']),
  },
  methods: {
    isError() {
      return (
        (this.applicationError.message &&
          this.applicationError.message.length != 0) ||
        (this.applicationError.errors &&
          this.applicationError.errors.length != 0)
      )
    },
  },
  created() {
    if (!isAuthenticated()) {
      b2CsignIn(this.$router.currentRoute.query.redirectUrl)
    } else {
      if (this.$router.currentRoute.query.redirectUrl) {
        this.$router.push({
          path: this.$router.currentRoute.query.redirectUrl,
        })
      } else {
        this.$router.push({
          name: SkillsGroupPortalRouteNames.HOME,
          params: { label: this.$route.params.label },
        })
      }
    }
  },
}
</script>
