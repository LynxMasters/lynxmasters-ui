import ExternalService from '@/services/externalService'

const state = {
  twitter:{},
  twitch:{},
  reddit:{},
  fetched: false,
}

const getters = {
  getProfiles (state) {
    return state
  },
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
  setProfiles (state, payload) {
   state.twitter = payload.data.twitter
   state.twitter.profile_image_url_https = payload.data.twitter.profile_image_url_https.replace(/_normal/g, "")
   state.twitch = payload.data.twitch
   state.reddit = payload.data.reddit
   state.reddit.icon_img = payload.data.reddit.icon_img.replace(/(amp;)+/g, "")
   state.fetched = true   
  },
  setRequested(state, payload){
    state.fetched = false
  }
}

const actions = {
  fetchProfiles (context, payload) {
    if(!state.fetched){  
      return ExternalService.profiles(payload)
      .then(profiles => {
        console.log('profiles')
        console.log(profiles)
        context.commit('setProfiles', profiles)
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