<template>
  <div style="padding: 2rem 3rem; text-align: left;">
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
      <input :class="['input', ($v.user.email.$error) ? 'is-danger' : '']"
             type="email"
             placeholder="joey@google.com"
             name="email"
             v-model="user.email"
             required>
      <p v-if="$v.user.email.$error" class="help is-danger">This Email is invalid</p>
    </div>
  </div>
</template>
<script>
    import {validationMixin} from 'vuelidate'
    import {required, email} from 'vuelidate/lib/validators'

    export default {
      name: "StepTwo",
      props: ['clickedNext', 'currentStep'],
      mixins: [validationMixin],
      data() {
        return {
          user: {
            username: '',
            email: ''
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
          }
        }
      },
      watch: {
        $v: {
          handler: function (val) {
            if(!val.$invalid) {
              console.log(true)
              this.$emit('can-continue', {value: true});
            } else {
              console.log(false)
              this.$emit('can-continue', {value: false});
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
          this.$emit('can-continue', {value: true});
        } else {
          this.$emit('can-continue', {value: false});
        }
      }
    }


</script>

<style scoped>

</style>
