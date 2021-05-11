<template>
  <div class="panel">
    <div class="order">
      <div>
        <li v-if="!user.isUser">提交的用户服务</li>
        <li v-else>发布的信息（审核中...）</li>
      </div>
      <div v-if="user.isUser">
        <div v-if="userGoods.length!=0">
          <div v-for="(item,id) in userGoods" :key="id">
            服务主题：
          <el-button
            type="text"
            style="font-size:20px;"
          >{{ item.goodInfo.serveName }}</el-button>
          <div class="shop">
            <img :src="imgMIssing" alt="shopImg" />
            <div>{{item.shopName}}</div>
            <div >服务区域：{{item.goodInfo.region}}</div>
            <div >服务类型：{{item.goodInfo.type}}</div>
            <div>描述：{{item.goodInfo.desc}}</div>
          </div>
          </div>
          
        </div>
        <div v-else>
          你还没有下过单哦
        </div>
      </div>
      <div v-else>
        登录查看数据
      </div>
    </div>

    <div class="userSale" :style="{backgroundImage: 'url(' + bg + ')' }">
      <li>发布服务</li>
      <div class="salePanel">
        <div style="width:35%">
          <div style="margin:10px">添加照片</div> 
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="PicturePreview"
            :on-success="imgLoad"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>

        <div class="formPanel" >
          <el-form :model="serveForm" :rules="rules" ref="serveForm" label-width="100px">
            <el-form-item label="服务名称" prop="serveName">
              <el-input v-model="serveForm.serveName"></el-input>
            </el-form-item>
            <el-form-item label="服务区域" prop="region">
              <el-select v-model="serveForm.region" placeholder="请选择活动区域">
                <el-option v-for="(item,index) in this.districts" 
                :key="index" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务类别" prop="type">
              <el-checkbox-group v-model="serveForm.type">
                <el-checkbox label="美食/餐厅" name="type"></el-checkbox>
                <el-checkbox label="酒店/住宿" name="type"></el-checkbox>
                <el-checkbox label="商品销售" name="type"></el-checkbox>
                <el-checkbox label="学习帮助" name="type"></el-checkbox>
                <el-checkbox label="生活服务" name="type"></el-checkbox>
                <el-checkbox label="代跑服务" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="资源" prop="resource">
              <el-radio-group v-model="serveForm.resource">
                <el-radio label="线上活动"></el-radio>
                <el-radio label="线下活动"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
              <el-input type="textarea" v-model="serveForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="是否个人服务" prop="isPersonal">
              <el-switch v-model="serveForm.isPersonal"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('serveForm')">发布</el-button>
              <el-button @click="resetForm('serveForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgMIssing:require('@/assets/imgMissing.jpg'),
      dialogImageUrl: '',
      dialogVisible: false,
      bg: require("@/assets/background.gif"),
      districts:[{name:'全部'}],
      serveForm: {
        serveName: "",
        region: "",
        type: [],
        resource: "",
        desc: "",
        isPersonal: false,
      },
      rules: {
        serveName: [
          { required: true, message: "请输入服务名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择服务区域", trigger: "change" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个服务性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动形式", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请填写服务具体描述", trigger: "blur" }
        ]
      }
    };
  },
  created(){
    //获取用户发布信息
        let user=this.$store.state.user
        if(user.isUser){
          this.$http.userGoods(user.userInfo.username).then(res=>{
          console.log(res)
          this.$store.dispatch('actUserGoods',res.data)
        })
        }

    //初始化表单行政区域列表
        let city=this.$store.state.ipLocation.city
        this.$http.district(city).then(res=>{
        let districts=res.data.districts[0].districts
        for(let i=0;i<districts.length;i++)
          this.districts.splice(i+1,1,districts[i])
      })
      console.log(this.districts)

  },
  methods: {
    getShopMessage(id) {
      this.$router.push({
        name: "ShopMessage",
        query: {
          shopId: id
        }
      });
    },
    //文件上传成功，返回显示图片略缩图
    PicturePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    imgLoad(response, file, fileList){
      console.log(response)
      console.log(file)
      console.log(fileList)
    },
    goodsRefresh(){
      let user=this.$store.state.user
      this.$http.userGoods(user.userInfo.username).then(res=>{
          console.log(res)
          this.$store.dispatch('actUserGoods',res.data)
      })
    },
    //提交表单
    submitForm(formName) {
      let User=this.$store.state.user
      if(User.isUser){
      this.$refs[formName].validate(valid => {
          if (valid) {
          this.$http.goodsLoad(User.userInfo.username,this.serveForm).then(res=>{
            console.log(res)
            if(res){
              this.$http.userGoods(User.userInfo.username).then(res=>{
              console.log(res)
              this.$store.dispatch('actUserGoods',res.data)
            })
               this.$message({
                message: '提交成功',
                type: 'success'
              })
              }else{
                this.$message({
                type:'error'
                })
            }
          }).catch(err=>{
            console.log(err)
            alert('请求服务器发生错误')
          })
          } else {
            console.log("error submit!!");
            return false;
          } 
      }) 
      }else{
          this.$message({
            message: '请先登录',
            type: 'error'
          })
        }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    userGoods() {
      return this.$store.state.user.userGoods;
    }
  },
  watch:{
    "$store.state.user.userGoods": function() {
      this.area = this.$store.state.ipLocation.city;
    },
  }
};
</script>

<style scoped>
.panel {
  margin-top: 20px;
  width: 100%;
}
.order {
  padding: 10px;
  border: 1.5px solid rgb(228, 215, 186);
  background-color: rgba(70, 131, 180, 0.445);
}
.img {
  width: 20%;
  /* height: 60px; */
  object-fit: scale-down;
  margin-right: 50px;
}
.shop {
  display: flex;
}
.shop > div {
  margin: 10px;
}
.userSale {
  margin-top: 20px;
  padding: 10px;
  border: 1.5px solid rgb(228, 215, 186);
}
.salePanel{
  display:flex;
  margin-left:50px;
  margin-top:20px;
  flex-wrap: nowrap;
}
.formPanel {
  width: 500px;
  margin-left: 10px;
}
</style>