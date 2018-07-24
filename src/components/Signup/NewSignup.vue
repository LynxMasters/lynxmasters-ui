<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <horizontal-stepper :steps="signupSteps" @completed-step="completeStep"
                              @active-step="isStepActive" @stepper-finished="alert"
          >
          </horizontal-stepper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    import HorizontalStepper from 'vue-stepper';

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
              title: 'Completed',
              subtitle: 'Signup is complete!',
              component: StepFour,
              completed: true
            }
          ]
        }
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
        alert(payload) {
          alert('end')
        }
      }
    }
</script>

<style scoped>

</style>
