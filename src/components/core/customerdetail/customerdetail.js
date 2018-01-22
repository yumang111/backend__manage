/* eslint-disable */
// import api from "@/api/api";
// import util from "@/tools/util";
// export default {
//   props: [
//     "dialogVisible",
//     "customerDetailInfo",
//     "customerCheckInfo",
//     "customerDetailList",
//     "tempObjShow"
//   ],
//   data() {
//     return {
//       isflag: null,
//       callHref: "",
//       phone: "",
//       active:-1,
//       checkList:[],
//     };
//   },
//   computed: {
//     dialogShow() {
//       return this.dialogVisible;
//     }
//   },
//   watch: {
//     dialogShow(newValue) {
//       this.$emit("onVisibilityChange", newValue);
//     }
//   },
//   // updated() {
//   //   this.isflag = this.customerDetailInfo.closeFlagValue;
//   // },
//   created() {
//     // console.log(this.customerDetailInfo.closedFlag,'this.customerDetailInfo.closedFlag');
//     //  console.log(this.customerDetailInfo,'this.customerDetailInfo.closedFlag');
//     if (this.customerDetailInfo.closedFlag == "1") {
//       this.isflag = true;
//     } else {
//       this.isflag = false;
//     }
//     this.activeDemand(this.customerDetailList.demandCase.temp)
//     console.log(this.customerDetailList.demandCase)
//   },
//   methods: {
//     passCheckValue(value) {
//       console.log(this.customerCheckInfo,'再次点击的时候')
//       this.$emit("checkValueDetail", this.customerCheckInfo);
//     },
//     closeFlagSubmit(val) {
//       this.customerDetailInfo.closeFlagValue = val;
//       this.$emit("closeFlagSubmit", this.customerDetailInfo.closeFlagValue);
//       this.isflag = val;
//     },
//     callTipsMessage() {
//       this.$message({
//         message: "致电后，请先接听我们的电话，我们会帮您连接客户",
//         duration: 1000
//       });
//     },
//     changePhone() {
//       // this.$emit("markphoneSubmit", this.customerDetailInfo.markPhone);
//       this.$emit("markphoneSubmit", this.customerDetailInfo.phone);
//       // this.$emit("checkValueDetail", this.customerCheckInfo);
//     },
//     changeName(){
//       this.$emit("customerInfoDetail", this.customerDetailInfo);
//     },
//     emitContactStatus(){
//       console.log(this.customerDetailInfo)
//       this.$emit("customerInfoDetail", this.customerDetailInfo);
//     },
//     callBtn() {
//       const param = {
//         loginId: util.getCookie("accountId"),
//         customerId: this.customerDetailInfo.customerId
//       };
//       api.customer_call(param).then(respond => {
//         // if (respond.status === 'success'){
//         // }
//       });
//       this.$message({
//         message: "正在接通，请留意您的手机来电",
//         type: "warning",
//         duration: 1000
//       });
//     },
//     choseDemand(e,curNum){
//       if(e.target.className.indexOf('cur')!=-1){
//         this.customerCheckInfo.activeDemand = -1;
//       }else{
//         this.customerCheckInfo.activeDemand = curNum;
//         this.customerCheckInfo.demandCase.tvId = this.customerDetailList.demandCase.temp[curNum].tvId;
//       }
//       console.log(this.customerCheckInfo)
//       this.$emit("checkValueDetail", this.customerCheckInfo);
//     },
//     activeDemand(data){
//       if(!data) return;
//       data.forEach((element,index) => {
//         if(!this.customerCheckInfo.demandCase.tvId) return;
//         if(this.customerCheckInfo.demandCase.tvId == element.tvId){
//             this.active = index;
//         }
//       }, this);
//     },
//   }
// };
//END

