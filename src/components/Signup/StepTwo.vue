<template>
  <div class="signup-steps">
    <div class="field">
      <label class="label">First Name</label>
      <div class="control">
        <input :class="['input', ($v.user.firstName.$error) ? 'is-danger' : '']"
               type="text"
               placeholder=""
               v-model="user.firstName">
      </div>
      <p v-if="$v.user.firstName.$error" class="help is-danger">First Name is required</p>
    </div>
    <div class="field">
      <label class="label">Last Name</label>
      <input :class="['input', ($v.user.lastName.$error) ? 'is-danger' : '']"
             type="tex"
             placeholder=""
             v-model="user.lastName"
             required>
      <p v-if="$v.user.lastName.$error" class="help is-danger">Last Name is required</p>
    </div>
    <div class="field">
      <label class="label">Address</label>
      <input :class="['input', ($v.user.address.$error) ? 'is-danger' : '']"
             type="tex"
             placeholder=""
             v-model="user.address"
             required>
      <p v-if="$v.user.address.$error" class="help is-danger">Address is required</p>
    </div>
    <div class="field">
      <label class="label">City</label>
      <input :class="['input', ($v.user.city.$error) ? 'is-danger' : '']"
             type="tex"
             placeholder=""
             v-model="user.city"
             required>
      <p v-if="$v.user.city.$error" class="help is-danger">City is required</p>
    </div>
    <div class="field">
      <label class="label">State / Province</label>
      <input :class="['input', ($v.user.state.$error) ? 'is-danger' : '']"
             type="tex"
             placeholder=""
             v-model="user.state"
             required>
      <p v-if="$v.user.state.$error" class="help is-danger">State is required</p>
    </div>
    <div class="field">
      <label class="label">Zip</label>
      <input :class="['input', ($v.user.zipCode.$error || !$v.user.zipCode.numeric || !$v.user.zipCode.minLength || !$v.user.zipCode.maxLength)
                ? 'is-danger' : '']"
             type="tex"
             placeholder=""
             v-model="user.zipCode"
             required>
      <p v-if="$v.user.zipCode.$error && !user.zipCode.length > 0" class="help is-danger">Zip code is required</p>
      <p v-if="!$v.user.zipCode.numeric" class="help is-danger">Zip code must only be numbers</p>
      <p v-if="!$v.user.zipCode.minLength || !$v.user.zipCode.maxLength" class="help is-danger">
        Zip code must have at least {{ $v.user.zipCode.$params.minLength.min }} numbers.
      </p>
    </div>
    <div class="field">
      <label class="label">Country</label>
      <div class="control">
        <div class="select is-fullwidth">
          <select :class="['input', ($v.user.country.$error) ? 'is-danger' : '']"
                  v-model="user.country"
                  required>
            <option selected>Country</option>
            <option v-for="country in countries">
              {{ country.name }}</option>
          </select>
        </div>
      </div>
      <p v-if="$v.user.country.$error" class="help is-danger">Country is required</p>
    </div>
  </div>
</template>
<script>
    import {validationMixin} from 'vuelidate'
    import {required, numeric, minLength, maxLength} from 'vuelidate/lib/validators'
    import countries from '@/assets/countries.json'

    export default {
      name: "StepTwo",
      props: ['clickedNext', 'currentStep'],
      mixins: [validationMixin],
      data() {
        return {
          user: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          },
          countries
        }
      },
      validations: {
        user: {
          firstName: {
            required
          },
          lastName: {
            required
          },
          address: {
            required
          },
          city: {
            required
          },
          state: {
            required
          },
          zipCode: {
            required,
            numeric,
            minLength: minLength(5),
            maxLength: maxLength(5)
          },
          country: {
            required
          }
        }
      },
      computed: {},
      watch: {
        $v: {
          handler: function (val) {
            if(!val.$invalid) {
              this.updateUserInfo()
              this.$emit('can-continue', {value: true});
            } else {
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
      },
      methods: {
        updateUserInfo() {
          this.$store.commit('additionalInfo', this.user)
        }
      }
    }


</script>

<style scoped>

</style>
