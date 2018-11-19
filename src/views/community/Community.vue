<template>
<section>
  <div class="banner">
    <div class="title">Forum</div>
    Product news and open discussion here
  </div>
  <el-row class="toolbar">
    <el-col :span="24" v-for="board in filteredCategoryList" :key="board.pkId">
      <div v-for="doc in board.categories" :key="doc.pkId" class="card">
        <router-link :to="{ path: '/forum/' + doc.pkId}">
          <h3>{{doc.nameCn}}</h3>
        </router-link>
        <div>
          {{doc.note}}
        </div>
      </div>
    </el-col>
  </el-row>
</section>
</template>

<script>
import {
  getCatalogTreeUsingGET,
  listCategoriesUsingGET,
  getCatalogMarkedUsingGET,
  listPermissionUsingGET,
  getIsvUsingGET
} from "@/api";

export default {
  name: "developer",
  data() {
    return {
      loading: false,
      allCategoryList: [],
      filteredCategoryList: [],
      currentISVPermissions: []
    };
  },

  methods: {
    getIsvDetail(clientId) {
      getIsvUsingGET({
        id: clientId
      }).then(response => {
        let { code, data, message } = response.data;
        if (code != 0) {
          this.$message = {
            message: "message",
            type: "error"
          };
        } else {
          this.getPermission(data.groupId);
        }
      });
    },
    getPermission(groupId) {
      listPermissionUsingGET({
        subjectIds: groupId
      }).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.currentISVPermissions = Object.keys(data);

          for (var i = 0; i < this.allCategoryList.length; i++) {
            for (
              var j = 0;
              j < this.allCategoryList[i].categories.length;
              j++
            ) {
              let doc = this.allCategoryList[i].categories[j];
              if (!this.currentISVPermissions.includes(doc.pkId)) {
                this.allCategoryList[i].categories.splice(j--, 1);
              }
            }
          }
          this.filteredCategoryList = this.allCategoryList;
        }
      });
    },
    getCategories() {
      this.loading = true;
      listCategoriesUsingGET().then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          data.map((board, index) => {
            if (board.nameCn == "Forum") {
              this.allCategoryList.push(board);
            }
          });
          let clientId = this.$store.state.user.clientId;
          if (clientId) {
            this.getIsvDetail(clientId);
          } else {
            this.filteredCategoryList = this.allCategoryList;
          }
        }
      });
    }
  },
  created() {
    this.getCategories();
  }
};
</script>

<style lang="scss" scoped>
</style>
