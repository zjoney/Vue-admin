import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

// import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import './styles/index.scss'
import './styles/themes/tree.css'
import '../static/js/arrayApi.js'

import App from './App'
import store from './store'
import routes from './routes'
import 'lib-flexible'

Vue.use(ElementUI, {
  locale
})
Vue.use(VueRouter);
Vue.use(Vuex);

// Vue.prototype.$host = window.location.host

import BreadCrumb from './components/BreadCrumb.vue'
Vue.component('bread-crumb', BreadCrumb)

import MyEditor from './components/MyEditor.vue'
// Vue.component('ckeditor', MyEditor)

// import MyEditor from './components/CkEditor.vue'
Vue.component('ckeditor', MyEditor)

import MyAccount from './components/MyAccount.vue'
Vue.component('my-account', MyAccount)

import DictSelect from './components/DictSelect.vue'
Vue.component('dict-select', DictSelect)

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {

  let user;
  if (sessionStorage.getItem('user') && sessionStorage.getItem('user') != "undefined") {
    user = JSON.parse(sessionStorage.getItem('user'))
  }
  // else {
    // me
  // if((store.state.isLogin == 0)){
  //   return  store.dispatch('changeLogin');
  // }

  if (user && user.type == 2 && to.path.indexOf('/manage') != -1) {
    next({
      path: '/404',
    })
  }


  let getEditRole = sessionStorage.getItem("EditRole");
  if (user && getEditRole == "" && to.path.indexOf('/manage/roles') != -1) {
    next({
      path: '/404',
      replace: true
    })
  }


  let getViewIsv = sessionStorage.getItem("ViewIsv");
  if (user && getViewIsv == "" && to.path.indexOf('/manage/isvs') != -1) {
    next({
      path: '/404',
      replace: true
    })
  }
  let getEditNDA = sessionStorage.getItem("EditNDA");
  if (user && getEditNDA == "" && to.path.indexOf('/manage/nda') != -1) {
    next({
      path: '/404',
      replace: true
    })
  }
  let getEditCatega = sessionStorage.getItem("EditCatega");
  if (user && getEditCatega == "" && to.path.indexOf('/manage/tickettype') != -1) {
    next({
      path: '/404',
      replace: true
    })
  }
  if (user && getEditCatega == "" && to.path.indexOf('/manage/boards') != -1) {
    next({
      path: '/404',
      replace: true
    })
  }
  // to.path.indexOf('/manage/boards')
  let getViewTicket = sessionStorage.getItem("ViewTicket");
  if (user && getViewTicket == "" && to.path.indexOf('/manage/tickets') != -1) {
    next({
      path: '/404',
      replace: true
    })
  }
  let getIsvViewTicket = sessionStorage.getItem("isvViewTicket");
  if (user && getIsvViewTicket == "" && to.path.indexOf('/tickets') != -1) {
    next({
      path: '/404',
      replace: true
    })
  }

  if (to.matched.some(m => m.meta.auth)) { // 通过session获取当前的user存在,开始认证
    if ((!user && to.path != '/' && to.path != '/login' && to.path != '/signup' && to.path != '/nda' && to.path != '/terms' && to.path != '/privacy')) { // 判断当前用户未登录并且路径拦截
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else if (user && user.isTemporaryPassword == 1 && to.path != '/') {
      next({
        path: '/updatePassword',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {   // 判断当前用户 已登录 并且路径拦截   && user.isTemporaryPassword != 1
    if (user && (store.state.isTemporaryPassword != 1) && to.path.indexOf('/login') != -1) {
      next('/');
    }
    else if (user && user.isTemporaryPassword == 1 && (to.path.indexOf('/login') != -1 || to.path.indexOf('/updatePassword') == -1 && to.path != '/')) {
      next({
        path: '/updatePassword',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else if (!user && to.path == '/updatePassword') {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next();
    }
  }
});

router.afterEach(transition => { });

var vue = new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>',
  render: h => h(App)
});

export {
  router,
  vue
}
