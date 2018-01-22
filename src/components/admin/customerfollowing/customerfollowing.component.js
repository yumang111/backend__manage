/* eslint-disable */
import api from "@/api/api";
import util from "@/tools/util";
import userDetail from "@/components/core/customerdetail/customerdetail.vue";

export default {
  name: "customerfollowing",
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!/^1[345789]\d{9}$/.test(value.replace(/\s+/g, ""))) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
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
      followingData: [],
      currentPage: 1,
      pageSize: 10,
      totalDatas: 0,
      myFollowingNum: 0,
      dealedCustomerNum: 0,
      progressData: [],
      searchConditions: [],
      searchConditionsParse: [],
      customerDetailInfo: {},
      customerInfoId: "",
      markPhonechangeFlag: false,
      pagesShow: false,
      markPhonechange: "",
      followLoading: true,
      closeFlagvalue: 0,
      customerIdSave: "",
      myCustomerNum: "",
      commonCustomerNum: "",
      msg: "待确认",
      activeName: "first",
      invalidReason: false,
      firstCheck: true,
      changeWillCreateTime: "",
      lableInfoId: {},
      formInline: {
        accountName: "",
        peopleId: "",
        willGrade: "",
        contactFlag: ''
        // checked: true,
      },
      addCustomerVisible: false,
      ruleaddCustomer: {
        tel: ""
      },
      rules: {
        tel: [{
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ]
      },
      rules2: {
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
      followProgressVisible: false,
      sdialogShow: false,
      dialogShow: false,
      itentionInit: "",
      invalidReasonList: {
        checkValue: "",
        otherId: "",
        checkOptions: ["太贵", "太偏", "太简陋", "不方便", "其它原因"]
      },
      invalidReasonForm: {
        checkValue: "",
        otherReasonValue: ""
      },
      tempObjId: {},
      tempObjShow: {},
      testnum: 1,
      visible2: false,
      beforeStatus: "",
      afterStatus: ""
    };
  },
  created() {
    this.getFollowingData();
    this.getCustomerNum();
    this.getTabNum();
  },
  methods: {
    formatterOrigin(row) {
      if (row.origin === "0" || row.origin === '2') {
        return "亿房推送"
      } else if (row.origin === "1") {
        if (row.synFlag === "0") {
          return "手动新增【未同步】"
        } else {
          return "手动新增"
        }
      }
    },
    //搜索按钮，添加搜索条件
    searchAction() {
      this.currentPage = 1;
      this.getFollowingData();
    },
    getFollowingData() {
      this.followLoading = true;
      const param = {
        // projectId: util.getCookie("projectId") || 1,
        loginId: util.getCookie("accountId"),
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId"),
        // adminId: util.getCookie("accountId"),
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        // searchConditions: this.searchConditionsParse || ""
        demandId: this.formInline.willGrade || "",
        customerName: this.formInline.accountName || "",
        contactFlag: this.formInline.contactFlag || ""

        // customerNo: this.formInline.peopleId || "",
        // closedFlag: this.formInline.checked
      };
      api.customer_followingData(param).then(respond => {
        if (respond.status === "success") {
          let data = respond.data;
          respond.data = this.dealData(data);
          this.followLoading = false;
        }
      });
    },
    //获取 我的客户和无效客户总数
    getTabNum() {
      const param = {
        // adminId: util.getCookie("accountId") || "",
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId"),
        loginId: util.getCookie("accountId")
      };
      api.customer_FollowingDataNum(param).then(respond => {
        if (respond.status === "success") {
          this.myCustomerNum = "我的客户 (" + respond.data[0] + ")";
          this.commonCustomerNum = "公共客户 (" + respond.data[1] + ")";
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
          // data.dataList[i].phone = util.formatPhone2(data.dataList[i].phone);
          data.dataList[i].lastUpdateTime = util.transferTime(
            data.dataList[i].lastUpdateTime
          );
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
          if (data.dataList[i].closedFlag == "0") {
            switch (data.dataList[i].demandId) {
              case "0":
                // if(data.dataList[i].closedFlag)
                data.dataList[i].demandDec = "有需求";
                break;
              case "1":
                data.dataList[i].demandDec = "无需求";
                break;
              case "2":
                data.dataList[i].demandDec = "不匹配";
                break;
              default:
                data.dataList[i].demandDec = "";
                break;
            }
          } else if (data.dataList[i].closedFlag == "1") {
            data.dataList[i].demandDec = "已成交";
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
          if (data.dataList[i].contactFlag) {
            switch (data.dataList[i].contactFlag) {
              case "0":
                data.dataList[i].contactFlag = "未联系";
                break;
              case "1":
                data.dataList[i].contactFlag = "未接通";
                break;
              case "2":
                data.dataList[i].contactFlag = "已接通";
                break;
              default:
                data.dataList[i].intentionValue = "";
                break;
            }
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
    getFollowingCommon() {
      this.followLoading = true;
      const param = {
        // adminId: util.getCookie("accountId") || "",
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId"),
        currentPage: this.currentPage,
        pageSize: this.pageSize
        // searchConditions: searchParam || '',
      };
      api.customer_followingCommonData(param).then(respond => {
        if (respond.status === "success") {
          let data = respond.data;
          respond.data = this.dealData(data);
          this.followLoading = false;
        }
      });
    },
    //tab切换
    allotTab() {
      (this.formInline = {
        accountName: "",
        peopleId: "",
        willGrade: "",
        contactFlag: ""
      }), (this.searchConditions = []);
      this.searchConditionsParse = "";
      this.getCustomerFollwingData();
    },
    //加入无效客户
    addInvalidList(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.invalidReason = false;
          let param;
          this.invalidReasonList.otherId = 2;
          if (
            this.invalidReasonForm.checkValue != this.invalidReasonList.otherId
          ) {
            param = {
              customerId: this.customerId,
              noEffectId: this.invalidReasonForm.checkValue,
              adminId: util.getCookie("adminId") || util.getCookie("accountId"),
              accountId: util.getCookie("accountId"),
              // adminId: util.getCookie("accountId") || "",
              // projectName: util.getCookie("projectName"),
              loginId: util.getCookie("accountId"),
              loginName: util.getCookie("realName")
            };
          } else {
            param = {
              customerId: this.customerId,
              noEffectId: this.invalidReasonForm.checkValue,
              adminId: util.getCookie("adminId") || util.getCookie("accountId"),
              accountId: util.getCookie("accountId"),
              // adminId: util.getCookie("accountId") || "",
              projectName: util.getCookie("projectName"),
              loginId: util.getCookie("accountId"),
              loginName: util.getCookie("realName"),
              noEffectOther: this.invalidReasonForm.otherReasonValue
            };
          }
          api.customer_submintInvalid(param).then(respond => {
            if (respond.status === "success") {
              this.$message({
                message: "已加入无效客户",
                type: "success",
                duration: 1000
              });
              this.$refs[formName].resetFields();
              this.getCustomerFollwingData();
              this.getTabNum();
              this.getCustomerNum();
            }
          });
        } else {
          console.log("error submit!!");
        }
      });
    },
    invalidDialog(item) {
      this.invalidReason = true;
      this.customerId = item.customerId;
      console.log(this.customerId);
      const param = {
        // adminId: util.getCookie("accountId") || ''
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId")
      };
      api.customer_invalidReasonData(param).then(respond => {
        if (respond.status === "success") {
          this.invalidReasonList.checkOptions = respond.data;
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
        }
      });
    },
    dialogHide(formName) {
      this.invalidReason = false;
      this.markPhonechangeFlag = false;
      this.addCustomerVisible = false;
      if (formName) {
        this.$refs[formName].resetFields();
      }
    },
    //领取客户
    getCustomer(item) {
      const param = {
        customerId: item.customerId,
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId"),
        loginId: util.getCookie("accountId"),
        loginName: util.getCookie("accountName")
      };
      api.customer_getCommon(param).then(respond => {
        if (respond.status === "success") {
          this.$message({
            message: "已添加到跟进中",
            type: "success",
            duration: 1000
          });

          this.getCustomerFollwingData();
          this.getTabNum();
          this.getCustomerNum();
        } else {
          this.$message.error({
            message: respond.errMsg,
            duration: 1000
          });
        }
      });
    },
    //获得自己客户数以及公共客户数
    getCustomerNum() {
      const param = {
        // adminId: util.getCookie("accountId") || "",
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId"),
        loginId: util.getCookie("accountId")
      };
      api.customer_followingNum(param).then(respond => {
        if (respond.status === "success") {
          this.myFollowingNum = respond.data;
        }
      });
      api.customer_followingDealedNum(param).then(respond => {
        if (respond.status === "success") {
          this.dealedCustomerNum = respond.data;
        }
      });
    },
    //活动客户跟踪数据
    getCustomerFollwingData() {
      if (this.activeName === "first") {
        this.getFollowingData();
      } else {
        this.getFollowingCommon();
      }
    },

    //点击详情按钮
    handleEdit(row) {
      this.customerInfoId = row.customerId; //传给子组件
      // this.followLoading = true;
      this.dialogShow = true;
      this.customerIdSave = row.customerId;
    },
    doSaveCustomerInfo() {
      this.dialogShow = false;
      this.getCustomerFollwingData();
      this.getCustomerNum();
      this.getTabNum();
    },

    //改变当前页面数据数量
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCustomerFollwingData();
    },
    //改变当前页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCustomerFollwingData();
    },
    sdialogAction() {
      this.sdialogShow = false;
    },
    handleSdialog() {
      this.sdialogShow = true;
    },
    //提交新增客户信息
    submitCustomerTel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addCustomerVisible = false;
          const param = {
            accountName: util.getCookie("accountName"),
            adminId: util.getCookie("adminId") || util.getCookie("accountId"),
            accountId: util.getCookie("accountId"),
            phone: this.ruleaddCustomer.tel
          };
          api.customer_add(param).then(respond => {
            if (respond.status === "success") {
              this.$message({
                message: "提交成功，稍后系统会帮您完善资料",
                type: "success",
                duration: 1000
              });
              this.getCustomerFollwingData();
              this.getTabNum();
              this.getCustomerNum();
            } else {
              this.$message.error({
                message: respond.errMsg,
                duration: 1000
              });
            }
          });
          this.$refs[formName].resetFields();
          // this.changeCustomerWill();
        }
      });
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
    tableRowClassName(row, index) {
      if (row.origin == "手动新增【未同步】") {
        return "bg-light-yellow";
      } else if (row.intentionValue == "已成交") {
        return "font-green";
      } else {
        return "";
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
        })
        .catch(() => {
          console.log('请求失败')
        })
    }
  },
  components: {
    userDetail
  }
};
