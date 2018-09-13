const axios = require('axios')
import Api from '@/services/Api'

export default{

  twitchUNLINK(jwt){   
  return Api().post('unlink/twitch', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  }, 

  twitterUNLINK(jwt){
  return Api().post('unlink/twitter', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },  

  redditUNLINK(jwt){
  return Api().post('unlink/reddit', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },

  profilesReddit(jwt){
  return Api().get('profiles/reddit', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },

  profilesTwitch(jwt){
  return Api().get('profiles/twitch', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },

  profilesTwitter(jwt){
  return Api().get('profiles/twitter', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },

  feedsReddit(jwt){
  return Api().get('feeds/reddit', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },

  feedsTwitch(jwt){
  return Api().get('feeds/twitch', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },

  feedsTwitter(jwt){
  return Api().get('feeds/twitter', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },
  commentsReddit(jwt, id36){
  return Api().get('comments/reddit?id36='+id36, { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },
  membersReddit(jwt, username){
  return Api().get('members/reddit?username='+username, { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },
  membersTwitch(jwt, username){
  return Api().get('members/twitch?username='+username, { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },
  membersTwitter(jwt, username){
  return Api().get('members/twitter?username='+username, { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },
  votesReddit(jwt, vote){
  return Api().post('vote/reddit', {data: vote}, { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },
  commentReddit(jwt, comment){
  return Api().post('comment/reddit', {data: comment}, { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },
  commentTwitter(jwt, comment){
  return Api().post('comment/twitter', {data: comment}, { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },
  retweetTwitter(jwt, retweet){
  return Api().post('retweet/twitter', {data: retweet}, { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },
  favoriteTwitter(jwt, favorite){
  return Api().post('favorite/twitter', {data: favorite}, { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  }
}

