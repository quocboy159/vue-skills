<template>
  <q-page padding></q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Logout',

  created() {
    this.signOut()
  },

  methods: {
    ...mapActions('auth', ['signOut']),
  },
}
</script>
