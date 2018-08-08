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
  			url: 'https://api.twitch.tv'+ endpoint+'?oauth_token='+token
		};
	return axios(options);
	},	
}

//curl -H 'Accept: application/vnd.twitchtv.v5+json' -H 'Authorization: OAuth token'-X 'GET https://api.twitch.tv/kraken'