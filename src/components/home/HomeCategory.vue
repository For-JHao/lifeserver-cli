<template>
  <div class="category">
    <button
      @click="userCheck(item,item._id)"
      @mouseenter="mouseIn(id)"
      @mouseleave="mouseOut()"
      v-for="(item,id) in categories"
      :key="id"
      :style="MouseOn==id? 'background-color: #AAAAAA':'' "
    >{{ item.keyword }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MouseOn: -1,    //控制点击颜色切换
      categories: [
        { id: 1, keyword: "美食" },
        { id: 2, keyword: "酒店" },
      ]
    };
  },
  created(){
    this.$http.categories().then(res=>{
      this.categories=res.data
    })
  },

  methods: {
    //用户点击切换背景颜色，通过数据MouseOn记录用户点击id
    userCheck(item) {
      localStorage.setItem("type",item.keyword)
      this.$router.push({
        name:'Shops',
        query:{
          id:item._id
        },

      })
    },
    mouseIn(id){
      this.MouseOn = id;
    },
    mouseOut(){
      this.MouseOn=-1
    }
  },
};
</script>

<style scoped>
.category {
  width: 20%;
  height: 26rem;
  background-color: wheat;
}
.category > button {
  text-align: left;
  width: 100%;
  border: none;
  background: none;
}
</style>