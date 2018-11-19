<template>
  <section>
    <bread-crumb>
      <router-link to="/manage/isvs/new">
        <el-button type="primary"
                   size="medium">Add ISV</el-button>
      </router-link>
    </bread-crumb>
    <el-row class="toolbar">
      <el-col :span="24">
        Status:
        <el-select v-model="filter.ndaStatus"
                   clearable
                   filterable
                   size="medium"
                   @clear="handleClear"
                   @change="handleFilter"
                   :disabled="!isvApproveAuth">
          <el-option v-for="(item, index) in statusDescList"
                     :key="index"
                     :label="item"
                     :value="index">
          </el-option>
        </el-select>
        &nbsp; &nbsp; Sales:
        <el-select v-model="filter.salesId"
                   clearable
                   filterable
                   size="medium"
                   @clear="handleClear"
                   @change="handleFilter">
          <el-option v-for="item in SalesList"
                     :key="item.id"
                     :label="item.realName"
                     :value="item.id"></el-option>
        </el-select>
        &nbsp; &nbsp; Sales Engineer:
        <el-select v-model="filter.salesEngineerId"
                   clearable
                   filterable
                   size="medium"
                   @clear="handleClear"
                   @change="handleFilter">
          <el-option v-for="item in SalesEngineerList"
                     :key="item.id"
                     :label="item.realName"
                     :value="item.id"></el-option>
        </el-select>
        &nbsp; &nbsp; Support:
        <el-select v-model="filter.supportId"
                   clearable
                   filterable
                   size="medium"
                   @clear="handleClear"
                   @change="handleFilter">
          <el-option v-for="item in SupportList"
                     :key="item.id"
                     :label="item.realName"
                     :value="item.id"></el-option>
        </el-select>
        <p />
        Feature:
        <el-cascader v-model="filter.solutionId"
                     clearable
                     :options="solutionList"
                     size="medium"
                     @clear="handleClear"
                     @change="handleFilter">
        </el-cascader>
        &nbsp; &nbsp; Filter:
        <el-input v-model="filter.companyName"
                  clearable
                  size="medium"
                  placeholder="Company name"
                  @clear="handleClear"
                  style="vertical-align: bottom; display: inline-table; padding-left:10px;">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="handleFilter"></el-button>
        </el-input>
      </el-col>
      <el-col :span="24">
        <p />
        <el-table v-loading="loading2"
                  :data="isvs">
          <el-table-column prop="companyName"
                           label="Name">
            <template slot-scope="scope">
              <router-link :to="{ path: '/manage/isvs/' + scope.row.code }">
                {{scope.row.companyName.substr(0,50)}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="createDate"
                           label="Register Date"
                           :formatter="formatDate"
                           width="140"></el-table-column>
          <el-table-column prop="signDate"
                           label="Signing Date"
                           :formatter="formatDate"
                           width="140"></el-table-column>
          <el-table-column prop="ndaStatus"
                           label="Status"
                           width="100">
            <template slot-scope="scope">
              {{statusDescList[scope.row.ndaStatus]}}
            </template>
          </el-table-column>
          <el-table-column label="Audit"
                           width="190">
            <template slot-scope="scope">
              <el-button v-if="scope.row.ndaStatus == 0"
                         @click="handleApprove(scope.row)"
                         type="success"
                         size="small">Approve</el-button>
              <el-button v-if="scope.row.ndaStatus == 0"
                         @click="handleReject(scope.row)"
                         type="danger"
                         size="small">Reject</el-button>
            </template>
          </el-table-column>
        </el-table>
        <p />
        <el-pagination @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       layout="total, prev, pager, next">
        </el-pagination>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import dateFormat from 'dateformat';
import {
  listIsvUsingGET,
  updateIsvUsingPUT,
  getIsvUsingGET,
  updateIsvStatusUsingPUT,
  listIsvExtendInfoUsingGET,
  userListUsingGET,
  userByRoleUsingGET
} from '@/api';
import { Input } from 'element-ui'

export default {
  data () {
    return {
      loading2: true,
      filter: {
        ndaStatus: null,
        companyName: null,
        salesId: null,
        salesEngineerId: null,
        supportId: null,
        solutionId: null
      },
      isvs: [],
      paxUserList: [],
      statusDescList: ['Waiting', 'Approved', 'Rejected'],
      solutionList: [],
      loading: false,
      currentPage: 1,
      pageNum: 1,
      pageSize: 20,
      total: 0,
      isvApproveAuth: false,
      SalesList: [],
      SalesEngineerList: [],
      SupportList: []
    }
  },

  methods: {
    getRoleUser () {
      this.loading = true
      userByRoleUsingGET(roleId).then(response => { })
    },
    getPaxUsers () {
      if(sessionStorage.getItem('allUser')){
        this.operateUser(JSON.parse(sessionStorage.getItem('allUser')))        
      }else{
        userListUsingGET({
          pageSize: 0,
          type: 1,
          noMessage: 1
        }).then(response => {
          let {
            code,
            data,
            message
          } = response.data
          if (code != 0) {
            this.$message({
              message: message,
              type: 'error'
            })
          } else {
            sessionStorage.setItem('allUser',JSON.stringify(data))                        
            this.operateUser(data)
          }
        })
      }
      
    },
    operateUser(data){
      // console.log(data.list)
          this.paxUserList = data.list

          for (var i = 0; i < this.paxUserList.length; i++) {
            var nowItem = this.paxUserList[i]
            if (
              nowItem.roles.findIndex(item => {
                return item.id == 2
              }) != -1
            ) {
              this.SupportList.push(Object.assign({}, nowItem))
            }
            if (
              nowItem.roles.findIndex(item => {
                return item.id == 3
              }) != -1
            ) {
              this.SalesEngineerList.push(Object.assign({}, nowItem))
            }
            if (
              nowItem.roles.findIndex(item => {
                return item.id == 4
              }) != -1
            ) {
              this.SalesList.push(Object.assign({}, nowItem))
            }
          }
    },
    handleClear () {
      this.pageNum = 1
      this.getIsvs()
    },
    handleFilter () {
      this.pageNum = 1
      this.getIsvs()
    },

    getIsvs () {
      if (this.filter.solutionId) {
        this.filter.dictIds = this.filter.solutionId[2]
      }
      let filter = Object.assign({}, this.filter)
      if (this.filter.ndaStatus == 'Approved') {
        filter.ndaStatus = 1
      }

      let params = Object.assign({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      },
      filter
      )
      listIsvUsingGET(params).then(response => {
        var allStatus = []
        var NotApproveStatus = []
        var list = []
        let {
          code,
          data,
          message
        } = response.data
        if (code !== 0) {
          this.$message({
            message: message,
            type: 'error'
          })
        } else {
          this.isvs = data.list
          // for (let c of this.isvs) {
          //   list[c.ndaStatus !== 0] = c;
          //   allStatus.push(c.ndaStatus);
          // }
          // NotApproveStatus = allStatus.filter(U => U !== 0);
          // console.log(allStatus);
          // console.log(NotApproveStatus);

          // if (NotApproveStatus) {
          //   this.isvs = data.list.filter(u => u.ndaStatus !== 0);
          // } else {
          //   this.isvs = data.list;
          // }
          // console.log(this.isvs)
          this.total = data.total
          this.currentPage = data.pageNum
          this.loading2 = false
        }
      })
    },

    filterInfoData (data) {
      let result = []
      data.map((item, index) => {
        if (index == 0 || item.group != data[index - 1].group) {
          result.push({
            label: item.group,
            value: item.group,
            children: [{
              label: item.subgroup == '' ? '-----' : item.subgroup,
              value: item.subgroup,
              children: [{
                label: item.item,
                value: item.pkId
              }]
            }]
          })
        } else {
          let node = result.find(xx => {
            return xx.value == item.group
          })
          if (item.subgroup != data[index - 1].subgroup) {
            node.children.push({
              label: item.subgroup == '' ? '----' : item.subgroup,
              value: item.subgroup,
              children: [{
                label: item.item,
                value: item.pkId
              }]
            })
          } else {
            let node2 = node.children.find(xx => {
              return xx.value == item.subgroup
            })
            node2.children.push({
              label: item.item,
              value: item.pkId
            })
          }
        }
      })
      return result
    },

    getExtendInfo () {
      listIsvExtendInfoUsingGET({
        id: 0
      }).then(response => {
        let {
          code,
          data,
          message
        } = response.data
        if (code !== 0) {
          this.$message({
            message: message,
            type: 'error'
          })
        } else {
          this.solutionList = this.filterInfoData(data)
        }
      })
    },

    formatDate: function (row, column, cellValue) {
      if (cellValue != null) {
        return dateFormat(new Date(parseInt(cellValue)), 'yyyy-mm-dd')
      } else {
        return 'N/A';
      }
    },

    handleReject (row) {
      this.$prompt(
        'Are you sure you want to reject? Reason for your refusal',
        'Confirm', {
          confirmButtonText: 'Reject',
          cancelButtonText: 'Cancel',
          inputType: 'textarea',      
          inputValidator:(val)=>{
            if (val === null) {
              return 'Please fill in the reason';//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错
            }
            if(val.length > 255){
                return 'Reason for rejection is less than 255 bytes'
            }
            // return !(val.length < 0 || val.length > 3)
          }
        }
      ).then(({ value }) => {
        updateIsvStatusUsingPUT({
          id: row.pkId,
          status: 2,
          rejectReason: value
        }).then(response => {
          let {
            code,
            data,
            message
          } = response.data
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            })
          } else {
            row.ndaStatus = 2
          }
        })
      }).catch((error) => {
      })
    },

    handleApprove (row) {
      this.$confirm(
        'Are you sure you want to approve? ISV will receive a notification email.',
        'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).then(() => {
        updateIsvStatusUsingPUT({
          id: row.pkId,
          status: 1
        }).then(response => {
            let {
              code,
              message
            } = response.data
            if (code === 0) {
              row.ndaStatus = 1
            } else {
              this.$message({
                message: message,
                type: 'error'
              })
            }
          })
          .catch((error) => {
            if (error.code == '10017') {
              this.$confirm('Please complete the ISV information', 'Confirm', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
              }).then(() => {
                this.$router.push({
                  path: '/manage/isvs/' + row.code
                })
              })
            }else {
              this.$message({
                message: message,
                type: 'error'
              })
            }
          })
      })
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getIsvs()
    }
  },
  created () {
    this.getExtendInfo()
    this.getPaxUsers()
    let user = JSON.parse(sessionStorage.getItem('user'))

    this.isvApproveAuth = user.authorities.filter(
      item => item.authority == 'isv:Approve ISV:2'
    )
    if (this.isvApproveAuth.length) {
      this.isvApproveAuth = true
    } else {
      this.isvApproveAuth = false
      this.filter.ndaStatus = 'Approved';
    }

    this.getIsvs()
  }
}
</script>

<style scoped>
.el-select {
  width: 15%;
}

.el-cascader {
  width: 240px;
}

.el-input {
  width: 240px;
}
</style>
