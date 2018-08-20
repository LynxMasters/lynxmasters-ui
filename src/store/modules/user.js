const getDefaultState = () => {
  return {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  }
}

const state = getDefaultState()

const getters = {
  authenticatedUser: state => {
    return !!state.token
  },
  authStatus: state => {
    return state.status
  }
}

const mutations = {
  logout(state){
    state.status = ''
    state.token = ''
    state.user = ''
    localStorage.removeItem('token')
  },
  auth_success(state, token, user){
    state.status = 'success'
    state.token = token
    state.user = user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
