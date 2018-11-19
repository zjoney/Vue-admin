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
            <el-checkbox :disabled="items.accessType==1||!hasAuth" v-for="items in item.categories" @change="selectChange" :label="items.pkId" :key="items.pkId">
              {{items.nameCn}}<br/>
            </el-checkbox>
            {{item.note}}
          </div>
        </el-col>
      </el-checkbox-group>
      <div style="text-align: center;margin: 30px 0;">
        <el-button type="primary" @click="onSubmit" v-if="hasAuth">Save</el-button>
        </div>
    </el-row>
  </section>
</template>

<script>
import {
  listCategoriesUsingGET,
  listCategoriesForViewUsingGET,
  savePermissionsUsingPOST_1,
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
      artpkId: null,
      hasAuth:false,
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
      listCategoriesUsingGET({
        isvId: this.artpkId.pkId
      }).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          // data.map((board, index) => {
          //   if (board.nameCn != "Forum") {
          //     this.allCategoryList.push(board);
          //   }
          // });

          // let clientId = this.$store.state.user.clientId;
          // let {artpkId}=this;
          // if (artpkId&&artpkId.pkId) {
          //   this.getIsvDetail(artpkId.pkId);
          // }
          this.filteredCategoryList = data;
          this.getListWatch()
        }
      });
    },
    getListWatch() {
      this.loading = true;
      listCategoriesForViewUsingGET({
        isvId: this.artpkId.pkId
      }).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          data.map(item => {
            item.categories.map((inneItem) => {
              this.checkedList.push(inneItem.pkId);
            })
          });
        }
      });
    },
    getAuth(){
      let user = JSON.parse(sessionStorage.getItem('user'))
      // console.log(user);
      if (user) {
        let hasISVEditAuth = user.authorities.filter(
          item => item.authority == 'isv:Edit ISV Info:2'
        )
        let hasEditCatAuth = user.authorities.filter(
          item => item.authority == 'resource:Edit Category:2'
        )
        // Tickets
        if (hasISVEditAuth.length&&hasEditCatAuth.length) {
          this.hasAuth = true
        }
      }
    },
    onSubmit(){
      this.loading = true;
      var newPermissionList = [];
      this.checkedList.map((item) => {
        newPermissionList.push({
          "module": item,
          "operations":  ["1"] 
        })
      })
      savePermissionsUsingPOST_1({
        subjectType: 2,
        subjectId: this.artpkId.groupId,
        modules: newPermissionList
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
    }
  },

  created() {
    let artpkId = JSON.parse(sessionStorage.getItem("artpkId"));
    this.artpkId = artpkId;
    this.getAuth()
    this.getCategories();
  }
};
</script>

<style lang="scss" scoped>

</style>
