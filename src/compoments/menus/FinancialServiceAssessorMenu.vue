<template>
  <div>
    <q-btn
      no-caps
      flat
      label="Financial Service Assessor"
      :to="{
        name: financialServiceAssessorRouteNames.INDEX,
        params: { label: this.$globalLabel },
      }"
      class="text-white text-decoration-none"
    ></q-btn>

    <q-btn
      type="a"
      target="_blank"
      :href="handbookLink"
      no-caps
      flat
      label="Candidate Handbook"
      class="text-white text-decoration-none"
    ></q-btn>

    <q-btn-dropdown no-caps flat label="Profile">
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>
            <router-link
              class="submenu"
              :to="{
                name: financialServiceAssessorRouteNames.MY_DETAILS,
                params: { label: this.$globalLabel },
              }"
            >
              My Details
            </router-link>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import {
  FinancialServiceAssessorRouteNames,
  CANDIDATE_HANDBOOK,
} from '../../common/constants.js'
import DocumentApi from '../../apis/documentApi.js'

export default {
  name: 'FinancialServiceAssessorMenu',

  data() {
    return {
      financialServiceAssessorRouteNames: FinancialServiceAssessorRouteNames,
      handbookLink: null,
    }
  },

  async created() {
    const handbookDocument = await DocumentApi.getDocumentByName(
      CANDIDATE_HANDBOOK
    )
    this.handbookLink = handbookDocument?.data?.url
  },
}
</script>

<style lang="scss" scoped>
.q-item {
  padding: 0;
}

.submenu {
  padding: 13px 16px 8px 16px;
  height: 48px;
  width: 100%;
}

a,
a:visited {
  color: black;
}

a:link,
.text-decoration-none:hover {
  text-decoration: none;
}

.q-btn {
  font-weight: initial;
  color: #ecf0f1 !important;
  height: 100%;
}
</style>
