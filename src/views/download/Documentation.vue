<template>
  <section>
    <div class="banner">
      <div class="title">Resources</div>
      Programming guide and SDK
    </div>
    <el-row class="toolbar" style="padding-top:46px">
      <el-col class="board"
              :span="24"
              v-for="board in filteredCategoryList"
              :key="board.pkId">
        <div v-if="board.categories.length > 0"
             style="margin-bottom: 20px;">
          <h2 style="color:#888">{{board.nameCn}}</h2><br/>
          <div v-for="doc in board.categories"
               :key="doc.pkId"
               class="card">
            <router-link :to="{ path: '/docs/' + doc.pkId,query:{name:doc.nameCn}}">
              <h3>{{doc.nameCn}}</h3>
            </router-link>
            <div v-if="doc.links && doc.links.length > 0">
              <div v-for="link in doc.links"
                   :key="link.pkId"
                   class="links">
                <router-link :to="{ path: '/docs/' + doc.pkId ,query:{name:doc.nameCn,id:link.pkId}}">{{link.name}}</router-link>
              </div>
            </div>
            <div v-else>
              {{doc.note}}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
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
          this.getMark();
        }
      });
    },
    findMarkedArticles(list, links) {
      if (list instanceof Array) {
        for (let item of list) {
          if (item.ifCatalog == false && item.marked == 1) {
            links.push({
              pkId: item.pkId,
              name: item.name
            });
          } else {
            this.findMarkedArticles(item.catalogs, links);
          }
        }
      }
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
            if (board.nameCn != "Forum" && board.nameCn != "Other") {
              this.allCategoryList.push(board);
            }
          });
          let clientId = this.$store.state.user.clientId;
          if (clientId) {
            this.getIsvDetail(clientId);
          } else {
            this.filteredCategoryList = this.allCategoryList;
            this.getMark();
          }
        }
      });
    },
    getMark() {
      for (var i = 0; i < this.filteredCategoryList.length; i++) {
        for (
          var j = 0;
          j < this.filteredCategoryList[i].categories.length;
          j++
        ) {
          let doc = this.filteredCategoryList[i].categories[j];
          getCatalogTreeUsingGET({
            id: doc.pkId
          }).then(response => {
            let { code, data, message } = response.data;
            if (code !== 0) {
              this.$message({
                message: message,
                type: "error"
              });
            } else {
              let links = [];
              this.findMarkedArticles(data, links);
              this.$set(doc, "links", links);
            }
          });
        }
      }
    }
  },
  created() {
    this.getCategories();
  }
};
</script>

<style lang="scss" scoped>
.links {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
h2{
  margin: 0%;
  line-height: 0%;
}
h3{
 
  line-height: 0%;
}
</style>
