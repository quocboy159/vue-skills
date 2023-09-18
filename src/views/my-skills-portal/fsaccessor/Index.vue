<template>
  <div>
    <div class="row">
      <label class="text-h4">Financial Services Assessor</label>
    </div>
    <div class="q-pt-lg row">
      <div class="col-md-12 col-xs-12">
        <label class="field-label field-name">Please select an option</label>
        <q-list dense padding class="field-input">
          <q-item v-for="link in links" :key="link.url" clickable v-ripple>
            <q-item-section>
              <li class="blue-link">
                <a class="blue-link" :href="link.url" target="_blank">
                  {{ link.displayName }}
                </a>
              </li>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import ContactApi from '../../../apis/contactApi.js'
import { mapGetters } from 'vuex'

export default {
  name: 'FSAssessor',

  data() {
    return {
      links: [],
    }
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },

  async created() {
    this.fetchData = async () => {
      const linkList = await ContactApi.getLinksByContactIdAndName(
        this.crmCurrentUser.contactId,
        'FSSkillsBankAssessor'
      )
      this.links = linkList.data
    }
    this.fetchData()
  },
}
</script>
