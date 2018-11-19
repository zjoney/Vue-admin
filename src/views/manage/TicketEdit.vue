<template>
  <section>
    <bread-crumb :adds="[this.$route.params.number]">
    </bread-crumb>

    <el-row class="toolbar"
            v-loading="loading2">
      <el-col :span="24">
        <div class="del-button">
          <h2>{{detail.title}}</h2>
          <el-button-group>
            <el-button size="medium"
                       @click="switchToReply">Reply</el-button>
            <el-button v-if="detail.status != 3&& detail.status != 5 &&detail.status != 7&&isvSolvedAuth"
                       size="medium"
                       @click="solveTicket">Solve</el-button>
            <el-button size="medium"
                       @click="watchTicket">{{watchStatus==1 ?'Watch':'Unwatch'}}</el-button>
            <!-- <el-dropdown @command="assignTicket"  v-if="isvAssignAuth">
            <el-button size="medium">
              Assign<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in paxUserList" :key="item.id" :command="item.id">{{item.username}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
            <!-- <el-cascader
            placeholder="试试搜索：指南"
            :options="paxUserList"
            filterable
          ></el-cascader> -->

          </el-button-group>
          <el-select v-if="isvAssignAuth"
                     placeholder="Assign"
                     v-model="AssigneeFilter.assigneeId"
                     filterable
                     size="medium"
                     @change="assignTicket">
            <el-option v-for="item in paxUserList"
                       :key="item.id"
                       :label="item.realName"
                       :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span=24>
        <div class="del-detail">
          <h3>Details</h3>
        </div>
        <table class="ticket-detail">
          <tr>
            <td>
              <span class="field">Status: </span>
              {{statusDescDicts[detail.status]}}
            </td>
            <td>
              <span class="field">Type: </span>
              {{detail.issueTypeName}}</td>
            <td>
              <span class="field">Serverity: </span>
              {{severityDescDicts[detail.severity]}}
            </td>
          </tr>
          <tr>
            <td>
              <span class="field">Reporter:</span>
              <div id="demoR"
                   v-on:mouseenter="reportVisible"
                   @mouseleave="reportInvisible">
                {{detail.createUserName}}
                <span class="showBox"
                      v-if="reportSeen">
                  Name:{{reportUserInfo.realName}}<br/> Phone:{{reportUserInfo.phone}}
                  <br/> Email:{{reportUserInfo.email}}
                </span>
              </div>
            </td>
            <td>
              <span class="field">Reported date:</span>
              {{formatRepor('','',detail.createDate)}}
            </td>
            <td>
              <span class="field">Expected solve date: </span>
              {{formatSolve('','',detail.expectResolveDate)}}
            </td>

          </tr>
          <tr>

            <td>
              <span class="field">SN: </span>
              {{detail.productSNs.join(",")}}
            </td>
            <td>
              <span class="field"> Assignee:</span>
              <div id="demoR"
                   v-on:mouseenter="assignVisible"
                   @mouseleave="assignInvisible">{{detail.assigneeRealName}}
                <span class="showBox"
                      v-if="assignSeen">
                  Name:{{assignUserInfo.realName}}<br/> Phone:{{assignUserInfo.phone}}
                  <br/> Email:{{assignUserInfo.email}}
                </span>
              </div>
            </td>
            <td>
              <span class="field">ISV:</span>
              {{detail.isvName}}
            </td>
          </tr>
          <tr>
            <td>
              <span class="field"> Watchers:</span>
              <div id="demo">
                <span :class="`demoWatcher ${key==detail.watchers.length-1?'last-watcher':''}`"
                      v-for="(item,key) in detail.watchers"
                      :key="key"
                      v-on:mouseenter="watchVisible(item)"
                      @mouseleave="watchInvisible">{{item.realName}}

                </span>
                <span class="showBox"
                      v-if="watchSeen"
                      v-on:mouseenter="showVisible"
                      @mouseleave="watchInvisible">
                  Name:{{watchUserInfo.realName}}<br/> Phone:{{watchUserInfo.phone}}
                  <br/> Email:{{watchUserInfo.email}}
                </span>

              </div>
            </td>
          </tr>
        </table>

        <h3>Description</h3>
        <div style="padding-left: 20px"
             v-html="detail.description"></div>

        <h3>Update History</h3>
        <div class="histortModle">
          <el-collapse v-model="activeNames"
                       @change="handleChange">
            <el-collapse-item title=""
                              name="0">
              <el-table :data="gridData">
                <el-table-column property="username"
                                 label="Author"
                                 width="200">
                  <template slot-scope="scope">
                    {{paxRealName[scope.row.userId]||isvRealNameAll[scope.row.userId]}}
                  </template>
                </el-table-column>
                <el-table-column property="updateDate"
                                 label="Update Date"
                                 :formatter="formatRepor"
                                 width="180"></el-table-column>
                <el-table-column property="valueType"
                                 label="Field">
                  <template slot-scope="scope">
                    {{ scope.row.valueType |capitalize}}
                  </template>
                </el-table-column>
                <el-table-column property="oldValue"
                                 label="Old Value">
                  <template slot-scope="scope">
                    {{(scope.row.valueType==1? scope.row.oldValue :paxRealName[scope.row.oldValue]) | statusFilter(statusDicts)}}
                    <!-- {{paxRealName[scope.row.userId]}} -->
                  </template>
                </el-table-column>
                <el-table-column property="newValue"
                                 label="New Value">
                  <template slot-scope="scope">
                    {{ (scope.row.valueType==1? scope.row.newValue :paxRealName[scope.row.newValue] ) | statusFilter(statusDicts)}}
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </div>

        <h3>Replies</h3>
        <div style="padding-left: 20px">
          <div class="comment"
               v-for="(item, index) in replies"
               :key="index">
            <img src="/static/images/userlogo.jpg">
            <div>
              <el-button type="text">
                {{item.user != null && item.user.realName != "" ? item.user.realName : null}}
              </el-button>
              {{formatRepor('','',item.createDate) }} <br/>
              <div v-if="item.type == 'confirm'">
                Please confirm if this ticket is solved or not. &nbsp;&nbsp;
                <el-button type="primary"
                           size="medium"
                           @click="handelsolve(detail.pkId,5)">Solved</el-button>
                <el-button type="danger"
                           size="medium"
                           @click="handelNoSolve(detail.pkId,2)">Not yet</el-button>
              </div>
              <div v-else
                   v-html="item.description"></div>
            </div>
          </div>
          <div style="width:70%">
            <a name="ckeditor"></a>
            <ckeditor ref="ckeditor"
                      v-model="replyForm.description"
                      :params="{ accessType:0, attachedType:2, issueId: this.detail.pkId }"></ckeditor>
          </div>

          <p/>
          <el-button :disabled="this.replyForm.description == ''"
                     type="primary"
                     size="medium"
                     @click="reply">Submit</el-button>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import dateFormat from 'dateformat';
