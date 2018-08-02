import axios from 'axios'

export default {
  
  authReddit(code) {
   let auth = 'h9NwYUZGn65RJw : vOGJ1itvyfWHE_ZxiA5kYKGWl-Q';
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
}
