<template>
	<section>
    <bread-crumb :adds="['New Ticket']">
    </bread-crumb>
    <el-row class="toolbar">      
      <el-col :span="20" >
        <el-form ref="form" :model="form" label-width="200px" label="left" label-suffix=":" :rules="rules2">
          <el-form-item label="Summary" prop="title" :rules="[{ required: true, message: 'Title is required', trigger: 'blur'},{ max: 255, message: 'The length must be less than 255 characters', trigger: 'blur' }]">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          
          <el-form-item label="Type" prop="issueTypeId" :rules="[{ required: true, message: 'Type is required', trigger: 'blur'}]">
            <el-cascader :props="props" :options="issueTypeList" v-model="form.issueTypeId" style="width: 400px" >
            </el-cascader>
          </el-form-item>

          <el-form-item label="Severity" prop="severity" :rules="[{ required: true, message: 'Severity is required', trigger: 'blur'}]">
            <el-select v-model="form.severity" >
              <el-option v-for="item in severityDict" :key="item.dictDesc" :label="item.dictDesc" :value="item.dictValue"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Expected Solve Date" prop="expectResolveDate" :rules="[{ required: true, message: 'Expected Solve Date is required', trigger: 'blur'}]">
            <el-date-picker v-model="form.expectResolveDate" type="date" :picker-options="pickerOptions" value-format="timestamp" placeholder="Please select date">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="SN" prop="productSNs" >
             <el-input v-model="form.productSNs" placeholder="Comma separated terminal SNs" ></el-input>
          </el-form-item>

          <el-form-item label="Description" prop="description" :rules="[{ required: true, message: 'Description is required', trigger: 'blur'}]">
            <ckeditor v-model="form.description" :params="{ accessType:1, attachedType:2, issueId: 0 }"></ckeditor>
          </el-form-item>

          <el-form-item>
            <el-button size="medium" @click="$router.push({ path: '/tickets'})">Cancel</el-button>
            <el-button size="medium" type="primary" @click="onSubmit">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
	</section>
</template>

<script>
import {
  listIssueTypesUsingGET,
  saveIssueUsingPOST,
  listDictsSortedUsingGET
} from "@/api";

export default {
  data() {
    var checkSN = (rule, value, callback) => {
      var reg = /[a-zA-Z0-9](?=\s+[a-zA-Z0-9])/g;

      // var reg = /^([\d\w\u4e00-\u9fa5\S]{0,}[\s\w\u4e00-\u9fa5\S]{0,})$/;

      if (reg.test(value)) {
        return callback(new Error("Invalid value"));
      } else {
        callback();
      }
      var valueArr = value.split(",");
      var isUsable = 1;
      for (var i = 0; i < valueArr.length; i++) {
        var currentValue = valueArr[i];
        if (currentValue.length > 20) {
          isUsable = 0;
        }
      }

      if (!isUsable) {
        return callback(
          new Error("The length of a single SN should not exceed 20.")
        );
      } else {
        callback();
      }
    };
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now() - 3600 * 1000 * 24;
        }
      },
      props: {
        value: "pkId",
        label: "name",
        children: "subTypes"
      },
      dicts: {},
      issueTypeList: [],
      severityDict: {},
      form: {
        title: "",
        issueTypeId: [],
        severity: null,
        copieds: [],
        expectResolveDate: "",
        productSNs: "",
        description: ""
      },

      rules2: {
        productSNs: [
          {
            validator: checkSN,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //只取最后一级ID
          let params = Object.assign({}, this.form);
          params.issueTypeId = this.form.issueTypeId[
            this.form.issueTypeId.length - 1
          ];
          params.productSNs = this.form.productSNs.split(",");

          saveIssueUsingPOST({ issueReq: params }).then(response => {
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
              this.$router.push({ path: "/tickets" });
            }
          }).catch((error) => {
              if(error.code == '10003'){
                this.$message({
                  type: "error",
                  message: 'The classification does not exist.',
                  duration: 1000
                })
              }
            })
        }
      });
    },

    getIssueTypes() {
      listIssueTypesUsingGET().then(response => {
        this.issueTypeList = response.data.data;
      });
    },

    getDicts() {
      listDictsSortedUsingGET().then(response => {
        this.dicts = response.data.data;
        this.severityDict = this.dicts["Issue.severity"];
        let sortDict = { Critical: 0, Major: 1, Minor: 2 };
        this.severityDict.sort((a, b) => {
          return sortDict[a.dictDesc] - sortDict[b.dictDesc];
        });
      });
    }
  },
  created() {
    this.getIssueTypes();
    this.getDicts();
  }
};
</script>

<style lang="scss" scoped>
// .el-dialog__wrapper{
//   z-index: 2002 !important;
// }
</style>
