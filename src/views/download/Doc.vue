<template>
	<section>
    <bread-crumb :adds="[this.$route.query.name]" >
    </bread-crumb>
    <el-container class="toolbar" >
      <el-aside class="border-right" width="250px">
        <div style="height:100%" @click="onClickBlank">
        <el-tree
          ref="tree"
          :data="contents"
          :props="props"
          node-key="pkId"
          highlight-current
          default-expand-all
          auto-expand-parent
          expand-on-click-node
          @node-click="handleNodeClick">
        </el-tree>
        </div>
      </el-aside>
      
      <el-main class="content" id="doc-container"  v-loading="loading2">
        <div v-if="pageForm">
          <h2>{{pageForm.name}}</h2>
          <hr>
          <p v-html="pageForm.content"></p>
        </div>
      </el-main>
    </el-container>
	</section>
</template>

<script>
  import { getCatalogUsingGET, getCatalogTreeUsingGET, getArticleUsingGET } from "@/api"
  import { showPdf,drawPdf } from "@/utils"

  export default {
    data() {
      return {
        loading2:true,
        props:{
          label: 'name',
          children: 'catalogs',
        },
        contents: [],
        pageForm: null,
        contentsForm: null,
        loading: false,
        currentPageId: ''
      }
    },
    methods: {
      onClickBlank(){
        this.$refs.tree.setCurrentNode({pkId: null})
      },

      findFirstArticle(list) {
        if (list instanceof Array) {
          for (let item of list) {
            if (item.ifCatalog == false) {
              return item;
            } else {
              let result = this.findFirstArticle(item.catalogs);
              if (result) {
                return result;
              }
            }
          }
        }
      },

      getContents(){
        this.loading = true;
         
        getCatalogTreeUsingGET({id: this.$route.params.number}).then((response) => {
          this.loading = false;
             this.loading2=false;
          let { code, data, message } = response.data;
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            })
          } else {
            this.contents = data
            //设置选中第一篇文章，读到pageForm里
            if(this.$router.history.current.query && this.$router.history.current.query.id ){
              this.currentPageId = this.$router.history.current.query.id
            }else{
              let firstPage = this.findFirstArticle(data)
              if(!firstPage){
                return
              }
              this.currentPageId = firstPage.pkId
            }
            this.$nextTick(()=>{
              this.$refs.tree.setCurrentNode({pkId: this.currentPageId})
            })
            this.getPage(this.currentPageId)
          }
        })
      },

      getPage(pageId){
        this.loading = true;
        getArticleUsingGET({id: pageId}).then((response) => {
          this.loading = false;
          this.loading2=false;
          let { code, data, message } = response.data;
          if (code !== 0) {
            this.$message({
              message: message,
              type: 'error'
            })
          } else {
            this.pageForm = data
            // window.history.pushState(null, null, this.currentPageId)
            let nowLocation=this.$router.history.current;
            console.log(this.$router,'/docs/' + nowLocation.path);
            this.$router.replace({
              path: nowLocation.path ,query:{name:nowLocation.query.name,id:this.currentPageId}
            }) 
            this.$nextTick(()=>{
              showPdf()
            })
          }
        })
      },

      handleNodeClick(node){
        if(node.ifCatalog){
          this.pageForm = null
          getCatalogUsingGET({ id: node.pkId }).then((response) => {
            let { code, data, message } = response.data;
            if (code !== 0) {
              this.$message({
                message: message,
                type: 'error'
              })
            } else {
              this.contentsForm = data
            }
          })
        }else{
          this.contentsForm = null
          this.currentPageId = node.pkId
          this.getPage(this.currentPageId)
        }
      },
    },
    created() {
      this.getContents()
    },
    updated() {
      drawPdf()
    }
  }
</script>

<style lang="scss" scoped>

</style>