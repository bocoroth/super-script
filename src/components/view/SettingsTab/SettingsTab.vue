<script lang="ts">
// The Settings tab controls user settings.

import { Util } from '../../Util'

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

<template>
  <h1>{{ $t('App.settings') }}</h1>
</template>

<style lang="scss" scoped></style>
