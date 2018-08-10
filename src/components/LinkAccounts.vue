<template>
  <!-- Social Add-Ons -->
  <section class="container">
    <div class="intro column is-8 is-offset-2">
      <h2 class="title">Link Accounts</h2><hr>
    </div>

    <div id="social" class="columns features">
      <div class="column is-4">
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
            <img :src="twitterImg" class="twitter-img">
          </div>
          <div class="card-content">
            <div class="content">
              <h4 class="has-text-centered">@{{ accounts.twitter.screen_name }}</h4>
              <h5 class="has-text-centered">Followers: {{ accounts.twitter.followers_count }} Following:  {{ accounts.twitter.friends_count }}</h5>
              <h5 class="has-text-centered">Date Created: {{ moment(accounts.twitter.created_at).format('YYYY-MM-DD') }}</h5>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item is-light button"
               @click="">Unlink Twitter Account</a>
          </footer>
        </div>
      </div>
      <div class="column is-4">
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
            <img :src="accounts.twitch.logo">
          </div>
          <div class="card-content">
            <div class="content">
              <h4 class="has-text-centered">@{{ accounts.twitch.display_name }}</h4>
              <h5 class="has-text-centered">Bio: {{ accounts.twitch.bio }}</h5>
              <h5 class="has-text-centered">Date Created: {{ moment(accounts.twitch.created_at).format('YYYY-MM-DD') }}</h5>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item is-light button"
               @click="">Unlink Twitch Account</a>
          </footer>
        </div>
      </div>
      <div class="column is-4">
        <div class="card is-shady card-equal-height">
          <header class="card-header">
            <p class="card-header-title">
              <i class="fab fa-reddit fa-2x linked"></i>
              <span>
                Reddit Linked
              </span>
            </p>
          </header>
          <div class="card-image has-text-centered">
            <img :src="accounts.reddit.icon_img">
          </div>
          <div class="card-content">
            <div class="content">
              <h4 class="has-text-centered">@{{ accounts.reddit.name }}</h4>
              <h5 class="has-text-centered">{{ accounts.reddit.link_karma }} Post Karma</h5>
              <h5 class="has-text-centered">{{ accounts.reddit.comment_karma }} Comment Karma</h5>
              <h5 class="has-text-centered">Date Created: {{ moment.unix(accounts.reddit.created).format('YYYY-MM-DD') }}</h5>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item button is-light"
               @click="">Unlink Reddit Account</a>
          </footer>
        </div>
      </div>
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
  import ExternalService from '@/services/externalService'

  export default {
    name: 'LinkAccounts',
    data() {
      return {
        accounts: {
          twitch: {},
          twitter: {},
          reddit: {}
        },
        twitterImg: null,
        hasTwitterLinked: false,
        hasTwitchLinked: false,
        hasRedditLinked: false,
        token: null
      }
    },
    mounted() {
      this.token = window.localStorage.getItem('token')
      this.getAccountInfo()
        
    },
    watch: {},
    computed: {},
    methods:{
      async getAccountInfo() {
        await UserService.getAccounts(this.token).then(res => {
          console.log(res)
          console.log('^^^^^^^^LynxMasters^^^^^^^^^^^')

          let redditInfo = {
            endpoint: '/me',
            access_token: res.data.reddit.access_token,
            jwt: window.localStorage.getItem('token'),
            method: 'GET/', //If posting data method would be POST/
            user_agent: navigator.userAgent
          }

          ExternalService.redditPOST(redditInfo).then(response => {
            return response
          }).then((profile) => {
            console.log(profile.data)
            console.log('^^^^^^^^reddit^^^^^^^^^^^')
            this.accounts.reddit = profile.data
          })

          let twitchInfo = {
            endpoint: '/user?oauth_token='+res.data.twitch.access_token,
            access_token: res.data.twitch.access_token,
            jwt: window.localStorage.getItem('token'),
            method: 'GET/', //If posting data method would be POST/
            user_agent: navigator.userAgent
          }

          ExternalService.twitchPOST(twitchInfo).then(response => {
            return response
          }).then((profile) => {
            console.log(profile.data)
            console.log('^^^^^^^^twitch^^^^^^^^^^^')
            this.accounts.twitch = profile.data
          })

          let twitterInfo = {
            endpoint: '/users/show.json?screen_name='+res.data.twitter.displayName,
            oauth_token: res.data.twitter.oauth_token,
            oauth_secret: res.data.twitter.oauth_secret,
            jwt: window.localStorage.getItem('token'),
            method: 'GET/' //If posting data method would be POST/
          }

          ExternalService.twitterPOST(twitterInfo).then(response => {
            return response
          }).then((profile) => {
            console.log(profile.data)
            console.log('^^^^^^^^twitter^^^^^^^^^^^')
            this.accounts.twitter = profile.data
            this.normalizeImage(this.accounts.twitter.profile_image_url_https)
          })

        })
      },
      normalizeImage(img) {
        let regex = /(_normal)+/g
        this.twitterImg = img.replace(regex, "")
      },
      reddit() {
        window.location = 'http://localhost:8081/auth/reddit?token=' + this.token
      },
      twitch() {
        window.location = 'http://localhost:8081/auth/twitch?token=' + this.token
      },
      twitter() {
        window.location ='http://localhost:8081/auth/twitter?token=' + this.token
      },
      redditUNLK() {
        
      },
      twitchUNLK() {
        
      },
      twitterUNLK() {
        
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
