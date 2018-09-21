const axios = require('axios')
import Api from '@/services/Api'

export default{

  twitchUNLINK(){   
  return Api().post('unlink/twitch', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  }, 

  twitterUNLINK(){
  return Api().post('unlink/twitter', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },  

  redditUNLINK(){
  return Api().post('unlink/reddit', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },

  profilesReddit(){
  return Api().get('profiles/reddit', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },

  profilesTwitch(){
  return Api().get('profiles/twitch', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },

  profilesTwitter(){
  return Api().get('profiles/twitter', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },

  feedsReddit(){
  return Api().get('feeds/reddit', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },

  feedsTwitch(){
  return Api().get('feeds/twitch', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },

  feedsTwitter(){
  return Api().get('feeds/twitter', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
  commentsReddit(id36){
  return Api().get('comments/reddit?id36='+id36, { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
  membersReddit(username){
  return Api().get('members/reddit?username='+username, { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
  membersTwitch(username){
  return Api().get('members/twitch?username='+username, { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
  membersTwitter(username){
  return Api().get('members/twitter?username='+username, { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
  voteReddit(vote){
  return Api().post('vote/reddit', {data: vote}, { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
  commentReddit(comment){
  return Api().post('comment/reddit', {data: comment}, { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
  commentTwitter(comment){
  return Api().post('comment/twitter', {data: comment}, { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
  retweetTwitter(retweet){
  return Api().post('retweet/twitter', {data: retweet}, { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
  favoriteTwitter(favorite){
  return Api().post('favorite/twitter', {data: favorite}, { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
  feedsRedditMore(id36){
  return Api().get('feeds/reddit/more?=id36'+id36, { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
}

