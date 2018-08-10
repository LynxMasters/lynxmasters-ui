const getDefaultState = () => {
  return {
    stepOne: {
      isCompleted: false
    },
    stepTwo: {
      isCompleted: false
    },
    stepThree: {
      isCompleted: false
    }
  }
}

const state = getDefaultState()

const getters = {
  getStepOne: state => {
    return state.stepOne
  },
  getStepTwo: state => {
    return state.stepTwo
  },
  getStepThree: state => {
    return state.stepThree
  }
}

const mutations = {
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

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
