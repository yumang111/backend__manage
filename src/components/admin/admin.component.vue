<style src="./admin.component.less" lang="less" scoped></style>

<template>
  <el-row class="container">
    <el-col :span="24"
            class="main">
      <aside>
        <!--导航菜单-->
        <list-aside></list-aside>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24"
                  class="content-wrapper">
  
            <router-view></router-view>
  
          </el-col>
        </div>
      </section>
    </el-col>
    <!--<div class="info-setting-container">
      <el-dialog class="info-setting"
                 @close="resetDialogFlag"
                 v-model="dialogFlag">
        <el-tabs class="info-set-tabs"
                 v-model="activeName2"
                 type="card">
          <el-tab-pane label="个人信息"
                       name="first">
            <user-info></user-info>
          </el-tab-pane>
          <el-tab-pane label="密码"
                       name="second">
            <password></password>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>-->
  
  </el-row>
</template>

<script src="./admin.component"></script>
