<template>
  <section class="profile animated fadeIn">
    <div class="columns">
      <div class="column">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-3">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title is-centered card-name is-primary">
                    Username
                  </p>
                </header>
                <div class="card-image">
                  <div class="image players-avatar">
                    <img src="http://via.placeholder.com/150x150" alt="Profile Avatar">
                  </div>
                </div>
                <div class="card-content">
                  <div class="content has-text-centered">
                    <div class="field">
                      <label class="label">Username</label>
                    </div>
                    <div class="field has-addons">
                      <div class="control">
                        <label class="label">Followers: </label>
                      </div>
                      <div class="control">
                        <label class="label">Following: </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-content">
                  <div class="content has-text-centered">
                    <router-link v-bind:to="{ name: 'LinkAccounts' }"
                                 class="member-linked-accounts" exact>
                      <i class="fab fa-twitter fa-2x"></i>
                    </router-link>
                    <router-link v-bind:to="{ name: 'LinkAccounts' }"
                                 class="member-linked-accounts" exact>
                      <i class="fab fa-twitch fa-2x"></i>
                    </router-link>
                    <router-link v-bind:to="{ name: 'LinkAccounts' }"
                                 class="member-linked-accounts" exact>
                      <i class="fab fa-reddit fa-2x"></i>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-7 tab-top">
              <b-tabs size="is-medium"
                      position="is-centered"
                      type="is-boxed"
                      v-model="activeTab">
                <b-tab-item>
                  <template slot="header">
                    <b-icon class="fas fa-align-justify"></b-icon>
                    <span> All</span>
                  </template>
                  <div>ALL FEEDS GO HERE</div>
                </b-tab-item>
                <b-tab-item>
                  <template slot="header">
                    <b-icon class="fab fa-twitter"></b-icon>
                    <span> Twitter</span>
                  </template>
                  <article class="media" v-for="tweet in tweets" :key="tweet.id">
<figure class="media-left">
    <p class="image is-64x64">
      <img v-bind:src="tweet.user.profile_image_url">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{{tweet.user.name}}</strong> <small>@{{tweet.user.screen_name}}</small> <small>{{ moment.unix(tweet.created_at).format('MM-DD-YYYY') }}</small>
        <br>
        {{tweet.text}}
        <br>
        <img v-for="media in tweet.entities.media" :key="tweet.id" v-bind:src="media.media_url" height="500" width="500">
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-comment black"></i></span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-retweet black"></i></span>
          <span>{{tweet.retweet_count}}</span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-heart black"></i></span>
          <span>{{tweet.favorite_count}}</span>
        </a>
      </div>
    </nav>
  </div>
  <div class="media-right">
    <i class="fab fa-twitter fa-2x"></i>
  </div>
</article>
                 
                </b-tab-item>
                <b-tab-item>
                  <template slot="header">
                    <b-icon class="fab fa-twitch"></b-icon>
                    <span> Twitch</span>
                  </template>
                  <div>
                    <div class="columns medium-4" v-for="stream in streams" :key="stream.id">
                      <div class="card is-shady card-equal-height">
                        <header class="card-header">
                          <p class="card-header-title">
                            <span>
                              {{stream.channel.display_name}}
                            </span>
                            <i class="fab fa-twitch fa-2x"></i>
                          </p>
                        </header>
                        <div class="card-section">
                          <iframe v-bind:src="`http://player.twitch.tv/?channel=${stream.channel.name}&autoplay=false`"
                            height="500"
                            width="500"
                            frameborder="<frameborder>"
                            scrolling="<scrolling>"
                            allowfullscreen="<allowfullscreen>">
                        </iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-tab-item>
                <b-tab-item>
                  <template slot="header">
                    <b-icon class="fab fa-reddit"></b-icon>
                    <span> Reddit</span>
                  </template>
