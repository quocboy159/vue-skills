<template>
  <div>
    <div class="row q-mb-xs">
      <label class="text-h4">Training Plan Details</label>
    </div>
    <div class="row" v-if="trainingPlan">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-2">
            <strong class="q-pr-lg">Name</strong>
          </div>
          <div class="col-md-3 p-l-10">{{ trainingPlan.name }}</div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <strong class="q-pr-lg">Trainee</strong>
          </div>
          <div class="col-md-3 p-l-10">{{ trainingPlan.traineeName }}</div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <strong class="q-pr-lg">Credits</strong>
          </div>
          <div class="col-md-3 p-l-10">
            {{ trainingPlan.creditsAchieved }} out of
            {{ trainingPlan.creditsRequired }},
            {{ trainingPlan.creditsRemaining }} remaining
          </div>
        </div>
      </div>
    </div>

    <div class="q-pt-lg q-pl-lg">
      <SkillsTable
        :columns="qualificationsColumns"
        :data="qualifications"
        title="Qualifications"
        noDataLabel="No qualifications were found"
        :isViewDetail="false"
      />
    </div>

    <div class="q-pt-lg q-pl-lg">
      <SkillsTable
        :columns="unitStandardColumns"
        :data="unitStandards"
        title="Unit Standards"
        noDataLabel="No unit standards were found"
        :isViewDetail="false"
      />
    </div>
  </div>
</template>

<script>
import SkillsTable from '../../compoments/tables/SkillsTable.vue'
import TrainingPlanApi from '../../apis/trainingPlanApi.js'
import { dateToString } from '../../common/datetime.js'

export default {
  name: 'TrainingPlanDetails',

  components: {
    SkillsTable,
  },

  data() {
    return {
      trainingPlan: null,
      trainingPlanId: null,

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
          align: 'left',
          label: 'Credits Achieved',
          field: 'creditsAchieved',
          sortable: true,
          headerStyle: 'width: 15%',
        },
        {
          name: 'dateCompleted',
          label: 'Date Completed',
          field: 'dateCompleted',
          align: 'left',
          format: (value) => dateToString(value),
          sortable: true,
          headerStyle: 'width: 20%',
        },
      ],
      qualifications: [],

      unitStandardColumns: [
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
          format: (value) => dateToString(value),
          sortable: true,
          headerStyle: 'width: 20%',
        },
      ],
      unitStandards: [],
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  async created() {
    this.trainingPlanId = this.id
    await this.fetchData(this.trainingPlanId)
  },

  methods: {
    async fetchData(trainingPlanId) {
      const qualifications = await TrainingPlanApi.getQualificationsByTrainingPlanId(
        trainingPlanId
      )
      this.qualifications = [...qualifications.data]

      const unitStandards = await TrainingPlanApi.getUnitStandardsByTrainingPlanId(
        trainingPlanId
      )
      this.unitStandards = [...unitStandards.data]

      const trainingPlanData = await TrainingPlanApi.getTrainingPlansById(
        trainingPlanId
      )
      this.trainingPlan = { ...trainingPlanData.data }
    },
  },
}
</script>
