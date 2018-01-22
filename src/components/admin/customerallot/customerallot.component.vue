<style src="./customerallot.component.less" scoped lang="less"></style>

<template>
  <div class="user-manage-container customer-allot">
    <!-- <el-popover ref="popover1" placement="top-start" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    </el-popover> -->
    <!--tab切换-->
    <el-tabs v-model="activeName" class="customer-manage-tab allot-customer-container" @tab-click="allotTab(1)">
      <el-tab-pane :label="waitingSureNum" name="first">
        <div class="condition-select">
          <div class="customer-confirm-info borleft4" style="paddingLeft:30px;">
            今天有
            <span class="font-blue">{{todayAddNum}}</span>位新客户入库，还有
            <span class="font-orange">{{totalUnallotNum}}</span>位需要分配
          </div>
        </div>
        <el-form :inline="true" label-width="80px" class="disTop">
          <el-row>
            <el-col :span="8">
              <el-form-item class="inline-block time-choose-container" label="行为时间">
                <el-date-picker v-model="occurTimeValue" @change="occurTimeSelect" type="daterange" placeholder="请选择日期范围">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="渠道">
                <el-select @change='channelSelect' v-model="channelValue" multiple placeholder="请选择">
                  <el-option v-for="item in channelList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-button class="disLeft" @click="search" type="primary">搜索</el-button>
            </el-col>
            <el-col :md="2">
            </el-col>
            <div class="inline-block search-btn f-r">
              <el-button type="primary" @click="batchAllot">批量分配</el-button>
            </div>
          </el-row>
        </el-form>
        <el-table :data="mycustomerData" border @selection-change="handleSelectionChange" v-loading="allotLoading" style="width: 100%">
          <el-table-column type="selection" align="center" width="50">
          </el-table-column>
          <!-- <el-table-column prop="customerNo"
                          label="编号">
          </el-table-column> -->
          <el-table-column prop="phone" label="联系电话">
            <template scope="scope">
              <span>{{scope.row.phone}}</span>
              <div class="check-following view-phone" @click="activedPhone(scope.row)" v-show="scope.row.activeState==1"></div>

            </template>
          </el-table-column>
          <el-table-column prop="channelTypeList" label="渠道">
            <template scope="scope">
              {{scope.row.channelTypeList?scope.row.channelTypeList.join(','):''}}
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="70">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="70">
          </el-table-column>
          <el-table-column prop="occurTime" label="行为时间">
            <template scope="scope">
              <div v-html='formatterTime(scope.row.occurTime)'></div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="address" label="户籍" width="100"> -->
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="150">
          </el-table-column>
          <el-table-column label="操作" width="210">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.row)">详情</el-button>
              <el-button size="small" class="orange-btn" @click="handleSdialog(scope.row)">分配</el-button>
              <el-button size="small red-btn" @click="invalidDialog(scope.row)">无效</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="suredNum" name="second">
        <div class="condition-select">
          <el-form :inline="true" label-width="70px" :model="allotSearchCondition" class="demo-form-inline">
            <el-row>
              <el-col :span="8">
                <el-form-item class="time-choose-container" label="行为时间">
                  <el-date-picker v-model="occurTimeValue" @change="occurTimeSelect" type="daterange" placeholder="选择日期范围">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="渠道">
                  <el-select @change='channelSelect' v-model="channelValue" multiple placeholder="请选择">
                    <el-option v-for="item in channelList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span='8'>
                <el-form-item label="电话号码">
                  <el-input v-model="allotSearchCondition.phone" placeholder="请输入电话号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;">
              <el-col :span="8">
                <el-form-item class="time-choose-container" label="创建日期">
                  <el-date-picker v-model="alreadyDispatch" @change="searchTimeValue" type="daterange" placeholder="选择日期范围">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="责任人">
                  <el-input v-model="allotSearchCondition.accountName" placeholder="请输入账号名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否成交">
                  <el-select placeholder="请选择" class="call-status-select" v-model="allotSearchCondition.closedFlag">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未成交" value="0"></el-option>
                    <el-option label="已成交" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;">
              <el-col :span="8">
                <el-form-item class="time-choose-container" label="联系状态">
                  <el-select placeholder="请选择" class="call-status-select" v-model="allotSearchCondition.contactFlag">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未联系" value="0"></el-option>
                    <el-option label="未接通" value="1"></el-option>
                    <el-option label="已接通" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="需求情况">
                  <el-select placeholder="请选择" class="call-status-select" v-model="allotSearchCondition.demandId">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="有需求" value="0"></el-option>
                    <el-option label="无需求" value="1"></el-option>
                    <el-option label="不匹配" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="inline-block search-btn f-r">
                  <el-button type="primary" @click="batchAllot">批量分配</el-button>
                </el-form-item>
                <el-form-item class="inline-block search-btn f-r">
                  <el-button type="primary" @click="searchAction">搜索</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-table :data="mycustomerData" border @selection-change="handleSelectionChange" v-loading="allotLoading" style="width: 100%">
          <el-table-column type="selection" align="center" width="50">
          </el-table-column>
          <!-- <el-table-column prop="customerNo"
                          label="编号">
          </el-table-column> -->
          <el-table-column prop="phone" label="联系电话" width="110">
            <template scope="scope">
              <span>{{scope.row.phone}}</span>
              <div class="check-following view-phone" @click="activedPhone(scope.row)" v-show="scope.row.activeState==1"></div>

            </template>
          </el-table-column>
          <el-table-column prop="channelTypeList" label="渠道" width="60">
            <template scope="scope">
              {{scope.row.channelTypeList?scope.row.channelTypeList.join(','):''}}
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="60">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="60">
          </el-table-column>
          <el-table-column prop="occurTime" label="行为时间" width="100">
            <template scope="scope">
              <div v-html='formatterTime(scope.row.occurTime)'></div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="address" label="户籍" width="80"> -->
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="100">
          </el-table-column>
          <el-table-column prop="firstAssignedTime" label="首次分配时间" width="105">
            <template scope="scope">
              <div v-html='formatterTime(scope.row.firstAssignedTime)'></div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="lastUpdateTime" label="最后更新时间" width="105"> -->
          </el-table-column>
          <el-table-column prop="accountName" label="责任人">
          </el-table-column>
          <el-table-column prop="contactFlag" label="联系状态">
            <template scope="scope">
              <div v-html='formatterContact(scope.row.contactFlag)'></div>
            </template>
          </el-table-column>
          <el-table-column prop="firstContactTime" label="首次电联时间" width="105">
            <template scope="scope">
              <div class="timeFormat" v-html='formatterExactTime(scope.row.firstContactTime)'></div>
            </template>
          </el-table-column>
          <el-table-column prop="demandId" label="需求情况">
            <template scope="scope">
              <div v-html='formatterDemend(scope.row.demandId)'></div>
            </template>
          </el-table-column>
          <el-table-column prop="demandOther" label="需求备注">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.row)">详情</el-button>
              <el-button size="small" class="orange-btn" @click="handleSdialog(scope.row)">分配</el-button>
              <el-button size="small red-btn" @click="invalidDialog(scope.row)">无效</el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="invalidNum" name="third">
        <!--查询条件-->
        <div class="condition-select">
          <el-form :inline="true" :model="allotSearchCondition" class="demo-form-inline">

            </el-table-column>
            <el-form-item label="最后跟进日期">
              <el-date-picker v-model="alreadyDispatch" @change="searchTimeValue" type="daterange" placeholder="选择日期范围">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="最后跟进人">
              <el-input v-model="allotSearchCondition.responsible" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchAction">搜索</el-button>
            </el-form-item>

          </el-form>
        </div>
        <!--查询条件END-->
        <!--table 列表-->
        <el-table :data="followingData" border v-loading="allotLoading" style="width: 100%">
          <!-- <el-table-column prop="customerNo"
                          label="编号">
          </el-table-column> -->
          <el-table-column prop="phone" label="联系电话">
            <template scope="scope">
              <span>{{scope.row.phone}}</span>
              <div class="check-following view-phone" @click="activedPhone(scope.row)" v-show="scope.row.activeState==1"></div>
            </template>
          </el-table-column>
          <el-table-column prop="channelTypeList" label="渠道">
            <template scope="scope">
              {{scope.row.channelTypeList?scope.row.channelTypeList.join(','):''}}
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="70">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="70">
          </el-table-column>
          <!-- <el-table-column prop="address" label="户籍"></el-table-column> -->
          <el-table-column label="无效原因">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.noEffectValue" placement="bottom">
                <div>{{scope.row.noEffectValueLess}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="最后跟进时间" width="110">
          </el-table-column>
          <el-table-column prop="lastUpdateAccount" label="最后跟进人" width="90">
          </el-table-column>
          <el-table-column label="跟进明细" width="90">
            <template scope="scope">
              <div class="check-following" @click="progressFollow(scope.row)"></div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.row)">详情</el-button>
              <el-button size="small" class="orange-btn" @click="handleSdialog(scope.row)">分配</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]"
      :page-size="pageSize" v-show="pagesShow" layout="total, sizes, prev, pager, next, jumper" :total="totalDatas">
    </el-pagination>
    <!--无效原因弹窗-->
    <el-dialog v-model="invalidReason" class="invalid-reason-dialog" @close="dialogHide('invalidReasonForm')">
      <el-form :inline="true" :model="invalidReasonForm" ref="invalidReasonForm" :rules="rules" class="invalid-reason-dialog">
        <el-form-item class="" label="无效原因" prop="checkValue">
          <el-radio-group v-model="invalidReasonForm.checkValue">
            <el-radio :label="item.enumValue" v-for="item in invalidReasonList.checkOptions">{{item.valueLable}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="other-reason" prop="otherReasonValue" v-show="invalidReasonForm.checkValue == invalidReasonList.otherId"
          label="其他原因">
          <el-input v-model="invalidReasonForm.otherReasonValue" placeholder="请输入少于50字"></el-input>
        </el-form-item>
        <el-form-item class="invalid-reason-btn" :class="{'invalid-reason-btn-spacing':invalidReasonForm.checkValue != '2'}">
          <el-button @click="dialogHide('invalidReasonForm')">取 消</el-button>
          <el-button type="primary" @click="addInvalidList('invalidReasonForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--无效原因弹窗END-->
    <!--详情弹窗-->
    <el-dialog :top="20+'px'" custom-class="user-detail-dialog" @close="dialogHide" v-if="dialogShow" v-model="dialogShow">
      <!-- <user-detail :customerDetailInfo="customerDetailInfo"
                    :customerCheckInfo="customerCheckInfo"
                    :customerDetailList="customerDetailList"
                    :tempObjShow="tempObjShow"
                    v-on:checkValueDetail="getcustomerCheckInfo"
                    v-on:closeFlagSubmit="getcloseFlagSubmit"
                    v-on:markphoneSubmit="getMarkPhone"
                    @customerInfoDetail="getcustomerDetailInfo"
                   >
      </user-detail>
      <span slot="footer"
          class="dialog-footer">
        <el-button type="primary" @click="saveCustomerDetailInfo" class="save-customer-detail">保存</el-button>
      </span> -->
      <user-detail :customer-info-id="customerInfoId" @saveCustomerInfo="doSaveCustomerInfo"></user-detail>
    </el-dialog>
    <!--详情弹窗END-->
    <!--跟踪客户进度-->
    <el-dialog title="客户跟进明细" class="customer-following-steps" v-model="followProgressVisible">
      <ul class="progress-step-container">
        <li class="progress-step-item" v-for="item in progressData">
          <span class="progress-sign"></span>
          <span class="progress-time">{{item.createTime}}</span>
          <span class="progress-content">{{item.content}}</span>
        </li>
      </ul>
    </el-dialog>
    <!--跟踪客户进度end-->
    <!--分配弹窗-->
    <el-dialog v-model="sdialogShow" class="allot-customer-dialog">
      <div class="small-dialog-container">
        <el-table :data="allotCustomerData" border style="width: 100%">
          <el-table-column prop="accountName" label="账号名" width="120">
          </el-table-column>
          <el-table-column prop="followCount" label="跟进中" width="80">
          </el-table-column>
          <el-table-column prop="closeCount" label="成交" width="80">
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template scope="scope">
              <el-button type="text" size="small" @click="allotToResponse(scope.row)">分配</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!--分配弹窗END-->

  </div>
</template>

<script src="./customerallot.component"></script>
