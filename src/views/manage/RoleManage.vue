<template>
  <section>
    <bread-crumb>
    </bread-crumb>
    <el-row class="toolbar">
      <el-col :span="24" >
        <el-dialog :visible.sync="dialogVisible" title="Edit Role" width="60%">
          <el-tree
            ref="tree"
            :data="permissions"
            :props="props"
            node-key="id"
            show-checkbox>
          </el-tree>
          <span slot="footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onSubmit">Confirm</el-button>
          </span>
        </el-dialog>

        <el-table :data="roles" v-loading="loading2">
          <el-table-column prop="name" label="Name" sortable></el-table-column>
          <el-table-column prop="description" label="Description"></el-table-column>
          <el-table-column label="Operation">
            <template slot-scope="scope">
              <el-button type="plain" @click="handleClick(scope.row.id)" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import dateFormat from 'dateformat';
  import { listRolesUsingGET, listAllPermissionsUsingGET, listRolePermissionsUsingGET, updateRolePermissionsUsingPUT } from "@/api"

  export default {
    data() {
      return {
        loading2:true,
        props:{
          label: 'name',
          children: 'permissions',
        },
        roles: [],
        permissions: [],
		  	currentPage: 1,
        pagesize:10,
        pageNum:1,
        total: 0,
        loading: false,
        dialogVisible: false,
        currentRoleId: 0
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
      getRoles() {
        this.loading = true;
        listRolesUsingGET().then((response) => {
          this.loading = false;
          let { code, data, message } = response.data;
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            });
          } else {
            this.roles = data;
            this.total = data.total;
            this.currentPage = data.pageNum;
            this.loading2=false;
          }
        })
      },

      getPermissions() {
        this.loading = true;
        listAllPermissionsUsingGET().then((response) => {
          this.loading = false;
          let { code, data, message } = response.data;
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            });
          } else {
            this.permissions = data
            this.total = data.total
            this.currentPage = data.pageNum
          }
        })
      },

      getRolePermissions(id){
        listRolePermissionsUsingGET({roleId: id}).then(response => {
          this.loading = false;
          let { code, data, message } = response.data;
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            });
          } else {
            this.$refs.tree.setCheckedKeys(data)
            this.total = data.total
            this.currentPage = data.pageNum
          }
        })
      },

      handleClick(id){
        this.checkedKeys = id
        this.getRolePermissions(id)
        this.dialogVisible = true
      },

      onSubmit(){
        let keys = this.$refs.tree.getCheckedKeys()
        this.loading = true;
        updateRolePermissionsUsingPUT({roleId: this.checkedKeys, permissionIds: keys}).then(response => {
          this.loading = false;
          let { code, data, message } = response.data;
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            });
          } else {
            this.dialogVisible = false
            this.$message({
              message: 'Success',
              type: 'success'
            });
          }
        })
      },
    },
    created(){
      this.getRoles()
      this.getPermissions()
    }
  }

</script>

<style lang="scss" scoped>

</style>
