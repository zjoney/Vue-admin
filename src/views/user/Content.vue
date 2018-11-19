<template>
<section>
  <el-row>
    <el-checkbox-group v-model="checkedList">
      <el-col :span="24" v-for="item in filteredCategoryList" :key="item.pkId">
        <div v-if="item.categories.length > 0">
          <!-- <router-link :to="{ path: '/docs/' + item.pkId }"> -->
            <h3>{{item.nameCn}}</h3>
          <!-- </router-link> -->
          <br>
          <el-checkbox v-for="items in item.categories" @change="selectChange" :label="items.pkId" :key="items.pkId">
            {{items.nameCn}}<br/>
          </el-checkbox>
          {{item.note}}
        </div>
      </el-col>
    </el-checkbox-group>
  </el-row>
</section>
</template>

<script>
import {
  listCategoriesUsingGET,
  getCatalogMarkedUsingGET,
  listPermissionUsingGET,
  getIsvUsingGET,
  listCategoryWatchUsingGET,
  watchCategoryUsingPUT
} from "@/api";

export default {
  data() {
    return {
      loading: false,
      allCategoryList: [],
      filteredCategoryList: [],
      clientId: '',
      groupId: [],
      currentISVPermissions: [],
      checkedList: [],
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
    selectChange(value, $event) {
      this.loading = true;
      let pkid = $event.target.value;
      watchCategoryUsingPUT({
        categoryId: pkid,
        status: value ? 1 : 0
      }).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.$message({
            message: message,
            type: "success"
          });
        }
      });
    },
    getPermission(groupId) {
      this.loading = true;
      listPermissionUsingGET({
        subjectIds: groupId
      }).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.currentISVPermissions = Object.keys(data);
          
          for (var i = 0; i < this.allCategoryList.length; i++) {
            for (var j = 0; j < this.allCategoryList[i].categories.length; j++) {
              let doc = this.allCategoryList[i].categories[j];
              if (!this.currentISVPermissions.includes(doc.pkId)) {
                this.allCategoryList[i].categories.splice(j--, 1);
              }
            }
          }
          this.filteredCategoryList = this.allCategoryList
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
            if (board.nameCn != "Forum") {
              this.allCategoryList.push(board);
            }
          });
          let clientId = this.$store.state.user.clientId;
          if (clientId) {
            this.getIsvDetail(clientId);
          }
          this.getListWatch()
        }
      });
    },
    getListWatch() {
      this.loading = true;
      listCategoryWatchUsingGET({pageSize:0}).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          data.list.map(item => {
            this.checkedList.push(item.categoryId);
          });
        }
      });
    }
  },

  created() {
    this.getCategories()
  }
};
</script>

<style lang="scss" scoped>
</style>
