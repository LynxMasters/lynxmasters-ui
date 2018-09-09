import ExternalService from '@/services/externalService'
import UserService from '@/services/UserService'
const state = {
  accounts: {
    twitter:{
      linked: false
    },
    twitch:{
      linked: false
    },
    reddit:{
      linked: false
    },
  },
  fetched: false
}

const getters = {
  getAccounts (state) {
    return state.accounts
  }
}

const mutations = {
  setAccounts(state, payload){
    state.accounts = payload.data
    state.fetched = true
  },
  setFetched(state){
    state.fetched = false
  }
}

const actions = {
  fetchAccounts (context, payload) {
    if(!state.fetched){
      return UserService.getAccounts(payload)
      .then(accounts =>{
        context.commit('setAccounts', accounts)
      })
      .catch(error =>{
        console.log(error)
      })
    }
  },
  unlinkTwitter (context, payload) {
    return ExternalService.twitterUNLINK(payload)
    .then(accounts =>{
      context.commit('setAccounts', accounts)
    })
    .catch(error =>{
      console.log(error)
    })
  },
  unlinkTwitch (context, payload) {
    return ExternalService.twitchUNLINK(payload)
    .then(accounts =>{
      context.commit('setAccounts', accounts)
    })
    .catch(error =>{
      console.log(error)
    })
  },
  unlinkReddit (context, payload) {
    return ExternalService.redditUNLINK(payload)
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
