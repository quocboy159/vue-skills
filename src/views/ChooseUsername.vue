<template>
  <div class="row col-12">
    <div class="col-4">
      <label class="field-label field-name">
        Enter skills username e.g. bob.mctester:
      </label>
      <q-input v-model.trim="username" outlined>
        <template v-slot:append>
          <q-btn
            icon="search"
            label="Go"
            color="primary"
            @click="onSearch()"
            @keyup.enter="onSearch()"
            :disable="!isUsernameHasValue"
          ></q-btn>
        </template>
      </q-input>
    </div>
  </div>
</template>
<script>
import UserApi from '../apis/userApi.js'
import { mapActions } from 'vuex'

export default {
  name: 'ChooseUsername',

  data() {
    return {
      username: '',
    }
  },

  computed: {
    isUsernameHasValue() {
      return !!this.username
    },
  },

  methods: {
    ...mapActions(['setCRMCurrentUser']),

    async onSearch() {
      if (!this.username) {
        return
      }

      const result = await UserApi.getUserDetails(this.username)
      if (result.data) {
        this.setCRMCurrentUser(result.data)
        this.$router.push({
          name: 'home',
          params: { label: this.$globalLabel },
        })
      }
    },
  },
}
</script>
