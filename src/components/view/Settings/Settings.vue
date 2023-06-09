<template>
  <h1>{{ settingsTitle }}</h1>
</template>

<script lang="ts">
import {Util} from '../../util/Util'

export default {
  name: 'Settings',
  data() {
    return {
      settingsTitle: 'Settings'
    }
  },
  mounted() {
    Util.debugLog('Settings view mounted.')
  }
}
</script>

<style scoped>

</style>