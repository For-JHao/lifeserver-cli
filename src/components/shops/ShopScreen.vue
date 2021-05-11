<template>
  <div class="panel">
        <dl class="list">
          <dt>分类</dt>
          <dd v-for="(item,index) in categories" :key="index" 
          :class="{active:mouseOn1==index}"
          @click="userMouseOn1(index,item)">
            {{item}}
          </dd>
        </dl>
        <el-divider></el-divider>
        <dl class="list">
          <dt>区域</dt>
          <dd v-for="(item,index) in districts" :key="index" 
          :class="{active:mouseOn2==index}"
          @click="userMouseOn2(index,item)">
            {{item.name}}
          </dd>
        </dl>
  </div>
</template>

<script>
export default {
    data(){
      return{
        mouseOn1:0,
        mouseOn2:0,
        typeId:'',
        categories:["全部"],   //数组index=0位为'全部'
        districts:[{name:'全部'}],
      }
    },
    props:['id'],
    created(){
        //后端获取数据，渲染分类列表      
        this.$http.secondCategory(this.id).then(res=>{
          let index=res.data.categories
          this.typeId=res.data._id
        for(let i =0;i<=index.length;i++){
            this.categories.push(index[i])
          }
          this.categories=res.data.categories
        })

        //渲染区域列表
        if(this.$store.state.ipLocation.status!=0){
          let city=this.$store.state.ipLocation.city
          this.districtChange(city)
        }
       
    },
    watch:{
      //用watch侦听store数据city，注意函数头写法
      '$store.state.ipLocation.city':function(){
        let city=this.$store.state.ipLocation.city
        this.districtChange(city)
      },

    },
    methods:{
      //分类列表切换
      userMouseOn1(index,item){
        this.mouseOn1=index
        if(index==0){
          let type=localStorage.getItem('type')
          this.$router.push({
          query:{
            category:type,
            id:this.typeId
          }
        })
        }else{
          this.$router.push({
          query:{
            category:item,
            id:this.typeId
          }
        })
        }        
      },
      //区域列表切换
      userMouseOn2(index,item){
        this.mouseOn2=index
        if(index==0){
          let cityAdcode=this.$store.state.ipLocation.adcode
          this.$store.dispatch('setActAdcode',cityAdcode)
        }else{
          this.$store.dispatch('setActAdcode',item.adcode)
        }
      },
      //发送axios请求，获取城市次级行政区域
      districtChange(city){
        this.$http.district(city).then(res=>{
        let districts=res.data.districts[0].districts
        let index=1
        for(let i=districts.length-1;i>=0;i--){
          this.districts.splice(index,1,districts[i])
          index++
        } 
      })
      },
    }
}
</script>

<style scoped>
.panel{
    background-color: rgba(218, 211, 204, 0.473);
    width: 100%;
}
.list{
  display: flex;
  margin: 10px;
  /* 使flex后元素自动换行： */
  flex-wrap: wrap   
}
.active{
  color: rgba(123, 211, 211, 0.808);
}
dd{
  margin: 10px;
  /* height: 100px; */
  width: 20px;
  cursor: pointer;
}
dd:nth-of-type(1){
  font-weight:550
}
dt{
  margin: 10px;
  font-size: large;
  width: 50px;
  height: 50px;
  color: rgb(218, 176, 99);
}
dl{
  margin: 10px;
}

</style>