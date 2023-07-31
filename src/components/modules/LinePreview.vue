<script setup lang="ts">
// The Settings tab controls user settings.
import { onMounted } from 'vue'

import { Util } from '../Util'

onMounted(() => {
  Util.debugLog('LinePreview module mounted.')
})
</script>

<template>
  <h1>Line Preview</h1>
</template>

<style lang="scss" scoped></style>