import {
  getIssueUsingGET,
  listRepliesUsingGET,
  saveReplyUsingPOST,
  updateIssueUsingPUT,
  updateIssueStatusUsingPUT
} from '@/api';

import {
  assignIssueUsingPUT,
  userListUsingGET,
  listRecordUsingGET,
  watchIssueUsingPUT,
  listIssuesUsingGET,
  listDictsSortedUsingGET,
  getIssueByCodeUsingGET,
  isvUserIdRealNameUsingGET,
  paxUserIdRealNameUsingGET,
  getUserDetailsUsingGET
} from '@/api';

export default {
  data () {
    return {
      activeNames: ['1'],
      reportSeen: false,
      assignSeen: false,
      watchSeen: false,
      loading2: true,
      number: 0,
      isShow: false,
      dicts: [],
      statusDicts: [],
      gridData: [], // 历史版本data
      dialogTableVisible: false,
      detail: {
        paxUserList: [],
        productSNs: [],
        isvId: ''
      },
      replies: [],
      replyForm: {
        description: ''
      },
      code: 0,
      AssigneeFilter: {
        status: 'All',
        assigneeId: '',
        agList: []
      },
      paxUserList: [],
      pageSize: 10,
      pageNum: 1,
      status: 0,
      watchStatus: 1,
      paxRealName: {},
      isvRealNameAll: {},
      isvRealName: '',
      paxWatcher: [
        {
          userId: '',
          realName: ''
        }
      ],
      reportUserInfo: {},
      assignUserInfo: {},
      watchUserInfo: {},
      // watchers:"",
      // solveStatus: 0,
      assigneeName: '', // 被指定的人
      isvAssignAuth: false, // Assign 权限
      isvSolvedAuth: false // Solved 权限
    }
  },

  filters: {
    capitalize: function (valueType) {
      if (valueType == 1) {
        return 'status';
      } else {
        return 'assignee';
      }
    },
    statusFilter: (value, statusDicts) => {
      if (Number.isInteger(+value)) {
        return statusDicts[value]
      } else {
        return value
      }
    }
  },

  computed: {
    statusDescDicts () {
      let result = []
      let dicts = sessionStorage.getItem('dicts')
      //转对象
      dicts = JSON.parse(dicts)
      for (let item of dicts['Issue.status']) {
        result[item.dictValue] = item.dictDesc
      }
      return result
    },

    severityDescDicts () {
      let result = []
      let dicts = sessionStorage.getItem('dicts')
      //转对象
      dicts = JSON.parse(dicts)
      for (let item of dicts['Issue.severity']) {
        result[item.dictValue] = item.dictDesc
      }
      return result
    }
  },

  methods: {
    handleChange (val) {
      // console.log(val);
    },
    showVisible () {
      this.watchSeen = true
    },

    watchVisible (item) {
      getUserDetailsUsingGET({ id: item.userId }).then(response => {
        let { code, data, message } = response.data
        if (code !== 0) {
          this.$message({
            message: message,
            type: 'error'
          })
        } else {
          this.watchUserInfo = data
        }
      })
      this.watchSeen = true
    },
    watchInvisible () {
      this.watchSeen = false
    },
    assignVisible () {
      getUserDetailsUsingGET({ id: this.detail.assigneeId }).then(response => {
        let { code, data, message } = response.data
        if (code !== 0) {
          this.$message({
            message: message,
            type: 'error'
          })
        } else {
          this.assignUserInfo = data
        }
      })
      this.assignSeen = true
    },
    assignInvisible () {
      this.assignSeen = false
    },
    reportVisible () {
      getUserDetailsUsingGET({ id: this.detail.createUserId }).then(
        response => {
          let { code, data, message } = response.data
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            })
          } else {
            this.reportUserInfo = data
          }
        }
      )
      this.reportSeen = true
    },
    reportInvisible () {
      this.reportSeen = false
    },
    getIssuesTickets () {
      listIssuesUsingGET({
        assigneeId: this.AssigneeFilter.assigneeId
      }).then(response => {
        let { code, data, message } = response.data
        if (code == 10008) {
        } else if (code !== 0) {
          this.$message({
            message: message,
            type: 'error'
          })
        } else {
          this.AssigneeFilter.agList = data.list
        }
      })
    },
    getDicts () {
      listDictsSortedUsingGET().then(response => {
        this.dicts = response.data.data
        for (let item of this.dicts['Issue.status']) {
          this.statusDicts[item.dictValue] = item.dictDesc
        }
      })
    },

    statusDesc (id) {
      let item = this.dicts['Issue.status'].filter(
        item => item.dictValue == id
      )
      return item.dictDesc
    },

    formatDate: function (row, column, cellValue) {
      if (cellValue != null) {
        return dateFormat(new Date(parseInt(cellValue)), 'yyyy-mm-dd HH:MM:ss')
      } else {
        return 'N/A';
      }
    },
    formatRepor: function (row, column, cellValue) {
      if (cellValue != null) {
        return dateFormat(new Date(parseInt(cellValue)), 'yyyy-mm-dd h:MM tt')
      } else {
        return 'N/A';
      }
    },
    formatSolve: function (row, column, cellValue) {
      if (cellValue != null) {
        return dateFormat(new Date(parseInt(cellValue)), 'yyyy-mm-dd')
      } else {
        return 'N/A';
      }
    },

    getTicketHistory () {
      this.loading = true
      listRecordUsingGET({
        issueId: this.detail.pkId,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(respone => {
        this.loading = false
        let { code, data, message } = respone.data
        if (code != 0) {
          this.$message({
            message: 'message',
            type: 'error'
          })
        } else {
          this.gridData = data.list
        }
      })
    },

    getReplies () {
      listRepliesUsingGET({ issueId: this.detail.pkId }).then(respone => {
        this.replies = respone.data.data
      })
    },

    getTicket () {
      let me = this
      getIssueByCodeUsingGET({ code: this.$route.params.number }).then(
        response => {
          this.loading2 = false
          let { code, data, message } = response.data
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            })
          } else {
            me.detail = data
            let user = JSON.parse(sessionStorage.getItem('user'))
            // debugger;
            me.detail.watchers.filter(u => {
              if (u.userId == user.id) {
                me.watchStatus = 0
              }
            })
            me.getReplies()
            me.getTicketHistory()
            isvUserIdRealNameUsingGET({
              isvId: me.detail.isvId
            }).then(respone => {
              let { code, data, message } = respone.data
              if (code != 0) {
                this.$message({
                  message: 'message',
                  type: 'error'
                })
              } else {
                me.isvRealNameAll = data
                //  me.paxWatcher = [];
                // me.detail.watchers.map(u => {
                //   if (typeof me.isvRealNameAll[u.userId] != "undefined") {
                //       let tempIsvReal;
                //      for(var i of me.paxWatcher){
                //           if(i.userId=u.userId){
                //               tempIsvReal=true;
                //                break;
                //           }
                //      }
                //    if(tempIsvReal){
                //       me.paxWatcher.push({
                //       userId: u.userId,
                //       realName: me.isvRealNameAll[u.userId]|| me.paxRealName[u.userId]
                //     });
                //    }
                //   }
                // });
                for (var key of Object.keys(data)) {
                  if (key == me.detail.createUserId) {
                    me.detail.createUserName = data[key]
                  }
                }
              }
            })
          }
        }
      )
    },

    resetReplyForm () {
      this.replyForm.description = '';
    },

    reply () {
      this.replyForm['issueId'] = this.detail.pkId
      saveReplyUsingPOST({ replyReq: this.replyForm }).then(respone => {
        this.getReplies()
        this.resetReplyForm()
      })
    },

    switchToReply () {
      location.href = '#ckeditor';
      this.$refs.ckeditor.focus()
    },
    getPaxRealName () {
      this.loading = true
      paxUserIdRealNameUsingGET().then(response => {
        this.loading = false
        let { code, data, message } = response.data
        if (code != 0) {
          this.$message({
            message: 'message',
            type: 'error'
          })
        } else {
          this.paxRealName = data
        }
      })
    },
    watchTicket () {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.loading = true
      let me = this

      watchIssueUsingPUT({
        issueId: this.detail.pkId,
        status: this.watchStatus
      }).then(response => {
        this.loading = false
        let { code, data, message } = response.data
        if (code != 0) {
          this.$message({
            message: 'message',
            type: 'error'
          })
        } else {
          // debugger;
          if (me.watchStatus === 1) {
            me.detail.watchers.push({
              userId: user.id,
              realName: user.realName
            })
            me.watchStatus = 0
          } else {
            var recordRealName = []
            // debugger;
            me.detail.watchers.filter(u => {
              if (u.userId != user.id) {
                recordRealName.push({
                  userId: u.userId,
                  realName: u.realName
                })
              }
            })
            me.detail.watchers = recordRealName
            me.watchStatus = 1
          }
        }
      })
    },

    solveTicket () {
      updateIssueStatusUsingPUT({ id: this.detail.pkId, status: 3 }).then(
        respone => {
          // this.detail.solveStatus = 3;
          this.detail.status = 3
        }
      )
    },
    assignTicket (val) {
      assignIssueUsingPUT({ id: this.detail.pkId, assigneeId: val }).then(
        response => {
          let { code, data, message } = response.data
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            })
          } else {
            this.$message({
              message: 'Success',
              type: 'success'
            })
            this.getTicket()
          }
        }
      )
    },

    getUsers () {
      userListUsingGET({ type: 1, pageSize: 0, noMessage: 1 }).then(
        response => {
          let { code, data, message } = response.data
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            })
          } else {
            this.paxUserList = data.list
          }
        }
      )
    }
  },
  mounted () {
    this.getDicts()
    this.getTicket()
    this.getUsers()
  },
  created () {
    this.getPaxRealName()
    let user = JSON.parse(sessionStorage.getItem('user'))
    //判断有没有Assign权限
    this.isvAssignAuth = user.authorities.filter(
      item => item.authority == 'ticket:Assign Ticket:2'
    )
    if (this.isvAssignAuth.length) {
      this.isvAssignAuth = true
    } else {
      this.isvAssignAuth = false
    }
    // 判断有没有Solved权限
    this.isvSolvedAuth = user.authorities.filter(
      item => item.authority == 'ticket:Solve Ticket:2'
    )
    if (this.isvSolvedAuth.length) {
      this.isvSolvedAuth = true
    } else {
      this.isvSolvedAuth = false
    }
  }
}
</script>

