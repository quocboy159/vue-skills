<template>
  <div>
    <div class="row">
      <label class="text-h4">Available Reports</label>
    </div>
    <div class="row col-12 q-pt-lg">
      <p class="col-12">
        <q-btn
          label="Account Block Course Progress Report"
          color="primary"
          no-caps
          @click="onGenerateReport('Account Block Course Progress Report')"
        />
        If you have any trainees enrolled in Plumbing, Drainlaying or Gasfitting
        training run this progress report.
      </p>
      <p class="col-12">
        <q-btn
          label="Account Electrical Progress Report"
          color="primary"
          no-caps
          @click="onGenerateReport('Account Electrical Progress Report')"
        />
        If you have any trainees who enrolled on or after
        <b>1 April 2017</b>
        to be an Electrical for Registration (EFR) run this progress report.
      </p>
      <p class="col-12">
        <q-btn
          label="Account Trainee Progress Report"
          color="primary"
          no-caps
          @click="onGenerateReport('Account Trainee Progress Report')"
        />
        For all your other trainees use this progress report.
      </p>
      <p class="col-12">
        <q-btn
          label="Employer Trainee Progress Summary"
          color="primary"
          no-caps
          @click="onGenerateReport('Employer Trainee Progress Summary')"
        />
        This is a summary of progress for all trainees, including credits
        achieved, % of programme complete and enrolment details.
      </p>
    </div>
  </div>
</template>

<script>
import ReportApi from '../../../apis/reportApi.js'
import { mapGetters } from 'vuex'

export default {
  name: 'TraineeReports',

  data() {
    return {
      accountId: null,
      contactId: null,
    }
  },

  created() {
    this.accountId = this.crmCurrentUser.accountId
    this.contactId = this.crmCurrentUser.contactId
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },

  methods: {
    onGenerateReport(name) {
      ReportApi.generateReportByName(name, this.accountId)
    },
  },
}
</script>
