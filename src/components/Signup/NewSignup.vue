<template>
  <section class="section animated fadeIn">
    <div class="container">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <horizontal-stepper :steps="signupSteps" @completed-step="completeStep"
                              @active-step="isStepActive" @stepper-finished="addUser"
          >
          </horizontal-stepper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    import HorizontalStepper from 'vue-stepper';
    import UserService from "../../services/UserService";

    // This components will have the content for each stepper step.
    import StepOne from './StepOne.vue';
    import StepTwo from './StepTwo.vue';
    import StepThree from './StepThree.vue';
    import StepFour from './StepFour.vue';

    export default {
      name: "NewSignup",
      components: {
        HorizontalStepper
      },
      data(){
        return {
          tempUser: {},
          signupSteps: [
            {
              icon: 'mail',
              name: 'first',
              title: 'Create Account',
              subtitle: 'Username + Password',
              component: StepOne,
              completed: false

            },
            {
              icon: 'info',
              name: 'second',
              title: 'Information',
              subtitle: 'Personal Info',
              component: StepTwo,
              completed: false
            },
            {
              icon: 'image',
              name: 'third',
              title: 'Profile Photo',
              subtitle: 'Personal Avatar',
              component: StepThree,
              completed: false
            },
            {
              icon: 'check',
              name: 'fourth',
              title: 'Completion',
              subtitle: 'Confirm your details!',
              component: StepFour,
              completed: true
            }
          ]
        }
      },
      mounted() {
        this.tempUser = this.$store.getters['signup/getUser']
      },
      methods: {
        // Executed when @completed-step event is triggered
        completeStep(payload) {
          this.signupSteps.forEach((step) => {
            if (step.name === payload.name) {
              step.completed = true;
            }
          })
        },
        // Executed when @active-step event is triggered
        isStepActive(payload) {
          this.signupSteps.forEach((step) => {
            if (step.name === payload.name) {
              if(step.completed === true) {
                step.completed = false;
              }
            }
          })
        },
        // Executed when @stepper-finished event is triggered
        signupComplete() {
          this.$snackbar.open({
            message: 'An email has been sent to ' + this.tempUser.email + ' for verification',
            type: 'is-warning',
            position: 'is-top',
            actionText: 'GOT IT!',
            indefinite: true
          })
        },
        errorAlert() {
          this.$toast.open({
            duration: 5000,
            message: `There was a problem saving!`,
            position: 'is-bottom',
            type: 'is-danger'
          })
        },
        async addUser() {
          await UserService.addUser(this.tempUser).then(res => {
            if (res.data.errors) {
              this.errors = res.data.errors
              this.errorAlert()
            } else {
              this.signupComplete()
              this.$router.push({name: 'Landing'})
              this.$store.commit('signup/resetState') // clear signup state
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
