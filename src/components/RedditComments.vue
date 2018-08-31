<template>
<article class="media">
  <votes></votes>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
        <br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-reply"></i></span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-retweet"></i></span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-heart"></i></span>
        </a>
      </div>
    </nav>
  </div>
</article>
</template>
<script>
  import RedditVotes from './RedditVotes.vue'
  import ExternalServices from '@/services/externalService'
  export default{

    components:{
      'votes': RedditVotes,
    },

    props:{
      id36:{}
    },
    data(){
      return{
        comments:{}, 
      }
    },
    mounted(){
      //this.fetchComments()
      this.token = window.localStorage.getItem('token')
    },
    methods:{
      async fetchComments(){
        await ExternalServices.commentsReddit(this.token, this.id36)
        .then(res => {
          console.log(res)
          this.comments = res.data 
        })
      }
    },
  }
</script>