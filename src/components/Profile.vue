<template>
  <div>Members Profile</div>
</template>

<script>	
export default {

    name: 'Profile',
    data: {},
    mounted: {
      function () {
        this.$nextTick(function () {
        
        })
      }  
    },
    watch: {},
    computed: {},
    methods:{

    	//TODO: TYLER use this as the curl functionality then call data.endpoint to return data on the front end

      	reddit() { 
        
   		},
    	twitch() {
        	window.location = 'http://localhost:8081/auth/twitch?token='+window.localStorage.getItem('token')
      	},
      	twitter() {
        	window.location ='http://localhost:8081/auth/twitter?token='+window.localStorage.getItem('token')
      	}  
    }
 }
</script>

<style scoped>

</style>