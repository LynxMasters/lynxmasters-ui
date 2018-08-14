<template>
  <section class="profile">
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
                  <div class="content">
                    <div class="field">
                      <label class="label">Username</label>
                    </div>
                    <div class="field">
                      <label class="label">Followers: </label>
                      <label class="label">Following: </label>
                    </div>
                  </div>
                </div>
                <footer class="card-footer">
                  <!--<router-link v-bind:to="{ name: 'EditProfile', params: { id: user._id } }"-->
                               <!--class="card-footer-item is-primary">Edit-->
                  <!--</router-link>-->
                </footer>
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
                      <i style="color: grey;" class="fab fa-reddit fa-2x"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-7">
              <div class="tabs is-boxed">
                <ul>
                  <li v-for="tab in tabs" v-bind:class="{'is-active': tab.isActive}">
                    <a @click="selectTab(tab)">
                    <span class="icon is-small">
                      <i  v-bind:class=[tab.icon]  aria-hidden="true"></i>
                    </span>
                      <span> {{ tab.displayName }} </span>
                    </a>
                  </li>
                </ul>
              </div>


              <twitter-feed twitter-feed="twitter-feed"></twitter-feed>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

    name: 'Profile',
    props: ["twitter-feeed"]
    data() {
      return {
        isActive: false,
        tabs: [
          {
            name: 'All',
            displayName: 'All',
            icon: 'fas fa-align-justify'

          }, {
            name: 'Twitter',
            displayName: 'Twitter',
            icon: 'fas fa-twitter'
          }, {
            name: 'Twitch',
            displayName: 'Twitch',
            icon: 'fas fa-twitch'
          }, {
            name: 'Reddit',
            displayName: 'Reddit',
            icon: 'fas fa-reddit'
          }
        ]
      }
    },
    mounted() {
      this.tabs[0].isActive = true
    },
    watch: {},
    computed: {},
    methods: {
      selectTab(selectedTab) {
        this.tabs.forEach(
          function(tab){
            tab.isActive = (selectedTab.name === tab.name)
          }
        )
        if (selectedTab.name === 'stats') {
          this.showStats = true
          this.loadGraphs()
        } else {
          this.showStats = false
        }
      },
    }
 }
</script>

<style scoped>
.member-linked-accounts {
  margin: 0 .5rem 0 .5rem;
}
</style>
