import Api from '@/services/Api'

export default {
  fetchUsers() {
    return Api().get('users', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'application/json'} } )
  },
  fetchUser(){
    return Api().get('user/me', { headers: {'Authorization': window.localStorage.getItem('token') }})
  },
  addUser(params) {
    return Api().post('users', params)
  },
  updateUser(params) {
    return Api().put('user/account', params, { headers: {'Authorization': window.localStorage.getItem('token') }})
  },
  checkUserIdentifiers(params) {
    return Api().post('users/identifiers', {params})
  },
  uploadAvatar(params) {
    return Api().post('uploads', params, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  getAccounts() {
    return Api().get('accounts/', { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' } })
  },
  getMember(username) {
    return Api().get('member?username='+username, { headers: {'Authorization': window.localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' } })
  }
}
