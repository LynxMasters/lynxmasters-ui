<template>
  <!-- Contact Us -->
  <section class="container">
    <div class="intro column is-8 is-offset-2" id="contactSection">
      <h2 class="title">Contact Us!</h2><hr>
      <p class="subtitle">Have questions? Have suggestions to make the platform better?</p>
      <p class="subtitle">Shoot us an email!</p>
    </div>

    <div class="columns is-centered">
      <div class="column is-three-quarters">
        <div class="card">
          <div class="card-content">
            <div class="columns is-multiline">
              <div class="column is-4">
                <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                    <input class="input"
                           type="text"
                           placeholder="Enter Name"
                           name="contactName"
                           v-model="contactCard.contactName"
                           required>
                  </div>
                </div>
              </div>

              <div class="column is-4">
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input class="input"
                           type="email"
                           placeholder="legoman21@test.com"
                           name="contactEmail"
                           v-model="contactCard.contactEmail"
                           required>
                  </div>
                </div>
              </div>


              <div class="column is-4">
                <div class="field">
                  <label class="label">Subject</label>
                  <div class="control">
                    <input class="input"
                           type="text"
                           placeholder="Subject"
                           name="contactSubject"
                           v-model="contactCard.contactSubject"
                           required>
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Message</label>
              <div class="control">
                    <textarea class="textarea"
                              placeholder="Message"
                              name="contactMessage"
                              v-model="contactCard.contactMessage"
                              required>
                    </textarea>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" v-on:click="submitForm()">Submit</button>
              </div>
              <div class="control">
                <button class="button" v-on:click="clearForm()">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
  <!-- End Contact Us -->
</template>

<script>
  import _ from 'lodash'
  export default {
    name: "ContactUs",
    data() {
      return {
        contactCard: {
          contactName: '',
          contactEmail: '',
          contactSubject: '',
          contactMessage: '',
        }
      }
    },
    methods: {
      clearForm() {
        this.contactCard.contactName = ''
        this.contactCard.contactEmail = ''
        this.contactCard.contactSubject = ''
        this.contactCard.contactMessage = ''
      },
      errorMsg(message) {
        this.$toast.open({
          duration: 3500,
          message: message,
          position: 'is-top',
          type: 'is-danger'
        })
      },
      successAlert(message) {
        this.$toast.open({
          duration: 3500,
          message: message,
          position: 'is-top',
          type: 'is-success'
        })
      },
      submitForm() {
        if (!_.isEmpty(this.contactCard.contactName)
          && !_.isEmpty(this.contactCard.contactEmail)
          && !_.isEmpty(this.contactCard.contactSubject)
          && !_.isEmpty(this.contactCard.contactMessage)) {
          this.successAlert("Your email has been sent to LynxMasters")
          this.contactCard.contactName = ''
          this.contactCard.contactEmail = ''
          this.contactCard.contactSubject = ''
          this.contactCard.contactMessage = ''
        } else {
          this.errorMsg("Please fill out all required fields")
        }
      }
    }
  }
</script>

<style scoped>

</style>
