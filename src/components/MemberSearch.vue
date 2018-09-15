<template>
  <div class="membersearch animated fadeIn">
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            LynxMasters Search
          </h1>
          <h2 class="subtitle">
            Search through all LynxMasters users
          </h2>
          <div class="columns is-centered">
            <div class="column is-4">
              <b-field>
                <b-autocomplete
                  v-model="name"
                  :data="filteredDataArray"
                  placeholder="Joe Schmoe"
                  icon-pack="fas"
                  icon="fa-search-plus"
                  @select="option => selected = option">
                  <template slot="empty">No results found</template>
                </b-autocomplete>
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section  v-if="!dataLoaded" class="hero is-medium">
      <div class="hero-body has-text-centered">
        <div class="container">
          <loading></loading>
          <h2 class="subtitle">
            Loading LynxMasters Members...
          </h2>
        </div>
      </div>
    </section>

    <template v-if="dataLoaded">
      <div v-if="lynxUsers && lynxUsers.length > 0">
        <div class="container">
          <div id="member" class="columns is-multiline">
            <div class="column is-4 same-height" v-for="(user) in lynxUsers">
              <div class="card bottom-space">
                <div class="card-image">
                  <figure class="image">
                    <img :src="profileAvatar(user.avatar)" class="image" alt="profile avatar">
                  </figure>
                </div>
                <div class="card-content has-text-centered">
                  <div class="media">
                    <div class="media-content has-text-centered">
                      <p class="title is-4">{{ user.firstName + ' ' + user.lastName }}</p>
                      <p class="subtitle is-6">@{{ user.username }}</p>
                    </div>
                  </div>
                  <div class="content">
                    <div>{{ user.email }}</div>
                    <div>{{ user.address }}</div>
                    <div>{{ user.city + ' ' + user.state + ' ' + user.zipCode }}</div>
                    <div>{{ user.country }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <a  @click="member(user)" class="card-footer-item is-link">Profile</a>
                  <a href="#" class="card-footer-item is-link"
                     @click="followUser(user)">Follow</a>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import UserService from '@/services/UserService'
  import Loading from "./Loading.vue"
  import defaultImage from '@/assets/images/default_profile.png'

  export default {
    name: "MemberSearch",
    components: {Loading},
    data() {
      return {
        lynxUsers: [],
        dataLoaded: false,
        data: [
          'Joe Schmoe',
          'Joey Beans',
          'Sidney Palowski',
          'Lenny Barturst',
          'Amanda Hendricks',
          'Tommy Isaio',
          'Pepe Serpico',
          'Rachel Doogleschmut',
        ],
        name: '',
        selected: null
      }
    },
    mounted() {
      this.getUsers()
    },
    computed: {
      filteredDataArray() {
        return this.data.filter((option) => {
          return option
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        })
      }
    },
    methods: {
      async getUsers() {
        this.dataLoaded = false
        const response = await UserService.fetchUsers(window.localStorage.getItem('token'))
        this.lynxUsers = response.data.users
        this.dataLoaded = true
        this.$store.dispatch('member/resetState')
        this.$store.dispatch('profile/resetStats')
      },
      profileAvatar(image) {
        return image ? `/static/uploads/${image}` : defaultImage
      },
      member(user){
        this.$store.commit('member/setMember', user)
        this.$router.push({
          name: 'Member',
          params: { username: user.username }
        });
      }
    }
  }
</script>

<style scoped>

</style>
