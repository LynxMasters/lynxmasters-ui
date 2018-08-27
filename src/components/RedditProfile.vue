<template>
    <transition name="fade" mode="out-in">
        <div class="column is-4"
             v-if="!isLoaded">
          <div class="card is-shady card-equal-height">
            <header class="card-header">
              <p class="card-header-title is-centered">
                Checking for Reddit
              </p>
            </header>
            <div class="card-content">
              <div class="content has-text-centered">
                <loading-progress
                  class="progress-twitter"
                  :progress="progress"
                  :indeterminate="indeterminate"
                  :counter-clockwise="counterClockwise"
                  :hide-background="hideBackground"
                  size="64"
                  rotate
                  fillDuration="2"
                  rotationDuration="1"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4 animated fadeIn"
             v-if="accounts.reddit.linked && isLoaded">
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
              <img :src="reddit.icon_img" height="300" width="300">
            </div>
            <div class="card-content">
              <div class="content">
                <h4 class="has-text-centered">u/{{reddit.name }}</h4>
                <h5 class="has-text-centered">{{ reddit.link_karma }} Post Karma</h5>
                <h5 class="has-text-centered">{{ reddit.comment_karma }} Comment Karma</h5>
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
             v-if="!accounts.reddit.linked && isLoaded">
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
  export default {
    name: 'RedditProfile',
    
    props:{
      accounts:{}
    },
    data() {
      return {
        token: null,
        isLoaded: true,
        indeterminate: true,
        progress: 0,
        counterClockwise: false,
        hideBackground: false,
        img: null
      }
    },
    computed:{
      reddit(){
        this.isLoaded = true
        return this.$store.getters['profiles/getReddit']
      },
    },
    created(){
    this.token = window.localStorage.getItem('token')
    },
    methods:{

      linkReddit() {
        window.location = 'http://localhost:8081/auth/reddit?token=' + this.token
      },
      unlinkReddit (context) {
        this.$store.commit('profiles/setRequested')
        this.$store.dispatch('accounts/unlinkReddit', this.token)
        this.accounts.reddit.linked = false
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