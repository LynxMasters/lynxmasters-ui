<template>
  <div id="app">
    <navigation></navigation>
    <router-view/>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation.vue'
  import Footer from '@/components/Footer.vue'
  export default {
    components: {
      Navigation,
      Footer
    },
    name: 'App'
  }
</script>

<style>

</style>
