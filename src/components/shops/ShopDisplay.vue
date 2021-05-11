<template>
  <div class="shopList">
    <el-card v-for="(item,index) in shopList" :key="index" shadow="hover">
      <div class="card">
          <img v-if="item.photos.length!=0" 
          :src="item.photos[0].url" />
          <img v-else :src="imgMIssing" />
        <div class="mess">
          <div class="title">{{item.name}}</div>
          <div >{{item.type}}</div>
          <div v-if="item.biz_ext.rating.length!=0">评分：{{item.biz_ext.rating}}</div>
          <el-button type="text" @click="shopMessage(item)">查看详情</el-button>
        </div>
      </div>  
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopList: [],
      typeList:[],
      area: "",
      imgMIssing:require('@/assets/imgMissing.jpg')
    };
  },
  props: ["category","id"],
  created() {
    let type=localStorage.getItem('type')
    this.area = this.$store.state.ipLocation.city;
    this.shopListSearch(type, this.area);
  },
  watch: {
      //侦听城市变化
    "$store.state.ipLocation.city": function() {
      this.area = this.$store.state.ipLocation.city;
    },
    "$store.state.ipLocation.childAdcode":function(){
        this.area=this.$store.state.ipLocation.childAdcode
    },

    area(){
      let city=this.area
      this.shopListSearch(this.category,city);
    },
    category(){
      this.shopListSearch(this.category, this.area);
    },

  },
  methods: {
      //请求当前区域shop数据,存入当前组件shoplist[]
    shopListSearch(category, area) {
      this.shopList=[]
      this.$http.ShopSearch(category, area).then(res => {
        for (let i = 0; i < res.length; i++) {
          let arr=res[i].type.split(";")
          this.typeList.splice(i,1,arr[1])
          res[i].type=arr[1]
          this.shopList.splice(i, 1, res[i]); 
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //shop详情页跳转
    shopMessage(item){
      this.$router.push({
      name:'ShopMessage',
      query:{
        shopId:item.id
      }
      })
    }
  }
};
</script>

<style>
img{
  object-fit: cover;
  height:150px;
  width:220px;
}
.card{
  display: flex;
}
.mess{
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 50%;
}
.mess>div{
  margin: 5px;
}
.title{
  font-size: large;
  color: rgb(233, 219, 156);
}
.shopList{
  background-color: burlywood;
}
</style>