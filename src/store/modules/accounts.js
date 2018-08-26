import ExternalService from '@/services/externalService'
import UserService from '@/services/UserService'
const state = {
  accounts: {},
  fetched: false
}

const getters = {
  getAccounts (state) {
    return state.accounts
  }
}

const mutations = {
  setAccounts(state, payload){
    state.feeds = payload.feeds
    state.fetched = true
  },
}

const actions = {
  fetchAccounts (context) {
    if(!state.fetched){
      return UserService.getAccounts(jwt)
      .then(feeds =>{
        context.commit('setAccounts', accounts)
      })
      .catch(error =>{
        console.log(error)
      })
    }
  },
  unlinkTwitter (context) {
    return ExternalService.twitterUNLINK(jwt)
    .then(accounts =>{
      context.commit('setAccounts', accounts)
    })
    .catch(error =>{
      console.log(error)
    })
  },
  unlinkTwitch (context) {
    return ExternalService.twitchUNLINK(jwt)
    .then(accounts =>{
      context.commit('setAccounts', accounts)
    })
    .catch(error =>{
      console.log(error)
    })
  },
  unlinkReddit (context) {
    return ExternalService.redditUNLINK(jwt)
    .then(accounts =>{
      context.commit('setAccounts', accounts)
    })
    .catch(error =>{
      console.log(error)
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}