const getDefaultState = () => {
  return {
    user: {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      avatar: ''
    }
  }
}

const state = getDefaultState()

const getters = {
  getUser: state => {
    return state.user
  }
}

const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState())
  },
  createAccount(state, payload) {
    state.user.username = payload.username
    state.user.email = payload.email
    state.user.password = payload.password
  },
  additionalInfo(state, payload) {
    state.user.firstName = payload.firstName
    state.user.lastName = payload.lastName
    state.user.address = payload.address
    state.user.city = payload.city
    state.user.state = payload.state
    state.user.zipCode = payload.zipCode
    state.user.country = payload.country

  },
  profileAvatar(state, payload) {
    state.user.avatar = payload.avatar
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations
}
