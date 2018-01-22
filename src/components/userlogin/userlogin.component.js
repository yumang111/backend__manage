// const base = '';
// const requestLogin = params => { return axios.post(`${base}/login`,
// params).then(res => res.data); };
// import store from '@/store/index';
// import * as actionTypes from '@/store/action-types';

import util from '@/tools/util';

export default {
  data() {
    return {
      logining: false,
      isUserNameErr: false,
      isKeyWordErr: false,
      ruleForm2: {
        loginName: util.getCookie('loginName'),
        password: '',
      },
      rules2: {
        loginName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
      checked: true,
    };
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName]
        .validate((valid) => {
          let result;
          if (valid) {
            result = true;
            this.logining = true;
            this.$store
              .dispatch('USER_LOGIN', this.ruleForm2)
              .then((res) => {
                if (res && res.status === 'success') {
                  this.logining = false;
                }
              })
              .catch((errMsg) => {
                this.logining = false;
                this.$message.error(errMsg);
              });
          } else {
            result = false;
          }
          return result;
        });
    },
  },
};

