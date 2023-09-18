<template>
  <div>
    <div class="row">
      <label class="text-h4">Please select a Role</label>
    </div>
    <div class="q-pl-lg q-pt-lg row">
      <div class="col-md-4 col-xs-12">
        <label class="field-label field-name">
          You have {{ userRoles.length }} roles, please select one
        </label>
        <app-select
          class="field-input"
          label="Select a role..."
          :options="userRoles"
          @input="roleChanged"
        ></app-select>
      </div>
    </div>
  </div>
</template>
<script>
import AppSelect from '../compoments/select/AppSelect.vue'
import { mapGetters, mapActions } from 'vuex'
import { Roles } from '../common/enums.js'

export default {
  name: 'Home',

  components: {
    AppSelect,
  },

  data() {
    return {
      userRoles: [],
    }
  },

  created() {
    this.userRoles = Object.entries(Roles)
      .filter((x) => {
        return this.crmCurrentUser.roles.includes(x[1].value) && x[1].routerName
      })
      .map((x) => {
        return {
          value: x[1].value,
          label: x[1].description,
          routerName: x[1].routerName,
        }
      })

    if (this.userRoles.length === 1) {
      this.roleChanged(this.userRoles[0])
    }
  },

  computed: {
    ...mapGetters(['crmCurrentUser']),
  },

  methods: {
    ...mapActions(['setCurrentRole']),

    roleChanged(selectedRole) {
      this.setCurrentRole(selectedRole.value)

      selectedRole.routerName &&
        this.$router.push({
          name: selectedRole.routerName,
          params: { label: this.$globalLabel },
        })
    },
  },
}
</script>
