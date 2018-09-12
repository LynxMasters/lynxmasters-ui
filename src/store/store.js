import Vue from 'vue'
import Vuex from 'vuex'
import signupState from './modules/signup'
import stepperState from './modules/stepper'
import userState from './modules/user'
import accountState from './modules/accounts'
import feedState from './modules/feeds'
import profileState from './modules/profiles'
import memberState from './modules/member'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signup: signupState,
    stepper: stepperState,
    user: userState,
    accounts: accountState,
    profiles: profileState,
    feeds: feedState,
    member: memberState,
  }
})
