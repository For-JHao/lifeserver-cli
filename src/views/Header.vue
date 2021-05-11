<template>
  <div>    
  <el-row>
  <el-col :span="16"><Location></Location></el-col>
  <el-col :span="2"><el-button type="text" style="padding:0" @click="backHome">返回首页</el-button></el-col>
  <el-col :span="6" v-if="user.isUser" style="text-align: right;">
    个人中心：<el-button type="text" style="padding:0" @click="userInfo">{{ user.userInfo.username }} </el-button>
    <el-button type="text" style="color:grey;padding:0" @click="loginOut">退出</el-button>
  </el-col>
  <el-col :span="6" v-else style="text-align: right;"><el-button type="text" style="color:black;padding:0">请登录账号</el-button></el-col>
  </el-row>
</div>
</template>

<script>
import Location from "../components/Location"

export default {
  components:{
    Location,
  },
  computed:{
    user(){
      return this.$store.state.user
    },
    isLogin(){
      if(this.$store.state.user.token||this.$cookies.isKey('token')) return true
      else return false
    }
  },
  methods:{
    //退出，返回首页
    loginOut(){
      this.$cookies.remove('token')
      this.$cookies.remove('username')
      this.$store.dispatch('actUser','')
      this.$message({
          message: '退出成功',
          type: 'success'
      })
    },
    backHome(){
      this.$router.push({
        name:'Home'
      })
    },
    userInfo(){
      this.$router.push({
        name:'UserCenter',
      })
    }
  }
}
</script>

<style scoped>
.header{
  margin-bottom: 10px;
}
</style>