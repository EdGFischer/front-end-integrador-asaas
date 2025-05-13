// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme: {
          dark: false,
          colors: {
            primary: '#1D3260',
            secondary: '#E94E24', 
            accent: '#facc15',
            error: '#ef4444',   
            success: '#22c55e',
            warning: '#f59e0b',

          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})