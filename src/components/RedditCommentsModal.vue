<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card reddit-content">
    <header class="modal-card-head">
      <p class="modal-card-title">r/{{thread.data.subreddit}}</p>
      <button class="delete" v-on:click.stop="$emit('close')"></button>
    </header>
    <section class="modal-card-body">
      <article class="media">
          <votes :ups="thread.data.ups" :likes="thread.data.likes"></votes>
          <div class="media-content">
            <redditcontent :thread="thread.data"></redditcontent>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item has-text-grey">
                  <span class="icon is-small padLeft"><i class="fas fa-share"></i></span>
                </a>
              </div>
            </nav>
          </div>
        </article>
        <article class="media">
          <div class="media-content">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="Add a comment..."></textarea>
              </p>
            </div>
            <div class="field">
              <p class="control">
              <button class="button">Comment</button>
              </p>
            </div>
          </div>
        </article>
        <comments :comment="comment" v-for="comment in comments" :key="comment.id" ></comments>
    </section>
    <footer class="modal-card-foot">
  
    </footer>
  </div>
</div>
</template>
<script>
import RedditContent from './RedditContent.vue'
import RedditVotes from './RedditVotes.vue'
import RedditComments from './RedditComments.vue'
import ExternalServices from '@/services/externalService'
export default {
  components:{
    'comments':RedditComments,
    'redditcontent': RedditContent,
    'votes': RedditVotes
  },

  props:{
    thread:{},
  },
  data(){
    return{
      comments:{},     
    }
  },
  created(){
    this.token = window.localStorage.getItem('token')     
    this.fetchComments() 
  },
  methods:{
    async fetchComments(){
      await ExternalServices.commentsReddit(this.token, this.thread.data.id)
      .then(res => { 
        return res
      })
      .then(info =>{
        this.comments = info.data[1].data.children
        console.log(this.comments)
      })
    }
  },
}
</script>
<style>
  .reddit-content{
    width: 50%;
  }
</style>