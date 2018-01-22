<style lang="less" >
.app-header {
  // height: 74px;
  // line-height: 74px;
  .user-info {
    // float: right;
    height: 74px;
    vertical-align: top;
    background: #191c29;
    color: #fff;
    line-height: 74px;
  }
  .name-img {
    height: 74px;
    width: 160px;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    cursor: pointer;
  }
  .user-img {
    width: 36px;
    height: 36px;
    vertical-align: top;
    margin: 15px 0px 0 24px;
    display: inline-block;
    img {
      width: 100%;
      border-radius: 50%;
      height: 100%;
    }
  }
  .name-img {
    display: inline-block;
  }
  .login-out {
    display: inline-block;
    padding: 0 20px;
    cursor: pointer;
    font-size: 14px;
  }
  .user-name {
    padding-left: 10px;
    font-size: 14px;
  } // .el-dialog__body {
  //   padding: 15px;
  // }
  // .info-setting .el-dialog__header {
  //   display: none;
  // }
  // .info-set-tabs {
  //   .el-tabs__header {
  //     line-height: 40px;
  //   }
  // }
  .el-tabs__header {
    border: none;
  }
}
</style>

<template>
  <div class="app-header">
    <!--<div class="header-logo">
                                                                                                                    <img src="../../../assets/image/logo.jpg" />
                                                                                                                  </div>-->
    <div class="user-info">
      <div class="name-img" @click="userInfoDialog">
        <span class="user-img" @click="changeFlag=true">
          <img :src="getUserImgUrl||morenTUpian">
        </span>
        <span class="user-name">
          {{getUserRealName}}
        </span>
      </div>
      <div class="login-out" @click="dropOut">退出</div>
    </div>
    <div class="info-setting-container">
      <el-dialog class="info-setting" v-model="dialogFlag" v-if="dialogFlag">
        <el-tabs class="info-set-tabs" v-model="activeName2" type="card">
          <el-tab-pane label="个人信息" name="first">
            <user-info @dialogClose="colCloseDialog" :personImg="userHeadImg"></user-info>
          </el-tab-pane>
          <el-tab-pane label="密码" name="second">
            <password @dialogClose="colCloseDialog"></password>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '@/api/api';
import util from '@/tools/util';
import router from '@/router';
import userInfo from './userinfo/userinfo';
import password from './password/password';

export default {
  data() {
    return {
      changeFlag: false,
      dialogFlag: false,
      activeName2: 'first',
      datanum: true,
      loginName: util.getCookie('loginName'),
      userHeadImg: '',
      dialogTableVisible: false,
      // dialogFormVisible: false,
      formLabelWidth: '120px',
      realName: util.getCookie('realName'),
      morenTUpian: 'http://yfdev.img-cn-hangzhou.aliyuncs.com/avatar/housemarket/59080cf488b95826208eda75.png',
    };
  },
  components: {
    userInfo,
    password,
  },
  activated() {
    this.loginName = util.getCookie('loginName');
  },

  created() {
    this.$store.dispatch('GET_USER_INFO');
  },
  computed: {
    getUserRealName() {
      return this.$store.state.user.realName;
    },
    getUserImgUrl() {
      return this.$store.state.user.loginImageUrl;
    },
  },
  methods: {
    userInfoDialog() {
      this.getUserInfo();
      this.$store.dispatch('GET_USER_INFO');
      // this.$store.commit('CTR_USERINFO_DIALOG_OPEN');
    },
    colCloseDialog() {
      this.dialogFlag = false;
    },
    dropOut() {
      // util.setCookie('loginName', '');
      this.$confirm('确认退出吗?', '提示', {
      }).then(() => {
        util.setCookie('projectId', '');
        util.setCookie('projectName', '');
        util.setCookie('accountId', '');
        // util.setCookie('loginPasd', '');
        util.setCookie('realName', '');
        router.push('/userlogin/');
      }).catch(() => {

      });
    },
    getUserInfo() {
      api.user_getUserInfo({ accountId: util.getCookie('accountId') })
        .then((respond) => {
          this.dialogFlag = true;
          if (respond && respond.data) {
            this.userHeadImg = respond.data.imgUrl;
          }
        });
    },
  },
};
</script>
