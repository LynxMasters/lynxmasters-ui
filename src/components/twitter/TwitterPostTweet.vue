<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head has-text-centered bg-twitter">
      <p class="modal-card-title has-text-white">Tweet</p>
      <button class="delete" v-on:click.stop="$emit('close')"></button>
    </header>
    <section class="modal-card-body">
        <article class="media">
          <div class="media-content">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="Tweet your reply"></textarea>
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="fas fa-image "></i></span>
                </a>
                <a class="level-item">
                  <span class="icon is-small"><i class="fas fa-poll-h "></i></span>
                </a>
                <a class="level-item">
                  <span class="icon is-small"><i class="fas fa-map-marker-alt "></i></span>
                </a>
              </div>
            </nav>
          </div>
        </article>
    </section>
    <footer class="modal-card-foot bg-twitter">
    </footer>
  </div>
</div>
</template>
<script>
export default {
  components:{},
  props:{},
  data(){
    return{     
    }
  },
  created(){},
  methods:{
  },
}
</script>
<style>

</style>