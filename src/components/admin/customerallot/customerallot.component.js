//= ==========================
/* eslint-disable */
import api from "@/api/api";
import util from "@/tools/util";
import userDetail from "@/components/core/customerdetail/customerdetail.vue";

export default {
  name: "customerallot",
  data() {
    const validateOtherReason = (rule, value, callback) => {
      if (
        this.invalidReasonForm.checkValue === "2" &&
        this.invalidReasonForm.otherReasonValue.replace(/\s+/g, "") === ""
      ) {
        callback(new Error("其它原因不能为空"));
      } else if (
        this.invalidReasonForm.checkValue === "2" &&
        this.invalidReasonForm.otherReasonValue.replace(/\s+/g, "").length > 50
      ) {
        callback(new Error("请不要超过50字！"));
      } else {
        callback();
      }
    };
    return {
      concatList: [{
          type: '0',
          value: '未联系'
        },
        {
          type: '1',
          value: '未接通'
        },
        {
          type: '2',
          value: '已接通'
        }
      ], // 联系状态列表
      demendList: [{
          type: '0',
          value: '有需求'
        },
        {
          type: '1',
          value: '无需求'
        },
        {
          type: '2',
          value: '不匹配'
        }
      ], // 联系状态列表
      channelType: '',
      occurTimeBegin: '',
      occurTimeEnd: '',
      occurTimeValue: '', // 行为时间
      channelValue: [], // 渠道
      channelList: [{
          value: '0',
          label: '0' // excel导入
        },
        {
          value: '1',
          label: '1' // 土巴兔
        },
        {
          value: '2',
          label: '2' // 齐家
        },
        {
          value: '3',
          label: '3' // 土拨鼠
        },
        {
          value: '4',
          label: '4' // 其他
        }
      ], // 渠道列表
      followingData: [],
      progressData: [],
      curIndex: 0, //页面类型 0待确认 1已确认
      activeName: "first", //tab切换，页面面板name
      mycustomerData: [], //客户分配数据列表
      searchConditions: [],
      waitingSureNum: "",
      suredNum: "",
      invalidNum: "",
      pageSize: 10,
      totalDatas: 0,
      allotLoading: true,
      pagesShow: false,
      batchChoseFlag: false,
      customerIdSave: "",
      closeFlagvalue: 0,
      followProgressVisible: false,
      todayAddNum: 0,
      totalUnallotNum: 0,
      itentionInit: "",
      isBatchFlag: false,
      customerId: "",
      customerIdArr: [],
      customerDetailInfo: {},
      markPhonechange: "",
      alreadyDispatch: [], // 已分配 时间选择数组
      alreadystarttime: "",
      alreadyendtime: "",
      // nouserCustomerTime:[], // 无效客户时间查询
      markPhonechangeFlag: false,
      changeWillCreateTime: "",
      searchConditionsValue: [],
      allotCustomerData: [], //分配弹窗列表
      allotSearchCondition: {
        //搜索条件
        startTime: "",
        endTime: "",
        accountName: '',
        responsible: "",
        contactFlag: '',
        phone: "",
        demandId: '',
        closedFlag: ''
      },
      tempObjId: {}, //详情列表各项id值
      tempObjShow: {}, //详情列表各项是否存在值集合
      radio2: "",
      formInline: {
        user: "",
        region: "",
        checked: true
      },
      invalidReasonList: {
        checkValue: "",
        otherId: "",
        checkOptions: ["太贵", "太偏", "太简陋", "不方便", "其它原因"]
      },
      invalidReasonForm: {
        checkValue: "",
        otherReasonValue: ""
      },
      rules: {
        checkValue: [{
          required: true,
          message: "无效原因不能为空",
          trigger: "blur"
        }],
        otherReasonValue: [{
          validator: validateOtherReason,
          trigger: "blur"
        }]
      },
      sdialogShow: false,
      dialogShow: false,
      invalidReason: false,
      currentPage: 1,
      beforeStatus: "",
      afterStatus: "",
      options: [{
          //是否有效字段
          value: 0,
          label: "有效"
        },
        {
          value: 1,
          label: "无效"
        }
      ]
    };
  },
  created() {
    this.allotTab();
    this.getCustomerNumInfo();
    this.getTabNum();
  },
  methods: {
    formatterExactTime(time) {
      if (time) {
        return time.slice(0, 4) + '-' + time.slice(4, 6) + '-' + time.slice(6, 8) +
          '\n' + time.slice(8, 10) + ':' + time.slice(10, 12) + ':' + time.slice(12, 14)
      }
    },
    formatterTime(time) {
      if (time) {
        return time.slice(0, 4) + '-' + time.slice(4, 6) + '-' + time.slice(6, 8)
      }
    },
    formatterContact(type) {
      if (type) {
        return this.concatList.find(v => v.type === type).value
      }
    },
    formatterDemend(type) {
      if (type) {
        return this.demendList.find(v => v.type === type).value
      }
    },
    search() {
      this.checkAllotTab();
    },
    channelSelect(value) {
      if (value.length) {
        this.channelType = value.join(',')
      } else {
        this.channelType = ''
      }
    },
    occurTimeSelect(value) {
      if (value) {
        this.occurTimeBegin = value.trim().slice(0, 10).replace(/-/g, '')
        this.occurTimeEnd = value.trim().slice(-10).replace(/-/g, '')
      } else {
        this.occurTimeBegin = ''
        this.occurTimeEnd = ''
      }
    },
    //获取今天新增客户数量以及未分配数量
    getCustomerNumInfo() {
      const param = {
        // adminId: util.getCookie("accountId") || 1
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId")
      };
      api.customer_getAddCustomerUnallot(param).then(respond => {
        if (respond.status === "success") {
          this.totalUnallotNum = respond.data;
        }
      });
      api.customer_getAddCustomerToday(param).then(respond => {
        if (respond.status === "success") {
          this.todayAddNum = respond.data;
        }
      });
    },
    //点击详情按钮
    handleEdit(row) {
      this.customerInfoId = row.customerId; //传给子组件
      // this.followLoading = true;
      this.dialogShow = true;
      this.customerIdSave = row.customerId;
    },
    //获取tab页签名
    getTabNum() {
      const param = {
        // adminId: util.getCookie("accountId") || ""
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId")
      };
      api.customer_customerNum(param).then(respond => {
        if (respond.status === "success") {
          this.waitingSureNum = "待分配 (" + respond.data[0] + ")";
          this.suredNum = "已分配 (" + respond.data[1] + ")";
          this.invalidNum = "无效客户 (" + respond.data[2] + ")";
        }
      });
    },
    //改变一页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.allotTab();
      console.log(`每页 ${val} 条`);
    },
    //改变当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.allotTab();
    },
    searchTimeValue(value) {
      if (value) {
        var arr = value.split(" - ");
        this.alreadystarttime = arr[0]
          .replace(/\//g, "-")
          .replace(/\s+/g, "")
          .replace(/\:+/g, "")
          .replace(/\-/g, "");
        this.alreadyendtime = arr[1]
          .replace(/\//g, "-")
          .replace(/\s+/g, "")
          .replace(/\:+/g, "")
          .replace(/\-/g, "");
        console.log(this.alreadystarttime);
      } else {
        // this.statsTime = "";
        this.alreadystarttime = "";
        this.alreadyendtime = "";
      }
    },
    searchAction() {
      this.allotTab();
    },
    //分配操作
    handleSdialog(item) {
      this.isBatchFlag = false;
      if (item) {
        this.customerId = item.customerId;
      }
      const param = {
        // adminId: util.getCookie("accountId") || ""
        customerId: this.customerId,
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId")
      };
      api.customer_getAllotInfo(param).then(respond => {
        if (respond.status === "success") {
          this.allotCustomerData = respond.data;
          this.getTabNum();
        }
      });
      this.sdialogShow = true;
    },
    // 页面tab切换获取客户分配列表数据
    allotTab(num) {
      this.allotLoading = true;
      if (num == 1) {
        //有参数1时代码tab切换，此时要清空筛选条件
        this.alreadystarttime = "";
        this.alreadyendtime = "";
        this.alreadysearchAction = "";
        this.allotSearchCondition.accountName = "";
        this.allotSearchCondition.responsible = "";
        this.allotSearchCondition.phone = '';
        this.allotSearchCondition.contactFlag = '';
        this.allotSearchCondition.demandId = '';
        this.allotSearchCondition.closedFlag = '';
        this.alreadyDispatch = [];
        this.occurTimeValue = '' // 筛选框值 - 筛选条件值都清空
        this.occurTimeBegin = ''
        this.occurTimeEnd = ''
        this.channelValue = []
        this.channelType = ''
        if (this.currentPage === 1) {
          this.checkAllotTab();
        } else {
          this.currentPage = 1; //若currentPage变化会自动调用this.handleCurrentChange
        }
      } else {
        this.checkAllotTab();
      }
    },
    checkAllotTab() {
      if (this.activeName === "third") {
        this.getFollowingCommon();
      } else {
        if (this.activeName === "first") {
          this.curIndex = 0;
        } else if (this.activeName === "second") {
          this.curIndex = 1;
        }
        let param = {
          // adminId: util.getCookie("accountId") || "",
          adminId: util.getCookie("adminId") || util.getCookie("accountId"),
          accountId: util.getCookie("accountId"),
          assignedFlag: this.curIndex,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          startTime: this.alreadystarttime,
          endTime: this.alreadyendtime,
          accountName: this.allotSearchCondition.accountName,
          lastUpdateAccount: this.allotSearchCondition.responsible,
          contactFlag: this.allotSearchCondition.contactFlag,
          phone: this.allotSearchCondition.phone,
          demandId: this.allotSearchCondition.demandId,
          closedFlag: this.allotSearchCondition.closedFlag,
          // searchConditions: this.searchConditionsValue,
          occurTimeBegin: this.occurTimeBegin,
          occurTimeEnd: this.occurTimeEnd,
          channelType: this.channelType
        };
        // param = Object.assign(param, this.allotSearchCondition)
        console.log(param, 'checkAllotTab')
        api.project_getCustomerAllotData(param).then(respond => {
          if (respond.status === "success") {
            this.totalDatas = Number(respond.data.totalDatas);
            if (respond.data.dataList.length > 0) {
              for (let i = 0; i < respond.data.dataList.length; i++) {
                // if (respond.data.dataList[i].sex == 0) {
                //   respond.data.dataList[i].sex = "未知"
                // } else if (respond.data.dataList[i].sex == 1) {
                //   respond.data.dataList[i].sex = "男"
                // } else {
                //   respond.data.dataList[i].sex = "女"
                // }
                respond.data.dataList[i].sex = util.transferSexValue(
                  respond.data.dataList[i].sex
                );
                let phone = respond.data.dataList[i].phone,
                  createTime = respond.data.dataList[i].createTime,
                  lastUpdateTime = respond.data.dataList[i].lastUpdateTime;
                if (respond.data.dataList[i].markPhone) {
                  //若存在备注电话则显示备注电话，否则显示真实电话前三位+‘****’
                  respond.data.dataList[i].markPhone =
                    respond.data.dataList[i].markPhone;
                } else {
                  respond.data.dataList[i].markPhone = util.formatPhone2(
                    respond.data.dataList[i].phone
                  );
                }
                respond.data.dataList[i].age &&
                  (respond.data.dataList[i].age =
                    respond.data.dataList[i].age == "-1" ?
                    "" :
                    respond.data.dataList[i].age);

                //respond.data.dataList[i].phone = phone.slice(0, 3) + "****";
                respond.data.dataList[i].createTime =
                  createTime.slice(0, 4) +
                  "-" +
                  createTime.slice(4, 6) +
                  "-" +
                  createTime.slice(6, 8);
                if (respond.data.dataList[i].lastUpdateTime) {
                  respond.data.dataList[i].lastUpdateTime = util.transferTime(
                    lastUpdateTime
                  );
                }
              }
            }
            this.mycustomerData = respond.data.dataList;
            if (respond.data.totalDatas > 0) {
              this.pagesShow = true;
            } else {
              this.pagesShow = false;
            }
            this.allotLoading = false;
          }
        });
      }
    },
    //无效原因确定
    addInvalidList(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.invalidReason = false;
          let param;
          console.log(
            this.invalidReasonForm.checkValue +
            ">>>>.." +
            this.invalidReasonList.otherId
          );
          if (
            this.invalidReasonForm.checkValue != this.invalidReasonList.otherId
          ) {
            param = {
              customerId: this.customerId,
              noEffectId: this.invalidReasonForm.checkValue,
              // adminId: util.getCookie("accountId") || "",
              adminId: util.getCookie("adminId") || util.getCookie("accountId"),
              accountId: util.getCookie("accountId"),
              projectName: util.getCookie("projectName"),
              loginId: util.getCookie("accountId"),
              loginName: util.getCookie("realName")
            };
          } else {
            param = {
              customerId: this.customerId,
              noEffectId: this.invalidReasonForm.checkValue,
              // adminId: util.getCookie("accountId") || "",
              adminId: util.getCookie("adminId") || util.getCookie("accountId"),
              accountId: util.getCookie("accountId"),
              projectName: util.getCookie("projectName"),
              loginId: util.getCookie("accountId"),
              loginName: util.getCookie("realName"),
              noEffectOther: this.invalidReasonForm.otherReasonValue
            };
          }
          api
            .customer_submintInvalid(param)
            .then(respond => {
              console.log(respond);
              if (respond.status === "success") {
                this.$message({
                  message: "已加入无效客户",
                  type: "success",
                  duration: 1000
                });
                this.$refs[formName].resetFields();
                this.allotTab();
                this.getCustomerNumInfo();
                this.getTabNum();
              }
            })
            .catch(err => console.error(err));
        } else {
          console.log("error submit!!");
        }
      });
    },
    //分配操作
    allotToResponse(item) {
      this.sdialogShow = false;
      if (this.isBatchFlag) {
        const param = {
          // adminId: util.getCookie("accountId") || "",
          adminId: util.getCookie("adminId") || util.getCookie("accountId"),
          projectName: util.getCookie("projectName"),
          loginId: util.getCookie("accountId"),
          loginName: util.getCookie("realName"),
          accountId: item.accountId,
          accountName: item.accountName,
          jsonCustomerIds: JSON.stringify(this.customerIdArr)
        };
        api.customer_batchAllot(param).then(respond => {
          if (respond.status === "success") {
            this.$message({
              message: "分配成功",
              type: "success",
              duration: 1000
            });
            this.allotTab();
            this.getCustomerNumInfo();
            this.getTabNum();
          } else {
            this.$message.error({
              message: "分配失败",
              duration: 1000
            });
          }
        });
      } else {
        const param = {
          // adminId: util.getCookie("accountId") || "",
          adminId: util.getCookie("adminId") || util.getCookie("accountId"),
          projectName: util.getCookie("projectName"),
          loginId: util.getCookie("accountId"),
          loginName: util.getCookie("realName"),
          accountId: item.accountId,
          accountName: item.accountName,
          customerId: this.customerId
        };
        api.customer_allotAct(param).then(respond => {
          if (respond.status === "success") {
            this.$message({
              message: "分配成功",
              type: "success",
              duration: 1000
            });
            this.allotTab();
            this.getCustomerNumInfo();
            this.getTabNum();
          } else {
            this.$message.error({
              message: "分配失败",
              duration: 1000
            });
          }
        });
      }
    },
    //显示无效原因弹窗
    invalidDialog(item) {
      this.invalidReason = true;
      this.customerId = item.customerId;
      const param = {
        // adminId: util.getCookie("adminId") || ""
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId")
      };
      api.customer_invalidReasonData(param).then(respond => {
        if (respond.status === "success") {
          this.invalidReasonList.checkOptions = respond.data;
          this.invalidReasonList.otherId = 2;
          for (let i = 0; i < respond.data.length; i++) {
            switch (respond.data[i].enumValue) {
              case "0":
                respond.data[i].valueLable = "无意向";
                break;
              case "1":
                respond.data[i].valueLable = "已成交";
                break;
              default:
                respond.data[i].valueLable = "其它";
                break;
            }
          }
        } else {}
      });
    },
    //弹窗隐藏并清空form表
    dialogHide(formName) {
      this.invalidReason = false;
      this.markPhonechangeFlag = false;
      if (formName) {
        this.$refs[formName].resetFields();
      }
    },
    getcustomerCheckInfo(value) {
      this.customerCheckInfo = value;
    },
    // getcustomerDetailInfo(value) {
    //   // this.customerCheckInfo = value;
    //   // console.log(value)
    //   this.customerDetailInfo = value;
    // },
    //领取客户
    getCustomer(item) {
      const param = {
        customerId: item.customerId,
        loginId: util.getCookie("accountId"),
        loginName: util.getCookie("realName")
      };
      api.customer_getCommon(param).then(respond => {
        if (respond.status === "success") {
          this.$message({
            message: "已添加到跟进中",
            type: "success",
            duration: 1000
          });
          this.allotTab();
          this.getCustomerNumInfo();
          this.getTabNum();
        } else {
          this.$message.error({
            message: respond.errMsg,
            duration: 1000
          });
        }
      });
    },
    //用户详情保存按钮点击
    doSaveCustomerInfo() {
      this.dialogShow = false;
      this.allotTab();
      this.getCustomerNumInfo();
      this.getTabNum();
    },
    //无效客户
    getFollowingCommon() {
      const param = {
        // adminId: util.getCookie("accountId") || "",
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId"),
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        // searchConditions: this.searchConditionsValue
        startTime: this.alreadystarttime,
        endTime: this.alreadyendtime,
        lastUpdateAccount: this.allotSearchCondition.responsible
      };
      api.customer_followingCommonData(param).then(respond => {
        if (respond.status === "success") {
          let data = respond.data;
          respond.data = this.dealData(data);
          this.allotLoading = false;
        }
      });
    },
    //处理返回的数据
    dealData(data) {
      // this.followingData = data.dataList;
      this.totalDatas = Number(data.totalDatas);
      if (data.dataList.length > 0) {
        for (let i = 0; i < data.dataList.length; i++) {
          data.dataList[i].age &&
            (data.dataList[i].age =
              data.dataList[i].age == "-1" ? "" : data.dataList[i].age);
          if (data.dataList[i].lastUpdateTime) {
            data.dataList[i].lastUpdateTime = util.transferTime(
              data.dataList[i].lastUpdateTime
            );
          }
          switch (data.dataList[i].sex) {
            case "2":
              data.dataList[i].sex = "女";
              break;
            case "1":
              data.dataList[i].sex = "男";
              break;
            default:
              data.dataList[i].sex = "未知";
              break;
          }
          switch (data.dataList[i].noEffectId) {
            case "0":
              data.dataList[i].noEffectValue = "无意向";
              break;
            case "1":
              data.dataList[i].noEffectValue = "已成交";
              break;
            case "2":
              data.dataList[i].noEffectValue = data.dataList[i].noEffectOther;
              break;
            default:
              data.dataList[i].noEffectValue = "";
              break;
          }
          if (data.dataList[i].noEffectValue.trim().length > 4) {
            data.dataList[i].noEffectValueLess =
              data.dataList[i].noEffectValue.trim().slice(0, 3) + "…";
          } else {
            data.dataList[i].noEffectValueLess = data.dataList[
              i
            ].noEffectValue.trim();
          }
          switch (data.dataList[i].intentionId) {
            case "0":
              data.dataList[i].intentionValue = "必买";
              break;
            case "1":
              data.dataList[i].intentionValue = "高意向";
              break;
            case "2":
              data.dataList[i].intentionValue = "一般意向";
              break;
            default:
              data.dataList[i].intentionValue = "无意向";
              break;
          }

          if (data.dataList[i].lastUpdateAccount) {
            let j = data.dataList[i].lastUpdateAccount.indexOf("/") + 1;
            data.dataList[i].lastUpdateAccount = data.dataList[
              i
            ].lastUpdateAccount.slice(j);
          }
        }
      }
      if (data.totalDatas > 0) {
        this.pagesShow = true;
      } else {
        this.pagesShow = false;
      }
      this.followingData = data.dataList;

      return data;
    },
    //点击查看效果
    progressFollow(item) {
      this.progressData = [];
      const param = {
        customerId: item.customerId
      };
      api.customer_followingDetail(param).then(respond => {
        if (respond.status === "success") {
          if (respond.data.length > 0) {
            for (let i = 0; i < respond.data.length; i++) {
              respond.data[i].createTime = util.transferTime(
                respond.data[i].createTime
              );
              respond.data[i].msg =
                "由" + respond.data[i].accountName + respond.data[i].content;
            }
          }
          this.progressData = respond.data;
        }
      });
      this.followProgressVisible = true;
    },
    handleSelectionChange(val) {
      this.customerIdArr = [];
      // this.multipleSelection = val;
      if (val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          this.customerIdArr.push({
            customerId: val[i].customerId
          });
        }
        this.batchChoseFlag = true;
      } else {
        this.batchChoseFlag = false;
      }
    },
    batchAllot() {
      if (this.batchChoseFlag) {
        this.isBatchFlag = true;
        const param = {
          // adminId: util.getCookie("accountId") || ""
          adminId: util.getCookie("adminId") || util.getCookie("accountId"),
          accountId: util.getCookie("accountId")
        };
        api.customer_getAllotInfo(param).then(respond => {
          if (respond.status === "success") {
            this.allotCustomerData = respond.data;
          }
        });
        this.sdialogShow = true;
      } else {
        this.$message({
          message: "请至少选择一位客户",
          type: "warning",
          duration: 1000
        });
      }
    },
    // 激活电话号码
    activedPhone(item) {
      console.log(item)
      this.$confirm('该客户为已联系状态，且被标记为有需求，确认激活来查看完整号码吗？', '提示', {}).then(() => {
        api.activedPhone({
            // loginId:util.getCookie("adminId") || util.getCookie("accountId"),
            loginId: util.getCookie("accountId"),
            loginName: util.getCookie("realName"),
            customerId: item.customerId
          })
          .then((res) => {
            if (res && res.data) {
              this.$message({
                message: "激活成功",
                type: "success",
                duration: 1000
              });
              this.allotTab()
            } else {
              this.$message({
                message: res.errMsg,
                type: "error",
                duration: 1000
              });
            }

          })
      }).catch(() => {
        this.$message({
          message: '已取消激活',
          type: "info",
          duration: 1000
        });
      });
    }
  },
  components: {
    userDetail
  }
};
