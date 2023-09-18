<template>
  <div>
    <div class="row q-mb-xs">
      <label class="text-h4">Course Details</label>
    </div>
    <div class="row" v-if="course">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-2">
            <strong>Name</strong>
          </div>
          <div class="col-md-3 p-l-10">{{ course.name }}</div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <strong>Provider</strong>
          </div>
          <div class="col-md-3 p-l-10">{{ course.providerName }}</div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <strong>Venue</strong>
          </div>
          <div class="col-md-3 p-l-10">{{ course.venueName }}</div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <strong>Location</strong>
          </div>
          <div class="col-md-3 p-l-10">{{ course.venueLocation }}</div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <strong>Start Date</strong>
          </div>
          <div class="col-md-3 p-l-10">
            {{ course.startDate | formatDate }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <strong>End Date</strong>
          </div>
          <div class="col-md-3 p-l-10">
            {{ course.endDate | formatDate }}
          </div>
        </div>
      </div>
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
import SkillsTable from '../compoments/tables/SkillsTable.vue'
import CourseApi from '../apis/courseApi.js'
import moment from 'moment'
import { DDMMYYY } from '../common/constants.js'

export default {
  name: 'CourseDetails',

  components: {
    SkillsTable,
  },

  data() {
    return {
      course: null,
      courseId: null,

      unitStandardColumns: [
        {
          name: 'code',
          label: 'Code',
          align: 'left',
          field: 'code',
          sortable: true,
        },
        {
          name: 'version',
          align: 'left',
          label: 'Version',
          field: 'version',
          sortable: true,
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
          sortable: true,
        },
        {
          name: 'level',
          label: 'Level',
          field: 'level',
          align: 'left',
          sortable: true,
        },
        {
          name: 'credits',
          label: 'Credits',
          field: 'credits',
          align: 'left',
          sortable: true,
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
    this.initializePage()
    await this.fetchData(this.courseId)
  },

  methods: {
    initializePage() {
      this.courseId = this.id
    },
    async fetchData(courseId) {
      const unitStandards = await CourseApi.getUnitStandardsByCourseId(courseId)
      this.unitStandards = [...unitStandards.data]

      const courseData = await CourseApi.getCourseById(courseId)
      this.course = { ...courseData.data }
    },
  },
}
</script>
