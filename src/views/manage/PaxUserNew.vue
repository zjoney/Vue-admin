<template>
<section>
  <bread-crumb :adds="breadName">
  </bread-crumb>
  <el-row class="toolbar">
    <el-col :span="20">
      <el-form ref="form" :model="userForm" label-width="120px" :rules="rules2">
        <!-- <el-form-item label="Username" prop="username" >
          <el-input v-model="userForm.username"></el-input>
        </el-form-item> -->
        <el-form-item label="Email" prop="email" >
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="realName" :rules="[{required:true, message: 'Name is required', trigger: 'blur'},{max: 50, message: 'The length must be less than 50 characters', trigger:'blur'}]">
          <el-input v-model="userForm.realName"></el-input>
        </el-form-item>
        
        <el-form-item label="Phone" prop="phone" >
          <el-input v-model="userForm.phone"  placeholder="Phone"  @keyup.native="handlePhoneChangeEvent($event)"></el-input>
        </el-form-item>
        <el-form-item label="Roles" prop="roleIds" :rules="[{ required:true, message: 'Role is required', trigger: ['blur', 'change'] }]">
          <el-select v-model="userForm.roleIds" multiple>
            <el-option v-for="item in userForm.roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleCancel">Cancel</el-button>
          <el-button type="primary" @click="onSubmit">Confirm</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</section>
</template>

<script>
import {
  listRolesUsingGET,
  saveUserUsingPOST,
  updateUserUsingPUT_1,
  getUserDetailsUsingGET,
  updateUserRolesUsingPUT,
  existsUsersUsingGET
} from "@/api";
import { handlePhoneChangeEvent, phoneRegExp } from "@/utils";

export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value) {
        if (/\W+/.test(value)) {
          callback(new Error("Only alphanumeric charactors are allowed"));
        }
        existsUsersUsingGET({
          username: value
        }).then(response => {
          let { code, data, message } = response.data;
          if (code != 0) {
            this.$message({
              message: message,
              type: "error"
            });
          } else {
            if (data) {
              callback(new Error("Username has already exsited"));
            } else {
              callback();
            }
          }
        });
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value) {
        // if (/\W+/.test(value)) {
        //   callback(new Error("Only alphanumeric charactors are allowed"));
        // }
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
    };
    var checkNumber = (rule, value, callback) => {
      var reg = phoneRegExp;
      // var reg = /^[\d]{1,}[\S]*$/;
      // if (this.phoneDelete) {
      //   if (!value) {
      //     return callback(new Error("Phone is required"));
      //   }
      //   if (value.length === 3 || value.length === 7) {
      //     this.userForm.phone += "-";
      //   }
      // }

      if (!reg.test(value)) {
        return callback(new Error("Invalid value"));
      } else {
        callback();
      }
    };
    return {
      breadName:["Add User"],
      userForm: {
        username: "",
        realName: "",
        email: "",
        phone: "",
        roleIds: [],
        roleList: [],
        type: 1,
        phoneDelete: false //只触发验证
      },
      
      rules2: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: ["blur", "change"]
          },
          {
            min: 5,
            max: 20,
            message: "The length must between 5 and 20 characters",
            trigger: ["blur", "change"]
          },
          { validator: validateUsername, trigger: ["blur"] } 
        ],
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
            trigger: ["blur"]
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
    handleCancel() {
      this.$router.push("/manage/users");
    },

    onSubmit() {
      this.userForm.username=this.userForm.email;
      this.$refs.form.validate(valid => {
        if (valid) {
          saveUserUsingPOST({
            saveUserReq: this.userForm
          }).then(response => {
            let { code, data, message } = response.data;
            if (code != 0) {
              this.$message({
                message: message,
                type: "error"
              });
            } else {
              updateUserRolesUsingPUT({
                userId: data,
                roleIds: this.userForm.roleIds
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
                }
              });
            }
            this.$router.push("/manage/users");
          });
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
          this.userForm.roleList = data;
        }
      });
    }
  },
  created() {
    this.getRoles();
  }
};
</script>

<style lang="scss" scoped>
</style>
