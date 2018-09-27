<template>
<section class="profile animated fadeIn">
  <div class="container">
    <div class="columns is-centered">
    <profileCard :activeTab="activeTab" :isMember="false"></profileCard>
    <div class="column is-6 tab-top">
      <b-tabs size="is-medium"
      position="is-centered"
      type="is-boxed"
      v-model="activeTab">
      <div class="level-center">
        <div class="level-item">
          <a class="button fab fa-twitter fa-2x"> Tweet</a>
          <a class="button fab fa-reddit fa-2x"> Post</a>
          <a class="button fab fa-instagram fa-2x"> Upload</a>
        </div>
      </div>
      <b-tab-item>
      <template slot="header">
      <b-icon class="fas fa-align-justify"></b-icon>
      <span> Feeds</span>
      </template>
      <div class="column is-12" v-if="!twitter.isLoaded || !twitch.isLoaded || !reddit.isLoaded">
        <div class="content has-text-centered">
          <loading></loading>
        </div>
      </div>
      <div v-else class='all'  v-for="i in count">
        <reddit v-if="filterReddit && i < reddit.len && i == 1 && reddit.linked" :thread="reddit.thread[0]"></reddit>
        <twitch v-if="filterTwitch && i < twitch.len && i == 1 && twitch.linked" :stream="twitch.stream[0]"></twitch>
        <twitter v-if="filterTwitter && i < twitter.len && i == 1 && twitter.linked" :tweet="twitter.tweet[0]"></twitter>
        <reddit v-if="filterReddit && i < reddit.len && i >= 1 && reddit.linked" :thread="reddit.thread[i]"></reddit>
        <twitch v-if="filterTwitch && i < twitch.len && i >= 1 && twitch.linked" :stream="twitch.stream[i]"></twitch>
        <twitter v-if="filterTwitter && i < twitter.len && i >= 1&& twitter.linked" :tweet="twitter.tweet[i]"></twitter>
      </div>
      </b-tab-item>
      <b-tab-item >
      <template slot="header">
      <b-icon class="fas fa-clipboard-list"></b-icon>
      <span> Posts</span>
      </template>
      <!-- <div v-if="!twitter.isLoaded" class='all has-text-center'>
        <loading></loading>
      </div>
      <twitter v-else :tweet="data" v-for="data in twitter.tweet" :key="data.id"></twitter>  -->
      </b-tab-item>
      <b-tab-item >
      <template slot="header">
      <b-icon class="fas fa-heart"></b-icon>
      <span> Likes</span>
      </template>
      <!-- <div v-if="!twitch.isLoaded" class='all has-text-center'>
        <loading></loading>
      </div>
      <twitch v-else :stream="data" v-for="data in twitch.stream" :key="data.id"></twitch> -->
      </b-tab-item>
      <b-tab-item >
      <template slot="header">
      <b-icon class="fas fa-user-friends"></i>"></b-icon>
      <span> Followers</span>
      </template>
      <!-- <div v-if="!reddit.isLoaded" class='all has-text-center'>
        <loading></loading>
      </div>
      <reddit v-else :thread="data" v-for="data in reddit.thread" :key="data.id">
      </reddit> -->
      </b-tab-item>
      </b-tabs>
    </div>  
    <div class="column is-4">
      <div class="columns">
        <div class="column is-4 has-text-centered">
          <div class="box">
            <strong>Posts</strong>
            <p>5K</p>
          </div>
        </div>
        <div class="column is-4 has-text-centered">
            <div class="box">  
            <strong>Likes</strong>
            <p>2K</p>   
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4 has-text-centered">
          <div class="box">
            <strong>Followers</strong>
            <p>199</p>
          </div>
        </div>
        <div class="column is-4 has-text-centered">
            <div class="box">  
            <strong>Views</strong>
            <p>5</p>   
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-8 has-text-centered">
          <div class="box">
            <h4 class="card-header-title is-centered card-name">Trending</h4>
            <p><strong><a class="has-text-twitter">#Redsox</a></strong> <small>24k Tweets</small></p>
            <p><strong><a class="has-text-twitter">#Debate</a></strong> <small>2k Tweets</small></p>
            <p><strong><a class="has-text-reddit">r/gifs</a></strong> <small>24k Subscribers</small></p>
            <p><strong><a class="has-text-twitch">Ninja</a></strong> <small>2k Viewers</small></p>
            <p><strong><a class="has-text-twitter">#Trump</a></strong> <small>245k Tweets</small></p>
            <p><strong><a class="has-text-reddit">r/funny</a></strong> <small>100k Subscribers</small></p>
            <p><strong><a class="has-text-twitch">Shroud</a></strong> <small>245k Viewers</small></p>
            <p><strong><a class="has-text-reddit">r/aww</a></strong> <small>44k Subscribers</small></p>
            <p><strong><a class="has-text-twitch">DrDisrespect</a></strong> <small>245k Viewers</small></p>
            <p><strong><a class="has-text-twitter">#Nasa</a></strong> <small>44k Tweets</small></p>
          </div>
        </div>
      </div>  

