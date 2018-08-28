<template>
  <!-- Social Add-Ons -->
  <section class="container animated fadeIn">
    <div class="intro column is-8 is-offset-2">
      <h2 class="title">Link Accounts</h2><hr>
    </div>
    <div id="social" class="columns features">
      <!-- BEGIN TWITTER CARDS -->
      <twitter :accounts="accounts"></twitter>
      <!-- END TWITTER CARDS -->

      <!-- BEGIN TWITCH CARDS -->
      <twitch :accounts="accounts"></twitch>
      <!-- END TWITCH CARDS -->

      <!--  BEGIN REDDIT CARDS -->
      <reddit :accounts="accounts"></reddit>
      <!-- END REDDIT CARDS -->
    </div>
  </section>
</template>

<script>

  import Twitter from './TwitterProfile.vue'
  import Reddit from './RedditProfile.vue'
  import Twitch from './TwitchProfile.vue'

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
      accounts(){
        return this.$store.getters['accounts/getAccounts']
      },
    },
    created () {
      this.token = window.localStorage.getItem('token')
      this.checkAuthentication()
      this.$store.dispatch('accounts/fetchAccounts', this.token)
      this.$store.dispatch('profiles/fetchProfiles', this.token)
    },
    updated() {
      this.checkAuthentication()
    },
    mounted() {
      // this.token = window.localStorage.getItem('token')
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
