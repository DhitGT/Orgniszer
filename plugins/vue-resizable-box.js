import Vue from 'vue'
if (process.client) {
  const VueResizableBox = require('vue-resizable-box').default
  Vue.component('vue-resizable-box', VueResizableBox)
}
