<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Reply to {{tweet.user.name}}</p>
      <button class="delete" v-on:click.stop="$emit('close')"></button>
    </header>
    <section class="modal-card-body">
        <article class="media bg-white">
          <avatar :avatar="tweet.user.profile_image_url"></avatar>
          <div class="media-content">
            <twittercontent :tweet="tweet" :isTweet="false"></twittercontent>
          </div>
        </article>
        <article class="media">
          <div class="media-content">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="Tweet your reply"></textarea>
              </p>
            </div>
          </div>
        </article>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success">Reply</button>
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