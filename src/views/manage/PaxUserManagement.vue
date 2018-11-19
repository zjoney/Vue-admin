<template>
<section>
  <bread-crumb>
    <router-link to="/manage/users/new">
      <el-button type="primary" size="medium" v-if="isManageUser">Add User</el-button>
    </router-link>
  </bread-crumb>
  <el-row class="toolbar">
    <el-col :span="24">
       <!-- Assignee: <el-select v-model="AssigneeFilter.assigneeId" clearable filterable size="medium" @change="handleFilter">
          <el-option
            v-for="item in realNameList"
            :key="item.id"
            :label="item.realName"
            :value="item.id">
          </el-option>
        </el-select> -->
       <span style="text-align:text-top;line-height: 33px; font-size: 16px;">Filter:  </span>
       <el-input v-model="filter.realName" clearable size="medium" placeholder="Name" @clear="handleClear" 
        style="vertical-align: middle; display: inline-table;">
        <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
      </el-input>
      </el-col>
      <el-col :span="24">
      <p/>
      <el-table
      v-loading="loading2"
       :data="users">
        <!-- <el-table-column prop="username" label="Username" sortable></el-table-column> -->
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column prop="realName" label="Name" sortable></el-table-column>
        <el-table-column label="Role">
          <template slot-scope="scope">
            {{scope.row.roles&&scope.row.roles.map(item=>item.name).join(',')}}
          </template>
        </el-table-column>
        <el-table-column label="Status" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange(scope.row)" :disabled="!isManageUser"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button type="plain" size="small" @click="handleEdit(scope.row.id)" v-if="isManageUser">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p/>
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="total" layout="total, prev, pager, next">
      </el-pagination>
      <el-dialog :visible.sync="dialogVisible" title="Edit User" width="40%">
        <el-form v-if="form" ref="form" :key="formId" :model="form"  :rules="rules2" label-width="120px">
          <!-- <el-form-item label="Username" prop="username" required>
            <el-input v-model="form.username" disabled></el-input>
          </el-form-item> -->
          <el-form-item label="Email" prop="email" >
            <el-input v-model="form.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="Name" prop="realName" :rules="[{required: true,message:'Name is required', trigger: 'blur' },{max:50, message:'The length must be less than 50 characters', trigger: 'blur' }]">
            <el-input v-model="form.realName"></el-input>
          </el-form-item>
         
          <el-form-item label="Phone" prop="phone" >
            <el-input v-model="form.phone" placeholder="Phone"  @keyup.native="handlePhoneChangeEvent($event)" ></el-input>
          </el-form-item>
          <el-form-item label="Roles" prop="currentUserRoleIds" :rules="[{ required:true, message: 'Role is required', trigger: 'blur' }]">
            <el-select v-model="form.currentUserRoleIds" multiple>
              <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onSubmit">Confirm</el-button>
          </span>
      </el-dialog>
    </el-col>
  </el-row>
</section>
</template>

