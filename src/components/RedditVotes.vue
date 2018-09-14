<template>
  <figure class="media-left">
    <a class="level-item has-text-grey" @click="upVote">
      <i v-bind:class="{'has-text-reddit': likes, 'has-text-grey': likes == null}" class="fas fa-arrow-up"></i>
    </a>
    <strong v-bind:class="{'has-text-reddit': likes, 'has-text-link': !likes, 'has-text-grey': likes == null}">{{ups}}</strong>
    <a class="level-item has-text-grey" @click="downVote">
      <i class="fas fa-arrow-down" v-bind:class="{'has-text-link': !likes, 'has-text-grey': likes == null}"></i>
    </a>
  </figure>
</template>
<script>
	export default{
		props:{
			ups: null,
			likes: null,
			id: null,
		},
		created(){
		},
		methods:{
		  upVote() {
	       if(this.likes == null){
	          this.likes = true
	          this.ups += 1
	          this.$store.dispatch('feeds/postVotes', 
	          	{id: this.id, likes: this.likes, ups: this.ups, dir: 1})
	        }else if(!this.likes){
	          this.likes = true
	          this.ups += 2
	       	  this.$store.dispatch('feeds/postVotes', 
	       	  	{id: this.id, likes: this.likes, ups: this.ups, dir: 1})
	        }else{
	          this.likes = null
	          this.ups -= 1
	          this.$store.dispatch('feeds/postVotes', 
	          	{id: this.id, likes: this.likes, ups: this.ups, dir: 0})
	        }
	      },
	      downVote() {
	        if(this.likes == null){
	          this.likes = false
	          this.ups -= 1
	          this.$store.dispatch('feeds/postVotes', 
	          	{id: this.id, likes: this.likes, ups: this.ups, dir: -1})
	        }else if(this.likes){
	          this.likes = false
	          this.ups -= 2
	          this.$store.dispatch('feeds/postVotes', 
	          	{id: this.id, likes: this.likes, ups: this.ups, dir: -1})
	        }else{
	          this.likes = null
	          this.ups += 1
	          this.$store.dispatch('feeds/postVotes', 
	          	{id: this.id, likes: this.likes, ups: this.ups, dir: 0})
	        }
	      },
		}
	}
</script>
<style scoped>
  .has-text-reddit{
    color: rgb(255, 69, 0);
  }
</style>