import ExternalService from '@/services/externalService'

const state = {
  
  tweets:{
    linked: false,
    len: 0,
    isLoaded: false,
    requested_at: 0,
    tweet:[
      {
        favorite_count: null,
        favorited: null,
        retweeted: null,
        retweet_count: null
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
    col2: "Likes",
    col3: "Followers",
    col4: "Following",
  }
}

const getters = {

  getTweets(state){
    return state.tweets
  },
  getProfile(state){
    return state.profile
  },
  getStats(state){
    return state.stats
  }
}

const mutations = {

  setTweets (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.tweets.tweet = payload.data
    state.tweets.len = payload.data.length
    state.tweets.linked = true
   }
   state.tweets.isLoaded = true
   state.tweets.requested_at = new Date().getTime() + (5*60*1000)
  },

  setProfile (state, payload) {
   state.profile.data = payload.data
   if(payload.data.hasOwnProperty('profile_image_url_https')){
     state.profile.data.profile_image_url_https = payload.data.profile_image_url_https.replace(/_normal/g, "")
     state.profile.linked = true 
     state.profile.requested = true
     state.stats.col1Val = payload.data.screen_name
     state.stats.col2Val = payload.data.favourites_count
     state.stats.col3Val = payload.data.followers_count
     state.stats.col4Val = payload.data.friends_count
   }
   setTimeout(() => {
     state.profile.isLoaded = true    
   }, 1500)
  },

  setFavorite(state, payload){
    let index = state.tweets.tweet.findIndex(x => x.id == payload.id);
    console.log(index)
    state.tweets.tweet[index].favorited = payload.favorited
    state.tweets.tweet[index].favorite_count = payload.favorite_count
  },

  setRetweet(state, payload){
    let index = state.tweets.tweet.findIndex(x => x.id == payload.id);
    console.log(index)
    state.tweets.tweet[index].retweeted = payload.retweeted
    state.tweets.tweet[index].retweet_count = payload.retweet_count
  },

  setRequested(state){
    state.profile.requested = false
  },
}

const actions = {
  
  async fetchTweets (context, payload) {
    if(state.tweets.requested_at < new Date().getTime()){
      return ExternalService.feedsTwitter(payload)
      .then(feeds => {
        console.log(feeds)
        context.commit('setTweets', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },

  async fetchProfile (context, payload) {
    if(!state.profile.requested){
      return ExternalService.profilesTwitter()
      .then(profiles => {
        context.commit('setProfile', profiles)
      })
      .catch(error => {
        context.commit('setProfile', error)
      })
    }
  },

  postComment (context, payload) {
    return ExternalService.commentTwitter(payload)
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
  },

  postRetweet (context, payload) {
    return ExternalService.retweetTwitter(payload)
    .then(result => {
      console.log(result)
      context.commit('setRetweet', payload)
    })
    .catch(error => {
      console.log(error)
    })
  },  

  postFavorite (context, payload) {
    return ExternalService.favoriteTwitter(payload)
    .then(result => {
      console.log(result)
      context.commit('setFavorite', payload)
    })
    .catch(error => {
      console.log(error)
    })
  },

  unlinkTwitter (context, payload) {
    return ExternalService.twitterUNLINK()
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
