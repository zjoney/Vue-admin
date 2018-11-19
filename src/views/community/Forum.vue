<template>
	<section>
    <div class="banner">
      <div class="title">{{documentName}}</div>
      {{documentDescription}}
    </div>
    <bread-crumb :adds="[documentName]">
      <el-button type="primary" size="medium" @click="handleNewPost">New Topic</el-button>
    </bread-crumb>
    <el-row class="toolbar">
      <el-col>
        <el-table :data="posts" >
          <el-table-column prop="details" label="Topic">
            <template slot-scope="scope">
              <router-link :to="{ path: '/forum/' + documentId + '/' + scope.row.pkId }">
                {{scope.row.name}}
              </router-link>
            </template>
          </el-table-column>
          
          <el-table-column prop="sadsa" label="Author" width="200px">
            <template slot-scope="scope">
              {{scope.row.authorRealName}}
            </template>
          </el-table-column>
          
          <el-table-column prop="createDate" :formatter="formatDate" label="Post At" width="180">
          </el-table-column>
          
          <el-table-column label="Replies" width="180">
            <template slot-scope="scope">
              {{scope.row.replyNum}}
            </template>
          </el-table-column>

          <!-- <el-table-column prop="lastReplyTime" :formatter="formatDate" label="Last Reply" width="180">
          </el-table-column> -->
        </el-table>
        <p/>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next">
        </el-pagination>
      </el-col>

      <el-dialog  title="New Topic" width="60%" :visible.sync="dialogVisible" >
        <el-form ref="form" :model="form" label-width="0px" :rules="rules2" @submit.native.prevent>
          <el-form-item prop="name" >
            <el-input type="text" v-model="form.name" placeholder="Topic Title" ></el-input>
          </el-form-item>
          <p/>
          <el-form-item prop="content" :rules="[
            { required: true, message: 'Content is required', trigger: 'blur' }
          ]">
            <ckeditor v-model="form.content" :params="{ accessType:0, attachedType:1, categoryId: documentId }"></ckeditor><p/>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onSubmit">Confirm</el-button>
        </span>
      </el-dialog>
    </el-row>
	</section>
</template>

<script>
import dateFormat from "dateformat";
import {
  getCategoryUsingGET,
  listArticlesUsingGET,
  saveArticleUsingPOST
} from "@/api";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        content: "",
        categoryId: this.$route.params.number,
        parentId: 0,
        orderNumber: 0,
        authorId: "",
        parentPath: "",
        remarks: "",
        summary: "",
        tags: ""
      },
      documentId: this.$route.params.number,
      documentName: "",
      documentDescription: "",
      posts: [],
      loading: false,
      currentPage: 1,
      pageNum: 1,
      pageSize: 20,
      total: 0,
      rules2: {
        name: [
          {
            required: true,
            message: "title is required",
            trigger: ["blur", "change"]
          },
          {
            max: 255,
            message: "The length must be less than 255 characters",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    formEvent(event, value) {
      var keyCode = event.keyCode;
      if (keyCode == 13) {
        event.stopPropagation();
        return false;
      } else {
        return true;
      }
    },
    // handleClose(){
    //   this.$refs[name].resetFields();
    // },
    formatDate: function(row, column, cellValue) {
      if (cellValue != null) {
        return dateFormat(new Date(parseInt(cellValue)), "yyyy-mm-dd h:MM tt");
      } else {
        return "N/A";
      }
    },
    // handleOpen() {
    //   this.$nextTick(() => {
    //     this.$refs.form.resetFields();
    //   });
    // },
    getDocumentName() {
      getCategoryUsingGET({ id: this.documentId }).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.documentName = data.nameCn;
          this.documentDescription = data.note;
        }
      });
    },
    getPosts() {
      this.loading = true;
      listArticlesUsingGET({
        categoryId: this.documentId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.posts = data.list;
          this.total = data.total;
          this.currentPage = data.pageNum;
        }
      });
    },
    handleNewPost() {
      this.dialogVisible = true;
    },
    onSubmit() {
      this.loading = true;
      this.$refs.form.validate(valid => {
        if (valid) {
          saveArticleUsingPOST({ article: this.form }).then(response => {
            let { code, data, message } = response.data;
            if (code !== 0) {
              this.$message({
                message: message,
                type: "error"
              });
            } else {
              this.$message({
                message: "Success",
                type: "success"
              });
              this.getPosts();
              this.dialogVisible = false;
            }
          });
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getPosts();
    }
  },
  mounted() {
    this.getDocumentName();
    this.getPosts();
  }
};
</script>

<style lang="scss" scoped>
</style>