<template>
  <!-- Social Add-Ons -->
  <section class="container">
    <div class="intro column is-8 is-offset-2">
      <h2 class="title">Link Accounts</h2><hr>
      <!--<h1>twitter is loaded = {{ isLoaded.twitter }} and twitter is linked = {{ isLoaded.hasTwitterLinked }}</h1>-->
      <!--<h1>twitch is loaded = {{ isLoaded.twitch }} and twitch is linked = {{ isLoaded.hasTwitchLinked }}</h1>-->
      <!--<h1>reddit is loaded = {{ isLoaded.reddit }} and REDDIT is linked = {{ isLoaded.hasRedditLinked }}</h1>-->
    </div>
    <div id="social" class="columns features">
      <!-- BEGIN TWITTER CARDS -->
      <transition name="fade" mode="out-in">
        <div class="column is-4"
             v-if="!isLoaded.twitter">
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
             v-if="isLoaded.twitter && isLoaded.hasTwitterLinked">
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
                 @click="unlinkTwitter">Unlink Twitter Account</a>
            </footer>
          </div>
        </div>
        <div class="column is-4 animated fadeIn"
             v-if="isLoaded.twitter && !isLoaded.hasTwitterLinked">
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
      </transition>
      <!-- END TWITTER CARDS -->



      <!-- BEGIN TWITCH CARDS -->
      <transition name="fade" mode="out-in">
        <div class="column is-4"
             v-if="!isLoaded.twitch">
          <div class="card is-shady card-equal-height">
            <header class="card-header">
              <p class="card-header-title is-centered">
                Checking for Twitch
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
             v-if="isLoaded.twitch && isLoaded.hasTwitchLinked">
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
                 @click="unlinkTwitch">Unlink Twitch Account</a>
            </footer>
          </div>
        </div>
        <div class="column is-4 animated fadeIn"
             v-if="isLoaded.twitch && !isLoaded.hasTwitchLinked">
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
      </transition>
      <!-- END TWITCH CARDS -->

      <!--  BEGIN REDDIT CARDS -->
      <transition name="fade" mode="out-in">
        <div class="column is-4"
             v-if="!isLoaded.reddit">
          <div class="card is-shady card-equal-height">
            <header class="card-header">
              <p class="card-header-title is-centered">
                Checking for Reddit
              </p>
            </header>
            <div class="card-content">
              <div class="content has-text-centered">
                <loading-progress
                  class="progress-twitter"
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
             v-if="isLoaded.reddit && isLoaded.hasRedditLinked">
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
                 @click="unlinkReddit">Unlink Reddit Account</a>
            </footer>
          </div>
        </div>
        <div class="column is-4 animated fadeIn"
             v-if="isLoaded.reddit && !isLoaded.hasRedditLinked">
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
      </transition>
      <!-- END REDDIT CARDS -->
    </div>
  </section>
  <!-- End Social Add-Ons -->
</template>

<script>
  import _ from 'lodash'
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
        isLoaded: {
          twitch: false,
          twitter: false,
          reddit: false,
          hasTwitterLinked: false,
          hasTwitchLinked: false,
          hasRedditLinked: false,
        },
        twitterImg: null,
        token: null,
        indeterminate: true,
        progress: 0,
        counterClockwise: false,
        hideBackground: false,
        linkedMessage: 'Looks like you have linked at least one account'
      }
    },
    mounted() {
      this.token = window.localStorage.getItem('token')
      this.getAccountInfo()
      let profile = ExternalService.feeds(window.localStorage.getItem('token'))
      console.log(profile)  
    },
    watch: {},
    computed: {},
    methods:{
      async getAccountInfo() {
        await UserService.getAccounts(this.token).then(res => {
          console.log(res)
          console.log('^^^^^^^^LynxMasters^^^^^^^^^^^')

          let twitterInfo = {
            endpoint: '/users/show.json?screen_name='+res.data.twitter.displayName,
            oauth_token: res.data.twitter.oauth_token,
            oauth_secret: res.data.twitter.oauth_secret,
            jwt: window.localStorage.getItem('token'),
            method: 'GET/' //If posting data method would be POST/
          }

          if (!_.isEmpty(res.data.twitter.oauth_secret)) {
            this.isLoaded.hasTwitterLinked = true
            ExternalService.twitterPOST(twitterInfo).then(response => {
              return response
            }).then((profile) => {
              console.log(profile.data)
              console.log('^^^^^^^^twitter^^^^^^^^^^^')
              this.accounts.twitter = profile.data
              this.normalizeImage(this.accounts.twitter.profile_image_url_https)
              this.isLoaded.twitter = true
            })
          } else {
            this.isLoaded.twitter = true
          }


          let twitchInfo = {
            endpoint: '/user?oauth_token='+res.data.twitch.access_token,
            access_token: res.data.twitch.access_token,
            jwt: window.localStorage.getItem('token'),
            method: 'GET/', //If posting data method would be POST/
            user_agent: navigator.userAgent
          }

          if (!_.isEmpty(res.data.twitch.access_token )) {
            this.isLoaded.hasTwitchLinked = true
            ExternalService.twitchPOST(twitchInfo).then(response => {
              return response
            }).then((profile) => {
              console.log(profile.data)
              console.log('^^^^^^^^twitch^^^^^^^^^^^')
              this.accounts.twitch = profile.data
              this.isLoaded.twitch = true
            })
          } else {
            this.isLoaded.twitch = true
          }


          let redditInfo = {
            endpoint: '/me',
            access_token: res.data.reddit.access_token,
            jwt: window.localStorage.getItem('token'),
            method: 'GET/', //If posting data method would be POST/
            user_agent: navigator.userAgent
          }

          if (!_.isEmpty(res.data.reddit.access_token)) {
            this.isLoaded.hasRedditLinked = true
            ExternalService.redditPOST(redditInfo).then(response => {
              return response
            }).then((profile) => {
              console.log(profile.data)
              console.log('^^^^^^^^reddit^^^^^^^^^^^')
              this.accounts.reddit = profile.data
              this.isLoaded.reddit = true
            })
          } else {
            this.isLoaded.reddit = true
          }

          if (this.isLoaded.hasTwitterLinked || this.isLoaded.hasTwitchLinked
            || this.isLoaded.hasRedditLinked) {
            this.proceedToProfile()
          }

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

      },  
      proceedToProfile() {
        this.$snackbar.open({
          message: this.linkedMessage,
          type: 'is-warning',
          position: 'is-top',
          actionText: 'Go To Profile',
          indefinite: true,
          onAction: () => {
            this.$toast.open({
              message: 'Redirecting to your profile',
              queue: false
            })
            this.$router.push('Profile')
          }
        })
      },
      async unlinkTwitter() {
        await ExternalService.twitterUNLINK(this.token).then(res => {
          console.log("unlinking twitter response....")
          console.log(res)
        })
      },
      async unlinkTwitch() {
        await ExternalService.twitchUNLINK(this.token).then(res => {
          console.log("unlinking twitch response....")
          console.log(res)
        })
      },
      async unlinkReddit() {
        await ExternalService.redditUNLINK(this.token).then(res => {
          console.log("unlinking reddit response....")
          console.log(res)
        })
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
