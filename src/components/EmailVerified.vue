<template>
  <div class="verification">
    <section class="hero is-light is-medium foot-fill">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-half">
              <div class="card">
                <div class="card-content">
                  <p class="title has-text-centered">
                    Hold tight...<br> We're just verifying everything!
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
                      <p>
                        <span class="tag is-warning is-large animated pulse">
                          Thank you {{ user.firstName + ' ' +  user.lastName }}!
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      userVerified() {
        this.$toast.open({
          duration: 4500,
          message: `You're all set to login!`,
          position: 'is-top',
          type: 'is-success'
        })
      },
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
        setTimeout(function () {
          vm.userVerified()
          vm.$router.push({ name: "Login"})
        }, 3500)
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
  .foot-fill {
    margin-bottom: -5rem;
  }
</style>
