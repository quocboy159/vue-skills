<template>
  <div>
    <div class="row">
      <label class="text-h4">Trainee Search</label>
    </div>

    <div class="row col-12 p-t-10">
      <div class="offset-1 col-9">
        <q-input
          v-model.trim="search"
          outlined
          placeholder="Search for..."
          @keyup.enter="onSearch()"
        >
          <template v-slot:before>
            <label class="search-label">Trainee Name</label>
          </template>
          <template v-slot:append>
            <q-btn
              icon="search"
              label="Search"
              color="primary"
              @click="onSearch()"
            ></q-btn>
          </template>
        </q-input>
      </div>
    </div>

    <div class="row col-12" v-if="!isHideWarning">
      <div class="offset-4 col-3 flex-center warning-container">
        Please enter a name to search for
      </div>
    </div>

    <div class="q-pl-lg" v-if="hasCalledAPI">
      <SkillsTable
        :columns="employeesColumns"
        :data="employees"
        :routerName="employeeDetailsRouteName"
        identityViewDetailField="id"
        title="Trainees Found"
        noDataLabel="No trainees were found"
        :isPaging="false"
      />
    </div>
  </div>
</template>
<script>
import SkillsTable from '../compoments/tables/SkillsTable.vue'
import EmployerApi from '../apis/employerApi.js'
import MACApi from '../apis/macoordinatorApi.js'
import AccountManagerApi from '../apis/accountManagerApi.js'
export default {
  name: 'TraineeSearch',

  components: {
    SkillsTable,
  },

  data() {
    return {
      hasCalledAPI: false,
      isHideWarning: true,
      search: null,
      employeesColumns: [
        {
          name: 'firstName',
          label: 'First Name',
          align: 'left',
          field: 'firstName',
          sortable: true,
        },
        {
          name: 'lastName',
          align: 'left',
          label: 'Last Name',
          field: 'lastName',
          sortable: true,
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
  props: {
    id: {
      type: String,
      required: true,
    },
    employeeDetailsRouteName: {
      type: String,
      required: true,
    },
    searchPage: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onSearch() {
      // if search has no data then show warning
      this.isHideWarning = !!this.search

      // if search has data then allow call API
      if (this.search) {
        const result = await this.doSearch()
        this.employees = [...result.data]

        // check if call API then show table for the fist time click search
        if (!this.hasCalledAPI) {
          this.hasCalledAPI = true
        }
      }
    },
    async doSearch() {
      let result = null
      if (this.searchPage == 'macSearch') {
        result = await MACApi.getMACEmployeesInTraining(this.id, this.search)
      } else if (this.searchPage == 'amSearch') {
        result = await AccountManagerApi.getEmployeesInTraining(this.search)
      } else if (this.searchPage == 'employerSearch') {
        result = await EmployerApi.getEmployeesInTraining(this.id, this.search)
      }
      return result
    },
  },
}
</script>
<style lang="scss">
.search-label {
  font-size: 14px !important;
  font-weight: bold !important;
  color: initial;
}

.p-t-10 {
  padding-top: 10px;
}

.warning-container {
  z-index: 1060;
  margin-top: 16px;
  padding: 9px 14px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  line-break: auto;
  text-align: center;
}
</style>
