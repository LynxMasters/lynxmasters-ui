import Api from '@/services/Api'

export default {
  addUser(params) {
    return Api().post('users', params)
  },
  checkUserIdentifiers(params) {
    return Api().post('users/identifiers', {params})
  },

}