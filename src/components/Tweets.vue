<template>
<article class="media">
  <avatar :avatar="tweet.user.profile_image_url"></avatar>
  <div class="media-content">
    <twittercontent :tweet="tweet" :isTweet="true"></twittercontent>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item has-text-grey" @click="showComments = true">
          <span class="icon is-small"><i class="fas fa-comment"></i></span>
          <comments :tweet="tweet" v-if='showComments' @close="showComments = false"></comments>
        </a>
        <a class="level-item" @click="retweet">
          <span class="icon is-small padLeft padRight"><i v-bind:class="{'has-text-success': isRetweet, 'has-text-grey': !isRetweet}" class="fas fa-retweet">{{tweet.retweet_count}}</i></span><retweets :tweet="tweet" v-if='showRetweet' @close="showRetweet = false"></retweets>
        </a>
        <a class="level-item" @click="favorite">
          <span class="icon is-small padLeft"><i v-bind:class="{'has-text-danger fas fa-heart': isFavorite, 'has-text-grey': !isFavorite}" class="far fa-heart">{{tweet.favorite_count}}</i></span>
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
          isFavorite: this.tweet.favorited,
          isRetweet: this.tweet.retweeted,
        }
    },
    mounted(){
    },
    methods: {
      retweet() {
       if(!this.isRetweet){
          this.isRetweet = true
          this.tweet.retweet_count +=1
          this.showRetweet = true
          
        }else{
          this.isRetweet = false
          this.tweet.retweet_count -=1
        }
      },

      favorite() {
        if(!this.isFavorite){
          this.isFavorite = true
          this.tweet.favorite_count +=1
        }else{
          this.isFavorite = false
          this.tweet.favorite_count -=1
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