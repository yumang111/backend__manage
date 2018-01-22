<style src="./userlogin.component.less" lang="less" scoped>

</style>


<template>
  <div class="login-page">
    <img class="page-banner" src="../../assets/image/login-bg02.png">
    <el-form :model="ruleForm2"
             :rules="rules2"
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             @keyup.enter.native="handleSubmit('ruleForm2')"
             class="login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="loginName">
        <el-input type="text"
                  v-model="ruleForm2.loginName"
                  auto-complete="off"
                  placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm2.password"
                  auto-complete="off"  
                  placeholder="密码"></el-input>   
      </el-form-item>
      <!--<el-checkbox v-model="checked"
                               checked
                               class="remember">记住密码</el-checkbox>-->
      <el-form-item style="width:100%;"
                    v-on:keyup.13="handleSubmit">
        <el-button type="primary"
                   style="width:100%;"
                   @click.native="handleSubmit('ruleForm2')"
                   :loading="logining">登录</el-button>
  
      </el-form-item>
  
    </el-form>
  </div>
</template >




<script src="./userlogin.component"></script>
