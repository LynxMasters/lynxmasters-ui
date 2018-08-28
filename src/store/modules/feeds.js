import ExternalService from '@/services/externalService'

const state = {
  twitter:{
    isLoaded: false
  },
  twitch:{
    isLoaded: false
  },
  reddit:{
    isLoaded: false
  },
  requested_at: 0,
}

const getters = {
  getFeeds (state) {
    return state
  },
  getTweets(state){
    return state.twitter
  },
  getStreams(state){
    return state.twitch
  },
  getThreads(state){
    return state.reddit
  },
}

const mutations = {
  setFeeds (state, payload) {
   state.twitter = payload.data.twitter
   state.twitter.isLoaded = true
   state.twitch = payload.data.twitch.streams
   state.twitch.isLoaded = true
   state.reddit = payload.data.reddit.data.children
   state.reddit.isLoaded = true
   state.requested_at = new Date().getTime() + (5*60*1000) 
  }
}

const actions = {
  fetchFeeds (context, payload) {
    console.log(new Date(state.requested_at).getTime()+ '<' +new Date().getTime())
    if(new Date(state.requested_at) < new Date().getTime()){
      return ExternalService.feeds(payload)
      .then(feeds => {
        console.log('feeds')
        console.log(feeds)
        context.commit('setFeeds', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions, 
}