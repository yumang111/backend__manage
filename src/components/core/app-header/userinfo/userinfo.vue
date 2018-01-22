<style lang="less">
.avatar-uploader {
  display: inline-block;
}

// .el-upload {
//   border-radius: 4px;
//   cursor: pointer;
//   width: 100px;
//   height: 40px;
//   color: #fff;
//   line-height: 40px;
//   background-color: #20a0ff;
//   &:hover {
//     background: #4db3ff;
//   }
// }
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  display: inline-block;
}
</style>
<template>
  <div class="userinfo-container">
    <el-form :model="formLabelAlign" :rules="rules" ref="formLabelAlign" label-width="100px" class="demo-ruleForm">
      <el-form-item label="头像">
        <img :src="showPersonImgUrl||morenTUpian" class="avatar">
        <el-upload class="avatar-uploader" :action="myURL" :data="upLoadData" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <el-button size="small" type="primary">图片上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="formLabelAlign.realName"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="formLabelAlign.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formLabelAlign.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formLabelAlign')">保存</el-button>
        <el-button v-on:click="dialogHide('formLabelAlign')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import api from '@/api/api';
import util from '@/tools/util';

export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!(/^1[345789]\d{9}$/.test(value.replace(/\s+/g, '')))) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    const checkName = (rule, value, callback) => {
      if (!/^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z\d]+$/.test(value)) {
        callback(new Error('2-10个字符，以字母或汉字开头'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'right',
      myURL: '',
      morenTUpian: 'http://yfdev.img-cn-hangzhou.aliyuncs.com/avatar/housemarket/59080cf488b95826208eda75.png',
      upLoadData: {
        method: 'ads',
      },
      loading: false,
      rules: {
        realName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '2-10个字符，以字母或汉字开头', trigger: 'blur' },
          { validator: checkName, message: '2-10个字符，以字母或汉字开头', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请选择手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' },
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
        ],
      },
    };
  },
  props: ['personImg'],
  mounted() {
    const input = document.querySelector('.avatar-uploader input');
    input.setAttribute('name', 'myupload');
    this.myURL = '/datamarket/image/upload';
    // this.myURL = '/housemarket/image/upload?method=ads';
  },
  computed: {
    formLabelAlign() {
      return this.$store.state.user.userInfo;
    },
    showPersonImgUrl() {
      return this.personImg;
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res && res.response.data) {
        // this.loading = false;
        this.personImg = res.response.data;
        this.formLabelAlign.imgUrl = res.response.data;
      }
      if (res && res.response.errMsg) {
        this.$message.error(res.response.errMsg);
      }
    },
    beforeAvatarUpload(file) {
      // this.loading = true;
      const isLt2M = file.size / 1024 < 200;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过200kb!');
        // this.loading = false;
      }
      if (!file.type) {
        this.$message.error('图片格式不对!');
        // this.loading = false;
      }
      return isLt2M;
      // return isJPG && isLt2M;
    },
    submitForm(formName) {
      this.formLabelAlign.accountId = util.getCookie('accountId');
      this.formLabelAlign.adminId = util.getCookie('accountId');
      this.formLabelAlign.loginName = util.getCookie('loginName');
      delete this.formLabelAlign.roles;
      delete this.formLabelAlign.tags;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.user_saveUserEditedInfo(this.formLabelAlign)
            .then((res) => {
              if (res && res.data === 1) {
                this.$store.dispatch('GET_USER_INFO');
                this.$store.commit('SAVE_USER_IMG', this.formLabelAlign.imgUrl);
                // this.$store.commit('CTR_USERINFO_DIALOG_CLOSE');
                this.$emit('dialogClose');
                util.setCookie('phone', this.formLabelAlign.phone, 1);
                this.$message({
                  type: 'success',
                  message: '修改用户成功',
                  duration: 1000,
                });
              }
              if (res && res.errMsg) {
                this.$message({
                  type: 'error',
                  message: res.errMsg,
                  duration: 1000,
                });
              }
            });
        } else {
          this.$message({
            type: 'error',
            message: '请按规则填写',
            duration: 1000,
          });
        }
      });
    },
    dialogHide(formName) {
      this.$refs[formName].resetFields();
      // this.$store.commit('CTR_USERINFO_DIALOG_CLOSE');
      this.$emit('dialogClose');
    },
  },
};
</script>
