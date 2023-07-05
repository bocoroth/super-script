<script lang="ts">
// The Performance tab will run through the script using the external display.

import { Util } from '../../Util'

export default {
  name: 'PerformanceTab',
  data() {
    return {}
  },
  mounted() {
    Util.debugLog('Performance view mounted.')
  }
}
</script>

<template>
  <h1>{{ $t('performanceTab.title') }}</h1>
</template>

<style lang="scss" scoped></style>
