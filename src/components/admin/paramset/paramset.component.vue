<style src="./paramset.component.less" lang="less"></style>

<template>
  <div class="paramset backgound-shadow paramsetbckg">
    <div class="paramset_Header">项目参数设置</div>
    <div class="paramset_content">
      <div class="project_name">
        <span class="ver-middle">项目名称</span>
        <!--<span v-show="!isItemNameChange"
                  class="project_itemname">{{paramsetData.projectName}}</span>-->
        <el-form :model="numberValidateForm"
                 ref="numberValidateForm"
                 class="demo-ruleForm">
          <el-form-item prop="projectName"
                        :rules="{required: true,validator: checkHname, trigger: 'blur'}">
            <el-input type="projectName"
                      v-model="numberValidateForm.projectName"
                      auto-complete="off"
                      :disabled="isDisabled"
                      class="paramset_input"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="text" @click="changeItemName"
           v-if="!isItemNameChange"
           class="project_change">修改</el-button>
        <el-button type="text" @click="saveItemName('numberValidateForm')"
           v-if="isItemNameChange"
           class="project_change">保存</el-button>
      </div>
      <div class="project_shorkey cf">
        <span class="project_mainname pad7">关键字</span>
        <div class="project_housename_wrap line40">
          <span v-for="item in paramsetData.projectKeys"
                class="project_housename">{{item.keyValue}}</span>
          <el-button type="text" class="project_change line40 marl10"
             @click="showDialogSetData">设置更多关键字</el-button>
        </div>

        <el-dialog title="定制关键字"
                   v-model="dialogVisible"
                   size="tiny">
          <el-form :model="keyWordForm"
                   ref="keyWordForm"
                   label-width="70px"
                   class="demo-dynamic">
            <el-form-item v-for="(domain, index) in keyWordForm.keyWordData"
                          :prop="'keyWordData.' + index + '.keyValue'"
                          class="gjz"
                          :rules="{required: true,validator: checkSky, trigger: 'blur'}">
              <el-input v-model="domain.keyValue"></el-input>
              <el-button @click.prevent="removeShortKey(domain)"
                         icon="delete"
                         type="danger"
                         size="small"></el-button>

            </el-form-item>
            <!--<el-form-item>
              <el-button @click="dialogVisible = false">取 消</el-button>
                                           <el-button @click="addShortKey">新增关键字</el-button>
                                          <el-button type="primary" @click="saveShortKey('keyWordForm')">确 定</el-button>
            </el-form-item>-->
          </el-form>
          <span slot="footer"
                class="dialog-footer">
                                          <el-button @click="dialogVisible = false">取 消</el-button>
                                           <el-button @click="addShortKey">新增关键字</el-button>
                                          <el-button type="primary" @click="saveShortKey('keyWordForm')">确 定</el-button>
                                        </span>
        </el-dialog>
      </div>
      <div class="project_salephoneNum">
        <span class="pad7 sellPhone">销售电话</span>
        <span class="phone_wrap">
                  <span v-for="item in paramsetData.projectLandlines" class="salephoneNum_num"><i class="phone_icon"></i>{{item.landLineNo}}</span>
        <el-button type="text" class="project_change"
           @click="setPhoneNum">设置销售电话</el-button>
        </span>
        <el-dialog title="设置销售电话"
                   v-model="showPhoneDialog"
                   size="tiny">
          <el-form :model="phoneNumeForm"
                   ref="phoneNumeForm"
                   label-width="70px"
                   class="demo-dynamic">
            <el-form-item v-for="(phoneNum, index) in phoneNumeForm.phoneNumeData"
                          :prop="'phoneNumeData.' + index + '.landLineNo'"
                          class="set-sell-phone"
                          :rules="{required: true,validator: checkpNum, trigger: 'blur'}">
              <el-input v-model="phoneNum.landLineNo"></el-input>
              <el-button @click.prevent="removePhoneNum(phoneNum)"
                         icon="delete"
                         type="danger"
                         size="small"></el-button>

            </el-form-item>

          </el-form>
          <span slot="footer"
                class="dialog-footer">
                                          <el-button @click="showPhoneDialog = false">取 消</el-button>
                                           <el-button @click="addPhoneNum">新增电话</el-button>
                                          <el-button type="primary" @click="savePNum('phoneNumeForm')">确 定</el-button>
                                        </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script src="./paramset.component"></script>
