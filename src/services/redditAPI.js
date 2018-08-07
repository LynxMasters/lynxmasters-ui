import Api from '@/services/Api'
const axios = require('axios')
export default{
	
	redditPOST(info){
		const options = {
  			method: 'POST',
  			headers: { 'content-type': 'application/x-www-form-urlencoded',
  				'Authorization': 'bearer '+info.token 
  			 },
  			data: info.data,
  			url: 'https://oauth.reddit.com'+info.endpoint,
		};
	axios(options);
	},
	
	redditGET(token, endpoint){
		const options = {
  			method: 'GET',
  			headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'bearer '+token
  			 },
  			url: 'https://oauth.reddit.com'+endpoint
		};
	axios(options);
	},
		redditAuthenticate(){
		const options = {
  			method: 'GET',
  			headers: { 'content-type': 'application/x-www-form-urlencoded',
  				'Authorization': 'Basic '+window.localStorage.getItem('token')  
  			 },
  			data: '',
  			url: Api+'/auth/reddit/callback',
		};
	axios(options);
	},
}