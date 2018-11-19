<template>
	<section>
    <bread-crumb>
    </bread-crumb>
    <el-row class="toolbar"  v-loading="loading2">
      <el-col :span="24">
        Boards: <el-radio-group size="medium" v-model="currentBoard">
          <el-radio-button label="All"></el-radio-button>
          <el-radio-button v-show="inited" v-for="item in categories" :label="item.nameCn" :key="item.pkId"></el-radio-button>
        </el-radio-group>
      </el-col>
      
      <el-col :span="24" >
        <div class="card"  v-for="item in documents" :key="item.pkId" v-if="isGetPermission" >
          <router-link :to="{ name: 'Manage Resource', params: { number: item.pkId},query:{name:item.nameCn} }">
            <h3>{{item.nameCn}}</h3>
          </router-link>
          {{item.note}}
        </div>
      </el-col>
    </el-row>
	</section>
</template>

<script>
import {
  listCategoriesUsingGET,
  listPermissionUsingGET,
  getCatalogTreeUsingGET
} from "@/api";

export default {
  data() {
    return {
      loading2: true,
      inital: false,
      categories: [],
      inited:false,
      activeName: "first",
      currentBoard: "",
      documents: [],
      infoDialogVisible: false,
      menuDialogVisible: false,
      id: "", //存当前用户的id
      currentISVPermissions: [],
      filteredCategoryList: [],
      allCategoryList: [],
      isGetPermission: false,
      isShowSection: false, //
      allPermissionChildrenId: [],
      allPermissionParentId: []
    };
  },
  watch: {
    currentBoard(val, oldVal) {
      if (val != oldVal) {
        this.documents = [];
        this.isGetPermission = false;
        for (var item of this.categories) {
          if (val == "All" || item.nameCn == val) {
            this.documents.push(...item.categories);
          }
        }
        this.getPermission();
      }
    }
  },
  methods: {
    getPermission() {
      let me = this;
      this.loading = true;
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.id = user.id;
      listPermissionUsingGET({
        subjectIds: this.id
      }).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          // console.log(data);
          this.currentISVPermissions = Object.keys(data);
  
          for (var i = this.documents.length - 1; i >= 0; i--) {
            let doc = this.documents[i];
            if (!this.currentISVPermissions.includes(doc.pkId)) {
              this.documents.splice(i, 1);
            }
          }
          // console.log(this.documents);
          let arr2 = [];
          for (var i in this.documents) {
            this.allPermissionParentId.push(this.documents[i].parentId);
            arr2[this.documents[i].parentId] = 1;
          }
          
          // let arr2 = [...new Set(this.allPermissionParentId)];
          // console.log(arr2,me,this);
          if (!me.inital) {
            me.inital = true;
            for (var i = me.categories.length - 1; i >= 0; i--) {
              let cat = me.categories[i];

              if (typeof arr2[cat.pkId] == "undefined") {
                me.categories.splice(i, 1);
              }
            }
          }
          me.inited=true;
          this.filteredCategoryList = this.allCategoryList;
          this.getMark();
          this.isGetPermission = true;
        }
      });
    },
    getCategories() {
      this.loading = true;
      listCategoriesUsingGET().then(response => {
        this.loading = false;
        this.loading2 = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.getPermission();
          
          data.map((board, index) => {
            if (board.categories.length != 0 && board.nameCn != "Forum") {
              this.categories.push(board);
            }
          });
          let user = JSON.parse(sessionStorage.getItem("user"));
          this.id = user.id;
          if (!this.id) 
          // {
          //   this.getPermission();
          // } else
           {
            this.filteredCategoryList = this.allCategoryList;
          }
          this.currentBoard = "All";
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
  mounted() {
  },
  created() {
    this.getCategories();
  }
};
</script>

<style lang="scss" scoped>
</style>
