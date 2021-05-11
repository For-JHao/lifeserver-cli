<template>
  <div>
      <ShopScreen  :id='vid'></ShopScreen>
      <ShopDisplay :category='vCategory' :id='vid'></ShopDisplay>
  </div>
</template>

<script>
import ShopScreen from '@/components/shops/ShopScreen'
import ShopDisplay from '@/components/shops/ShopDisplay'
export default {
    data(){
        return{
            vCategory:'',
            vid:'',
        }
    },
    created(){
        //获取home给的路由参数，传给子组件ShopScreen
        this.vCategory=localStorage.getItem('type')
        this.vid=this.$route.query.id
        this.$router.push({
        query:{
          category:this.vCategory,          //这里给category赋值是为了页面刷新后，使url的category重置，以维持与页面的一致
          id:this.vid
        }
      })
    },
    watch:{
        $route (newRoute) {
            this.vCategory = newRoute.query.category // 这里就是新的query
            this.vid=newRoute.query.id
        }
    },
    components:{
        ShopScreen,
        ShopDisplay,
    }
}
</script>
