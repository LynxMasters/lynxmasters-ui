export default{
	redditPOST(info){
		const options = {
  			method: 'POST',
  			headers: { 'content-type': 'application/x-www-form-urlencoded',
  				'Authorization': 'bearer '+info.token 
  			 },
  			data: info.data,
  			url = 'https://oauth.reddit.com'+info.endpoint,
		};
	axios(options);
	},
	
	redditGET(info){
		const options = {
  			method: 'GET',
  			headers: { 'content-type': 'application/x-www-form-urlencoded',
  				'Authorization': 'bearer '+info.token
  			 },
  			url = 'https://oauth.reddit.com'+info.endpoint
		};
	axios(options);
	}
}