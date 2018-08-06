import Api from '@/services/Api'
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
	
	redditGET(info){
		const options = {
  			method: 'GET',
  			headers: { 'content-type': 'application/x-www-form-urlencoded',
  				'Authorization': 'bearer '+info.token
  			 },
  			url: 'https://oauth.reddit.com'+info.endpoint
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