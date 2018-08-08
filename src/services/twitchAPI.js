const axios = require('axios')
export default{
	
	twitchPOST(info){
		const options = {
  			method: 'POST',
  			headers: { 'Accept': 'application/vnd.twitchtv.v5+json', 
  				'Authorization': 'Oauth '+info.token 
  			 },
  			data: info.data,
  			url: 'https://api.twitch.tv/kraken'+info.endpoint
		};
	return axios(options);
	},

	twitchGET(endpoint){
		const options = {
  			method: 'GET',
  			url: 'https://api.twitch.tv/kraken'+endpoint
		};
	return axios(options);
	},	
}

//curl -H 'Accept: application/vnd.twitchtv.v5+json' -H 'Authorization: OAuth token'-X 'GET https://api.twitch.tv/kraken'