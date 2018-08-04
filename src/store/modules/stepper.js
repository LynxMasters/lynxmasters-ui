export default {
  namespaced: true,
  state: {
    stepOne: {
      isCompleted: false
    },
    stepTwo: {
      isCompleted: false
    },
    stepThree: {
      isCompleted: false
    }
  },
  getters: {
    getStepOne: state => {
      return state.stepOne
    },
    getStepTwo: state => {
      return state.stepTwo
    },
    getStepThree: state => {
      return state.stepThree
    }
  },
  mutations: {
    stepOneCompleted(state, payload) {
      state.stepOne.isCompleted = payload
    },
    stepTwoCompleted(state, payload) {
      state.stepTwo.isCompleted = payload
    },
    stepThreeeCompleted(state, payload) {
      state.stepThree.isCompleted = payload
    }
  }
}
