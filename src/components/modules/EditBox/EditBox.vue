<script lang="ts">
// The EditBox module displays the TinyMCE editor.

import Editor from '@tinymce/tinymce-vue'
import { Util } from '../../Util'

export default {
  name: 'EditBox',
  components: {
    Editor
  },
  data() {
    return {}
  },
  mounted() {
    Util.debugLog('EditBox module mounted.')
  }
}
</script>

<template>
  <div id="editbox" style="margin-top: 7px">
    <editor
      api-key="no-api-key"
      :init="{
        height: '15vh',
        menubar: false,
        plugins: ['image', 'code', 'media', 'emoticons', 'directionality'],
        toolbar:
          'undo redo | bold italic underline strikethrough subscript superscript | \
          forecolor backcolor fontfamily fontsizeinput lineheight | \
          alignleft aligncenter alignright alignjustify alignnone ltr rtl | \
          selectall removeformat | emoticons media image code',
        // font_family_formats: [...], // TODO: relay fonts from tauri
        image_list: [], // TODO: relay images from tauri's pictureDir https://tauri.app/v1/api/js/path/#picturedir
        skin: 'tinymce-5-dark',
        content_css: 'tinymce-5-dark'
      }"
    />
  </div>
</template>

<style lang="scss">
// TinyMCE
.tox .tox-tbtn {
  transform: scale(0.75) !important;
  height: unset !important;
  width: unset !important;
  margin: 0 !important;
}
.tox .tox-tbtn--bespoke .tox-tbtn__select-label {
  width: unset !important;
}
.tox-statusbar__branding {
  display: none;
}
</style>
