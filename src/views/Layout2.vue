<template>
<el-row class="pl-container">
  <el-col class="pl-header">
    <div class="pl-nav hidden-sm-and-down">
      <router-link to="#">PAX Developer Portal</router-link>
    </div>
    <div class="pl-accout">
      <my-account ref="myaccount"></my-account>
    </div>
  </el-col>

  <el-container class="pl-main-2">
    <el-aside width="200px" class="border-right">
      <el-menu :default-active="navActive" @select="handleSelect">
        <el-menu-item-group>
          <template slot="title">Helpdesk</template>
          <!-- <el-menu-item index="/manage/dashboard">
              <i class="el-icon-service"></i>Dashboard
            </el-menu-item> -->
          <el-menu-item index="manage-docs" @click="$router.push({ path: '/manage/docs' })">
            <i class="el-icon-menu"></i>Resources
          </el-menu-item>
          <el-menu-item index="manage-tickets" @click="$router.push({ path: '/manage/tickets' })" v-if="isViewTicket">
            <i class="el-icon-service"></i>Tickets
          </el-menu-item>
          <el-menu-item index="manage-isvs" @click="$router.push({path:'/manage/isvs'})" v-if="isViewIsv">
            <i class="el-icon-location"></i>ISV Management
          </el-menu-item>
        </el-menu-item-group>

        <!-- <el-menu-item-group>
            <template slot="title">Report</template>
            <el-menu-item index="/manage/report">
              <i class="el-icon-tickets"></i>Reports
            </el-menu-item>
          </el-menu-item-group> -->

        <el-menu-item-group>
          <template slot="title">Setting</template>
          <el-menu-item index="manage-boards" @click="$router.push({path:'/manage/boards'})" v-if="isEditCatega">
            <i class="el-icon-menu"></i>Modules
          </el-menu-item>
          <!-- <el-menu-item index="/manage/rule">
              <i class="el-icon-menu"></i>Ticket Rule
            </el-menu-item> -->
          <el-menu-item index="manage-tickettype" @click="$router.push({path:'/manage/tickettype'})" v-if="isEditCatega">
            <i class="el-icon-menu"></i>Ticket Types
          </el-menu-item>
          <el-menu-item index="manage-users" @click="$router.push({path:'/manage/users'})">
            <i class="el-icon-menu"></i>PAX Users
          </el-menu-item>
          <el-menu-item index="manage-roles" @click="$router.push({path:'/manage/roles'})" v-if="isEditRole">
            <i class="el-icon-menu"></i>Roles
          </el-menu-item>
          <el-menu-item index="manage-nda" @click="$router.push({path:'/manage/nda'})" v-if="isEditNDA">
            <i class="el-icon-menu"></i>NDA
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-main >
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-main>
  </el-container>

  <a class="back-to-top" href="#app" id="backToTop">
    <i class="el-icon-arrow-up"></i>
  </a>
  
  <el-col class="pl-footer">
    <img src="/static/images/logo.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <router-link target="_blank" to="/privacy">Privacy Policy</router-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <router-link target="_blank" to="/terms">Terms & Conditions</router-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a target="_blank" href="http://www.pax.us/"> © Pax Technology Inc.</a>
  </el-col>
</el-row>
</template>

<script>
 import { getMineUserUsingGET,  } from "@/api"

