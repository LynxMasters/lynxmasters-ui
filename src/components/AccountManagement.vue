<template>
  <div>
    <section class="hero animated fadeIn">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Account Management
          </h1>
        </div>
      </div>
    </section>

    <section class="accountManagement animated fadeIn">
      <div class="columns">
        <div class="column">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-3">
                <div class="card">
                  <header class="card-header">
                    <p class="card-header-title is-centered card-name is-primary">
                      @{{user.username}}
                    </p>
                  </header>
                  <div class="card-image">
                    <div class="image players-avatar">
                      <img v-bind:src="`../static/uploads/${user.avatar}`">
                    </div>
                  </div>
                  <div class="card-content">
                    <div class="content has-text-centered">

                      <div class="field">
                        <label class="label">{{user.firstName}} {{user.lastName}}</label>
                      </div>

                      <div class="field">
                        <label class="label">Followers: 333</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-content">
                    <div class="content has-text-centered">
                      <router-link v-bind:to="{ name: 'LinkAccounts' }"
                                   class="member-linked-accounts" exact>
                        <i class="fab fa-twitter fa-2x"></i>
                      </router-link>
                      <router-link v-bind:to="{ name: 'LinkAccounts' }"
                                   class="member-linked-accounts" exact>
                        <i class="fab fa-twitch fa-2x"></i>
                      </router-link>
                      <router-link v-bind:to="{ name: 'LinkAccounts' }"
                                   class="member-linked-accounts" exact>
                        <i class="fab fa-reddit fa-2x"></i>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-7 tab-top">
                <b-tabs size="is-medium"
                        position="is-centered"
                        type="is-boxed">
                  <b-tab-item>
                    <template slot="header">
                      <b-icon class="fas fa-info"></b-icon>
                      <span> Personal Info</span>
                    </template>
                    <div class="card">
                      <div class="card-content has-text-centered">
                        <div class="media">
                          <div class="media-content has-text-left">

                            <div class="field">
                              <label class="label">First Name</label>
                              <input
                                :class="['input', (updateUser.firstName.$error) ? 'is-danger' : '']"
                                type="text"
                                placeholder=""
                                v-model="user.firstName"
                                required>
                              <p v-if="updateUser.firstName.$error" class="help is-danger">First Name is required</p>
                            </div>

                            <div class="field">
                              <label class="label">Last Name</label>
                              <input
                                class="input"
                                type="text"
                                placeholder=""
                                v-model="user.lastName"
                                required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">Address</label>
                              <input
                                class="input"
                                type="text"
                                placeholder=""
                                v-model="user.address"
                                required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">City</label>
                              <input
                                class="input"
                                type="text"
                                placeholder=""
                                v-model="user.city"
                                required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">State / Province</label>
                              <input class="input"
                                     type="text"
                                     placeholder=""
                                     v-model="user.state"
                                     required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">Zip Code</label>
                              <input class="input"
                                     type="text"
                                     placeholder=""
                                     v-model="user.zipCode"
                                     required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">Country</label>
                              <div class="control">
                                <div class="select is-fullwidth">
                                  <select class="input"
                                          v-model="user.country"
                                          required>
                                    <option selected>Country</option>
                                    <option v-for="country in countries">
                                      {{ country.name }}</option>
                                  </select>
                                </div>
                              </div>
                              <!--
                              <p v-if="$v.user.country.$error" class="help is-danger">Country is required</p>
                              -->
                            </div>

                            <div class="field is-grouped is-pulled-right">
                              <div class="control">
                                <button class="button is-link" v-on:click="updateUserInfo()">Save</button>
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  </b-tab-item>
                  <b-tab-item>
                    <template slot="header">
                      <b-icon class="fas fa-key"></b-icon>
                      <span> Password</span>
                    </template>
                    <div>OLD PASSWORD THEN NEW PASSWORD 2x STUFF HERE</div>
                  </b-tab-item>
                  <b-tab-item>
                    <template slot="header">
                      <b-icon class="fas fa-at"></b-icon>
                      <span> Email</span>
                    </template>
                    <div class="card">
                      <div class="card-content has-text-centered">
                        <div class="media">
                          <div class="media-content has-text-left">
                            <div class="field">
                              <label class="label">Current Email</label>
                              <input
                                class="input"
                                type="email"
                                placeholder=""
                                required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">New Email</label>
                              <input
                                class="input"
                                type="email"
                                placeholder=""
                                required>
                              <p class="help is-danger"></p>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  </b-tab-item>
                </b-tabs>

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
  import countries from '@/assets/countries.json'
  import {validationMixin} from 'vuelidate'
  import {required, numeric, minLength, maxLength} from 'vuelidate/lib/validators'
    export default {
      mixins: [validationMixin],
      name: "AccountManagement",
      data() {
        return {
          user: {},
          updateUser: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''

          },
          countries
        }
      },
      validations: {
        user: {
          firstName: {
            required
          },
          lastName: {
            required
          },
          address: {
            required
          },
          city: {
            required
          },
          state: {
            required
          },
          zipCode: {
            required,
            numeric,
            minLength: minLength(5),
            maxLength: maxLength(5)
          },
          country: {
            required
          }
        }
      },
      mounted() {
        this.token = window.localStorage.getItem('token')
        this.getUserAccountInfo()
      },
      created () {
        this.checkAuthentication()
      },
      updated() {
        this.checkAuthentication()
      },
      watch: {},
      computed: {},
      methods: {
        async getUserAccountInfo() {
          await UserService.fetchUser(this.token).then(res => {
            this.user = res.data
            console.log(res.data)
          })
        },
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
        personalInfoSaved() {
          this.$snackbar.open({
            message: 'Your personal information was updated!',
            type: 'is-warning',
            position: 'is-top',
            actionText: 'GOT IT!',
            duration: 5000
          })
        },
        errorAlert() {
          this.$toast.open({
            duration: 5000,
            message: `There was a problem saving!`,
            position: 'is-bottom',
            type: 'is-danger'
          })
        },
        async updateUserInfo() {
          await UserService.updateUser(this.user,this.token).then(res => {
            if (res.data.errors) {
              this.errors = res.data.errors
              this.errorAlert()
            } else {
              this.personalInfoSaved()
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
