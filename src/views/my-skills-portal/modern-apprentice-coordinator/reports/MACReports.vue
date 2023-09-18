<template>
  <div>
    <div class="row">
      <label class="text-h4">Available Reports</label>
    </div>
    <div class="row col-12 q-pt-lg">
      <p class="col-12">
        <q-btn
          label="MAC Trainee Progress Summary"
          color="primary"
          no-caps
          @click="onGenerateReport('MAC Trainee Progress Summary')"
        />
        MAC Trainee Progress Summary
      </p>
    </div>
  </div>
</template>
<script>
import ReportApi from '../../../../apis/reportApi.js'
import { mapGetters } from 'vuex'

export default {
  name: 'Reports',

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },

  methods: {
    onGenerateReport(name) {
      ReportApi.generateReportByName(name, this.crmCurrentUser.accountId)
    },
  },
}
</script>
