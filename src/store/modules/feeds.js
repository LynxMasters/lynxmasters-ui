import ExternalService from '@/services/externalService'

const state = {
  feeds:{},
  requested_at: 0,
}

const getters = {
  getFeeds (state) {
    return state.feeds
  }
}

const mutations = {
  setFeeds (state, payload) {
     state.feeds = payload
     state.requested_at = new Date().getTime() + (5*60*1000)
  }
}

const actions = {
  fetchFeeds (context, getters, jwt) {
    console.log(Date(state.requested_at).getTime() < new Date().getTime())
    if(Date(state.requested_at).getTime() < new Date().getTime()){
      return ExternalService.feeds(jwt)
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