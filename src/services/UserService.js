import Api from '@/services/Api'

export default {
  addUser(params) {
    return Api().post('users', params)
  },
  checkUserIdentifiers(params) {
    return Api().post('users/identifiers', {params})
  },
  uploadAvatar(params) {
    return Api().post('uploads', params, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  getAccounts(jwt) {
    return Api().post('accounts/', { headers: {'Authorization': jwt, 'Content-Type': 'multipart/form-data' } })
  }
  

}
