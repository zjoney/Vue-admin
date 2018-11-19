<template>
  <el-menu v-if="isLoggedin" mode="horizontal" background-color="#1369bf" text-color="#fff" active-text-color="#fff" :popper-append-to-body="isAppend" >
    <el-submenu index="t2" :popper-append-to-body="!isAppend">
      <template slot="title">My Account</template>
      <el-menu-item v-if="isPaxUser" index="t2-1" @click="jump">{{jumpText}}</el-menu-item>
      <el-menu-item index="t2-2" @click="profile">Profile</el-menu-item>
      <el-menu-item index="t2-3" @click="logout">Sign Out</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { logoutUsingPOST } from "@/api";

export default {
  data() {
    return {
      isAppend:true,
    };
  },
  computed: {
    jumpText() {
      if (this.$route.matched[0].path == "/manage") {
        return "ISV Panel";
      } else {
        return "Admin Panel";
      }
    },
    isLoggedin() {
      if (!this.$store.state.user.id) {
        this.$store.commit("SET_USER");
      }
      return this.$store.state.user.id;
    },
    isPaxUser() {
      if (!this.$store.state.user.id) {
        this.$store.commit("SET_USER");
      }
      return this.$store.state.user.type == 1;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key);
      // if (this.pageWidth <= 768) {
      //   this.closeDropMenu();
      // }
      // this.isCollapse = true;
    },
    logout() {
      logoutUsingPOST().then(response => {
        this.$store.commit("LOG_OUT");
        setTimeout(() => {
          this.$emit("updateHeadInfo");
        }, 100);
        this.$router.push("/");
      });
    },
    profile() {
      // let user = sessionStorage.getItem("user");
      // if (user) {
      //   user = JSON.parse(user);
      //   if(user.type == 2){
      this.$router.push("/profile");
      //   }else{
      //     this.$router.push("/manage/profile");
      //   }
      // }
    },
    jump() {
      if (this.$route.matched[0].path == "/manage") {
        this.$router.push("/");
      } else {
        this.$router.push("/manage");
      }
    }
  }
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
}
</style>