import { createApp } from 'vue'
import './index.css'
import './style.css'
import './main.scss'
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#009a3e', // #E53935
        //   secondary: colors.red.lighten4, // #FFCDD2
        },
      },
    },
  },
})

createApp(App).use(vuetify).mount('#app')
