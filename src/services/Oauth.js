import axios from 'axios'

export default {
  
  authReddit(code) {
   	let config = {
  		headers: {
  			'Accept': 'application/x-www-form-urlencoded',	
  		    'Content-Type': 'application/x-www-form-urlencoded',
    		'Authorization': 'Basic aDlOd1lVWkduNjVSSnc6dk9HSjFpdHZ5ZldIRV9aeGlBNWtZS0dXbC1R'    
  		}
  	}
	let data = 'grant_type=authorization_code&code='+code+'&redirect_uri=http://localhost:8080/LinkAccounts'
	
	let url = 'https://www.reddit.com/api/v1/access_token'

    axios.post(url, data, config);
  },
  authTwitter(code) {
   	let config = {
  		headers: {
  			'Accept': 'application/x-www-form-urlencoded',	
  		    'Content-Type': 'application/x-www-form-urlencoded',
  		    'Authorization': 'OAuth oauth_nonce=K7ny27JTpKVsTgdyLdDfmQQWVLERj2zAK5BslRsqyw, oauth_callback=http://localhost:8080/LinkAccounts, oauth_signature_method="HMAC-SHA1", oauth_timestamp=1300228849, oauth_consumer_key=m9y0YNJfgwJafm5qKeMhu7xgC, oauth_signature=Pc%2BMLdv028fxCErFyi8KXFM%2BddU%3D, oauth_version=1.0'
    		   
  		}
  	}
	let data = 'grant_type=authorization_code&code='+code+'&redirect_uri=http://localhost:8080/LinkAccounts'
	
	let url = 'https://www.reddit.com/api/v1/access_token'

    axios.post(url, data, config);
  },

}
