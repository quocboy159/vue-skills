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
import { amRouteNames } from '../../../common/constants.js'

export default {
  name: 'ACEmployeeDetails',
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
          routeTo: amRouteNames.TRAINEE_DETAILS,
        },
        {
          name: 'training',
          title: 'Training',
          routeTo: amRouteNames.TRAINEE_DETAILS_TRAINING,
        },
        {
          name: 'roa',
          title: 'Record of Achievement',
          routeTo: amRouteNames.TRAINEE_DETAILS_ROA,
        },
        {
          name: 'reports',
          title: 'Reports',
          routeTo: amRouteNames.TRAINEE_DETAILS_REPORTS,
        },
        {
          name: 'aprenticeVisit',
          title: 'Apprentice Visit',
          routeTo: amRouteNames.TRAINEE_DETAILS_APPRENTICE_VISIT,
        },
      ],
    }
  },
}
</script>
