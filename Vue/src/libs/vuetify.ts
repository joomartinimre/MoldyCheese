import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.brown.darken1, // #E53935
          secondary: colors.red.lighten4, // #FFCDD2
          background: colors.yellow.lighten5,
          error: colors.yellow.lighten5,
          info: colors.yellow.lighten5,
          success: colors.yellow.lighten5,
          surface: colors.yellow.darken1,
          warning: colors.yellow.lighten5
        }
      },
    },
  },

})

export default vuetify
