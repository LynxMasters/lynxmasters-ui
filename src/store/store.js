import Vue from 'vue'
import Vuex from 'vuex'
import signupState from './modules/signup'
import stepperState from './modules/stepper'
import userState from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signupState: signupState,
    stepperState: stepperState,
    userState: userState
  }
})
