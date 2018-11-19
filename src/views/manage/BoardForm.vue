<template>
  <section>
    <el-row>
      <el-col :span="24">
        <el-form ref="form" size="medium" :model="value" :rules="rules2" label-width="120px">
          <el-form-item label="Name" prop="nameCn" >
            <el-input v-model="value.nameCn"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="note" >
            <el-input v-model="value.note"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import dateFormat from "dateformat";
import {
  listPermissionsUsingGET,
  savePermissionsUsingPOST,
  updateCategoryUsingPUT,
  saveCategoryUsingPOST
} from "@/api";

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    var checkName = (rule, value, callback) => {
      var reg = /^([\d\w\u4e00-\u9fa5\S][\s\w\u4e00-\u9fa5\S]{0,49})$/;

      if (!value) {
        return callback(new Error("Input can not be empty"));
      }
      if (value == "Other" || value == "Forum") {
        return callback(new Error("Already exist"));
      }
      if (!reg.test(value)) {
        return callback(new Error("Invalid value"));
      } else {
        callback();
      }
    };
    return {
      rules2: {
        nameCn: [
          { validator: checkName, required: true, trigger: ["blur", "change"] },
          {
            max: 50,
            message: "The length must be less than 50 characters.",
            trigger: ["blur", "change"]
          }
        ],
        note: [
          { trigger: ["blur", "change"] },
          {
            max: 255,
            message: "The length must be less than 255 characters.",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    saveCategory(resolve, reject) {
      this.$refs.form.validate(valid => {
        if (valid) {
          saveCategoryUsingPOST({ catalog: this.value }).then(response => {
            let { code, data, message } = response.data;
            if (code !== 0) {
              this.$message({
                message: message,
                type: "error"
              });
            } else {
              this.value.pkId = data;
              resolve();
            }
          });
        }
      });
    },

    updateCategory(resolve, reject) {
      this.$refs.form.validate(valid => {
        if (valid) {
          updateCategoryUsingPUT({
            id: this.value.pkId,
            catalog: this.value
          }).then(response => {
            let { code, data, message } = response.data;
            if (code !== 0) {
              this.$message({
                message: message,
                type: "error"
              });
            } else {
              resolve();
            }
          });
        }
      });
    },
    save() {
      if (this.value.pkId) {
        return new Promise(this.updateCategory);
      } else {
        return new Promise(this.saveCategory);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
