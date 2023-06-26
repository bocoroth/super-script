import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import App from './App.vue'

// import translations
import es from "./locales/es.json";
import en from "./locales/en.json";

// configure i18n
const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: { es, en },
});

const app = createApp(App)
app.use(i18n)
app.mount('#app')
