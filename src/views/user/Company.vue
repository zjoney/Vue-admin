<template>
	<section >
    <el-row>
      <el-col :span="20">
        <el-form ref="form" :model="form" label-width="200px" :rules="rules2">
          <el-form-item label="Company Name" prop="companyName"  >
            <el-input :disabled="!isvEditAuth" v-model="form.companyName"></el-input>
          </el-form-item>

          <el-form-item label="Address" required>
            <el-form-item prop="companyAddress" :rules="[{ required: true, message: 'Address is required', trigger: 'blur'},{ max: 255, message: 'The length must be less than 255 characters', trigger: 'blur' }]" >
              <el-input :disabled="!isvEditAuth" v-model="form.companyAddress" placeholder="Address"></el-input>
            </el-form-item>
            <p/>
            <el-col :span="7">   
              <el-form-item prop="postCode" :rules="[{required:true, message: 'Zip Code is required', trigger: 'blur'},{max: 50, message: 'The length must be less than 50 characters', trigger:'blur'}]">
                <el-input :disabled="!isvEditAuth" v-model="form.postCode" placeholder="Zip Code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7">
              <el-form-item prop="city" :rules="[{required:true, message:'City is required', trigger:'blur' },{max:50, message: 'The length must be less than 50 characters', trigger:'blur'}]">
                <el-input :disabled="!isvEditAuth" v-model="form.city" placeholder="City"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7">
              <el-form-item prop="state" :rules="[{required:true, message:'State is required', trigger:'blur' },{max:50, message: 'The length must be less than 50 characters', trigger:'blur'}]">
                <el-input :disabled="!isvEditAuth" v-model="form.state" placeholder="State"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          
          <el-form-item label="Website" prop="companyWebsite" :rules="[{ max: 255, message: 'The length must be less than 255 characters', trigger: 'blur' }]">
            <el-input :disabled="!isvEditAuth" v-model="form.companyWebsite"></el-input>
          </el-form-item>

          <el-form-item label="Contact Person" required :class="{expand:isExpand}">
            <el-col :span="7">
              <el-form-item prop="businessContactName" :rules="[{required: true,message:'Name is required', trigger:'blur'},{max:50, message:'The length must be less than 50 characters', trigger:'blur'}]">
                <el-input :disabled="!isvEditAuth" v-model="form.businessContactName" placeholder="Name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7">
              <el-form-item prop="businessContactPhone"   >
                <el-input :disabled="!isvEditAuth" v-model="form.businessContactPhone" placeholder="Phone"  @keyup.native="handlePhoneChangeEvent($event)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7">
              <el-form-item prop="businessContactEmail">
                <el-input :disabled="!isvEditAuth" v-model="form.businessContactEmail" placeholder="Work Email"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="POS System Name" prop="posSystemName" :rules="[{ required: true, message: 'POS System Name is required', trigger: 'blur' },{max:255, message:'The length must be less than 255 characters', trigger:'blur'}]">
            <el-input :disabled="!isvEditAuth" v-model="form.posSystemName"></el-input>
          </el-form-item>

          <el-form-item label="POS System Version" prop="posSystemVersion" :rules="[{ message: 'POS System Version is required', trigger: 'blur' },{max:255, message:'The length must be less than 255 characters', trigger:'blur'}]">
            <el-input :disabled="!isvEditAuth" v-model="form.posSystemVersion"></el-input>
          </el-form-item>
          
          <el-form-item label="POS Type" prop="dictIds" :rules="[{required: true, message:'POS Type is required' ,trigger:'blur'}]">
            <el-checkbox-group v-model="form.dictIds" :disabled="!isvEditAuth" >
              <el-checkbox v-for="item in posList" :key="item.pkId" :label="item.pkId">{{item.item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="Interested Terminals" prop="dictIds2" :rules="[{required:true, message:'Interested Terminals is required',trigger:'blur'}]">
            <el-checkbox-group v-model="form.dictIds2" :disabled="!isvEditAuth" >
              <el-checkbox v-for="item in modelList" :key="item.pkId" :label="item.pkId">{{item.item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="Integration Type" prop="dictIds3" :rules="[{required:true, message:'Integration Type is required',trigger:'blur'}]">
              <el-checkbox-group v-model="form.dictIds3" :disabled="!isvEditAuth">
              <el-checkbox v-for="item in integraList" :label="item.pkId" :key="item.pkId">
              <el-tooltip  placement="bottom"  effect="light">
                <div slot="content" v-if="item.pkId==16">
                  The ECR/POS sends transaction data (transaction type, amount ...etc.) to the PAX terminal. <br/>The PAX terminal reads the card, transmits the secure data to the host, and passes the host<br/> response back to the ECR/POS without sensitive card data. The ECR/POS does not <br/>communicate with the host. In this scenario, the ECR/POS is out-out-PCI scope.
                </div>
                <div slot="content" v-else>
                  The PAX terminal is a peripheral device used to swipe, insert or tap a card and enter the PIN. <br/>It reads the card and sends all cardholder data encrypted back to the ECR/POS. The ECR/POS <br/>handles the payment logic and the communication with the host. In this scenario,<br/> the ECR/POS is required to support PCI requirements even when the card data is encrypted.
                </div>
                <el-button type="text" @click="onClickIntBtn(item.pkId)"> {{item.item}}</el-button>
              </el-tooltip>
              </el-checkbox>
              </el-checkbox-group>
          </el-form-item>

					<el-form-item>
						<el-button type="primary" @click="onSubmit" v-if="isvEditAuth">Confirm</el-button>
					</el-form-item>
				</el-form>
      </el-col>
    </el-row>
	</section>
</template>

<script>
  import { getIsvUsingGET, updateIsvUsingPUT,checkExistUsingGET ,existsUsersUsingGET } from "@/api"
  import { handlePhoneChangeEvent,phoneRegExp } from "@/utils";
  export default {
    data() {
       var checkNumber = (rule, value, callback) => {
      
       var reg=phoneRegExp

      if (!reg.test(value)) {
        return callback(new Error("Invalid value"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      var str = ["aol.com","att.net", "comcast.net", "facebook.com", "gmail.com", "gmx.com", "googlemail.com", "google.com","hotmail.com", "hotmail.co.uk", "mac.com", "me.com", "mail.com", "msn.com", "live.com", "sbcglobal.net", "verizon.net","yahoo.com", "yahoo.co.uk", "outlook.com", "sina.com", "sina.cn", "qq.com", "naver.com", "hanmail.net", "daum.net","nate.com", "yahoo.co.jp", "yahoo.co.kr", "yahoo.co.id", "yahoo.co.in", "yahoo.com.sg", "yahoo.com.ph", "163.com","126.com", "aliyun.com", "foxmail.com"]
      let _this = this;
      var isExpand=false;
      for(var i of Object.keys(str)){
        if(value.lastIndexOf(str[i]) !== -1){
           isExpand = true;
           callback(new Error('Please use work email to register. Using personal mail may result in your application being rejected.'))
        }
      }
      _this.isExpand=isExpand;
      if(!isExpand){
         callback();
      }
      // if (value) {
      //   existsUsersUsingGET({ email: value }).then(response => {
      //     let { code, data, message } = response.data
      //     if (code !== 0) {
      //       this.$message({
      //         message: message,
      //         type: 'error'
      //       })
      //     } else {
      //       if (data) {
      //         callback(new Error('Email has already exsited'))
      //       } else {
      //         callback()
      //       }
      //     }
      //   })
      // }
    }
    var validateCompanyName = (rule, value, callback) => {
      if (value) {
        // if (/\W+/.test(value)) {
        //   callback(new Error("Only alphanumeric charactors are allowed"));
        // }
        if (value == this.copyvalue) {
          callback();
        }
        if (value != this.copyvalue) {
          setTimeout(() => {
            let companynameExist = true;
            checkExistUsingGET({
              companyName: value
            }).then(resp => {
              resp.data.data == false
                ? (companynameExist = false)
                : (companynameExist = true);
              if (companynameExist) {
                callback(new Error("CompanyName has existed"));
              } else {
                callback();
              }
            });
          }, 1000);
        }
      }
    };
      return {
        isExpand: false,
        isAuthor:false,
        isvEditAuth:false,//more
        form: {
          dictIds: [],
        dictIds2: [],
        dictIds3: []
        },
        dictIds: [],
        posList: [],
        integraList: [],
        modelList: [],
        loading: false,
        copyvalue: "", //保存初始companyName
        phoneDelete: false, //只触发验证
        rules2: {
        businessContactPhone: [
          {
            validator: checkNumber,
            required: true,
            trigger: ["blur"]
          },
          {
            max: 13,
            message: "Length exceeds 13.",
            trigger: ["blur"]
          }
        ],
        companyName: [
          {
            required: true,
            message: "Company Name is required",
            trigger: "blur"
          },
          {
            max: 255,
            message: "The length must be less than 255 characters",
            trigger: "blur"
          },
          { validator: validateCompanyName, trigger: ["blur"] }
        ],
        businessContactEmail: [
          { required: true,
            message: "Work Email is required",
            trigger: "blur"
            },
            {
            max: 50,
            message: "The length must be less than 50 characters",
            trigger: "blur"
          },
          { validator: validateEmail, trigger: ['blur'] }
        ]
      },
      }
    },
    computed:{
      isvId(){
        let user = sessionStorage.getItem("user");
        //转对象
        user = JSON.parse(user);
        return user.clientId
      },
    
    },
    methods: {
       handlePhoneChangeEvent:handlePhoneChangeEvent,
      getIsvDetail(id) {
        getIsvUsingGET({ id: this.isvId }).then(response => {
          let { code, data, message } = response.data;
          if (code !== 0) {
            this.$message({
              message: message,
              type: "error"
            });
          } else {
            this.form = data;
            this.copyvalue = data.companyName;
            this.$set(this.form, 'dictIds', [])
            this.$set(this.form, 'dictIds2', [])
            this.$set(this.form, 'dictIds3', [])

            for (let item of this.form.baseIsvInfo) {
              if (item.checked == 1) {
                if(item.group == "POS Basic Information" && item.subgroup == "POS Type"){
                  this.form.dictIds.push(item.pkId);
                }
                if(item.group == "Payment Terminal Type"){
                  this.form.dictIds2.push(item.pkId);
                }
                if(item.group == "POS Basic Information" && item.subgroup == "Integration Type"){
                  this.form.dictIds3.push(item.pkId);
                }
              }
            }
            this.modelList = this.form.baseIsvInfo.filter(
              item => item.group == "Payment Terminal Type"
            );

          let tempList = []
          let posAll = this.form.baseIsvInfo.filter(
            item =>
              item.group === 'POS Basic Information' && item.subgroup === 'POS Type'&& item.item !=="Other"
          )
          let posNew =this.form.baseIsvInfo.filter(
            item =>
              item.item =="Other"
          )
          this.posList = tempList.concat(posAll, posNew)

             this.integraList = this.form.baseIsvInfo.filter( item => item.group == "POS Basic Information" && item.subgroup == "Integration Type")
          }
        });
      },

      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form["dictIds"] = this.form.dictIds.concat(this.form.dictIds2, this.form.dictIds3)
            updateIsvUsingPUT({ req: this.form }).then(response => {
              let { code, data, message } = response.data;
              if (code != 0) {
                this.$message({
                  message: message,
                  type: "error"
                });
              } else {
                this.$message({
                  message: "Success",
                  type: "success"
                })
              }
            })
          }
        })
      },
      onClickIntBtn(id){
      if(this.form.dictIds3&&this.form.dictIds3.indexOf(id)!=-1){
          var inx=this.form.dictIds3.indexOf(id);
          this.form.dictIds3.splice(inx,1);
        }else{
          this.form.dictIds3.push(id);
        }
      }
    },
    created(){
       let user=JSON.parse(sessionStorage.getItem("user"));
       this.isvEditAuth=user.authorities.filter(
         (item)=>
         item.code == "Edit ISV Info"
      )
      if(this.isvEditAuth.length){
         this.isvEditAuth=true;
         this.getIsvDetail()
      }else{
         this.isvEditAuth=false;
         this.getIsvDetail()
       }
     }
}

</script>

<style lang="scss">
  .mainForm{
   .el-input.is-disabled .el-input__inner{
      cursor:default;
    }
  }
.el-button--text{
  color:#606266;
}
.expand{
  margin-bottom: 60px;
}
</style>