<template>
<article class="media">
  <figure class="media-left">
    <a class="level-item has-text-grey" @click="upVote">
      <i v-bind:class="{'has-text-reddit': likes, 'has-text-grey': likes == null}" class="fas fa-arrow-up"></i>
    </a>
    <strong v-bind:class="{'has-text-reddit': likes, 'has-text-link': !likes, 'has-text-grey': likes == null}">{{thread.data.ups}}</strong>
    <a class="level-item has-text-grey" @click="downVote">
      <i class="fas fa-arrow-down" v-bind:class="{'has-text-link': !likes, 'has-text-grey': likes == null}"></i>
    </a>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong class="subreddit">r/{{thread.data.subreddit}}</strong> <small class="creator">Posted by u/{{thread.data.author}}</small> <small>{{ moment.unix(thread.data.created).format('MM-DD-YYYY') }}</small>
        <br>
        <strong>{{thread.data.title}}</strong>
        <br>
        <div v-if="!thread.data.is_video" class="card-image has-text-centered">
         <img v-if="!img" :src="mediaURL" width="500" height="500">
         <video v-if="img" height="500" width="500" controls>
            <source v-bind:src="thread.data.secure_media.reddit_video.fallback_url">
          </video>
         <br>
         <a class="url" v-bind:href="thread.data.url" target="_blank">See More</a>
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
        <a class="level-item has-text-grey" @click="showComments = true">
          <span class="icon is-small"><i class="fas fa-comment">{{thread.data.num_comments}}</i></span>
          <comments v-show='showComments' @close="showComments = false"></comments>
        </a>
        <a class="level-item has-text-grey">
          <span class="icon is-small padLeft"><i class="fas fa-share"></i></span>
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
import Comments from './Comments.vue'
 export default {

    components:{
      'comments': Comments,
    },
    props: {
     thread:{}
    },
    data() {
        return {
          likes: this.thread.data.likes,
          mediaURL: null,
          showComments: false,
          img: false
        }
    },
    created(){
      this.check_media()
    },
    methods: {
      check_media(){
        if(this.thread.data.url.includes('gifv')){
          this.mediaURL = this.thread.data.url.replace(/(gifv)+/g, "gif") 
        }else if(this.thread.data.url.includes('imgur')){
          this.mediaURL = this.thread.data.url + ".jpg"
        }else if(!this.thread.data.url.includes('redd.it')){
          if(this.thread.data.preview.hasOwnProperty('reddit_video_preview')){
            this.img = true
            this.mediaURL = this.thread.data.preview.reddit_video_preview.scrubber_media_url
          }else{
            this.mediaURL = this.thread.data.preview.images[0].source.url
          }
        }else{
          this.mediaURL = this.thread.data.url
        } 
      },
      upVote() {
       if(this.likes == null){
          this.likes = true
          this.thread.data.ups += 1
        }else if(!this.likes){
          this.likes = true
          this.thread.data.ups += 2
        }else{
          this.likes = null
          this.thread.data.ups -= 1
        }
      },
      downVote() {
        if(this.likes == null){
          this.likes = false
          this.thread.data.ups -= 1
        }else if(this.likes){
          this.likes = false
          this.thread.data.ups -= 2
        }else{
          this.likes = null
          this.thread.data.ups += 1
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
  .has-text-reddit{
    color: rgb(255, 69, 0);
  }
</style>
