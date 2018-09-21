<template>
<article class="media">
  <figure class="media-left">
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{{stream.channel.display_name}}</strong> <small>{{stream.game}}</small> <small>{{stream.created_at}}</small>
        <br>
        <iframe v-bind:src="`https://player.twitch.tv/?channel=${stream.channel.name}&autoplay=false`"
          height="500"
          width="650"
          frameborder="<frameborder>"
          scrolling="<scrolling>"
          allowfullscreen="<allowfullscreen>">
        </iframe>
        <div v-bind:class="{'hideChat': !isChat}" >
          <iframe frameborder="0"
            scrolling="no"
            id="chat_embed"
            v-bind:src="`https://www.twitch.tv/embed/${stream.channel.name}/chat`"
            height="500"
            width="650">
          </iframe>
        </div>
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item has-text-grey" @click="chat">
          <span class="icon is-small"><i class="fas fa-comment 2x"></i></span>
        </a>
        <a class="level-item has-text-grey">
          <span class="icon is-small"><i class="fas fa-share 2x"></i></span>
        </a>
      </div>
    </nav>
  </div>
  <div class="media-right">
    <i class="fab fa-twitch fa-2x"></i>
  </div>
</article>

</template>
<script>
 export default {
    props: {
     stream:{}
    },
    data(){
      return{
        isChat: false,
      }
    },
    methods: {
      chat(){
        if(!this.isChat){
          this.isChat = true
        }else{
          this.isChat = false
        }
      },
    },
  }
</script> 
<style scoped>
  .hideChat{
    visibility: hidden;
    width: 0;
    height: 0;
  }
</style>