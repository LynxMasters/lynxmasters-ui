<template>
<div class="columns">
<!--   <div class="card">
    <header class="card-header">
      <p class="card-header-title is-centered card-name">
        @{{user.username}}
      </p>
    </header>
    <div class="card-image">
      <div class="image players-avatar">
        <img :src="profileAvatar(user.avatar)" class="image" alt="profile avatar">
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-content">
      <div class="content has-text-centered">
        <div class="field">
            <label class="label">Linked Accounts</label>
         </div>
        <router-link v-bind:to="{ name: 'LinkAccounts' }"
        class="member-linked-accounts" exact>
        <i v-if="accounts.twitter.linked" class="fab fa-twitter fa-2x"></i>
        </router-link>
        <router-link v-bind:to="{ name: 'LinkAccounts' }"
        class="member-linked-accounts" exact>
        <i v-if="accounts.twitch.linked" class="fab fa-twitch fa-2x"></i>
        </router-link>
        <router-link v-bind:to="{ name: 'LinkAccounts' }"
        class="member-linked-accounts" exact>
        <i v-if="accounts.reddit.linked" class="fab fa-reddit fa-2x"></i>
        </router-link>
      </div>
    </div>
  </div> -->
  <div class="column is-2 is-offset-2">
    <figure class="image is-150x150">
          <img class="round" :src="profileAvatar(user.avatar)">
    </figure>
  </div>
  <div class="column is-4">
    <h1 class="title has-text-centered">{{user.username}}</h1>
    <nav class="level is-mobile">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{profile.col1}}</p>
          <p>{{profile.col1Val}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{profile.col2}}</p>
          <!-- <p v-html="profileBioOrLikes"></p> -->
          <p>{{profile.col2Val}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{profile.col3}}</p>
          <p>{{profile.col3Val}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{profile.col4}}</p>
          <p>{{profile.col4Val}}</p>
        </div>
      </div>
    </nav>
  </div>
</div>
</template>
<script>
  import defaultProfileImage from '@/assets/images/default_profile.png'
  import UserService from '@/services/UserService'
  import _ from 'lodash'

  export default {
    props: {
      isMember: false,
      username: null,
      activeTab: null,
    },
    watch: {
    },
    computed:{
      profile(){
        if(this.activeTab == 0){
          return this.$store.getters['twitter/getStats']
        }
        if(this.activeTab == 1){
          return this.$store.getters['twitter/getStats']
        }
        if(this.activeTab == 2){
          return this.$store.getters['twitch/getStats']
        }
        if(this.activeTab == 3){
          return this.$store.getters['reddit/getStats']
        }
      },
      profileBioOrLikes() {
        return _.isNull(this.profile.col2Val) ? "&nbsp;" : this.profile.likes
      }
    },
    created(){
      this.$store.dispatch('reddit/fetchProfile')
      this.$store.dispatch('twitch/fetchProfile')
      this.$store.dispatch('twitter/fetchProfile')
    },
    mounted() {
      this.token = window.localStorage.getItem('token')
      this.fetchProfile()
    },
    data() {
      return {
        user: {},
      }
    },
    methods: {
      async fetchProfile() {
        if(!this.isMember){
          await UserService.fetchUser(this.token).then(res => {
            this.user = res.data
          })
        }else{
          await UserService.getMember(this.username).then(res => {
            this.user = res.data
          })
        }
      },
      profileAvatar(image) {
        return image ? `/static/uploads/${image}` : defaultProfileImage
      }
    },
  }
</script>
<style>
  .round{
    border-radius: 50%;
  }
  .divider{
    border-bottom: 1px solid rgba(219, 219, 219, 0.5);
  }
</style>
