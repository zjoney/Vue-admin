<template>
	<section >
    <el-row>
      <el-col :span="24">
        <el-checkbox-group v-model="dictIds">
          <el-table :data="infos" :span-method="objectSpanMethod" border>
            <el-table-column prop="group" label="Group" width="200"></el-table-column>
            <el-table-column prop="subgroup" label="Sub Group" width="200">
              <template slot-scope="scope">
                {{scope.row.subgroup || '/'}}
              </template>
            </el-table-column>
            <el-table-column prop="item" label="Feature">
              <template slot-scope="scope">
                <el-checkbox :checked="int2boolean[scope.row.checked]" :label="parseInt(scope.row.pkId)" :disabled="!isEditorUser">{{scope.row.item}}</el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </el-checkbox-group>
        <p/>
        <div style="text-align: center">
        <el-button type="primary" @click="onSubmit" v-if="isEditorUser">Save</el-button>
        </div>
      </el-col>
    </el-row>
	</section>
</template>

<script>
  import { updateExtendIsvInfoUsingPUT, listIsvExtendInfoUsingGET ,getIsvByCodeUsingGET } from "@/api"

  export default {
    data() {
      return {
        infos: [],
        dictIds: [],
        int2boolean:[false, true],
        isEditorUser:false,//没有编辑 isv列表的权限
      }
    },
    methods: {
      getExtendInfo(){
         let artpkId=JSON.parse(sessionStorage.getItem("artpkId"));
        listIsvExtendInfoUsingGET({id: artpkId.pkId}).then(response=>{
          let { code, data, message } = response.data
          this.infos = data
        })
      },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        //第1列
        if (columnIndex === 0) {
          let rowspan1 = 1
          if (rowIndex === 0 || (this.infos[rowIndex].group != this.infos[rowIndex-1].group)) {
            for(let item of this.infos.slice(rowIndex+1)){
              if(item.group == this.infos[rowIndex].group){
                rowspan1++
              }else{
                break
              }
            }
            return {
              rowspan: rowspan1,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 1
            };
          }
        }
        //第2列
        if (columnIndex === 1) {
          let rowspan2 = 1
          if (rowIndex === 0 || (this.infos[rowIndex].subgroup != this.infos[rowIndex-1].subgroup)) {
            for(let item of this.infos.slice(rowIndex+1)){
              if(item.subgroup == this.infos[rowIndex].subgroup){
                rowspan2++
              }else{
                break
              }
            }
            return {
              rowspan: rowspan2,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 1
            };
          }
        }
      },

      onSubmit(){
        let artpkId=JSON.parse(sessionStorage.getItem("artpkId"));
        // console.log(artpkId.pkId,302335761952423936)
        updateExtendIsvInfoUsingPUT({id: artpkId.pkId, isvDictIds: this.dictIds}).then(response=>{
          this.loading = false;
          let { code, data, message } = response.data
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
          }
        })
      }
    },
    created(){
      this.getExtendInfo();
      let user= JSON.parse(sessionStorage.getItem('user'));
    //没有编辑 isv列表的权限
    this.isEditorUser= user.authorities.filter(
      u => u.authority == "isv:Edit ISV Info:2"
    );
    if(this.isEditorUser.length){
      this.isEditorUser = true
    }else{
      this.isEditorUser = false
    } 
    }
  }
</script>

<style lang="scss" scoped>
  /deep/{
    .el-table--enable-row-hover .el-table__body tr:hover > td{
      background-color: inherit;
    }
    .el-table--enable-row-hover .el-table__body tr> td:last-child:hover{
      background-color: #f5f7fa;
    }
  }
  .el-checkbox__label{
    cursor: default;
  }
</style>