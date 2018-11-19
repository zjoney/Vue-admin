<template>
	<section>
    <bread-crumb>
      <el-button type="primary" size="medium" @click="addBoard">Add Section</el-button>
    </bread-crumb>
    <el-row class="toolbar" v-loading="loading2">
      <el-col :span="24" >
        <el-tree
       
          :data="categories"
          :props="props"
          default-expand-all
          :expand-on-click-node="false"
          node-key="id"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          @node-drop="handleDrop">
         
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="plain" size="small" @click="addDoc(node, data)" v-if="node.level == 1" :disabled="data.nameCn == 'Other'">
                New
              </el-button>
              <el-button type="plain" size="small" @click="editBoard(node, data)" v-if="node.level == 1" :disabled="data.nameCn == 'Other' || data.nameCn == 'Forum'">
                Edit
              </el-button>
              <el-button type="plain" size="small" @click="editDoc(node, data)" v-else>
                Edit
              </el-button>
              <el-button type="plain" size="small" @click="remove(node, data)" :disabled="(node.level == 1&&node.data.nameCn == 'Other'||node.parent.data.nameCn=='Other')||(node.level == 1&&node.data.nameCn == 'Forum')">
                Remove
              </el-button> 
               
             <!-- <el-button type="plain" size="small" @click="remove(node, data)" v-else-if=" node.leve !=1 &&data.nameCn !='Other'" :disabled="data.nameCn != 'FAQ'">
                Remove
              </el-button>
              <el-button type="plain" size="small" @click="remove(node, data)" v-else>Remove</el-button> -->
               <!-- <el-button type="plain" size="small" @click="remove(node, data)" v-else-if="node.level==1&&data.nameCn == 'Other'" :disabled="data.nameCn == 'FAQ' ">
                Remove
              </el-button>  -->
            </span>
          </span>
        </el-tree>

        <el-dialog
          title="Section Setting"
          :visible.sync="boardFormVisible"
          width="60%">
          <board-form ref="boardform" v-model="boardForm"></board-form>
          <span slot="footer">
            <el-button @click="boardFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onSubmitBoardForm">Confirm</el-button>
          </span>
        </el-dialog>
        
        <el-dialog
          title="Document Setting"
          ref="docdialog"
          :visible.sync="docFormVisible"
          @open="onDocOpen"
          @close="onDocClose"
          width="60%">
          <doc-form ref="docform" v-model="docForm"></doc-form>
          <span slot="footer">
            <el-button @click="docFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onSubmitDoc">Confirm</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
	</section>
</template>

<script>
import {
  listCategoriesUsingGET,
  saveCategoryUsingPOST,
  getCategoryUsingGET,
  updateCategoryUsingPUT,
  deleteCategoryUsingDELETE,
  updateCategoryOrderUsingPUT
} from "@/api";
import { savePermissionsUsingPOST } from "@/api";

export default {
  data() {
    var checkName = (rule, value, callback) => {
      var reg = /^([\d\w\u4e00-\u9fa5\-_])([\s\w\u4e00-\u9fa5\-_]*)([\w\u4e00-\u9fa5\-_]?)$/;

      if (!value) {
        return callback(new Error("Input can not be empty"));
      }
      if (!reg.test(value)) {
        return callback(new Error("Invalid value"));
      } else {
        callback();
      }
    };
    return {
      loading2: true,
      props: {
        label: "nameCn",
        children: "categories"
      },
      boardFormVisible: false,
      docFormVisible: false,
      boardForm: {},
      docForm: {},
      categories: [],
      boardOperation: "",
      docOperation: "",
      update: {}
    };
  },
  components: {
    BoardForm: () => import("./BoardForm"),
    DocForm: () => import("./DocForm")
  },
  methods: {
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // console.log(draggingNode, dropNode, dropType, ev)
      var list = {};
      var categoryIds = [];
      var final;
      var nodePickId = draggingNode.data.pkId;
      var nodeParentId = draggingNode.data.parentId;
      for (let c of this.categories) {
        list[c.pkId] = c;
        categoryIds.push(c.pkId);
      }

      if (nodeParentId == 0) {
        final = {
          categoryIds: categoryIds,
          parentId: nodeParentId
        };
      } else {
        var childrenarr = [];
        var childdatatas = list[nodeParentId].categories;
        for (let c of childdatatas) {
          childrenarr.push(c.pkId);
        }
        final = {
          categoryIds: childrenarr,
          parentId: nodeParentId
        };
      }

      updateCategoryOrderUsingPUT({ req: final }).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.$message({
            message: message,
            type: "success"
          });
        }
      });
    },
    allowDrop(draggingNode, dropNode, type) {
      if (type != "inner") {
        return draggingNode.data.parentId === dropNode.data.parentId;
      }
    },
    allowDrag(draggingNode) {
      return true;
    },
    getCategories() {
      listCategoriesUsingGET().then(response => {
        this.loading2 = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          // console.log(data);
          this.categories = data;
        }
      });
    },

    addBoard() {
      this.boardForm = {
        layoutType: 0,
        nameCn: "",
        note: "",
        orderNumber: 0,
        parentId: 0
      };
      this.boardOperation = "save";
      this.boardFormVisible = true;
    },

    onDocOpen() {
      this.$nextTick(() => {
        this.$refs.docform.init();
      });
    },

    onDocClose() {
      //
    },

    addDoc(node, data) {
      this.docForm = {
        layoutType: 0,
        forumMode: data.nameCn == "Forum" ? 1 : 0,
        nameCn: "",
        note: "",
        orderNumber: 0,
        accessType:"1",
        parentId: data.pkId
      };
      this.docFormVisible = true;
    },

    editBoard(node, data) {
      getCategoryUsingGET({ id: data.pkId }).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.boardForm = data;
          this.boardFormVisible = true;
        }
      });
    },

    editDoc(node, data) {
      getCategoryUsingGET({ id: data.pkId }).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.docForm = data;
          this.docFormVisible = true;
        }
      });
    },

    onSubmitBoardForm() {
      this.$refs.boardform.save().then(() => {
        this.getCategories();
        this.boardFormVisible = false;
      });
    },

    onSubmitDoc() {
      this.$refs.docform.save().then(() => {
        this.getCategories();
        this.docFormVisible = false;
      });
    },

    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      // console.log(node,data)
      this.$confirm("Are you sure to remove?", "Confirm", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          deleteCategoryUsingDELETE({ id: data.pkId }).then(response => {
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
              this.getCategories();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Canceled"
          });
        });
    },

    inputBox(hint, callback) {
      this.$prompt(hint, "Info", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel"
        // inputPattern:/^[A-Za-z]{1,10}$/,
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: 'The length must be less than 255'
      })
        .then(({ value }) => {
          callback(value);
        })
        .catch(() => {});
    }
  },
  created() {
    this.getCategories();
  }
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>