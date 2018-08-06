export default{
	redditPOST(){
		const options = {
  			method: 'POST',
  			headers: { 'content-type': 'application/x-www-form-urlencoded' },
  			data: qs.stringify(data),
  			url,
		};
	axios(options);
	},
	redditGET(){
		const options = {
  			method: 'GET',
  			headers: { 'content-type': 'application/x-www-form-urlencoded' },
  			data: qs.stringify(data),
  			url,
		};
	axios(options);
	}
}