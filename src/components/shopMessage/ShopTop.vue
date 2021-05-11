<template>
<div>
  <el-row class="top">
    <el-col :span="12" class="display">
      <el-carousel :interval="5000" arrow="always">
        <div v-if="shopImg.length!=0">
          <el-carousel-item v-for="(item,index) in shopImg" :key="index">
            <img :src="item.url" class="shopPic" />
            <div slot="placeholder" class="image-slot">
              加载中
            <span class="dot">...</span>
            </div>
          </el-carousel-item>
        </div>
        <div v-else class="sorry"><span>抱歉，暂时还没有图片</span></div>
      </el-carousel>
    </el-col>
    <el-col :span="12" class="topRight">
      <div class="message">
        <div>{{shop.name}}</div>
        <div>类型：{{shop.type}}</div>
        <div>电话：{{shop.tel}}</div>
        <div>地址：<el-button  type="text"></el-button></div>
        <div class="address" @click="getMap">{{shop.address}}</div>
        
      </div>
    </el-col>
  </el-row>
  <transition name="el-zoom-in-top">
  <el-row type="flex" justify="center" v-show="mapShow">
    <el-button @click="mapSub">-</el-button>
    <img :src="shopLocation" alt="shopLocation" v-show="mapShow" class="mapPic">
    <el-button @click="mapPlus">+</el-button>
  </el-row>
  </transition>
</div>
</template>

<script scoped>
export default {
  data(){
    return{
      map:{
        zoom:'12',        //1-17,数字越大，地图比例越小
        size:'900*200',   //地图展示图片大小
        markets:'mid,0xFF0000,A',   //地图标注：大小，颜色，标注样式
      },
      mapShow:false
    }
  },
  methods:{
     getMap(){
      this.mapShow=!this.mapShow
    },
    mapPlus(){
      if(this.map.zoom<=17)
        this.map.zoom++
      else
        this.$message({
          message:"缩放已达最大",
          type:'warning'
        })
    },
    mapSub(){
      if(this.map.zoom>2)
        this.map.zoom--
      else
        this.$message({
          message:"已达最大范围",
          type:'warning'
        })
    },
  },
  computed: {
    shopImg() {
      console.log(this.$store.state.shop.photos)
      return this.$store.state.shop.photos;
    },
    shop() {
      return this.$store.state.shop;
    },
    shopLocation(){
      let map=`zoom=${this.map.zoom}&size=${this.map.size}&markers=${this.map.markets}:${this.$store.state.shop.location}`
      let imgurl=`${this.$http.shopLocation()}&${map}`
      return imgurl
    },
  }
};
</script>

<style scoped>
.top{
  margin-bottom: 10px;
}
.display {
  width: 50%;
}
.shopPic {
  width: 100%;
  height: 100%;
}
.mapPic{
  width: 100%;
  height: 100%;
}
.sorry{
  background-color: rgba(229, 235, 217, 0.973);
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 200px;
}
.message{
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
.topRight{
  /* background-color: rgba(114, 154, 180, 0.199); */
  line-height: 30px;
  width:50%;
  height:300px;
  border:  1.5px solid rgb(233, 185, 130);
}
.message>div:nth-of-type(1){
  font-size:x-large;
  line-height: 50px;
  color: chocolate;
  margin-top: 50px;
}
.address{
  color:rgb(84, 180, 235);
  margin-left:20px;
  margin-right: 20px;
  cursor: pointer;
}
</style>