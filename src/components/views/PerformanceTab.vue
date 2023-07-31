<script setup lang="ts">
// The Performance tab will run through the script, optionally using one or more external displays.

import { Util } from '../Util'
import LineList from '@/components/modules/LineList.vue'

import { onMounted, ref } from 'vue'

const performanceLineList: any = ref({})

onMounted(() => {
  Util.debugLog('Performance view mounted.')
})

defineExpose({
  performanceLineList
})
</script>

<template>
  <line-list :isEditorMode="false" ref="performanceLineList"></line-list>
</template>

<style lang="scss" scoped></style>
