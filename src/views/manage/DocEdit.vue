<template>
<section>
  <bread-crumb :adds="[this.$route.query.name]">
  </bread-crumb>
  <el-container class="toolbar">
    <el-aside class="border-right" width="250px">
        &nbsp;&nbsp;
        <el-button type="primary" size="mini" @click.stop="addFolder()" :disabled="disableAdd">Folder</el-button>
        <el-button type="primary" size="mini" @click.stop="addPage()" :disabled="disableAdd">Page</el-button>
        <el-button type="plain" size="mini" @click.stop="onClickBlank()">Root</el-button>
        <p/>
        <el-tree 
        ref="tree" 
        :data="contents" 
        :props="props" 
        node-key="pkId" 
        highlight-current 
        default-expand-all 
        :expand-on-click-node="false" 
        @node-click="handleNodeClick"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
         @node-drop="handleDrop">
          <span class="custom-tree-node" slot-scope="{ node, data }" :style="nodeLabelLength(node)">
            <span>{{ node.label }}</span>
          <span>
              <i v-if="!data.ifCatalog && data.marked == 1" class="el-icon-star-on" @click="handleMark(data)"></i>
              <i v-if="!data.ifCatalog && data.marked == 0" class="el-icon-star-off" @click="handleMark(data)"></i>
            </span>
          </span>
        </el-tree>
    </el-aside>
    <el-main class="content" id="doc-container">
      <div v-if="contentsForm">
        <div v-if="isViewMode">
          <el-button type="" size="medium" @click="editContents">Edit Folder</el-button>
          <el-button type="" size="medium" @click="removeContents">Remove</el-button>
        </div>
        <el-form v-else ref="contentsForm" :rules="rules2" :model="contentsForm" label-position="left" label-width="0px">
          <el-form-item prop="name" >
            <el-input v-model="contentsForm.name" ></el-input>
          </el-form-item>
          <p/>
          <el-button size="medium" @click="cancelEditContents">Cancel</el-button>
          <el-button type="primary" size="medium" @click="updateContents">Confirm</el-button>
          <p/>
        </el-form>
      </div>

      <div v-if="pageForm">
        <div v-if="isViewMode">
          <el-button type="" size="medium" @click="editContents">Edit</el-button>
          <el-button type="" size="medium" @click="removePage">Remove</el-button>
          <el-button type="" size="medium" @click="showHistory">History</el-button>
          <h2>{{pageForm.name}}</h2>
          <hr>
          <div v-html="pageForm.content"></div>
        </div>
        <el-form v-else  ref="pageForm" :model="pageForm" :rules="rules2" label-position="left" label-width="0px">
          <el-form-item prop="name" >
            <el-input v-model="pageForm.name" ></el-input>
          </el-form-item>
          <p/>
          <el-form-item prop="content" :rules="[
              { required: true, message: 'Content is required', trigger: 'blur' }
            ]">
            <ckeditor v-model="pageForm.content" :params="{ accessType:0, attachedType:1, categoryId: documentId }" show-history allow-source></ckeditor>
          </el-form-item>
          <p/>
          <p/>
          <div style="text-align: center">
            <el-form-item prop="updateNote" :rules="[{ required: true, message: 'Change note is required', trigger: 'blur' }, {max: 255, message: 'The length must be less than 255 characters', trigger:'blur'}]">
              <el-input v-model="pageForm.updateNote " placeholder="What's changed"></el-input>
            </el-form-item>
            <el-checkbox v-model="pageForm.notify">Send Notification</el-checkbox>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="plain" @click="cancel">Cancel</el-button>
            <el-button type="primary" @click="savePage">Confirm</el-button>
          </div>
        </el-form>
      </div>

      <el-dialog title="History" :visible.sync="dialogVisible" width="60%" @close="handleClose">
        <el-table :data="gridData">
          <el-table-column property="createDate" :formatter="formatDate" label="Date" width="180"></el-table-column>
          <el-table-column property="createUserName" label="Author">
            <template slot-scope="scope">
              {{ paxRealName[scope.row.createUserId] }}
            </template>
          </el-table-column>
          <el-table-column property="note" label="Note"></el-table-column>
          <el-table-column property="notify" label="Notify" width="80">
            <template slot-scope="scope">
              {{ scope.row.notify == '1'? 'Yes': 'No'}}
            </template>
          </el-table-column>
        </el-table>
        <p/>
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="total" layout="total, prev, pager, next">
        </el-pagination>
      </el-dialog>
    </el-main>
  </el-container>
