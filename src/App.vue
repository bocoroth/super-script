<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-dark-5/dist/css/bootstrap-unlit.min.css'

import 'bootstrap/js/dist/tab'

import Settings from '@/components/view/Settings/Settings.vue'
import Editor from '@/components/view/Editor/Editor.vue'
import Rehearsal from '@/components/view/Rehearsal/Rehearsal.vue'
import Performance from '@/components/view/Performance/Performance.vue'

// set to true to enable debug logger
export const debugMode = true

export default {
  name: 'App',
  components: {
    Settings,
    Editor,
    Rehearsal,
    Performance
  },
  methods: {
  }
}
</script>

<template>
  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button class="nav-link active" id="nav-settings-tab" data-bs-toggle="tab" data-bs-target="#nav-settings"
      type="button" role="tab" aria-controls="nav-settings" aria-selected="true">
        Settings
      </button>
      <button class="nav-link" id="nav-editor-tab" data-bs-toggle="tab" data-bs-target="#nav-editor" type="button"
      role="tab" aria-controls="nav-editor" aria-selected="false">
        Editor
      </button>
      <button class="nav-link" id="nav-rehearsal-tab" data-bs-toggle="tab" data-bs-target="#nav-rehearsal" type="button"
      role="tab" aria-controls="nav-rehearsal" aria-selected="false">
        Rehearsal
      </button>
      <button class="nav-link" id="nav-performance-tab" data-bs-toggle="tab" data-bs-target="#nav-performance"
      type="button" role="tab" aria-controls="nav-performance" aria-selected="false">
        Performance
      </button>
    </div>
  </nav>
  <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane show active" id="nav-settings" role="tabpanel" aria-labelledby="nav-settings-tab">
      <settings></settings>
    </div>
    <div class="tab-pane" id="nav-editor" role="tabpanel" aria-labelledby="nav-editor-tab">
      <editor></editor>
    </div>
    <div class="tab-pane" id="nav-rehearsal" role="tabpanel" aria-labelledby="nav-rehearsal-tab">
      <rehearsal></rehearsal>
    </div>
    <div class="tab-pane" id="nav-performance" role="tabpanel" aria-labelledby="nav-performance-tab">
      <performance></performance>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: #111;
}

// Tabs
nav {
  .nav-tabs {
    margin: 4px 0 0;

    .nav-link {
      border: 1px solid #444;
      color: #aaa;
      padding: 0 7px;
      margin-left: 10px;
      vertical-align: middle;

      &.active {
        border-bottom: 1px solid #222;
        color: #fff;
      }

      &:only-child {
        span.close {
          display: none; // hide close button for single tab
        }
      }

      span.mi {
        font-size: 22px;
        display: inline-block;
        margin-top: -3px;
        vertical-align: middle;
      }

      span.close {
        text-decoration: none;
        color: #888;

        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
