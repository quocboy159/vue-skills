<template>
  <div class="q-pa-md menu-class">
    <div class="row">
      <q-btn
        no-caps
        flat
        label="My Skills"
        :to="{
          name: HOME,
          params: { label: this.$globalLabel },
        }"
        class="text-white text-decoration-none q-btn-brand"
      ></q-btn>
      <trainee-menu
        :contactId="contactId"
        v-if="currentRole === roles.TRAINEE"
      ></trainee-menu>
      <employer-menu
        :contactId="contactId"
        v-if="currentRole === roles.EMPLOYER"
      ></employer-menu>
      <account-manager-menu
        :contactId="contactId"
        v-if="currentRole === roles.SKILLS_ACCOUNT_MANAGER"
      ></account-manager-menu>
      <m-a-coordinator-menu
        :contactId="contactId"
        v-if="currentRole === roles.MA_COORDINATOR"
      ></m-a-coordinator-menu>
      <fs-candidate-menu
        v-if="currentRole === roles.FS_CANDIDATE"
      ></fs-candidate-menu>
      <financial-service-assessor-menu
        v-if="currentRole === roles.FS_ASSESSOR"
      ></financial-service-assessor-menu>
    </div>
  </div>
</template>

<script>
import FsCandidateMenu from './FsCandidateMenu.vue'
import FinancialServiceAssessorMenu from './FinancialServiceAssessorMenu.vue'
import MACoordinatorMenu from './MACoordinatorMenu.vue'
import AccountManagerMenu from './AccountManagerMenu.vue'
import TraineeMenu from './TraineeMenu.vue'
import EmployerMenu from './EmployerMenu.vue'
import { roles, HOME } from '../../common/constants.js'

export default {
  name: 'Menu',
  components: {
    FsCandidateMenu,
    MACoordinatorMenu,
    AccountManagerMenu,
    TraineeMenu,
    EmployerMenu,
    FinancialServiceAssessorMenu,
  },
  data() {
    return {
      roles,
      HOME,
    }
  },
  props: {
    contactId: {
      type: String,
      required: true,
    },
    currentRole: {
      type: Number,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-class {
  padding-top: 0;
  padding-bottom: 0;
}

a:link,
.text-decoration-none:hover {
  text-decoration: none;
}

.q-btn-brand {
  font-size: 18px !important;
  color: #ecf0f1 !important;
}

.q-btn {
  font-weight: initial;
  color: #ecf0f1 !important;
}
</style>
