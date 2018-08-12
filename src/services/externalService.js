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

  twitchUNLK(info){   
  return Api().post('unlink/twitch', {data: info}, { headers: {'Authorization': info.jwt, 'Content-Type': 'application/json' } })
  }, 

  twitterUNLK(info){
  return Api().post('unlink/twitter', {data: info}, { headers: {'Authorization': info.jwt, 'Content-Type': 'application/json' } })
  },  

  redditUNLK(info){
  return Api().post('unlink/reddit', { data: info }, { headers: {'Authorization': info.jwt, 'Content-Type': 'application/json' } })
  },

  profiles(jwt){
  return Api().post('profiles', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },

  feeds(jwt){
  return Api().post('feeds', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },

  friends(jwt){
  return Api().post('feeds', { headers: {'Authorization': jwt, 'Content-Type': 'application/json' } })
  },
}

