<template>
<el-row class="pl-container">
  <el-col class="pl-header" :span="24">
    <div class="pl-nav hidden-sm-and-down">
       <!-- hidden-sm-and-down -->
      <router-link to="/">PAX Developer Portal</router-link>
    </div>
    <div class="pl-menu">
      <el-menu v-if="!showSmallNav"  menu-trigger="hover" default-active="/documentation" mode="horizontal" @select="handleSelect" background-color="#1369bf" text-color="#ffffff" active-text-color="#ffffff">
        <el-menu-item index="/docs">Resources</el-menu-item>
        <el-menu-item index="/tickets" v-if="isViewTicket">Tickets</el-menu-item>
        <el-menu-item index="/forum">Forum</el-menu-item>
        <el-menu-item index="/faq">FAQ</el-menu-item>
      </el-menu>
      <el-menu v-if="showSmallNav" style="float:left;" menu-trigger="hover" default-active="/documentation" mode="horizontal" @select="handleSelect" background-color="#1369bf" text-color="#ffffff" active-text-color="#ffffff">
        <el-submenu index="t2">
          <template slot="title"><i class="el-icon-menu"></i></template>
          <el-menu-item index="/docs">Resources</el-menu-item>
          <el-menu-item index="/tickets" v-if="isViewTicket">Tickets</el-menu-item>
          <el-menu-item index="/forum">Forum</el-menu-item>
          <el-menu-item index="/faq">FAQ</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="pl-accout">
      <my-account @updateHeadInfo="updateHeadInfo" ref="myaccount"></my-account>
    </div>
  </el-col>
 <!-- </el-row>

  <el-row> -->
  <el-col class="pl-main" :span="24">
    <!-- v-if="fullDisplay" -->
    <el-row class="warning" style="display: flex; align-items: center;" v-if="!hasAgreed">
      <!-- v-if="!hasAgreed" -->
      <el-col :span="18" style="display:table-cell;padding:0.15em;color:#fff; font-size:8em; vertical-align:middle;">
       <span style="display:block; font-size:0.15em; vertical-align:middle;">
          We use cookies to understand how you use our site and to improve your experience. This includes personalizing content and advertising. To learn more, click here. By continuing to use our site, you accept our use of cookies, revised Privacy Policy and
        Terms of Use. <a href="/privacy" style="font-weight: 600; color: #fff">Find out more</a>
       </span>
      </el-col>
      <el-col :span="6" class="warning" style="display:table-cell;padding:0.1em;color:#fff; font-size:10em; vertical-align:middle;">
        <el-button size="large" @click="agreeCookie" style="display:inline-block; font-size:0.1em; vertical-align:middle;">Okay Thanks</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" >
        <transition name="fade" mode="out-in" >
          <router-view></router-view>
        </transition>
       </el-col>
     </el-row>
  </el-col>

  <a class="back-to-top" href="#app" id="backToTop">
    <i class="el-icon-arrow-up"></i>
  </a>

  <el-col class="pl-footer" :span="24">
      <div class="pl-footer-content">
          <img src="/static/images/logo.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link target="_blank" to="/privacy">Privacy Policy</router-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link target="_blank" to="/terms">Terms & Conditions</router-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a target="_blank" href="http://www.pax.us/"> © Pax Technology Inc.</a>
      </div>
  </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      // isCollapse: false,
      loggedIn: false,
      hasAgreed: false,
      isViewTicket: false, // Tickets
      pageWidth: 0
    }
  },
  computed: {
    isPAXUser () {
      if (!this.$store.state.user.id) {
        this.$store.commit('SET_USER')
      }
      return this.$store.state.user && this.$store.state.user.type == 1
    },
    showSmallNav () {
      this.pageWidth = window.innerWidth
      return this.pageWidth <= 768
    }
    // fullDisplay(){
    //     this.pageWidth = window.innerWidth;
    //      return this.pageWidth <= 480
    // }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push(key)
      // if (this.pageWidth <= 768) {
      //   this.closeDropMenu();
      // }
      // this.isCollapse = true;
    },
    closeDropMenu () {
      let subKey = document.getElementsByClassName('menu-small-drop-item')[0]
        .parentNode.parentNode
      subKey.style.display = 'none'
      setTimeout(() => {
        subKey.style.display = 'none'
      }, 1000)
    },
    agreeCookie () {
      let expires = 365 * 24 * 60 * 60
      document.cookie = 'agreed=true;max-age=' + expires
      this.hasAgreed = true
    },
    getCurrentInfomatin () {
      // console.log(user)
      let user = JSON.parse(sessionStorage.getItem('user'))
      // console.log(user);
      if (user) {
        let hasAuth = user.authorities.filter(
          item => item.authority == 'ticket:View Ticket:2'
        )
        // Tickets
        if (hasAuth.length) {
          this.isViewTicket = true
        } else {
          this.isViewTicket = false
        }
      } else {
        this.isViewTicket = true
      }
    },
    updateHeadInfo () {
      this.getCurrentInfomatin()
    },
    switchClass () {
      // console.log(this.$router)
      let user = sessionStorage.getItem('user')
      let body = document.body
      if (user && (this.$router.history.current.path.indexOf('/profile') != -1 ||
        this.$router.history.current.path.indexOf('/faq') != -1 ||
        this.$router.history.current.path.indexOf('/doc') != -1 ||
        this.$router.history.current.path.indexOf('/ticket') != -1 ||
        this.$router.history.current.path.indexOf('/forum') != -1)) {
        body.setAttribute('class', 'newBodyAside')
      } else if (user && this.$router.history.current.path.indexOf('/manage') != -1) {
        body.setAttribute('class', 'newBody')
        // /manage/docs
      } else if (
        (!user || user) &&
        this.$router.history.current.path.indexOf('/') != -1
      ) {
        body.setAttribute('class', 'newBodyLayout')
      }
    }
  },
  mounted () {
    this.switchClass()
    // 显示cookie提示
    let cookies = document.cookie
    for (let item of cookies.split(';')) {
      if (item.split('=')[0].indexOf('agreed') != -1) {
        this.hasAgreed = true
      }
    }

    // 监听滚动条的滚动
    let backToTop = document.getElementById('backToTop')
    window.onscroll = function () {
      let h = document.documentElement.scrollTop || document.body.scrollTop
      if (h >= 300) {
        backToTop.style.right = 30 + 'px'
      } else {
        backToTop.style.right = -100 + 'px'
      }
    }

    // 监听宽度，切换导航
    let vue = this
    window.addEventListener('resize', function () {
      vue.pageWidth = window.innerWidth
    })
  },
  created () {
    this.getCurrentInfomatin()
    let user = JSON.parse(sessionStorage.getItem('user'))

    if (user) {
      let isvViewTicket = ''
      isvViewTicket = user.authorities.filter(
        item => item.authority == 'ticket:View Ticket:2'
      )
      sessionStorage.setItem('isvViewTicket', isvViewTicket)
    }
  },
  updated () {
    this.switchClass()
  }
}
</script>