<script>
import dateFormat from "dateformat";
import {
  listRolesUsingGET,
  updateUserRolesUsingPUT,
  updateUserUsingPUT,
  userListUsingGET,
  updateUserUsingPUT_1,
  getUserDetailsUsingGET,
  existsUsersUsingGET
} from "@/api";
import { handlePhoneChangeEvent, phoneRegExp } from "@/utils";
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value) {
        if(value == this.copyEmail){
             callback();
        }
        if( value != this.copyEmail){
          existsUsersUsingGET({
          email: value
        }).then(response => {
          let { code, data, message } = response.data;
          if (code != 0) {
            this.$message({
              message: message,
              type: "error"
            });
          } else {
            if (data) {
              callback(new Error("Email has already exsited"));
            } else {
              callback();
            }
          }
        });
        }
      }
    };
    var checkNumber = (rule, value, callback) => {
      var reg = phoneRegExp;
      // var reg = /^[\d]{1,}[\S]*$/;
      // if (this.phoneDelete) {
      //   if (!value) {
      //     return callback(new Error("Phone is required"));
      //   }
      //   if (value.length === 3 || value.length === 7) {
      //     this.form.phone += "-";
      //   }
      // }

      if (!reg.test(value)) {
        return callback(new Error("Invalid value"));
      } else {
        callback();
      }
    };
    return {
      loading2: true,
      // filter: {
      //   type: "All"
      // },
      filter: {
        realName: ""
      },
      data: [],
      users: [],
      loading: false,
      dialogVisible: false,
      form: {
        currentUserRoleIds: []
      },
      copyEmail:"",
      formId: 0,
      roleList: [],
      currentPage: 1,
      pageNum: 1,
      pageSize: 20,
      total: 0,
      roleNameList: {},
      AssigneeFilter: {
        assigneeId: ""
      },
      realNameList: [],
      isManageUser: false, //pax用户对于pax user板块没有编辑按钮
      phoneDelete: false, //只触发验证
      rules2: {
        phone: [
          {
            validator: checkNumber,
            required: true,
            trigger: ["blur"]
          },
          {
            max: 13,
            message: "The length must be less than 13 characters.",
            trigger: ["blur"]
          }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "Email is required",
            trigger: "blur"
          },
          {
            max: 50,
            message: "The length must be less than 50 characters",
            trigger: "blur"
          },
          { validator: validateEmail, trigger: ["blur"] }
        ]
      }
    };
  },
  methods: {
    handlePhoneChangeEvent: handlePhoneChangeEvent,
    formatDate: function(row, column, cellValue) {
      if (cellValue != null) {
        return dateFormat(new Date(cellValue), "yyyy-mm-dd");
      } else {
        return "NA";
      }
    },
    getUsers() {
      userListUsingGET({
        realName: this.filter.realName,
        id: this.AssigneeFilter.assigneeId,
        type: 1,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.users = data.list;
          this.total = data.total;
          this.currentPage = data.pageNum;
          this.loading2 = false;
        }
      });
    },
    handleClear() {
      this.pageNum = 1;
      this.getUsers();
    },
    getAllPax() {
      userListUsingGET({
        id: this.AssigneeFilter.assigneeId,
        type: 1,
        pageSize: 0
      }).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.realNameList = data.list;
          // sessionStorage.setItem("paxRealName",JSON.stringify(data.list))
          this.users = data.list;
        }
      });
    },
    handleFilter(val) {
      this.pageNum = 1;
      this.getUsers();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUsers();
    },
    getUserDetail(id) {
      this.form = {};
      getUserDetailsUsingGET({
        id: id
      }).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.form = data;
          this.copyEmail = data.email;
          this.$set(
            this.form,
            "currentUserRoleIds",
            data.roles.map(item => item.id)
          );
        }
      });
    },

    getRoles() {
      listRolesUsingGET({
        type: 1
      }).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.roleList = data;
        }
      });
    },

    handleEdit(id) {
      this.formId++;
      this.form = {};
      this.getUserDetail(id);
      this.dialogVisible = true;
    },

    handleStatusChange(user) {
      updateUserUsingPUT({
        id: user.id,
        status: user.status
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
          user.status = user.status;
        }
      });
    },
    onSubmit() {
      // this.form.roleIds = this.currentUserRoleIds
      this.$refs.form.validate(valid => {
        if (valid) {
          updateUserUsingPUT_1({
            id: this.form.id,
            updateUserReq: this.form
          }).then(response => {
            let { code, data, message } = response.data;
            if (code !== 0) {
              this.$message({
                message: message,
                type: "error"
              });
            } else {
              updateUserRolesUsingPUT({
                userId: this.form.id,
                roleIds: this.form.currentUserRoleIds
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
                  this.dialogVisible = false;
                  this.getUsers();
                }
              });
            }
          });
        }
      });
    }
    // handleCurrentChange(val) {
    //   this.pageNum = val
    //   this.getUsers()
    // }
  },
  created() {
    // this.getAllPax();
    this.getUsers();
    this.getRoles();

    let user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(user)
    this.isManageUser = user.authorities.filter(
      u => u.authority == "auth:Manage User Info:2"
    );
    if (this.isManageUser.length) {
      this.isManageUser = true;
    } else {
      this.isManageUser = false;
    }
  },
  mounted() {
    // console.log(this.form)
  }
};
</script>

<style lang="scss" scoped >
.el-switch.is-disabled .el-switch__core {
  cursor: default;
}
.el-input {
  width: 240px;
}
</style>
