<template>
<article class="media">
  <avatar :avatar="tweet.user.profile_image_url_https"></avatar>
  <div class="media-content">
    <twittercontent :tweet="tweet" :isTweet="true"></twittercontent>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item has-text-grey" @click="showComments = true">
          <span class="icon is-small"><i class="fas fa-comment"></i></span>
          <comments :tweet="tweet" v-if='showComments' @close="showComments = false"></comments>
        </a>
        <a class="level-item" @click="retweet">
          <span class="icon is-small padLeft padRight"><i v-bind:class="{'has-text-success': tweet.retweeted, 'has-text-grey': !tweet.retweeted}" class="fas fa-retweet">{{tweet.retweet_count}}</i></span><!-- <retweets :tweet="tweet" v-if='showRetweet' @close="showRetweet = false"></retweets> -->
        </a>
        <a class="level-item" @click="favorite">
          <span class="icon is-small padLeft"><i v-bind:class="{'has-text-danger fas fa-heart': tweet.favorited, 'has-text-grey': !tweet.favorited}" class="far fa-heart">{{tweet.favorite_count}}</i></span>
        </a>
      </div>
    </nav>
  </div>
  <div class="media-right">
    <i class="fab fa-twitter fa-2x"></i>
  </div>
</article>
</template>

<script>
  import TwitterAvatar from './TwitterAvatar.vue'
  import TwitterContent from './TwitterContent.vue'
  import TwitterCommentsModal from './TwitterCommentsModal'
  import TwitterRetweetModal from './TwitterRetweetModal'
 export default {
    components:{
      'avatar': TwitterAvatar,
      'twittercontent': TwitterContent,
      'comments': TwitterCommentsModal,
      'retweets': TwitterRetweetModal
    },
    props: {
     tweet:{}
    },
    data() {
        return {
          showComments: false,
          showRetweet: false,
        }
    },
    mounted(){
    },
    methods: {
      retweet() {
       if(!this.tweet.retweeted){
          this.tweet.retweeted = true
          this.tweet.retweet_count +=1
          this.showRetweet = true 
          this.$store.dispatch('twitter/postRetweet', {id: this.tweet.id_str, retweeted: this.tweet.retweeted, retweet_count: this.tweet.retweet_count})
        }else{
          this.tweet.retweeted = false
          this.tweet.retweet_count -=1
          this.$store.dispatch('twitter/postRetweet', {id: this.tweet.id_str, retweeted: this.tweet.retweeted, retweet_count: this.tweet.retweet_count})
        }
      },

      favorite() {
        if(!this.tweet.favorited){
          this.tweet.favorited = true
          this.tweet.favorite_count +=1
          this.$store.dispatch('twitter/postFavorite', {id: this.tweet.id_str, favorited: this.tweet.favorited, favorite_count: this.tweet.favorite_count})
        }else{
          this.tweet.favorited = false
          this.tweet.favorite_count -=1
          this.$store.dispatch('twitter/postFavorite', {id: this.tweet.id_str, favorited: this.tweet.favorited, favorite_count: this.tweet.favorite_count})
        }
      },
    },
  }
</script>
<style scoped>
  .padLeft{
    padding-left: 2.0em;
  }
  .padRight{
    padding-right: 2.0em;
  }
  .profileImg{
    border-radius: 50%;
  }
</style>