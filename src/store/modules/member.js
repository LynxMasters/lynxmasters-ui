import ExternalService from '@/services/externalService'
const state = {
  twitter:{
    len: 0,
    linked: false,
    isLoaded: false,
    tweets:[]
  },
  twitch:{
    len: 0,
    linked: false,
    isLoaded: false,
    streams:[]
  },
  reddit:{
    len: 0,
    linked: false,
    isLoaded: false,
    threads:[]
  },
  member:{

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
  getMember(state){
    return state.member
  }
}

const mutations = {
  setReddit (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.reddit.threads = payload.data.data.children
    state.reddit.len = payload.data.data.dist
    state.reddit.linked = true
   }
   state.reddit.isLoaded = true
   state.reddit.requested_at = new Date().getTime() + (5*60*1000)
  },
  setTwitch (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.twitch.streams = payload.data.streams
    state.twitch.len  = payload.data.total
    state.twitch.linked = true
   }
   state.twitch.isLoaded = true
   state.twitch.requested_at = new Date().getTime() + (5*60*1000)
  },
  setTwitter (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.twitter.tweets = payload.data
    state.twitter.len = payload.data.length
    state.twitter.linked = true
   }
   state.twitter.isLoaded = true
   state.twitter.requested_at = new Date().getTime() + (5*60*1000)
  },
  setMember(state, payload){
    state.member = payload
  },
  setReset(state) {
    state.twitter.len = 0
    state.twitter.linked = false
    state.twitter.isLoaded = false
    state.twitch.len = 0
    state.twitch.linked = false
    state.twitch.isLoaded = false
    state.reddit.len = 0
    state.reddit.linked = false
    state.reddit.isLoaded = false
  }
}

const actions = {
  async fetchReddit (context, payload) {
    return ExternalService.membersReddit(payload.username)
    .then(feeds => {
      console.log(feeds)
      context.commit('setReddit', feeds)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async fetchTwitch (context, payload) {
    return ExternalService.membersTwitch(payload.username)
    .then(feeds => {
      context.commit('setTwitch', feeds)
    })
    .catch(error => {
      console.log(error)
    })  
  },
  async fetchTwitter (context, payload) {
    return ExternalService.membersTwitter(payload.username)
      .then(feeds => {
        console.log(feeds)
        context.commit('setTwitter', feeds)
    })
      .catch(error => {
        console.log(error)
    })
  },
  resetState(context){
    context.commit('setReset')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
