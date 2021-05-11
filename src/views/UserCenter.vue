<template>
    <div>
        <UserInfo></UserInfo>
        <UserGoods></UserGoods>
    </div>
  
</template>

<script>
import UserInfo from '@/components/userCenter/UserInfo'
import UserGoods from '@/components/userCenter/UserGoods'
export default {
    name:'UserCenter',
    components:{
        UserInfo,
        UserGoods
    },
   
}
</script>

<style>

</style>