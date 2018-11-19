<template>
  <section>
    <div class="banner">
        <div class="title">Independent Software Vendor (ISV) Agreement</div>
        
    </div>
	<el-row class="toolbar" v-loading="loading2">
    <el-col :span="24">
      <div v-html="content"></div>
    </el-col>
	</el-row>
  </section>
</template>


<script>
import { getLastIsvNdaUsingGET } from "@/api";

export default {
  data() {
    return {
      loading2: true,
      content: ""
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
    }
  },
  created() {
    this.getNda();
  }
};
</script>

<style lang="scss" scoped>
</style>
