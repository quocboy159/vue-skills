<template>
  <div id="skills-total-container">
    <div id="skills-layouts">
      <div id="skills-layout" view="hHh lpR fFf">
        <q-layout id="small-centered-layout1">
          <div bordered class="bg-white">
            <q-toolbar id="main-toolbar" class="text-primary">
              <q-toolbar-title>
                <div id="logo-row" class="row items-center">
                  <img class="header-logo" :src="logo" />
                </div>
              </q-toolbar-title>
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

    <div
      id="skills-footer-container"
      bordered
      class="row-12 bg-grey-10 text-white"
    >
      <div class="col-12">
        <div id="skills-footer" class="row text-grey-5">
          <div class="col-12">
            <span class="text-caption">&copy; Skills {{ now }}</span>
            <!--<span class="text-caption footer-links">
                <a target="_blank" :href="termsAndConditionsUrl">Terms and Conditions</a>
              </span>-->

            <span class="text-caption footer-links">
              <a
                target="_blank"
                title="Privacy Policy"
                :href="privacyPolicyUrl"
              >
                Privacy Policy
              </a>
            </span>
          </div>

          <div class="col-12 col-sm-8">
            <div class="row">
              <div class="col-12">
                <div class="row justify-end">
                  <div class="col-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const whitelabel = require('../whitelabel/configuration')
export default {
  mounted() {
    var config = whitelabel.WhitelabelConfig[this.$globalLabel]
    if (config) {
      this.logo = config.logo
      this.companyName = config.companyName
      this.cookiePolicyUrl = config.cookiePolicyUrl
      this.termsAndConditionsUrl = config.termsAndConditionsUrl
      this.privacyPolicyUrl = config.privacyPolicyUrl
    }
  },
  data() {
    return {
      logo: '',
      privacyPolicyUrl: '',
      termsAndConditionsUrl: '',
      companyName: '',
      cookiePolicyUrl: '',
      now: new Date().getFullYear(),
    }
  },
  watch: {
    $globalLabel(newVal) {
      var config = whitelabel.WhitelabelConfig[newVal]
      if (config) {
        this.logo = config.logo
      }
    },
  },
  methods: {},
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');
@import ('../styles/themes/SkillsDefault/skillsDefault.styl');

// import properly from quasar
$grey-5 ?= #bdbdbd;

img.header-logo {
  height: 50px;
  width: auto;
}

#logo-row {
  max-width: 300px;
  padding-top: 0.5em;
  padding-bottom: 2px;
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

#skills-footer-container {
  padding-top: 0.3em;
  padding-bottom: auto;
  padding-left: 0.5em;
  padding-right: 0.5em;
  height: 30px;
  overflow: hidden;
  position: relative;
  z-index: 1000;
}

#skills-footer {
  // min-height:30px
  // height:30px
  overflow: hidden;
}

#footer >div {
  // max-height:30px
}

.footer-links a {
  color: $grey-5;
  text-decoration: none;
  padding-left: 1em;
}

// Media queries
@media only screen and (min-width: $smWidth) {
  img.header-logo {
    height: 80px;
    width: auto;
  }

  // layout padding override
  #page-contents {
    margin-top: -40px;
  }
}
</style>
