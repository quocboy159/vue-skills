<template>
  <div>
    <q-tabs
      v-model="tabModel"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        :label="tab.label"
      >
        <span v-if="tab.isShowError" class="q-tab__alert text-negative"></span>
      </q-tab>
    </q-tabs>

    <q-tab-panels v-model="tabModel" animated keep-alive>
      <q-tab-panel v-for="tab in tabs" :key="tab.name" :name="tab.name">
        <component
          :is="tab.template"
          :tab="tab"
          v-model="localData"
        ></component>
      </q-tab-panel>
    </q-tab-panels>

    <q-separator />
  </div>
</template>

<script>
export default {
  name: 'BaseTabForms',

  props: {
    data: {
      type: Object,
      required: false,
    },
    value: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },

  computed: {
    localData: {
      get: function () {
        return this.data
      },
      set: function (newValue) {
        this.$emit('update', newValue)
      },
    },

    tabModel: {
      get: function () {
        return this.value
      },
      set: function (newValue) {
        this.$emit('input', newValue)
      },
    },
  },
}
</script>
