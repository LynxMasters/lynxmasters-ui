<template>
  <section class="hero is-fullheight animated fadeIn">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="card">
              <div v-if='!isLoading' class="card-content">
                <div class="field animated flipInX has-text-centered" v-if="errors.email || errors.password">
                  <span class="tag is-danger">Email or Password is incorrect</span>
                </div>
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input"
                      type="email"
                      v-model="user.email"
                      v-on:input="checkFormFields"
                      v-bind:class="{ 'is-danger': errors.email, 'is-danger': error.email }"
                      placeholder="joey@google.com">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    <span class="icon is-small is-right" v-if="errors.email || error.email">
                        <i class="fas fa-exclamation-triangle"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="error.email">{{error.email}}</p>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input"
                      type="password"
                      v-model="user.password"
                      v-on:input="checkFormFields"
                      v-bind:class="{'is-danger': errors.password, 'is-danger': error.password }"
                      placeholder="supersecretpassword"
                      @keyup.enter="validateForm()">
                    <span class="icon is-small is-left">
                        <i class="fas  fa-unlock-alt"></i>
                      </span>
                    <span class="icon is-small is-right" v-if="errors.password || error.password">
                        <i class="fas fa-exclamation-triangle"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="error.password">{{error.password}}</p>
                </div>

                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link" v-on:click="validateForm()">Submit</button>
                  </div>
                  <div class="control">
                    <button class="button is-text">Cancel</button>
                  </div>
                </div>
              </div>
               <div class="card-content" v-if="isLoading">
                <div class="content has-text-centered">
                  <loading-progress
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
        </div>

      </div>
    </div>
  </section>
</template>


<script>
  import _ from 'lodash'
  import Authentication from '@/services/Authentication'

  export default {
    name: 'Login',
    data() {
      return {
        user: {
          email: '',
          password: ''
        },
        errors: {},
        validUser: false,
        invalidCredentials: false,
        invalidMessage: '',
        error: {
          email: '',
          password: ''
        },
        isLoading: false,
        indeterminate: true,
        progress: 0,
        counterClockwise: false,
        hideBackground: false,
      }
    },
    methods: {
      checkFormFields:  _.debounce(function () {
        this.invalidMessage = ''
        this.invalidCredentials = false
        this.validUser = false
        if (this.user.email) {
          this.error.email = ''
        }
        if (this.user.password) {
          this.error.password = ''
        }
      }, 500),
      validateForm() {
        if (!this.user.email) {
          this.error.email = 'Email is required'
        } else {
          this.error.email = ''
        }
        if (!this.user.password) {
          this.error.password = 'Password is required'
        } else {
          this.error.password = ''
        }
        if (this.error.email && this.error.password) {
          this.errorMsg('Please fill out all form fields')
        }
        if (!this.error.email && !this.error.password) {
          this.confirmUser()
        }
      },
      errorMsg(message) {
        this.$toast.open({
          duration: 3500,
          message: message,
          position: 'is-top',
          type: 'is-danger'
        })
      },
      successAlert(message) {
        this.$toast.open({
          duration: 3500,
          message: message,
          position: 'is-top',
          type: 'is-success'
        })
      },
      async confirmUser() {
        await Authentication.loginUser(this.user).then(res => {
          if (res.data.errors) {
            console.log('THERE ARE ERRORS')
            this.errors = res.data.errors
            console.log(this.errors)
          } else if (res.data.status === 400) {
            this.errorMsg('Email does not exist!')
          } else if (res.data.status === 401) {
            this.errorMsg('Invalid email or password!')
          } else {
            this.validUser = true
            this.$store.commit('user/auth_success', res.data.token, res.data.name)
            window.localStorage.setItem('token', res.data.token)
            this.successAlert('Welcome, ' + res.data.name)
            document.cookie = 'token='+res.data.token+';'
            let linkedAccounts = res.data.linkedAccounts
            if (_.isEmpty(linkedAccounts.reddit.access_token) &&
              _.isEmpty(linkedAccounts.twitter.oauth_token) &&
              _.isEmpty(linkedAccounts.twitch.access_token)) {
              this.$router.push('LinkAccounts')
            } else {
              this.isLoading = true
              this.$store.dispatch('accounts/fetchAccounts', res.data.token)
              this.$store.dispatch('feeds/fetchReddit', res.data.token)
              this.$store.dispatch('feeds/fetchTwitch', res.data.token)
              this.$store.dispatch('feeds/fetchTwitter', res.data.token)

              setTimeout(() => {
                this.$router.push('Profile')
              }, 3000)
              
            }
          }
        })
      }
    }
  }
</script>


<style scoped>

</style>
