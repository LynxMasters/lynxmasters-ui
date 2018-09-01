<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Quote Tweet</p>
      <button class="delete" v-on:click.stop="$emit('close')"></button>
    </header>
    <section class="modal-card-body">
          <div class="media-content">
            <div class="field">
              <p class="control">
                <input class="input is-rounded" type="text" placeholder="Add a comment...">
              </p>
            </div>
          </div>
        <article class="media bg-white">
          <avatar :avatar="tweet.user.profile_image_url"></avatar>
          <div class="media-content">
            <twittercontent :tweet="tweet" :isTweet="false"></twittercontent>
          </div>
        </article>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success">Retweet</button>
    </footer>
  </div>
</div>
</template>
<script>
import TwitterContent from './TwitterContent.vue'
import TwitterAvatar from './TwitterAvatar.vue'
import ExternalServices from '@/services/externalService'
export default {
  components:{
    'twittercontent': TwitterContent,
    'avatar': TwitterAvatar
  },

  props:{
    tweet:{},
  },
  data(){
    return{     
    }
  },
  created(){
    this.token = window.localStorage.getItem('token')     
  },
  methods:{
  },
}
</script>
<style>
</style>