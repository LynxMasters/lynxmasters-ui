const axios = require('axios')
import Api from '@/services/Api'
export default{
	
	twitchPOST(info){
    console.log(info.access_token)    
	return Api().post('twitch'+info.method, {data: info}, { headers: {'Authorization': info.jwt, 'Content-Type': 'application/json' } })
	},

  twitterPOST(info){
    console.log(info.data) 
    return Api().post('twitter'+info.method, {data: info}, { headers: {'Authorization': info.jwt, 'Content-Type': 'application/json' } })
  }, 	

  redditPOST(info){
    console.log(info) 
  return Api().post('reddit'+info.method, { data: info }, { headers: {'Authorization': info.jwt, 'Content-Type': 'application/json' } })
  }
}

