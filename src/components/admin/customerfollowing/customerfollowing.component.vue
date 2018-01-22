<style src="./customerfollowing.component.less" scoped lang="less"></style>


<template>
  <div class="user-manage-container customer-following">
    <!--演示-->
    <el-tabs v-model="activeName" class="customer-manage-tab" @tab-click="allotTab()">
      <el-tab-pane :label="myCustomerNum" name="first">
        <!--查询条件-->
        <div class="condition-select">
          <div class="myCustomer-info table-tips borleft4">
            <div>目前您共有
              <span class="font-blue">{{myFollowingNum}}</span>位客户在跟进，共成交
              <span class="font-orange">{{dealedCustomerNum}}</span>位客户</div>
            <!--<div class="add-customer f-r" @click="addCustomerVisible = true">新增客户</div>-->
            <el-button type="primary f-r addCustomer" @click="addCustomerVisible = true">新增客户</el-button>
          </div>
          <el-form :inline="true" :model="formInline" class="customerSearch__wrapper">

            <el-form-item label="联系状态">
              <el-select class="customerSearch__item--short" v-model="formInline.contactFlag" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option label="未联系" value="0"></el-option>
                <el-option label="未接通" value="1"></el-option>
                <el-option label="已接通" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="需求情况">
              <el-select class="customerSearch__item--short" v-model="formInline.willGrade" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option label="有需求" value="0"></el-option>
                <el-option label="无需求" value="1"></el-option>
                <el-option label="不匹配" value="2"></el-option>
                <!-- <el-option label="无意向"
                                        value="3"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input class="customerSearch__item" v-model="formInline.accountName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item class="mycustomer-search">
              <el-button type="primary" @click="searchAction">查询</el-button>
            </el-form-item>
            <!--<el-form-item>
                            <el-checkbox v-model="formInline.checked">只看未成交客户</el-checkbox>
                          </el-form-item>-->
          </el-form>
        </div>
        <!--查询条件END-->
        <!--table 列表-->
        <el-table :data="followingData" border :row-class-name="tableRowClassName" v-loading="followLoading" style="width: 100%">
          <!-- <el-table-column prop="customerNo" label="编号">
                      </el-table-column> -->
          <el-table-column prop="phone" label="联系电话">
            <template scope="scope">
              <span>{{scope.row.phone}}</span>
              <div class="check-following view-phone" @click="activedPhone(scope.row)" v-show="scope.row.activeState==1"></div>

            </template>
          </el-table-column>
          <el-table-column prop="customerName" label="姓名" width="100">
          </el-table-column>
          <el-table-column label="性别" width="70" prop="sex">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="70">
          </el-table-column>
          <!-- <el-table-column prop="address" label="户籍" width="70"></el-table-column> -->
          <el-table-column prop="contactFlag" label="联系状态" width="100">
          </el-table-column>
          <el-table-column label="需求情况" width="100">
            <template scope="scope">
              <div :class="{'font-green':scope.row.demandDec=='已成交'}">
                {{scope.row.demandDec}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="来源" width="150">
            <template scope="scope">
              <div :class="{'font-orange':scope.row.origin==='1'&&scope.row.synFlag==='0'}" v-html="formatterOrigin(scope.row)"></div>
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="最后操作时间" width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.row)">详情</el-button>
              <el-button size="small red-btn" @click="invalidDialog(scope.row)">无效</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="commonCustomerNum" name="second">
        <!--查询条件-->
        <div class="condition-select">
          <div class="tips borleft4">无效客户也可能是潜在客户，说不定有意外收获</div>
        </div>
        <!--查询条件END-->
        <!--table 列表-->
        <el-table :data="followingData" border v-loading="followLoading" style="width: 100%">
          <!-- <el-table-column prop="customerNo" label="编号">
                      </el-table-column> -->
          <el-table-column prop="phone" label="联系电话" width="150">
            <template scope="scope">
              <span>{{scope.row.phone}}</span>
              <div class="check-following view-phone" @click="activedPhone(scope.row)" v-show="scope.row.activeState==1"></div>

            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="70">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="70">
          </el-table-column>
          <!-- <el-table-column prop="address" label="户籍"></el-table-column> -->
          <el-table-column label="无效原因" width="100">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.noEffectValue" placement="bottom">
                <div>{{scope.row.noEffectValueLess}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdateAccount" label="最后跟进人" width="150">
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="最后跟进时间" width="150">
          </el-table-column>
          <el-table-column label="跟进明细" width="100">
            <template scope="scope">
              <div class="check-following" @click="progressFollow(scope.row)"></div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.row)">详情</el-button>
              <el-button size="small orange-btn" @click="getCustomer(scope.row)">认领</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!--新增客户-->
    <el-dialog size="tiny" v-model="addCustomerVisible" custom-class="add-customer-dialog" @close="dialogHide('ruleaddCustomer')">
      <h2>请输入客户的电话号码</h2>
      <p>我们会补充客户标签信息</p>
      <el-form :model="ruleaddCustomer" :rules="rules" ref="ruleaddCustomer" class="add-customer-form">
        <el-form-item class="add-telphone" prop="tel">
          <el-input v-model="ruleaddCustomer.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCustomerTel('ruleaddCustomer')">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--新增客户END-->
    <!--跟踪客户进度-->
    <el-dialog title="客户跟进明细" class="customer-following-steps" v-model="followProgressVisible">
      <ul class="progress-step-container">
        <li class="progress-step-item" v-for="item in progressData">
          <span class="progress-sign"></span>
          <span class="progress-time">{{item.createTime}}</span>
          <!--respond.data[i].msg=+respond.data[i].accountName+respond.data[i].content;-->
          <span class="progress-content">{{item.content}}</span>
        </li>
      </ul>
    </el-dialog>
    <!--跟踪客户进度end-->
    <!--无效原因弹窗-->
    <el-dialog v-model="invalidReason" class="invalid-reason-dialog" @close="dialogHide('invalidReasonForm')">
      <el-form :inline="true" :model="invalidReasonForm" ref="invalidReasonForm" :rules="rules2" class="invalid-reason-dialog">
        <el-form-item class="" label="无效原因" prop="checkValue">
          <el-radio-group v-model="invalidReasonForm.checkValue">
            <el-radio :label="item.enumValue" v-for="item in invalidReasonList.checkOptions">{{item.valueLable}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="other-reason" prop="otherReasonValue" v-show="invalidReasonForm.checkValue == '2'" label="其他原因">
          <el-input v-model="invalidReasonForm.otherReasonValue" placeholder="请输入少于50字"></el-input>
        </el-form-item>
        <el-form-item class="invalid-reason-btn" :class="{'invalid-reason-btn-spacing':invalidReasonForm.checkValue != '2'}">
          <el-button @click="dialogHide('invalidReasonForm')">取 消</el-button>
          <el-button type="primary" @click="addInvalidList('invalidReasonForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--无效原因弹窗END-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]"
      :page-size="pageSize" v-show="pagesShow" layout="total, sizes, prev, pager, next, jumper" :total="totalDatas">
    </el-pagination>
    <!--用户详情弹窗-->
    <el-dialog :top="20+'px'" custom-class="user-detail-dialog" @close="dialogHide" v-if="dialogShow" v-model="dialogShow">
      <!-- <user-detail :customerDetailInfo="customerDetailInfo" :customerCheckInfo="customerCheckInfo" :customerDetailList="customerDetailList" :tempObjShow="tempObjShow" v-on:checkValueDetail="getcustomerCheckInfo" v-on:closeFlagSubmit="getcloseFlagSubmit" v-on:markphoneSubmit="getMarkPhone" @customerInfoDetail="getcustomerDetailInfo"></user-detail> -->
      <user-detail :customer-info-id="customerInfoId" @saveCustomerInfo="doSaveCustomerInfo"></user-detail>
      <!-- <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="saveCustomerDetailInfo" class="save-customer-detail">保存</el-button>
                  </span> -->
    </el-dialog>
    <!--用户详情弹窗END-->

  </div>
</template>

<script src="./customerfollowing.component"></script>
