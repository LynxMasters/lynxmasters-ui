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
                    <p class="card-header-title is-centered card-name">
                      @{{user.username}}
                    </p>
                  </header>
                  <div class="card-image">
                    <div class="image players-avatar">
                      <img :src="imageSrc ? imageSrc : avatar" class="image">
                    </div>
                  </div>
                  <div class="card-content">
                    <div class="content has-text-centered">
                      <div class="file is-centered is-small">
                        <label class="file-label">
                          <input @change="uploadImage"
                                 type="file"
                                 name="avatar"
                                 accept="image/*"
                                 ref="fileInput"
                                 class="button is-fullwidth file-input is-info">
                          <span class="file-cta">
                            <span class="file-icon">
                              <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                              Upload New Profile Image
                            </span>
                          </span>
                        </label>
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
                      <b-icon class="fas fa-info fa-xs"></b-icon>
                      <span> Personal Info</span>
                    </template>
                    <div class="card">
                      <div class="card-content has-text-centered">
                        <div class="media">
                          <div class="media-content has-text-left">

                            <div class="field">
                              <label class="label">First Name</label>
                              <input
                                :class="['input', ($v.user.firstName.$error) ? 'is-danger' : '']"
                                type="text"
                                placeholder=""
                                v-model="user.firstName"
                                required>
                              <p v-if="$v.user.firstName.$error" class="help is-danger">First Name is required</p>
                            </div>

                            <div class="field">
                              <label class="label">Last Name</label>
                              <input
                                :class="['input', ($v.user.lastName.$error) ? 'is-danger' : '']"
                                type="text"
                                placeholder=""
                                v-model="user.lastName"
                                required>
                              <p v-if="$v.user.lastName.$error" class="help is-danger">Last Name is required</p>
                            </div>

                            <div class="field">
                              <label class="label">Address</label>
                              <input
                                :class="['input', ($v.user.address.$error) ? 'is-danger' : '']"
                                type="text"
                                placeholder=""
                                v-model="user.address"
                                required>
                              <p v-if="$v.user.address.$error" class="help is-danger">Address is required</p>
                            </div>

                            <div class="field">
                              <label class="label">City</label>
                              <input
                                :class="['input', ($v.user.city.$error) ? 'is-danger' : '']"
                                type="text"
                                placeholder=""
                                v-model="user.city"
                                required>
                              <p v-if="$v.user.city.$error" class="help is-danger">City is required</p>
                            </div>

                            <div class="field">
                              <label class="label">State / Province</label>
                              <input
                                :class="['input', ($v.user.state.$error) ? 'is-danger' : '']"
                                type="text"
                                placeholder=""
                                v-model="user.state"
                                required>
                              <p v-if="$v.user.state.$error" class="help is-danger">State / Province is required</p>
                            </div>

                            <div class="field">
                              <label class="label">Zip Code</label>
                              <input
                                :class="['input', ($v.user.zipCode.$error) ? 'is-danger' : '']"
                                type="text"
                                placeholder=""
                                v-model="user.zipCode"
                                required>
                              <p v-if="$v.user.zipCode.$error && !user.zipCode.length > 0" class="help is-danger">Zip code is required</p>
                              <p v-if="!$v.user.zipCode.numeric" class="help is-danger">Zip code must only be numbers</p>
                              <p v-if="!$v.user.zipCode.minLength || !$v.user.zipCode.maxLength" class="help is-danger">
                                Zip code must have at least {{ $v.user.zipCode.$params.minLength.min }} numbers.
                              </p>
                            </div>

                            <div class="field">
                              <label class="label">Country</label>
                              <div class="control">
                                <div class="select is-fullwidth">
                                  <select :class="['input', ($v.user.country.$error) ? 'is-danger' : '']"
                                          v-model="user.country"
                                          required>
                                    <option selected>Country</option>
                                    <option v-for="country in countries">
                                      {{ country.name }}</option>
                                  </select>
                                </div>
                              </div>
                              <p v-if="$v.user.country.$error" class="help is-danger">Country is required</p>
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
                      <b-icon class="fas fa-key fa-xs"></b-icon>
                      <span> Password</span>
                    </template>
                    <div class="card">
                      <div class="card-content has-text-centered">
                        <div class="media">
                          <div class="media-content has-text-left">
                            <div class="field">
                              <label class="label">Old password</label>
                              <input
                                class="input"
                                type="password"
                                placeholder=""
                                required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field">
                              <label class="label">New Password</label>
                              <input
                                class="input"
                                type="password"
                                placeholder=""
                                required>
                              <p class="help is-danger"></p>
                            </div>

                            <div class="field animated flipInX" v-if="$v.user.confirmPassword && !$v.user.confirmPassword.sameAsPassword">
                              <span class="tag is-danger">Passwords Do Not Match!</span>
                            </div>

                            <div class="field">
                              <label class="label">Confirm New Password</label>
                              <input
                                class="input"
                                type="password"
                                placeholder=""
                                required>
                              <p class="help is-danger"></p>
                            </div>


                            <div class="field is-grouped is-pulled-right">
                              <div class="control">
                                <button class="button is-link" v-on:click="updatePassword()">Save</button>
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  </b-tab-item>
                  <b-tab-item>
                    <template slot="header">
                      <b-icon class="fas fa-at fa-xs"></b-icon>
                      <span> Email</span>
                    </template>
                    <div class="card">
                      <div class="card-content has-text-centered">
                        <div class="media">
                          <div class="media-content has-text-left">

                            <div class="field">
                              <label class="label">Current Email</label>
                              <div class="control">
                                <input :class="['input', ($v.tempUser.tempOldEmail.$error) ? 'is-danger' : '']"
                                       type="text"
                                       placeholder="Current Email"
                                       v-model="tempUser.tempOldEmail">
                              </div>
                              <p v-if="$v.tempUser.tempOldEmail.$error" class="help is-danger">This email is invalid</p>
                            </div>

                            <div class="field">
                              <label class="label">New Email</label>
                              <div class="control">
                                <input :class="['input', ($v.tempUser.tempNewEmail.$error) ? 'is-danger' : '']"
                                       type="text"
                                       placeholder="New Email"
                                       v-model="tempUser.tempNewEmail">
                              </div>
                              <p v-if="$v.tempUser.tempNewEmail.$error" class="help is-danger">This email is invalid</p>
                            </div>

                            <div class="field is-grouped is-pulled-right">
                              <div class="control">
                                <button class="button is-link" v-on:click="updateUserEmail()">Save</button>
                              </div>
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
  import {required, numeric, minLength, maxLength, email, sameAs} from 'vuelidate/lib/validators'
  import defaultImage from '@/assets/images/default_profile.png'

  export default {
      mixins: [validationMixin],
      name: "AccountManagement",
      data() {
        return {
          user: {},
          tempUser: {
            tempOldEmail: '',
            tempNewEmail: '',
            password: ''
          },
          imageSrc: '',
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
        },
        tempUser: {
          tempOldEmail: {
            required,
            email,
            sameAsEmail: sameAs('this.user.email')
          },
          tempNewEmail: {
            required,
            email
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
      computed: {
        avatar() {
          return this.user.avatar ? `../static/uploads/${this.user.avatar}` : defaultImage
        }
      },
      methods: {
        async getUserAccountInfo() {
          await UserService.fetchUser(this.token).then(res => {
            this.user = res.data
            console.log(this.user.avatar)
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
        infoSaved() {
          this.$toast.open({
            message: 'Your information was updated!',
            type: 'is-success',
            position: 'is-top',
            duration: 5000
          })
        },
        errorAlert() {
          this.$toast.open({
            duration: 5000,
            message: `There was a problem saving!`,
            position: 'is-top',
            type: 'is-danger'
          })
        },
        async updateUserInfo() {
          await UserService.updateUser(this.user,this.token).then(res => {
            if (res.data.errors) {
              this.errors = res.data.errors
              this.errorAlert()
            } else {
              this.infoSaved()
            }
          })
        },
        async updateUserEmail() {
          if (this.user.email === this.tempUser.tempOldEmail && !(this.tempUser.tempNewEmail === this.tempUser.tempOldEmail)){
            this.user.email = this.tempUser.tempNewEmail
            await UserService.updateUser(this.user,this.token).then(res => {
              if (res.data.errors) {
                this.errors = res.data.errors
                this.tempUser.tempOldEmail = ''
                this.tempUser.tempNewEmail = ''
                this.errorAlert()
              } else {
                this.tempUser.tempOldEmail = ''
                this.tempUser.tempNewEmail = ''
                this.infoSaved()
              }
            })
          } else {
            this.tempUser.tempOldEmail = ''
            this.tempUser.tempNewEmail = ''
            this.errorAlert()
          }
        },
        updatePassword(){
          console.log('byaaaaa')
        },
        uploadImage(e) {
          let files = e.target.files
          if(!files[0]) {
            return
          }
          let data = new FormData()
          data.append('user', this.user.firstName + this.user.lastName)
          data.append('image', files[0])
          let reader = new FileReader()
          let fileName = files[0].name
          reader.onload = (e) => {
            this.user.avatar = `${this.user.firstName + this.user.lastName}.${fileName.substr(fileName.lastIndexOf('.') + 1)}`
            this.imageSrc = e.target.result
          }

          UserService.uploadAvatar(data).then(res => {
            reader.readAsDataURL(files[0])
            this.user.avatar = res.data.filename
            this.updateUserInfo()
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
</script>

<style scoped>

</style>
