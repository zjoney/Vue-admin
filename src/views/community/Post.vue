<template>
	<section>
    <bread-crumb :adds="[{name:documentName,href:'/forum/'+this.$route.params.number},pageForm.name]">
    </bread-crumb>
    <el-row class="toolbar">
      <el-col :span="24">
        <h2>{{pageForm.name}}</h2>
        <hr/>
        <div style="padding-left: 20px" class="newCreate">
          <div v-if="this.currentPage == 1 || this.currentPage == 0" >
            <div>
              <el-button type="text">
                {{pageForm.authorRealName}}
              </el-button>
              {{formatDate(pageForm.createDate)}}
              <el-button type="text" @click="handleReply(0)">Reply</el-button>
              <br/>
              <div v-html="pageForm.content"></div>
            </div>
            <hr/>
          </div>
          
          <h3>Replies</h3>
          <div class="comment" v-for="(item, index) in comments" :key="index">
            <img src="/static/images/userlogo.jpg">
            <div>
              <el-button type="text">
                {{item.realName}}
              </el-button>
              {{formatDate(item.createDate)}}
              <el-button type="text" @click="handleReply(item.pkId)">Reply</el-button>
              <el-button v-if="isPaxUser" style="color: #ff4444" type="text" @click="handleRemove(item.pkId)">Remove</el-button>
              <br/>
              <div v-if="item.replyComment" class="quote">
                @{{item.replyComment.realName}}<br/>
                <div v-html="item.replyComment.content"></div>
              </div>
              <br/>
              <div v-html="item.content"></div>
            </div>
            <hr/>
          </div>
          <p/>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            layout="total, prev, pager, next">
          </el-pagination>
          <hr/>
          <div style="width:70%">
            <a name="ckeditor"></a>
            <ckeditor ref="ckeditor" v-model="commentForm.content" :params="{ accessType:0, attachedType:1, categoryId: this.documentId }" no-upload></ckeditor>
          </div>
          <p/>
          <el-button :disabled="this.commentForm.content == ''" type="primary" size="medium" @click="reply">Submit</el-button>
        </div>
      </el-col>
    </el-row>
	</section>
</template>

<script>
import dateFormat from "dateformat";
import {
  getCategoryUsingGET,
  getArticleUsingGET,
  getCommentsByArticleIdUsingGET,
  saveCommentUsingPOST,
  deleteCommentUsingDELETE
} from "@/api";

export default {
  data() {
    return {
      documentId: this.$route.params.number,
      documentName: "",
      pageId: this.$route.params.post,
      pageForm: {},
      comments: [],
      commentForm: {
        content: "",
        fkArticleId: this.$route.params.post,
        fkReplyCommentId: 0
      },
      loading: false,
      currentPage: 1,
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  computed: {
    isPaxUser() {
      if (!this.$store.state.user.id) {
        this.$store.commit("SET_USER");
      }
      return this.$store.state.user.type == 1;
    }
  },
  methods: {
    formatDate(timestamp) {
      if (timestamp != null) {
        return dateFormat(new Date(parseInt(timestamp)), "yyyy-mm-dd h:MM tt");
      } else {
        return "NA";
      }
    },
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
        }
      });
    },
    getPage() {
      this.loading = true;
      getArticleUsingGET({ id: this.pageId }).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.pageForm = data;
          // window.history.pushState(null, null, this.currentPageId)
        }
      });
    },
    getComments() {
      getCommentsByArticleIdUsingGET({
        articleId: this.pageId,
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
          this.comments = data.list;
          this.total = data.total;
          this.currentPage = data.pageNum;
        }
      });
    },
    handleReply(fkReplyCommentId) {
      this.commentForm.fkReplyCommentId = fkReplyCommentId;
      location.href = "#ckeditor";
      this.$refs.ckeditor.focus();
    },
    handleRemove(fkReplyCommentId) {
      this.$confirm("Are you sure to remove?", "Confirm", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          deleteCommentUsingDELETE({ id: fkReplyCommentId }).then(response => {
            let { code, data, message } = response.data;
            if (code == 0) {
              this.getComments();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Canceled"
          });
        });
    },
    reply() {
      saveCommentUsingPOST({ comment: this.commentForm }).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.getComments();
          this.commentForm.content = "";
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getComments();
    }
  },
  mounted() {
    this.getDocumentName();
    this.getPage();
    this.getComments();
  }
};
</script>

<style lang="scss" scoped>
.comment {
  position: relative;
  width: 80%;
  padding: 0 10px 10px 60px;

  img {
    position: absolute;
    left: -5px;
    top: 10px;
    height: 50px;
    width: 50px;
    border-radius: 100%;
  }

  .quote {
    background: #f9f9f9;
    // font-size: 12px;
    border-left: 5px solid #b8b6b6;
    padding-left: 10px;
  }
}

.comment-right {
  @extend .comment;
  float: right;
}
</style>

