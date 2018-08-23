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
              <twitch :stream="stream" v-for="stream in streams" :key="stream.id"></twitch>
              <reddit :thread="thread" v-for="thread in threads" :key="thread.id">
              </reddit>
              <twitter :tweet="tweet" v-for="tweet in tweets" :key="tweet.id"></twitter>
            </b-tab-item>
            <b-tab-item>
            <template slot="header">
            <b-icon class="fab fa-twitter"></b-icon>
            <span> Twitter</span>
            </template>
            <twitter :tweet="tweet" v-for="tweet in tweets" :key="tweet.id"></twitter>
            </b-tab-item>
            <b-tab-item>
            <template slot="header">
            <b-icon class="fab fa-twitch"></b-icon>
            <span> Twitch</span>
            </template>
            <twitch :stream="stream" v-for="stream in streams" :key="stream.id"></twitch>
              </b-tab-item>
              <b-tab-item>
              <template slot="header">
              <b-icon class="fab fa-reddit"></b-icon>
              <span> Reddit</span>
              </template>
              <reddit :thread="thread" v-for="thread in threads" :key="thread.id">
              </reddit>
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
import Twitter from './Tweets.vue'
import Reddit from './Threads.vue'
import Twitch from './Streams.vue'


export default {

    components: { 
      'twitter': Twitter,
      'reddit': Reddit,
      'twitch': Twitch,
    },
    name: 'Profile',
    data() {
      return {
        activeTab: 0,
        tweets: {},
        threads:{},
        streams:{},
        tweetsLen: 0,
        threadsLen: 0,
        streamsLen: 0,
        total: 0,
        
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
          // this.tweetsLen = Object.keys(this.tweets).length
          // console.log(this.tweetsLen)
          // this.threadsLen = Object.keys(this.threads).length
          // this.streamsLen = Object.keys(this.streams).length
          // this.total = this.tweetsLen + this.threadsLen + this.streamsLen
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
  .tweetBtn{
    padding-left: 1.4em;
  }
</style>
