<template>
  <div>
    <div class="row">
      <label class="text-h4">Trainee</label>
    </div>
    <div>
      <SkillsTabs :defaultTab="tab" :tabs="tabs"></SkillsTabs>
    </div>
  </div>
</template>

<script>
import SkillsTabs from '../../../compoments/SkillsTabs'
import { employerRouteNames } from '../../../common/constants.js'

export default {
  name: 'EmployeeDetails',
  components: {
    SkillsTabs,
  },
  data() {
    return {
      tab: 'Details',
      tabs: [
        {
          name: 'details',
          title: 'Details',
          routeTo: employerRouteNames.TRAINEE_DETAILS,
        },
        {
          name: 'training',
          title: 'Training',
          routeTo: employerRouteNames.TRAINEE_DETAILS_TRAINING,
        },
        {
          name: 'roa',
          title: 'Record of Achievement',
          routeTo: employerRouteNames.TRAINEE_DETAILS_ROA,
        },
        {
          name: 'reports',
          title: 'Reports',
          routeTo: employerRouteNames.TRAINEE_DETAILS_REPORTS,
        },
      ],
    }
  },
}
</script>
