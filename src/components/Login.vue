<template>
  <div>
    <el-form class="login-panel" v-if="!registerSeen" :model="userLogin" :rules="rules" ref="loginRef">
      <div>Welcome!</div>
      <el-form-item prop="username">
        <el-input autocomplete="off" placeholder="用户名" v-model="userLogin.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" v-model="userLogin.password" type="password" show-password autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登 录</el-button>
        <el-button @click="registerPanel()">注册</el-button>
      </el-form-item>
    </el-form>

    <!-- 这里必须用v-show进行预加载，否则控件功能会出bug -->
    <el-form
      class="login-panel"
       v-show="registerSeen"
      :model="userRegister"
      :rules="rules"
      ref="registerRef"
    >
      <div>注册</div>
      <el-form-item prop="email">
        <el-input autocomplete="off" placeholder="邮箱号" v-model="userRegister.email"></el-input>
      </el-form-item>
      <el-form-item prop="registerName">
        <el-input autocomplete="off" placeholder="用户名" v-model="userRegister.registerName" ></el-input>
      </el-form-item>
      <el-form-item prop="registerPass">
        <el-input autocomplete="off" placeholder="密码" v-model="userRegister.registerPass" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input autocomplete="off" placeholder="确认密码" v-model="userRegister.checkPass" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">确定</el-button>
        <el-button @click="loginPanel()">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    //自定义“确认密码”验证
      var check_pass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userRegister.registerPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      userLogin: { username:"", password: '' ,},
      userRegister:{ email:"",registerName:"", registerPass: "" ,checkPass:""},
      //表单验证规则，rules、data()中数据、v-model绑定，三者名称必须相同
      rules:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'}
        ],

        password:[
            {required:true,message:'请输入密码',trigger:'blur'}
          ],

        email:[
          {required:true,message:'请输入邮箱号',trigger:'blur'},
          {type: 'email',message: '请输入正确的邮箱地址',trigger: 'blur'}
        ],
        registerName:[
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        registerPass:[
          {required:true,message:'请输入密码',trigger:'blur'},
          { min: 8, max: 40, message: '密码长度至少为 8 位 ', trigger: 'blur' }
        ],
        checkPass:[
          {validator:check_pass,trigger:'blur'}
        ]

      }
    };
  },

  methods: {
    //验证表单
    //切换注册面板
    registerPanel() {
      this.$refs.loginRef.resetFields();
      this.$store.dispatch('actRegister',true)
    },
    //切换登录面板
    loginPanel(){
      this.$refs.registerRef.resetFields()
      this.$store.dispatch('actRegister',false)
    },
    //清除表单验证结果
    resetRules(){
      if(this.registerSeen==true)
        this.$refs.registerRef.resetFields()
      else
        this.$refs.loginRef.resetFields();
    },

    //登录
    login(){
      this.$refs.loginRef.validate((vaild)=>{
        if(vaild==true){
          //请求后端登录
          this.$http.Login(this.userLogin)
          .then(res=>{
            console.log(res.data)
            //遍历存储cookie；参数0：浏览器关闭时cookie过期
            for(let key in res.data){
              this.$cookies.set(key,res.data[key],0)
            }
            this.$store.dispatch('actUser',res.data)
            this.$message({
            message: '登录成功',
            type: 'success'
        });
            this.$emit('DialogShow')  //关闭登录框
            })
          .catch(err=>{
            // console.log(err.config)
            // console.log(err.response)
            if(err.response&&err.response.status==422){
              this.$message({
              message: err.response.data.message,
              type: 'error',
              center:true
            });
            }else{
              this.$message({
              message: '连接超时，请检查网络连接',
              type: 'error',
              center:true
            });
            }
          })
          // this.$router.go(-1)
          // console.log(this.$route.path)
        }else{
          this.$message({
              message: '请完善用户信息',
              type: 'warning',
              center:true
            });
        }
      })
    },

    //注册成功，返回用户名
    register(){
      this.$refs.registerRef.validate((vaild)=>{
        if(vaild==true){
          //发送axios请求
          this.$http.register(this.userRegister)
          .then(res=>{
            console.log(res)
            if(res.data.code==11000){
              this.$message({
              message: '该用户名已被使用',
              type: 'error',
              center:true
            });
            }else if(res.data.username&&res.data.token){
              this.$cookies.set("token",res.data.token)
              this.$cookies.set('username',res.data.username)
              this.$store.dispatch('actUser',res.data)
              this.$message({
                message:'注册成功！',
                type:'success'
              })
              this.$emit('DialogShow')
            }else{
                this.$message({
                message:'抱歉，暂时无法注册',
                type:'warning'
              })
              this.$emit('DialogShow')
            } 
          }).catch(err=>{
            console.log(err)
            this.$message({
                message:'抱歉，暂时无法注册',
                type:'warning'
              })
            this.$emit('DialogShow')
          })
        }else{
            this.$message({
              message: '请完善用户信息',
              type: 'warning',
              center:true
            });
        }
      })
    },
  },

  computed:{
    registerSeen(){
      return this.$store.state.loginPanel.registerSign
    }
  },
};
</script>

<style scoped>
.login-panel {
  /* 居中显示 */
  display: flex;
  flex-flow: column; /* 决定排列及换行方式. 垂直排列column ,默认水平row */
  justify-content: center; /* 弹性盒子子元素主轴对齐方式(即决定的排列方向,这里为column) */
  align-items: center; /* 设置弹性盒子子元素在侧轴对齐方式(与主轴垂直方向) */
  /* box-shadow: 0px 0px 20px 4px; */
}

.login-panel > div {
  height: 35px;
  width: 80%;
  margin-bottom: 30px; /* 间距 */
}
.login-panel > div:nth-of-type(1) {
  width: 60%;
  font-size: 2rem;
  text-align: center;
  line-height: 35px;
  color: #dfbeb8;
  /* a水平 b垂直 c模糊半径 d颜色 */
  /* text-shadow: 0px 0px 5px #af9a8a; */
}

.login-panel > div input {
  width: 100%;
  /* 添加圆角的边框 */
  border-radius: 17.5px;
}

/* 登录按钮居中 */
.login-panel > div:nth-of-type(4) {
  text-align: center;
}
/* 注册按钮居中 */
.login-panel > div:nth-of-type(6) {
  text-align: center;
}

/* div下的button样式 */
.login-panel > div button {
  width: 40%;
  height: 100%;
  border-radius: 17.5px;
}
.login-panel > div button:nth-of-type(2) {
  background: transparent;
}
</style>