<template>
  <div id="skills-total-container">
    <div id="skills-layouts">
      <div id="skills-layout" view="hHh lpR fFf">
        <q-layout id="small-centered-layout1">
          <div bordered class="bg-white">
            <q-toolbar id="main-toolbar" class="text-primary">
              <div id="logo-row" class="row items-center">
                <img class="header-logo" :src="logo" />
              </div>
              <div class="col-auto"></div>
            </q-toolbar>
          </div>

          <q-page-container>
            <div class="row justify-center">
              <div id="page-contents" class="col-12">
                <slot />
              </div>
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </div>
  </div>
</template>

<script>
import { SkillsGroupPortalWhiteLabelConfiguration } from '../whitelabel/configuration'
import { DEFAULT_WHITE_LABEL } from '../common/constants.js'

export default {
  data() {
    return {
      logo: '',
    }
  },

  watch: {
    '$route.params.label': {
      handler(label) {
        const whiteLabel = (label || DEFAULT_WHITE_LABEL).toLowerCase()
        this.logo = SkillsGroupPortalWhiteLabelConfiguration[whiteLabel].logo
      },
      immediate: true,
    },
  },
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');
@import ('../styles/themes/SkillsDefault/skillsDefault.styl');

img.header-logo {
  width: 80%;
}

#logo-row {
  max-width: 300px;
  padding-bottom: 2px;
  margin: 0 auto;
  text-align: center;
  display : block
}

#top-banner {
  min-height: 30px;
  height: 30px;
}

// #main-toolbar > .q-btn
// padding-right:0px
#main-toolbar {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

#page-contents {
  max-width: $xsWidth;
  min-height: 100%;
}

#skills-total-container {
  min-height: 100%;
  width: 100%;
}

#skills-layouts {
  min-height: calc(100vh - 50px);
  width: 100%;
}

.q-page-container {
  padding-bottom: 50px;
  min-height: 100%;
}
</style>
