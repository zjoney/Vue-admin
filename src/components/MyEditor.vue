<template>
<section>
  <el-dialog title="Insert files and images" :visible.sync="visible" append-to-body :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose" width="70%">
    <el-upload ref="upload" action="/api/v1/files/upload" :data="params" accept=".jpg, .png, .gif, .jpeg, .zip, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp4, .txt, .pdf" :on-progress="handleProgress"  :before-upload="handleBeforeUpload" :on-success="handleUploadSuccess" :show-file-list="false" :file-list="fileList">
      <el-button size="medium" type="primary" icon="el-icon-upload">Upload</el-button>
    </el-upload>
    <div v-if="uploading.file">Uploading {{uploading.file.name}} {{uploading.percent}}%. <i class="el-icon-close" @click="handleAbort"></i></div>
    <hr/>
    <el-table ref="table" :data="fileList" size="mini" highlight-current-row @current-change="handleTableChange">
      <el-table-column prop="name" label="File Name"></el-table-column>
      <el-table-column prop="finishDate" label="Upload Date" :formatter="formatDate" width="220"></el-table-column>
      <el-table-column prop="username" label="User" width="100"></el-table-column>
      <el-table-column label="Operation" width="100">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row, scope.$index)" type="plain" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p/>
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="total" layout="total, prev, pager, next">
    </el-pagination>
    <span slot="footer">
      <el-button @click="handleCancel">Cancel</el-button>
      <el-button type="primary" @click="handleInsert">Insert</el-button>
    </span>
  </el-dialog>
  <textarea id="ckeditor4" :value="value"></textarea>
</section>
</template>

<script>
import { deleteFileUsingDELETE, listUploadLogsUsingGET } from "@/api";
import dateFormat from "dateformat";
import mime from "mime";
import {getDownloadPrefix} from "@/utils"

