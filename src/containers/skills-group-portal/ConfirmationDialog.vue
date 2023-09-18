<template>
  <base-dialog :isOpen="isOpen">
    <div slot="header" class="text-h6 text-weight-bold text-blue-9">
      Declaration
    </div>

    <div slot="body">
      <div class="q-ml-sm full-width">
        By submitting this form, I confirm that:
      </div>
      <ul v-if="isFS && isComplete">
        <li>
          I have understood the eligibility criteria and evidence requirements,
          and I am able to supply all the required information.
        </li>
        <li>
          The information contained in my application is true and correct and
          all evidence is my own.
        </li>
        <li>
          I am aware that if it is found that the evidence in my portfolio of
          evidence is not my own work, further action may be taken which may
          include but is not limited to termination of my assessment agreement
          with The Skills Organisation, and / or notification to the Financial
          Markets Authority.
        </li>
        <li>
          I am aware that I am required to ‘blackout’ identifiable client
          information such as name, contact details and actual date of birth in
          order to protect client confidentiality and privacy, unless the client
          has provided such details as part of a client reference, or has agreed
          to its use for this purpose as outlined in Standard 5 of the Code of
          Professional Conduct for Financial Services.
        </li>
        <li>
          All my work complies with the policies, procedures, and requirements
          of any organisations or professional bodies I belong to, the standards
          of relevant professional bodies including codes of ethics, and any
          relevant legislative and / or regulatory requirements.
        </li>
        <li>
          I am aware that the evidence in my portfolio of evidence and a record
          of the competency discussion will be subject to quality assurance
          processes by The Skills Organisation (e.g. moderation, verification,
          validation).
        </li>
      </ul>
      <ul v-else-if="isFS">
        <li>I understand that payment is non-refundable.</li>
        <li>
          I have understood the eligibility criteria and evidence requirements,
          and I am able to supply all the required information.
        </li>
        <li>
          The information contained in my application is true and correct and
          all evidence is my own.
        </li>
        <li>
          I am aware that if it is found that the evidence in my portfolio of
          evidence is not my own work, further action may be taken which may
          include but is not limited to termination of my assessment agreement
          with The Skills Organisation, and / or notification to the Financial
          Markets Authority.
        </li>
        <li>
          I am aware that I am required to ‘blackout’ identifiable client
          information such as name, contact details and actual date of birth in
          order to protect client confidentiality and privacy, unless the client
          has provided such details as part of a client reference, or has agreed
          to its use for this purpose as outlined in Standard 5 of the Code of
          Professional Conduct for Financial Services.
        </li>
        <li>
          All my work complies with the policies, procedures, and requirements
          of any organisations or professional bodies I belong to, the standards
          of relevant professional bodies including codes of ethics, and any
          relevant legislative and / or regulatory requirements.
        </li>
        <li>
          I am aware that the evidence in my portfolio of evidence and a record
          of the competency discussion will be subject to quality assurance
          processes by The Skills Organisation (e.g. moderation, verification,
          validation).
        </li>
      </ul>
      <ul v-else-if="isRealEstate || isRigging">
        <li>
          I have read, understood and agree to the terms and conditions of the
          Training Agreement.
        </li>
        <li>
          I have read, understood and agree to the withdrawal and refund
          conditions
        </li>
        <li>
          I understand the eligibility criteria and evidence requirements, and I
          am able to supply all the required information
        </li>
        <li>
          All information provided in this application is true and correct and
          all evidence is my own
        </li>
        <li>
          I understand that should my application not be sufficient, a Skills
          representative will be in contact to request further information
        </li>
      </ul>
      <ul v-else>
        <li>I understand that payment is non-refundable.</li>
        <li>
          I have understood the eligibility criteria and evidence requirements,
          and I am able to supply all the required information.
        </li>
        <li>
          The information contained in this application is true and correct and
          all evidence is my own.
        </li>
        <li>
          I am aware that the evidence in my portfolio of evidence and a record
          of the competency discussion will be subject to quality assurance
          processes by The Skills Organisation (e.g. moderation, verification,
          validation).
        </li>
      </ul>
      <div class="q-ml-sm full-width">
        See our Privacy Statement on our website at
        <a href="https://skills.org.nz/privacy-statement/" target="_blank">
          https://skills.org.nz/privacy-statement/
        </a>
        for information about what personal information we collect, why we
        collect it, the ways we share your information, and how you can access
        and correct your personal information.
      </div>
    </div>

    <div slot="footer">
      <q-btn
        flat
        label="Submit"
        color="primary"
        class="float-right q-button-text"
        @click="onSubmit()"
        v-close-popup
      />
      <q-btn
        flat
        label="Cancel"
        color="primary"
        class="float-right q-button-text"
        v-close-popup
        @click="onCancel"
      />
    </div>
  </base-dialog>
</template>
<script>
import { IndustryTypeEnum } from '@/common/skills-group-portal/enums.js'

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
    industryTypeCode: {
      type: Number,
      required: true,
      default: IndustryTypeEnum.PGD,
    },
  },
  components: {
    BaseDialog: () => import('@/compoments/popups/BaseDialog.vue'),
  },
  computed: {
    isFS() {
      return this.industryTypeCode === IndustryTypeEnum.FS
    },
    isRealEstate() {
      return this.industryTypeCode === IndustryTypeEnum.RealEstate
    },
    isRigging() {
      return this.industryTypeCode === IndustryTypeEnum.Rigging
    },
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit')
    },
    onCancel() {
      this.$emit('onCancel')
    },
  },
}
</script>
