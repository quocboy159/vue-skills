<template>
  <q-page padding>
    <div class="row">
      <label class="text-h4">
        Wellbeing Provider Onboarding
        <q-chip dense :color="getColorStatus" :icon="getIconStatus">
          {{ getStatusName }}
        </q-chip>
      </label>
    </div>

    <div class="row q-pt-lg">
      <div class="col-12">
        <q-card>
          <base-tab-forms
            v-model="tabModel"
            :tabs="tabs"
            :data="model"
            v-on:update="onUpdateModel"
          ></base-tab-forms>

          <q-card-actions horizontal align="right" class="q-pa-lg">
            <q-btn
              flat
              icon="close"
              label="Reset"
              color="primary"
              :class="buttonClass()"
              @click="onReset()"
            />
            <q-btn
              icon="save"
              label="Save"
              color="primary"
              :class="buttonClass()"
              @click="onSave()"
            />
            <q-btn
              v-if="displayNextButton"
              icon="skip_next"
              label="Next"
              color="primary"
              :class="buttonClass()"
              @click="onNext()"
            />
            <q-btn
              v-else
              icon="check"
              label="Complete"
              color="primary"
              :class="buttonClass()"
              @click="onComplete()"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { WellbeingProviderOnboardingStatuses } from '../../common/skills-group-portal/enums'
import Utilities from '../../common/utilities.js'
import { WELLBEING_PROVIDER_ONBOARDING_VALIDATE_EVENT } from '../../common/constants'
import { EventBus } from '../../common/eventBus.js'
import WellbeingProviderOnboardingPersonalDetails from '@/containers/skills-group-portal/wellbeing-provider-onboarding/WellbeingProviderOnboardingPersonalDetails'
import WellbeingProviderOnboardingBusinessDetails from '@/containers/skills-group-portal/wellbeing-provider-onboarding/WellbeingProviderOnboardingBusinessDetails'
import { cloneDeep } from 'lodash'

export default {
  name: 'WellbeingProviderOnboardingV2',

  components: {
    BaseTabForms: () => import('@/compoments/tabs/BaseTabForms'),
  },

  data() {
    return {
      model: {
        status: WellbeingProviderOnboardingStatuses.Draft,
        personalDetails: {
          firstName: null,
          middleName: null,
          lastName: null,
          address: {
            country: null,
            street: null,
            suburb: null,
            city: null,
            postCode: null,
          },
          mobileNumber: null,
          homeNumber: null,
          email: null,
          website: null,
          note: null,
        },
        businessDetails: {
          arrangement: null,
          name: null,
          address: {
            country: null,
            street: null,
            suburb: null,
            city: null,
            postCode: null,
          },
          mobile: null,
          phone: null,
          emailAddress: null,
          website: null,
        },
      },
      originModel: null,
      tabs: [
        {
          name: 'personalDetails',
          label: 'Personal Details',
          isShowError: false,
          template: WellbeingProviderOnboardingPersonalDetails,
        },
        {
          name: 'businessDetails',
          label: 'Business Details',
          isShowError: false,
          template: WellbeingProviderOnboardingBusinessDetails,
        },
      ],
      tabModel: null,
    }
  },

  created() {
    this.tabModel = this.tabs[0].name
    this.originModel = cloneDeep(this.model)
  },

  computed: {
    getColorStatus() {
      return this.model.status === WellbeingProviderOnboardingStatuses.Draft
        ? null
        : 'positive'
    },

    getIconStatus() {
      return this.model.status === WellbeingProviderOnboardingStatuses.Draft
        ? 'drafts'
        : 'check_circle'
    },

    displayNextButton() {
      const currentTabIndex = this.tabs.findIndex(
        (x) => x.name === this.tabModel
      )

      return [0, 1].includes(currentTabIndex)
    },

    getStatusName() {
      return Utilities.getKeyNameByValue(
        WellbeingProviderOnboardingStatuses,
        this.model.status
      )
    },
  },

  methods: {
    buttonClass() {
      if (this.$q.platform.is.mobile) {
        return 'col-xs-12 q-mt-xs'
      }
      return 'float-right'
    },

    updateErrorTabs() {},

    onClearErrorTabs() {
      this.tabs = this.tabs.map((x) => {
        x.isShowError = false
        return x
      })
    },

    onNext() {
      const currentTabIndex = this.tabs.findIndex(
        (x) => x.name == this.tabModel
      )
      this.tabModel = this.tabs[currentTabIndex + 1].name
    },

    onReset() {
      this.tabModel = this.tabs[0].name
      this.model = {
        ...this.originModel,
      }

      this.onClearErrorTabs()
    },

    onUpdateModel(data) {
      this.model = cloneDeep(data)
    },

    onSave() {
      EventBus.$emit(WELLBEING_PROVIDER_ONBOARDING_VALIDATE_EVENT)
      this.updateErrorTabs()
      // if (!this.$v.$invalid) {
      //   this.$q.notify({
      //     type: 'positive',
      //     message: 'Wellbeing Provider Onboarding saved Successfully!',
      //   })
      // }
    },

    onComplete() {
      EventBus.$emit(WELLBEING_PROVIDER_ONBOARDING_VALIDATE_EVENT)
      this.updateErrorTabs()

      if (!this.$v.$invalid) {
        this.model.status =
          this.model.status === WellbeingProviderOnboardingStatuses.Active
            ? WellbeingProviderOnboardingStatuses.Draft
            : WellbeingProviderOnboardingStatuses.Active
        const statusName = Utilities.getKeyNameByValue(
          WellbeingProviderOnboardingStatuses,
          this.model.status
        )
        this.$q.notify({
          type: 'positive',
          message: `Wellbeing Provider Onboarding has been changed to ${statusName}!`,
        })
      }
    },
  },

  beforeDestroy() {
    EventBus.$off(WELLBEING_PROVIDER_ONBOARDING_VALIDATE_EVENT)
  },
}
</script>

<style lang="scss" scoped>
.q-tab__alert {
  right: -12px;
  border-radius: 50%;
  background: currentColor;
  top: 7px;
  height: 10px;
  width: 10px;
}
</style>
