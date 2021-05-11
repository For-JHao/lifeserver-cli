<template>
  <div class="app">
    <Header></Header>
    <div class="main">
      <!-- <router-link :to='{name:"Home",params:{id:""}}'></router-link> -->
    <router-view></router-view>
    </div>
    <el-dialog
        :visible.sync="loginPanel.DialogVisible"
        width="30%"
        center
        @closed="loginShow()"
        >
      <Login @DialogShow="$store.dispatch('actLoginPanel')" ref="child"></Login>
    </el-dialog>
  </div>
</template>

<script>
//import Home from "./views/Home";
import Header from "./views/Header"
import Login from "@/components/Login";

export default {
    methods: {
    //确保每次对话框打开都是登录界面
    loginShow() {
      this.$refs.child.resetRules();
      this.$store.dispatch('actRegister',false)
    },
  },
  computed:{
    loginPanel(){
      return this.$store.state.loginPanel
    }
  },
  components: {
    //Home,
    Header,
    Login
  }
};
</script>

<style>
.app {
  width: 1000px;
  margin: 0 auto;
}

</style>
