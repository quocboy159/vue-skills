<template>
  <q-page padding>
    <q-btn flat color="primary" size="lg" :loading="true" style="width: 100%">
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Please wait ...
      </template>
    </q-btn>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import RecognitionApi from '@/apis/skills-group-portal/recognitionApi.js'
import {
  SkillsGroupPortalRouteNames,
  PAYMENT_APPROVED_STATUS,
  PAYMENT_DECLINED_STATUS,
  PAYMENT_UNKNOWN_STATUS,
} from '@/common/constants.js'
export default {
  name: 'PaymentResponse',

  async created() {
    let result
    try {
      result = await RecognitionApi.getPaymentComplete(
        this.$route.query.sessionId,
        this.$route.params.applicationId,
        this.contact.primaryEmail
      )
    } catch {
      this.commitUnknownPaymentInfo({
        applicationId: result.data.applicationId,
        industryTypeCode: result.data.industryTypeCode,
      })
      this.$router.push({
        name: SkillsGroupPortalRouteNames.HOME,
        params: { label: this.$route.params.label },
      })
    }

    switch (result.data.response) {
      case PAYMENT_APPROVED_STATUS:
        {
          this.commitApprovedPaymentInfo({
            applicationId: result.data.applicationId,
            industryTypeCode: result.data.industryTypeCode,
          })
          this.$router.push({
            name: SkillsGroupPortalRouteNames.HOME,
            params: { label: this.$route.params.label },
          })
        }
        break

      case PAYMENT_DECLINED_STATUS:
        {
          this.setEventSavePaymentUnsuccess(true)
          this.$router.push({
            name: SkillsGroupPortalRouteNames.RECOGNITION_APPLICATION,
            params: {
              id: result.data.applicationId,
              label: this.$route.params.label,
            },
          })
        }
        break

      case PAYMENT_UNKNOWN_STATUS:
        {
          this.commitUnknownPaymentInfo({
            applicationId: result.data.applicationId,
            industryTypeCode: result.data.industryTypeCode,
          })
          this.$router.push({
            name: SkillsGroupPortalRouteNames.HOME,
            params: { label: this.$route.params.label },
          })
        }
        break
    }
  },

  methods: {
    ...mapActions('skills-group-application', [
      'setEventSavePaymentUnsuccess',
      'commitApprovedPaymentInfo',
      'commitUnknownPaymentInfo',
    ]),
  },

  computed: {
    ...mapGetters('skills-group-contact', ['contact']),
  },
}
</script>
