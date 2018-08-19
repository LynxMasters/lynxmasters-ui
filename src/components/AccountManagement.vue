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
                                class="input"
                                type="text"
                                placeholder=""
                                required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">Last Name</label>
                              <input
                                class="input"
                                type="text"
                                placeholder=""
                                required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">Address</label>
                              <input
                                class="input"
                                type="text"
                                placeholder=""
                                required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">City</label>
                              <input
                                class="input"
                                type="text"
                                placeholder=""
                                required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">State / Province</label>
                              <input class="input"
                                     type="tex"
                                     placeholder=""
                                     required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">Zip Code</label>
                              <input class="input"
                                     type="tex"
                                     placeholder=""
                                     required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">Country</label>
                              <div class="control">
                                <div class="select is-fullwidth">
                                  <select class="input"
                                          required>
                                    <option selected>Country</option>
                                    <!--
                                    <option v-for="country in countries">
                                      {{ country.name }}</option>
                                      -->
                                  </select>
                                </div>
                              </div>
                              <!--
                              <p v-if="$v.user.country.$error" class="help is-danger">Country is required</p>
                              -->
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
                    <twitter-feed twitter-feed="twitter-feed"></twitter-feed>
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
    export default {
        name: "AccountManagement",
      /*
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
      }*/
    }
</script>

<style scoped>

</style>
