<template>
  <section>
    <bread-crumb>
      <el-button type="primary" size="medium" @click="append({pkId: 0})">Add Ticket Type</el-button>
    </bread-crumb>
    <el-row class="toolbar" v-loading="loading2">
      <el-col :span="24" >
        <el-tree
          ref="tree"
          :data="treedata"
          :props="props"
          node-key="pkId"
          default-expand-all
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button v-if="node.level == 1" size="small" @click="append(data)">Add</el-button>
              <el-button size="small" @click="rename(data)">Rename</el-button>
              <el-button size="small" @click="remove(node, data)">Remove</el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { listIssueTypesUsingGET, saveIssueTypeUsingPOST, updateIssueTypeUsingPUT, deleteIssueTypeUsingDELETE } from "@/api";

export default {
  data() {
    return {
      loading2:true,
      props:{
        label: 'name',
        children: 'subTypes',
      },
      treedata: [],
    };
  },
  methods: {
    getIssueTypes(){
      listIssueTypesUsingGET().then((response) => {
        this.loading = false;
        this.loading2=false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: 'error'
          });
        } else {
          this.treedata = data
        }
      })
    },
    append(data) {
      this.inputBox('New Ticket Type Name', (name=>{
        saveIssueTypeUsingPOST({param: {name: name, parentId: data.pkId, id:0 } }).then(response => {
          let { code, data, message } = response.data;
          if (code !== 0) {
              this.$message({
                message: message,
                type: 'error'
              });
          } else {
            this.$message({
              message: 'Success',
              type: 'success'
            })
            this.getIssueTypes()
          }
        })
      }))
    },
    rename(data){
      this.inputBox('New Ticket Type Name', (name=>{
        updateIssueTypeUsingPUT({id: data.pkId, param: {name: name, parentId: data.parentId} }).then(response => {
          let { code, data, message } = response.data;
          if (code !== 0) {
              this.$message({
                message: message,
                type: 'error'
              });
          } else {
            this.$message({
              message: 'Success',
              type: 'success'
            })
            this.getIssueTypes()
          }
        })
      }))
    },
    remove(node, data) {
      this.$confirm('Are you sure to remove?', 'Confirm', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteIssueTypeUsingDELETE({id: data.pkId}).then(response => {
          let { code, data, message } = response.data;
          if (code !== 0) {
              this.$message({
                message: message,
                type: 'error'
              });
          } else {
            this.$message({
              message: 'Success',
              type: 'success'
            })
            this.getIssueTypes()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Canceled'
        })       
      })
    },
    inputBox(hint, callback){
      this.$prompt(hint, 'Info', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        // inputPattern: /^\S{1,50}$/, 
        inputPattern:/^([\d\w\u4e00-\u9fa5\S][\s\w\u4e00-\u9fa5\S]{0,49})$/,
        inputErrorMessage: 'Invalid input'
      }).then(({ value }) => {
        callback(value)
      }).catch(() => {
      })
    }
  },
  created(){
    this.getIssueTypes()
  }
};
</script>

<style lang="scss" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
