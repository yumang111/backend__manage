<style src="./components/core/style/common.less" lang="less" ></style>
<style lang="less">
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#app {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div id="app"
       @click="checkloginStatus">
    <router-view></router-view>
  </div>
</template>

<script>
import util from '@/tools/util';
import router from '@/router';

export default {
  name: 'app',
  // created() {
  //   this.$store.dispatch('GET_ROUTER_LIST');
  // },
  methods: {
    checkloginStatus() {
      const accountId = util.getCookie('accountId');
      util.getCookie('accountId', accountId, 1);
      if (!accountId) {
        router.push('/userlogin/');
      }
    },
  },
};
</script>