/* eslint-disable */
import api from "@/api/api";
import util from "@/tools/util";
export default {
  props: [
    "showDialog",
    // "customerDetailInfo",
    // "customerCheckInfo",
    // "customerDetailList",
    // "tempObjShow"
    "customerInfoId"
  ],
  data() {
    return {
      isflag: null,
      active: -1,
      checkList: [],
      commonParams: {
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId")
      },
      tempObjId: {},
      dealedTagCol: {}, // 处理后的标签集合
      closeFlagValue: "", // 已成交 未成交
      changeWillCreateTime: "", // 客户的创建时间
      customerIdSave: "", // 客户id 点击详情时赋值
      customerCheckInfo: {
        // itention: {
        //   tcId: this.tempObjId.itention,
        //   tvId: ""
        // },
        // regionData: {
        //   tcId: this.tempObjId.regionData,
        //   tvId: []
        // },
        roomType: {
          tcId: "",
          tvId: ""
        },
        isMarried: {
          tcId: "",
          tvId: ""
        },
        haveChild: {
          tcId: "",
          tvId: ""
        },
        haveCar: {
          tcId: "",
          tvId: ""
        },
        decroStyle: {
          tcId: "",
          tvId: []
        },
        decroCost: {
          tcId: "",
          tvId: ""
        },
        houseArea: {
          tcId: "",
          tvId: ""
        },
        decroArea: {
          tcId: "",
          tvId: ""
        },
        demandCase: {
          tcId: "",
          tvId: ""
        },
        noDemand: {
          tcId: "",
          tvId: []
        },
        demandkinds: {
          tcId: "",
          tvId: []
        },
        houseAdress: {
          tcId: "",
          tvId: ""
        },
        demandTxt: "",
        noDemandTxt: "",
        noMatchTxt: "",
        activeDemand: -1
      },
      customerDetailInfo: {},
      customerDetailList: {},
      itentionInit: "", // 默认返回的意向
      afterIntentionId: "", //修改后的意向
      beforeDealStatus: "", // 默认的成交状态
      afterDealStatus: "", //修改后的成交状态
      beforeConnectedStatus: "", //修改前客户联系状态
      afterConnectedStatus: "" //修改后客户联系状态
    };
  },
  computed: {
    dialogShow() {
      return this.dialogVisible;
    }
  },
  watch: {
    dialogShow(newValue) {
      this.$emit("onVisibilityChange", newValue);
    }
  },

  methods: {
    passCheckValue(value) {
      console.log(this.customerCheckInfo, "再次点击的时候");
      this.$emit("checkValueDetail", this.customerCheckInfo);
    },
    changeWilling(val) {
      console.log(val);
      if (val) {
        this.closeFlagValue = "1";
      } else {
        this.closeFlagValue = "0";
      }
    },
    callTipsMessage() {
      this.$message({
        message: "致电后，请先接听我们的电话，我们会帮您连接客户",
        duration: 1000
      });
    },
    callBtn() {
      const param = {
        loginId: util.getCookie("accountId"),
        customerId: this.customerDetailInfo.customerId
      };
      api.customer_call(param).then(respond => {
        // if (status === 'success'){
        // }
      });
      this.$message({
        message: "正在接通，请留意您的手机来电",
        type: "warning",
        duration: 1000
      });
    },
    choseDemand(e, curNum) {
      if (e.target.className.indexOf("cur") != -1) {
        this.customerCheckInfo.activeDemand = -1;
      } else {
        this.customerCheckInfo.activeDemand = curNum;
        this.customerCheckInfo.demandCase.tvId = this.customerDetailList.demandCase.temp[
          curNum
        ].tvId;
      }
      // this.$emit("checkValueDetail", this.customerCheckInfo);
    },
    activeDemand(data) {
      if (!data) return;
      data.forEach((element, index) => {
        if (!this.customerCheckInfo.demandCase.tvId) return;
        if (this.customerCheckInfo.demandCase.tvId == element.tvId) {
          this.active = index;
        }
      }, this);
    },
    //获取客户所有标签
    getCustomerTagList() {
      this.followLoading = true;
      api.customer_allLableList(this.commonParams).then(res => {
        if (res && res.status === "success") {
          let dataObj = this.getTagDataFormat(res.data);
          console.log(dataObj, "dataObj");
          this.customerDetailList = dataObj.labelList;
          this.tempObjId = dataObj.tempObjId;
          this.getCustomerInfo(this.customerInfoId); // 获取用户详情

          console.log(res.data);
        }
      });
    },
    //获取用户Id个人信息
    getCustomerInfo(id) {
      api.customer_infoDetail({ customerId: id }).then(respond => {
        if (respond.status === "success") {
          this.customerDetailInfo = respond.data;
          this.followLoading = false;
          respond.data.lastUpdateTime = util.transferTime(
            respond.data.lastUpdateTime
          );
          this.followLoading = false;
          respond.data.sex = util.transferSexValue(respond.data.sex);

          respond.data.age &&
            (respond.data.age =
              respond.data.age == "-1" ? "" : respond.data.age);
          this.changeWillCreateTime = respond.data.createTime;
          if (!respond.data.contactFlag) {
            respond.data.contactFlag = "0";
          }
          this.beforeConnectedStatus = respond.data.contactFlag;
          this.customerDetailInfo = respond.data;

          this.closeFlagValue = respond.data.closedFlag;
          if (respond.data.closedFlag == "1") {
            this.isflag = true;
          } else {
            this.isflag = false;
          }
          this.beforeStatus = respond.data.closedFlag;
          this.customerCheckInfo = {
            roomType: {
              tcId: this.tempObjId.roomType,
              tvId: ""
            },
            isMarried: {
              tcId: this.tempObjId.isMarried,
              tvId: ""
            },
            haveChild: {
              tcId: this.tempObjId.haveChild,
              tvId: ""
            },
            haveCar: {
              tcId: this.tempObjId.haveCar,
              tvId: ""
            },
            decroStyle: {
              tcId: this.tempObjId.decroStyle,
              tvId: []
            },
            decroCost: {
              tcId: this.tempObjId.decroCost,
              tvId: ""
            },
            houseArea: {
              tcId: this.tempObjId.houseArea,
              tvId: ""
            },
            decroArea: {
              tcId: this.tempObjId.decroArea,
              tvId: ""
            },
            demandCase: {
              tcId: this.tempObjId.demandCase,
              tvId: ""
            },
            noDemand: {
              tcId: this.tempObjId.noDemand,
              tvId: []
            },
            demandkinds: {
              tcId: this.tempObjId.demandkinds,
              tvId: []
            },
            houseAdress: {
              tcId: this.tempObjId.houseAdress,
              tvId: ""
            },
            demandTxt: "",
            noDemandTxt: "",
            noMatchTxt: "",
            activeDemand: -1
          };
          if (respond.data.demandId) {
            var demand = respond.data.demandId;
            this.customerCheckInfo.activeDemand = demand;
            this.customerCheckInfo.demandCase.tvId = this.customerDetailList.demandCase.temp[
              demand
            ].tvId;
            this.itentionInit = this.customerCheckInfo.demandCase.tvId;
            if (demand == 0) {
              this.customerCheckInfo.demandTxt = respond.data.demandOther;
            }
            if (demand == 1) {
              this.customerCheckInfo.noDemandTxt = respond.data.demandOther;
            }
            if (demand == 2) {
              this.customerCheckInfo.noMatchTxt = respond.data.demandOther;
            }
          }
          let customerCheckAll = respond.data.customerTags;
          this.dialogShow = true;

          // 获取默认选择选项的值
          if (customerCheckAll.length > 0) {
            for (let i = 0; i < customerCheckAll.length; i++) {
              switch (customerCheckAll[i].tagGroupId) {
                case this.tempObjId.roomType:
                  this.customerCheckInfo.roomType.tvId =
                    customerCheckAll[i].tagSubgroupId;
                  break;
                case this.tempObjId.decroArea:
                  this.customerCheckInfo.decroArea.tvId =
                    customerCheckAll[i].tagSubgroupId;
                  break;
                case this.tempObjId.houseArea:
                  this.customerCheckInfo.houseArea.tvId =
                    customerCheckAll[i].tagSubgroupId;
                  break;
                case this.tempObjId.decroCost:
                  this.customerCheckInfo.decroCost.tvId =
                    customerCheckAll[i].tagSubgroupId;
                  break;
                case this.tempObjId.decroStyle:
                  this.customerCheckInfo.decroStyle.tvId.push(
                    customerCheckAll[i].tagSubgroupId
                  );
                  break;
                case this.tempObjId.demandkinds:
                  this.customerCheckInfo.demandkinds.tvId.push(
                    customerCheckAll[i].tagSubgroupId
                  );
                  break;
                case this.tempObjId.houseAdress:
                  this.customerCheckInfo.houseAdress.tvId =
                    customerCheckAll[i].tagSubgroupId;

                  break;
                case this.tempObjId.isMarried:
                  this.customerCheckInfo.isMarried.tvId =
                    customerCheckAll[i].tagSubgroupId;
                  break;
                case this.tempObjId.haveChild:
                  this.customerCheckInfo.haveChild.tvId =
                    customerCheckAll[i].tagSubgroupId;
                  break;
                case this.tempObjId.haveCar:
                  this.customerCheckInfo.haveCar.tvId =
                    customerCheckAll[i].tagSubgroupId;
                  break;
                case this.tempObjId.noDemand:
                  this.customerCheckInfo.noDemand.tvId.push(
                    customerCheckAll[i].tagSubgroupId
                  );
                  break;
              }
            }
          }
        }
        console.log(this.customerCheckInfo, "hahhahahahh");
      });
    },
    saveUserInformation() {
      let jsonTagValueIds = [],
        itentionValue = "";

      const param = {
        loginId: util.getCookie("accountId"),
        loginName: util.getCookie("realName"),
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId"),
        customerId: this.customerIdSave,
        customerName: this.customerDetailInfo.customerName,
        intentionId: this.intentionId || "",
        closedFlag: this.closeFlagValue,
        // phone:this.customerDetailInfo.phone,
        jsonTags: "",
        demandId: "",
        demandOther: "",
        contactFlag: this.customerDetailInfo.contactFlag || ""
      };
      this.afterStatus = this.closeFlagValue;
      this.afterConnectedStatus = this.customerDetailInfo.contactFlag || "";
      const activeDemand = this.customerCheckInfo.activeDemand;
      if (this.customerCheckInfo.demandCase) {
        param.demandId = this.customerCheckInfo.demandCase.tvId;
        this.intentionId = this.customerCheckInfo.demandCase.tvId;
        
      }

     
      if (activeDemand == "0") {
        param.demandOther = this.customerCheckInfo.demandTxt;
      }
      if (activeDemand != "0") {
        if (activeDemand == "1") {
          param.demandOther = this.customerCheckInfo.noDemandTxt;
        } else {
          param.demandOther = this.customerCheckInfo.noMatchTxt;
        }
      }

      if (activeDemand == "-1") {
        param.demandId = "";
        param.demandOther = "";
        this.customerCheckInfo.noMatchTxt = "";
        this.customerCheckInfo.noDemandTxt = "";
        this.customerCheckInfo.demandTxt = "";
        this.customerCheckInfo.demandCase.tvId = "";
      }
       this.changeCustomerWill(
          this.changeWillCreateTime,
          this.customerCheckInfo.demandCase.tvId
        );
      // if (this.markPhonechangeFlag) {
      //   param.phone = this.markPhonechange;
      // }
      // this.markPhonechangeFlag = false;
      if (param.demandOther && param.demandOther.length > 100) {
        this.$message({
          message: "需求情况原因描述不能超过100字",
          type: "info",
          duration: 1000
        });
        return;
      }
      if (param.customerName && param.customerName.length > 10) {
        this.$message({
          message: "姓名长度不能超过10字",
          type: "info",
          duration: 1000
        });
        return;
      }
      if (this.customerCheckInfo.activeDemand == -1) {
        delete this.customerCheckInfo.noDemand;
        delete this.customerCheckInfo.demandCase;
      }
      if (this.customerCheckInfo.activeDemand != 2) {
        delete this.customerCheckInfo.noDemand;
      }
      let keys = Object.keys(this.customerCheckInfo);
      keys.forEach((v, k) => {
        if (!v) {
          return;
        }
        if (!this.customerDetailList[v]) {
          return;
        }
        var InfoArr = this.customerCheckInfo[v].tvId;
        this.customerCheckInfo[v].tcValue = [];
        for (var i = 0; i < this.customerDetailList[v].temp.length; i++) {
          var item = this.customerDetailList[v].temp[i];

          if (InfoArr instanceof Array && InfoArr.length != 0) {
            for (var k = 0; k < InfoArr.length; k++) {
              if (item.tvId == InfoArr[k]) {
                this.customerCheckInfo[v].tcValue.push(item.tcValue);
              }
            }
          } else {
            if (
              this.customerCheckInfo[v].tcId &&
              this.customerCheckInfo[v].tvId == item.tvId
            ) {
              this.customerCheckInfo[v].tcValue = item.tcValue;
            }
          }
        }
      });
      for (var i in this.customerCheckInfo) {
        if (
          this.customerCheckInfo[i].tvId instanceof Array &&
          this.customerCheckInfo[i].tvId.length != 0
        ) {
          for (let j = 0; j < this.customerCheckInfo[i].tvId.length; j++) {
            jsonTagValueIds.push({
              tcId: this.customerCheckInfo[i].tcId,
              tvId: this.customerCheckInfo[i].tvId[j],
              tcValue: this.customerCheckInfo[i].tcValue[j],
              typecode: this.customerDetailList[i].typecode || "",
              tcName: this.customerDetailList[i].tagName,
              tagcode: this.customerDetailList[i].tagcode || ""
            });
          }
        } else {
          if (this.customerCheckInfo[i].tvId) {
            jsonTagValueIds.push({
              tcId: this.customerCheckInfo[i].tcId,
              tvId: this.customerCheckInfo[i].tvId,
              tcValue: this.customerCheckInfo[i].tcValue,
              tcName: this.customerDetailList[i].tagName,
              typecode: this.customerDetailList[i].typecode || "",
              tagcode: this.customerDetailList[i].tagcode || ""
            });
          }
        }
      }
      param.jsonTags = JSON.stringify(jsonTagValueIds);
      api.customer_saveLableList(param).then(respond => {
        if (respond.status === "success") {
          this.showInfoMsg("success", "保存成功");
          // this.dialogShow = false;
          this.$emit("saveCustomerInfo");
          // this.getCustomerFollwingData();
          // this.getCustomerNum();
          // this.getTabNum();
        } else {
          this.showInfoMsg("error", "保存失败");
        }
      });
    },
    changeCustomerWill(time, intentionId) {
      let param = {
        // adminId: util.getCookie("accountId"),
        adminId: util.getCookie("adminId") || util.getCookie("accountId"),
        accountId: util.getCookie("accountId"),
        createTime: util.formatGetTime(),
        isManual: "yes",
        beforeIntentionId: "",
        afterIntentionId: "",
        beforeDealStatus: "",
        afterDealStatus: "",
        beforeConnectedFlag: "",
        afterConnectedFlag: ""
      };
      if (time) {
        param.createTime = time;
        param.isManual = "no";
        param.beforeIntentionId = this.itentionInit;
        param.afterIntentionId = intentionId;
        param.beforeDealStatus = this.beforeStatus;
        param.afterDealStatus = this.afterStatus;
        param.beforeConnectedFlag = this.beforeConnectedStatus;
        param.afterConnectedFlag = this.afterConnectedStatus;
      }
      api.customer_accountWilling(param).then(respond => {
        if (respond.status === "success") {
        }
      });
    },
    changeName() {},
    changePhone() {},
    emitContactStatus() {},
    //信息提示
    showInfoMsg(type, msg) {
      this.$message({
        type: type,
        message: msg,
        duration: 1000
      });
    },
    //处理标签集合
    getTagDataFormat(data) {
      let dataObj = {
        labelList: {},
        tempObjId: {}
      };
      for (let i = 0; i < data.length; i++) {
        let item;
        if (data[i].tcName == "片区") {
          item = "regionData";
        } else if (data[i].tcName == "地铁") {
          item = "railData";
        } else if (data[i].tcName == "单价") {
          item = "singlePrice";
        } else if (data[i].tcName == "房型") {
          item = "roomType";
        } else if (data[i].tcName == "是否结婚") {
          item = "isMarried";
        } else if (data[i].tcName == "是否有小孩") {
          item = "haveChild";
        } else if (data[i].tcName == "机动车") {
          item = "haveCar";
        } else if (data[i].tcName == "月收入") {
          item = "wages";
        } else if (data[i].tcName == "月消费") {
          item = "cost";
        } else if (data[i].tcName == "户型") {
          item = "houseType";
        } else if (data[i].tcName == "装修风格") {
          item = "decroStyle";
        } else if (data[i].tcName == "装修预算") {
          item = "decroCost";
        } else if (data[i].tcName == "房屋面积") {
          item = "houseArea";
        } else if (data[i].tcName == "意向总价") {
          item = "yixiang";
        } else if (data[i].tcName == "装修情况") {
          item = "decroCase";
        } else if (data[i].tcName == "房源特色") {
          item = "houseSpecial";
        } else if (data[i].tcName == "意向楼盘") {
          item = "yixanghouse";
        } else if (data[i].tcName == "装修面积") {
          item = "decroArea";
        } else if (data[i].tcName == "需求情况") {
          item = "demandCase";
        } else if (data[i].tcName == "不匹配原因") {
          item = "noDemand";
        } else if (data[i].tcName == "需求分类") {
          item = "demandkinds";
        } else if (data[i].tcName == "房屋地址") {
          item = "houseAdress";
        }
        if (!item) continue;
        dataObj.labelList[item] = {
          temp: data[i].tagValues,
          tagName: data[i].tcName,
          typecode: data[i].typecode || "",
          tagcode: data[i].tagcode || ""
        };
        dataObj.tempObjId[item] = data[i].tcId;
      }
      console.log(this.customerDetailList, "this.customerDetailList");
      return dataObj;
    }
  },
  created() {
    console.log(this.customerInfoId, "customerInfoId");
    this.customerIdSave = this.customerInfoId;
    this.getCustomerTagList();
  }
};
