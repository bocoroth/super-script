<script setup lang="ts">
// The Settings tab controls user settings.
import { onMounted } from 'vue'

import { Util } from '../Util'

onMounted(() => {
  Util.debugLog('Settings view mounted.')
})
</script>

<template>
  <!-- <h1>{{ $t('App.settings') }}</h1> -->
  <h1>Settings</h1>
</template>

<style lang="scss" scoped></style>
