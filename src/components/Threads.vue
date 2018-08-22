<template>
<article class="media">
  <figure class="media-left">
    <a class="level-item has-text-grey" @click="upVote">
      <i v-bind:class="{'has-text-reddit': isUp, 'has-text-grey': !isUp}" class="fas fa-arrow-up"></i>
    </a>
    <strong v-bind:class="{'has-text-reddit': isUp, 'has-text-link': isDown}">{{thread.data.ups}}</strong>
    <a class="level-item has-text-grey" @click="downVote">
      <i class="fas fa-arrow-down" v-bind:class="{'has-text-link': isDown, 'has-text-grey': !isDown}"></i>
    </a>
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
          <video height="500" width="500" controls>
            <source v-bind:src="thread.data.secure_media.reddit_video.fallback_url">
          </video>
        </div>
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item has-text-grey">
          <span class="icon is-small"><i class="fas fa-comment"></i></span>
        </a>
        <a class="level-item has-text-grey">
          <span class="icon is-small"><i class="fas fa-share"></i></span>
        </a>
      </div>
    </nav>
  </div>
  <div class="media-right">
    <i class="fab fa-reddit fa-2x"></i>
  </div>
</article>
</template>
<script>
 export default {
    props: {
     thread:{}
    },
    data() {
        return {
          isUp: false,
          isDown: false,
        }
    },
    methods: {
      upVote() {
       if(!this.isUp && this.isDown){
          this.isUp = true
          this.isDown = false
          this.thread.data.ups += 2
        }else if(!this.isUp && !this.isDown){
          this.isUp = true
          this.isDown = false
          this.thread.data.ups += 1
        }else{
          this.isUp = false
          this.thread.data.ups -= 1
        }
      },
      downVote() {
        if(!this.isDown && this.isUp){
          this.isDown = true
          this.isUp = false
          this.thread.data.ups -= 2
        }else if(!this.isDown && !this.isUp){
          this.isUp = false
          this.isDown = true
          this.thread.data.ups -= 1
        }else{
          this.isDown = false
          this.thread.data.ups += 1
        }
      },
    },
  }
</script>  
<style scoped>
  .has-text-reddit{
    color: rgb(255, 69, 0);
  }
</style>