<style scoped lang="scss">
.el-button-group {
  float: left;
}
.el-select {
  float: left;
}
.el-collapse-item {
  /deep/ .el-collapse-item__arrow {
    float: left;
  }
}
#demoR {
  position: relative;
  display: inline-block;
}
#demo {
  position: relative;
  display: inline-block;
  color: #1369bf;
  //   & span{
  //  color: blue;
  //   }
}
.demoWatcher {
  &::after {
    content: '，';
  }
  &:last-child:after {
    content: '';
  }
  &.last-watcher:after {
    content: '' !important;
  }
}
.showBox {
  width: 190px;
  padding: 5px;
  position: absolute;
  left: 0px;
  top: 28px;
  border: 1px solid #1369bf;
  background-color: #2678b9;
  font-size: 12px;
  line-height: 20px;
  color: #ffffff;
  z-index: 1999;
}
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
.el-table {
  width: 80%;
}
.el-select > .el-input {
  width: 140px;
}

.el-dropdown-menu {
  height: 200px;
  overflow: auto;
  border: none;
}
.el-dropdown {
  float: left;
  // display: inline-block;
  position: relative;
  color: #606266;
  font-size: 14px;
}
.el-dropdown-menu {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0);
}
@media screen and (min-width: 960px) and (max-width: 1200px) {
  .el-table {
    width: 544px;
    .el-table__header-wrapper {
      width: 544px;
      overflow: auto;
    }
    .el-table__header-wrapper,
    .el-table__footer-wrapper {
      .el-table__header {
        width: 823px;
        overflow: auto;
      }
    }
    .el-table__body-wrapper {
      width: 823px;
      overflow: auto;
    }
  }
}
</style>
