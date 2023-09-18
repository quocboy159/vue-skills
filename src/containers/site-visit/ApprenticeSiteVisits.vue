<template>
  <div>
    <div class="row">
      <label class="text-h4">Apprentice Visits</label>
      <q-btn
        label="New"
        no-caps
        class="q-ml-lg"
        :to="{
          name: newRouterName,
          params: { label: this.$globalLabel, contactId: this.id },
        }"
      />
    </div>
    <div class="row q-mt-md q-mb-md">
      <label class="text-h4">Site Visits</label>
    </div>
    <div class="q-pl-lg">
      <SkillsTable
        :columns="siteVisitsColumns"
        :data="siteVisits"
        noDataLabel="No visits were found"
        identityViewDetailField="id"
        :routerName="siteVisitDetailsRouteName"
      />
    </div>
  </div>
</template>

<script>
import SkillsTable from '../../compoments/tables/SkillsTable.vue'
import ContactApi from '../../apis/contactApi.js'
import moment from 'moment'
import { DDMMYYY } from '../../common/constants.js'

export default {
  name: 'ApprenticeSiteVisits',

  components: {
    SkillsTable,
  },

  data() {
    return {
      siteVisitsColumns: [
        {
          name: 'dateOfVisit',
          label: 'Visit Date',
          align: 'left',
          field: 'dateOfVisit',
          headerStyle: 'width: 15%',
          format: (value) => {
            if (value) return `${moment(value).format(DDMMYYY)}`
            return value
          },
          sortable: true,
        },
        {
          name: 'visitType',
          align: 'left',
          label: 'Visit Type',
          field: 'visitType',
          sortable: true,
          headerStyle: 'width: 15%',
        },
        {
          name: 'conductedByName',
          label: 'Conducted Name',
          field: 'conductedByName',
          align: 'left',
          sortable: true,
          headerStyle: 'width: 25%',
        },
        {
          name: 'visitNotes',
          label: 'Notes on Visit',
          field: 'visitNotes',
          sortable: true,
          align: 'left',
          headerStyle: 'width: 45%',
        },
      ],
      siteVisits: [],
    }
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    siteVisitDetailsRouteName: {
      type: String,
      required: true,
    },
    newRouterName: {
      type: String,
      required: true,
    },
  },

  async created() {
    await this.fetchData(this.id)
  },

  methods: {
    async fetchData(contactId) {
      const siteVisits = await ContactApi.getSiteVisitsByContactId(contactId)
      this.siteVisits = [...siteVisits.data]
    },
  },
}
</script>
