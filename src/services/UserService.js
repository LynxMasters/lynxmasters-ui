import Api from '@/services/Api'

export default {
  fetchUsers() {
    return Api().get('users')
  },
  fetchUser(jwt){
    return Api().get('user/me', { headers: {'Authorization': jwt }})
  },
  addUser(params) {
    return Api().post('users', params)
  },
  updateUser(params, jwt) {
    return Api().put('user/account', params, { headers: {'Authorization': jwt }})
  },
  checkUserIdentifiers(params) {
    return Api().post('users/identifiers', {params})
  },
  uploadAvatar(params) {
    return Api().post('uploads', params, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  getAccounts(jwt) {
    return Api().get('accounts/', { headers: {'Authorization': jwt, 'Content-Type': 'multipart/form-data' } })
  }
}
