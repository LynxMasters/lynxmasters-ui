<template>
<article class="media">
  <figure class="media-left">
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{{stream.channel.display_name}}</strong> <small>Game</small> <small>30m</small>
        <br>
        <iframe v-bind:src="`http://player.twitch.tv/?channel=${stream.channel.name}&autoplay=false`"
          height="500"
          width="650"
          frameborder="<frameborder>"
          scrolling="<scrolling>"
          allowfullscreen="<allowfullscreen>">
        </iframe>
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
    <i class="fab fa-twitch fa-2x"></i>
  </div>
</article>

</template>
<script>
 export default {
    props: {
     stream:{}
    },
    methods: {
    },
  }
</script> 