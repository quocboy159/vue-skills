<template>
  <q-dialog position="bottom">
    <q-card class="row">
      <div class="col-12">
        <p>
          <span class="text-h6">Cookies</span>
          To Use the Skills site you must accept the cookie policy
        </p>
        <q-btn flat icon label="Accept" color="primary" class="float-left" />
        <q-btn flat icon label="Reject" color="primary" class="float-left" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'Cookie',
  props: ['cookie'],

  data() {
    return {
      //paddings 1
      LayoutParent: ['layout-parent q-col-gutter-x-sm q-col-gutter-y-lg'],
      LayoutChild1: ['layout-child-1'],
      //LayoutChild2: ['layout-child-2 col-12']
    }
  },

  Methods: {},
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');

#user-name .detail-rows .row {
  align-items: center;
}

.layout-parent {
  align-items: center;
}

.layout-child-1 {
  max-width: $defaultFieldWidth;
}

.btn-align-1 {
  padding-top: 6px;
}
</style>
