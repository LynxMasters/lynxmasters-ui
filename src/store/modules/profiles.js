import ExternalService from '@/services/externalService'

const state = {
  twitter:{
    isLoaded: false,
    fetched: false,
    profile:[]
  },
  twitch:{
    isLoaded: false,
    fetched: false,
    profile:[]
  },
  reddit:{
    isLoaded: false,
    fetched: false,
    profile:[]
  },
}

const getters = {

  getTwitter(state){
    return state.twitter
  },
  getTwitch(state){
    return state.twitch
  },
  getReddit(state){
    return state.reddit
  },
}

const mutations = {

  setReddit (state, payload) {
   state.reddit.profile = payload.data
   if(payload.data.hasOwnProperty('icon_img')){
   state.reddit.profile.icon_img = payload.data.icon_img.replace(/(amp;)+/g, "")
   }
   state.reddit.isLoaded = true
   state.reddit.fetched = true
  },

  setTwitch (state, payload) {
   state.twitch.profile = payload.data
   state.twitch.isLoaded = true
   state.twitch.fetched = true
  },

  setTwitter (state, payload) {
   state.twitter.profile = payload.data
   if(payload.data.hasOwnProperty('profile_image_url_https')){
   state.twitter.profile.profile_image_url_https = payload.data.profile_image_url_https.replace(/_normal/g, "")
   }
   state.twitter.isLoaded = true
   state.twitter.fetched = true
  },

  setRequested(state, payload){
    state.fetched = false
  }
}

const actions = {
  async fetchReddit (context, payload) {
    if(!state.reddit.fetched){
      return ExternalService.profilesReddit(payload)
      .then(profiles => {
        context.commit('setReddit', profiles)
      })
      .catch(error => {
        console.log(error)
        context.commit('setReddit', error)
      })
    }
  },
  async fetchTwitch(context, payload) {
    if(!state.twitch.fetched){
      return ExternalService.profilesTwitch(payload)
      .then(profiles => {
        context.commit('setTwitch', profiles)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  async fetchTwitter (context, payload) {
    if(!state.twitter.fetched){
      return ExternalService.profilesTwitter(payload)
      .then(profiles => {
        context.commit('setTwitter', profiles)
      })
      .catch(error => {
        context.commit('setTwitch', error)
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