export default {
  props: {
    value: {
      type: String, //绑定文章内容
      required: true
    },
    params: {
      type: Object, //{ accessType:0, attachedType:1, categoryId: this.$route.params.number }
      default: function() {
        return {};
      }
    },
    showHistory: {
      type: Boolean, //从列表中选择 true， 直接上传 false
      default: false
    },
    noUpload: {
      type: Boolean, //禁用上传功能
      default: false
    },
    allowSource: {
      type: Boolean, //允许查看和修改html代码
      default: false
    },
    types: {
      type: String,
      default: () => `classic`
    },
    config: {
      type: Object,
      default: () => {}
    },
    instanceReadyCallback: {
      type: Function
    }
  },
  data() {
    return {
      uploading:{
        file: null,
        percent: 0,
      },
      fileList: [],
      visible: false,
      selectedFile: null,
      destroyed: false,
      instanceValue: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      currentPage: 1,
    };
  },
  computed: {
    instance() {
      return CKEDITOR.instances["ckeditor4"];
    }
  },
  watch: {
    value(val) {
      try {
        if (this.instance) {
          this.update(val);
        }
      } catch (e) {}
    }
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    formatDate(row, column, cellValue) {
      if (cellValue != null) {
        return dateFormat(new Date(parseInt(cellValue)), "yyyy-mm-dd h:MM tt");
      } else {
        return "N/A";
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getHistory();
    },
    getHistory(){
      let req = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      if (this.params.categoryId) {
        Object.assign(req, {categoryId: this.params.categoryId})
      }
      if (this.params.issueId) {
        Object.assign(req, {issueId: this.params.issueId})
      }
      listUploadLogsUsingGET(req).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.fileList = data.list;
          this.total = data.total;
          this.currentPage = data.pageNum;
        }
      });
    },
    focus() {
      this.instance.focus()
    },
    updateValue(value) {
      this.$emit("input", value);
    },
    handleBeforeUpload(file){
      if(!/(.jpg|.png|.gif|.jpeg|.zip|.doc|.docx|.xls|.xlsx|.ppt|.pptx|.mp4|.txt|.pdf)$/.test(file.name)){
        this.$message({
          message: 'Not supported file type',
          type: 'error'
        })
        return false
      }
      if(file.size > 314572800){
        this.$message({
          message: 'File exceeds maximum size limit(300MB)',
          type: 'error'
        })
        return false
      }
      return true
    },
    handleProgress(event, file, fileList){
      this.uploading.file = file
      this.uploading.percent = parseInt(event.percent)
    },
    handleAbort(){
      this.$refs.upload.abort(this.uploading.file)
      this.uploading.file = null
    },
    handleClose(done){
      this.handleAbort()
      done()
    },
    handleUploadSuccess(response, file) {
      // this.fileUrl = URL.createObjectURL(file.raw)
      this.uploading.file = null
      file.path = response.data.path;
      file.finishDate = response.data.finishDate;
      file.username = response.data.username;
      this.fileList.push(file);

      this.selectedFile = {
        url: getDownloadPrefix() + response.data,
        type: mime.getType(file.name),
        name: file.name
      };
      this.$refs.table.setCurrentRow(file);
    },
    handleTableChange(val) {
      if (val) {
        this.selectedFile = {
          url: getDownloadPrefix() + val.path,
          type: mime.getType(val.name),
          name: val.name
        };
      } else {
        this.selectedFile = {};
      }
    },
    handleDelete(row, index) {
      deleteFileUsingDELETE({
        path: row.path
      })
        .then(response => {
          let { code, data, message } = response.data;
          if (code !== 0) {
            this.$message({
              message: message,
              type: "error"
            });
          } else {
            this.fileList.splice(index, 1);
          }
        })
        .catch(error => {
          this.$message({
            message: "Fail",
            type: "error"
          });
        });
    },
    handleCancel() {
      this.handleAbort()
      this.visible = false
    },
    handleInsert() {
      this.resolve(this.selectedFile);
      this.visible = false;
    },
    showDialog() {
      this.visible = true;
      if(!this.showHistory){
        this.fileList = []
      }
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise;
    },
    insertFile(file) {
      if (file.type.indexOf("image") != -1) {
        this.instance.insertHtml('<img src="' + file.url + '"/a>');
      } else if (file.type.indexOf("pdf") != -1) {
        setTimeout(()=>{
          this.onChange()
        },50)
	      this.instance.insertHtml('<br/><span class="ppn-pdf-link"  href="' + file.url + '">Download: &nbsp;<a target="_blank" style="display:inline-block"  href="' + file.url + '">' + file.name + '</a></span></br>');
        //this.instance.insertHtml('<br/>Download: &nbsp;<a target="_blank" href="' + file.url + '">' + file.name + '</a>');
        
        
        if(this.allowSource){
          // let embed = this.instance.document.createElement('embed');
          // embed.setAttribute('src', file.url)
          // embed.setAttribute('type', 'application/pdf')
          // this.instance.insertElement(embed)
          // 换pdfjs，由js加载
          
          // this.instance.insertHtml('<br/><div style="z-index:-1;position:relative;"><iframe id="iframe" onreadystatechange="this.style.height=document.documentElement.clientHeight+\'px\';this.style.width=(document.documentElement.clientWidth-530)+\'px\'"  class="test1" onload="this.style.height=document.documentElement.clientHeight+\'px\';this.style.width=(document.documentElement.clientWidth-530)+\'px\'"  src="' + file.url + '" ></iframe></div>');
           //this.instance.insertHtml('<br/><section class="pdf-container" file="' + file.url + '"></section><br/>&nbsp;');
        }
      } else {
        this.instance.insertHtml('<a target="_blank" href="' + file.url + '">' + file.name + '</a>');
      }
    },
    update(val) {
      if (this.instanceValue !== val) {
        this.instance.setData(val, {
          internal: false
        });
      }
    },
    destroy() {
      try {
        if (!this.destroyed) {
          this.instance.focusManager.blur(true);
          this.instance.removeAllListeners();
          this.instance.destroy();
          this.destroyed = true;
        }
      } catch (e) {}
    },
    onChange() {
      let html = this.instance.getData();
      if (html !== this.value) {
        this.$emit("input", html);
        this.instanceValue = html;
      }
    },
  },
  created(){
    
  },
  mounted() {
    if (this.showHistory) {
      this.getHistory()
    }

    let vue = this;
    if (typeof CKEDITOR === "undefined") {
      console.log("CKEDITOR is missing (http://ckeditor.com/)");
    } else {
      CKEDITOR.replace("ckeditor4", {
        removePlugins: [ this.noUpload?'uploader':'', !this.allowSource?'sourcearea':''],
        allowedContent: true
      });

      this.instance.setData(this.value);
      this.instance.on("instanceReady", () => {
        this.instance.setData(this.value);
      });
      this.instance.on("change", this.onChange);
      // this.instance.on("blur", this.onBlur);
      // this.instance.on("focus", this.onFocus);
      this.instance.on("showUploader", event => {
        this.showDialog().then(file => {
          this.insertFile(file);
        });
      });
      if (typeof this.instanceReadyCallback !== "undefined") {
        this.instance.on("instanceReady", this.instanceReadyCallback);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-message.el-message--error{
  z-index: 4000!important;
}
.el-dialog__wrapper {
  z-index: 2010 ;
}
.v-modal{
   z-index: 2000 ;
}
</style>
