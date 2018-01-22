<style lang="less">
.info-setting {
  .el-dialog {
    width: 500px;
  }
  .el-tabs__content {
    width: 80%;
  }
}
</style>
<template>
  <div class="password-container">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px">
      <el-form-item label="旧密码"
                    prop="oldPassword">
        <el-input v-model="ruleForm.oldPassword"
                  type="password"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="newPassword">
        <el-input type="password"
                  v-model="ruleForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="confirmPassword">
        <el-input type="password"
                  v-model="ruleForm.confirmPassword"></el-input>
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="dialogHide('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MD5 from 'md5';
import api from '@/api/api';
import util from '@/tools/util';
import { cloneDeep } from 'lodash';

export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        loginName: util.getCookie('realName'),
        loginId: util.getCookie('accountId'),
        accountName: util.getCookie('loginName'),
      },
      rules: {
        oldPassword: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' },
          { min: 6, max: 35, message: '请输入6~35位的密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 35, message: '请输入6~35位的密码', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '重复密码不能为空', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      const changekeyParams = cloneDeep(this.ruleForm);
      changekeyParams.oldPassword = MD5(changekeyParams.oldPassword.toString());
      changekeyParams.newPassword = MD5(changekeyParams.newPassword.toString());
      changekeyParams.confirmPassword = MD5(changekeyParams.confirmPassword.toString());
      this.$refs[formName].validate((valid) => {
        // const params = Object.assign(this.changekeyParams,this.ruleForm)
        if (valid) {
          api.user_changeUserPsd(changekeyParams)
            .then((respond) => {
              if (respond.status === 'success') {
                this.$refs[formName].resetFields();
                // this.$store.commit('CTR_USERINFO_DIALOG_CLOSE');
                this.$emit('dialogClose');
                this.$message({
                  type: 'success',
                  message: '修改密码成功',
                  duration: 1000,
                });
              }
              if (respond.errMsg) {
                this.$message({
                  type: 'error',
                  message: respond.errMsg,
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
      // this.$store.commit('CTR_USERINFO_DIALOG_CLOSE');
      this.$emit('dialogClose');
      this.$refs[formName].resetFields();
      // this.$emit('dialogHide');
    },
  },
};
</script>
