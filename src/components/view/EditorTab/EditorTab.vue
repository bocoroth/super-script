<script lang="ts">
  // The Editor tab is used for editing the current script. 
  import EditBox from '@/components/modules/EditBox.vue'
  export default {
    name: 'EditorTab',
    components: {
      EditBox
    },
    data() {
      return {}
    }
  }
</script>

<template>
  <editBox></editBox>
</template>

<style lang="scss" scoped>
</style>