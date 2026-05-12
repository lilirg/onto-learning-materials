import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout!)
  },
}