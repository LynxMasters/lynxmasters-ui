<template>
  <section class="profile">
    <div class="columns">
      <div class="column">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-3">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title is-centered card-name is-primary">
                    Username
                  </p>
                </header>
                <div class="card-image">
                  <div class="image players-avatar">
                    <img src="http://via.placeholder.com/150x150" alt="Profile Avatar">
                  </div>
                </div>
                <div class="card-content">
                  <div class="content has-text-centered">
                    <div class="field">
                      <label class="label">Username</label>
                    </div>
                    <div class="field has-addons">
                      <div class="control">
                        <label class="label">Followers: </label>
                      </div>
                      <div class="control">
                        <label class="label">Following: </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-content">
                  <div class="content has-text-centered">
                    <a class="member-linked-accounts">
                      <i class="fab fa-twitter fa-2x"></i>
                    </a>
                    <a class="member-linked-accounts">
                      <i class="fab fa-twitch fa-2x"></i>
                    </a>
                    <a class="member-linked-accounts">
                      <i class="fab fa-reddit fa-2x"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-7 tab-top">
              <b-tabs size="is-medium"
                      position="is-centered"
                      type="is-boxed"
                      v-model="activeTab">
                <b-tab-item>
                  <template slot="header">
                    <b-icon class="fas fa-align-justify"></b-icon>
                    <span> All</span>
                  </template>
                  <div>ALL FEEDS GO HERE</div>
                </b-tab-item>
                <b-tab-item>
                  <template slot="header">
                    <b-icon class="fab fa-twitter"></b-icon>
                    <span> Twitter</span>
                  </template>
                  <div>TWITTER FEED GOES HERE</div>
                  <twitter-feed twitter-feed="twitter-feed"></twitter-feed>
                </b-tab-item>
                <b-tab-item>
                  <template slot="header">
                    <b-icon class="fab fa-twitch"></b-icon>
                    <span> Twitch</span>
                  </template>
                  <div>TWITCH FEED GOES HERE</div>
                  <twitch-feed></twitch-feed>
                </b-tab-item>
                <b-tab-item>
                  <template slot="header">
                    <b-icon class="fab fa-reddit"></b-icon>
                    <span> Reddit</span>
                  </template>
                  <div>REDDIT FEED GOES HERE</div>
                  <reddit-feed></reddit-feed>
                </b-tab-item>

              </b-tabs>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

    name: 'Profile',
    data() {
      return {
        activeTab: 0
      }
    },
    mounted() {},
    created () {
      this.checkAuthentication()
    },
    updated() {
      this.checkAuthentication()
    },
    watch: {},
    computed: {},
    methods: {
      checkAuthentication() {
        let existingToken =  window.localStorage.getItem('token')
        if (_.isEmpty(existingToken) ) {
          this.needsAuthWarning()
          this.$router.replace(this.$route.query.redirect || '/Login')
        }
      },
      needsAuthWarning() {
        this.$toast.open({
          duration: 3500,
          message: 'You need to be logged in to access that page!',
          position: 'is-top',
          type: 'is-danger'
        })
      },
    }
 }
</script>

<style scoped>
  .profile {
    padding-top: 1.5rem;
  }
  .member-linked-accounts {
    margin: 0 .5rem 0 .5rem;
  }
  .tab-top {
    margin: 3rem 0 0 0;
  }
</style>
