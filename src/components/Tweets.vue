<template>
<article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img class="profileImg" v-bind:src="tweet.user.profile_image_url">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{{tweet.user.name}}</strong> <small>@{{tweet.user.screen_name}}</small> <small>{{ created_at }}m</small>
        <br>
        {{tweet.text}}
        <br>
        <img v-for="media in tweet.entities.media" :key="tweet.id" v-bind:src="media.media_url" height="500" width="500">
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item has-text-grey" @click="">
          <span class="icon is-small"><i class="far fa-comment"></i></span>
        </a>
        <a class="level-item" @click="retweet">
          <span class="icon is-small padLeft padRight"><i v-bind:class="{'has-text-success': isRetweet, 'has-text-grey': !isRetweet}" class="fas fa-retweet">{{tweet.retweet_count}}</i></span>
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
 export default {
    props: {
     tweet:{}
    },
    data() {
        return {
          isFavorite: this.tweet.favorited,
          isRetweet: this.tweet.retweeted,
          created_at: 0,
          
        }
    },
    mounted(){
       this.format_date()
    },
    methods: {
      format_date(){
        let diff = Math.abs(new Date().getTime() - new Date(this.tweet.created_at).getTime())
        this.created_at = Math.floor((diff/1000)/60);
      },
      retweet() {
       if(!this.isRetweet){
          this.isRetweet = true
          this.tweet.retweet_count +=1
          
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