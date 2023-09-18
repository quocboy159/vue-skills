<template>
  <q-page padding>
    <h2>{{ $route.params.code }}</h2>
    <p>{{ $route.params.message }}</p>
  </q-page>
</template>

<script>
export default {
  name: 'GenericError',
}
</script>
