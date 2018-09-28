<template>
<div>  
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-centered card-name">
        {{user.username}}
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
            <i class="fab fa-instagram fa-2x"></i>
            <i class="fab fa-twitter fa-2x"></i>
            <i class="fab fa-twitch fa-2x"></i>
            <i class="fab fa-reddit fa-2x"></i>
            <i class="fab fa-spotify fa-2x is-primary"></i>
         </div>
      </div>
    </div>
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
    },
    watch: {},
    computed:{},
    created(){},
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
        await UserService.fetchUser(this.token).then(res => {
          this.user = res.data
        })
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
