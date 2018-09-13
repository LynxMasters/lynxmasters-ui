const axios = require('axios')
import Api from '@/services/Api'

export default{
	
	twitchPOST(info){   
	return Api().post('twitch'+info.method, {data: info}, { headers: {'Authorization': info.jwt, 'Content-Type': 'application/json' } })
	}, 

  twitterPOST(info){
  return Api().post('twitter'+info.method, {data: info}, { headers: {'Authorization': info.jwt, 'Content-Type': 'application/json' } })
  }, 	

  redditPOST(info){
  return Api().post('reddit'+info.method, { data: info }, { headers: {'Authorization': info.jwt, 'Content-Type': 'application/json' } })
  },

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
  votesReddit(jwt, payload){
  return Api().post('votes/reddit', {data: payload}, { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  }
}

