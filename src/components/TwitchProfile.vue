<template>
  <transition name="fade" mode="out-in">
        <div class="column is-4"
             v-if="!twitch.isLoaded">
          <div class="card is-shady card-equal-height">
            <header class="card-header">
              <p class="card-header-title is-centered">
                Checking for Twitch
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
             v-if="twitch.isLoaded && accounts.twitch.linked">
          <div class="card is-shady card-equal-height">
            <header class="card-header">
              <p class="card-header-title">
                <i class="fab fa-twitch fa-2x linked"></i>
                <span>
                Twitch Linked
              </span>
              </p>
            </header>
            <div class="card-image has-text-centered">
              <img :src="twitch.logo">
            </div>
            <div class="card-content">
              <div class="content">
                <h4 class="has-text-centered">  {{ twitch.display_name }}</h4>
                <h5 class="has-text-centered">Bio: {{ twitch.bio }}</h5>
                <h5 class="has-text-centered">Date Created: {{ moment(twitch.created_at).format('YYYY-MM-DD') }}</h5>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item is-light button"
                 @click="unlinkTwitch">Unlink Twitch Account</a>
            </footer>
          </div>
        </div>
        <div class="column is-4 animated fadeIn"
             v-if="twitch.isLoaded && !accounts.twitch.linked">
          <div class="card is-shady card-equal-height">
            <div class="card-image has-text-centered">
              <i class="fab fa-twitch fa-7x"></i>
            </div>
            <div class="card-content">
              <div class="content">
                <h4 class="has-text-centered">Twitch</h4>
                <p>The community where millions of people and thousands of interests collide in a beautiful explosion of video games, pop culture, and conversation. With chat built into every stream, you don’t just watch on Twitch, you’re a part of the show. From classic tv show marathons to esports tournaments, if you can imagine it, it’s probably live on Twitch right now.
                </p>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item is-primary button"
                 @click="linkTwitch">Link Twitch Account</a>
            </footer>
          </div>
        </div>
  </transition>
</template>
<script>
  import Loading from './Loading.vue'
  export default {
    name: 'TwitchProfile',
    
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
      twitch(){
        return this.$store.getters['profiles/getTwitch']
      },
    },
    created(){
    this.token = window.localStorage.getItem('token')
    },
    mounted(){
    },
    methods:{

      linkTwitch() {
        window.location = 'http://localhost:8081/api/v1/auth/twitch?token=' + this.token
        //window.location = 'https://lynxmasters.com/api/v1/auth/twitch?token=' + this.token
      },

      unlinkTwitch (context) {
        this.$store.commit('accounts/setFetched')
        this.$store.commit('profiles/setRequested')
        this.$store.dispatch('accounts/unlinkTwitch', this.token)
        this.accounts.twitch.linked = false
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