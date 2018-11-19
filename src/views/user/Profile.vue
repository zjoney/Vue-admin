<template>
	<section>
    <div class="banner">
        <div class="title">Profile</div>
        Update your company and personal account information
    </div>
    <el-container class="toolbar">
      <el-aside id="bp-aside">
        <div style="text-align: center">
          <h2>{{username}}</h2>
          {{userrole}}
          <p/>
          <hr/>
        </div>
        <el-tree ref="tree" :data="contents" node-key="id"  highlight-current default-expand-all @node-click="handleNodeClick">
        </el-tree>
      </el-aside>
      <el-main>
        <component :is="activeTab"></component>
      </el-main>
    </el-container>
	</section>
</template>

<script>
import dateFormat from "dateformat";

export default {
  data() {
    return {
      activeTab: "Personal",
      isvViewAuth: [], //Compony info查看权限
      isvEditAuth: [] //users 编辑权限
      // isTempPassword: false
    };
  },
  components: {
    Personal: () => import("./Personal"),
    Password: () => import("./Password"),
    Company: () => import("./Company"),
    Solution: () => import("./Solution"),
    Users: () => import("./Users"),
    Content: () => import("./Content")
  },
  computed: {
    username() {
      let user = sessionStorage.getItem("user");
      //转对象
      user = JSON.parse(user);
      return user.username;
    },
    userrole() {
      let user = sessionStorage.getItem("user");
      //转对象
      user = JSON.parse(user);
      return user.allRoles.map(item => item.name).join(",");
    },
    contents() {
      let user = sessionStorage.getItem("user");
      //转对象
      user = JSON.parse(user);
      let listAll = [
        { label: "Personal Profile", id: "Personal" },
        { label: "Change Password", id: "Password" },
        { label: "Company Profile", id: "Company" },
        { label: "Integration Requirements", id: "Solution" },
        { label: "User Management", id: "Users" },
        { label: "My Subscriptions", id: "Content" }
      ];
      if (!this.isvViewAuth.length) {
        listAll.splice(2, 3);
      }
      if (!this.isvEditAuth.length) {
        listAll.splice(4, 1);
      }
      if (user.clientId == null) {
        return [
          { label: "Account Info", id: "Personal" },
          { label: "Change Password", id: "Password" }
        ];
      }
      return listAll;
    }
  },
  methods: {
    formatDate: function(row, column, cellValue) {
      return dateFormat(new Date(cellValue), "yyyy-mm-dd");
    },

    handleNodeClick(node) {
      this.activeTab = node.id;
    }
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));

    this.isvViewAuth = user.authorities.filter(
      item => item.code == "View ISV Info"
    );
    this.isvEditAuth = user.authorities.filter(
      item => item.code == "Edit ISV Info"
    );
    //若isTemporaryPassword=1说明是临时密码
    if (user.isTemporaryPassword == 1) {
      this.isTemporaryPassword = true;
      this.activeTab = "Password";
      setTimeout(() => {
        this.$refs.tree.setCurrentKey("Password");
      }, 200);
    } else {
      setTimeout(() => {
        this.$refs.tree.setCurrentKey("Personal");
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>

// @media screen and (max-width: 320px) {
//   .newBody {
//        min-width: 700px;
//     overflow: auto;
//   }
// }
// @media screen and (max-width: 500px) {
//   #bp-aside {
//     width: 32% !important;
//     margin: 0%;
//   }
//   .el-tree {
//     margin: 1%;
//   }
// }
</style>