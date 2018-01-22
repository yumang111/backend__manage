<style src="./customercount.component.less" lang="less" scoped></style>

<template>
  <div class="dashboard">
    <div class="pichart_wrap backgound-shadow">
      <div class="pichart_title font16_color common-header"><span class="pad20">{{projectHouseName}}</span>客户比例图</div>
      <div class="cf">
        <div class="chart_r" style="width:65%;">
          <div id="myCircleChart"
               style="width: 100%;height:500px;"></div>
        </div>
        <div class="chart_l">
          <div class="totalCus"
               v-show="showChartsData.length">截止目前共有客户<span>{{totalCount}}</span>人</div>
          <ul v-for="(item,index) in showChartsData"
              class="customlist">
            <li v-if="index==1">未成交<span class="noCustomersNum">{{item.value}}</span>人中：</li>
            <li v-if="index!=1"><i class="cuscount_circle"
                 :class="item.classNa"></i>{{item.name+'：'+item.value}}</li>
          </ul>
        </div>
      </div>
  
    </div>
  
    <div class="chart_table backgound-shadow">
      <div class="background-white  font16_color pichart_title  common-header"><span class="pad20">{{projectHouseName}}</span>客户明细</div>
      <!--<button @click="getData" type="button">发起请求</button>-->
      <el-table :data="tableData"
                border
                style="width:100%;">
        <el-table-column prop="orderIndex"
                         label="序号"
                         width="70">
        </el-table-column>
        <el-table-column prop="createTime"
                         label="日期">
        </el-table-column>
        <el-table-column prop="pushCount"
                         label="推送客户">
        </el-table-column>
        <el-table-column prop="manualCount"
                         label="手工录入客户">
        </el-table-column>
          <el-table-column prop="dealedCount"
                         label="已成交">
        </el-table-column>  
         <el-table-column prop="connectedCount"
                         label="已接通">
        </el-table-column> 
        <!-- <el-table-column prop="unconnectedCount"
                         label="未联系">
        </el-table-column>  -->
        <el-table-column prop="unThroughCount"
                         label="未接通">
        </el-table-column> 
        <el-table-column prop="hasDemandCount"
                         label="有需求">
        </el-table-column>
        <el-table-column prop="noDemandCount"
                         label="无需求">
        </el-table-column>
        <el-table-column prop="notMatchedCount"
                         label="不匹配">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageParams.currentPage"
                     :page-sizes="pageParams.pagelist"
                     :page-size="pageParams.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pageParams.totalDatas"
                     class="f-r">
      </el-pagination>
    </div>
  </div>
</template>

<script src="./customercount.component"></script>
