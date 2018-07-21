<template>
  <div class="verification">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Lynxmasters Verification
          </h1>
        </div>
      </div>
    </section>
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <p class="title has-text-centered">
              Hold tight. We're just verifying everything!
            </p>
          </div>
          <div class="card-content has-text-centered">
            <div class="circle-loader"
                v-bind:class="isVerified">
              <div class="checkmark draw"
                v-bind:class="display"></div>
            </div>
            <div>
              <div v-if="verified">
                <p>Thank you {{ user.firstName + ' ' +  user.lastName }}!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserService from '@/services/UserService'
  export default {
    name: "EmailVerified",
    data() {
      return {
        userParams: {
          id: null,
          emailToken: null
        },
        user: {},
        verified: false,
      }
    },
    watch: {},
    computed: {
      isVerified() {
        return (this.verified)
          ? 'load-complete' : ''
      },
      display() {
        return (this.verified)
          ? 'no-display' : ''
      }
    },
    mounted() {
      this.checkUser()
    },
    methods: {
      checkVerification() {
        this.verified = !this.verified
      },
      getUrlParameters() {
        this.userParams.id = this.$route.query.id
        this.userParams.emailToken = this.$route.query.email_id
      },
      async checkUser() {
        const response = await UserService.checkUserIdentifiers(this.userParams)
        this.user = response.data
        let vm = this
        setTimeout(function() {
          vm.checkVerification()
        }, 2000)
      },
    },
    beforeMount(){
      this.getUrlParameters()
    }
  }
</script>

<style scoped type="scss">
  .no-display {
    display: block!important;
  }
</style>
