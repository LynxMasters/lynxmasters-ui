<template>
    <transition name="fade" mode="out-in">
        <div class="column is-4"
             v-if="!reddit.isLoaded">
          <div class="card is-shady card-equal-height">
            <header class="card-header">
              <p class="card-header-title is-centered">
                Checking for Reddit
              </p>
            </header>
            <div class="card-content">
              <div class="content has-text-centered">
                <loading></loading>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4 animated fadeIn"
             v-if="reddit.linked && reddit.isLoaded">
          <div class="card is-shady card-equal-height">
            <header class="card-header">
              <p class="card-header-title">
                <i class="fab fa-reddit fa-2x linked"></i>
                <span>
                Reddit Linked
              </span>
              </p>
            </header>
            <div class="card-image has-text-centered">
              <img :src="reddit.data.icon_img" height="300" width="300">
            </div>
            <div class="card-content">
              <div class="content">
                <h4 class="has-text-centered">u/{{reddit.data.name }}</h4>
                <h5 class="has-text-centered">{{ reddit.data.link_karma }} Post Karma</h5>
                <h5 class="has-text-centered">{{ reddit.data.comment_karma }} Comment Karma</h5>
                <h5 class="has-text-centered">Date Created: {{ moment.unix(reddit.created).format('YYYY-MM-DD') }}</h5>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item button is-light"
                 @click="unlinkReddit">Unlink Reddit Account</a>
            </footer>
          </div>
        </div>
        <div class="column is-4 animated fadeIn"
             v-if="!reddit.linked && reddit.isLoaded">
          <div class="card is-shady card-equal-height">
            <div class="card-image has-text-centered">
              <i class="fab fa-reddit fa-7x"></i>
            </div>
            <div class="card-content">
              <div class="content">
                <h4 class="has-text-centered">Reddit</h4>
                <p>Reddit is home to thousands of communities, endless conversation, and authentic human connection. Whether you're into breaking news, sports, TV fan theories, or a never-ending stream of the internet's cutest animals, there's a community on Reddit for you.</p>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item button is-primary"
                 @click="linkReddit">Link Reddit Account</a>
            </footer>
          </div>
        </div>
    </transition>
</template>
<script>
  import Loading from '../Loading.vue'
  export default {
    name: 'Redditdata',
    
    props:{
    },
    components: { 
      'loading': Loading
    },
    data() {
      return {
        token: null,
      }
    },
    computed:{
      reddit(){
        return this.$store.getters['reddit/getProfile']
      },
    },
    created(){
    this.token = window.localStorage.getItem('token')
    },
    mounted(){
    },
    methods:{

      linkReddit() {
        window.location = process.env.REDDIT_URL + this.token
        
      },
      unlinkReddit (context) {
        this.$store.dispatch('reddit/unlinkReddit', this.token)
        this.reddit.linked = false
      },
    },
  }
</script>
<style scoped type="scss">
  #social .column .card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  #social .column .card-footer {
    margin-top: auto;
  }
</style>