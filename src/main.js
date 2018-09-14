// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import VueScrollTo from 'vue-scrollto'
import scrollSpy from 'vue2-scrollspy';
import store from './store/store'
import moment from 'moment'
import VueProgress from 'vue-progress-path'
require('vue2-animate/dist/vue2-animate.min.css')
import Bulma from 'bulma/css/bulma.css'
import 'buefy/lib/buefy.css'
import './assets/style/app.scss'
import VueLazyload from 'vue-lazyload'


Vue.use(Buefy)
Vue.use(scrollSpy)
Vue.use(VueScrollTo)
Vue.use(VueProgress)
Vue.prototype.moment = moment
Vue.use(VueLazyload)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

var corsOptions = {
  origin: 'https://api.twitter.com/1.1',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  let $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        let target = $el.dataset.target;
        let $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
});
