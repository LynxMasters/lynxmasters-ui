<template>
  <div class="signup-steps">
    <section>
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img :src="imageSrc ? imageSrc : avatar" class="image" alt="profile avatar">
              </figure>
            </div>
            <div class="card-content has-text-centered">
              <div class="media">
                <div class="media-content has-text-centered">
                  <p class="title is-4">{{ tempUser.firstName + ' ' + tempUser.lastName }}</p>
                  <p class="subtitle is-6">@{{ tempUser.username }}</p>
                </div>
              </div>
              <div class="content">
                <div>{{ tempUser.email }}</div>
                <div>{{ tempUser.address }}</div>
                <div>{{ tempUser.city + ' ' + tempUser.state + ' ' + tempUser.zipCode }}</div>
                <div>{{ tempUser.country }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import defaultImage from '@/assets/images/default-avatar.png'

  export default {
    name: "StepFour",
    data() {
      return {
        user: {},
        tempUser: {},
        imageSrc: ''
      }
    },
    watch: {},
    computed: {
      avatar() {
        return this.tempUser.avatar ? `/static/uploads/${this.tempUser.avatar}` : defaultImage
      }
    },
    mounted() {
      this.tempUser = this.$store.getters.getUser
      this.$emit('can-continue', {value: true});
    },
    methods: {}
  }
</script>

<style scoped>

</style>
