import { logoutUsingPOST, getMineUserUsingGET } from '@/api'

export default {
  changeLogin ({commit}) {
    getMineUserUsingGET().then(res => {
      store.state.isLogin = data.id
           commit("SET_USER")
      })
    },
      Logout({ commit }){
          logoutUsingPOST().then( res =>{
            commit('LOG_OUT');
          })
      },
}
