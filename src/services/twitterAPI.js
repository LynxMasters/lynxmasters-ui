const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');
const axios = require('axios')
export default{
	
	twitterPOST(info){
		const oauth = OAuth({
 			consumer: {
    			key: 'xvz1evFS4wEEPTGEFPHBog',
    			secret: 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw'
  			},
  			signature_method: 'HMAC-SHA1',
  			hash_function(base_string, key) {
    			return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  			}	
		});
 
		const request_data = {
  			url: 'https://api.twitter.com/1.1'+info.endpoint,
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
  			url: request_data.url
		};
	axios(options);
	},
	
	twitterGET(tkn, secret, endpoint){
		const oauth = OAuth({
 			consumer: {
    			key: 'm9y0YNJfgwJafm5qKeMhu7xgC', 
    			secret: 'unSRzTB4KchtD1lb23zMn9xcWvErukoTtdjradDHp6YvGiND3g'
  			},
  			signature_method: 'HMAC-SHA1',
  			hash_function(base_string, key) {
          console.log()
    			return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  			}	
		});
 
		const request_data = {
  			url: 'https://api.twitter.com/1.1'+endpoint,
  			method: 'GET',
  			data: {}
		};
 
		const token = {
  			key: tkn, 
  			secret: secret
		};

		const options = {
  			method: 'GET',
        header:oauth.authorize(request_data, token),
  			url: request_data.url
		};  
  console.log(options)  
	axios(options);
	}
}