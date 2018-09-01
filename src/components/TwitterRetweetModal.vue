<template>
<transition name="modal">
  <div class="modal-mask-twitter">
    <div class="modal-wrapper-twitter">
      <div class="modal-container-twitter">
        <div class="modal-header has-text-centered">
            <slot name="header">
              Quote Tweet
            </slot>
          </div>
        <article class="media">
          <div class="media-content">
            <div class="field">
              <p class="control">
                <input class="input is-rounded" type="text" placeholder="Add a comment...">
              </p>
            </div>
          </div>
        </article>
        <article class="media bg-white">
          <avatar :avatar="tweet.user.profile_image_url"></avatar>
          <div class="media-content">
            <twittercontent :tweet="tweet" :isTweet="false"></twittercontent>
            <nav class="level is-mobile"> 
              <div class="level-left">
                <button class="button">Retweet</button>
              </div>
            </nav>
          </div>
          <div class="media-right">
            <button class="delete" v-on:click.stop="$emit('close')"></button>
          </div>
        </article>
      </div>
    </div>
  </div>
</transition>
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
.modal-mask-twitter {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper-twitter {
  display: table-cell;
  vertical-align: middle;
}

.modal-container-twitter {
  width: 40%;
  height: 30%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header-twitter h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body-twitter {
  margin: 20px 0;
}

.modal-default-button-twitter {
  float: right;
}

.modal-enter-twitter {
  opacity: 0;
}

.modal-leave-active-twitter {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.twitter-light-blue{
  background-color: #e8f5fd;
}
.bg-white{
  background-color: #ffff;
}

</style>