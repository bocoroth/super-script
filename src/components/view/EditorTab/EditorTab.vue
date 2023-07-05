<script lang="ts">
// The Editor tab is used for editing the current script.

import EditBox from '@/components/modules/EditBox/EditBox.vue'
import LineList from '@/components/modules/LineList/LineList.vue'
import { Util } from '../../Util'

export default {
  name: 'EditorTab',
  components: {
    EditBox,
    LineList
  },
  data() {
    return {}
  },
  mounted() {
    Util.debugLog('Editor view mounted.')
  }
}
</script>

<template>
  <editBox></editBox>
  <lineList></lineList>
</template>

<style lang="scss" scoped></style>
