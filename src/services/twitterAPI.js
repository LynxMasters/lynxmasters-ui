const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');
export default{
	
	twitterPOST(info){
		const oauth = OAuth({
 			consumer: {
    			key: 'xvz1evFS4wEEPTGEFPHBog',
    			secret: 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw'
  			},
  			signature_method: 'HMAC-SHA1',
  			hash_function(base_string, key) {
    			return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
  			}	
		});
 
		const request_data = {
  			url: 'https://api.twitter.com/1.1/'+info.endpoint,
  			method: 'POST',
  			data: info.data
		};
 
		const token = {
  			key: info.token, 
  			secret: into.secret
		};

		const options = {
  			method: 'POST',
  			data: oauth.authorize(request_data, token),
  			url = request_data.url
		};
	axios(options);
	},
	
	twitterGET(info){
		const oauth = OAuth({
 			consumer: {
    			key: 'xvz1evFS4wEEPTGEFPHBog', //not the real client id or client secret
    			secret: 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw'
  			},
  			signature_method: 'HMAC-SHA1',
  			hash_function(base_string, key) {
    			return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
  			}	
		});
 
		const request_data = {
  			url: 'https://api.twitter.com/1.1/'+info.endpoint,
  			method: 'GET',
  			data: ''
		};
 
		const token = {
  			key: info.token, 
  			secret: into.secret
		};

		const options = {
  			method: 'GET',
  			data: oauth.authorize(request_data, token),
  			url = request_data.url
		};
	axios(options);
	}
}