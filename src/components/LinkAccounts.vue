<template>
   <div>
            
           
            <button v-on:click="reddit" class="button--reddit">Auth reddit</button>
            <button v-on:click="twitch" class="button--twitch">Auth twitch</button>
            <button v-on:click="twitter" class="button--twitter">Auth twitter</button>   
                
  </div>
</template>
<script>
import _ from 'lodash'
export default{
        methods:{

          twitter: function() {
            alert("pressed");
            window.location = 'http://localhost:9999/auth/twitter';
          },
          reddit: function() {
            alert("pressed");
            window.location = 'http://localhost:9999/auth/reddit';
          },
          twitch: function() {
            alert("pressed");
            window.location = 'http://localhost:9999/auth/twitch';
          }
        }
}        
</script>

<style scoped type="scss">
  .no-display {
    display: block!important;
  }
</style>
