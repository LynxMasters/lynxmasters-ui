<template>
  <!-- Social Add-Ons -->
  <section class="container">
    <div class="intro column is-8 is-offset-2">
      <h2 class="title">Link Accounts</h2><hr>
    </div>
    <div id="social" class="columns features">
      <div class="column is-4">
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
               @click="twitter">Link Twitter Account</a>
          </footer>
        </div>
      </div>
      <div class="column is-4">
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
               @click="twitch">Link Twitch Account</a>
          </footer>
        </div>
      </div>
      <div class="column is-4">
        <div class="card is-shady card-equal-height">
          <div class="card-image has-text-centered">
            <i class="fab fa-reddit fa-7x"></i>
          </div>
          <div class="card-content">
            <div class="content">
              <h4 class="has-text-centered">Reddit</h4>
              <p>Reddit is home to thousands of communities, endless conversation, and authentic human connection. Whether you're into breaking news, sports, TV fan theories, or a never-ending stream of the internet's cutest animals, there's a community on Reddit for you.</p>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item button is-primary"
               @click="reddit">Link Reddit Account</a>
          </footer>
        </div>
      </div>
    </div>
  </section>
  <!-- End Social Add-Ons -->
</template>

<script>
  import UserService from '@/services/UserService'
  import redditAPI from '@/services/redditAPI'
  import twitchAPI from '@/services/twitchAPI'
  import twitterAPI from '@/services/twitterAPI'

  export default {
    name: 'LinkAccounts',
    data:{}, 
    mounted() {
      let token = window.localStorage.getItem('token')
      UserService.getAccounts(token).then(res => {
        console.log(res.data);
        
        twitchAPI.twitchGET(res.data.twitch.access_token, '/kraken', function(res){
        console.log(hit)  
        console.log(res)
        })   
        twitterAPI.twitterGET(res.data.twitter.oauth_token, res.data.twitter.ouath_secret, '/users/show', function(res){
             console.log(res)
        })
        redditAPI.redditGET(res.data.reddit.access_token, '/api/v1/me', function(res){
            console.log(res)
        }) 

      })

    },
    watch: {},
    computed: {},
    methods:{

      reddit() { 
        window.location = 'http://localhost:8081/auth/reddit?token='+window.localStorage.getItem('token')   
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
