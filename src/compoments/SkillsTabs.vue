<template>
  <div>
    <div>
      <q-tabs v-model="tab" align="left">
        <q-route-tab
          v-for="item in tabs"
          :key="item.name"
          :to="{ name: item.routeTo }"
          :name="item.name"
          :label="item.title"
        />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel v-for="item in tabs" :key="item.name" :name="item.name">
          <router-view :key="item.name"></router-view>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillsTabs',
  data() {
    return {
      tab: '',
    }
  },
  props: {
    defaultTab: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.tab = this.defaultTab
  },
}
</script>

<style lang="stylus">
.q-tab-panels.q-panel-parent
  overflow : initial

  .scroll
    overflow : initial

  .q-tab-panel
    padding : 16px 0 0 0
</style>
