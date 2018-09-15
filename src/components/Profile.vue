<template>
<section class="profile animated fadeIn">
  <div class="columns is-centered">
    <div class="column is-7">
       <profileCard :accounts="accounts"></profileCard>
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
           <div class="column is-12" v-if="!tweets.isLoaded || !streams.isLoaded || !threads.isLoaded" >
            <div class="content has-text-centered">
                <loading></loading>
            </div>
          </div>
          <div v-else class='all' v-for="i in 8">
            <reddit v-if="i < threads.len && i == 1 && accounts.reddit.linked" :thread="threads.threads[0]"></reddit>
            <twitch v-if="i < streams.len && i == 1 && accounts.twitch.linked" :stream="streams[0]"></twitch>
            <twitter v-if="i < tweets.len && i == 1 && accounts.twitter.linked" :tweet="tweets.tweets[0]"></twitter>
            <reddit v-if="i < threads.len && i >= 1 && accounts.reddit.linked" :thread="threads.threads[i]"></reddit>
            <twitch v-if="i < streams.len && i >= 1 && accounts.twitch.linked" :stream="streams[i]"></twitch>
            <twitter v-if="i < tweets.len && i >= 1&& accounts.twitter.linked" :tweet="tweets.tweets[i]"></twitter>
          </div>
          </b-tab-item>
          <b-tab-item v-if="accounts.twitter.linked">
          <template slot="header">
          <b-icon class="fab fa-twitter"></b-icon>
          <span> Twitter</span>
          </template>
          <div v-if="!tweets.isLoaded" class='all has-text-center'>
            <loading></loading>
          </div>
          <twitter v-else :tweet="tweet" v-for="tweet in tweets.tweets" :key="tweet.id"></twitter> 
          </b-tab-item>
          <b-tab-item v-if="accounts.twitch.linked">
          <template slot="header">
          <b-icon class="fab fa-twitch"></b-icon>
          <span> Twitch</span>
          </template>
          <div v-if="!streams.isLoaded" class='all has-text-center'>
            <loading></loading>
          </div>
          <twitch v-else :stream="stream" v-for="stream in streams" :key="stream.id"></twitch>
          </b-tab-item>
          <b-tab-item v-if="accounts.reddit.linked">
          <template slot="header">
          <b-icon class="fab fa-reddit"></b-icon>
          <span> Reddit</span>
          </template>
          <div v-if="!threads.isLoaded" class='all has-text-center'>
            <loading></loading>
          </div>
          <reddit v-else :thread="thread" v-for="thread in threads.threads" :key="thread.id">
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
      accounts(){
        return this.$store.getters['accounts/getAccounts']
      },
      tweets(){
        return this.$store.getters['feeds/getTwitter']
      },
      streams(){
        return this.$store.getters['feeds/getTwitch']
      },
      threads(){
        return this.$store.getters['feeds/getReddit']
      },
    },
    beforeMount() {  
    },
    created() {
      this.checkAuthentication()
      this.token = window.localStorage.getItem('token')
      this.$store.dispatch('feeds/fetchReddit', this.token)
      this.$store.dispatch('feeds/fetchTwitter', this.token)
      this.$store.dispatch('feeds/fetchTwitch', this.token)
      this.$store.dispatch('accounts/fetchAccounts', this.token)     
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
    border-top: 1px solid rgba(219, 219, 219, 0.5);
  }
  .media{
    background-color: #fafafa;
  }
</style>
