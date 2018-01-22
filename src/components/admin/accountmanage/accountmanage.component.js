// import Vue from 'vue';
import api from '@/api/api';
import util from '@/tools/util';
import { cloneDeep } from 'lodash';
import MD5 from 'md5';
// import myTable from '@/components/base/my-table';

/* eslint-disable  no-param-reassign*/
/* eslint-disable  consistent-return*/

export default {
  name: 'accountmanager',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.addNewUserForm.accountPwd) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    const validateEditPass = (rule, value, callback) => {
      if (value !== this.editUserForm.accountPwd) {
        callback(new Error('两次输入密码不一致'));
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
    const checkAccountName = (rule, value, callback) => {
      if (!/^[a-zA-Z]/.test(value)) {
        callback(new Error('2-10个字符，以字母开头'));
      } else {
        callback();
      }
    };
    return {
      responsible: '',
      totalDatas: 0,
      orderNum: null,
      dialogVisible: false,
      dialogVisible2: false,
      showAddNewUserList: false,
      editUserDialog: false,
      isUseBtnFlag: false, // 禁用按钮和启用按钮的显示
      isChangePsd: true, // 是否要修改密码
      editPsd: '',
      editPsdM: '',
      params: {
        currentPage: 1, // 当前是第多少页
        pages: 1, // 输入即将查询的页码
        totalDatas: null, // 总共多少条数据
        totalPages: 1, // 总页数
        pageSize: 10, // 每页显示多少条数据
        pagelist: [5, 10, 20], // 预定义的页码数组 这个可以进行抽离
        // adminId: util.getCookie('accountId'),
        adminId: util.getCookie('adminId') || util.getCookie('accountId'),
        accountId: util.getCookie('accountId'),
      },
      roleCtrList: [], // 用户角色权限列表
      roleListData: [],
      userList: {},
      checkList: [], // 用户角色权限列表 是否选中数组集合
      checkUserList: [],
      userListData: [],
      userRoleList: [], // 用户列表下面的角色列表
      addNewRoleForm: {
        roleName: '',
        roleDesc: '',
        // adminId: util.getCookie('accountId'),
        adminId: util.getCookie('adminId') || util.getCookie('accountId'),
        accountId: util.getCookie('accountId'),
      },
      editRoleForm: {
        roleName: '',
        roleDesc: '',
        adminId: util.getCookie('adminId') || util.getCookie('accountId'),
        accountId: util.getCookie('accountId'),
        // adminId: util.getCookie('accountId'),
      },
      addNewUserForm: {
        adminId: util.getCookie('adminId') || util.getCookie('accountId'),
        accountId: util.getCookie('accountId'),
      },
      editUserForm: {
        // mark: '',
      },
      rules: {},
      jsonUserList: [],
      // UserFormrules: {},
      saveEditedParams: null, // 编辑用户列表提交参数
      addNerFormsRules: {
        roleName: [
          { required: true, message: '角色不能为空', trigger: 'blur' },
          { min: 1, max: 15, message: '输入1-15个字符', trigger: 'blur' },
        ],
        roleDesc: [{ min: 0, max: 30, message: '输入0-30个字符', trigger: 'blur' }],
      },
      editRoleFormRules: {
        roleName: [
          { required: true, message: '角色不能为空', trigger: 'blur' },
          { min: 1, max: 15, message: '输入1-15个字符', trigger: 'blur' },
        ],
        roleDesc: [{ min: 0, max: 30, message: '输入0-30个字符', trigger: 'blur' }],
      },
      UserFormrules: {
        realName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '输入2-10个字符', trigger: 'blur' },
          { validator: checkName, message: '2-10个字符，以字母或汉字开头', trigger: 'blur' },
        ],
        accountName: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '2-10个字符，以字母开头', trigger: 'blur' },
          { validator: checkAccountName, trigger: 'blur' },
        ],
        accountPwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 35, message: '请输入6~35位的密码', trigger: 'blur' },
        ],
        accountPwdM: [
          { required: true, message: '重复密码不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 35, message: '请输入6~35位的密码', trigger: 'blur' },
        ],
        mark: [{ min: 0, max: 200, message: '备注信息，最大200个字符', trigger: 'blur' }],
        // roleCtr: [
        //   { required: true, message: '请选择角色' },
        // ],
      },
      UserFormrulesEdit: {
        realName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '输入2-10个字符', trigger: 'blur' },
          { validator: checkName, message: '2-10个字符，以字母或汉字开头', trigger: 'blur' },
        ],
        accountName: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '2-10个字符，以字母开头', trigger: 'blur' },
          { validator: checkAccountName, trigger: 'blur' },
        ],
        accountPwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 35, message: '请输入6~35位的密码', trigger: 'blur' },
        ],
        accountPwdM: [
          { required: true, message: '重复密码不能为空', trigger: 'blur' },
          { validator: validateEditPass, trigger: 'blur' },
          { min: 6, max: 35, message: '请输入6~35位的密码', trigger: 'blur' },
        ],
        mark: [{ min: 0, max: 200, message: '备注信息，最大200个字符', trigger: 'blur' }],
        // roleCtr: [
        //   { required: true, message: '请选择角色' },
        // ],
      },
    };
  },
  created() {
    this.getRoleList();
    this.getUsersList();
    this.getRoleCrt();
    this.getUserRoleList();
  },
  methods: {
    // 根据项目id 查角色列表
    getRoleList() {
      api
        .account_getRoleList({
          adminId: util.getCookie('adminId') || util.getCookie('accountId'),
          accountId: util.getCookie('accountId'),
        })
        .then((res) => {
          if (res && res.errMsg) {
            this.$message({
              message: res.errMsg,
              type: 'error',
              duration: 1000,
            });
          }
          if (res && res.data) {
            this.pushIndexOrderInData(res.data);
            this.roleListData = res.data;
          }
        });
    },
    // 根据账号id查用户列表
    getUsersList() {
      api.account_getUserList(this.params).then((res) => {
        if (res && res.errMsg) {
          this.$message({
            message: res.errMsg,
            type: 'error',
            duration: 1000,
          });
        }
        if (res && res.data) {
          res.data.dataList.forEach((v) => {
            if (v.lastUpdateTime) {
              v.lastUpdateTime = util.formatDate(v.lastUpdateTime);
              return v;
            }
          });
          this.pushIndexOrderInData(res.data.dataList);
          this.userListData = res.data.dataList;
          this.params.totalDatas = Number(res.data.totalDatas);
        }
      });
    },
    // 处理列表中的序号问题
    pushIndexOrderInData(data) {
      data.forEach((item, index) => {
        const temp = item;
        temp.orderIndex =
          index + 1 + (this.params.currentPage - 1) * this.params.pageSize;
        return temp;
      });
    },
    // 编辑角色列表
    editRoleList(index, tabledata) {
      this.checkList = [];
      this.editRoleForm.roleName = tabledata[index].roleName;
      this.editRoleForm.roleDesc = tabledata[index].roleDesc;
      this.editRoleForm.roleId = tabledata[index].roleId;
      this.dialogVisible2 = true;
      if (!tabledata[index].menus) {
        return;
      }
      tabledata[index].menus.forEach((value) => {
        this.checkList.push(value.menuPid);
      });
      // api.account_getRoleCtrOne({ roleId: tabledata[index].roleId })
      //   .then((res) => {
      //     if (res && res.errMsg) {
      //       this.$message({
      //         message: res.errMsg,
      //         type: 'error',
      //         duration: 1000,
      //       });
      //     }
      //     if (res && res.data) {
      //       res.data.forEach((value) => {
      //         this.checkList.push(value.menuId);
      //       });
      //     }
      //   });
    },
    // 新增角色列表
    addNewRoleList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.account_addNewRole(this.addNewRoleForm).then((respond) => {
            if (respond && respond.status === 'success') {
              this.$message({
                message: '新增角色成功',
                type: 'success',
                duration: 1000,
              });
              this.$refs.addNewRoleForm.resetFields();
              this.getRoleList();
              this.dialogVisible = false;
            }
            if (respond && respond.errMsg) {
              this.$message.error(respond.errMsg);
            }
          });
        } else {
          this.$message({
            message: '请按规则填写',
            type: 'error',
            duration: 1000,
          });
          return false;
        }
      });
    },
    // 删除角色列表
    deleteRole(index, data) {
      this.$confirm('是否删除角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api.account_deleteRole({ roleId: data[index].roleId }).then((res) => {
            if (res && res.status === 'success') {
              this.$message({
                type: 'success',
                message: '删除角色成功!',
                duration: 1000,
              });
              this.getRoleList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000,
          });
        });
    },
    getRoleCrt() {
      api
        .account_showRoleCtr({})
        .then((res) => {
          if (res && res.status === 'success') {
            this.roleCtrList = res.data;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    sumitChaneRole(formName) {
      console.log(this.checkList.length);
      if (!this.checkList.length) {
        this.$message({
          type: 'error',
          message: '请选择至少一个权限',
          duration: 1000,
        });
        return;
      }
      const jsonMenuList = [];
      this.roleCtrList.forEach((item) => {
        this.checkList.forEach((v) => {
          if (item.menuId === v) {
            const obj = {
              menuId: item.menuId,
              menuTitle: item.menuTitle,
            };
            jsonMenuList.push(obj);
          }
        });
      });
      this.editRoleForm.jsonMenuList = JSON.stringify(jsonMenuList);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api
            .account_EditRole(this.editRoleForm)
            .then((res) => {
              if (res && res.errMsg) {
                this.$message.error(res.errMsg);
              }
              if (res && res.status === 'success') {
                this.$message({
                  type: 'success',
                  message: '编辑角色成功!',
                  duration: 1000,
                });
                this.getRoleList();
                this.$store.dispatch('GET_ROUTER_LIST');

                this.dialogVisible2 = false;
              }
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: err,
                duration: 1000,
              });
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
    getUserRoleList() {
      api
        .account_getUserRoleList({ adminId: util.getCookie('adminId') || util.getCookie('accountId'),
          accountId: util.getCookie('accountId') })
        .then((res) => {
          if (res && res.status === 'success') {
            this.userRoleList = res.data;
          }
          if (res && res.errMsg) {
            this.$message({
              type: 'error',
              message: res.errMsg,
              duration: 1000,
            });
          }
        });
    },
    // 用户列表 新增用户
    addnewRoleDialogShow() {
      this.getUserRoleList();
      this.showAddNewUserList = true;
      this.checkUserList = [];
    },
    // 用户列表 编辑用户
    editUser(index, row) {
      this.getUserRoleList();
      this.isChangePsd = true;
      this.checkUserList = [];
      this.editUserForm.realName = row.realName;
      this.editUserForm.accountName = row.accountName;
      this.editUserForm.accountPwdM = row.accountPwd;
      this.editUserForm.accountPwd = row.accountPwd;
      this.editUserForm.mark = row.mark;
      this.editUserForm.accountId = row.accountId;
      this.editPsd = this.editUserForm.accountPwd;
      this.editPsdM = this.editUserForm.accountPwdM;
      api.account_findUserRole({ accountId: row.accountId }).then((res) => {
        if (res && res.errMsg) {
          this.$message({
            type: 'error',
            message: res.errMsg,
            duration: 1000,
          });
        }
        this.editUserDialog = true;
        if (res && res.data) {
          if (!res.data.length) {
            return;
          }
          res.data.forEach((value) => {
            this.checkUserList.push(value.roleId);
          });
        }
      });
    },
    // 用户列表 新增保存按钮触发事件
    commitAddUser(formName) {
      if (!this.checkUserList.length) {
        this.$message({
          message: '请选择至少一个角色',
          type: 'error',
          duration: 1000,
        });
        return;
      }
      this.getjsonUserList();
      this.addNewUserForm.jsonRoles = JSON.stringify(this.jsonUserList);
      // this.addNewUserForm.adminId = util.getCookie('accountId');
      this.addNewUserForm.projectName = util.getCookie('projectName');
      const commitParams = cloneDeep(this.addNewUserForm);
      if (commitParams.accountPwd) {
        commitParams.accountPwd = MD5(commitParams.accountPwd);
      }
      if (commitParams.accountPwdM) {
        commitParams.accountPwdM = MD5(commitParams.accountPwdM);
      }
      commitParams.loginId = util.getCookie('accountId');
      commitParams.loginName = util.getCookie('realName');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.account_AddUser(commitParams).then((res) => {
            if (res && res.status === 'success') {
              this.$message({
                type: 'success',
                message: '新增用户成功',
                duration: 1000,
              });
              this.$refs.addNewUserForm.resetFields();
              this.checkUserList = [];
              this.getUsersList();
              this.showAddNewUserList = false;
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
    getjsonUserList() {
      this.jsonUserList = [];
      this.userRoleList.forEach((item) => {
        this.checkUserList.forEach((v) => {
          if (item.roleId === v) {
            const obj = {
              roleId: item.roleId,
              roleName: item.roleName,
            };
            this.jsonUserList.push(obj);
          }
        });
      });
    },
    // 用户列表 编辑用户 保存
    saveEditedUse(formName) {
      if (!this.checkUserList.length) {
        this.$message({
          message: '请选择至少一个角色',
          type: 'error',
          duration: 1000,
        });
        return;
      }
      this.getjsonUserList();
      this.editUserForm.jsonRoles = JSON.stringify(this.jsonUserList);
      // this.editUserForm.projectId = util.getCookie('projectId');
      // this.editUserForm.projectName = util.getCookie('projectName');
      this.editUserForm.loginId = util.getCookie('accountId');
      // this.editUserForm.adminId = util.getCookie('accountId');
      this.editUserForm.loginName = util.getCookie('realName');
      if (
        this.editPsd !== this.editUserForm.accountPwd ||
        this.editPsdM !== this.editUserForm.accountPwdM
      ) {
        this.saveEditedParams = cloneDeep(this.editUserForm);
        this.saveEditedParams.accountPwd = MD5(
          this.saveEditedParams.accountPwd,
        );
        this.saveEditedParams.accountPwdM = MD5(
          this.saveEditedParams.accountPwdM,
        );
      } else {
        this.saveEditedParams = cloneDeep(this.editUserForm);
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.account_EidtUserListOne(this.saveEditedParams).then((res) => {
            if (res && res.status === 'success') {
              this.$message({
                type: 'success',
                message: '修改用户成功',
                duration: 1000,
              });
              this.getUsersList();
              this.$store.dispatch('GET_ROUTER_LIST');
              // 更新账户个人信息
              this.$store.dispatch('GET_USER_INFO');
              this.editUserDialog = false;
            }
            if (res && res.errMsg) {
              this.$message.error(res.errMsg);
            }
          });
        } else {
          this.$message({
            message: '请按规则填写',
            type: 'error',
            duration: 1000,
          });
        }
      });
    },
    deleteUserListOne(index, item) {
      this.$confirm('是否删除用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api
            .account_deleteUserListOne({ accountId: item.accountId })
            .then((res) => {
              if (res && res.status === 'success') {
                this.$message({
                  type: 'success',
                  message: '删除用户成功!',
                  duration: 1000,
                });
                this.getUsersList();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000,
          });
        });
    },
    knockUser(index, item) {
      this.$confirm('是否禁用该用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api
            .account_knockedUserListOne({
              accountId: item.accountId,
              loginId: util.getCookie('accountId'),
              loginName: util.getCookie('realName'),
            })
            .then((res) => {
              if (res && res.status === 'success') {
                this.isUseBtnFlag = true;
                this.$message({
                  type: 'success',
                  message: '禁用用户成功!',
                  duration: 1000,
                });
                this.getUsersList();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用',
            duration: 1000,
          });
        });
    },
    // 解锁用户
    unKnockUser(index, item) {
      this.$confirm('是否解锁该用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api
            .account_unKnockedUserListOne({
              accountId: item.accountId,
              loginId: util.getCookie('accountId'),
              loginName: util.getCookie('realName'),
            })
            .then((res) => {
              if (res && res.status === 'success') {
                this.$message({
                  type: 'success',
                  message: '解锁成功!',
                  duration: 1000,
                });
                this.getUsersList();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解锁',
            duration: 1000,
          });
        });
    },
    clickChangePsd() {
      this.isChangePsd = false;
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getUsersList();
    },
    handleCurrentChange(val) {
      this.params.currentPage = val;
      this.getUsersList();
    },
  },
};
