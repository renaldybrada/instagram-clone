import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import Home from './components/Home.vue'
import User from './components/User.vue'
import Post from './components/Post.vue'

Vue.config.productionTip = false

Vue.component('vue-fontawesome', FontAwesomeIcon)
Vue.use(Buefy,{
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
})
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/search', component: Home},
  { path: '/user', component: User },
  { path: '/post/:shortcode', name: 'post', component: Post }
]


const router = new VueRouter({
  routes,
  mode: 'history'
});

const base = axios.create({
  baseURL: 'https://instagram-public-api.herokuapp.com'
})

Vue.prototype.$http = base

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
