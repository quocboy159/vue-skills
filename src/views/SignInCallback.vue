<template>
  <q-page padding>
    <q-btn flat color="primary" size="lg" :loading="true" style="width: 100%">
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Please wait while we are signing you in...
      </template>
    </q-btn>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignInCallback',
  created() {
    // This route is for handling AAD authorization code flow
    this.handleSignInRedirect()
  },
  methods: {
    ...mapActions('auth', ['handleSignInRedirect']),
  },
}
</script>
