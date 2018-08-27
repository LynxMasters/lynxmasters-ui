import Vue from 'vue'
import Vuex from 'vuex'
import signupState from './modules/signup'
import stepperState from './modules/stepper'
import userState from './modules/user'
import accountState from './modules/accounts'
import feedState from './modules/feeds'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signup: signupState,
    stepper: stepperState,
    user: userState,
    accounts: accountState,
    feeds: feedState,
  }
})
