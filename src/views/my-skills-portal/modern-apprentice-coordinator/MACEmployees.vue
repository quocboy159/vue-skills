<template>
  <div>
    <div class="row">
      <label class="text-h4">Modern Apprentice Coordinator</label>
    </div>
    <div class="q-pl-lg">
      <SkillsTable
        :columns="employeesColumns"
        :data="employees"
        :routerName="macRouteNames.TRAINEE_DETAILS"
        identityViewDetailField="id"
        title="MAs In Training"
        noDataLabel="No employees were found"
      />
    </div>
  </div>
</template>

<script>
import SkillsTable from '../../../compoments/tables/SkillsTable.vue'
import MacoordinatorApi from '../../../apis/macoordinatorApi.js'
import { macRouteNames } from '../../../common/constants.js'
import { mapGetters } from 'vuex'

export default {
  name: 'Trainee',

  components: {
    SkillsTable,
  },

  data() {
    return {
      macRouteNames,
      accountId: null,

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
    this.accountId = this.crmCurrentUser.accountId
    await this.fetchData()
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },

  methods: {
    async fetchData() {
      const result = await MacoordinatorApi.getMACEmployeesInTraining(
        this.accountId
      )
      this.employees = [...result.data]
    },
  },
}
</script>
