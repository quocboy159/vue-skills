<template>
  <div>
    <div class="row">
      <label class="text-h4">{{ title }}</label>
    </div>
    <div class="row col-12 q-pt-lg">
      <p class="col-12">
        <q-btn
          label="Block Course Progress Report"
          color="primary"
          no-caps
          @click="onGenerateReport('Block Course Progress Report')"
        />
        If you are enrolled in Plumbing, Drainlaying or Gasfitting training run
        this progress report.
      </p>
      <p class="col-12">
        <q-btn
          label="Electrical Progress Report"
          color="primary"
          no-caps
          @click="onGenerateReport('Electrical Progress Report')"
        />
        If you enrolled on or after
        <b>1 April 2017</b>
        to be an Electrical for Registration (EFR) run this progress report.
      </p>
      <p class="col-12">
        <q-btn
          label="Trainee Progress Report"
          color="primary"
          no-caps
          @click="onGenerateReport('Trainee Progress Report')"
        />
        All other trainees use this progress report.
      </p>
      <p class="col-12">
        <q-btn
          label="Candidate Training Record of Learning"
          color="primary"
          no-caps
          @click="onGenerateReport('Candidate Training Record of Learning')"
        />
        Trainee's Record of Achievement including a summary of the enrolments,
        unit standards and qualifications achieved.
      </p>
    </div>
  </div>
</template>

<script>
import ReportApi from '../apis/reportApi.js'

export default {
  name: 'Reports',

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

  methods: {
    onGenerateReport(name) {
      ReportApi.generateReportByName(name, this.id)
    },
  },
}
</script>
