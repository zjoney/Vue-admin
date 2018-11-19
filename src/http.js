import axios from 'axios'
import { router, vue } from '@/main'

axios.defaults.timeout = 600000

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      if (error.response.data.code) {
        switch (error.response.data.code) {
          case 401:
            vue.$message.error({
              title: 'Error',
              message: 'Session expired, please login again.',
              duration: 1000
            })
            break
          case 10000:
            if (error.response.config.method !== 'get') {
              vue.$message.error({
                title: 'Error',
                message: 'Fail',
                duration: 1000
              })
            }
            break
          // case 10003:
          //   vue.$message.error({
          //     title: 'Error',
          //     message: 'The classification does not exist.',
          //     duration: 1000
          //   })
          //   break
          case 10004:
            if (router.currentRoute.path.indexOf('login') !== -1) {
              vue.$message.error({
                title: 'Error',
                message: 'Incorrect  email',
                duration: 1000
              })
            }
            break
          case 10005:
            vue.$message.error({
              title: 'Error',
              message: 'Incorrect email or password',
              duration: 1000
            })
            break
          case 10008:
            if (error.config && error.config.url.indexOf('noMessage') === -1) {
              if (error.response.config.method !== 'get') {
                vue.$message.error({
                  title: 'Error',
                  message: 'Not authorized',
                  duration: 1000
                })
              }
            }
            break
          case 10009:
            vue.$store.commit('LOG_OUT')
            if (router.currentRoute.path !== '/login') {
              // debugger;
              router.replace({
                path: '/login',
                query: {
                  redirect: router.currentRoute.fullPath
                }
              })
              vue.$message.error({
                title: 'Error',
                message: 'Login timeout, please login again.',
                duration: 1000
              })
            }
            // else {
            //   vue.$message.error({
            //     title: 'Error',
            //     message: "Incorrect username or password",
            //     duration: 1000
            //   })
            // }
            break
          case 10019:
            vue.$message.error({
              title: 'Error',
              message: 'Account is disabled',
              duration: 1000
            })
            break
          case 10018:
            vue.$message.error({
              title: 'Error',
              message: 'Captcha does not match',
              duration: 1000
            })
            break
          case 10021:
            vue.$message.error({
              title: 'Error',
              message: 'Email has already exsited',
              duration: 1000
            })
            break
          case 10017:
            // ISV信息填写不完整，不提示
            break
          default:
            if (error.response.config.method !== 'get') {
              vue.$message.error({
                title: 'Error',
                message: error.response.data.message,
                duration: 1000
              })
            }
        }
      } else {
        vue.$message.error({
          title: 'Error',
          message: 'Server disconnected',
          duration: 1000
        })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

export default axios