<article class="media" v-for="thread in threads">
<figure class="media-left">
  <a class="level-item">
  <i class="fas fa-arrow-up"></i>
  </a>
  <p>{{thread.data.ups}}</p>
   <a class="level-item">
  <i class="fas fa-arrow-down"></i>
  </a>
    <!-- <p class="image is-64x64">
      <img v-bind:src="tweet.user.profile_image_url">
    </p> -->
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>r/{{thread.data.subreddit}}</strong> <small>Posted by u/{{thread.data.author}}</small> <small>{{ moment.unix(thread.data.created).format('MM-DD-YYYY') }}</small>
        <br>
        <strong>{{thread.data.title}}</strong>
        <br>
        <div v-if="!thread.data.is_video" class="card-image has-text-centered">
                         <img v-bind:src="thread.data.url" height="500"
                            width="500">
                        </div>
                        <div v-if="thread.data.is_video" class="card-image has-text-centered">
                          <iframe v-bind:src="thread.data.secure_media.reddit_video.fallback_url"
                            height="500"
                            width="500"
                            frameborder="<frameborder>"
                            scrolling="<scrolling>"
                            allowfullscreen="<allowfullscreen>">
                          </iframe>
          </div>
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-comment"></i></span> 
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-share"></i></span>
        </a>
      </div>
    </nav>
  </div>
  <div class="media-right">
    <i class="fab fa-reddit fa-2x"></i>
  </div>
</article>

                  <!-- <div>
                    <div class="columns medium-4" v-for="thread in threads" :key="thread.id">
                      <div class="card is-shady card-equal-height">
                        <header class="card-header">
                          <p class="card-header-title">
                            <span>
                            r/{{thread.data.subreddit}}
                            </span>
                            <i class="fab fa-reddit fa-2x text-right"></i>
                          </p>
                        </header>
                        <div v-if="!thread.data.is_video" class="card-image has-text-centered">
                         <img v-bind:src="thread.data.url" height="500"
                            width="500">
                        </div>
                        <div v-if="thread.data.is_video" class="card-image has-text-centered">
                          <iframe v-bind:src="thread.data.secure_media.reddit_video.fallback_url"
                            height="500"
                            width="500"
                            frameborder="<frameborder>"
                            scrolling="<scrolling>"
                            allowfullscreen="<allowfullscreen>">
                          </iframe>
                        </div>
                        <div class="card-divider">
                          <p> {{thread.data.title}}</p>
                        </div>
                        <div class="card-section">
                        </div>
                      </div>
                    </div>
                  </div> -->
                </b-tab-item>
              </b-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserService from '@/services/UserService'
import ExternalService from '@/services/externalService'
export default {

    name: 'Profile',
    data() {
      return {
        activeTab: 0,
        tweets: {},
        threads:{},
        streams:{},
        all:{},
      }
    },
    mounted() {
      this.token = window.localStorage.getItem('token')
      this.getAccountInfo()
      
    },
    created () {
      this.checkAuthentication()
    },
    updated() {
      this.checkAuthentication()
    },
    watch: {},
    computed: {},
    methods: {

      async getAccountInfo() {
       await UserService.getAccounts(this.token).then(res => {
          console.log(res)
          return ExternalService.feeds(this.token)
        })
        .then(feed => {
          this.tweets = feed.data.twitter
          this.streams = feed.data.twitch.streams
          this.threads = feed.data.reddit.data.children 
          console.log(feed)
        })
      },

      checkAuthentication() {
        let existingToken =  window.localStorage.getItem('token')
        if (_.isEmpty(existingToken) ) {
          this.needsAuthWarning()
          this.$router.replace(this.$route.query.redirect || '/Login')
        }
      },

      needsAuthWarning() {
        this.$toast.open({
          duration: 3500,
          message: 'You need to be logged in to access that page!',
          position: 'is-top',
          type: 'is-danger'
        })
      },
    }
 }
</script>

<style scoped>
  .profile {
    padding-top: 1.5rem;
  }
  .member-linked-accounts {
    margin: 0 .5rem 0 .5rem;
  }
  .tab-top {
    margin: 3rem 0 0 0;
  }
</style>