<!--       <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification has-text-centered">
                <p class="subtitle">Trending</p>
                <p><strong>#Redsox</strong> <small>24k Tweets</small></p>
                <p><strong>#Debate</strong> <small>2k Tweets</small></p>
                <p><strong>r/gifs</strong> <small>24k Subscribers</small></p>
                <p><strong>Ninja</strong> <small>2k Viewers</small></p>
                <p><strong>#Trump</strong> <small>245k Tweets</small></p>
                <p><strong>r/funny</strong> <small>100k Subscribers</small></p>
                <p><strong>Shroud</strong> <small>245k Viewers</small></p>
                <p><strong>r/aww</strong> <small>44k Subscribers</small></p>
                <p><strong>DrDisrespect</strong> <small>245k Viewers</small></p>
                <p><strong>#Nasa</strong> <small>44k Tweets</small></p>
              </article>
            </div>
          </div>
        </div>
      </div> -->
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
import Post from './Post.vue'


export default {

    components: { 
      'profileCard': ProfileCard,
      'twitter': Twitter,
      'reddit': Reddit,
      'twitch': Twitch,
      'loading': Loading,
      'post': Post
    },
    name: 'Profile',
    data() {
      return {
        activeTab: 0,
        bottom: false,
        count: 4,
        filterReddit: true,
        filterTwitter: true,
        filterTwitch: false,
      }
    },
    watch:{
      bottom(bottom) {
        if (bottom) {
          // if(this.activeTab == 1){
          //  this.twitterMore()
          // }
          // if(this.activeTab == 3){
          //   this.redditMore()
          // }
          this.count = this.count + 4
          if(this.count == 80 || this.count == 160){
            this.redditMore()
            this.twitterMore()
          }
        }
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
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      })
    },
    updated() {
      this.checkAuthentication()
    },
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

      bottomVisible() {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
      },

      redditMore() {
        ExternalService.feedsRedditMore(this.reddit.thread[this.reddit.thread.length-1].data.name)
        .then(res => {
          console.log(res)
          this.reddit.thread = this.reddit.thread.concat(res.data.data.children)
          this.reddit.len = this.reddit.len + 100
        })
      },

      twitterMore() {
        ExternalService.feedsTwitterMore(this.twitter.tweet[this.twitter.tweet.length-1].id_str)
        .then(res => {
          console.log(res)
          res.data.shift()
          this.twitter.tweet = this.twitter.tweet.concat(res.data)
          this.twitter.len = this.twitter.len + 100
        })
      }
    },
    destroyed(){
      this.twitter.tweet.splice(100, this.twitter.tweet.length-100)
      this.twitter.len = 100
      this.reddit.thread.splice(100, this.reddit.thread.length-100)
      this.reddit.len = 100
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
  .has-text-reddit{
    color: rgb(255, 69, 0);
  }
  .has-text-twitter{
    color: #1DA1F2;
  }
  .has-text-twitch{
    color: #4b367c;
  }
</style>
