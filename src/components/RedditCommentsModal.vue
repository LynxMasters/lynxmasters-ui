<template>
<transition name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
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
          <div class="media-right">
            <button class="delete" v-on:click.stop="$emit('close')"></button>
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
        <ul class="tree">
          <comments :comment="comment" v-for="comment in comments" :key="comment.id" ></comments>
        </ul>
      </div>
    </div>
  </div>
</transition>
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 95%;
  height: 85%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow-y: auto;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>