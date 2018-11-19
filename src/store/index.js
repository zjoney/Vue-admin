import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

// 应用初始状态
const state = {
  user: {}, // 当前用户
  isTemporaryPassword: 0,
  isLogin: 0 // 初始时候给一个 isLogin=0 表示用户未登录
}

// 创建 store 实例
var store = new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})

export default store