<template>
  <section>
    <el-dialog title="Insert files and images" :visible.sync="visible"  append-to-body width="60%">
      <el-upload
        action="/api/v1/files/upload"
        :data="params"
        :on-success="handleUploadSuccess"
        :show-file-list="false"
        :file-list="fileList">
        <el-button size="medium" type="primary" icon="el-icon-upload">Upload</el-button>
      </el-upload>
      <hr/>
      <el-table ref="table" :data="fileList" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column prop="name" label="File Name"></el-table-column>
        <el-table-column prop="finishDate" label="Upload Date" :formatter="formatDate" width="180"></el-table-column>
        <el-table-column prop="username" label="User" width="100"></el-table-column>
        <el-table-column label="Operation" width="100">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row, scope.$index)" type="plain" size="small">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="confirm">Insert</el-button>
      </span>
    </el-dialog>
      
    <textarea id="editor" :value="value"
      v-on:input="updateValue($event.target.value)" >
    </textarea>
  </section>
</template>

<script>
import { deleteFileUsingDELETE, listUploadLogsUsingGET } from "@/api";
import mime from "mime";
import dateFormat from "dateformat";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import imageIcon from "@ckeditor/ckeditor5-core/theme/icons/image.svg";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import AutoformatPlugin from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockquotePlugin from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import EasyimagePlugin from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import HeadingPlugin from "@ckeditor/ckeditor5-heading/src/heading";
import ImagePlugin from "@ckeditor/ckeditor5-image/src/image";
import ImagecaptionPlugin from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImagestylePlugin from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImagetoolbarPlugin from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ListPlugin from "@ckeditor/ckeditor5-list/src/list";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";

export default {
  name: "ckeditor",
  data() {
    return {
      fileList: [],
      fileHistory: [],
      instance: null,
      promise: null,
      resolve: null,
      reject: null,
      visible: false,
      selectedFile: null
    };
  },
  props: {
    value: {
      type: String, //绑定文章内容
      required: true
    },
    params: {
      type: Object, //{ accessType:0, attachedType:1, categoryId: this.$route.params.number }
      default: function() {
  			return {}
			}
    },
    showHistory: {
      type: Boolean, //从列表中选择 true， 直接上传 false
      default: false
    },
    noUpload: {
      type: Boolean, //禁用上传功能
      default: false
    }
  },
  watch: {
    value() {
      let html = this.instance.getData();

      if (html != this.value) {
        this.instance.setData(this.value);
      }
    }
  },
  mounted() {
    let vue = this;

    class InsertImage extends Plugin {
      init() {
        const editor = this.editor;

        editor.ui.componentFactory.add("insertImage", locale => {
          const view = new ButtonView(locale);

          view.set({
            label: "Insert files and images",
            icon: imageIcon,
            tooltip: true
          });

          view.on("execute", () => {
            vue.showDialog().then(
              file => {
                editor.model.change(writer => {
                  if (file.type.indexOf("image") != -1) {
                    const imageElement = writer.createElement("image", {
                      src: file.url
                    });
                    editor.model.insertContent(
                      imageElement,
                      editor.model.document.selection
                    );
                  } else {
                    const linkedText = writer.createText(file.name, {
                      linkHref: file.url
                    });
                    editor.model.insertContent(
                      linkedText,
                      editor.model.document.selection
                    );
                  }
                });
              },
              function(value) {
                // console.log("Canceled");
                this.selectedFile = {};
              }
            );
          });
          return view;
        });
      }
    }
    
    let options = {
      plugins: [
        EssentialsPlugin,
        AutoformatPlugin,
        BoldPlugin,
        ItalicPlugin,
        BlockquotePlugin,
        EasyimagePlugin,
        HeadingPlugin,
        ImagePlugin,
        ImagecaptionPlugin,
        ImagestylePlugin,
        ImagetoolbarPlugin,
        LinkPlugin,
        ListPlugin,
        ParagraphPlugin,
      ],
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "blockQuote",
        "undo",
        "redo",
      ],
      image: {
        toolbar: [
          "imageStyle:full",
          "imageStyle:side",
          "|",
          "imageTextAlternative"
        ]
      },
      language: "en"
    }

    if(!this.noUpload){
      options.plugins.push(InsertImage)
      options.toolbar.push("insertImage")
    }

    ClassicEditor.create(document.querySelector("#editor"), options)
      .then(editor => {
        this.instance = editor;
        editor.model.document.on("change", (evt, data) => {
          this.updateValue(editor.getData());
        });
      })
      .catch(error => {
        console.error(error);
      });

    if (this.showHistory) {
      let params = {
        pageSize: 0
      }
      if(this.params.categoryId){
        params['categoryId'] = this.params.categoryId
      }
      if(this.params.issueId){
        params['issueId'] = this.params.issueId
      }
      listUploadLogsUsingGET(params).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.fileHistory = data.list;
        }
      })
    }
  },
  methods: {
    formatDate(row, column, cellValue) {
      if (cellValue != null) {
        return dateFormat(new Date(parseInt(cellValue)), "yyyy-mm-dd HH:MM");
      } else {
        return "N/A";
      }
    },
    focus(){
      this.instance.editing.view.focus()
    },
    updateValue(value) {
      this.$emit("input", value);
    },
    handleUploadSuccess(response, file) {
      // this.fileUrl = URL.createObjectURL(file.raw)
      file.path = response.data.path;
      file.finishDate = response.data.finishDate
      file.username = response.data.username
      this.fileList.push(file);

      this.selectedFile = {
        url: "/api/v1/files/download?isDownload=false&path=" + response.data,
        type: mime.getType(file.name),
        name: file.name
      };
      this.$refs.table.setCurrentRow(file);
    },
    handleCurrentChange(val) {
      if(val){
        this.selectedFile = {
          url: "/api/v1/files/download?isDownload=false&path=" + val.path,
          type: mime.getType(val.name),
          name: val.name
        }
      }else{
        this.selectedFile = {}
      }
    },
    handleDelete(row, index) {
      deleteFileUsingDELETE({ path: row.path })
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
    showDialog() {
      if(this.showHistory){
        this.fileList = this.fileHistory
      }else{
        this.fileList = []
      }
      this.visible = true;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise;
    },
    confirm() {
      this.resolve(this.selectedFile);
      this.visible = false;
    },
    cancel() {
      // this.reject();
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
  .ck.ck-editor__main>.ck-editor__editable {
    min-height: 400px;
  }
</style>
