<template>
  <section>
    <div class="banner">
      <div class="title">Sign Up</div>
      Register as PAX ISV partner
    </div>
    <el-row class="toolbar">
      <el-col :span="22">
        <el-form ref="form" :model="form" size="medium" label-width="200px" :rules="rules2">
          <el-form-item label="Company Name" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>

          <el-form-item label="Address" required>
            <el-form-item prop="companyAddress" :rules="[{ required: true, message: 'Address is required', trigger: 'blur'},{ max: 255, message: 'The length must be less than 255 characters', trigger: 'blur' }]">
              <el-input v-model="form.companyAddress" placeholder="Address"></el-input>
            </el-form-item>
            <p/>
            <el-col :span="7">
              <el-form-item prop="postCode" :rules="[{required:true, message: 'Zip Code is required', trigger: 'blur'},{max: 50, message: 'The length must be less than 50 characters', trigger:'blur'}]">
                <el-input v-model="form.postCode" placeholder="Zip Code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7">
              <el-form-item prop="city" :rules="[{required:true, message:'City is required', trigger:'blur' },{max:50, message: 'The length must be less than 50 characters', trigger:'blur'}]">
                <el-input v-model="form.city" placeholder="City"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7">
              <el-form-item prop="state" :rules="[{required:true, message:'State is required', trigger:'blur' },{max:50, message: 'The length must be less than 50 characters', trigger:'blur'}]">
                <el-input v-model="form.state" placeholder="State"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="Website" prop="companyWebsite" :rules="[{ max: 255, message: 'The length must be less than 255 characters', trigger: 'blur' }]">
            <el-input v-model="form.companyWebsite"></el-input>
          </el-form-item>

          <el-form-item label="Contact Person" required :class="{expand:isExpand}">
            <el-col :span="7">
              <el-form-item prop="businessContactName" :rules="[{required: true,message:'Name is required', trigger:'blur'},{max:50, message:'The length must be less than 50 characters', trigger:'blur'}]">
                <el-input v-model="form.businessContactName" placeholder="Name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7">
              <el-form-item prop="businessContactPhone">
                <el-input v-model="form.businessContactPhone" placeholder="Phone" @keyup.native="handlePhoneChangeEvent($event)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7">
              <el-form-item prop="businessContactEmail">
                <el-input v-model="form.businessContactEmail" placeholder="Work Email"></el-input>
                <!-- { validator: validateCompanyName, trigger: ["blur"] } -->
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="POS System Name" prop="posSystemName" :rules="[{ required: true, message: 'POS System Name is required', trigger: 'blur' },{max:255, message:'The length must be less than 255 characters', trigger:'blur'}]">
            <el-input v-model="form.posSystemName"></el-input>
          </el-form-item>

          <el-form-item label="POS System Version" prop="posSystemVersion" :rules="[{  message: 'POS System Version is required', trigger: 'blur' },{max:255, message:'The length must be less than 255 characters', trigger:'blur'}]">
            <el-input v-model="form.posSystemVersion"></el-input>
          </el-form-item>

          <el-form-item label="POS Type" prop="dictIds" :rules="[{required: true, message:'POS Type is required' ,trigger:'blur'}]">
            <el-checkbox-group v-model="form.dictIds">
              <el-checkbox v-for="item in posList" :key="item.pkId" :label="item.pkId">{{item.item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="Interested Terminals" prop="dictIds2" :rules="[{required:true, message:'Interested Terminals is required',trigger:'blur'}]">
            <el-checkbox-group v-model="form.dictIds2">
              <el-checkbox v-for="item in modelList" :key="item.pkId" :label="item.pkId">{{item.item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="Integration Type" prop="dictIds3" :rules="[{required:true, message:'Integration Type is required',trigger:'blur'}]">
            <el-checkbox-group v-model="form.dictIds3">
              <!-- <label v-for="item in integraList"  :key="item.pkId"> -->
              <el-checkbox  v-for="item in integraList" :label="item.pkId" :key="item.pkId">
              <el-tooltip  placement="bottom"  effect="light">
                <div slot="content" v-if="item.pkId==16">
                  The ECR/POS sends transaction data (transaction type, amount ...etc.) to the PAX terminal. <br/>The PAX terminal reads the card, transmits the secure data to the host, and passes the host<br/> response back to the ECR/POS without sensitive card data. The ECR/POS does not <br/>communicate with the host. In this scenario, the ECR/POS is out-out-PCI scope.
                </div>
                <div slot="content" v-else>
                  The PAX terminal is a peripheral device used to swipe, insert or tap a card and enter the PIN. <br/>It reads the card and sends all cardholder data encrypted back to the ECR/POS. The ECR/POS <br/>handles the payment logic and the communication with the host. In this scenario,<br/> the ECR/POS is required to support PCI requirements even when the card data is encrypted.
                </div>
                <el-button type="text" @click="onClickIntBtn(item.pkId)">{{item.item}}</el-button>
              </el-tooltip>
              </el-checkbox>
              <!-- </label> -->
              
              </el-checkbox-group>
          </el-form-item>

          <el-form-item label="ISV Agreement" prop="ndaField" required :rules="{ validator: validateNda, trigger: ['blur', 'change'] } ">
            <div class="nda">
              <div v-html="content"></div>
              <el-checkbox v-model="form.ndaField" label="I have read and agree this agreement"></el-checkbox>
              <p/>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button @click="$router.push({path: '/'})">Cancel</el-button>
            <el-button type="primary" @click="onSubmit">Confirm</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { listIsvBaseInfoUsingGET, saveIsvUsingPOST, getLastIsvNdaUsingGET, checkExistUsingGET, existsUsersUsingGET } from '@/api'
import { handlePhoneChangeEvent, phoneRegExp } from '@/utils'
export default {
  data () {
    var checkNumber = (rule, value, callback) => {
      var reg = phoneRegExp
      // var reg = /^[\d]{1,}[\S]*$/;
      // if (this.phoneDelete) {
      //   if (!value) {
      //     return callback(new Error("ContactPhone is required"));
      //   }

      //   if (value.length === 3 || value.length === 7) {
      //     //文本框输入
      //     this.form.businessContactPhone += "-";
      //   }
      // }
      if (!reg.test(value)) {
        return callback(new Error('Invalid phone number'))
      } else {
        callback()
      }
    }
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
      if (value) {
        callback()
        // existsUsersUsingGET({ email: value }).then(response => {
        //   let { code, data, message } = response.data
        //   if (code !== 0) {
        //     this.$message({
        //       message: message,
        //       type: 'error'
        //     })
        //   } else {
        //     if (data) {
        //       callback(new Error('Work Email has already exsited'))
        //     } else {
        //       callback()
        //     }
        //   }
        // })
      }
    }
    var validateCompanyName = (rule, value, callback) => {
      if (value) {
        checkExistUsingGET({
          companyName: value
        }).then(response => {
          let { code, data, message } = response.data
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            })
          } else {
            if (data) {
              callback(new Error('CompanyName has already exsited'))
            } else {
              callback()
            }
          }
        })
      }
    }
    return {
      isExpand: false,
      phoneDelete: false, // 只触发验证
      form: {
        companyName: '',
        companyAddress: '',
        city: '',
        state: '',
        postCode: '',
        companyWebsite: '',
        businessContactEmail: '',
        businessContactName: '',
        businessContactPhone: '',
        technicalContactEmail: '',
        technicalContactName: '',
        technicalContactPhone: '',
        dictIds: [],
        dictIds2: [],
        dictIds3: [],
        posSystemName: '',
        posSystemVersion: '',
        ndaField: false
      },
      content: '',
      posList: [],
      modelList: [],
      integraList: [],
      validateNda: (rule, value, callback) => {
        if (value === false) {
          callback(new Error('Please read and accept the ISV Agreement'))
        } else {
          callback()
        }
      },
      rules2: {
        businessContactPhone: [
          {
            validator: checkNumber,
            required: true,
            trigger: ['blur']
          },
          {
            max: 13,
            message: 'The length must be less than 13 characters.',
            trigger: ['blur']
          }
        ],
        companyName: [
          {
            required: true,
            message: 'Company Name is required',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'The length must be less than 255 characters',
            trigger: 'blur'
          },
          { validator: validateCompanyName, trigger: ['blur'] }
        ],
        businessContactEmail: [
          {
            required: true, type: 'email', message: 'Work Email is required', trigger: 'blur'
          },
          {
            max: 50, message: 'The length must be less than 50 characters', trigger: 'blur'
          },
          { validator: validateEmail, trigger: ['blur'] }
        ]
      }
    }
  },

  methods: {
    handlePhoneChangeEvent: handlePhoneChangeEvent,
    // handlePhoneChange(event) {
    //   var keyCode = event.keyCode;
    //   var nowValue=event.target.value;
    //   if (nowValue.length >13) {
    //     nowValue = nowValue.slice(0, 13)
    //   }
    //   if (keyCode == 8) {
    //     // this.phoneDelete = false;
    //     // var val = nowValue;
    //     // if (val.slice(-2, -1) == "-") {
    //     //   nowValue = val.slice(0, -2);//''//val.slice(0, -2);
    //     // }
    //     if (nowValue.length == 1) {
    //       event.target.value = ''
    //     } else if (nowValue.length == 5) {
    //       event.target.value = nowValue.slice(0, 4)
    //     } else if (nowValue.length == 9) {
    //       event.target.value = nowValue.slice(0, 8)
    //     }
    //   } else {
    //     // this.phoneDelete = true;
    //     var valArr=nowValue.split('')
    //     console.log(valArr);
    //     if (nowValue.length >= 1&&nowValue.indexOf('(')==-1) {
    //       event.target.value = '(' + nowValue;
    //     } else if (nowValue.length >= 4&&nowValue.indexOf(')')==-1) {
    //       valArr.splice(4,0,')')
    //       event.target.value = valArr.join('');
    //     } else if (nowValue.length >= 8&&nowValue.indexOf('-')==-1) {
    //       valArr.splice(8,0,'-');
    //       event.target.value = valArr.join('');
    //     }
    //   }
    // },
    getIsvDicts () {
      listIsvBaseInfoUsingGET().then(response => {
        let { data } = response.data
        this.modelList = data.filter(
          item => item.group === 'Payment Terminal Type'
        )
        let tempList = []
        let posAll = data.filter(
          item =>
            item.group === 'POS Basic Information' && item.subgroup === 'POS Type'&& item.item !=="Other"
        )
        let posNew =data.filter(
          item =>
            item.item =="Other"
        )
        this.posList = tempList.concat(posAll, posNew)
        this.integraList = data.filter(item => item.group === 'POS Basic Information' && item.subgroup === 'Integration Type')
      })
    },
    onSubmit () {
      // debugger;
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.dictIds = this.form.dictIds.concat(this.form.dictIds2, this.form.dictIds3)
          // console.log(this.form.dictIds)
          saveIsvUsingPOST({ req: this.form }).then(response => {
            let { code } = response.data
            if (code !== 0) {
              this.$msgbox({
                message: 'Please try again or send mail to support@pax.us',
                title: 'Error',
                type: 'warning',
                showClose: false
              })
            } else {
              this.$msgbox({
                message:
                  'You have submitted your application, we will contact you within 3 days.',
                title: 'Success',
                type: 'success',
                showClose: false,
                callback: (action, instance) => {
                  this.$router.push('/')
                }
              })
            }
          })
        } else {
          return false
        }
      })
    },
    getNda () {
      getLastIsvNdaUsingGET().then(response => {
        let { code, data, message } = response.data
        if (code !== 0) {
          this.$message({
            message: message,
            type: 'error'
          })
        } else {
          this.content = data
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
  created () {
    this.getIsvDicts()
    this.getNda()
  }
}
</script>

<style lang="scss" scoped>
.nda {
  height: 400px;
  padding: 10px;
  border: 1px solid #dfe6ec;
  overflow: scroll;
  // color: #666666;
  font-size: 14px;
  line-height: 20px;
}
.el-button--text {
  color: #606266;
}
.expand{
  margin-bottom: 60px;
}
</style>
