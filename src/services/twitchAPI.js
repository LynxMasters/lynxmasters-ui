const axios = require('axios')
export default{
	
	twitchPOST(info){
		const options = {
  			method: 'POST',
  			headers: { 'Accept': 'application/vnd.twitchtv.v5+json', 
  				'Authorization': 'Oauth '+info.token 
  			 },
  			data: info.data,
  			url: 'https://api.twitch.tv/kraken'+ info.endpoint
		};
	axios(options);
	},

	twitchGET(token, endpoint){
		const options = {
  			method: 'GET',
  			headers: { 'Accept': 'application/vnd.twitchtv.v5+json',
        'content-type': 'application/x-www-form-urlencoded', 
  			'Authorization': 'Oauth '+token 
  			},
  			url: 'https://api.twitch.tv'+ endpoint
		};
	axios(options);
	},

	twitchAuthenticate(){
		const options = {
  			method: 'GET',
  			headers: { 'content-type': 'application/x-www-form-urlencoded',
  				'Authorization': 'Basic '+window.localStorage.getItem('token')  
  			 },
  			data: '',
  			url: Api+'/auth/twicth/callback',
		};
	axios(options);
	}	
}