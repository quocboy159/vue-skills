<template>
  <div id="skills-total-container">
    <div id="skills-layouts">
      <div id="skills-layout" view="hHh lpR fFf">
        <q-layout @resize="resize">
          <q-header reveal bordered class="bg-white">
            <q-toolbar id="top-banner" class="row bg-primary text-white">
              <q-toolbar-title></q-toolbar-title>

              <div class="col-auto q-gutter-x-md">
                <span class="text-caption" v-if="userProfile">
                  {{ userProfile.firstName }} {{ userProfile.lastName }}
                </span>
              </div>
            </q-toolbar>

            <q-toolbar id="main-toolbar" class="text-primary">
              <q-toolbar-title>
                <div id="logo-row" class="row items-center">
                  <img class="header-logo" :src="logo" />
                </div>
              </q-toolbar-title>
              <div class="col-auto"></div>
              <q-btn
                v-if="isAuthenticated"
                flat
                primary
                icon-right="person"
                label="Log Out"
                @click="signOut"
              />
              <!--:class="btnClass" -->
            </q-toolbar>
          </q-header>

          <q-page-container>
            <div class="row justify-center">
              <div id="page-contents" class="col-12">
                <!--<router-view />-->
                <slot />
              </div>
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </div>
    <!--<div id="skills-footer-container" bordered class="row-12 bg-grey-10 text-white">
                                                <div class="col-12">
                                                  <div id="skills-footer" class="row text-grey-5">
                                                    <div class="col-12 col-sm-4">
                                                      <span class="text-caption">Copyright Skills 2019</span>
                                                    </div>

                                                    <div class="col-12 col-sm-8">

                                                      <div class="row">

                                                        <div class="col-12">
                                                          <div class="row justify-end">
                                                            <div class="col-auto">
                                                              <span class="text-caption footer-links">
                                                                <a href="#">Terms and Conditions</a>
                                                              </span>
                                                              <span class="text-caption footer-links">
                                                                <a href="#">Privacy Policy</a>
                                                              </span>
                                                            </div>
                                                          </div>
                                                        </div>

                                                      </div>

                                                    </div>
                                                  </div>
                                                </div>
    </div>-->
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
              <a target="_blank" :href="privacyPolicyUrl">Privacy Policy</a>
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
import { mapActions, mapGetters } from 'vuex'
const whitelabel = require('../whitelabel/configuration')

export default {
  data() {
    return {
      logo: '',
      termsAndConditionsUrl: '',
      cookiePolicyUrl: '',
      companyName: '',
      privacyPolicyUrl: '',
      existingCrmBaseUrl: process.env.VUE_APP_ROOT_EXISTING_CRM,
      now: new Date().getFullYear(),
    }
  },

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

  watch: {
    $globalLabel(newVal) {
      var config = whitelabel.WhitelabelConfig[newVal]
      if (config) {
        this.logo = config.logo
      }
    },
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters(['userProfile', 'email']),
  },

  methods: {
    ...mapActions(['setScreenWidth']),
    ...mapActions('auth', ['signOut']),

    resize(size) {
      this.setScreenWidth(size.width)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import ('../styles/global.styl');
@import ('../styles/themes/SkillsDefault/skillsDefault.styl');

// import properly from quasar
$grey-5 ?= #bdbdbd;

// .q-img.header-logo
// height:40px
// width:40px
img.header-logo {
  height: 36px;
  width: auto;
}

#logo-row {
  max-width: 200px;
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
  max-width: $smWidth;
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
  // margin-top: -30px
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
    height: 50px;
  }
}
</style>
