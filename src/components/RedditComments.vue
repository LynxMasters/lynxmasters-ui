<template>
 <div>
<article class="media">
  <votes :id='comment.data.name' :ups='comment.data.ups' :likes='comment.data.likes'></votes>
  <div class="media-content">
  <div class="content">
      <p>
        <small class="creator">{{comment.data.author}}</small>
        <br>
        <p>{{comment.data.body}}</p>
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item has-text-grey" v-on:click="isReply = true">
          <span class="icon is-small"><i class="fas fa-comment"><small>Reply</small></i></span>
        </a>
      </div>
    </nav>
  <div class="content" v-if="isReply">
    <div class="field">
        <p class="control">
          <textarea class="textarea" v-model="text" placeholder="Reply..."></textarea>
        </p>
    </div>
      <div class="field">
      <p class="control">
      <button v-on:click="postReply" class="button">Comment</button>
      </p>
    </div>
  </div>
  </div>
</article>
<div class='tree' v-if="hasChildren">
  <comments v-for="child in children" :key="child.id" :comment="child"></comments>
</div>
</div>
</template>
<script>
  import RedditVotes from './RedditVotes.vue'
  import ExternalServices from '@/services/externalService'
  export default{
    name: 'comments',
    components:{
      'votes': RedditVotes,
    },
    props:{
      comment:{}
    },
    data(){
      return{
        children: null,
        hasChildren: false,
        isReply: false,
        text: null
      }
    },
    mounted(){
      this.unwrapData()
    },
    methods:{
      unwrapData(){
        if(this.comment.data.replies != ''){
          if(!this.comment.data.replies.data.hasOwnProperty('name')){

          this.children = this.comment.data.replies.data.children
          this.children.pop()
          this.hasChildren = true
          }
        }
      },
      postReply(){
        this.isReply = false
        this.$store.dispatch('feeds/postCommentReddit', {id: this.comment.data.name, text: this.text })
     } 
    }
  }
</script>
<style>
.tree{
  padding-left: 50px;
  margin: 6px 0;
}
.threadline {
    display: block;
    height: 100%;
    width: 50%;
    border-right: 2px solid rgb(237, 239, 241);
}
</style>
