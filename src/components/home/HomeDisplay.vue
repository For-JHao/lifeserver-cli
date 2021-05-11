<template>
  <div>
    <div class="DTitle">
      <span>{{ category[0].categoryName }}</span>
      <span v-for="(item,id) in category[0].title" :key="id" 
      :style="id==index?'  color: limegreen':''"
      @click="categoryChange(id,city)">
      {{ item.name }}
      </span>
    </div>
    <div class="Display">
      <el-card v-for="(item,index) in shopMessages" :key="index" 
      :body-style="{ padding: '0px' }" 
      shadow="hover">
        <img :src="item.photos[0].url" style="height: 150px" />
            <!-- <div slot="error" class="image-slot">
            加载中<span class="dot">...</span>
            </div> -->
        <div class="buttom" >
          <span style="font-size:1rem">{{ item.name }}</span>
          <div class="shopmsg">
            <span>{{ item.adname }}</span>
            <el-button type="text" style="float:right;padding: 5px;" @click="getShopMessage(item)">查看详情</el-button>
            </div>
        </div>
      </el-card>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      //通过index判断选中的title的id，切换字体颜色
      index:0,                                                                                                                    
      category:[
        {
          categoryName: "周边娱乐",
          title: [
            { id: 1, name: "公园" },
            { id: 2, name: "商城" },
            { id: 3, name: "影院" },
            { id: 4, name: "书城" }
          ]
        },
      ],
      shopMessages: []
    };
  },
  created(){
    //获取home展示商店数据
      let city=this.$store.state.ipLocation.city
      this.$http.ShopSearch(this.category[0].title[0].name,city).then(res=>{
      for(let a=0;a<8;a++){
        this.shopMessages.push(res[a])
      }
      })
    
  },
  methods:{
    //切换shop类别展示
    categoryChange(id,city){
      this.index=id;
      this.shopMessages.length=0;
      this.$http.ShopSearch(this.category[0].title[id].name,city).then(res=>{
      for(let a=0;a<8;a++){
        this.shopMessages.push(res[a])
      }
      })
    },
    //编程式路由
    getShopMessage(item){
    this.$router.push({
      name:'ShopMessage',
      query:{
        shopId:item.id
      }
      })
  },
  },
  computed:{
    city(){  
      return this.$store.state.ipLocation.city
    }
  }
};
</script>

<style>
.DTitle > span {
  cursor: pointer; /* 使光标变为手形 */
  margin: 20px;
}
.DTitle > span:nth-of-type(1) {
  color: #2ac845;
  font-size: 180%;
  margin-right: 100px;
  cursor: default;
}
.Display {
  width: 100%;
  height:564px;
  text-align: center;
  background-color: cornsilk;
}
.Display > div {
  display: inline-block;
  width: 22%;
  margin: 0.6rem;
  border: 1px solid #999999;
}

.buttom{
  height: 5rem;
  width: 10rem;
  padding: 0.7rem;
  padding-left: 0.5rem;
  position: relative;
}
.shopmsg{
  height: 1rem;
  width: 100%;
  font-size: 0.8rem;
  position: absolute;
  bottom:0.7rem;
}

</style>