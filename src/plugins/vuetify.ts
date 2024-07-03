/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi';


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'blueTheme',
    themes: {
      blueTheme: {
        dark: false,
        colors: {
          primary: '#A7C7E7',
          secondary: '#C3DDF9',
          accent: '#89AFC9',
          error: '#FF5252',
          info: '#B2DFDB',
          success: '#A5D6A7',
          warning: '#FFE082',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
