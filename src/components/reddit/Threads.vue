<template>
<article class="media">
  <votes :id="thread.data.name" :ups="thread.data.ups" :likes="thread.data.likes"></votes>
  <div class="media-content">
    <redditcontent :thread="thread.data"></redditcontent>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item has-text-grey" @click="showComments = true">
          <span class="icon is-small"><i class="fas fa-comment">{{thread.data.num_comments}}</i></span>
          <commentsmodal :thread="thread" v-if='showComments' @close="showComments = false"></commentsmodal>
        </a>
        <a class="level-item has-text-grey">
          <span class="icon is-small padLeft"><i class="fas fa-share"></i></span>
        </a>
      </div>
    </nav>
  </div>
  <div class="media-right">
    <i class="fab fa-reddit fa-2x"></i>
  </div>
</article>
</template>
<script>
import RedditContent from './RedditContent.vue'
import RedditVotes from './RedditVotes.vue'
import CommentsModal from './RedditCommentsModal.vue'
 export default {
    name: 'threads',
    components:{
      'redditcontent': RedditContent,
      'votes': RedditVotes,
      'commentsmodal': CommentsModal,   
    },
    props: {
     thread:{},
    },
    data() {
        return {
          mediaALT: null,
          showComments: false,
        }
    },
    created(){
    },
    methods: {},
  }
</script>
<style scoped>
  .padLeft{
    padding-left: 2.0em;
  }
  .padRight{
    padding-right: 2.0em;
  }
  .has-text-reddit{
    color: rgb(255, 69, 0);
  }
</style>
