import ExternalService from '@/services/externalService'

const state = {
  
  streams:{
    len: 0,
    linked: false,
    isLoaded: false,
    requested_at: 0,
    stream:[]
  },
  profile:{
    linked: false,
    isLoaded: false,
    requested: false,
    data:[]
  },
  stats:{
    col1Val: 168,
    col2Val: 334,
    col3Val: null,
    col4Val: null,
    col1: "Screen Name",
    col2: "Bio",
    col3: null,
    col4: null,
  }
}

const getters = {

  getStreams(state){
    return state.streams
  },
  getProfile(state){
    return state.profile
  },
  getStats(state){
    return state.stats
  }
}

const mutations = {

  setStreams (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.streams.stream = payload.data.streams
    state.streams.len  = payload.data._total
    state.streams.linked = true
    if(state.streams.len == null){
      state.streams.len = 0
    }
   }
   state.streams.isLoaded = true
   state.streams.requested_at = new Date().getTime() + (5*60*1000)
  },
  setProfile (state, payload) {
   state.profile.data = payload.data
   state.stats.col1Val = payload.data.display_name
   state.stats.col2Val = payload.data.bio

   setTimeout(() => {
     state.profile.isLoaded = true
     state.profile.linked = true  
     state.requested = true   
   }, 1500)
  },

  setRequested(state){
    state.profile.requested = false
  },
}

const actions = {

  async fetchStreams (context, payload) {
    if(state.streams.requested_at < new Date().getTime()){
      return ExternalService.feedsTwitch(payload)
      .then(feeds => {
        console.log(feeds)
        context.commit('setStreams', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  async fetchProfile(context, payload) {
    if(!state.profile.requested){
      return ExternalService.profilesTwitch()
      .then(profiles => {
        context.commit('setProfile', profiles)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },

  unlinkTwitch (context, payload) {
    return ExternalService.twitchUNLINK()
    .then(account =>{
      context.commit('setRequested')
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
