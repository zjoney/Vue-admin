<template>
	<section>
	  <bread-crumb>
    </bread-crumb>
    <el-row class="toolbar">
      <el-col :span="24">

      </el-col>
    </el-row>
	</section>
</template>

<script>
	import dateFormat from 'dateformat';
	import { listTriggersUsingGET, updateUserRolesUsingPUT, updateUserUsingPUT, userListUsingGET, updateUserUsingPUT_1, getUserDetailsUsingGET } from "@/api"

	export default {
		data() {
			return {
        rules:[],
        currentPage: 1,
        pageNum:1,
        pagesize:20,
				total: 0,
			}
    },
		methods: {
			
		},
		created(){
      this.getRules()
		}
	}
</script>

<style lang="scss" scoped>

</style>
