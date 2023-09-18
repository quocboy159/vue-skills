<template>
  <div>
    <q-btn
      no-caps
      flat
      label="Reports"
      :to="{
        name: employerRouteNames.REPORTS,
        params: { label: this.$globalLabel },
      }"
      class="text-white text-decoration-none"
    ></q-btn>
    <q-btn-dropdown no-caps flat label="Employer">
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>
            <router-link
              class="submenu"
              :to="{
                name: employerRouteNames.TRAINEES,
                params: { label: this.$globalLabel },
              }"
            >
              Home
            </router-link>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <router-link
              class="submenu"
              :to="{
                name: employerRouteNames.TRAINEES_SEARCH,
                params: { label: this.$globalLabel },
              }"
            >
              Trainee Search
            </router-link>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn
      no-caps
      flat
      label="Resources"
      :to="{
        name: employerRouteNames.RESOURCES,
        params: { label: this.$globalLabel },
      }"
      class="text-white text-decoration-none"
    ></q-btn>

    <q-btn-dropdown no-caps flat label="Profile">
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>
            <router-link
              class="submenu"
              :to="{
                name: employerRouteNames.COMPANY_DETAILS,
                params: { label: this.$globalLabel },
              }"
            >
              My Company
            </router-link>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>
            <router-link
              class="submenu"
              :to="{
                name: employerRouteNames.MY_DETAILS,
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
import { employerRouteNames } from '../../common/constants.js'
export default {
  name: 'EmployerMenu',
  data() {
    return {
      employerRouteNames,
    }
  },
  props: {
    contactId: {
      type: String,
      required: true,
    },
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
