<template>
  <div>Members Profile</div>
</template>

<script>
  import reddit from '@/services/redditAPI'
  import twitch from '@/services/twitchAPI'	
  import twitter from '@/services/twitterAPI'		
  export default {

      name: 'Profile',
    data: {  
    },
    watch: {},
    computed: {},
    methods:{

    	//TODO: TYLER use this as the curl functionality then call data.endpoint to return data on the front end

      reddit() { 
          reddit.redditGET(token, enpoint).then(res => {
          	data = res.body
          })
      },
      twitch() {
        window.location = 'http://localhost:8081/auth/twitch?token='+window.localStorage.getItem('token')
      },
      twitter() {
        window.location ='http://localhost:8081/auth/twitter?token='+window.localStorage.getItem('token')
      }  
    }
  }
  }
</script>

<style scoped>

</style>
