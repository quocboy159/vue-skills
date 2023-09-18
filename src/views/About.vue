<template>
  <q-page padding>
    <p>This is an about page</p>
    <img :src="`logos/${org}/main.png`" />
  </q-page>
</template>

<script>
export default {
  name: 'PageAbout',
}
</script>
