<template>
<section>
  <bread-crumb :adds="[this.$route.params.code]">
  </bread-crumb>
  <el-row class="toolbar" v-loading="loading2">
    <el-col :span="24">
      <h2>{{detail.title}}</h2>
      <el-button-group>
        <el-button size="medium" @click="switchToReply">Reply</el-button>
        <el-button v-if="(detail.status != 7 && detail.status != 5)&&isView" size="medium" @click="cancelTicket">Cancel</el-button>
        <el-button type="success" v-if="(detail.status == 3)&&isView" size="medium" @click="acceptTicket">Accept</el-button>
        <el-button type="danger" v-if="(detail.status == 3)&&isView" size="medium" @click="rejectTicket">Reject</el-button>
        <el-button size="medium" @click="watchTicket">{{watchStatus==1 ?'Watch':'Unwatch'}}</el-button>
      </el-button-group>
      <div>
        <table class="ticket-detail">
          <tr>
            <td>
              <span class="field">Status: </span>
              {{statusDescDicts[detail.status]}}
            </td>
            <td>
              <span class="field">Type: </span>
              {{detail.issueTypeName}}
            </td>
            <td>
              <span class="field">Serverity: </span>
              {{severityDescDicts[detail.severity]}}
            </td>
          </tr>
          <tr>
            <td>
              <span class="field">Reporter: </span>
              {{isvRealName}}
            </td>
            
            <td>
              <span class="field">Reported date: </span>
              {{formatReport(detail.createDate)}}
            </td>
            <td>
              <span class="field">Expected solve date: </span>
              {{formatSolve(detail.expectResolveDate)}}
            </td>
          </tr>
          <tr>
            <td >
              <span class="field">SN: </span>
              {{detail.productSNs.join(",")}}
            </td>
            <td >
              <span class="field">Assignee: </span>
              {{detail.assigneeRealName}}
            </td>
            <td>
              <span class="field">Watchers: </span>
              {{paxWatcher.join(",")}}
            </td>
          </tr>
        </table>
      </div>

      <h3>Description</h3>
      <div style="padding-left: 20px" v-html="detail.description" class="newDecrip"></div>

      <h3>Replies</h3>
      <div style="padding-left: 20px">
        <div class="comment" v-for="(item, index) in replies" :key="index">
          <img src="/static/images/userlogo.jpg">
          <div>
            <el-button type="text">{{item.user.realName}}</el-button>
            {{formatReport(item.createDate)}} <br/>
            <div v-html="item.description"></div>
          </div>
        </div>
        <div style="width:70%">
          <a name="ckeditor"></a>
          <ckeditor ref="ckeditor" v-model="replyForm.description" :params="{ accessType:0, attachedType:2, issueId: this.detail.pkId }"></ckeditor>
        </div>
        <p/>
        <el-button :disabled="this.replyForm.description == ''" type="primary" size="medium" @click="reply">Submit</el-button>
      </div>
    </el-col>
  </el-row>
</section>
</template>

<script>
import dateFormat from "dateformat";
import {
  getIssueUsingGET,
  listRepliesUsingGET,
  saveReplyUsingPOST,
  updateIssueUsingPUT,
  updateIssueStatusUsingPUT,
  watchIssueUsingPUT,
  getIssueByCodeUsingGET,
  paxUserIdRealNameUsingGET,
  isvUserIdRealNameUsingGET
} from "@/api";

