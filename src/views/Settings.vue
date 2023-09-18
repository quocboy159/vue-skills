<template>
  <q-page padding>
    <div id="intro-title" class="row">
      <div class="col-12">
        <h1 class="text-h1">Settings</h1>
        <p class="text-h5">Edit your settings.</p>
      </div>
    </div>

    <div class="row col-12 module-container">
      <div id="settings-modules" class="col-12">
        <PersonalDetails></PersonalDetails>
        <CalendarEventList></CalendarEventList>
      </div>
    </div>
  </q-page>
</template>

<script>
import PersonalDetails from './PersonalDetails'
import CalendarEventList from './my-skills-portal/graph-resources/CalendarEventList'
import { mapGetters } from 'vuex'

export default {
  name: 'Settings',
  data() {
    return {}
  },
  components: {
    PersonalDetails,
    CalendarEventList,
  },
  computed: {
    ...mapGetters('auth', ['email']),
  },
}
</script>

<style lang="stylus" scoped>
// FIX - import these from the global style file

// START custom width styles
@import ('../styles/global.styl');
@import ('../styles/themes/SkillsDefault/skillsDefault.styl');

.row.module-container {
  max-width: $smWidth;
}

#settings-modules > .row {
  margin-bottom: 1rem;
}
</style>
