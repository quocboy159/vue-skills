<template>
  <div class="row q-pa-lg">
    <div class="row col-md-12 col-xs-12">
      <success-message
        ref="completeApplicationSuccessfulMessage"
        :message="completeApplicationMessage"
      />

      <success-message
        ref="successMessage"
        :message="APPLICATION_SUCCESSFUL_MESSAGE"
      />

      <success-message
        ref="successMessagePayment"
        :message="paymentSuccessMessage"
      />

      <failure-message
        ref="failureMessage"
        :message="APPLICATION_TYPE_CODE_NAME_NOT_EQUALS_PGD_ERROR_MESSAGE"
      />

      <failure-message
        ref="unKnownMessagePayment"
        :message="unknownPaymentMessage"
      />

      <failure-message
        ref="getContactCRMFailMessage"
        :message="SKILLS_GROUP_PORTAL_UNAVAILABLE_MESSAGE"
      />
    </div>

    <div class="row col-md-4 col-xs-12">
      <q-card class="col-md-12 col-xs-12 q-pr-lg">
        <q-card-section>
          <label class="text-h6 label-draft-application">
            Your draft applications
          </label>
        </q-card-section>

        <q-separator />

        <q-card-section class="full-width">
          <div
            v-if="
              this.model.draftApplications &&
              this.model.draftApplications.length
            "
          >
            <div
              v-for="item in this.model.draftApplications"
              :key="item.applicationID"
              class="row col-12 q-pt-sm q-pb-xs"
            >
              <router-link
                class="col-sm-8 col-xs-8 q-pr-lg"
                :to="{
                  name: SkillsGroupPortalRouteNames.RECOGNITION_APPLICATION,
                  params: {
                    id: item.applicationID,
                    label: $route.params.label,
                  },
                }"
              >
                {{ item.productName }}
              </router-link>
              <div class="inprogess-status q-pl-xs col-sm-4 col-xs-4">
                <label class="label-text">{{ item.statusCodeName }}</label>
              </div>
            </div>
          </div>
          <div v-else class="no-data">No draft applications at the moment</div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row col-md-4 col-xs-12">
      <q-card class="col-md-12 col-xs-12 q-pr-lg">
        <q-card-section>
          <label class="text-h6">Your applications in progress</label>
        </q-card-section>

        <q-separator />

        <q-card-section class="full-width">
          <div
            v-if="
              this.model.inProgressApplications &&
              this.model.inProgressApplications.length
            "
          >
            <div
              v-for="item in this.model.inProgressApplications"
              :key="item.applicationID"
              class="row col-12 q-pt-sm q-pb-xs"
            >
              <router-link
                class="col-sm-8 col-xs-8 q-pr-lg"
                :to="{
                  name: SkillsGroupPortalRouteNames.RECOGNITION_APPLICATION,
                  params: {
                    id: item.applicationID,
                    label: $route.params.label,
                  },
                }"
              >
                {{ item.productName }}
              </router-link>
              <div class="inprogess-status q-pl-sm col-sm-4 col-xs-4">
                <label class="label-text">{{ item.statusCodeName }}</label>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            No applications in progress at the moment
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row col-md-4 col-xs-12">
      <contact-us :industryTypes="numberOfIndustryTypes" />
    </div>

    <div class="row col-md-4 col-xs-12">
      <q-card class="col-md-12 col-xs-12 q-pr-lg">
        <q-card-section>
          <label class="text-h6">Your completed applications</label>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div
            v-if="
              model.completedApplications && model.completedApplications.length
            "
          >
            <div
              v-for="item in model.completedApplications"
              :key="item.name"
              class="row col-12 q-pt-sm q-pb-xs"
            >
              <div class="row full-width completed-application-text label-text">
                <div class="col-6">
                  {{ item.productName }}
                </div>
                <div class="col-3">
                  {{ item.outcomeCodeName }}
                </div>
                <div class="col-3">
                  {{ item.dateAssessed | formatDate }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            No completed applications at the moment
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row col-md-4 col-xs-12">
      <q-card class="col-md-12 col-xs-12 q-pr-lg">
        <q-card-section>
          <label class="text-h6">Results</label>
        </q-card-section>

        <q-separator />

        <q-card-section class="full-width">
          <div
            v-for="item in model.results"
            :key="item.id"
            class="row col-12 q-pt-sm q-pb-xs"
          >
            <a class="btn-link-download" @click="onResultFileClick(item)">
              {{ item.name }}
            </a>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row col-md-4 col-xs-12">
      <q-card class="col-md-12 col-xs-12">
        <q-card-section>
          <label class="text-h6">Quick links</label>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div v-if="model.links && model.links.length">
            <div v-if="isOnlyHasOneIndustryType">
              <div
                v-for="item in links"
                :key="item.filename"
                class="q-pt-sm q-pb-xs"
              >
                <a :href="item.href" target="_blank" rel="noopener">
                  {{ item.filename }}
                </a>
              </div>
            </div>
            <div v-else>
              <div
                v-for="link in links"
                :key="link.key"
                class="q-pt-sm q-pb-xs"
              >
                <label class="text-h6">
                  {{ link.text }}
                </label>
                <div v-for="item in link.value" :key="item.href">
                  <a :href="item.href" target="_blank" rel="noopener">
                    {{ item.filename }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-data">No quick links at the moment</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { SkillsGroupPortalRouteNames } from '@/common/constants.js'
import { mapGetters, mapActions } from 'vuex'
import ApplicationApi from '@/apis/skills-group-portal/applicationApi.js'
import {
  PAYMENT_SUCCESSFUL_MESSAGE,
  REAL_ESTATE_PAYMENT_SUCCESSFUL_MESSAGE,
  PAYMENT_UNKNOWN_MESSAGE,
  REAL_ESTATE_PAYMENT_UNKNOWN_MESSAGE,
  APPLICATION_SUCCESSFUL_MESSAGE,
  APPLICATION_TYPE_CODE_NAME_NOT_EQUALS_PGD_ERROR_MESSAGE,
  COMPLETE_APPLICATION_SUCCESSFUL_MESSAGE,
  REAL_ESTATE_COMPLETE_APPLICATION_SUCCESSFUL_MESSAGE,
  SKILLS_GROUP_PORTAL_UNAVAILABLE_MESSAGE,
  CONTACT_DRIVE_NAME,
} from '@/common/constants.js'
import {
  ApplicationStatuses,
  IndustryTypeEnum,
} from '@/common/skills-group-portal/enums.js'
import FileApi from '@/apis/skills-group-portal/fileApi.js'
import FailureMessage from '@/compoments/messages/FailureMessage.vue'
import SuccessMessage from '@/compoments/messages/SuccessMessage.vue'
import ContactUs from '@/containers/skills-group-portal/ContactUs.vue'

export default {
  components: {
    SuccessMessage,
    FailureMessage,
    ContactUs,
  },

  data() {
    return {
      SkillsGroupPortalRouteNames,
      model: {},
      APPLICATION_SUCCESSFUL_MESSAGE,
      APPLICATION_TYPE_CODE_NAME_NOT_EQUALS_PGD_ERROR_MESSAGE,
      PAYMENT_SUCCESSFUL_MESSAGE,
      REAL_ESTATE_PAYMENT_SUCCESSFUL_MESSAGE,
      PAYMENT_UNKNOWN_MESSAGE,
      REAL_ESTATE_PAYMENT_UNKNOWN_MESSAGE,
      COMPLETE_APPLICATION_SUCCESSFUL_MESSAGE,
      REAL_ESTATE_COMPLETE_APPLICATION_SUCCESSFUL_MESSAGE,
      SKILLS_GROUP_PORTAL_UNAVAILABLE_MESSAGE,
    }
  },

  async created() {
    await this.fetchData()
  },

  mounted() {
    this.showCompleteApplicationSuccessfulMessage()
    this.showSaveApplicationSuccessMessage()
    this.showIndustryTypeNameNotEqualsPGDError()
    this.showSavePaymentSuccessMessage()
    this.showSavePaymentUnknownMessage()
    this.showGetContactCRMFailMessage()
  },

  computed: {
    ...mapGetters('skills-group-contact', ['contact', 'isSetContactCRMFail']),
    ...mapGetters('skills-group-application', [
      'isSaveApplicationSuccess',
      'isIndustryTypeCodeNotValidError',
      'approvedPaymentInfo',
      'unknownPaymentInfo',
      'completeApplicationInfo',
    ]),

    numberOfIndustryTypes() {
      const industryTypes = this.getApplicationsGroupByIndustryType().map(
        (x) => x.key
      )
      return industryTypes
    },

    isOnlyHasOneIndustryType() {
      const applicationsGroupByIndustryType = this.getApplicationsGroupByIndustryType()
      return applicationsGroupByIndustryType?.length === 1
    },

    links() {
      const applicationsGroupByIndustryType = this.getApplicationsGroupByIndustryType()
      if (
        !this.model?.links?.length ||
        !applicationsGroupByIndustryType?.length
      ) {
        return []
      }

      // if applications have only an industryType then only show links have that industryType
      if (applicationsGroupByIndustryType?.length === 1) {
        const result = this.model.links.filter(
          (x) => x.industryTypeCode === applicationsGroupByIndustryType[0].key
        )
        return result
      }

      // if applications have more than industryType then show links by industryType
      const result = this.model.links.reduce((accumulator, currentValue) => {
        if (!accumulator.some((x) => x.key === currentValue.industryTypeCode)) {
          const text = applicationsGroupByIndustryType.find(
            (x) => x.key === currentValue.industryTypeCode
          ).value[0].industryTypeCodeName
          accumulator.push({
            key: currentValue.industryTypeCode,
            value: [currentValue],
            text,
          })
        } else {
          const keyIndex = accumulator.findIndex(
            (x) => x.key === currentValue.industryTypeCode
          )
          accumulator[keyIndex].value.push(currentValue)
        }

        return accumulator
      }, [])

      return result
    },
    paymentSuccessMessage() {
      return this.approvedPaymentInfo.industryTypeCode ===
        IndustryTypeEnum.RealEstate
        ? this.REAL_ESTATE_PAYMENT_SUCCESSFUL_MESSAGE
        : this.PAYMENT_SUCCESSFUL_MESSAGE
    },
    unknownPaymentMessage() {
      return this.unknownPaymentInfo.industryTypeCode ===
        IndustryTypeEnum.RealEstate
        ? this.REAL_ESTATE_PAYMENT_UNKNOWN_MESSAGE
        : this.PAYMENT_UNKNOWN_MESSAGE
    },
    completeApplicationMessage() {
      return this.completeApplicationInfo.industryTypeCode ===
        IndustryTypeEnum.RealEstate
        ? this.REAL_ESTATE_COMPLETE_APPLICATION_SUCCESSFUL_MESSAGE
        : this.COMPLETE_APPLICATION_SUCCESSFUL_MESSAGE
    },
  },

  methods: {
    ...mapActions('skills-group-application', [
      'setEventSaveApplicationSuccess',
      'setIndustryTypeCodeNotValidError',
      'commitApprovedPaymentInfo',
      'commitUnknownPaymentInfo',
      'commitCompleteApplicationInfo',
    ]),
    ...mapActions('skills-group-contact', ['setIsSetContactCRMFail']),

    getApplicationsGroupByIndustryType() {
      if (!this.model?.applications?.length) {
        return []
      }

      const applicationsGroupByIndustryTypeCode = this.model.applications.reduce(
        (accumulator, currentValue) => {
          if (
            !accumulator.some((x) => x.key === currentValue.industryTypeCode)
          ) {
            accumulator.push({
              key: currentValue.industryTypeCode,
              value: [currentValue],
            })
          } else {
            const keyIndex = accumulator.findIndex(
              (x) => x.key === currentValue.industryTypeCode
            )
            accumulator[keyIndex].value.push(currentValue)
          }

          return accumulator
        },
        []
      )
      return applicationsGroupByIndustryTypeCode
    },

    showGetContactCRMFailMessage() {
      if (this.isSetContactCRMFail) {
        this.$refs.getContactCRMFailMessage?.onOpenMessage()
      } else {
        this.$refs.getContactCRMFailMessage?.onCloseMessage()
      }
    },

    showCompleteApplicationSuccessfulMessage() {
      if (
        this.completeApplicationInfo &&
        this.completeApplicationInfo.applicationId
      ) {
        this.$refs.completeApplicationSuccessfulMessage?.onOpenMessage()
      } else {
        this.$refs.completeApplicationSuccessfulMessage?.onCloseMessage()
      }
    },

    showSavePaymentSuccessMessage() {
      if (this.approvedPaymentInfo && this.approvedPaymentInfo.applicationId) {
        this.$refs.successMessagePayment?.onOpenMessage()
      } else {
        this.$refs.successMessagePayment?.onCloseMessage()
      }
    },

    showSaveApplicationSuccessMessage() {
      if (this.isSaveApplicationSuccess) {
        this.$refs.successMessage?.onOpenMessage()
      } else {
        this.$refs.successMessage?.onCloseMessage()
      }
    },

    showIndustryTypeNameNotEqualsPGDError() {
      if (this.isIndustryTypeCodeNotValidError) {
        this.$refs.failureMessage?.onOpenMessage()
      } else {
        this.$refs.failureMessage?.onCloseMessage()
      }
    },

    showSavePaymentUnknownMessage() {
      if (this.unknownPaymentInfo && this.unknownPaymentInfo.applicationId) {
        this.$refs.unKnownMessagePayment?.onOpenMessage()
      } else {
        this.$refs.unKnownMessagePayment?.onCloseMessage()
      }
    },

    async fetchData() {
      if (this.contact.targetCRMContactID) {
        const contactName = `${this.contact.firstName} ${this.contact.lastName}`
        const result = await ApplicationApi.getApplicationsByTargetCRMContactId(
          this.contact.targetCRMContactID,
          contactName
        )

        this.model = { ...result.data }
        const draftStatues = [
          ApplicationStatuses.WaitingForPayment,
          ApplicationStatuses.WaitingForDocuments,
        ]
        this.model.draftApplications = result.data.applications.filter((x) =>
          draftStatues.includes(x.statusCode)
        )
        const inProgressStatuses = [
          ApplicationStatuses.WaitingForAllocation,
          ApplicationStatuses.AssessmentInProgress,
          ApplicationStatuses.AwaitingSettlement,
          ApplicationStatuses.Active,
        ]
        this.model.inProgressApplications = result.data.applications.filter(
          (x) => inProgressStatuses.includes(x.statusCode)
        )

        let completedStatuses = [
          ApplicationStatuses.AssessmentComplete,
          ApplicationStatuses.Unmet,
          ApplicationStatuses.Complete,
        ]
        this.model.completedApplications = result.data.applications.filter(
          (x) => completedStatuses.includes(x.statusCode)
        )
        this.model.links = result.data.links
        this.model.results = result.data.results
      } else {
        this.model.draftApplications = []
        this.model.inProgressApplications = []
        this.model.completedApplications = []
        this.model.links = []
        this.model.results = []
      }
    },
    async onResultFileClick(resultItem) {
      await FileApi.downloadFile(resultItem.id, CONTACT_DRIVE_NAME)
    },
  },

  beforeRouteLeave(to, from, next) {
    this.setEventSaveApplicationSuccess(false)
    this.setIndustryTypeCodeNotValidError(false)
    this.setIsSetContactCRMFail(false)
    this.commitApprovedPaymentInfo({
      applicationId: null,
      industryTypeCode: null,
    })
    this.commitUnknownPaymentInfo({
      applicationId: null,
      industryTypeCode: null,
    })
    this.commitCompleteApplicationInfo({
      applicationId: null,
      industryTypeCode: null,
    })
    next()
  },
}
</script>

<style lang="stylus" scoped>
@import ('../../styles/quasar.variables.styl');

$blue-color ?= #337ab7

.no-data{
  font-style : italic
}

.inprogess-status
{
  color : $blue-color ;
  text-align : left ;
}
.q-card
{
  border : 0;
  border-radius : 0;
  box-shadow : none;
  margin-bottom: 20px;
}

.completed-application-text {
  color: $blue-color;
}

.label-draft-application {
  padding-right : 59px;
}

.btn-link-download {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
@media only screen and (max-width: $breakpoint-xs-max) {
  .q-card__section--vert {
    padding-left : 0;
    padding-right : 0;
  }
}
</style>
