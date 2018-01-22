<style src="./customerdetail.less" lang="less"></style>

<template>
  <div class="customer-detail-dialog">
    <div class="user-detail-container" v-loading="followLoading">
      <!--演示-->
      <div class="user-detail-header">
        <div class="userInfo-item">
          <span class="customer-info-item width60">
            <span>姓名:</span>
            <div>
              <el-input v-model="customerDetailInfo.customerName" @change="changeName"></el-input>
            </div>
          </span>
          <span class="customer-info-item width109">
            <span>电话:</span>
            <!-- <div>
                      <el-input v-model="customerDetailInfo.phone" @change="changePhone" placeholder="请输入内容"></el-input>
                    </div> -->
            <div>{{customerDetailInfo.phone}}
              <div class="phoneTips">
                <div class="left">
                  <el-tooltip class="item" effect="light"  placement="right-end" >
                     <div slot="content">联系状态为“已联系”，且被标记为“有需求”的客户，<br/>保存后可以在列表中使用相应按钮激活该客户，查看完整号码</div>
                    <i class="el-icon-information" style="color:#1296db"></i>

                  </el-tooltip>
                </div>
              </div>
            </div>
          </span>
          <span class="customer-info-item width60">
            <span>性别:</span>
            <div>{{customerDetailInfo.sex}}</div>
          </span>
          <span class="customer-info-item width60">
            <span>年龄:</span>
            <div>{{customerDetailInfo.age}}</div>
          </span>
          <span class="customer-info-item width120">
            <span>所在区域:</span>
            <div>{{customerDetailInfo.address}}</div>
          </span>
          <span class="customer-info-item width130">
            <span>最近跟进:</span>
            <div>{{customerDetailInfo.lastUpdateTime}}</div>
          </span>
        </div>
        <div class="userInfo-item">
          <a class="btn-call" @click="callBtn()" target="myIframe">致电</a>
          <i class="alert-tips" @click="callTipsMessage"></i>
        </div>
        <div class="userInfo-item customer-call-status">
          <span class="call-status-text">联系状态</span>
          <el-select placeholder="请选择" class="call-status-select" v-model="customerDetailInfo.contactFlag" @change="emitContactStatus">
            <el-option label="未联系" value="0"></el-option>
            <el-option label="未接通" value="1"></el-option>
            <el-option label="已接通" value="2"></el-option>
          </el-select>
        </div>

        <div class="userInfo-item closeFlag">
          <el-switch v-model="isflag" @change="changeWilling" on-text="" off-text="">
          </el-switch>
          <span v-if="isflag">已成交</span>
          <span v-else>未成交</span>
        </div>

      </div>
      <el-form :inline="true" class="select-region-container">
        <el-form-item label="需求情况:" class="selection-region-item" v-if="tempObjId.demandCase">
          <div class="slt-region-right userDetailBtn">
            <span v-for="(itention,index) in customerDetailList.demandCase.temp" class="demand-tag" @click="choseDemand($event,index)" :class="{'cur':customerCheckInfo.activeDemand==index}">{{itention.tcValue}}</span>
          </div>
          <div class="slt-region-right demand">
            <el-input type="textarea" class="demand-des" placeholder="您可补充需求描述" v-show="customerCheckInfo.activeDemand==0" v-model="customerCheckInfo.demandTxt" resize="none"></el-input>
            <el-input type="textarea" class="demand-des" placeholder="您可补充原因" v-show="customerCheckInfo.activeDemand==1" v-model="customerCheckInfo.noDemandTxt" resize="none"></el-input>
            <div v-show="customerCheckInfo.activeDemand==2" class="no-demand">
              <div class="demand-reason">请选择不匹配原因：</div>
              <el-checkbox-group v-model="customerCheckInfo.noDemand.tvId">
                <el-checkbox v-for="region in customerDetailList.noDemand.temp" :label="region.tvId" @change="passCheckValue">{{region.tcValue}}</el-checkbox>
              </el-checkbox-group>
              <el-input type="textarea" placeholder="您可补充不匹配原因" v-model="customerCheckInfo.noMatchTxt" resize="none"></el-input>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="需求分类:" class="selection-region-item" v-if="tempObjId.demandkinds">
          <div class="slt-region-right">
            <el-checkbox-group v-model="customerCheckInfo.demandkinds.tvId" class="userDetailBtn" @change="passCheckValue">
              <el-checkbox v-for="region in customerDetailList.demandkinds.temp" :label="region.tvId">{{region.tcValue}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>

        <el-form-item label="房屋地址:" class="selection-region-item" v-if="tempObjId.houseAdress">
          <div class="slt-region-right">
            <el-radio-group v-model="customerCheckInfo.houseAdress.tvId" class="userDetailBtn" @change="passCheckValue">
              <el-radio v-for="region in customerDetailList.houseAdress.temp" :label="region.tvId">{{region.tcValue}}</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="房型:" class="selection-region-item" v-if="tempObjId.roomType">
          <div class="slt-region-right">
            <el-radio-group v-model="customerCheckInfo.roomType.tvId" class="userDetailBtn" @change="passCheckValue">
              <el-radio v-for="itention in customerDetailList.roomType.temp" :label="itention.tvId">{{itention.tcValue}}</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="装修面积:" class="selection-region-item" v-if="tempObjId.decroArea">
          <div class="slt-region-right">
            <el-radio-group v-model="customerCheckInfo.decroArea.tvId" class="userDetailBtn" @change="passCheckValue">
              <el-radio v-for="itention in customerDetailList.decroArea.temp" :label="itention.tvId">{{itention.tcValue}}</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>

        <el-form-item label="装修预算:" class="selection-region-item" v-if="tempObjId.decroCost">
          <div class="slt-region-right">
            <el-radio-group v-model="customerCheckInfo.decroCost.tvId" class="userDetailBtn" @change="passCheckValue">
              <el-radio v-for="itention in customerDetailList.decroCost.temp" :label="itention.tvId">{{itention.tcValue}}</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="装修风格:" class="selection-region-item" v-if="tempObjId.decroStyle">
          <div class="slt-region-right">
            <el-checkbox-group v-model="customerCheckInfo.decroStyle.tvId" class="userDetailBtn" @change="passCheckValue">
              <el-checkbox v-for="region in customerDetailList.decroStyle.temp" :label="region.tvId">{{region.tcValue}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>

        <el-form-item label="是否结婚:" class=" inline-block firstSingelCheck" v-if="tempObjId.isMarried">
          <div class="slt-region-right">
            <el-radio-group v-model="customerCheckInfo.isMarried.tvId" @change="passCheckValue">
              <el-radio v-for="itention in customerDetailList.isMarried.temp" :label="itention.tvId">{{itention.tcValue}}</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="是否有孩子:" class=" inline-block" v-if="tempObjId.haveChild">
          <div class="slt-region-right">
            <el-radio-group v-model="customerCheckInfo.haveChild.tvId" @change="passCheckValue">
              <el-radio v-for="itention in customerDetailList.haveChild.temp" :label="itention.tvId">{{itention.tcValue}}</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="机动车:" class=" inline-block" v-if="tempObjId.haveCar">
          <div class="slt-region-right">
            <el-radio-group v-model="customerCheckInfo.haveCar.tvId" @change="passCheckValue">
              <el-radio v-for="itention in customerDetailList.haveCar.temp" :label="itention.tvId">{{itention.tcValue}}</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
      </el-form>

      <!-- <iframe class="iframe-hide" :src="callHref" name="myIframe" id="myIframe"></iframe> -->
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveUserInformation" class="save-customer-detail">保存</el-button>
    </div>
  </div>
</template>
<script src="./customerdetail"></script>
