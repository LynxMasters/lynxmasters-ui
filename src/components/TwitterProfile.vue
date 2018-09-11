<template>
	<transition name="fade" mode="out-in">
        <div class="column is-4"
             v-if="!twitter.isLoaded">
          <div class="card is-shady card-equal-height">
            <header class="card-header">
              <p class="card-header-title is-centered">
                Checking for Twitter
              </p>
            </header>
            <div class="card-content">
              <div class="content has-text-centered">
                <loading></loading>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4 animated fadeIn"
             v-if="accounts.twitter.linked && twitter.isLoaded">
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
             v-if="!accounts.twitter.linked && twitter.isLoaded">
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
  import Loading from './Loading.vue'
  export default {
    name: 'TwitterProfile',
    
    props:{
    	accounts:{}
    },
    components: { 
      'loading': Loading
    },
    data() {
      return {
      	token: null,
      }
    },
    computed:{
    	twitter(){
        	return this.$store.getters['profiles/getTwitter']
      	},
    },
    created(){
 		this.token = window.localStorage.getItem('token')
    },
    mounted(){
    },
    methods:{

    	linkTwitter() {
        	window.location = process.env.TWITTER_URL + this.token
      	},
    	unlinkTwitter (context) {
        this.$store.commit('accounts/setFetched')
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