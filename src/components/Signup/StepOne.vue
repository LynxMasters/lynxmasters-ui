<template>
  <div class="signup-steps">
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input :class="['input', ($v.user.username.$error) ? 'is-danger' : '']"
               type="text"
               placeholder="Text input"
               v-model="user.username">
      </div>
      <p v-if="$v.user.username.$error" class="help is-danger">This username is invalid</p>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input :class="['input', ($v.user.email.$error) ? 'is-danger' : '']"
               type="text"
               placeholder="Email input"
               v-model="user.email">
      </div>
      <p v-if="$v.user.email.$error" class="help is-danger">This email is invalid</p>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left has-icons-right">
        <input :class="['input', ($v.user.password.$error || !$v.user.password.minLength) ? 'is-danger' : '']"
               type="password"
               placeholder="supersecretpassword"
               v-model.lazy="user.password">
        <span class="icon is-small is-left">
          <i class="fas  fa-unlock-alt"></i>
        </span>
      </div>
      <p v-if="$v.user.password.$error" class="help is-danger">Password is invalid</p>
      <p v-if="!$v.user.password.minLength" class="help is-danger">Password must have at least {{ $v.user.password.$params.minLength.min }} letters.</p>
    </div>

    <div class="field animated flipInX" v-if="$v.user.confirmPassword && !$v.user.confirmPassword.sameAsPassword">
      <span class="tag is-danger">Passwords Do Not Match!</span>
    </div>

    <div class="field">
      <label class="label">Confirm Password</label>
      <div class="control has-icons-left has-icons-right">
        <input :class="['input', ($v.user.confirmPassword.$error) ? 'is-danger' : '']"
               type="password"
               placeholder="supersecretpassword"
               v-model="user.confirmPassword">
        <span class="icon is-small is-left">
          <i class="fas  fa-unlock-alt"></i>
        </span>
      </div>
      <p v-if="$v.user.confirmPassword.$error" class="help is-danger">Confirm Password is invalid</p>
    </div>
  </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, email, sameAs, minLength } from 'vuelidate/lib/validators'

    export default {
      name: "StepOne",
      props: ['clickedNext', 'currentStep'],
      mixins: [validationMixin],
      data() {
        return {
          user: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
          }
        }
      },
      validations: {
        user: {
          username: {
            required
          },
          email: {
            required,
            email
          },
          password: {
            required,
            minLength: minLength(8)
          },
          confirmPassword: {
            required,
            minLength: minLength(8),
            sameAsPassword: sameAs('password')
          }
        }
      },
      watch: {
        $v: {
          handler: function (val) {
            if(!val.$invalid) {
              this.updateUserInfo()
              this.$emit('can-continue', {value: true})
            } else {
              this.$emit('can-continue', {value: false})
            }
          },
          deep: true
        },
        clickedNext(val) {
          if(val === true) {
            this.$v.user.$touch();
          }
        }
      },
      mounted() {
        if(!this.$v.$invalid) {
          this.$emit('can-continue', {value: true})
        } else {
          this.$emit('can-continue', {value: false})
        }
      },
      methods: {
        updateUserInfo() {
          this.$store.commit('signup/createAccount', this.user)
        }
      }
    }
</script>

<style scoped>

</style>
