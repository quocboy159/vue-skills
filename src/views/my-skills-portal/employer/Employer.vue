<template>
  <div>
    <div class="row">
      <label class="text-h4">Employer</label>
    </div>
    <div class="q-pl-lg">
      <SkillsTable
        :columns="employeesColumns"
        :data="employees"
        :routerName="employerRouteNames.TRAINEE_DETAILS"
        identityViewDetailField="id"
        title="Employees In Training"
        noDataLabel="No employees were found"
      />
    </div>
  </div>
</template>

<script>
import SkillsTable from '../../../compoments/tables/SkillsTable.vue'
import EmployerApi from '../../../apis/employerApi.js'
import { employerRouteNames } from '../../../common/constants.js'
import { mapGetters } from 'vuex'

export default {
  name: 'Trainee',

  components: {
    SkillsTable,
  },

  data() {
    return {
      employerRouteNames,
      employeesColumns: [
        {
          name: 'firstName',
          label: 'First Name',
          align: 'left',
          field: 'firstName',
          sortable: true,
          headerStyle: 'width: 25%',
        },
        {
          name: 'lastName',
          align: 'left',
          label: 'Last Name',
          field: 'lastName',
          sortable: true,
          headerStyle: 'width: 25%',
        },
        {
          name: 'nsn',
          label: 'NSN',
          field: 'nsn',
          align: 'left',
          sortable: true,
        },
      ],
      employees: [],
    }
  },

  async created() {
    await this.fetchData()
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },

  methods: {
    async fetchData() {
      const result = await EmployerApi.getEmployeesInTraining(
        this.crmCurrentUser.accountId
      )
      this.employees = [...result.data]
    },
  },
}
</script>
