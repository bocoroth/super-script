import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

// import translations
import es from './locales/es.json'
import en from './locales/en.json'

// configure i18n
const i18n = createI18n({
  fallbackLocale: 'en',
  globalInjection: true,
  legacy: false,
  locale: 'en',
  messages: { es, en }
})

export const translate = (key: string) => {
  if (!key) {
    return ''
  }
  return i18n.global.t(key)
}

import LineListButtons from './components/modules/LineListButtons.vue'

const app = createApp(App)
app.component('LineListButtons', LineListButtons)
app.use(i18n)
app.mount('#app')
