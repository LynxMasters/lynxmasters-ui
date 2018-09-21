<template>
  <!-- Social Add-Ons -->
  <section class="container animated fadeIn">
    <div class="intro column is-8 is-offset-2">
      <h2 class="title">Link Accounts</h2><hr>
    </div>
    <div id="social" class="columns features">
      <!-- BEGIN TWITTER CARDS -->
      <twitter></twitter>
      <!-- END TWITTER CARDS -->

      <!-- BEGIN TWITCH CARDS -->
      <twitch></twitch>
      <!-- END TWITCH CARDS -->

      <!--  BEGIN REDDIT CARDS -->
      <reddit></reddit>
      <!-- END REDDIT CARDS -->
    </div>
  </section>
</template>

<script>

  import Twitter from './twitter/TwitterProfile.vue'
  import Reddit from './reddit/RedditProfile.vue'
  import Twitch from './twitch/TwitchProfile.vue'

  export default {
    name: 'LinkAccounts',
    data() {
      return {
        token: null,
        linkedMessage: 'Looks like you have linked at least one account'
      }
    },
    components:{
      'twitter': Twitter,
      'reddit': Reddit,
      'twitch': Twitch,
    },
    computed:{
    },
    created () {
      this.token = window.localStorage.getItem('token')
      this.checkAuthentication()
      this.$store.dispatch('reddit/fetchProfile', this.token)
      this.$store.dispatch('twitch/fetchProfile', this.token)
      this.$store.dispatch('twitter/fetchProfile', this.token)
    },
    updated() {
      this.checkAuthentication()
    },
    mounted() {
    },
    watch: {},
    methods:{

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
