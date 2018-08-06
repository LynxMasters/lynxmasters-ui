export default{
	
	twitchPOST(info){
		const options = {
  			method: 'POST',
  			headers: { 'content-type': 'application/x-www-form-urlencoded', 
  				'Authorization': 'Oauth '+info.token 
  			 },
  			data: info.data,
  			url: 'https://api.twitch.tv/kraken'+ info.endpoint
		};
	axios(options);
	},

	twitchGET(info){
		const options = {
  			method: 'GET',
  			headers: { 'content-type': 'application/x-www-form-urlencoded', 
  			'Authorization': 'Oauth '+info.token 
  			},
  			url: 'https://api.twitch.tv/kraken'+ info.endpoint
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