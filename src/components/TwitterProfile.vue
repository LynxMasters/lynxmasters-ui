<template>
	<transition name="fade" mode="out-in">
        <div class="column is-4"
             v-if="!isLoaded">
          <div class="card is-shady card-equal-height">
            <header class="card-header">
              <p class="card-header-title is-centered">
                Checking for Twitter
              </p>
            </header>
            <div class="card-content">
              <div class="content has-text-centered">
                <loading-progress
                  :progress="progress"
                  :indeterminate="indeterminate"
                  :counter-clockwise="counterClockwise"
                  :hide-background="hideBackground"
                  size="64"
                  rotate
                  fillDuration="2"
                  rotationDuration="1"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4 animated fadeIn"
             v-if="accounts.twitter.linked && isLoaded">
          <div class="card is-shady card-equal-height">
            <header class="card-header">
              <p class="card-header-title">
                <i class="fab fa-twitter fa-2x linked"></i>
                <span>
                Twitter Linked
              </span>
              </p>
            </header>
            <div class="card-image has-text-centered">
              <img :src="twitter.profile_image_url_https" class="twitter-img">
            </div>
            <div class="card-content">
              <div class="content">
                <h4 class="has-text-centered">@{{ twitter.screen_name }}</h4>
                <h5 class="has-text-centered">Followers: {{ twitter.followers_count }} Following: {{ twitter.friends_count }}</h5>
                <h5 class="has-text-centered">Date Created: {{ moment(twitter.created_at).format('YYYY-MM-DD') }}</h5>
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item is-light button"
                 @click="unlinkTwitter">Unlink Twitter Account</a>
            </footer>
          </div>
        </div>
        <div class="column is-4 animated fadeIn"
             v-if="!accounts.twitter.linked && isLoaded">
          <div class="card is-shady card-equal-height">
            <div class="card-image has-text-centered">
              <i class="fab fa-twitter fa-7x"></i>
            </div>
            <div class="card-content">
              <div class="content">
                <h4 class="has-text-centered">Twitter</h4>
                <p>Twitter is an online news and social networking service on which users post and interact with messages known as "tweets".</p>
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item is-primary button"
                 @click="linkTwitter">Link Twitter Account</a>
            </footer>
          </div>
        </div>
    </transition>
</template>
<script>
  import _ from 'lodash'
  export default {
    name: 'TwitterProfile',
    
    props:{
    	accounts:{}
    },
    data() {
      return {
      	token: null,
      	isLoaded: true,
        indeterminate: true,
        progress: 0,
        counterClockwise: false,
        hideBackground: false,
      }
    },
    computed:{
    	twitter(){
    		this.isLoaded = true
        	return this.$store.getters['profiles/getTwitter']
      	},
    },
    created(){
 		this.token = window.localStorage.getItem('token')
    },
    methods:{

    	linkTwitter() {
        	window.location = 'http://localhost:8081/auth/twitter?token=' + this.token
      	},
    	unlinkTwitter (context) {
		    this.$store.commit('profiles/setRequested')
		    this.$store.dispatch('accounts/unlinkTwitter', this.token)
		    this.accounts.twitter.linked = false
  		},
    }
  }   
</script>
<style scoped type="scss">
  #social .column .card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  #social .column .card-footer {
    margin-top: auto;
  }
</style>