<template>
  <div class="block">
    <el-carousel height="250px">
      <el-carousel-item v-for="(item,id) in imgs" :key="id">
        <img :src="item.src" alt="item.alt" style="width: 100%;height: 100%;" @click="go(item.alt)">
      </el-carousel-item>
    </el-carousel>
    <div class="smallBlock">
      <div :style="bgImgInput" class="size" @click="inputMess"></div>
      <div :style="bgImgRearch" class="size" @click="nearbyNews"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // shopIn:require('@/assets/ShopIn.jpg'),
      // UserIn:require('@/assets/UserIn.jpg'),
      bgImgInput:{
        backgroundImage:"url(" + require("@/assets/ShopIn.jpg") + ")",
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'
      },
      bgImgRearch:{
        backgroundImage:"url(" + require('@/assets/UserIn.jpg') + ")",
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'
      },
      imgs: [
        {
          id: 1,
          alt:'酒店',
          src:
            "http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg"
        },
        {
          id: 2,
          alt:'美食',
          src:
            "http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg"
        },
        {
          id: 3,
          alt:'电影',
          src:
            "http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg"
        }
      ]
    };
  },
  methods:{
    inputMess(){
      this.$router.push({
        name:'UserCenter'
      })
    },
    nearbyNews(){
      localStorage.setItem('type','生活服务')
    this.$router.push({
      name:'Shops',
    })
  },
  go(type){
    console.log(type)
  }
  },
 
  //获取走马灯图片
  created(){
    this.$http.carouselImg().then()
  }
};
</script>

<style>
.block{
    width: 600px;
    height: 450px;
}
.smallBlock{
  width: 100%;
  height: 40%;
  display: flex;
}
.size{
  width: 50%;
  height: 100%;
}

</style>