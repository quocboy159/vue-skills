<template>
  <div v-if="link">
    <div class="row">
      <label class="text-h4">{{ link.displayName }}</label>
    </div>
    <div class="row col-12">
      <p>
        Please click on the button below to go to the
        {{ link.displayName }} page
      </p>
    </div>
    <div class="row col-12">
      <q-btn
        type="a"
        :href="`${link.url}`"
        label="Go"
        target="_blank"
        color="primary"
      />
    </div>
  </div>
</template>

<script>
import ContactApi from '../apis/contactApi.js'
import { mapGetters } from 'vuex'

export default {
  name: 'Resources',

  data() {
    return {
      link: null,
    }
  },

  async created() {
    await this.fetchData()
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },

  methods: {
    async fetchData() {
      const name = 'Resources'

      const links = await ContactApi.getLinksByContactIdAndName(
        this.crmCurrentUser.contactId,
        name
      )

      if (links.data.length) {
        this.link = links.data[0]
      }
    },
  },
}
</script>
