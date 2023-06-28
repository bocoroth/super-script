<script lang="ts">
import Editor from '@tinymce/tinymce-vue'
export default {
  name: 'EditBox',
  components: {
    Editor
  },
  data() {
    return {}
  }
}
</script>

<template>
  <div id="editbox" style="margin-top: 2px">
    <editor api-key="no-api-key" :init="{
      height: '15vh',
      menubar: false,
      plugins: [
        'image code'
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
  </div>
</template>

<style lang="scss" scoped></style>