<template>
	<section>
	  <bread-crumb>
      <router-link to="/manage/rule/new">
        <el-button type="primary" size="medium">Add Rule</el-button>
      </router-link>
    </bread-crumb>
    <el-row class="toolbar">
      <el-col :span="24">
        <el-table :data="rules">
          <el-table-column prop="name" label="Name" sortable></el-table-column>
          <el-table-column label="Status">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabled" :active-value="activeValue" :inactive-value="inactiveValue" @change="handleStatusChange(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="Operation">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row.id)" type="text" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
	</section>
</template>

<script>
	import dateFormat from 'dateformat'
	import { listRolesUsingGET, updateUserRolesUsingPUT, updateUserUsingPUT, userListUsingGET, updateUserUsingPUT_1, getUserDetailsUsingGET } from "@/api"
	import { listTriggersUsingGET } from "@/api"

	export default {
		data() {
			return {
				filter: {
					type: 'All'
        },
        rules:[],
        activeValue: 1,
        inactiveValue: 0,
				users: [],
        currentPage: 1,
        pageNum:1,
        pagesize:20,
				total: 0,
        loading: false,
        dialogVisible: false,
        form: null,
        roleList: [],
        currentUserRoleIds: []
			}
    },
		methods: {
			formatDate: function (row, column, cellValue) {
				if(cellValue != null){
					return dateFormat(new Date(cellValue), "yyyy-mm-dd");
				}else {
					return "NA"
				}
      },

			getRules() {
				listTriggersUsingGET({type: 0}).then((response) => {
					let { code, data, message } = response.data;
					if (code !== 0) {
						this.$message({
						message: message,
						type: 'error'
						});
					}else {
						this.rules = data.list
            this.total = data.total
            this.currentPage = data.pageNum
					}
				})
      },
      
      handleEdit(id){
        this.form = {}
        this.getUserDetail(id)
        this.dialogVisible = true
      },
		},
		created(){
      this.getRules()
		}
	}

</script>

<style scoped>

</style>