import { defineStore } from 'pinia'

export default defineStore('settings', {
  state: () => ({
    lang: 'en',
    currentView: 'settingsTab'
  })
})
