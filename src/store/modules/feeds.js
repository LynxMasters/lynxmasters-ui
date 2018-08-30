import ExternalService from '@/services/externalService'

const state = {
  twitter:{
    isLoaded: false,
    requested_at: 0,
  },
  twitch:{
    isLoaded: false,
    requested_at: 0,
  },
  reddit:{
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
   state.reddit = payload.data.data.children
   state.reddit.isLoaded = true
   state.reddit.requested_at = new Date().getTime() + (5*60*1000) 
  },
  setTwitch (state, payload) {
   state.twitch = payload.data.streams
   state.twitch.isLoaded = true
   state.twitch.requested_at = new Date().getTime() + (5*60*1000) 
  },
  setTwitter (state, payload) {
   state.twitter = payload.data
   state.twitter.isLoaded = true
   state.twitter.requested_at = new Date().getTime() + (5*60*1000) 
  }
}

const actions = {
  fetchReddit (context, payload) {
    console.log(state.reddit.requested_at+ '<' +new Date().getTime())
    if(state.reddit.requested_at < new Date().getTime()){
      return ExternalService.feedsReddit(payload)
      .then(feeds => {
        console.log('feeds')
        console.log(feeds)
        context.commit('setReddit', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  fetchTwitch (context, payload) {
    console.log(state.twitch.requested_at+ '<' +new Date().getTime())
    if(state.twitch.requested_at < new Date().getTime()){
      return ExternalService.feedsTwitch(payload)
      .then(feeds => {
        console.log('feeds')
        console.log(feeds)
        context.commit('setTwitch', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  fetchTwitter (context, payload) {
    console.log(state.twitter.requested_at+ '<' +new Date().getTime())
    if(state.twitter.requested_at < new Date().getTime()){
      return ExternalService.feedsTwitter(payload)
      .then(feeds => {
        console.log('feeds')
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