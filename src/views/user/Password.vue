<template>
	<section >
    <el-row>
      <el-col :span="20">
        <el-form ref="form" :model="form" label-width="180px" :rules="rules2">
          <el-form-item label="Old Password" prop="oldPassword" required>
            <el-input type="password" v-model="form.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="New Password" prop="newPassword" :rules="{ validator: validatePass, trigger: 'change' }">
            <el-input type="password" v-model="form.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="Confirm New Password" prop="confirmPassword" :rules="{ validator: validatePass2, trigger: 'change' }">
            <el-input type="password" v-model="form.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onChangePassword">Confirm</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
	</section>
</template>

<script>
import { updateUserPasswordUsingPUT } from "@/api";

export default {
  data() {
    return {
      viewmode: false,
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      validatePass: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("Please input new password"));
        } else if (value == this.form.oldPassword) {
          callback(new Error("New Password can't be same as Old Password"));
        } else if (value.length < 8) {
          callback(new Error("New Password must at least 8 characters"));
        } else {
          callback();
        }
      },
      validatePass2: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("Please input new password again"));
        } else if (value != this.form.newPassword) {
          callback(new Error("New Password and Confirm Password don't match"));
        } else {
          callback();
        }
      },
      rules2:{
         oldPassword:[
           {
            required: true,
            message:"Old Password is required",
            trigger: ["blur", "change"]
          },
         ]
      }
    };
  },
  computed: {
    userid() {
      let user = sessionStorage.getItem("user");
      //转对象
      user = JSON.parse(user);
      return user.id;
    }
  },
  methods: {
    onChangePassword() {
      this.$refs.form.validate(valid => {
        if (valid) {
          debugger;
          updateUserPasswordUsingPUT({
            id: this.userid,
            updatePassword: this.form
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
      });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
</style>