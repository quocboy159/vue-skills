<template>
  <div>
    <div class="row">
      <label class="text-h4">Create</label>
    </div>

    <success-message ref="successMessage" />

    <failure-message ref="failureMessage" />

    <div class="row q-pt-lg">
      <div class="col-12">
        <q-card>
          <q-card-section class="row">
            <div class="col-xs-12 col-md-10">
              <h1 class="text-h5">Trainee Information</h1>
              <div class="row col-12">
                <label class="field-label field-name-required">Trainee</label>
                <q-input
                  v-if="this.contactId"
                  class="field-input"
                  dense
                  disable
                  v-model="siteVisit.traineeName"
                />
                <contact-search-select
                  v-else
                  class="field-input"
                  v-model="siteVisit.trainee"
                  :accountId="accountId"
                  :error-message="traineeErrors"
                  :error="$v.siteVisit.trainee.$error"
                  @blur="$v.siteVisit.trainee.$touch"
                  @input="traineeChanged"
                ></contact-search-select>
              </div>
              <div class="row">
                <label class="field-label field-name-required">
                  Training Programme
                </label>
                <app-select
                  class="field-input"
                  v-model="siteVisit.trainingProgramme"
                  :options="trainingProgrammes"
                  :error-message="trainingProgrammeErrors"
                  :error="$v.siteVisit.trainingProgramme.$error"
                  @input="trainingProgrammeChanged"
                  @blur="$v.siteVisit.trainingProgramme.$touch"
                ></app-select>
              </div>
              <div class="row">
                <label class="field-label field-name-required">
                  Mac Agreement
                </label>
                <app-select
                  class="field-input"
                  v-model="siteVisit.macAgreement"
                  :options="macAgreements"
                  :error-message="macAgreementErrors"
                  :error="$v.siteVisit.macAgreement.$error"
                  @input="$v.siteVisit.macAgreement.$touch"
                  @blur="$v.siteVisit.macAgreement.$touch"
                ></app-select>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="row">
            <div class="col-xs-12 col-md-10">
              <h1 class="text-h5">Visit Information</h1>
              <div class="row">
                <label class="field-label field-name-required">
                  Date Of Visit
                </label>
                <app-date
                  class="field-input"
                  v-model="siteVisit.dateOfVisit"
                  :error-message="dateOfVisitErrors"
                  :error="$v.siteVisit.dateOfVisit.$error"
                  @input="$v.siteVisit.dateOfVisit.$touch"
                  @blur="$v.siteVisit.dateOfVisit.$touch"
                />
              </div>
              <div class="row">
                <label class="field-label field-name-required">
                  Visit Type
                </label>
                <app-select
                  class="field-input"
                  v-model="siteVisit.visitType"
                  :options="visitTypes"
                  :error-message="visitTypeErrors"
                  :error="$v.siteVisit.visitType.$error"
                  @input="$v.siteVisit.visitType.$touch"
                  @blur="$v.siteVisit.visitType.$touch"
                ></app-select>
              </div>
              <div class="row">
                <label class="field-label field-name">Conducted by</label>
                <q-input
                  class="field-input"
                  dense
                  disable
                  v-model="siteVisit.conductedByName"
                />
              </div>
              <div class="row">
                <label class="field-label field-name">Visit Notes</label>
                <q-input
                  class="field-input"
                  dense
                  type="textarea"
                  rows="7"
                  v-model="siteVisit.visitNotes"
                  maxlength="2000"
                />
              </div>
              <div class="row">
                <label class="field-label field-name">Quarterly Progress</label>
                <app-select
                  class="field-input"
                  v-model="siteVisit.quarterlyProgress"
                  :options="quarterlyProgresses"
                ></app-select>
              </div>
              <div class="row">
                <label class="field-label field-name field-label-checkbox">
                  Employer Visit
                </label>
                <q-checkbox
                  class="field-input"
                  dense
                  v-model="siteVisit.employerVisit"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions horizontal align="right" class="q-pa-lg">
            <q-btn
              flat
              icon="close"
              label="Reset"
              color="primary"
              class="float-right"
              @click="onReset()"
            />
            <q-btn
              icon="save"
              label="Save"
              color="primary"
              class="float-right"
              @click="onSave()"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import FailureMessage from '../../compoments/messages/FailureMessage.vue'
