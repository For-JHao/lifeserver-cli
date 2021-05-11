<template>
<div :style="backgroundDiv">
  <div class="reviews" >
    <li style="border-block-end: 1.5px solid rgba(74, 171, 235, 0.226);">评论：</li>
    <div v-for="(item,index) in shop.reviews" :key="index">
      <el-divider content-position="left">用户：{{item.userName}}</el-divider>
      <div class="userReview" >{{item.review}}</div>
    </div>
  </div>

    <div class="login_review">
    <div class="layout">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容(字数不超过120/不低于8)"
        v-model="textarea"
        maxlength="120"
        minlength=8
        :show-word-limit="true"
        :disabled="!user.isUser"
      ></el-input>
      <el-button type="test" round 
      @click="loginPanel" 
      style="height:50%;margin-left:10px"
      v-if="!user.isUser">
      登录参与评论
      </el-button>
      <el-button round @click="inputReview" style="height:50%;margin-left:10px" v-else>发表评论</el-button>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      textarea: "",
      background: require("@/assets/background.gif"),
      backgroundDiv: {
        backgroundImage: "url(" + require("@/assets/background.gif") + ")",
        backgroundRepeat: "repeat"
      },
    };
  },
  props:['vshopId'],
  created(){
    let id=this.vshopId
    this.$http.shopReview(id).then(res=>{
      this.$store.dispatch('setActReview',res.data)
    })
  },
  methods: {
    loginPanel(){
      this.$store.dispatch('actLoginPanel')
    },
    inputReview(){
      if(this.textarea){
        let uReview={
        userName:this.$cookies.get('username'),
        shopId:this.vshopId,
        review:this.textarea
        }
        
      this.$http.userReview(uReview).then(res=>{
        if(res){
          console.log(res)
          this.$store.dispatch('actUserReview',res.data)
          this.$message({
          message:'评论成功',
          type:'success'
          })
        } else{
          console.log(res)
        }
      }).catch(err=>{
        console.log(err)
      })
      this.textarea=''
      }else{
        this.$message({
          message:'评论不能为空',
          type:'warning'
          })
      }
    }
  },
  computed: {
    shop() {
      return this.$store.state.shop;
    },
    isUserLogin(){
       if(this.$store.state.user.token||this.$cookies.isKey('token')) 
       return true
       else return false
    },
    user(){
      return this.$store.state.user
    }
  },
};
</script>

<style scoped>
.reviews {
  height: 300px;
  padding: 50px;
  overflow: auto;
}
.userReview {
  height: 50px;
  width: 100%;
  word-wrap:break-word;
  margin: 20px;
  border-block-end: 1.5px solid rgba(74, 171, 235, 0.226);
}
.login_review {
  width: 100%;
  bottom: 0;
  text-align: center;
}
.layout{
  width: 60%;
  display: flex;
  align-items: center;
  margin: 10px;
  margin-left: 80px;
}
</style>