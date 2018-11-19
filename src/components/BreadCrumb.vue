<template>
  <el-row>
    <el-col :span="24" class="breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          <router-link 
            v-if="item.props&&item.props.default&&item.props.default.name" 
            :to="{ path: item.props.default.beforeHref }">
            {{item.props.default.name}}
          </router-link>
          <router-link 
            v-else-if="item.props&&item.props.default&&item.props.default.beforeHref" 
            :to="{ path: item.props.default.beforeHref }">
            {{item.name}}
          </router-link>
          
          <span v-else>{{ item.name }}</span>
         
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in adds" :key="index">
          <router-link 
            v-if="item&&item.name" 
            :to="{ path: item.href }">
            {{item.name}}
          </router-link>
          <span v-else>{{ item }}</span>
          
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="right">
        <slot></slot>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: {
      adds: {
        type: Array,
        required: false
      }
    },
    data() {
      return {
      }
    },
    created(){
      // console.log(this.$route.matched);
      // console.log(this.adds,this.$route.params);
    }
  }
</script>

<style scoped lang="scss">
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
  
  
</style>