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
                      <p class="title is-3">{{ tempUser.firstName + ' ' + tempUser.lastName }}</p>
                      <p class="subtitle is-5">@{{ tempUser.username }}</p>
                      -->
                      <p class="title is-3">FirstName LastName</p>
                      <p class="subtitle is-5">@Usernamwe</p>
                    </div>
                  </div>
                  <div class="content">
                    <!--
                    <p>{{ tempUser.email }}</p>
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
                      <input
                        class="input"
                        type="email"
                        placeholder=""
                        required>
                    <p class="help is-danger"></p>
                  </div>

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
        </div>
        <!-- end column -->

      </div>

      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="columns is-centered">
            <div class="column is-four-fifths">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title is-centered">Linked Accounts</p>
                </header>
                <div class="card-content has-text-centered">
                  <div class="media">
                    <div class="media-content has-text-centered">
                      <!--
                      <p class="title is-3">{{ tempUser.firstName + ' ' + tempUser.lastName }}</p>
                      <p class="subtitle is-5">@{{ tempUser.username }}</p>
                      -->
                      <p class="title is-3">FirstName LastName</p>
                      <p class="subtitle is-5">@Usernamwe</p>
                    </div>
                  </div>
                  <div class="content">
                    <!--
                    <p>{{ tempUser.email }}</p>
                    -->
                  </div>
                </div>
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