</section>
</template>

<script>
import dateFormat from "dateformat";
import {
  updateCatalogMarkedUsingPUT,
  getCatalogTreeUsingGET,
  deleteArticleUsingDELETE,
  getArticleUsingGET,
  saveArticleUsingPOST,
  updateArticleUsingPUT
} from "@/api";
import {
  getCatalogUsingGET,
  deleteCatalogUsingDELETE,
  saveCatalogUsingPOST,
  updateCatalogUsingPUT,
  listArticleRecordsUsingGET,
  updateCategoryOrderUsingPUT,
  updateOrderUsingPUT,
  userListUsingGET,
   paxUserIdRealNameUsingGET,
} from "@/api";
import { showPdf, drawPdf } from "@/utils";

export default {
  data() {
    var checkName = (rule, value, callback) => {
      var reg = /^([\d\w\u4e00-\u9fa5\S][\s\w\u4e00-\u9fa5\S]{0,254})$/;

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
      paxRealName: {},
      loading2: true,
      dialogVisible: false,
      gridData: [],
      props: {
        label: "name",
        children: "catalogs"
      },
      contents: [],
      pageForm: null,
      disableAdd: false,
      contentsForm: null,
      isViewMode: true,
      loading: false,
      documentId: this.$route.params.number,
      currentNodeId: 0,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      currentPage: 1,
      rules2: {
        name: [
          { validator: checkName, required: true, trigger: ["blur", "change"] },
          {
            max: 255,
            message: "Title must be less than 255 characters.",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // console.log(draggingNode, dropNode, dropType, ev);
      var categoryIds = [];
      var final;
      var arrs;
      var nodePickId = draggingNode.data.pkId;
      var dropParentId;
      var categoryId = draggingNode.data.categoryId;
      var ifCatalog = draggingNode.data.ifCatalog;
      if (dropType == "inner") {
        arrs = dropNode.data.catalogs;
        dropParentId = dropNode.data.pkId;
      } else if (dropType == "before") {
        dropParentId = dropNode.data.parentId;
        if (dropNode.parent.data.catalogs) {
          arrs = dropNode.parent.data.catalogs;
        } else {
          arrs = dropNode.parent.data;
        }
      } else {
        dropParentId = dropNode.data.parentId;
        if (dropNode.parent.data.catalogs) {
          arrs = dropNode.parent.data.catalogs;
        } else {
          arrs = dropNode.parent.data;
        }
      }
      draggingNode.data.parentId = dropParentId;
      for (let c of arrs) {
        categoryIds.push(c.pkId);
      }

      final = {
        catalogNodeIds: categoryIds,
        categoryId: categoryId,
        parentId: dropParentId,
        targetId: nodePickId,
        ifCatalog: ifCatalog
      };

      updateOrderUsingPUT({ req: final }).then(response => {
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
    allowDrop(draggingNode, dropNode, type, ev) {
      if (dropNode.data.ifCatalog == false) {
        return type != "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return true;
    },
    nodeLabelLength(node) {
      return "width:" + (200 - node.level * 18) + "px";
    },
    showHistory() {
      var iframe = document.getElementById("iframe");
      if (iframe) {
        iframe.style.display = "none";
      }
      this.getHistoryVersion();
      this.dialogVisible = true;
    },
    handleClose() {
      var iframe = document.getElementById("iframe");
      if (iframe) {
        iframe.style.display = "block";
      }
    },
    formatDate: function(row, column, cellValue) {
      if (cellValue != null) {
        return dateFormat(new Date(parseInt(cellValue)), "yyyy-mm-dd h:MM tt");
      } else {
        return "N/A";
      }
    },

    getHistoryVersion(id) {
      this.loading = true;
      listArticleRecordsUsingGET({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        articleId: this.pageForm.pkId
      }).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.gridData = data.list;
          this.total = data.total;
          this.currentPage = data.pageNum;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getHistoryVersion();
    },
    onClickBlank() {
      this.$refs.tree.setCurrentNode({
        pkId: null
      });
      this.pageForm = null;
      this.contentsForm = null;
      this.currentNodeId = 0;
      this.disableAdd = !this.allowTreeOps();
    },

    getContents() {
      this.loading = true;
      getCatalogTreeUsingGET({
        id: this.documentId
      }).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.contents = data;
          if (this.currentNodeId) {
            this.$nextTick(() => {
              this.$refs.tree.setCurrentNode({
                pkId: this.currentNodeId
              });
            });
          }
        }
      });
    },
   getPaxRealName() {
      this.loading = true;
      paxUserIdRealNameUsingGET().then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code != 0) {
          this.$message({
            message: "message",
            type: "error"
          });
        } else {
          this.paxRealName = data;
        }
      });
    },
    getPage(pageId) {
      getArticleUsingGET({
        id: pageId
      }).then(response => {
        this.loading = false;
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.pageForm = data;
          this.$nextTick(() => {
            showPdf();
          });
        }
      });
    },

    handleNodeClick(node) {
      this.isViewMode = true;
      this.disableAdd = !this.allowTreeOps();
      this.currentNodeId = node.pkId;

      if (node.ifCatalog) {
        this.pageForm = null;
        getCatalogUsingGET({
          id: node.pkId
        }).then(response => {
          let { code, data, message } = response.data;
          if (code !== 0) {
            this.$message({
              message: message,
              type: "error"
            });
          } else {
            this.contentsForm = data;
          }
        });
      } else {
        this.contentsForm = null;
        this.getPage(this.currentNodeId);
      }
    },

    allowTreeOps() {
      if (this.$refs.tree) {
        if (this.$refs.tree.getCurrentNode() == null) {
          return true;
        } else {
          if (this.$refs.tree.getCurrentNode().ifCatalog) {
            return true;
          }
        }
      }
      return false;
    },

    addFolder() {
      if (this.allowTreeOps()) {
        let orderNumber = 0;
        if (this.$refs.tree.getCurrentNode()) {
          let catalogs = this.$refs.tree.getCurrentNode().catalogs;
          if (catalogs.length > 0) {
            orderNumber = catalogs[catalogs.length - 1].orderNumber + 1;
          } else {
            orderNumber = 1;
          }
        } else {
          orderNumber = 1;
          // let catalogs = this.contents;
          // orderNumber = catalogs[catalogs.length - 1].orderNumber + 1;
        }
        //添加新节点
        this.inputBox("New Folder Name", name => {
          let param = {
            authorId: 0,
            categoryId: this.documentId,
            marked: 0,
            name: name,
            inputPattern: /^([\d\w\u4e00-\u9fa5\S][\s\w\u4e00-\u9fa5\S]{0,254})$/,
            orderNumber: orderNumber,
            parentId: this.currentNodeId,
            parentPath: ""
          };

          saveCatalogUsingPOST({
            catalog: param
          }).then(response => {
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
              this.getContents();
            }
          });
        });
      }
    },

    addPage() {
      if (this.allowTreeOps()) {
        let orderNumber = 0;
        if (this.$refs.tree.getCurrentNode()) {
          let catalogs = this.$refs.tree.getCurrentNode().catalogs;
          if (catalogs.length > 0) {
            orderNumber = catalogs[catalogs.length - 1].orderNumber + 1;
          } else {
            orderNumber = 1;
          }
        } else {
          orderNumber = 1;
          // let catalogs = this.contents;
          // orderNumber = catalogs[catalogs.length - 1].orderNumber + 1;
        }
        //添加新节点
        this.inputBox("New Page Name", name => {
          let param = {
            authorId: "",
            categoryId: this.documentId,
            content: "",
            name: name,
            orderNumber: orderNumber,
            parentId: this.currentNodeId,
            parentPath: "",
            remarks: "",
            summary: "",
            tags: ""
          };

          saveArticleUsingPOST({
            article: param
          }).then(response => {
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
              this.getContents();
            }
          });
        });
      }
    },

    cancel() {
      this.getPage(this.currentNodeId);
      this.isViewMode = true;
    },

    savePage() {
      this.$refs.pageForm.validate(valid => {
        if (valid) {
          let params = Object.assign({}, this.pageForm);
          params.notify = this.pageForm.notify ? 1 : 0;
          updateArticleUsingPUT({
            id: this.currentNodeId,
            article: params
          }).then(response => {
            this.loading = false;
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
              this.getPage(this.currentNodeId);
              this.isViewMode = true;
              this.getContents();
            }
          });
        }
      });
    },

    editContents() {
      this.isViewMode = false;
    },

    cancelEditContents() {
      this.isViewMode = true;
    },

    removeContents() {
      this.$confirm("Are you sure to remove?", "Confirm", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        deleteCatalogUsingDELETE({
          id: this.contentsForm.pkId
        }).then(response => {
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
            this.contentsForm = null;
            this.currentNodeId = 0;
            this.getContents();
          }
        });
      });
    },

    removePage() {
      var iframe = document.getElementById("iframe");
      if (iframe) {
        iframe.style.display = "none";
      }
      this.$confirm("Are you sure to remove?", "Confirm", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          deleteArticleUsingDELETE({
            id: this.pageForm.pkId
          }).then(response => {
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
              this.pageForm = null;
              this.currentNodeId = null;
              this.getContents();
              var iframe = document.getElementById("iframe");
              if (iframe) {
                iframe.style.display = "block";
              }
            }
          });
        })
        .catch(() => {
          var iframe = document.getElementById("iframe");
          if (iframe) {
            iframe.style.display = "block";
          }
        });
    },

    updateContents() {
      this.$refs.contentsForm.validate(valid => {
        if (valid) {
          updateCatalogUsingPUT({
            id: this.contentsForm.pkId,
            catalog: this.contentsForm
          }).then(response => {
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
              this.getContents();
              this.isViewMode = true;
            }
          });
        }
      });
    },

    inputBox(hint, callback) {
      this.$prompt(hint, "Info", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        inputPattern: /^([\d\w\u4e00-\u9fa5\S][\s\w\u4e00-\u9fa5\S]{0,254})$/,
        inputErrorMessage: "Invalid input"
      })
        .then(({ value }) => {
          callback(value);
        })
        .catch(() => {});
    },
    handleMark(data) {
      let mark = data.marked == 1 ? 0 : 1;
      let type = data.ifCatalog ? 1 : 2;
      updateCatalogMarkedUsingPUT({
        id: data.pkId,
        marked: mark,
        type: type
      }).then(response => {
        let { code, data2, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.$message({
            message: "Success",
            type: "success",
            duration: 1000
          });
          data.marked = mark;
        }
      });
    }
  },
  created() {
    this.getContents();
    this.getPaxRealName();
  },
  mounted() {},
  updated() {
    drawPdf();
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  padding-left: 0;
}

.custom-tree-node {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-tree-node > span :last-child {
  position: absolute;
  right: 10px;
  z-index: 99;
  padding-top: 4px;
}

</style>
