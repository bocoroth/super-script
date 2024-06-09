<script setup lang="ts">
// The Editor tab is used for editing the current script.

import EditBox from '@/components/modules/EditBox.vue'
import LineList from '@/components/modules/LineList.vue'
import { Util } from '../Util'

import { onMounted } from 'vue'

onMounted(() => {
  Util.debugLog('Editor view mounted.')
})
</script>

<template>
  <edit-box></edit-box>
  <line-list ref="editorLineList"></line-list>
</template>

<style lang="scss" scoped></style>
