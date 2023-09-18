<template>
  <div>
    <q-btn
      no-caps
      flat
      label="Reports"
      :to="{
        name: macRouteNames.REPORTS,
        params: { label: this.$globalLabel },
      }"
      class="text-white text-decoration-none"
    ></q-btn>
    <q-btn-dropdown no-caps flat label="MA Coordinator">
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>
            <router-link
              class="submenu"
              :to="{
                name: macRouteNames.TRAINEES,
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
                name: macRouteNames.TRAINEES_SEARCH,
                params: { label: this.$globalLabel },
              }"
            >
              Apprentice Search
            </router-link>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <router-link
              class="submenu"
              :to="{
                name: macRouteNames.TRAINEE_APPRENTICE_VISIT_NEW_SELECT_TRAINEE,
                params: { label: this.$globalLabel },
              }"
            >
              Create Apprentice Visit
            </router-link>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn-dropdown no-caps flat label="Profile">
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>
            <router-link
              class="submenu"
              :to="{
                name: macRouteNames.COMPANY_DETAILS,
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
                name: macRouteNames.MY_DETAILS,
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
import { macRouteNames } from '../../common/constants.js'
export default {
  name: 'MACoordinatorMenu',
  data() {
    return {
      macRouteNames,
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
