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
                  <div>
                    <div class="columns medium-4" v-for="tweet in tweets" :key="tweet.id">
                      <div class="card is-shady card-equal-height">
                        <header class="card-header">
                          <p class="card-header-title">
                            <img v-bind:src="tweet.user.profile_image_url">
                            <span>
                            {{tweet.user.name}}
                            </span>
                            <i class="fab fa-twitter fa-2x "align-self="end"></i>
                          </p>
                        </header>
                        <div class="card-image has-text-centered">
                         -<!--<img v-bind:src="`${tweet.entities.media[0].media_url}`">-->
                        </div>
                        <div class="card-divider">
                          <p> {{tweet.text}}</p>
                        </div>
                        <div class="card-section">
                        </div>
                      </div>
                    </div>
                  </div>                  
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
                          <p>{{stream.channel.name}} </p>
                        <div class="card-section">
                          <iframe v-bind:src="`http://player.twitch.tv/?channel=${stream.channel.name}`"
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
                  <div>
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
                  </div>
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
import ExternalService from '@/services/externalService'
export default {

    name: 'Profile',
    data() {
      return {
        activeTab: 0,
        tweets: {},
        threads:{},
        streams:{},
      }
    },
    mounted() {
      this.token = window.localStorage.getItem('token')
      this.getFeed()
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

      async getFeed() {
        await ExternalService.feeds(this.token).then(res => {
          this.tweets = res.data.twitter
          this.threads = res.data.reddit.data.children
          this.streams = res.data.twitch.streams 
          console.log(res) 
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