import SuccessMessage from '../../compoments/messages/SuccessMessage.vue'
import SiteVisitApi from '../../apis/siteVisitApi.js'
import { ErrorMessages } from '../../common/constants.js'
import ContactApi from '../../apis/contactApi.js'
import TrainingProgrammeApi from '../../apis/trainingProgrammeApi.js'
import AppSelect from '../../compoments/select/AppSelect.vue'
import ContactSearchSelect from '../../compoments/select/ContactSearchSelect.vue'
import AppDate from '../../compoments/AppDate.vue'
import {
  todayDateString,
  validDate,
  getDateFromString,
} from '../../common/datetime.js'
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'NewSiteVisit',

  components: {
    FailureMessage,
    SuccessMessage,
    AppSelect,
    ContactSearchSelect,
    AppDate,
  },

  props: {
    contactId: {
      type: String,
      required: false,
    },
    siteVisitsRouteName: {
      type: String,
      required: true,
    },
    accountId: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      siteVisit: {
        trainee: this.contactId ? { value: null } : null,
        traineeName: null,
        trainingProgramme: null,
        macAgreement: null,
        dateOfVisit: todayDateString,
        visitType: { value: 0, label: 'None' },
        employerVisit: false,
        conductedByName: null,
        quarterlyProgress: { value: 0, label: 'None' },
        visitNotes: null,
      },
      trainingProgrammes: [],
      macAgreements: [],
      visitTypes: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Workplace Visit' },
        { value: 2, label: 'Class Visit' },
        { value: 3, label: 'Phone Visit' },
        { value: 4, label: 'Email' },
        { value: 5, label: 'Other' },
      ],
      quarterlyProgresses: [
        { value: 0, label: 'None' },
        { value: 167740000, label: 'Satisfactory' },
        { value: 167740001, label: 'Unsatisfactory' },
        { value: 167740002, label: 'Not known' },
      ],
    }
  },

  validations: {
    siteVisit: {
      trainee: {
        required,
      },
      trainingProgramme: {
        required,
      },
      macAgreement: {
        required,
      },
      dateOfVisit: {
        required,
        validDate,
      },
      visitType: {
        required,
      },
    },
  },

  created() {
    this.originalSiteVisit = { ...this.siteVisit }
    this.fetchTrainingProgrammes = async (contactId) => {
      if (!contactId) return
      const trainingProgrammes = await ContactApi.getTrainingProgrammesByContactId(
        contactId
      )
      this.trainingProgrammes = trainingProgrammes.data.map((x) => ({
        label: x.name,
        value: x.id,
      }))
    }
    this.fetchConductedByInfo = async () => {
      const contactInfo = await ContactApi.getContactByContactId(
        this.crmCurrentUser.contactId
      )
      this.siteVisit.conductedByName = `${contactInfo.data.firstName} ${contactInfo.data.lastName}`
      this.originalSiteVisit.conductedByName = this.siteVisit.conductedByName
    }
    this.fetchTraineeInfo = async () => {
      if (!this.contactId) return
      const contactInfo = await ContactApi.getContactByContactId(this.contactId)
      this.siteVisit.traineeName = `${contactInfo.data.firstName} ${contactInfo.data.lastName}`
      this.originalSiteVisit.traineeName = this.siteVisit.traineeName
    }

    this.routeBackToListPage = () => {
      this.$router.push({
        name: this.siteVisitsRouteName,
        params: {
          id: this.getTraineeId(),
        },
      })
    }

    this.initializePage = () => {
      this.fetchTrainingProgrammes(this.contactId)
      this.fetchConductedByInfo()
      this.fetchTraineeInfo()
    }
    this.initializePage()
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),

    traineeErrors() {
      if (
        !this.contactId &&
        this.$v.siteVisit.trainee.$dirty &&
        !this.$v.siteVisit.trainee.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Trainee Name')
      }
      return ''
    },
    trainingProgrammeErrors() {
      if (
        this.$v.siteVisit.trainingProgramme.$dirty &&
        !this.$v.siteVisit.trainingProgramme.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Training Programme')
      }
      return ''
    },
    macAgreementErrors() {
      if (
        this.$v.siteVisit.macAgreement.$dirty &&
        !this.$v.siteVisit.macAgreement.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Mac Agreement')
      }
      return ''
    },
    dateOfVisitErrors() {
      if (
        this.$v.siteVisit.dateOfVisit.$dirty &&
        !this.$v.siteVisit.dateOfVisit.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Date Of Visit')
      }
      if (!this.$v.siteVisit.dateOfVisit.validDate) {
        return ErrorMessages.INVALID_FORMAT_DATE
      }
      return ''
    },
    visitTypeErrors() {
      if (
        this.$v.siteVisit.visitType.$dirty &&
        !this.$v.siteVisit.visitType.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Visit Type')
      }
      return ''
    },
  },

  methods: {
    getTraineeId() {
      return this.contactId || this.siteVisit.trainee.value
    },

    async traineeChanged(selectedTrainee) {
      this.$v.siteVisit.trainee.$touch()
      this.trainingProgrammes = []
      this.siteVisit.trainingProgramme = null
      this.macAgreements = []
      this.siteVisit.macAgreement = null
      if (selectedTrainee.value) {
        this.fetchTrainingProgrammes(selectedTrainee.value)
      }
    },
    async trainingProgrammeChanged(selectedProgramme) {
      this.$v.siteVisit.trainingProgramme.$touch()
      this.macAgreements = []
      this.siteVisit.macAgreement = null
      if (selectedProgramme.value) {
        const macAgreementData = await TrainingProgrammeApi.getMacAgreementsByTrainingprogrammesId(
          selectedProgramme.value
        )
        this.macAgreements = macAgreementData.data.map((x) => ({
          label: x.name,
          value: x.id,
        }))
      }
    },
    async onSave() {
      this.$refs.failureMessage.onCloseMessage()
      this.$refs.successMessage.onCloseMessage()
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const payload = {
          TraineeId: this.getTraineeId(),
          TrainingProgrammeId: this.siteVisit.trainingProgramme.value,
          MacAgreementId: this.siteVisit.macAgreement.value,
          DateOfVisit: getDateFromString(this.siteVisit.dateOfVisit),
          ConductedById: this.crmCurrentUser.contactId,
          VisitNotes: this.siteVisit.visitNotes,
          VisitType: this.siteVisit.visitType.value,
          QuarterlyProgress:
            (this.siteVisit.quarterlyProgress &&
              this.siteVisit.quarterlyProgress.value) ||
            undefined,
          EmployerVisit: this.siteVisit.employerVisit,
        }
        try {
          await SiteVisitApi.insertSiteVisit(payload)
          this.$refs.successMessage.onOpenMessage()
          this.routeBackToListPage()
        } catch (e) {
          this.$refs.failureMessage.onOpenMessage()
        }
      }
    },

    onReset() {
      this.$v.$reset()
      this.$refs.successMessage.onCloseMessage()
      this.$refs.failureMessage.onCloseMessage()
      this.siteVisit = { ...this.originalSiteVisit }
    },
  },
}
</script>

<style lang="stylus">
.field-label{
  width: 180px
}
</style>