export default {
  data() {
    return {
      getMineId:0,
      isBorad: false,
      navActive: "manage-docs",
      loggedIn: false,
      isEditNDA: false, //isEditNDA
      isEditCatega: false, //Modules 、Ticket type
      isViewTicket: false, //Ticket
      isEditRole: false, //没有编辑权限，tab需要隐藏
      isViewIsv: false //
    };
  },
  watch: {
    //  $route(to,form){
    //    console.log(to.path);
    //  }
  },
  methods: {
     getProfile(){
        getMineUserUsingGET().then(response=>{
          let { code, data, message } = response.data
             this.getMineId = data.id;
        })
      },
    matchPath() {
      let pathArr = this.$route.matched;
      if (pathArr.length != 0) {
        let path = pathArr[pathArr.length - 1].path.slice(1);
        if (path == "") {
          //首页
          this.navActive = "manage-docs";
        } else {
          let pathCurArr = path.split("/");
          if (pathCurArr.length >= 2) {
            this.navActive = pathCurArr[0] + "-" + pathCurArr[1];
          } else {
            this.navActive = path;
          }
        }
      }
    },
    handleSelect(key, keyPath) {
      this.$router.push(key);
    },
    switchClass() {
      let user = sessionStorage.getItem("user");
      let body = document.body;
      // console.log(this.$router)
      // debugger;
      if(user && this.$router.history.current.path.indexOf("/profile") != -1){
          body.setAttribute("class", "newBodyAside");
        }else if (
        user &&
        this.$router.history.current.path.indexOf("/manage") != -1
      ) {
        body.setAttribute("class", "newBody");
      } else if( (!user||user) &&
        this.$router.history.current.path.indexOf("/") != -1){
        body.setAttribute("class", "newBodyLayout");
      }
    }
  },
  created() {
    this.matchPath();
    this.getProfile();
    let user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(user)
    //isv
    this.isViewIsv = user.authorities.filter(
      item => item.authority == "isv:View ISV Info:2"
    );
    let ViewIsv = "";
    ViewIsv = user.authorities.filter(
      item => item.authority == "isv:View ISV Info:2"
    );
    sessionStorage.setItem("ViewIsv", ViewIsv);

    if (this.isViewIsv.length) {
      this.isViewIsv = true;
    } else {
      this.isViewIsv = false;
    }

    //EditNda
    this.isEditNDA = user.authorities.filter(
      item => item.authority == "isv:Edit NDA:2"
    );
    let EditNDA = "";
    EditNDA = user.authorities.filter(
      item => item.authority == "isv:Edit NDA:2"
    );
    sessionStorage.setItem("EditNDA", EditNDA);

    if (this.isEditNDA.length) {
      this.isEditNDA = true;
    } else {
      this.isEditNDA = false;
    }
    //Modules、Ticket type
    this.isEditCatega = user.authorities.filter(
      item => item.authority == "resource:Edit Category:2"
    );
    let EditCatega = "";
    EditCatega = user.authorities.filter(
      item => item.authority == "resource:Edit Category:2"
    );
    sessionStorage.setItem("EditCatega", EditCatega);

    if (this.isEditCatega.length) {
      this.isEditCatega = true;
    } else {
      this.isEditCatega = false;
    }
    //Tickets
    this.isViewTicket = user.authorities.filter(
      item => item.authority == "ticket:View Ticket:2"
    );
    let ViewTicket = "";
    ViewTicket = user.authorities.filter(
      item => item.authority == "ticket:View Ticket:2"
    );

    if (this.isViewTicket.length) {
      this.isViewTicket = true;
      sessionStorage.setItem("ViewTicket", ViewTicket);
    } else {
      this.isViewTicket = false;
    }
    //  isEditRole
    this.isEditRole = user.authorities.filter(
      item => item.authority == "auth:Edit Role Info:2"
    );

    let EditRole = "";
    EditRole = user.authorities.filter(
      item => item.authority == "auth:Edit Role Info:2"
    );
    sessionStorage.setItem("EditRole", EditRole);

  
    if (this.isEditRole.length) {
      this.isEditRole = true;
    } else {
      this.isEditRole = false;
    }
  },
  mounted() {
    this.switchClass();
    let backToTop = document.getElementById("backToTop");
    //监听滚动条的滚动
    window.onscroll = function() {
      let h = document.documentElement.scrollTop || document.body.scrollTop;
      if (h >= 300) {
        backToTop.style.right = 30 + "px";
      } else {
        backToTop.style.right = -100 + "px";
      }
    };
  },
  updated() {
    this.switchClass();
  }
};
</script>

<style lang="scss" scoped>
/deep/{
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
    background-color: #1369bf;
    border-color: #1369bf;
    opacity: .6;
  }
}
.pl-header {
  z-index: 2001;
  .pl-nav {
    float: left;
  }
  .pl-accout {
    float: right;
  }
}
.el-main {
  padding: 0;
}
.pl-footer{
  display: none;
}
@media screen and (max-width: 1200px) {
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
    .pl-accout {
      float: right;
    }
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
 
}
@media screen and (max-width: 700px) {
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
      float: right;
    }
  }
 
}
@media screen and (max-width: 320px) {
  body {
    .el-menu--horizontal {
      /deep/ .el-menu-item {
        font-size: 18px !important;
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
      float: right;
    }
  }

 
}
</style>
