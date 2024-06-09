<script setup lang="ts">
// The Performance tab will run through the script, optionally using one or more external displays.

import { Util } from '../Util'
import LineList from '@/components/modules/LineList.vue'

import { onMounted } from 'vue'

onMounted(() => {
  Util.debugLog('Performance view mounted.')
})
</script>

<template>
  <line-list ref="performanceLineList"></line-list>
</template>

<style lang="scss" scoped></style>
