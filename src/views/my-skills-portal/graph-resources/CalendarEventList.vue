<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h4">
        Calendar Events
        <q-btn flat round color="primary" icon="refresh" @click="fetchEvents" />
      </div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      <div v-for="(date, key) in events" :key="key">
        <h6>{{ key }}</h6>
        <div>
          <div v-for="(event, idx) in date" :key="idx">
            <label>{{ event.start }}</label>
            -
            <label>{{ event.end }}</label>
            :
            <label>
              <strong>{{ event.subject }}</strong>
            </label>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'CalendarEventList',
  computed: {
    ...mapState('calendar', ['events']),
  },
  methods: {
    ...mapActions('calendar', ['fetchEvents']),
  },
  created() {
    this.fetchEvents()
  },
}
</script>
