
<style src="./accountsettings.component.less" scoped lang="less" scoped></style>
<template>
  <div class="backgound-shadow accountsettings">
    <div class="common-header background-white bor">
      <span class="borleft4">账号标签</span>
    </div>
    <div class="account-attr">
      账号属性：
      <span class="accountAttr" v-show="tags.indexOf('1')!=-1">新房</span>
      <span class="accountAttr" v-show="tags.indexOf('2')!=-1">装修</span>
    </div>
  </div>
</template>

<script src="./accountsettings.component"></script>
