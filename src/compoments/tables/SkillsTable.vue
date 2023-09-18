<template>
  <div>
    <div class="row" v-bind:class="{ hidden: !isTitle }">
      <h1 class="text-h5">{{ title }}</h1>
    </div>

    <div class="row">
      <q-table
        class="col-12"
        :data="data"
        :columns="columns"
        row-key="id"
        :hide-pagination="!isPaging"
        :pagination="initialPagination"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th auto-width v-if="isViewDetail">Details</q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td auto-width v-if="isViewDetail">
              <q-btn
                label="Details"
                no-caps
                @click="onViewDetails(props.row[identityViewDetailField])"
              />
            </q-td>
          </q-tr>
        </template>

        <template v-slot:no-data>
          <div class="full-width row flex-center">
            <span>{{ noDataLabel }}</span>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillsTable',

  data() {
    return {
      isTitle: false,
      initialPagination: {
        page: 1,
        rowsPerPage: this.isPaging ? 5 : this.data.length,
      },
    }
  },

  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    routerName: {
      type: String,
      required: false,
    },
    identityViewDetailField: {
      type: String,
      required: false,
      default: 'id',
    },
    title: {
      type: String,
      required: false,
    },
    noDataLabel: {
      type: String,
      required: false,
      default: 'No records were found',
    },
    isViewDetail: {
      type: Boolean,
      required: false,
      default: true,
    },
    isPaging: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  created() {
    this.isTitle = !(
      this.title == null ||
      this.title == '' ||
      this.title == undefined
    )
  },
  methods: {
    onViewDetails(id) {
      this.$router.push({
        name: this.routerName,
        params: { label: this.$globalLabel, id: id },
      })
    },
  },
}
</script>
