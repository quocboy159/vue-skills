<template>
  <div class="row" id="user-name" :class="LayoutParent">
    <div class="col-12">
      <q-card flat bordered class="row custom-1">
        <q-card-section class="col-12">
          <div class="row">
            <div class="col-12" :class="LayoutChild1">
              <div class="row">
                <div class="col-12 col-md-2">
                  <q-item-label id="f-name" class="text-label">
                    Username
                  </q-item-label>
                </div>
                <div class="col-12 col-md-10">
                  <div id="l-name" class="">{{ userPrincipalName }}</div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserName',
  props: ['userPrincipalName'],

  data() {
    return {
      title: 'UserName',
      //paddings 1
      LayoutParent: ['layout-parent q-col-gutter-x-sm q-col-gutter-y-lg'],
      LayoutChild1: ['layout-child-1'],
    }
  },
}
</script>

<style lang="stylus" scoped>
@import('../styles/global.styl')
    @import('../styles/themes/SkillsDefault/skillsDefault.styl')

#user-name .detail-rows .row
 align-items center

.layout-parent
    align-items center

.layout-child-1
    max-width $defaultFieldWidth
.btn-align-1
    padding-top 1rem
</style>
