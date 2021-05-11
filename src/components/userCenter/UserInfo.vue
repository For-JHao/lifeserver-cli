<template>
  <div class="out">
    <div class="user">
      <div v-if="user.isUser" class="panel">
      <div style="text-align:center">
        <img v-if="user.userInfo.imgUrl" :size="50" :src="user.userInfo.imgUrl" alt="userTitle" style="width:50%" />
        <img v-else src="http://b-ssl.duitang.com/uploads/item/201509/30/20150930140213_ZCFSr.jpeg" alt="默认头像" style="width:50%">
        </div>
      <div>{{ user.userInfo.username }}</div>
      <div ><el-button type="text" @click="loginOut">退出账号</el-button></div>
      </div>

      <div v-else class="panel">
        <div style="width:100%"><img :src="userImg" alt="userImg"></div>
        <div><el-button @click="login" >登录</el-button></div>
      </div>
    </div>

    <div class="mess">
      <el-row  class="row" :gutter="10">
        <el-col :span="12" class="col"><el-button class="button">扩展（...）</el-button></el-col>
        <el-col :span="12" class="col"><el-button class="button">扩展(...)</el-button></el-col>
      </el-row>
      <el-row class="row" :gutter="10">
        <el-col :span="12" class="col"><el-button class="button">扩展（评论）</el-button></el-col>
        <el-col :span="12" class="col"><el-button class="button">扩展（收藏）</el-button></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userImg:require('@/assets/user.jpg')
    }
  },
  methods:{
    login(){
      this.$store.dispatch('actLoginPanel')
    },
    loginOut(){
      this.$cookies.remove('token')
      this.$cookies.remove('username')
      this.$store.dispatch('actUser','')
      this.$message({
          message: '退出成功',
          type: 'success'
      })
    }
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  }
};
</script>

<style scoped>
.out {
  display: flex;
  height: 300px;
  border:  1.5px solid rgb(233, 185, 130);
}
.user {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blanchedalmond;
}
.panel{
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
img{
  width: 100%;
  overflow: hidden;
}
.mess {
  width: 60%;
  height: 100%;
}
.row{
  height:50%;
  width:100%;
}
.col{
  height: 100%;
}
.button{
  height:100%;
  width:100%;
}
</style>