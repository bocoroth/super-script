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

<template>
  <h1>{{ $t('App.rehearsal') }}</h1>
</template>

<style lang="scss" scoped></style>
