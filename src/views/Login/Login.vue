<template>
  <el-container>
    <div class="loginContainer">
      <div class="logo">
        <img src="../../assets/images/logo.webp" alt="">
        <span class="title">网易云音乐</span>
      </div>
      <div class="form">
        <el-form :model="loginForm" :rules="loginRules" ref="loginRef" class="demo-ruleForm" size="medium">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="loginForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button type="primary" round @click="login">登录</el-button>
        <el-button type="success" round>注册</el-button>
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      loginForm: {
        phone: '18879711464',
        password: '123321xyf!!!'
      },
      loginRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    login(){
      this.$refs.loginRef.validate((async (valid) => {
        if(!valid) return
        const {data} = await this.$request('/login/cellphone', {params: {phone: this.loginForm.phone, password: this.loginForm.password}})
        if(data.code===502){
          this.$message.error('密码错误')
          return
        }
        if(data.code===200){
          this.$message.success('登录成功')
          window.localStorage.setItem('loginInfo', JSON.stringify(data))
          this.$router.push({
            path: '/Home',
            query: {
              userInfo: data
            }
          })
          return
        }
        this.$message.error('登录失败')
      }))
    }
  }
}
</script>

<style lang="less" scoped>
  .el-container{
    width: 100%;
    height: 100vh;
    background: url('../../assets/images/login.jpeg') no-repeat;
    background-size:cover;
    .loginContainer{
      position: absolute;
      width: 400px;
      height: 500px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      padding: 0 40px;
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      .logo{
        display: flex;
        align-items: center;
        img{
          width: 150px;
          height: 90px;
        }
        .title{
          text-align: center;
          font-size: 20px;
        }
      }
      .form{
        padding: 10px 20px;
      }
    }
    .btn{
      text-align: center;
      .el-button{
        width: 100px;
        margin: 10px 20px;
      }
    }
  }
</style>