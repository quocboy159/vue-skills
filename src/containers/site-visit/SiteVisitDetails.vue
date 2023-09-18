<template>
  <div>
    <div class="row q-mb-sm">
      <label class="text-h4">Site Visit Details</label>
    </div>
    <div class="row" v-if="siteVisit">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-2 col-sm-3 col-xs-12">
            <strong>Trainee</strong>
          </div>
          <div class="col-md-10 col-sm-9 col-xs-12 field-content">
            {{ siteVisit.traineeName }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 col-sm-3 col-xs-12">
            <strong>Training Programme</strong>
          </div>
          <div class="col-md-10 col-sm-9 col-xs-12 field-content">
            {{ siteVisit.trainingProgrammeName }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 col-sm-3 col-xs-12">
            <strong>Mac Agreement</strong>
          </div>
          <div class="col-md-10 col-sm-9 col-xs-12 field-content">
            {{ siteVisit.macAgreementName }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 col-sm-3 col-xs-12">
            <strong>Date Of Visit</strong>
          </div>
          <div class="col-md-10 col-sm-9 col-xs-12 field-content">
            {{ moment(siteVisit.dateOfVisit) }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 col-sm-3 col-xs-12">
            <strong>Visit Type</strong>
          </div>
          <div class="col-md-10 col-sm-9 col-xs-12 field-content">
            {{ siteVisit.visitType }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 col-sm-3 col-xs-12">
            <strong>Conducted By</strong>
          </div>
          <div class="col-md-10 col-sm-9 col-xs-12 field-content">
            {{ siteVisit.conductedByName }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 col-sm-3 col-xs-12">
            <strong>Visit Notes</strong>
          </div>
          <div class="col-md-10 col-sm-9 col-xs-12 field-content">
            {{ siteVisit.visitNotes }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 col-sm-3 col-xs-12">
            <strong>Quarterly Progress</strong>
          </div>
          <div class="col-md-10 col-sm-9 col-xs-12 field-content">
            {{ siteVisit.quarterlyProgress }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 col-sm-3 col-xs-12">
            <strong>Employer Visit</strong>
          </div>
          <div class="col-md-10 col-sm-9 col-xs-12 field-content">
            {{ siteVisit.employerVisit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SiteVisitApi from '../../apis/siteVisitApi.js'
import moment from 'moment'
import { DDMMYYYHMM } from '../../common/constants.js'
export default {
  name: 'SiteVisitDetails',

  data() {
    return {
      siteVisit: null,
    }
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  async created() {
    await this.fetchData(this.id)
  },

  methods: {
    async fetchData(id) {
      const siteVisitData = await SiteVisitApi.getSiteVisitById(id)
      this.siteVisit = { ...siteVisitData.data }
    },
    moment: function (date) {
      return moment(date).format(DDMMYYYHMM)
    },
  },
}
</script>

<style lang="stylus">
@media only screen and (min-width: 600px){
  .field-content{
    padding-left : 10px
  }
}
@media only screen and (min-width: 1024px){
  .field-content{
    padding-left : 0
  }
}
</style>
