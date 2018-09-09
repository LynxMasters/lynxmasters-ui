import ExternalService from '@/services/externalService'

const state = {
  twitter:{
    len: 0,
    isLoaded: false,
    requested_at: 0,
  },
  twitch:{
    len: 0,
    isLoaded: false,
    requested_at: 0,
  },
  reddit:{
    len: 0,
    isLoaded: false,
    requested_at: 0,
  },
}

const getters = {

  getReddit(state){
    return state.reddit
  },
  getTwitch(state){
    return state.twitch
  },
  getTwitter(state){
    return state.twitter
  },
}

const mutations = {
  setReddit (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.reddit = payload.data.data.children
    state.reddit.len = payload.data.data.dist
   }
   state.reddit.isLoaded = true
   state.reddit.requested_at = new Date().getTime() + (5*60*1000)
  },
  setTwitch (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.twitch = payload.data.streams
    state.twitch.len  = payload.data.total
   }
   state.twitch.isLoaded = true
   state.twitch.requested_at = new Date().getTime() + (5*60*1000)
  },
  setTwitter (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.twitter = payload.data
    state.twitter.len = payload.data.length
   }
   state.twitter.isLoaded = true
   state.twitter.requested_at = new Date().getTime() + (5*60*1000)
  }
}

const actions = {
  fetchReddit (context, payload) {
    if(state.reddit.requested_at < new Date().getTime()){
      return ExternalService.feedsReddit(payload)
      .then(feeds => {
        console.log(feeds)
        context.commit('setReddit', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  fetchTwitch (context, payload) {
    if(state.twitch.requested_at < new Date().getTime()){
      return ExternalService.feedsTwitch(payload)
      .then(feeds => {
        context.commit('setTwitch', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  fetchTwitter (context, payload) {
    if(state.twitter.requested_at < new Date().getTime()){
      return ExternalService.feedsTwitter(payload)
      .then(feeds => {
        console.log(feeds)
        context.commit('setTwitter', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
