<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="dispaly">
          <ShopTop></ShopTop>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="comments">
          <ShopReviews :vshopId='shopId'></ShopReviews>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script scoped>
import ShopTop from '@/components/shopMessage/ShopTop' 
import ShopReviews from '@/components/shopMessage/ShopReviews'
export default {
  name:'ShopMessage',
  data(){
    return{
      shopId:""
    }
  },
  created(){
    //获取shop详细信息
      this.shopId=this.$route.query.shopId
      this.$http.shopMess(this.shopId).then(res=>{
        //查看高德shop数据类型
        console.log(res)
        this.$store.dispatch("setActShop",res.data.pois[0])
        })
      
      
  },
  components:{
    ShopTop,
    ShopReviews
  },
  computed:{
    shop:function(){
      return this.$store.state.shop
    }
  }
};
</script>

<style scoped>
.display {
  border: 1px solid black;
}
.comments {
  margin-top: 15px;
  border: 1px solid black;
}
</style>
