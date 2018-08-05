<template>
  <div class="signup-steps">
    <section>
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="card">
            <div class="field">
              <img :src="imageSrc ? imageSrc : avatar" class="image">
              <input @change="uploadImage"
                     type="file"
                     name="photo"
                     accept="image/*"
                     ref="fileInput"
                     class="button is-fullwidth is-info">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
  import {validationMixin} from 'vuelidate'
  import {required, email, sameAs, minLength } from 'vuelidate/lib/validators'
  import defaultImage from '@/assets/images/default-avatar.png'
  import UserService from "../../services/UserService";

  export default {
    name: "StepThree",
    props: ['clickedNext', 'currentStep'],
    mixins: [validationMixin],
    data() {
      return {
        user: {
          avatar: ''
        },
        tempUser: {},
        imageSrc: ''
      }
    },
    validations: {
      avatar: {
        required
      }
    },
    computed: {
      avatar() {
        return this.user.avatar ? `/static/uploads/${this.user.avatar}` : defaultImage
      }
    },
    watch: {
      $v: {
        handler: function (val) {
          if (!val.$invalid) {
            this.$emit('can-continue', {value: true})
          } else {
            this.$emit('can-continue', {value: false})
          }
        },
        deep: true
      },
      clickedNext(val) {
        if (val === true) {
          this.$v.user.$touch();
        }
      }
    },
    mounted() {
      this.tempUser = this.$store.getters['signup/getUser']
      if (!this.$v.$invalid) {
        this.$emit('can-continue', {value: true})
      } else {
        this.$emit('can-continue', {value: false})
      }
    },
    methods: {
      uploadImage(e) {
        let files = e.target.files
        if(!files[0]) {
          return
        }
        let data = new FormData()
        data.append('user', this.tempUser.firstName + this.tempUser.lastName)
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
          this.$store.commit('signup/profileAvatar', this.user)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
