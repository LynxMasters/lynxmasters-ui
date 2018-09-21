import Api from '@/services/Api'

export default {
  loginUser(params) {
    return Api().post('auth/login', params)
  },
  verify() {
    return Api().post('verify/token', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
  },
}
