<template>
	<section>
    <div class="banner">
        <div class="title">FAQ</div>
        Frequently asked questions and answers
    </div>
    <div>
      <el-row>
        <el-col :span="24" class="breadcrumb-container">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :key="0">
              <router-link 
                :to="{ path: '/' }">
                Home
              </router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item :key="1">
              <span @click="onBackFaq" class="link-span">
                FAQ
              </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item :key="2">
              <span @click="onBack" :class="this.$route.query.inner&&'link-span'"
                >
                {{this.$route.query.name}}
              </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item :key="3" v-if="this.$route.query.inner">
              <span 
                >
                {{this.$route.query.inner}}
              </span>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div class="right">
            <slot></slot>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-container class="toolbar">
      
      <el-aside class="contents">
        <el-tree
          ref="tree"
          :data="contents"
          :props="props"
          node-key="pkId"
          highlight-current
          default-expand-all
          @node-click="handleNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              {{data.pageCount}}
            </span>
          </span>
        </el-tree>
      </el-aside>
      <el-main>
        <div v-if="currentPage">
          <h2 class="currentPointer">{{currentPage.name}}</h2>
          <hr>
          <p v-html="currentPage.content"></p>
        </div>
        <p v-else v-for="(item, index) in pages" :key="item.pkId">
          <span @click="showPage(item.pkId,item.name)" class="faqTitle">{{index+1}}. {{item.name}}</span>
        </p>
      </el-main>
    </el-container>
	</section>
</template>

<script>
  import { listCategoriesUsingGET, updateArticleUsingPUT, getCatalogTreeUsingGET, getArticleUsingGET, saveArticleUsingPOST } from "@/api"

  export default {
    data() {
      return {
        props:{
          label: 'name',
          children: 'catalogs',
        },
        documentId: '',
        contents: [],
        catalogs: [],
        pages: [],
        currentPage: null,
        currentPkid:null,
        firstFaq:{}
      }
    },
    methods: {
      getCategories() {
        listCategoriesUsingGET().then((response) => {
          let { code, data, message } = response.data
          if (code == 0){
            this.categoryList = data
            this.categoryList.map((board, index)=>{
              if(board.nameCn == 'Other'){
                board.categories.forEach(doc => {
                  if(doc.nameCn == 'FAQ'){
                    this.documentId = doc.pkId
                    this.getContents()
                  }
                })
              }
            })
          }
        })
      },
      getContents(){
        this.loading = true;
        getCatalogTreeUsingGET({id: this.documentId}).then((response) => {
          this.loading = false;
          let { code, data, message } = response.data;
          if (code == 0){
            this.catalogs = data
            //只保留第一级目录
            for(let x of data){
              if(x.ifCatalog){
                let y = Object.assign({}, x)
                y.catalogs = []
                y.pageCount = x.catalogs.filter(item=>item.ifCatalog == false).length
                this.contents.push(y)
              }
            }
            this.$nextTick(() => {
              if(this.contents[0]){
                this.$refs.tree.setCurrentNode({pkId: this.contents[0].pkId})
                this.loadPages(this.contents[0].pkId);
                this.currentPkid=this.contents[0].pkId;
                this.firstFaq={name:this.contents[0].name,id:this.contents[0].pkId};
                var location={
                  path: "/faq" ,query:{name:this.contents[0].name,id:this.contents[0].pkId}
                }
                this.$router.replace(location)
              }
            })
          }
        })
      },
      showPage(pageId,name){
        var location={
          path: "/faq" ,query:{name:this.contents[0].name,id:this.contents[0].pkId,inner:name}
        }
        this.$router.replace(location)
        getArticleUsingGET({id: pageId}).then((response) => {
          this.loading = false;
          let { code, data, message } = response.data;
          if (code == 0) {
            this.currentPage = data
          }
        })
      },
      handleNodeClick(node){
        var location={
          path: "/faq" ,query:{name:node.name,id:node.pkId}
        }
        this.$router.replace(location)
        this.currentPkid=node.pkId;
        this.loadPages(node.pkId)
      },
      loadPages(id){
        let item = this.catalogs.find(item=>item.pkId == id)
        this.pages = item.catalogs.filter(item=>item.ifCatalog == false)
        this.currentPage = null
      },
      onBack(){
        if(!this.$route.query.inner){
          return false;
        }
        var location={
          path: "/faq" ,query:{name:this.$route.query.name,id:this.$route.query.pkId}
        }
        this.$router.replace(location)
        this.loadPages(this.currentPkid)
      },
      onBackFaq(){
        var location={ path: '/faq',query:{name:this.firstFaq.name,id:this.firstFaq.id} };
        this.$router.replace(location)   ;
        this.currentPkid=this.firstFaq.id;;
        this.loadPages(this.firstFaq.id)  ;      
        this.$refs.tree.setCurrentNode({pkId: this.firstFaq.id})
      }
    },
    created(){
      this.getCategories()
    },
    updated(){
      console.log(this.$route);
      if(!this.$route.query.name&&this.$route.path.indexOf('faq')!=-1){
        this.onBackFaq();
      }
    }
  }
</script>

<style lang="scss" scoped>

  .el-main{
    padding: 0 0 0 20px;
  }
  
  .contents {
    border-right: solid 1px #e6e6e6;
  }
  
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .faqTitle {
    font-size: 16px;
    line-height: 40px;
    cursor: pointer;
  }
  .breadcrumb-container{
    height: 50px;
    margin: 0;

    .breadcrumb{
      float: left; 
      padding: 15px 50px;
    }
    
    .right{
      float: right;
      line-height: 50px;
      margin: 0 5%;
    }
  }
  .link-span{
    font-weight: bold;
    color:#303133;
    cursor: pointer;
  }
</style>