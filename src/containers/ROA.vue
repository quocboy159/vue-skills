<template>
  <div id="myROA">
    <div class="row">
      <label class="text-h4">{{ title }}</label>
    </div>
    <div class="q-pl-lg">
      <SkillsTable
        :columns="qualificationsColumns"
        :data="qualifications"
        title="Qualifications"
        noDataLabel="No qualifications found"
        :isViewDetail="false"
      />
    </div>
    <div class="q-pt-lg q-pl-lg">
      <SkillsTable
        :columns="unitStandardsColumns"
        :data="unitStandards"
        title="Unit Standards"
        noDataLabel="No unit standards found"
        :isViewDetail="false"
      />
    </div>
    <div class="q-pt-lg q-pl-lg">
      <SkillsTable
        :columns="incompleteUnitStandardsColumns"
        :data="incompleteUnitStandards"
        title="Incomplete Unit Standards"
        noDataLabel="No incomplete unit standards found"
        :isViewDetail="false"
      />
    </div>
  </div>
</template>

<script>
import SkillsTable from '../compoments/tables/SkillsTable.vue'
import ContactApi from '../apis/contactApi.js'
import moment from 'moment'
import { DDMMYYY } from '../common/constants.js'

export default {
  name: 'ROA',

  components: {
    SkillsTable,
  },

  data() {
    return {
      qualificationsColumns: [
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
          headerStyle: 'width: 50%',
        },
        {
          name: 'credits',
          align: 'left',
          label: 'Credits',
          field: 'credits',
          sortable: true,
          headerStyle: 'width: 15%',
        },
        {
          name: 'creditsAchieved',
          label: 'Credits Achieved',
          field: 'creditsAchieved',
          align: 'left',
          sortable: true,
          headerStyle: 'width: 15%',
        },
        {
          name: 'dateCompleted',
          label: 'Date Completed',
          field: 'dateCompleted',
          align: 'left',
          format: (value) => {
            if (value) return `${moment(value).format(DDMMYYY)}`
            return value
          },
          sortable: true,
          headerStyle: 'width: 20%',
        },
      ],
      qualifications: [],
      unitStandardsColumns: [
        {
          name: 'code',
          label: 'Code',
          align: 'left',
          field: 'code',
          sortable: true,
          headerStyle: 'width: 15%',
        },
        {
          name: 'version',
          align: 'left',
          label: 'Version',
          field: 'version',
          sortable: true,
          headerStyle: 'width: 10%',
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
          sortable: true,
          headerStyle: 'width: 35%',
        },
        {
          name: 'level',
          label: 'Level',
          field: 'level',
          align: 'left',
          sortable: true,
          headerStyle: 'width: 10%',
        },
        {
          name: 'credits',
          label: 'Credits',
          field: 'credits',
          align: 'left',
          sortable: true,
          headerStyle: 'width: 10%',
        },
        {
          name: 'dateAssessed',
          label: 'Date Assessed',
          field: 'dateAssessed',
          align: 'left',
          format: (value) => `${moment(value).format(DDMMYYY)}`,
          sortable: true,
          headerStyle: 'width: 20%',
        },
      ],
      unitStandards: [],
      incompleteUnitStandardsColumns: [
        {
          name: 'code',
          label: 'Code',
          align: 'left',
          field: 'code',
          sortable: true,
          headerStyle: 'width: 15%',
        },
        {
          name: 'version',
          align: 'left',
          label: 'Version',
          field: 'version',
          sortable: true,
          headerStyle: 'width: 10%',
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
          sortable: true,
          headerStyle: 'width: 35%',
        },
        {
          name: 'level',
          label: 'Level',
          field: 'level',
          align: 'left',
          sortable: true,
          headerStyle: 'width: 10%',
        },
        {
          name: 'credits',
          label: 'Credits',
          field: 'credits',
          align: 'left',
          sortable: true,
          headerStyle: 'width: 10%',
        },
        {
          name: 'dateAssessed',
          label: 'Date Assessed',
          field: 'dateAssessed',
          align: 'left',
          format: (value) => {
            if (value) return `${moment(value).format(DDMMYYY)}`
            return value
          },
          sortable: true,
          headerStyle: 'width: 20%',
        },
      ],
      incompleteUnitStandards: [],
    }
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  async created() {
    await this.fetchData(this.id)
  },

  methods: {
    async fetchData(contactId) {
      const qualifications = await ContactApi.getQualificationsByContactId(
        contactId
      )
      this.qualifications = [...qualifications.data]

      const unitStandards = await ContactApi.getCompletedUnitStandardsByContactId(
        contactId
      )
      this.unitStandards = [...unitStandards.data]

      const incompleteUnitStandards = await ContactApi.getNotCompletedUnitStandardsByContactId(
        contactId
      )
      this.incompleteUnitStandards = [...incompleteUnitStandards.data]
    },
  },
}
</script>
