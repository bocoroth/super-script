<script setup lang="ts">
// The Editor tab is used for editing the current script.

import EditBox from '@/components/modules/EditBox.vue'
import LineList from '@/components/modules/LineList.vue'
import { Util } from '../Util'

import { onMounted, ref } from 'vue'

const editorLineList: any = ref({})

onMounted(() => {
  Util.debugLog('Editor view mounted.')
})

defineExpose({
  editorLineList
})
</script>

<template>
  <edit-box></edit-box>
  <line-list :isEditorMode="true" ref="editorLineList"></line-list>
</template>

<style lang="scss" scoped></style>
