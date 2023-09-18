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
import { macRouteNames } from '../../../common/constants.js'

export default {
  name: 'MACEmployeeDetails',
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
          routeTo: macRouteNames.TRAINEE_DETAILS,
        },
        {
          name: 'training',
          title: 'Training',
          routeTo: macRouteNames.TRAINEE_DETAILS_TRAINING,
        },
        {
          name: 'roa',
          title: 'Record of Achievement',
          routeTo: macRouteNames.TRAINEE_DETAILS_ROA,
        },
        {
          name: 'reports',
          title: 'Reports',
          routeTo: macRouteNames.TRAINEE_DETAILS_REPORTS,
        },
        {
          name: 'aprenticeVisit',
          title: 'Apprentice Visit',
          routeTo: macRouteNames.TRAINEE_DETAILS_APPRENTICE_VISIT,
        },
      ],
    }
  },
}
</script>
