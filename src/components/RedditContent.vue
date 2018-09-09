<template>
	<div class="content">
      <p>
        <strong class="subreddit">r/{{thread.subreddit}}</strong> <small class="creator">Posted by u/{{thread.author}}</small> <small>{{ moment.unix(thread.created).format('MM-DD-YYYY') }}</small>
        <br>
        <strong>{{thread.title}}</strong>
        <br>
        <div v-if="!thread.is_video" class="card-image has-text-centered">
         <img v-if="!img" :src="mediaURL" width="500" height="500">
         <video v-if="img" height="500" width="500" controls>
            <source v-bind:src="mediaURL">
          </video>
         <br>
         <a class="url" v-bind:href="thread.url" target="_blank">See More</a>
        </div>
        <div v-if="thread.is_video" class="card-image has-text-centered">
          <video height="500" width="500" controls>
            <source v-bind:src="thread.secure_media.reddit_video.fallback_url">
          </video>
        </div>
      </p>
    </div>
</template>
<script>
	export default{
		props:{
		  thread:{}
		},
		data() {
         return {
          mediaURL: null,
          img: false,
          }
    	},
    	created(){
      		this.check_media()
    	},
		methods:{
	      check_media(){
	      	
	        if(this.thread.url.includes('gifv')){
	          this.mediaURL = this.thread.url.replace(/(gifv)+/g, "gif") 
	        }else if(this.thread.url.includes('imgur')){
	          if(this.thread.url.includes('.jpg') || this.thread.url.includes('.png') || this.thread.url.includes('.gif')){
	            this.mediaURL = this.thread.url
	          }else{
	            this.mediaURL = this.thread.url + '.jpg'
	          }
	          this.mediaURL.replace("http", "https")
	        }else if(!this.thread.url.includes('redd.it')){
	          if(this.thread.preview.hasOwnProperty('reddit_video_preview')){
	            this.img = true
	            this.mediaURL = this.thread.preview.reddit_video_preview.scrubber_media_url
	          }else{
	            this.mediaURL = this.thread.preview.images[0].source.url
	          }
	        }else{
	          if(this.thread.url.includes('.jpg') || this.thread.url.includes('.png') || this.thread.url.includes('.gif')){
	          this.mediaURL = this.thread.url
	          }else{
	            this.mediaURL = this.thread.url + '.jpg'
	          }
	        }
          },
		}
	}
</script>
