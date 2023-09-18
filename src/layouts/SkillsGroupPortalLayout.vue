<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-8">
      <q-toolbar>
        <q-btn
          @click="leftDrawerOpen = !leftDrawerOpen"
          flat
          round
          dense
          icon="menu"
          class="lt-md"
          size="lg"
        />
        <label class="greeting-container">
          <span class="text-h5">{{ getGreetingText() }}</span>
          <br />
          <span class="skills-id-label">Skills ID: {{ skillsId }}</span>
        </label>
        <q-space />
        <skills-logout-button />
      </q-toolbar>
      <hr />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-3"
      :width="menuLeftWidth"
    >
      <q-list>
        <q-item clickable>
          <q-item-section>
            <q-img :src="logo"></q-img>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          :active="
            this.$router.history.current.name ===
              SkillsGroupPortalRouteNames.HOME ||
            this.$router.history.current.name ===
              SkillsGroupPortalRouteNames.MY_DASHBOARD
          "
          active-class="q-menu-link"
        >
          <q-item-section>
            <router-link
              :to="routeLink(SkillsGroupPortalRouteNames.MY_DASHBOARD)"
            >
              <b>My Dashboard</b>
            </router-link>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :active="
            this.$router.history.current.name ===
            SkillsGroupPortalRouteNames.MY_PROFILE
          "
          active-class="q-menu-link"
        >
          <q-item-section>
            <router-link
              :to="routeLink(SkillsGroupPortalRouteNames.MY_PROFILE)"
            >
              <b>My Profile</b>
            </router-link>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>
<script>
import {
  SkillsGroupPortalRouteNames,
  DEFAULT_WHITE_LABEL,
} from '../common/constants.js'
import { SkillsGroupPortalWhiteLabelConfiguration } from '../whitelabel/configuration'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SkillsGroupPortalLayout',

  components: {
    SkillsLogoutButton: () =>
      import('../compoments/buttons/SkillsLogoutButton.vue'),
  },

  data() {
    return {
      menuLeftWidth: 300,
      firstName: '',
      skillsId: '',
      leftDrawerOpen: true,
      SkillsGroupPortalRouteNames,
      idleSecondsCounter: 0,
      idleSecondsTimer: null,
      idleTimeout: (process.env.VUE_APP_IDLE_TIMEOUT_IN_MINUTE ?? 10) * 60,
      logo: '',
    }
  },

  async created() {
    this.idleSecondsTimer = window.setInterval(this.checkIdleTime, 1000)
    this.menuLeftWidth = this.$q.platform.is.mobile ? 200 : 300
    this.fetchData()
  },

  mounted() {
    window.addEventListener('mousemove', this.resetIdleTimeout)
    window.addEventListener('click', this.resetIdleTimeout)
    window.addEventListener('keypress', this.resetIdleTimeout)

    const config =
      SkillsGroupPortalWhiteLabelConfiguration[
        this.$globalLabel || DEFAULT_WHITE_LABEL
      ]
    if (config) {
      this.logo = config.logo
    }
  },

  computed: {
    ...mapGetters('skills-group-contact', ['contact']),
  },

  methods: {
    ...mapActions(['signOut']),

    routeLink(name) {
      return { name, params: { label: this.$route.params.label } }
    },

    resetIdleTimeout() {
      this.idleSecondsCounter = 0
    },

    checkIdleTime() {
      this.idleSecondsCounter++
      if (this.idleSecondsCounter >= this.idleTimeout) {
        // clear timer
        window.clearInterval(this.idleSecondsTimer)

        // logout
        this.signOut(window.location.href)
      }
    },

    fetchData() {
      if (this.contact) {
        this.firstName = this.contact.firstName
        this.skillsId = this.contact.skillsID
      }
    },

    getGreetingText() {
      const currentHour = new Date().getHours()
      if (currentHour >= 0 && currentHour <= 12) {
        return `Good morning, ${this.firstName}`
      } else if (currentHour > 12 && currentHour <= 18) {
        return `Good afternoon, ${this.firstName}`
      } else {
        return `Good evening, ${this.firstName}`
      }
    },
  },

  destroyed() {
    window.removeEventListener('mousemove', this.resetIdleTimeout)
    window.removeEventListener('click', this.resetIdleTimeout)
    window.removeEventListener('keypress', this.resetIdleTimeout)
  },
}
</script>

<style lang="scss" scoped>
a,
a:visited {
  color: black;
}

a:link,
.text-decoration-none:hover {
  text-decoration: none;
}

// .router-link-exact-active {
//   color: red !important;
// }

.q-menu-link a {
  color: red;
}

.q-toolbar {
  padding: 0px;
}

.greeting-container {
  line-height: 20px !important;

  .skills-id-label {
    font-size: 1rem;
  }

  .greeting-text {
    font-size: 1.7rem;
    font-weight: 400;
    line-height: 1.75rem;
    letter-spacing: 0.00937em;
  }
}

.q-item {
  padding: 8px 40px 8px;
}

.q-header {
  padding: 15px 20px 0px 30px;
}

@media only screen and (max-width: 1439px) {
  .q-header {
    padding: 15px 0px 0px 0px;
  }
}
</style>
