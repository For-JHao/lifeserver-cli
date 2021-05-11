<template>
  <div>
    <div class="home">
      <HomeCategory></HomeCategory>
      <HomeCarousel></HomeCarousel>

      <div class="login" v-if="!user.isUser">
        <div>
          <el-avatar :size="60" icon="el-icon-user-solid"></el-avatar>
        </div>
        <el-button type="text" @click="loginSeen" >用户登录</el-button>
        <el-button type="text" @click="register()">没有账号？点击注册</el-button>
      </div>

      <div v-else class="login">
        <div class="loginImg">
          <el-avatar :src='user.userInfo.imgUrl' :size="60" ></el-avatar>
        </div>
        <div style="margin:10px">欢迎你！{{ user.userInfo.username }}</div>  
      </div>
    </div>
    <div>
      <HomeDisplay></HomeDisplay>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeCategory from "@/components/home/HomeCategory";
import HomeCarousel from "@/components/home/HomeCarousel";
import HomeDisplay from "@/components/home/HomeDisplay";

export default {
  name: "Home",
  components: {
    HomeCategory,
    HomeCarousel,
    HomeDisplay
  },
  methods: {
    //打开登录/注册面板
    loginSeen(){
      this.$store.dispatch('actLoginPanel')
    },
    register() {
      this.$store.dispatch('actRegister',true)
      this.$store.dispatch('actLoginPanel')
    },
    //确保每次对话框打开都是登录界面
    loginShow() {
      this.$refs.child.loginPanel();
    },
  },
  computed:{
    user(){
      return this.$store.state.user
    },
  }
};
</script>

<style scoped>
.home {
  display: inline-flex;
  /* margin-bottom: 10px; */
  width: 100%;
}
.login {
  height: 26rem;
  width: 21.5%;
  background-color: #c7c9c4d3;
  display: flex;
  flex-flow: column; /* 决定排列及换行方式. 垂直排列column ,默认水平row */
  justify-content: center; /* 弹性盒子子元素主轴对齐方式(即决定的排列方向,这里为column) */
  align-items: center; /* 设置弹性盒子子元素在侧轴对齐方式(与主轴垂直方向) */
}

</style>
