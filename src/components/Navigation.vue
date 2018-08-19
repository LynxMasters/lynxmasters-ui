<template>
  <nav class="navbar is-dark nav-contain" id="navigation">
    <div class="navbar-brand">
      <router-link v-bind:to="{ name: 'Landing' }" class="navbar-item" active-class="link-is-active" exact>
        <img src="../../static/landing-images/lynxLogo-light.png" alt="LynxMasters Logo">
        <span> LynxMasters</span>
      </router-link>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-end">
        <router-link v-bind:to="{ name: 'Login' }"
                     class="navbar-item"
                     active-class="link-is-active"
                     v-if="!authenticatedUser" exact>
          <span class="icon ">
            <i class="fas fa-sign-in-alt"></i>
          </span>
          <span>Login</span>
        </router-link>
        <router-link v-bind:to="{ name: 'Signup' }"
                     class="navbar-item"
                     active-class="link-is-active"
                     v-if="!authenticatedUser" exact>
          <span class="icon">
            <i class="fas fa-user-plus"></i>
          </span>
          <span>Signup</span>
        </router-link>
        <router-link v-bind:to="{ name: 'Search' }"
                     class="navbar-item"
                     active-class="link-is-active"
                     v-if="authenticatedUser" exact>
          <span class="icon ">
            <i class="fas fa-search-plus"></i>
          </span>
          <span>Search</span>
        </router-link>
        <router-link v-bind:to="{ name: 'Profile' }"
                     class="navbar-item"
                     active-class="link-is-active"
                     v-if="authenticatedUser" exact>
          <span class="icon ">
            <i class="fas fa-user-circle"></i>
          </span>
          <span>Profile</span>
        </router-link>
        <router-link v-bind:to="{ name: 'AccountManagement' }"
                     class="navbar-item"
                     active-class="link-is-active"
                     v-if="authenticatedUser" exact>
          <span class="icon ">
            <i class="fas fa-id-card"></i>
          </span>
          <span>Account</span>
        </router-link>
        <router-link v-on:click.native="logout()"
                     v-bind:to="{ name: 'Landing' }"
                     class="navbar-item"
                     v-if="authenticatedUser" exact>
          <span class="icon ">
            <i class="fas fa-sign-out-alt"></i>
          </span>
          <span>Logout</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navigation',
    data() {
      return {}
    },
    computed: {
      authenticatedUser() {
        return this.$store.getters['user/authenticatedUser']
      }
    },
    methods: {
      logout() {
        this.$store.commit('user/logout')
      }
    }
  }
</script>

<style scoped>

</style>
