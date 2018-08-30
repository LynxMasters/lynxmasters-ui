import ExternalService from '@/services/externalService'

const state = {
  twitter:{
    isLoaded: false,
    fetched: false,
  },
  twitch:{
    isLoaded: false,
    fetched: false,
  },
  reddit:{
    isLoaded: false,
    fetched: false,
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
   state.reddit = payload.data
   state.reddit.icon_img = payload.data.icon_img.replace(/(amp;)+/g, "")
   state.reddit.isLoaded = true
   state.reddit.fetched = true   
  },

  setTwitch (state, payload) {
   state.twitch = payload.data
   state.twitch.isLoaded = true  
   state.twitch.fetched = true
  },

  setTwitter (state, payload) {
   state.twitter = payload.data
   state.twitter.profile_image_url_https = payload.data.profile_image_url_https.replace(/_normal/g, "")
   state.twitter.isLoaded = true
   state.twitter.fetched = true   
  },

  setRequested(state, payload){
    state.fetched = false
  }
}

const actions = {
  fetchReddit (context, payload) {
    if(!state.reddit.fetched){  
      return ExternalService.profilesReddit(payload)
      .then(profiles => {
        console.log('profiles')
        console.log(profiles)
        context.commit('setReddit', profiles)
      })
      .catch(error => {
        console.log(error)
        context.commit('setReddit', error)
      })
    }  
  },
  fetchTwitch(context, payload) {
    if(!state.twitch.fetched){  
      return ExternalService.profilesTwitch(payload)
      .then(profiles => {
        console.log('profiles')
        console.log(profiles)
        context.commit('setTwitch', profiles)
      })
      .catch(error => {
        console.log(error)
      })
    }  
  },
  fetchTwitter (context, payload) {
    if(!state.twitter.fetched){  
      return ExternalService.profilesTwitter(payload)
      .then(profiles => {
        console.log('profiles')
        console.log(profiles)
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