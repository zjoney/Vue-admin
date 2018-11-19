<template>
<section>
  <el-row>
    
    <el-col :span=24>

     <el-form  :model="loginForm" ref="loginForm" label-width="0px" class="login-container">
       <h3 class="pl-title" style="text-align: center;">Sign In</h3>
      <el-form-item prop="username" :rules="{ required: true, message: 'Please enter your Email', trigger: 'change' }">
        <el-input type="text" v-model="loginForm.username" placeholder="Email"></el-input>
      </el-form-item>
      
      <el-form-item prop="password" :rules="{ required: true, message: 'Please enter your password', trigger: 'change' }">
        <el-input type="password" v-model="loginForm.password" placeholder="Password"></el-input>
      </el-form-item>

      <el-form-item prop="verifyCode" :rules="{ required: true, message: 'Please enter captcha code', trigger: 'change' }">
        <el-col :span="16">
          <el-input type="text" v-model="loginForm.verifyCode" placeholder="Captcha" @keyup.enter.native="handleSubmit"></el-input>
        </el-col>
        <el-col :span="2">
          &nbsp;
        </el-col> 
        <el-col :span="5">
          <img style="height:38px" :src="captchaUrl" @click="refreshCaptcha">
        </el-col>
      </el-form-item>

      <el-form-item>
          <el-col :span="9">
              <el-button type="text" @click="dialogVisible = true">Forget password?</el-button>
          </el-col>
          <el-col :span="6">
          &nbsp;
        </el-col>
          <el-col :span="8">
              <el-button type="text" @click="handleRegister">Not yet registered</el-button>
          </el-col>
      </el-form-item>
      
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit">Sign In</el-button>
      </el-form-item>
    </el-form>
  
     
    <el-dialog title="Reset your password" :visible.sync="dialogVisible" width="410px">
      Enter your email address and we will send you a link to reset your password.
      <p/>
      <el-form :model="forgetForm" ref="forgetForm" >
        <!-- <el-form-item prop="username" :rules="{ required: true, message: 'Please enter your username', trigger: 'change' }">
          <el-input type="text" required v-model="forgetForm.username" placeholder="Username"></el-input>
        </el-form-item> -->

        <el-form-item prop="email" :rules="{ type: 'email', required: true, message: 'Please enter your email', trigger: 'change' }">
          <el-input type="email" required v-model="forgetForm.email" placeholder="Email"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleForget">Confirm</el-button>
      </span>
    </el-dialog>
        </el-col>
      </el-row>
  </section>
</template>

<script>
import {
  loginUsingPOST,
  listDictsSortedUsingGET,
  forgotPasswordUsingPUT,
  createCodeUsingGET,
  getMineUserUsingGET
} from "@/api";

export default {
  data() {
    return {
      getMineId: 0,
      loading: false,
      loginForm: {
        username: "",
        password: "",
        verifyCode: ""
      },
      dialogVisible: false,
      forgetForm: {
        // username: "",
        email: ""
      },
      captchaUrl: ""
    };
  },
  computed: {
    showFormStyle() {
      this.pageWidth = window.innerWidth;
      return this.pageWidth <= 1024;
    }
  },
  methods: {
    // getProfile() {
    //   getMineUserUsingGET().then(response => {
    //     let { code, data, message } = response.data;
    //     sessionStorage.setItem("user", JSON.stringify(data));
     
    //   });
    // },
    getDicts() {
      listDictsSortedUsingGET().then(response => {
        let { code, data, message } = response.data;
        sessionStorage.setItem("dicts", JSON.stringify(data));
      });
    },
   
    handleSubmit(event) {
      let user = JSON.parse(sessionStorage.getItem("user"));
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            if (event.code == 13) {
              this.loginMethods();
            } else this.loginMethods();
          }
        });
      
    },

    loginMethods() {
      loginUsingPOST(this.loginForm)
        .then(response => {
          let { code, data, message } = response.data;
          if (code !== 0) {
            this.$message({
              message: message,
              type: "error"
            });
          } else {
            // this.$store.commit("changeLogin", {num:100}); //登录后改变登录状态 isLogin = 100 

            sessionStorage.setItem("user", JSON.stringify(data));

            this.$store.commit("SET_USER");
            this.getDicts();
            let url = this.$route.query["redirect"];
            if (!url) {
              if (data.clientId != null) {
                if (this.$store.state.isTemporaryPassword == 1) {
                  url = "/updatePassword";
                } else {
                  url = "/";
                }
              } else {
                if (this.$store.state.isTemporaryPassword == 1) {
                  url = "/updatePassword";
                } else {
                  url = "/manage";
                }
              }
            }
            this.$router.push({ path: url });
          }
        })
        .catch(() => {
          this.refreshCaptcha();
        });
    },
    handleForget() {
      // this.forgetForm.username=this.forgetForm.email;
      this.$refs.forgetForm.validate(valid => {
        if (valid) {
          forgotPasswordUsingPUT(this.forgetForm).then(response => {
            this.loading = false;
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
            this.$router.push("/");
            this.dialogVisible = false;
          });
        }
      });
    },
    handleRegister() {
      this.$router.push("/signup");
    },
    refreshCaptcha() {
      this.captchaUrl = "/api/v1/verifyCode?" + new Date().getTime();
    }
  },
  mounted() {
    // this.getProfile();
    this.refreshCaptcha();
    //监听登录表单，切换布局
    let vue = this;
    window.addEventListener("resize", function() {
      vue.pageWidth = window.innerWidth;
    });
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 50px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  // border: 1px solid #dfe6ec;
  // box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
  }
}
@media screen and (max-width: 1024px) {
  .login-container {
    // float: left;
    margin: 50px auto;
    // width: 80%;
    border: none;
    box-shadow: none;
    .pl-title {
      text-align: center;
    }
    img {
      height: 0.740741rem !important;
    }
  }
}
@media screen and (max-width: 768px) {
  .login-container {
    // float: left;
    margin: 50px auto;
    border: none;
    box-shadow: none;
    .pl-title {
      text-align: center;
    }
  }
}
@media screen and (max-width: 414px) {
  .login-container {
    // float: left;
    margin: 50px auto;
        width: 70%;
    border: none;
    box-shadow: none;
    .pl-title {
      text-align: center;
    }
  }
}
@media screen and (max-width: 375px) {
  .login-container {
    // float: left;
    margin: 50px auto;
    border: none;
    box-shadow: none;
    .pl-title {
      text-align: center;
    }
  }
}
@media screen and(max-width: 325px) {
  .login-container {
    // float: left;
    margin: 50px auto;
    height: 100%;
    border: none;
    box-shadow: none;
    .pl-title {
      text-align: center;
    }
    img {
      height: 0.740741rem !important;
    }
  }
}
</style>