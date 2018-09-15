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
  stats:{
    posts: 168,
    followers: 334,
    following: 99,
    likes: 269,
    col1: "Posts",
    col2: "Likes",
    col3: "Followers",
    col4: "Following",
  }
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
  getStats(state){
    return state.stats
  },
}

const mutations = {

  setReddit (state, payload) {
   state.reddit.profile = payload.data
   if(payload.data.hasOwnProperty('icon_img')){
   state.reddit.profile.icon_img = payload.data.icon_img.replace(/(amp;)+/g, "")
   }
   setTimeout(() => {
     state.reddit.isLoaded = true
     state.reddit.fetched = true     
   }, 1500)
  },

  setTwitch (state, payload) {
   state.twitch.profile = payload.data
   setTimeout(() => {
     state.twitch.isLoaded = true
     state.twitch.fetched = true     
   }, 1500)
  },

  setTwitter (state, payload) {
   state.twitter.profile = payload.data
   if(payload.data.hasOwnProperty('profile_image_url_https')){
   state.twitter.profile.profile_image_url_https = payload.data.profile_image_url_https.replace(/_normal/g, "")
   }
   setTimeout(() => {
     state.twitter.isLoaded = true
     state.twitter.fetched = true     
   }, 1500)
  },

  setRequested(state, payload){
    state.fetched = false
  },
  setStats(state, payload){
    if(payload == 0){
      state.stats.posts = Math.floor(Math.random() * 500) + 200;
      state.stats.likes = Math.floor(Math.random() * 900) + 400;
      state.stats.followers = Math.floor(Math.random() * 900) + 300;
      state.stats.following = Math.floor(Math.random() * 300) + 100;
      state.stats.col1 = "Posts"
      state.stats.col2 = "Likes"
      state.stats.col3 = "Followers"
      state.stats.col4 = "Following"
    }
    if(payload == 1){
      state.stats.posts = state.twitter.profile.screen_name
      state.stats.likes = state.twitter.profile.favourites_count
      state.stats.followers = state.twitter.profile.followers_count
      state.stats.following= state.twitter.profile.friends_count
      state.stats.col1 = "Screen Name"
      state.stats.col2 = "Likes"
      state.stats.col3 = "Followers"
      state.stats.col4 = "Following"
    }
    if(payload == 2){
      state.stats.posts = state.twitch.profile.display_name
      state.stats.likes = state.twitch.profile.bio
      state.stats.followers = Math.floor(Math.random() * 100) + 1;
      state.stats.following = Math.floor(Math.random() * 100) + 1;
      
      state.stats.col1 = "Screen Name"
      state.stats.col2 = "Bio"
      state.stats.col3 = "Followers"
      state.stats.col4 = "Following"
    }
    if(payload == 3){
      state.stats.posts = state.reddit.profile.subreddit.display_name_prefixed
      state.stats.likes = state.reddit.profile.comment_karma
      state.stats.followers = state.reddit.profile.subreddit.subscribers
      state.stats.following = state.reddit.profile.num_friends  
      state.stats.col1 = "Screen Name"
      state.stats.col2 = "Karma"
      state.stats.col3 = "Followers"
      state.stats.col4 = "Following"
    }
  }
}

const actions = {
  async fetchReddit (context, payload) {
    if(!state.reddit.fetched){
      return ExternalService.profilesReddit()
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
      return ExternalService.profilesTwitch()
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
      return ExternalService.profilesTwitter()
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
