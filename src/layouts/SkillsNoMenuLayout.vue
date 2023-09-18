<template>
  <div>
    <q-layout>
      <div bordered class="bg-white">
        <q-toolbar id="main-toolbar" class="text-primary">
          <q-toolbar-title>
            <div id="logo-row" class="row">
              <img class="header-logo" :src="logo" />
            </div>
          </q-toolbar-title>
          <div class="col-auto"></div>
        </q-toolbar>
      </div>
      <q-page-container>
        <q-page padding class="full-width">
          <div id="page-contents" class="full-width">
            <slot />
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
const whitelabel = require('../whitelabel/configuration')
export default {
  mounted() {
    var config = whitelabel.WhitelabelConfig[this.$globalLabel]
    if (config) {
      this.logo = config.logo
    }
  },
  data() {
    return {
      logo: '',
    }
  },
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');

#main-toolbar {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

#logo-row {
  max-width: 300px;
  padding-top: 0.5em;
  padding-bottom: 2px;
}

#logo-row {
  max-width: 300px;
  padding-top: 0.5em;
  padding-bottom: 2px;
}

img.header-logo {
  height: 50px;
  width: auto;
}

// Media queries
@media only screen and (min-width: $smWidth) {
  img.header-logo {
    height: 80px;
    width: auto;
  }

}
</style>
