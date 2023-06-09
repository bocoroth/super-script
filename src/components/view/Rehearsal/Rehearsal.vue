<template>
  <h1>{{ rehearsalTitle }}</h1>
</template>

<script lang="ts">
  // The Rehersal tab will run through the script but does not use the external display.
  export default {
    name: 'Rehearsal',
    data() {
      return {
        rehearsalTitle: 'Rehearsal'
      }
    }
  }
</script>

<style scoped>

</style>