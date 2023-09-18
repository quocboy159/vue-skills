<template>
  <div class="row">
    <div class="col-12">
      <p>
        <span class="text-caption" v-html="contactLine1"></span>
        <br />
        <span class="text-caption" v-html="contactLine2"></span>
        <br />
        <span class="text-caption" v-html="contactLine3"></span>
        <br />
        <span class="text-caption" v-html="contactLine4"></span>
        <br />
      </p>
      <p>
        <span class="text-caption">{{ pleaseCall }}</span>
      </p>
    </div>
  </div>
</template>

<script>
const whitelabel = require('../whitelabel/configuration')

export default {
  name: 'ContactDetails',
  props: ['contactDetails'],
  components: {},
  data() {
    return {
      contactLine1: '',
      contactLine2: '',
      contactLine3: '',
      contactLine4: '',
      pleaseCall: '',
    }
  },
  mounted() {
    var config = whitelabel.WhitelabelConfig[this.$globalLabel]
    if (config) {
      this.contactLine1 = config.contactLine1
      this.contactLine2 = config.contactLine2
      this.contactLine3 = config.contactLine3
      this.contactLine4 = config.contactLine4
      this.pleaseCall = config.pleaseCall
    }
  },
}
</script>

<style lang="stylus" scoped>
@import('../styles/global.styl')
@import('../styles/themes/SkillsDefault/skillsDefault.styl')
</style>
