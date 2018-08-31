<template>
 <div> 
<article class="media">
  <votes :ups='comment.data.ups' :likes='comment.data.likes'></votes>
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
        <a class="level-item has-text-grey">
          <span class="icon is-small"><i class="fas fa-comment">Reply</i></span>
        </a>
      </div>
    </nav>
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
        hasChildren: false
      }
    },
    mounted(){
      console.log('comment')
      console.log(this.comment)
      this.unwrapData()
    },
    methods:{
      unwrapData(){
        if(this.comment.data.replies != ''){
          if(!this.comment.data.replies.data.hasOwnProperty('name')){
          this.children = this.comment.data.replies.data.children
          this.hasChildren = true
          }
          console.log('child')
          console.log(this.children)
        }
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