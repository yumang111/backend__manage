<style>
.positionCenter {
  position: absolute;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
<template>
  <div class="positionCenter">
    <div class="errfdc-img"><img src="http://yfdev.oss-cn-hangzhou.aliyuncs.com/esf/images/error/404error.png"></div>
    <!-- <div class="errfdc-img"><img src="images/error/503error.png"></div> -->
    <p class="errfdc-txt">页面无法访问，攻城狮正在努力修复中，请稍后再试...</p>
    <router-link to="/userlogin"
       class="errfdc-btn">返回登陆页</router-link>
    <input id="baidu_count"
           type="hidden"
           value="bdaf02fea3dc69d83757cfa6480dc5d6" />
  </div>
</template>

<script>
export default {
};
</script>

<script rel="stylesheet" href="http://yfdev.oss-cn-hangzhou.aliyuncs.com/esf/css/common.css"></script>
