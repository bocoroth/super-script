<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/tab'

import SettingsTab from '@/components/views/SettingsTab.vue'
import EditorTab from '@/components/views/EditorTab.vue'
import PerformanceTab from '@/components/views/PerformanceTab.vue'
import { Util } from './components/Util'

import { onBeforeMount, onMounted } from 'vue'

onBeforeMount(() => {
  // set to true to enable debug logger
  Util.setDebugMode(true)
})

onMounted(() => {
  Util.debugLog('App mounted.')
})
</script>

<template>
  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button
        class="nav-link active"
        id="nav-settings-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-settings"
        type="button"
        role="tab"
        aria-controls="nav-settings"
        aria-selected="true"
      >
        <!-- {{ $t('App.settings') }} -->
        Settings
      </button>
      <button
        class="nav-link"
        id="nav-editor-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-editor"
        type="button"
        role="tab"
        aria-controls="nav-editor"
        aria-selected="false"
      >
        <!-- {{ $t('App.editor') }} -->
        Editor
      </button>
      <button
        class="nav-link"
        id="nav-performance-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-performance"
        type="button"
        role="tab"
        aria-controls="nav-performance"
        aria-selected="false"
      >
        <!-- {{ $t('App.performance') }} -->
        Performance
      </button>
    </div>
  </nav>
  <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane show active" id="nav-settings" role="tabpanel" aria-labelledby="nav-settings-tab">
      <settings-tab></settings-tab>
    </div>
    <div class="tab-pane" id="nav-editor" role="tabpanel" aria-labelledby="nav-editor-tab">
      <editor-tab ref="editorTab"></editor-tab>
    </div>
    <div class="tab-pane" id="nav-performance" role="tabpanel" aria-labelledby="nav-performance-tab">
      <performance-tab ref="performanceTab"></performance-tab>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: #222;
}

// Tabs
nav,
.nav {
  --bs-nav-link-color: #555;
  background-color: var(--bs-body-bg);
  .nav-tabs {
    margin: 4px 0 0;

    .nav-link {
      padding: 0 7px;
      margin-left: 10px;
      vertical-align: middle;
    }
  }
}
</style>
