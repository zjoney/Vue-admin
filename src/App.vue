<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getMineUserUsingGET } from "@/api";

export default {
  name: "App",
  data() {
    return {
      outFlag: window.Out
    };
  },
 
  methods: {
    getBrowserInfo() {
      var Sys = {};
      var ua = navigator.userAgent.toLowerCase();
      var s;
      (s = ua.match(/msie ([\d.]+)/))
        ? (Sys.ie = s[1])
        : (s = ua.match(/rv([\d.]+)/))
          ? (Sys.ie = s[1])
          : (s = ua.match(/firefox\/([\d.]+)/))
            ? (Sys.firefox = s[1])
            : (s = ua.match(/chrome\/([\d.]+)/))
              ? (Sys.chrome = s[1])
              : (s = ua.match(/opera.([\d.]+)/))
                ? (Sys.opera = s[1])
                : (s = ua.match(/version\/([\d.]+).*safari/))
                  ? (Sys.safari = s[1])
                  : 0;

      var re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
      var m = ua.match(re);
      Sys.browser = m[1].replace(/version/, "'safari");
      Sys.ver = m[2];
      return Sys;
    }
  },
  beforeRouteEnter(to, from, next) {
    // if(window.localStorage.getItem('user')){
    //     next('/');
    // }else{
    //     next();
    //     window.localStorage.setItem('user',true);
    // }
  },
  beforeCreate() {
    // if(localStorage.getItem('user')){
    //   localStorage.clear()
    // }
  },
  created() {},

  beforeDestroy() {
    // if(localStorage.getItem('user')){
    //   localStorage.clear()
    // }
  },

  watch: {
    outFlag: () => {
      if (!!this.outFlag) {
        this.$store.commit("LOG_OUT");
      }
    }
  },
  mounted() {
     window.addEventListener("storage", (e)=>{
      // alert(e.newValue);
      if (this.outFlag) {
      //  localStorage.clear()
        this.$store.commit("LOG_OUT");
      }
    });
   
  }
};
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
