<template>
  <div>
    <div class="row">
      <label class="text-h4">Financial Services Candidate</label>
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
        <label>
          If you need help to understand the overall process please check the
          <a class="blue-link" :href="handbookLink.url" target="_blank">
            Candidate Handbook
          </a>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import ContactApi from '../../../apis/contactApi.js'
import DocumentApi from '../../../apis/documentApi.js'
import { mapGetters } from 'vuex'
import { CANDIDATE_HANDBOOK } from '../../../common/constants.js'

export default {
  name: 'FSCandidate',

  data() {
    return {
      links: [],
      handbookLink: {},
    }
  },

  async created() {
    this.fetchLinksData = async () => {
      const linkList = await ContactApi.getLinksByContactIdAndName(
        this.crmCurrentUser.contactId,
        'FSAspeqNewExam'
      )
      const linkList2 = await ContactApi.getLinksByContactIdAndName(
        this.crmCurrentUser.contactId,
        'FSSkillsBankNewAssessment'
      )
      this.links = [...linkList.data, ...linkList2.data]
    }
    this.fetchHandbookData = async () => {
      const handbookDoc = await DocumentApi.getDocumentByName(
        CANDIDATE_HANDBOOK
      )
      this.handbookLink = handbookDoc.data
    }
    this.initializePage = () => {
      this.fetchLinksData()
      this.fetchHandbookData()
    }
    this.initializePage()
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },
}
</script>
