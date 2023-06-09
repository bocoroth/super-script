<template>
  <h1>{{ editorTitle }}</h1>
</template>

<script lang="ts">
  // The Editor tab is used for editing the current script. 
  export default {
    name: 'Editor',
    data() {
      return {
        editorTitle: "Editor"
      }
    }
  }
</script>

<style scoped>

</style>