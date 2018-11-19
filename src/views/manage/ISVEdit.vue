<template>
  <section>
		<bread-crumb :adds="[this.clientId]">
		</bread-crumb>
		<el-row class="toolbar">
			<el-col :span="24" >
				<el-tabs v-model="activeTab">
					<el-tab-pane label="Profile" name="profile">
            <profile v-if="activeTab=='profile'"></profile>
					</el-tab-pane>
					<el-tab-pane label="Users" name="users">
						<users v-if="activeTab=='users'"></users>
					</el-tab-pane>
					<el-tab-pane label="Requirements" name="solution">
						<solution v-if="activeTab=='solution'"></solution>
					</el-tab-pane>
					<el-tab-pane label="Permission" name="module">
						<module v-if="activeTab=='module'"></module>
					</el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>
  </section>
</template>

<script>
import { listIsvUsingGET, updateIsvUsingPUT } from "@/api";

export default {
  data() {
    return {
      clientId: this.$route.params.number,
      activeTab: "profile"
    };
  },
  components: {
    profile: () => import("./ISVProfile"),
    users: () => import("./ISVUsers"),
    solution: () => import("./ISVSolution"),
    module: () => import("./ISVModule")
  },
  methods: {
    getIsvs() {
      listIsvUsingGET().then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.isvs = data.list;
          this.total = data.total;
          this.currentPage = data.pageNum;
        }
      });
    }
	},
	created() {
    this.getIsvs()
  },
};
</script>

<style scoped>
</style>