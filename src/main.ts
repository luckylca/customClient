import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'md3Bright',
        themes: {
            md3Bright: {
                dark: false,
                colors: {
                    // 明亮优雅的色调
                    background: '#F8F7FC',
                    surface: '#FFFFFF',
                    'surface-bright': '#FFFFFF',
                    'surface-variant': '#E7E0EC',
                    'on-background': '#1C1B1F',
                    'on-surface': '#1C1B1F',
                    'on-surface-variant': '#49454F',
                    // Primary - 紫色主调
                    primary: '#6750A4',
                    'primary-darken-1': '#4F378B',
                    'on-primary': '#FFFFFF',
                    // Secondary
                    secondary: '#625B71',
                    'secondary-darken-1': '#4A4458',
                    'on-secondary': '#FFFFFF',
                    // Tertiary - 玫瑰色
                    tertiary: '#7D5260',
                    'on-tertiary': '#FFFFFF',
                    // 功能色
                    error: '#B3261E',
                    'on-error': '#FFFFFF',
                    info: '#1E88E5',
                    success: '#2E7D32',
                    warning: '#F57C00',
                    // 边框
                    'outline': '#79747E',
                    'outline-variant': '#CAC4D0',
                }
            }
        }
    },
    defaults: {
        VBtn: {
            rounded: 'pill',
            elevation: 0,
        },
        VCard: {
            rounded: 'lg',
            elevation: 1,
        },
        VSwitch: {
            color: 'primary',
            inset: true,
        },
        VSlider: {
            color: 'primary',
        },
        VExpansionPanels: {
            variant: 'accordion',
        },
    }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
