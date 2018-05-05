<template>
  <div>
    <div class="title">支付中心系统</div>
    <div class="page-part login-page">
      <mt-field label="账号" placeholder="请输入账号" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" v-model="password"></mt-field>
    </div>
    <div class="login-box">
      <mt-button type="primary" size="large">登录</mt-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "component_name",
    data() {
      return {
        username: '',
        password: '',
      };
    }
  }
</script>
<style lang="stylus">
  .title 
    padding: 30px 0 15px
    text-align: center
  .login-box
    text-align:center
    padding:10px
    padding-top:25px
  .login-page .mint-field .mint-cell-title
    flex:2
  .login-page .mint-field .mint-cell-value
    flex:7

</style>