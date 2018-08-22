<template>
<div>
  <div class="columns medium-4">
    <div class="card is-shady card-equal-height">
      <header class="card-header">
        <p class="card-header-title">
          <span>
            {{stream.channel.display_name}}
          </span>
          <i class="fab fa-twitch fa-2x"></i>
        </p>
      </header>
      <div class="card-section">
        <iframe v-bind:src="`http://player.twitch.tv/?channel=${stream.channel.name}&autoplay=false`"
        height="500"
        width="500"
        frameborder="<frameborder>"
        scrolling="<scrolling>"
        allowfullscreen="<allowfullscreen>">
          </iframe>
        </div>
      </div>
    </div>
  </div>
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