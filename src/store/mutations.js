import routes from '@/routes'

export default {
  SET_USER (state) {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      state.user = user
      state.isTemporaryPassword = user.isTemporaryPassword
    }
  },
  LOG_OUT (state) {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('allUser')
    state.user = {}
    routes.push('/login')
  }
}
