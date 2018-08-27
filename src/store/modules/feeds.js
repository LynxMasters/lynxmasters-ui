import ExternalService from '@/services/externalService'

const state = {
  twitter:{},
  twitch:{},
  reddit:{},
  requested_at: 0,
}

const getters = {
  getFeeds (state) {
    return state
  }
}

const mutations = {
  setFeeds (state, payload) {
   state.twitter = payload.data.twitter
   state.twitch = payload.data.twitch.streams
   state.reddit = payload.data.reddit.data.children
   state.requested_at = new Date().getTime() + (5*60*1000) 
  }
}

const actions = {
  fetchFeeds (context, payload) {
    console.log(new Date(state.requested_at).getTime()+ '<' +new Date().getTime())
    if(new Date(state.requested_at) < new Date().getTime()){
      return ExternalService.feeds(payload)
      .then(feeds => {
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