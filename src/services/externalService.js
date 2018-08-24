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

  profiles(jwt){
  return Api().get('profiles', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },

  feeds(jwt){
  return Api().get('feeds', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },

  friends(jwt){
  return Api().get('freinds', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },
}

