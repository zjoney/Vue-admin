<template>
	<section >
    <el-row>
      <el-col :span="20">
        <el-form ref="form" :model="userForm" label-width="120px" :rules="rules2">
          <!-- <el-form-item label="Username" prop="username">
            <el-input v-model="userForm.username" disabled></el-input>
          </el-form-item> -->
          <el-form-item label="Email" prop="email" >
            <el-input v-model="userForm.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="Name" prop="realName" :rules="[{required: true,message:'Real name is required', trigger:'blur'},{max:50, message:'The length must be less than 50 characters', trigger:'blur'}]">
            <el-input v-model="userForm.realName" :disabled="viewmode"></el-input>
          </el-form-item>
          
          <el-form-item label="Phone" prop="phone" >
            <el-input v-model="userForm.phone" :disabled="viewmode" placeholder="Phone"  @keyup.native="handlePhoneChangeEvent($event)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Confirm</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
	</section>
</template>

<script>
import {
  getMineUserUsingGET,
  updateUserUsingPUT_1,
  existsUsersUsingGET
} from "@/api";
import { handlePhoneChangeEvent, phoneRegExp } from "@/utils";
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value) {
        if (value == this.copyEmail) {
          callback();
        }
        if (value != this.copyEmail) {
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
      //     return callback(new Error("ContactPhone is required"));
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
      viewmode: false,
      userForm: {},
      copyEmail: "",
      loading: false,
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
            required: true,
            type: "email",
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
    getProfile() {
      getMineUserUsingGET().then(response => {
        let { code, data, message } = response.data;
        this.userForm = data;
        this.copyEmail = data.email;
      });
    },

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          updateUserUsingPUT_1({
            id: this.userForm.id,
            updateUserReq: this.userForm
          }).then(response => {
            let { code, data, message } = response.data;
            if (code == 0) {
              this.$message({
                message: "Success",
                type: "success"
              });
            }
          });
        }
      });
    }
  },
  created() {
    this.getProfile();
  }
};
</script>

<style lang="scss" scoped>
</style>