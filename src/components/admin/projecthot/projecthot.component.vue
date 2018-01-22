<style src="./projecthot.component.less" lang="less" scoped></style>

<template>
  <div class="projecthot-container">
    <div class="projecthot-wraper backgound-shadow">
      <h2 class="buildingTrence-header font16_color">
          <span>{{projectHouseName}}</span><span>楼盘浏览热度趋势</span>
        </h2>
      <div class="building-chart-wraper">
        <div class="building-chart-header">
          <span>数据来源 : 亿房网</span>
          <div class="time-choose f-r">
            时间 :
            <ul class="time-choose-container">
              <li @click="changeOneChartData(7)"
                  :class="{ active: isActive==7}">前7天</li>
              <li @click="changeOneChartData(30)"
                  :class="{ active: isActive==30}">前30天</li>
              <li @click="changeOneChartData(90)"
                  :class="{ active: isActive==90}">前90天</li>
              <li @click="changeOneChartData('')"
                  :class="{ active: isActive==''}">全部</li>
            </ul>
          </div>
        </div>
        <div class="building-chart"
             id="lineChartOfHouse"
             style="width:100%;height:420px;">
  
        </div>
      </div>
    </div>
    <div class="projecthot-wraper backgound-shadow">
      <div class="cf font16_color buildingTrence-header_wrap">
        <h2 class="buildingTrence-header f-l">
            <span>{{projectHouseName}}</span>楼盘搜索热度趋势
          </h2>
          <p class="f-r search-engine">
            <span class="search_group"><i class="search_circle baidu_color"></i>百度</span>
            <span class="search_group"><i class="search_circle third_color"></i>360</span>
            <span ><i class="search_circle sougou_color"></i>搜狗</span>
          </p>
      </div>
      <div class="building-chart-wraper">
        <div class="building-chart-header">
          <span>数据来源 : 亿房网</span>
          <div class="time-choose f-r">
            时间 :
            <ul class="time-choose-container">
              <li @click="changeKindsChartData(7)"
                  :class="{ active: iskActive==7}">前7天</li>
              <li @click="changeKindsChartData(30)"
                  :class="{ active: iskActive==30}">前30天</li>
              <li @click="changeKindsChartData(90)"
                  :class="{ active: iskActive==90}">前90天</li>
              <li @click="changeKindsChartData('')"
                  :class="{ active: iskActive==''}">全部</li>
            </ul>
          </div>
        </div>
        <div class="building-chart"
             style="width:100%;height:420px;"
             id="kindsOfline">
  
        </div>
      </div>
    </div>
  
  </div>
</template>

<script src="./projecthot.component"></script>
