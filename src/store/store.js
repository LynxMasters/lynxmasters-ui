import Vue from 'vue'
import Vuex from 'vuex'
import signupState from './modules/signup'
import stepperState from './modules/stepper'
import userState from './modules/user'
import memberState from './modules/member'
import redditState from './modules/reddit/reddit'
import twitchState from './modules/twitch/twitch'
import twitterState from './modules/twitter/twitter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signup: signupState,
    stepper: stepperState,
    user: userState,
    member: memberState,
    reddit: redditState,
    twitch: twitchState,
    twitter: twitterState
  }
})
