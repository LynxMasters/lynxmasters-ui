<template>
<div class="column is-3">
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-centered card-name is-primary">
        {{user.username}}
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
          <label class="label">{{user.username}}</label>
        </div>
        <!-- <div class="content has-text-centered">
        </div> -->
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
  </div>
</div>
</template>
<script>
import UserService from '@/services/UserService'
 export default {
    props: {
     accounts: {},
    },
    mounted() {
      this.token = window.localStorage.getItem('token')
      this.fetchProfile()
    },
    data(){
      return{
        user:{},
      }
    },
    methods: {
      async fetchProfile(){
        await UserService.fetchUser(this.token).then(res =>{
          this.user = res.data
          console.log(this.user)
        })
      }
    },
  }
</script>