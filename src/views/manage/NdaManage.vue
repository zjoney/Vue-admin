<template>
	<section >
    <bread-crumb>
    </bread-crumb>
    <el-row class="toolbar" v-loading="loading2">
      <el-col :span="24">
        <el-form ref="form" label-position="left" label-width="120px" label-suffix=":" >
            <div>
                <ckeditor v-if="content != null" v-model="content" no-upload></ckeditor>
              <!-- <div style="text-align: center"> -->
                <!-- <el-input placeholder="What's changed" style="display: inline-block; width: 350px"></el-input>
                &nbsp;&nbsp;<el-checkbox>Email notify</el-checkbox>
                &nbsp;&nbsp;&nbsp;&nbsp; -->
                <div style="text-align: center">
              <el-form-item>
                 <el-button type="primary" @click="savePage" >Confirm</el-button>
              </el-form-item>
              </div>
          </div>
        </el-form>
      </el-col>
    </el-row>
	</section>
</template>

<script>
import { getLastIsvNdaUsingGET, updateIsvNdaUsingPUT } from "@/api";

export default {
  data() {
    return {
      loading2: true,
      content: null
    };
  },
  methods: {
    getNda() {
      getLastIsvNdaUsingGET().then(response => {
        this.loading2 = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.content = data;
        }
      });
    },

    savePage() {
            updateIsvNdaUsingPUT({ req: { content: this.content } }).then(
              response => {
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
              }
            ).catch((error) => {
              if(error.code == '10003'){
                this.$message({
                  type: "error",
                  message: 'NDA can not be empty.',
                  duration: 1000
                })
              }
            })
    }
  },
  created() {
    this.getNda();
  }
};
</script>

<style lang="scss" scoped>
</style>