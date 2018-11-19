<template>
<section style="height:100%">
  <div class="home-img">
    <div class="home-banner" :style="computedStyle">
      <div class="title">
        Technical community and support center for developers
        <div v-if="!isLoggedin" class="userButton">
          <router-link to="/signup">
            <el-button type="primary">REGISTER NOW</el-button>
          </router-link>
          <router-link to="/login">
            <el-button>SIGN IN</el-button>
          </router-link>
        </div>
      </div>
      </div>
  </div>
</section>
</template>

<script>
export default {
  data() {
    return {
      pageHeight: 0,
      newLogin:null,
    };
  },
  computed: {
    isLoggedin() {
      if (!this.$store.state.user.id) {
        this.$store.commit("SET_USER");
      }
      return this.$store.state.user.id;
    },
    computedStyle() {
      this.pageHeight = document.body.clientHeight;
      return (
        "height:" +
        (this.pageHeight > 500 ? this.pageHeight * 1.2 : 500 * 1.2) +
        "px;"
      );
    }
  },
  methods:{
   
  },
  mounted() {
   
    window.addEventListener("resize", function() {
      this.pageHeight = document.body.clientHeight;
    });
  }
};
</script>

<style lang="scss" scoped>

.home-banner {
  background-image: url("/static/images/banner1.jpg");
  background-size: cover;
  background-position:50%;
  background-repeat: no-repeat;
  -moz-background-size: 100% 100%;
  // -webkit-background-size: 100% 100%;
}

.title {
  padding: 10% 50px;
  text-align: center;
  color: #ffffff;
  font-size: 80px;
  font-weight: 300;
  line-height: 100px;
  text-shadow: 0 0 1px #777;
}
@media screen and (max-width: 768px) {
  .home-banner {
    .title {
      padding: 10% 4%;
      text-align: center;
         font-size: 55px;
    line-height: 80px;
    }
    .userButton {
      float: left;
      margin: 10% 33%;
    }
  }
}
@media screen and (max-width: 414px) {
  .home-banner {
    .title {
      padding: 10% 5%;
      text-align: center;
      // width: 320px;
          font-size: 50px;
    }
    .userButton {
      float: left;
      margin: 10% 20%;
    }
  }
}
@media screen and (max-width: 375px) {
  .home-banner {
    .title {
      padding: 10% 5%;
      text-align: center;
      // width: 320px;
      // font-size: 27px;
    }
    .userButton {
      float: left;
      margin: 10% 20%;
    }
  }
}
@media screen and (max-width: 320px) {
  .home-banner {
    .title {
      padding: 10% 5%;
      text-align: center;
      // width: 264px;
      // font-size: 27px;
    }
    .userButton {
      float: left;
      margin: 10% 20%;
    }
  }
}
</style>