<style lang="scss" scoped>
/deep/{
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
    background-color: #1369bf;
    border-color: #1369bf;
    opacity: .6;
  }
}
.el-submenu__title i {
  color: #ffffff !important;
}
.pl-header {
  z-index: 2001;
  .pl-nav {
    float: left;
    margin-left: 5%;
  }
  .pl-menu {
    float: left;
    margin: 0px 19%;
    el-menu {
      float: left;
    }
  }
  .pl-accout {
    // margin-left: 10%;
    float: right;
  }
}

.el-main {
  padding: 0;
}
.pl-footer {
  margin: 0 auto;
  width: 100%;
}
.warning {
  background: rgb(58, 147, 202);
  padding: 5px 40px;
  color: #ffffff;
}
@media screen and (max-width: 1300px) {
  .pl-header {
    z-index: 2001;
    .pl-nav {
      float: left;
      margin-left: 5%;
    }
    .pl-menu {
      float: left;
      margin: 0px 5%;
      el-menu {
        float: left;
      }
    }
    .pl-accout {
      float: right;
    }
  }
  .pl-footer {
    float: left;
    margin: 0;
  }
}
@media screen and (min-width: 770px) and (max-width: 990px) {
  .pl-header {
    z-index: 2001;
    .pl-nav {
      float: left;
      margin-left: 5%;
    }
    .pl-menu {
      float: left;
      margin: 0 12%;
      el-menu {
        float: left;
      }
    }
  }
  .pl-footer {
    float: left;
    margin: 0;
  }
}
@media screen and (max-width: 768px) {
  .pl-header {
    z-index: 2001;
    .pl-menu {
      float: left;
      margin: 0 3% 0 0;
      el-menu {
        float: left;
      }
    }
    .pl-accout {
      float: right;
    }
  }
  .el-menu--horizontal {
    z-index: 99;
  }
  .pl-footer {
    float: left;
    margin: 0 auto;
  }
}
@media screen and (max-width: 414px) {
  .pl-header {
    z-index: 2001;
    .pl-menu {
      float: left;
      margin: 0 3% 0 0;
      el-menu {
        float: left;
      }
    }
    .pl-accout {
      float: right;
      font-size: 14px !important;
    }
  }
  .pl-footer {
    float: left;
    margin: 0 auto;
    .pl-footer-content {
      float: left;
      word-spacing: -2px;
      margin: 0px 3%;
    }
  }
  .el-menu--horizontal .el-menu .el-menu-item,
  .el-menu--horizontal .el-menu .el-submenu__title {
    font-size: 14px !important;
    padding: 0px 6px !important;
    margin: 8px 0px;
  }
}
@media screen and (max-width: 375px) {
  .pl-header {
    z-index: 2001;
    .pl-menu {
      float: left;
      margin: 0 3% 0 0;
      el-menu {
        float: left;
      }
    }
    .pl-accout {
      // margin-left: 39%;
      float: right;
    }
  }
  .pl-footer {
    float: left;
    margin: 0 auto;
    .pl-footer-content {
      float: left;
      word-spacing: -2px;
      margin: 0px 1%;
    }
  }
}
@media screen and (max-width: 320px) {
  body {
    .el-menu--horizontal {
      /deep/ .el-menu-item {
        font-size: 14px !important;
      }
    }
  }
  .pl-header {
    z-index: 2001;
    .pl-menu {
      float: left;
      margin: 0 3% 0 0;
      el-menu {
        float: left;
      }
    }
    .pl-accout {
      // margin-left: 39%;
      float: right;
    }
  }

  .pl-footer {
    float: left;
    margin: 0 auto;
    .pl-footer-content {
      float: left;
      word-spacing: -2px;
    }
  }
}

// @media screen and (min-width: 1000px) {
//   .el-menu {
//     margin-right: 20%;
//   }
// }
</style>
