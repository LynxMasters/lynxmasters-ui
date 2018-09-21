<template>
<section class="profile animated fadeIn">
  <div class="columns is-centered">
    <div class="column is-7">
       <profileCard :isMember="false"></profileCard>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div class="container">
        <div class="columns is-centered">
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
           <div class="column is-12" v-if="!twitter.isLoaded || !twitch.isLoaded || !reddit.isLoaded">
            <div class="content has-text-centered">
               <loading></loading>
            </div>
          </div>
          <div v-else class='all'  v-for="i in 8">
            <reddit v-if="i < reddit.len && i == 1 && reddit.linked" :thread="reddit.thread[0]"></reddit>
            <twitch v-if="i < twitch.len && i == 1 && twitch.linked" :stream="twitch.stream[0]"></twitch>
            <twitter v-if="i < twitter.len && i == 1 && twitter.linked" :tweet="twitter.tweet[0]"></twitter>
            <reddit v-if="i < reddit.len && i >= 1 && reddit.linked" :thread="reddit.thread[i]"></reddit>
            <twitch v-if="i < twitch.len && i >= 1 && twitch.linked" :stream="twitch.stream[i]"></twitch>
            <twitter v-if="i < twitter.len && i >= 1&& twitter.linked" :tweet="twitter.tweet[i]"></twitter>
          </div>
          </b-tab-item>
          <b-tab-item v-if="twitter.linked">
          <template slot="header">
          <b-icon class="fab fa-twitter"></b-icon>
          <span> Twitter</span>
          </template>
          <div v-if="!twitter.isLoaded" class='all has-text-center'>
            <loading></loading>
          </div>
          <twitter v-else :tweet="data" v-for="data in twitter.tweet" :key="data.id"></twitter> 
          </b-tab-item>
          <b-tab-item v-if="twitch.linked">
          <template slot="header">
          <b-icon class="fab fa-twitch"></b-icon>
          <span> Twitch</span>
          </template>
          <div v-if="!twitch.isLoaded" class='all has-text-center'>
            <loading></loading>
          </div>
          <twitch v-else :stream="data" v-for="data in twitch.stream" :key="data.id"></twitch>
          </b-tab-item>
          <b-tab-item v-if="reddit.linked">
          <template slot="header">
          <b-icon class="fab fa-reddit"></b-icon>
          <span> Reddit</span>
          </template>
          <div v-if="!reddit.isLoaded" class='all has-text-center'>
            <loading></loading>
          </div>
          <reddit v-else :thread="data" v-for="data in reddit.thread" :key="data.id">
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
import Twitter from './twitter/Tweets.vue'
import Reddit from './reddit/Threads.vue'
import Twitch from './twitch/Streams.vue'
import Loading from './Loading.vue'


export default {

    components: { 
      'profileCard': ProfileCard,
      'twitter': Twitter,
      'reddit': Reddit,
      'twitch': Twitch,
      'loading': Loading
    },
    name: 'Profile',
    data() {
      return {
        activeTab: 0,
      }
    },
    computed: {
      twitter(){
        return this.$store.getters['twitter/getTweets']
      },
      twitch(){
        return this.$store.getters['twitch/getStreams']
      },
      reddit(){
        return this.$store.getters['reddit/getThreads']
      },
    },
    beforeMount() {  
    },
    created() {
      this.checkAuthentication()
      this.token = window.localStorage.getItem('token')
      this.$store.dispatch('reddit/fetchThreads')
      this.$store.dispatch('twitter/fetchTweets')
      this.$store.dispatch('twitch/fetchStreams')
    },
    updated() {
      this.checkAuthentication()
    },
    watch: {},
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
    
  }
  .media{
    background-color: #fafafa;
    padding: 1rem;
  }
</style>
