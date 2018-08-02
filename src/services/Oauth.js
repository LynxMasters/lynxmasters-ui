import axios from 'axios'

export default {
  
  authReddit(code) {
  	let config = {
  		headers: {
  			
  			'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
  			'Access-Control-Allow-Origin': 'http://localhost:8080',
    		'Authorization': 'Basic h9NwYUZGn65RJw:vOGJ1itvyfWHE_ZxiA5kYKGWl-Q'
    	    
  		}
  	}
	let data = {
  		grant_type: 'authorizationcode',
    	code: code,
    	redirect_uri: 'http://localhost:8080/LinkAccounts'
	}
	let url = 'https://www.reddit.com/api/v1/access_token'

    axios.post(url, data, config);
  },
}
