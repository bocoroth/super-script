<script lang="ts">
  // The Editor tab is used for editing the current script. 
  import Editor from '@tinymce/tinymce-vue'
  export default {
    name: 'EditorTab',
    components: {
      'editor': Editor
    },
    data() {
      return {}
    }
  }
</script>

<template>
  <main id="editor-tabcontent" style="margin-top: 2px">
    <editor api-key="no-api-key" :init="{
      height: '15vh',
      menubar: false,
      plugins: [
        // 'advlist autolink lists link image charmap print preview anchor',
        // 'searchreplace visualblocks code fullscreen',
        // 'insertdatetime media table paste code help wordcount'
      ],
      toolbar:
        'undo redo | bold italic underline subscript superscript | \
        fontfamily fontsizeinput | \
        alignleft aligncenter alignright alignjustify | \
        selectall removeformat',
      font_size_input_default_unit: 'pt',
      skin: 'tinymce-5-dark',
      content_css: 'tinymce-5-dark',
    }" />
  </main>
</template>

<style lang="scss" scoped>
</style>