import ExternalService from '@/services/externalService'

const state = {
  twitter:{
    len: 0,
    isLoaded: false,
    requested_at: 0,
    tweets:[
      {
        favorite_count: null,
        favorited: null,
        retweeted: null,
        retweet_count: null
      }
    ]
  },
  twitch:{
    len: 0,
    isLoaded: false,
    requested_at: 0,
  },
  reddit:{
    len: 0,
    isLoaded: false,
    requested_at: 0,
    threads:[
      {
        likes: null,
        ups: null
      }
    ],
    count: 0
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
}

const mutations = {
  setReddit (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.reddit.threads = payload.data.data.children
    state.reddit.len = payload.data.data.dist
   }
   state.reddit.isLoaded = true
   state.reddit.requested_at = new Date().getTime() + (5*60*1000)
  },
  setTwitch (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.twitch = payload.data.streams
    state.twitch.len  = payload.data.total
   }
   state.twitch.isLoaded = true
   state.twitch.requested_at = new Date().getTime() + (5*60*1000)
  },
  setTwitter (state, payload) {
   if(!payload.data.hasOwnProperty('error')){
    state.twitter.tweets = payload.data
    state.twitter.len = payload.data.length
   }
   state.twitter.isLoaded = true
   state.twitter.requested_at = new Date().getTime() + (5*60*1000)
  },
  setVotes(state, payload){
    let index = state.reddit.threads.findIndex(x => x.data.id == payload.id);
    console.log(index)
    state.reddit.threads[index].data.likes = payload.likes
    state.reddit.threads[index].data.ups = payload.ups
  },
  setFavorite(state, payload){
    let index = state.twitter.tweets.findIndex(x => x.id == payload.id);
    console.log(index)
    state.twitter.tweets[index].favorited = payload.favorited
    state.twitter.tweets[index].favorite_count = payload.favorite_count
  },
  setRetweet(state, payload){
    let index = state.twitter.tweets.findIndex(x => x.id == payload.id);
    console.log(index)
    state.twitter.tweets[index].retweeted = payload.retweeted
    state.twitter.tweets[index].retweet_count = payload.retweet_count
  }
}

const actions = {
  fetchReddit (context, payload) {
    if(state.reddit.requested_at < new Date().getTime()){
      return ExternalService.feedsReddit(payload)
      .then(feeds => {
        console.log(feeds)
        context.commit('setReddit', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  fetchTwitch (context, payload) {
    if(state.twitch.requested_at < new Date().getTime()){
      return ExternalService.feedsTwitch(payload)
      .then(feeds => {
        context.commit('setTwitch', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  fetchTwitter (context, payload) {
    if(state.twitter.requested_at < new Date().getTime()){
      return ExternalService.feedsTwitter(payload)
      .then(feeds => {
        console.log(feeds)
        context.commit('setTwitter', feeds)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  postVotes (context, payload) {
    if(state.twitter.requested_at < new Date().getTime()){
      return ExternalService.votesReddit(payload.id)
      .then(result => {
        console.log(result)
        context.commit('setVotes', paload)
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
