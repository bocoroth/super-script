<template>
  <h1>{{ $t('settingsTab.title') }}</h1>
</template>

<script lang="ts">
import {Util} from '../../util/Util'

export default {
  name: 'SettingsTab',
  data() {
    return {}
  },
  mounted() {
    Util.debugLog('Settings view mounted.')
  }
}
</script>

<style lang="scss" scoped>

</style>