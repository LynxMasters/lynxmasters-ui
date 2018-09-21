import ExternalService from '@/services/externalService'

const state = {
  threads:{
    linked: false,
    len: 0,
    isLoaded: false,
    requested_at: 0,
    thread:[
      {
        likes: null,
        ups: null
      }
    ]
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
    col3Val: 99,
    col4Val: 269,
    col1: "Screen Name",
    col2: "Karma",
    col3: "Followers",
    col4: "Following",
  }
}

const getters = {

  getThreads(state){
    return state.threads
  },
  getProfile(state){
    return state.profile
  },
  getVotes: (state) => (id) => {
    let index = state.threads.thread.findIndex(x => x.data.name == id);
    return state.reddit.threads[index].data
  },
  getStats(state){
    return state.stats
  }
}

const mutations = {
  setThreads (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.threads.thread = payload.data.data.children
    state.threads.len = payload.data.data.dist
    state.threads.linked = true
   }
   state.threads.isLoaded = true
   state.threads.requested_at = new Date().getTime() + (5*60*1000)
  },
  setProfile (state, payload) {
   state.profile.data = payload.data
   if(payload.data.hasOwnProperty('icon_img')){
    state.profile.data.icon_img = payload.data.icon_img.replace(/(amp;)+/g, "")
    state.profile.linked = true
    state.profile.requested = true
    state.stats.col1Val = payload.data.subreddit.display_name_prefixed
    state.stats.col2Val = payload.data.comment_karma + payload.data.link_karma
    state.stats.col3Val = payload.data.subreddit.subscribers
    state.stats.col4Val = payload.data.num_friends
   }
   setTimeout(() => {
     state.profile.isLoaded = true     
   }, 1500)
  },
  setVotes(state, payload){
    let index = state.threads.thread.findIndex(x => x.data.name == payload.id);
    console.log(index)
    state.threads.thread[index].data.likes = payload.likes
    state.threads.thread[index].data.ups = payload.ups
  },

  setRequested(state){
    state.profile.requested = false
  },
}

const actions = {
  async fetchThreads (context, payload) {
    if(state.threads.requested_at < new Date().getTime()){
      return ExternalService.feedsReddit(payload)
      .then(feeds => {
        console.log(feeds)
        context.commit('setThreads', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  async fetchProfile (context, payload) {
    if(!state.profile.requested){
      return ExternalService.profilesReddit()
      .then(profiles => {
        context.commit('setProfile', profiles)
      })
      .catch(error => {
        console.log(error)
        context.commit('setProfile', error)
      })
    }
  },
  postVotes (context, payload) {
    return ExternalService.voteReddit(payload)
    .then(result => {
      console.log(result)
      context.commit('setVotes', payload)
    })
    .catch(error => {
      console.log(error)
    })
  },
  
  postCommentReddit (context, payload) {
    return ExternalService.commentReddit(payload)
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
  },

  unlinkReddit (context, payload) {
    return ExternalService.redditUNLINK()
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
