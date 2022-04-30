import '~/assets/style/index.scss'

import Buefy from 'buefy'
import Vuex from 'vuex'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.use(Buefy, {defaultIconComponent: 'font-awesome', defaultIconPack: 'fas'})

  Vue.component('Layout', DefaultLayout)
}
