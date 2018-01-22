import api from '@/api/api';
// import { Loading } from 'element-ui';
/* eslint-disable */
import { cloneDeep } from 'lodash';
import util from '@/tools/util';

export default {
  name: 'paramset',
  data() {
    const checkShortKey = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('关键字不能为空'));
      }
      setTimeout(() => {
        if (value.length > 20) {
          callback(new Error('请不要超过20字'));
        } else {
          callback();
        }
      }, 1000);
    };
    const checkCallNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话号码不能为空'));
      }
      setTimeout(() => {
        if (value.length > 15) {
          callback(new Error('请不要超过15字'));
        } else if (!/^\d+$/g.test(value)) {
          return callback(new Error('只能输入数字'));
        } else {
          callback();
        }
      }, 1000);
    };
    const checkProjectName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('楼盘名称不能为空'));
      }
      setTimeout(() => {
        if (value.length > 50) {
          callback(new Error('请不要超过50字'));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      dialogVisible: false,
      showKeyWordDialog: false,
      isItemNameChange: false,
      showPhoneDialog: false,
      isDisabled: false, // 表单是否被禁用
      projectId: util.getCookie('projectId'),
      checkSky: checkShortKey,
      checkpNum: checkCallNum,
      checkHname: checkProjectName,
      paramsetData: {},
      keyWordForm: {
        keyWordData: [{
          keyValue: '',
          keyId: '',
        }],
      },
      phoneNumeForm: {
        phoneNumeData: [{
          landLineNo: '',
        }],
      },
      numberValidateForm: {
        projectName: '',
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      api.project_getParamsData({ projectId: this.projectId })
        .then((respond) => {
          if (respond && respond.data) {
            this.numberValidateForm.projectName = respond.data.projectName;
            this.paramsetData = respond.data;
            this.isDisabled = true;
          } else {
            this.isDisabled = false;
          }
        });
    },
    showErrorMsg(errorMsg) {
      this.$message({
        type: 'error',
        message: errorMsg,
        duration: 1000,
      });
    },
    showDialogSetData() {
      this.dialogVisible = true;
      this.keyWordForm.keyWordData = cloneDeep(this.paramsetData.projectKeys);
    },
    removeShortKey(item) {
      const index = this.keyWordForm.keyWordData.indexOf(item);
      if (index !== -1) {
        this.keyWordForm.keyWordData.splice(index, 1);
      }
    },
    // 保存关键字
    addShortKey() {
      this.keyWordForm.keyWordData.push({
        keyValue: '',
      });
    },
    saveShortKey(formName) {
      const sumbitData = [];
      this.keyWordForm.keyWordData.forEach((v) => {
        for (const i in v) {
          if (i === 'keyValue') {
            const obj = {};
            obj.projectKey = v[i];
            sumbitData.push(obj);
          }
        }
      });
      if (!sumbitData.length) {
        this.showErrorMsg('关键字不能为空');
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            jsonProjectKey: JSON.stringify(sumbitData),
            projectName: this.paramsetData.projectName,
            projectId: this.paramsetData.projectId,
          };
          api.project_addShortKey(params)
            .then((respond) => {
              if (respond.status === 'success') {
                this.$message({
                  type: 'success',
                  message: '设置关键字成功',
                  duration: 1000,
                });
                this.dialogVisible = false;
                return api.project_showShortKey({ projectId: this.paramsetData.projectId });
              }
              if (respond && respond.errMsg) {
                this.showErrorMsg(respond.errMsg);
              }
            })
            .then((data) => {
              if (data && data.data) {
                this.paramsetData.projectKeys = data.data;
              }
              if (data && data.errMsg) {
                this.showErrorMsg(data.errMsg);
              }
            });
        } else {
          this.showErrorMsg('请规则填写');
        }
      });
    },
    changeItemName() {
      this.isItemNameChange = true;
      this.isDisabled = false;
    },
    saveItemName(formName) {
      if (this.paramsetData.projectName === this.numberValidateForm.projectName) {
        this.isItemNameChange = false;
        this.isDisabled = true;
        return false;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            projectId: this.paramsetData.projectId,
            projectName: this.numberValidateForm.projectName,
          };
          api.project_changeProJectName(params)
            .then((respond) => {
              if (respond && respond.data === 1) {
                this.$message({
                  type: 'success',
                  message: '修改项目名称成功',
                  duration: 1000,
                });
                this.paramsetData.projectName = params.projectName;
                util.setCookie('projectName', params.projectName, 1);
                this.isItemNameChange = false;
                this.isDisabled = true;
              }
              if (respond && respond.errMsg) {
                this.showErrorMsg(respond.errMsg);
              }
            });
        } else {
          this.showErrorMsg('请规则填写');
        }
      });
    },
    setPhoneNum() {
      this.phoneNumeForm.phoneNumeData = cloneDeep(this.paramsetData.projectLandlines);
      this.showPhoneDialog = true;
    },
    removePhoneNum(item) {
      const index = this.phoneNumeForm.phoneNumeData.indexOf(item);
      if (index !== -1) {
        this.phoneNumeForm.phoneNumeData.splice(index, 1);
      }
    },
    addPhoneNum() {
      this.phoneNumeForm.phoneNumeData.push({
        landLineNo: '',
        key: Date.now(),
      });
    },
    savePNum(formName) {
      const sumbitData = [];
      this.phoneNumeForm.phoneNumeData.forEach((v) => {
        for (const i in v) {
          if (i === 'landLineNo') {
            const obj = {};
            obj.projectLandLine = v[i];
            sumbitData.push(obj);
          }
        }
      });
      if (!sumbitData.length) {
        this.showErrorMsg('销售电话不能为空');
        return;
      }
      this.$refs[formName].validate((valid) => {
        const params = {
          jsonProjectLandLine: JSON.stringify(sumbitData),
          projectId: this.paramsetData.projectId,
          projectName: this.numberValidateForm.projectName,
        }
        if (valid) {
          api.project_addphoneNum(params)
            .then((respond) => {
              if (respond.status === 'success') {
                this.$message({
                  type: 'success',
                  message: '设置销售电话成功',
                  duration: 1000,
                });
                this.showPhoneDialog = false;
                return api.project_showPhoneNum({ projectId: this.paramsetData.projectId });
              }
              if (respond && respond.errMsg) {
                this.showErrorMsg(respond.errMsg);
              }
            })
            .then((respond) => {
              if (respond && respond.data) {
                this.paramsetData.projectLandlines = respond.data;
              }
              if (respond && respond.errMsg) {
                this.showErrorMsg(respond.errMsg);
              }
            });
        } else {
          this.showErrorMsg('请规则填写')
        }
      });
    },
  },
};
