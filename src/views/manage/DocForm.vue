<template>
  <section>
    <el-row>
      <el-col :span="24">
        <el-form ref="form"
                 size="medium"
                 :model="value"
                 :rules="rules2"
                 label-width="120px">
          <el-form-item label="Name"
                        prop="nameCn">
            <el-input v-model="value.nameCn"></el-input>
          </el-form-item>

          <el-form-item label="Description"
                        prop="note">
            <el-input v-model="value.note"></el-input>
          </el-form-item>
          <el-form-item label="ISV Access">
            <div>
                <el-radio v-model="value.accessType" @change="changeAllISV" label="1">All ISV</el-radio>
                <el-radio v-model="value.accessType" @change="changeAllISV" label="0">Selected ISV</el-radio>
            </div>
            <el-transfer :titles="['Forbidden', 'Allowed']"
                         :props="props"
                         v-model="isvPermissionList"
                         filterable
                         :data="isvList">
            </el-transfer>
          </el-form-item>
          <el-form-item label="Editor"
                        v-if="value.forumMode != 1">
            <el-select v-model="paxPermissionList"
                       multiple
                       style="width:100%;"
                       filterable>
              <el-option v-for="item in paxUserList"
                         :key="item.id"
                         :label="item.realName"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { listIsvUsingGET, userListUsingGET } from '@/api';
import {
  listPermissionsUsingGET,
  savePermissionsUsingPOST,
  updateCategoryUsingPUT,
  saveCategoryUsingPOST
} from '@/api';

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    var checkName = (rule, value, callback) => {
      var reg = /^([\d\w\u4e00-\u9fa5\S][\s\w\u4e00-\u9fa5\S]{0,49})$/

      if (!value) {
        return callback(new Error('Input can not be empty'))
      }
      if (!reg.test(value)) {
        return callback(new Error('Invalid value'))
      } else {
        callback()
      }
    }
    return {

      props: {
        key: 'groupId',
        label: 'companyName'
      },
      isvList: [],
      paxUserList: [],
      isvPermissionList: [],
      paxPermissionList: [],
      isAllISV:"0",
      rules2: {
        nameCn: [
          { validator: checkName, required: true, trigger: ['blur', 'change'] },
          {
            max: 50,
            message: 'The length must be less than 50 characters.',
            trigger: ['blur', 'change']
          }
        ],
        note: [
          { trigger: ['blur', 'change'] },
          {
            max: 255,
            message: 'The length must be less than 255 characters.',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    getIsvs () {
      listIsvUsingGET({ pageSize: 0, ndaStatus: 1 }).then(response => {
        let { code, data, message } = response.data
        if (code !== 0) {
          this.$message({
            message: message,
            type: 'error'
          })
        } else {
          this.isvList = data.list
          if(this.value&&typeof this.value.accessType!='undefined'){
            this.value.accessType=String(this.value.accessType);
            this.toSetAllISVAccess()
            
          }if(this.value && (this.value.accessType==undefined||this.value.accessType==0)){
            this.value.accessType='0';
            this.toRemoveISVDisabled();
          }
        }
      })
    },

    getUsers () {
      userListUsingGET({ type: 1, pageSize: 0 }).then(response => {
        let { code, data, message } = response.data
        if (code !== 0) {
          this.$message({
            message: message,
            type: 'error'
          })
        } else {
          this.paxUserList = data.list
        }
      })
    },

    getPermissions () {
      listPermissionsUsingGET({ module: this.value.pkId }).then(response => {
        let { code, data, message } = response.data
        if (code !== 0) {
          this.$message({
            message: message,
            type: 'error'
          })
        } else {
          for (let item of data) {
            if (item.operation == '1') {
              this.isvPermissionList.push(item.subjectId)
            }
            // 论坛模式不需要对PAX用户加权限，并且接口不返回PAX用户的权限数据
            if (this.value.forumMode == 0) {
              if (item.operation == '5') {
                this.paxPermissionList.push(item.subjectId)
              }
            }
          }
        }
      })
    },

    savePermissions () {
      let permissions = []
      for (let isvGroupId of this.isvPermissionList) {
        permissions.push({
          operation: 1,
          subjectId: isvGroupId,
          subjectType: 2
        })
        if (this.value.forumMode == 1) {
          permissions.push({
            operation: 5,
            subjectId: isvGroupId,
            subjectType: 2
          })
        }
      }

      if (this.value.forumMode == 0) {
        for (let paxUserId of this.paxPermissionList) {
          permissions.push({
            operation: 5,
            subjectId: paxUserId,
            subjectType: 3
          })
        }
      }

      savePermissionsUsingPOST({
        module: this.value.pkId,
        permissionReqs: permissions
      }).then(response => {
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
        }
      })
    },

    saveCategory (resolve, reject) {
      this.$refs.form.validate(valid => {
        if (valid) {
          saveCategoryUsingPOST({ catalog: this.value }).then(response => {
            let { code, data, message } = response.data
            if (code !== 0) {
              this.$message({
                message: message,
                type: 'error'
              })
            } else {
              this.value.pkId = data
              this.savePermissions()
              resolve()
            }
          })
        }
      })
    },

    updateCategory (resolve, reject) {
      this.$refs.form.validate(valid => {
        if (valid) {
          updateCategoryUsingPUT({
            id: this.value.pkId,
            catalog: this.value
          }).then(response => {
            let { code, data, message } = response.data
            if (code !== 0) {
              this.$message({
                message: message,
                type: 'error'
              })
            } else {
              this.savePermissions()
              resolve()
            }
          })
        }
      })
    },

    init () {
      this.reset()
      if (this.value.pkId) {
        this.getPermissions()
      }
    },

    save () {
      if (this.value.pkId) {
        return new Promise(this.updateCategory)
      } else {
        return new Promise(this.saveCategory)
      }
    },

    reset () {   
      this.isvPermissionList = []
      
      this.paxPermissionList = []
      if(this.value.accessType==1){
        this.toSetAllISVAccess();
      }else{
        this.toRemoveISVDisabled();        
      }
    },
    changeAllISV(val){
      if(val=='1'){
        this.toSetAllISVAccess();
      }else{
        this.toRemoveISVDisabled();
      }
    },
    toSetAllISVAccess(){
        var allISVArr=[];
        this.isvList.map((item)=>{
          item.disabled=true;
          allISVArr.push(item.groupId)
        });
        this.isvPermissionList=allISVArr.concat();
      
    },
    toRemoveISVDisabled(){
      this.isvList.map((item)=>{
        delete item.disabled;
      });
      this.isvList=this.isvList.concat();
    }
  },

  mounted () {
    this.getIsvs()
    this.getUsers();
  },
  created () { },
  updated(){
    if(this.value && this.value.accessType!=undefined && typeof this.value.accessType !='string'){
      this.value.accessType=String(this.value.accessType);
      if(this.value.accessType=='1'){
        this.toSetAllISVAccess();
      }else{
        this.toRemoveISVDisabled();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree {
  height: 400px;
}
</style>
