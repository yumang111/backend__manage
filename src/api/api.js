import yfHttps from '@/tools/yfHttps';

export default {
  // 用户登陆
  userLoginIn(params) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.account.login', params);
  },
  userAutoLogin(param) {
    return yfHttps.ajaxJsonp('API_ROOT_UC',
      'ucaction.yfbaouser.autologin', param);
  },
  // 获取用户信息
  user_getUserInfo(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.account.getaccountinfo', param);
  },
  // 修改密码
  user_changeUserPsd(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.account.modpassword', param);
  },
  // 点击头像编辑用户信息 保存
  user_saveUserEditedInfo(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.account.modaccount', param);
  },
  project_getParamsData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.project.showprojectinfo', param);
  },
  // 项目参数设置 修改项目名称
  project_changeProJectName(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.project.modifyname', param);
  },
  // 项目参数设置 增加关键字
  project_addShortKey(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.project.setprojectkey', param);
  },
  // 项目参数设置 增加关键字 后刷新页面 展示关键字
  project_showShortKey(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.project.showprojectkey', param);
  },
  // 项目参数设置 增加销售电话
  project_addphoneNum(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.project.setprojectlandline', param);
  },
  // 项目参数设置 增加销售电话后刷新页面
  project_showPhoneNum(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.project.showprojectlandline', param);
  },
  // 账号管理 展示角色列表和用户列表
  account_showRoleAndUserList(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.showaccandrolelist', param);
  },
  // 账号管理 新增角色
  account_addNewRole(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.addrole', param);
  },
  // 账号管理 删除角色
  account_deleteRole(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.delrole', param);
  },
  // 账号管理 编辑角色列表
  account_EditRole(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.modrole', param);
  },
  // 账号管理 编辑角色列表 ---该角色所有权限checkbox
  account_showRoleCtr(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.showallmenu', param);
  },
  // 账号管理 编辑角色列表 ---该角色的权限checkbox
  // account_getRoleCtrOne(param) {
  //   return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
  //     'datamarket.accountmanage.showrolemenulist', param);
  // },
  // 获取左侧路由菜单列表
  account_showMenuList(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.account.showmenulist', param);
  },
  // 账号管理 获取用户列表 下面的角色列表
  account_getUserRoleList(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.showrolelist', param);
  },
  // 账号管理 角色列表
  account_getRoleList(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.showrolelist', param);
  },
  // 账号管理 用户列表
  account_getUserList(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.showaccountlist', param);
  },
  // 账号管理 用户列表 新增用户
  account_AddUser(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.addaccount', param);
  },
  // 账号管理 查询表格中每一个用户拥有的角色
  account_findUserRole(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.showrolesofaccount', param);
  },
  // 账号管理 修改用户列表中数据
  account_EidtUserListOne(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.modaccount', param);
  },
  // 账号管理 删除用户列表中数据
  account_deleteUserListOne(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.delaccount', param);
  },
  // 账号管理 锁定用户列表中数据
  account_knockedUserListOne(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.lockaccount', param);
  },
  // 账号管理 解锁用户列表中数据
  account_unKnockedUserListOne(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accountmanage.unlockaccount', param);
  },
  // 使用统计 获取图表内容
  usecount_getCustonCountChartData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.countbyprojectid', param);
  },
  // 使用统计 获取下方表格数据展示
  usecount_getCustonTableListData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.showanalysecustomerlist', param);
  },
  // 客户画像 获取性别比列图表信息
  useimg_getSexBiliChartsData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.countcustomersex', param);
  },
  // 客户画像 获取婚否比例图表数据
  useimg_getIsMarriedData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.countcusmaritalstatus', param);
  },
  // 客户画像 获取年龄图表的数据
  useimg_getAgeLineData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.countcustomerage', param);
  },
  // 客户画像 获取月收入
  useimg_getMonthSalaryData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.countcusincome', param);
  },
  // 客户画像 获取月花销
  useimg_getMonthWasteData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.countcusoutcome', param);
  },
  // 项目热度 楼盘浏览热度趋势数据获取
  projecthot_getHouseViewCount(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.projecthot.browseprojectreport', param);
  },
  // 项目热度 楼盘热度搜索趋势
  projecthot_getHouseSearchCount(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.projecthot.searchprojectreport', param);
  },
  // 客户管理信息列表
  project_getCustomerAllotData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerallocation.showcustomerlist', param);
  },
  // 获得客户分配信息
  customer_getAllotInfo(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerallocation.showaccountcuslist', param);
  },
  // 分配操作
  customer_allotAct(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerallocation.allocatecuscomer', param);
  },
  // 获取无效原因数据
  customer_invalidReasonData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerallocation.showreasonenum', param);
  },
  // 提交无效原因
  customer_submintInvalid(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerallocation.submitreasonfornoeffectcus', param);
  },
  // 统计项目下今天新增客户(未分配)
  customer_getAddCustomerToday(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerallocation.countcurnewcustomer', param);
  },
  // 统计项目下总共未分配的客户数
  customer_getAddCustomerUnallot(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerallocation.countunconfirmcustomer', param);
  },
  // 客户跟踪我的客户接口
  customer_followingData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerflowing.showmycustomerlist', param);
  },
  // 客户跟踪公共客户接口
  customer_followingCommonData(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerflowing.showcommoncustomerlist', param);
  },
  // 统计项目下业务员跟进中的客户数
  customer_followingNum(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerflowing.countflowingcustomer', param);
  },
  // 统计项目下业务员成交的客户数
  customer_followingDealedNum(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerflowing.countclosedcustomer', param);
  },
  // 从公共客户列表中领取客户
  customer_getCommon(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerflowing.confirmcustomerfromcommon', param);
  },
  // 客户跟进明细
  customer_followingDetail(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerflowing.showlogdetail', param);
  },
  // 新增客户
  customer_add(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerflowing.addcustomer', param);
  },
  // 查看客户详细
  customer_infoDetail(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.showcustomerdetail', param);
  },
  // 展现项目的所有客户标签
  customer_allLableList(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.showtaglist', param);
  },
  // 客户详情保存
  customer_saveLableList(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.accesscustomer', param);
  },
  // 批量分配
  customer_batchAllot(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerallocation.batchallocatecuscomer', param);
  },
  // 客户分配统计数量
  customer_customerNum(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerallocation.count', param);
  },
  // 客户跟进统计数量
  customer_FollowingDataNum(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerflowing.count', param);
  },
  // 修改项目下客户的意向统计
  customer_accountWilling(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.modcustomerintention', param);
  },
  // 致电
  customer_call(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customer.call', param);
  },
 //  账号标签
  getAccountTags(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.accounttags.show', param);
  },
  // 激活号码
  activedPhone(param) {
    return yfHttps.ajaxJsonp('API_ROOT_LOCAL',
      'datamarket.customerallocation.activePhone', param);
  },
};
