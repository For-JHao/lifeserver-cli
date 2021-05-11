<template>
  <div style="width:100%">
    <div v-if="ipLocation.status!=0">
      当前位置为：{{ ipLocation.province }} {{ ipLocation.city }}
    </div>
    <div v-else>位置获取失败，请检查网络连接</div>
  </div>
</template>

<script>
export default {
  created() {
    //请求高德api进行ip定位,数据返回store
    this.$http.ipLocation().then(res=>{
      this.$store.dispatch("setActIpLocation",res)
      })
  },
  computed:{
    //从store获取定位数据
     ipLocation:function(){
      return this.$store.state.ipLocation
    },
  }
  
};
</script>
