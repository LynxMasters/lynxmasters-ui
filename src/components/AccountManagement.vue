<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Account Management
          </h1>
        </div>
      </div>
    </section>
    <section>
      <div class="columns is-centered">
        <div class="column is-two-fifths">
          <div class="columns is-centered">
            <div class="column is-four-fifths">
              <div class="card">
                <div class="card-image">
                  <figure class="image">
                    <!--
                    <img :src="imageSrc ? imageSrc : avatar" class="image" alt="profile avatar">
                    -->
                    <img src="http://via.placeholder.com/350x400">
                  </figure>
                </div>
                <div class="card-content has-text-centered">
                  <div class="media">
                    <div class="media-content has-text-centered">
                      <!--
                      <p class="title is-4">{{ tempUser.firstName + ' ' + tempUser.lastName }}</p>
                      <p class="subtitle is-6">@{{ tempUser.username }}</p>
                      -->
                      <p class="title is-3">FirstName LastName</p>
                      <p class="subtitle is-5">@Usernamwe</p>
                    </div>
                  </div>
                  <div class="content">
                    <!--
                    <div>{{ tempUser.email }}</div>
                    <div>{{ tempUser.address }}</div>
                    <div>{{ tempUser.city + ' ' + tempUser.state + ' ' + tempUser.zipCode }}</div>
                    <div>{{ tempUser.country }}</div>
                    -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- start other column -->
        <div class="column is-half">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title is-centered">Personal Information</p>
            </header>
            <div class="card-content has-text-centered">
              <div class="media">
                <div class="media-content has-text-left">
                  <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        class="input"
                        type="email"
                        placeholder="joey@google.com">
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <span class="icon is-small is-right" >
                        <i class="fas fa-exclamation-triangle"></i>
                      </span>
                    </div>
                    <p class="help is-danger"></p>
                  </div>
                  <!--
                  <p class="title is-4">{{ tempUser.firstName + ' ' + tempUser.lastName }}</p>
                  <p class="subtitle is-6">@{{ tempUser.username }}</p>
                  -->
                  <p class="title is-1">FirstName LastName</p>
                  <p class="subtitle is-6">@Usernamwe</p>
                </div>
              </div>
              <div class="content">

                <!--
                <div>{{ tempUser.email }}</div>
                <div>{{ tempUser.address }}</div>
                <div>{{ tempUser.city + ' ' + tempUser.state + ' ' + tempUser.zipCode }}</div>
                <div>{{ tempUser.country }}</div>
                -->
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
        name: "AccountManagement"
    }
</script>

<style scoped>

</style>