export default {
  data() {
    return {
      loading2: true,
      detail: {
        productSNs: [],
        isvId: ""
      },
      replies: [],
      replyForm: {
        description: ""
      },
      isView: false,
      watchStatus: 1,
      assigneeRealName: "", //工单被指派给的人
      isShowAssigneeName: false,
      paxRealName: {},
      paxWatcher: [],
      recordRealName: [],
      isvRealName: "tempR",
      isvRealNameAll: {}
    };
  },
  computed: {
    statusDescDicts() {
      let result = [];
      let dicts = sessionStorage.getItem("dicts");
      //转对象
      dicts = JSON.parse(dicts);
      for (let item of dicts["Issue.status"]) {
        result[item.dictValue] = item.dictDesc;
      }
      return result;
    },
    severityDescDicts() {
      let result = [];
      let dicts = sessionStorage.getItem("dicts");
      //转对象
      dicts = JSON.parse(dicts);
      for (let item of dicts["Issue.severity"]) {
        result[item.dictValue] = item.dictDesc;
      }
      return result;
    }
  },
  methods: {
    getRealName() {
      let me = this;
      paxUserIdRealNameUsingGET().then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          me.paxRealName = data;
          let newId = JSON.parse(sessionStorage.getItem("newId"));
          for (var key in data) {
            if (key == newId) {
              me.assigneeRealName = data[key];
            }
          }
        }
      });
    },
    getReplies() {
      listRepliesUsingGET({
        issueId: this.detail.pkId
      }).then(respone => {
        this.replies = respone.data.data;
      });
    },
    formatReport(timestamp) {
      if (timestamp != null) {
        return dateFormat(new Date(parseInt(timestamp)), "yyyy-mm-dd h:MM tt");
      } else {
        return "NA";
      }
    },
    formatSolve(timestamp) {
      if (timestamp != null) {
        return dateFormat(new Date(parseInt(timestamp)), "yyyy-mm-dd");
      } else {
        return "NA";
      }
    },

    getTicket() {
      getIssueByCodeUsingGET({
        code: this.$route.params.code
      }).then(response => {
        this.loading2 = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.detail = data;

          this.paxWatcher = [];
          this.detail.watchers.map(u => {
            if (typeof this.paxRealName[u.userId] != "undefined") {
              this.paxWatcher.push(this.paxRealName[u.userId]);
            }
          });
          let user = JSON.parse(sessionStorage.getItem("user"));
          this.isView = this.detail.createUserId == user.id;
          this.detail.watchers.filter(u => {
            if (u.userId == user.id) {
              this.watchStatus = 0;
            }
          });
          isvUserIdRealNameUsingGET({ isvId: this.detail.isvId }).then(
            response => {
              let { code, data, message } = response.data;
              if (code !== 0) {
                this.$message({
                  message: message,
                  type: "error"
                });
              } else {
                this.isvRealNameAll = data;
                sessionStorage.setItem("isvRealNameAll", JSON.stringify(data));

                this.isvRealName = this.isvRealNameAll[
                  this.detail.createUserId
                ];
               
                this.detail.watchers.map(u => {
                  if (typeof this.isvRealNameAll[u.userId] != "undefined") {
                    this.paxWatcher.push(this.isvRealNameAll[u.userId]);
                  }
                  // else{
                  //   if(typeof this.paxRealName[u.userId] != "undefined"){
                  //       this.paxWatcher.push(this.paxRealName[u.userId])
                  //   }
                  // }
                });
              }
            }
          );
          this.getReplies();
        }
      });
    },
    resetReplyForm() {
      this.replyForm.description = "";
    },

    reply() {
      this.replyForm["issueId"] = this.detail.pkId;
      saveReplyUsingPOST({
        replyReq: this.replyForm
      }).then(respone => {
        this.getReplies();
        this.resetReplyForm();
      });
    },

    switchToReply() {
      location.href = "#ckeditor";
      this.$refs.ckeditor.focus();
    },

    watchTicket() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.loading = true;
      let me = this;
      watchIssueUsingPUT({
        issueId: this.detail.pkId,
        status: this.watchStatus
      }).then(response => {
        // debugger;
        this.loading = false;
        let { code, data, message } = response.data;
        if (code != 0) {
          this.$message({
            message: "message",
            type: "error"
          });
        } else {
          if (me.watchStatus === 1) {
            me.detail.watchers.push({
              userId: user.id
            });

            me.paxWatcher.push(
              me.isvRealNameAll[user.id] || me.paxRealName[user.id]
            );
            // me.paxWatcher.push(this.paxRealName[user.id]);

            me.watchStatus = 0;
          } else {
            var recordRealName = [];
            me.detail.watchers.filter(u => {
              if (u.userId != user.id) {
                var nowItemName =
                  me.isvRealNameAll[u.userId] || me.paxRealName[u.userId];
                recordRealName.push(nowItemName);
              }
            });
            me.paxWatcher = recordRealName;
            me.watchStatus = 1;
          }
        }
      });
    },

    cancelTicket() {
      this.$confirm("Are you sure to cancel this ticket?", "Confirm", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        updateIssueStatusUsingPUT({
          id: this.detail.pkId,
          status: 7
        }).then(response => {
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
            this.detail.status = 7;
          }
        });
      });
    },

    acceptTicket() {
      this.$confirm("Are you sure to accpet the answer?", "Confirm", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        updateIssueStatusUsingPUT({
          id: this.detail.pkId,
          status: 5
        }).then(respone => {
          this.detail.status = 5;
        });
      });
    },

    rejectTicket() {
      this.$confirm("Are you sure to reject the answer?", "Confirm", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        updateIssueStatusUsingPUT({
          id: this.detail.pkId,
          status: 2
        }).then(respone => {
          this.detail.status = 2;
        });
      });
    }
  },

  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));

    this.getRealName();
    this.getTicket();
    //  if(user.username === this.assigneeName ){
    //    this.isShowAssigneeName = true;
    //  }
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
}

.comment-right {
  @extend .comment;
  float: right;
}

.ticket-detail {
  margin-top: 20px;
  width: 80%;
  font-size: 16px;
  line-height: 25px;

  tr {
    td {
      word-break: break-all;
      width: 30%;
      .field {
        color: #777777;
      }
    }
  }
}

</style>
