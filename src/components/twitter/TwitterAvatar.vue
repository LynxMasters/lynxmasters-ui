<template>
	<figure class="media-left">
     <p class="image is-64x64">
      <img class="profileImg" v-bind:src="avatar">
   	</p>
  </figure>
</template>
<script>
	export default{
		props:{
			avatar: null
		}
	}
</script>