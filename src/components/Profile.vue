<template>
<section class="profile animated fadeIn">
  <div class="columns">
    <div class="column">
      <div class="container">
        <div class="columns is-centered">
        <profileCard :accounts="accounts"></profileCard>
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
          <div class='all' v-for="i in 50">
            <reddit v-if="i < threadsLen && i == 1" :thread="threads[0]"></reddit>
            <twitch v-if="i <= streamsLen && i == 1" :stream="streams[0]"></twitch>
            <twitter v-if="i < tweetsLen && i == 1" :tweet="tweets[0]"></twitter>
            <reddit v-if="i < threadsLen && i >= 1" :thread="threads[i]"></reddit>
            <twitch v-if="i < streamsLen && i >= 1" :stream="streams[i]"></twitch>
            <twitter v-if="i < tweetsLen && i >= 1" :tweet="tweets[i]"></twitter>
          </div>
          </b-tab-item>
          <b-tab-item v-if="accounts.twitter.oauth_token != null">
          <template slot="header">
          <b-icon class="fab fa-twitter"></b-icon>
          <span> Twitter</span>
          </template>
          <twitter :tweet="tweet" v-for="tweet in tweets" :key="tweet.id"></twitter>
          </b-tab-item>
          <b-tab-item v-if="accounts.twitch.access_token != null">
          <template slot="header">
          <b-icon class="fab fa-twitch"></b-icon>
          <span> Twitch</span>
          </template>
          <twitch :stream="stream" v-for="stream in streams" :key="stream.id"></twitch>
          </b-tab-item>
          <b-tab-item v-if="accounts.reddit.access_token != null">
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
import ProfileCard from './ProfileAvatar.vue'
import Twitter from './Tweets.vue'
import Reddit from './Threads.vue'
import Twitch from './Streams.vue'


export default {

    components: { 
      'profileCard': ProfileCard,
      'twitter': Twitter,
      'reddit': Reddit,
      'twitch': Twitch,
    },
    name: 'Profile',
    data() {
      return {
        activeTab: 0,
        accounts:{},
        tweets: {},
        threads:{},
        streams:{},
        tweetsLen: 0,
        threadsLen: 0,
        streamsLen: 0,
        
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
          this.accounts = res.data
          console.log(res)
          return ExternalService.feeds(this.token)
        })
        .then(feed => {
          console.log(feed)
          this.tweets = feed.data.twitter
          this.streams = feed.data.twitch.streams
          this.threads = feed.data.reddit.data.children
          this.tweetsLen = Object.keys(this.tweets).length
          console.log(this.tweetsLen)
          this.threadsLen = Object.keys(this.threads).length
          console.log(this.threadsLen)
          this.streamsLen = Object.keys(this.streams).length
          console.log(this.streamsLen)
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
  .all{
    padding-top: 1em;
    padding-bottom: 1em;    
    border-top: 1px solid rgba(219, 219, 219, 0.5);
  }
</style>
