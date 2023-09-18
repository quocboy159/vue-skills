<template>
  <div id="skills-total-container">
    <q-layout view="hHh lpR fff">
      <q-header>
        <div class="row">
          <div class="col-8 offset-2">
            <q-toolbar>
              <Menu cssClass="menu-class" />
              <q-space></q-space>
              <q-btn
                no-caps
                flat
                :label="greetingText"
                @click="signOut"
                class="q-btn-log-out"
              ></q-btn>
            </q-toolbar>
          </div>
        </div>
      </q-header>
      <q-footer class="bg-grey-10">
        <q-bar>
          <span class="text-caption">&copy; Skills {{ now }}</span>
          <span class="text-caption footer-links">
            <a target="_blank" :href="privacyPolicyUrl">Privacy Policy</a>
          </span>
        </q-bar>
      </q-footer>
      <q-page-container>
        <div class="row">
          <div class="col-8 offset-2">
            <q-page padding>
              <div id="page-contents">
                <slot />
              </div>
            </q-page>
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Menu from '../compoments/Menu.vue'
import { mapActions, mapGetters } from 'vuex'
const whitelabel = require('../whitelabel/configuration')

export default {
  components: {
    Menu,
  },

  data() {
    return {
      logo: '',
      cookiePolicyUrl: '',
      privacyPolicyUrl: '',
      now: new Date().getFullYear(),
    }
  },

  mounted() {
    var config = whitelabel.WhitelabelConfig[this.$globalLabel]
    if (config) {
      this.logo = config.logo
      this.cookiePolicyUrl = config.cookiePolicyUrl
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
    ...mapGetters(['userProfile', 'email']),
    ...mapGetters('auth', ['currentName']),

    greetingText() {
      return `Hello ${this.currentName}, click here to logout`
    },
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

.menu-class
  padding-top: 0
  padding-bottom : 0

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
  min-height: 50px;
  height: 50px;
}

// #main-toolbar > .q-btn
// padding-right:0px
#main-toolbar {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

#page-contents {
  max-width: $lgWidth;
  min-height: 100%;
}

.page-container {
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

.q-btn-log-out {
  color: #ecf0f1;
  font-weight: initial;
}

.menu-container{
  padding-right : 10%
  padding-left : 10%
}

// Media queries
@media only screen and (min-width: $smWidth) {
  img.header-logo {
    height: 50px;
  }
}
</style>
