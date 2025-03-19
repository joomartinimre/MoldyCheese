import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { VFileUpload } from 'vuetify/labs/components'

const vuetify = createVuetify({
  components: {
    ...components,
    VFileUpload,
  },
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.brown.darken1,
          secondary: colors.red.lighten4,
          background: colors.yellow.lighten5,
          error: colors.yellow.lighten5,
          info: colors.yellow.lighten5,
          success: colors.lightGreen.darken4,
          surface: colors.yellow.darken1,
          warning: colors.deepOrange.darken4
        }
      },
    },
  },

})

export default vuetify
