<template>
  <h1>{{ $t('rehearsalTab.title') }}</h1>
</template>

<script lang="ts">
// The Rehersal tab will run through the script but does not use the external display.

import { Util } from '../../Util'

export default {
  name: 'RehearsalTab',
  data() {
    return {}
  },
  mounted() {
    Util.debugLog('Rehearsal view mounted.')
  }
}
</script>

<style lang="scss" scoped></style>
