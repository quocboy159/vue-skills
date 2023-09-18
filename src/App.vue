<template>
  <div id="app" :class="appClass">
    <component :is="masterPage">
      <network-error :pageName="pageName" />
      <q-spinner
        color="primary"
        size="3em"
        class="loading"
        v-if="isLoadSpining"
      />
      <router-view :key="$route.fullPath" />
      <help-link :content="helpLinkContent" />
    </component>
  </div>
</template>

<script>
const default_layout = 'UserSettingsLayout'
import { mapGetters, mapMutations } from 'vuex'
import { CURRENT_LABEL } from '@/store/modules/auth/mutation-types'
import HelpLink from './compoments/HelpLink.vue'
import NetworkError from './compoments/messages/NetworkError.vue'
import SkillsGroupPortalLayout from './layouts/SkillsGroupPortalLayout.vue'
import {
  SkillsGroupPortalWhiteLabelConfiguration,
  WhitelabelConfig,
} from './whitelabel/configuration'
import { colors } from 'quasar'

export default {
  components: {
    HelpLink,
    NetworkError,
  },

  data() {
    return {
      appClass: '',
      isSkillsGroupPortal: false,
      helpLinkContent: null,
    }
  },

  methods: {
    ...mapMutations('auth', {
      setCurrentLabel: CURRENT_LABEL,
    }),
  },
  computed: {
    ...mapGetters(['isLoadSpining']),

    masterPage() {
      return this.$route.meta.layout || default_layout
    },

    pageName() {
      return this.masterPage === SkillsGroupPortalLayout
        ? 'Skills Group Portal'
        : 'My Skills'
    },
  },

  watch: {
    '$route.params.label': {
      handler(label) {
        if (label) {
          const whiteLabel = label.toLowerCase()
          this.isSkillsGroupPortal =
            this.$route.meta.isSkillsGroupPortal || false
          this.helpLinkContent = this.isSkillsGroupPortal
            ? SkillsGroupPortalWhiteLabelConfiguration[whiteLabel].needHelp
            : null

          this.appClass = this.isSkillsGroupPortal
            ? `app-skills-group-portal-${whiteLabel}`
            : `app-${whiteLabel}`

          // update theme colors
          if (this.isSkillsGroupPortal) {
            const config = SkillsGroupPortalWhiteLabelConfiguration[whiteLabel]
            if (config) colors.setBrand('primary', config.primaryColor)
          } else {
            const config = WhitelabelConfig[whiteLabel]
            if (config) colors.setBrand('primary', config.primaryColor)
          }
        }
      },
      immediate: true,
    },
  },

  mounted() {
    // Save UTM parameters into localstorage
    const utm_source = this.$route.query.utm_source
    const utm_medium = this.$route.query.utm_medium
    const utm_campaign = this.$route.query.utm_campaign
    if (utm_source) {
      localStorage.setItem('utm_source', utm_source)
    }
    if (utm_medium) localStorage.setItem('utm_medium', utm_medium)
    if (utm_campaign) localStorage.setItem('utm_campaign', utm_campaign)

    // Save current label to the state for redirects
    this.setCurrentLabel(this.$globalLabel)
  },
}
</script>
