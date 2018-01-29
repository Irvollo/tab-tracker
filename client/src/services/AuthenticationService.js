import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  }
}

/*
AuthenticationService.register({
  email:"example@ex.com",
  password:"12345"
})
*/
