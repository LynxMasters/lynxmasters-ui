<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head bg-reddit has-text-centered">
      <p class="modal-card-title has-text-white">Post Thread</p>
      <button class="delete" v-on:click.stop="$emit('close')"></button>
    </header>
    <section class="modal-card-body">
        <article class="media bg-white">
          <div class="media-content">
          </div>
        </article>
        <div class="tabs is-centered is-boxed">
          <ul>
            <li v-bind:class="{ 'is-active': activeTab == 'post' }" @click="activeTab = 'post'">
              <a>
                <span class="icon is-small"><i class="fas fa-comment has-text-black" aria-hidden="true"></i></span>
                <span class="has-text-black">Post</span>
              </a>
            </li>
            <li v-bind:class="{ 'is-active': activeTab == 'media' }" @click="activeTab = 'media'">
              <a>
                <span class="icon is-small"><i class="fas fa-image has-text-black" aria-hidden="true"></i></span>
                <span class="has-text-black">Image & Video</span>
              </a>
            </li>
            <li v-bind:class="{ 'is-active': activeTab == 'link' }" @click="activeTab = 'link'"> 
              <a>
                <span class="icon is-small"><i class="fas fa-link has-text-black" aria-hidden="true"></i></span>
                <span class="has-text-black">Link</span>
              </a>
            </li>
          </ul>
        </div>
        <br>
          <div class="media-content">
            <div class="field">
              <p class="control">
                <input placeholder="Title"></input>
              </p>
            </div>
          </div>
        <article class="media">
          <div class="media-content">
            <div class="field">
              <p class="control">
                <textarea v-if="activeTab == 'post'" class="textarea" placeholder="Content"></textarea>
                <div v-if="activeTab == 'media'" class="drop_area">
                  <br>
                  <br>
                  <br>
                  <p class='has-text-centered'>Drag and drop or <button class="button">UPLOAD</button></p>
                </div>
                <input v-if="activeTab == 'link'" placeholder="Url"></input>
              </p>
            </div>
          </div>
        </article>
    </section>
    <footer class="modal-card-foot bg-reddit">
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
      activeTab: 'post',
    }
  },
  created(){},
  methods:{
  },
}
</script>
<style>
  .drop_area {
  border: 2px  dashed;
  width:  auto;
  height: 200px;
}
</style>