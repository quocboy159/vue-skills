<template>
  <div class="row">
    <div class="col-12">
      <q-card flat>
        <q-card-section>
          <h1 class="text-h1">
            Sample Text
            <br />
            Sample Text
          </h1>
          <h2 class="text-h2">
            Sample Text
            <br />
            Sample Text
          </h2>
          <h3 class="text-h3">
            Sample Text
            <br />
            Sample Text
          </h3>
          <h4 class="text-h4">
            Sample Text
            <br />
            Sample Text
          </h4>
          <h5 class="text-h5">
            Sample Text
            <br />
            Sample Text
          </h5>
          <h6 class="text-h6">
            Sample Text
            <br />
            Sample Text
          </h6>
          <q-separator />
          <p class="subtitle1">
            Sample Text
            <br />
            Sample Text
          </p>
          <span class="subtitle1">
            Sample Text
            <br />
            Sample Text
          </span>

          <q-separator />
          <p class="text-subtitle2">
            Sample Text
            <br />
            Sample Text
          </p>
          <span class="text-subtitle2">
            Sample Text
            <br />
            Sample Text
          </span>

          <q-separator />
          <p class="text-body1">
            Sample Text
            <br />
            Sample Text
          </p>
          <span class="text-body1">
            Sample Text
            <br />
            Sample Text
          </span>

          <q-separator />
          <p class="text-body2">
            Sample Text
            <br />
            Sample Text
          </p>
          <span class="text-body2">
            Sample Text
            <br />
            Sample Text
          </span>

          <q-separator />
          <p class="text-caption">
            Sample Text
            <br />
            Sample Text
          </p>
          <span class="text-caption">
            Sample Text
            <br />
            Sample Text
          </span>

          <q-separator />
          <p class="text-overline">
            Sample Text
            <br />
            Sample Text
          </p>
          <span class="text-overline">
            Sample Text
            <br />
            Sample Text
          </span>
          <q-separator />
          <h3 class="text-h3 text-primary">Primary</h3>
          <h3 class="text-h3 text-secondary">Secondary</h3>
          <h3 class="text-h3 text-accent">Accent</h3>
          <h3 class="text-h3 text-positive">Positive</h3>
          <h3 class="text-h3 text-negative">Negative</h3>
          <h3 class="text-h3 text-info">Info</h3>
          <h3 class="text-h3 text-warning">Warning</h3>
          <h3 class="text-h3 text-field">Field Color</h3>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FontStyles',
  props: ['fontStyles'],

  data() {
    return {}
  },
}
</script>

<style lang="stylus" scoped>

@import('../styles/global.styl')
@import('../styles/themes/SkillsDefault/skillsDefault.styl')
</style>
