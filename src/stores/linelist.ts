import { defineStore } from 'pinia'

export default defineStore('linelist', {
  state: () => ({
    currentLine: '',
    currentLineNum: 0,
    data: [],
    isEditorMode: false,
    lineData: [],
    metaData: []
  })
})
