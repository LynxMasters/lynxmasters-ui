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
  // import services here...
  import OuathService from '@/services/Oauth'
  
  export default {
    name: 'LinkAccounts',
    data: {
      code: ''
      
    },
    beforeRouteEnter(to, from, next) {
      if(Object.keys(to.query).length !== 0) { //if the url has query (?query)
        next(vm => {
         vm.code = to.query.code //reddit
         vm.token = to.query.token //twitch
         console.log(vm.code)
         console.log(vm.token)
         OuathService.authReddit(vm.code).then(res => {
          console.log(res);
        })
       })
      }
    next()
    },
    watch: {},
    computed: {},
    methods:{
    

      twitter() {
        window.location = ''
      },
      reddit() {
        window.location = 'https://www.reddit.com/api/v1/authorize?client_id=h9NwYUZGn65RJw&response_type=code&state=fdsfsdfasff&redirect_uri=http://localhost:8080/LinkAccounts&scope=identity,edit,flair,history,modconfig,modflair,modlog,modposts,modwiki,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote'

      },
      twitch() {
        window.location = 'https://id.twitch.tv/oauth2/authorize?client_id=b83413k7rg3fstv11tx5v7elta4t6l&redirect_uri=http://localhost:8080/LinkAccounts&response_type=token&scope=user_read+viewing_activity_read+openid&force_verify=true'
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
