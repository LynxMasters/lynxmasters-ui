import Api from '@/services/Api'
const axios = require('axios')
export default{
	
	redditPOST(token, endpoint, body){
		const options = {
  			method: 'POST',
  			headers: { 'content-type': 'application/x-www-form-urlencoded',
  				'Authorization': 'bearer '+token 
  			 },
  			data: body,
  			url: 'https://oauth.reddit.com'+endpoint,
		};
	return axios(options);
	},
	
	redditGET(token, endpoint){
		const options = {
  			method: 'GET',
  			headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'bearer '+token
  			 },
  			url: 'https://oauth.reddit.com'+endpoint
		};
	return axios(options);
	},
}