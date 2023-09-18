<template>
  <div id="trainee">
    <div class="row">
      <label class="text-h4">{{ pageTitle }}</label>
    </div>
    <div class="q-pl-lg">
      <SkillsTable
        :columns="trainingPlansColumns"
        :data="trainingPlans"
        :routerName="trainingPlanDetailsRouteName"
        identityViewDetailField="id"
        :title="trainingPlansTableTitle"
        noDataLabel="No training plans were found"
      />
    </div>
    <div class="q-pt-lg q-pl-lg">
      <SkillsTable
        :columns="upComingCoursesColumns"
        :data="upComingCourses"
        :routerName="courseDetailsRouteName"
        identityViewDetailField="id"
        :title="upComingCoursesTableTitle"
        noDataLabel="No courses were found"
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
  name: 'Training',

  components: {
    SkillsTable,
  },

  data() {
    return {
      trainingPlansColumns: [
        {
          name: 'name',
          label: 'Title',
          align: 'left',
          field: 'name',
          sortable: true,
          headerStyle: 'width: 40%',
        },
        {
          name: 'creditsRequired',
          align: 'left',
          label: 'Credits Selected',
          field: 'creditsRequired',
          sortable: true,
        },
        {
          name: 'creditsAchieved',
          label: 'Credits Achieved',
          field: 'creditsAchieved',
          align: 'left',
          sortable: true,
        },
        {
          name: 'creditsRemaining',
          label: 'Credits Remaining',
          field: 'creditsRemaining',
          align: 'left',
          sortable: true,
        },
      ],
      trainingPlans: [],
      upComingCoursesColumns: [
        {
          name: 'name',
          label: 'Course Name',
          align: 'left',
          field: 'name',
          sortable: true,
          headerStyle: 'width: 25%',
        },
        {
          name: 'providerName',
          align: 'left',
          label: 'Provider Name',
          field: 'providerName',
          sortable: true,
          headerStyle: 'width: 18%',
        },
        {
          name: 'venueName',
          label: 'Venue Name',
          field: 'venueName',
          align: 'left',
          sortable: true,
          headerStyle: 'width: 18%',
        },
        {
          name: 'venueLocation',
          label: 'Venue Location',
          field: 'venueLocation',
          align: 'left',
          sortable: true,
          headerStyle: 'width: 18%',
        },
        {
          name: 'startDate',
          label: 'Start Date',
          field: 'startDate',
          align: 'left',
          format: (value) => `${moment(value).format(DDMMYYY)}`,
          sortable: true,
        },
        {
          name: 'endDate',
          label: 'End Date',
          field: 'endDate',
          align: 'left',
          format: (value) => `${moment(value).format(DDMMYYY)}`,
          sortable: true,
        },
      ],
      upComingCourses: [],
    }
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    pageTitle: {
      type: String,
      required: true,
    },
    trainingPlansTableTitle: {
      type: String,
      required: true,
    },
    upComingCoursesTableTitle: {
      type: String,
      required: true,
    },
    trainingPlanDetailsRouteName: {
      type: String,
      required: true,
    },
    courseDetailsRouteName: {
      type: String,
      required: true,
    },
  },

  async created() {
    await this.fetchData()
  },

  methods: {
    async fetchData() {
      const trainingPlans = await ContactApi.getTrainingPlansByContactId(
        this.id
      )
      this.trainingPlans = [...trainingPlans.data]

      const upComingCourses = await ContactApi.getUpcomingCoursesByContactId(
        this.id
      )
      this.upComingCourses = [...upComingCourses.data]
    },
  },
}
</script>
