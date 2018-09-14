<template>
<div class="content">
  <p>
    <strong>{{tweet.user.name}}</strong> <small>@{{tweet.user.screen_name}}</small> <small>{{ created_at }}m</small>
    <br>
    {{tweet.text}}
    <br>
    <div v-if="isTweet">
      <img v-if="isImage" v-lazy="image_url" height="500" width="500">
      <video v-if="isVideo && video_url.content_type == 'video/mp4'"height="500" width="500" controls>
        <source v-bind:src="video_url.url">
      </video>
      <!-- <video v-if="!isImage && video_url.content_type != 'video/mp4'" id="video" height="500" width="500"> 
      </video>-->
    </div>
  </p>
</div>
</template>
<script>
  export default{
    props:{
      tweet:{},
      isTweet: null
    },
    data() {
      return {
        created_at: 0,
        isImage: null,
        isVideo: null,
        image_url: null, 
        video_url: null,
      }
    },
    created(){
      this.check_media()
    },
    mounted(){
       this.format_date()
    },
    methods: {

      check_media(){
        if(this.tweet.hasOwnProperty('extended_entities')){
      
          if(this.tweet.extended_entities.media[0].type == 'photo'){
            this.isImage = true
            this.image_url = this.tweet.extended_entities.media[0].media_url_https
          }else{
            this.isVideo = true
            this.video_url = this.tweet.extended_entities.media[0].video_info.variants[0]
            if(this.video_url.content_type != 'video/mp4'){
              //this.videoM3U8()
            }
          }
        }
      },
      videoM3U8(){
        var video = document.getElementById("video");
        var videoSrcHls = this.video_url.url

        if(Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoSrcHls);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED,function() {
            video.play();
          });
        }
      },

      format_date(){
        let diff = Math.abs(new Date().getTime() - new Date(this.tweet.created_at).getTime())
        this.created_at = Math.floor((diff/1000)/60);
      },
    }
  }
</script>