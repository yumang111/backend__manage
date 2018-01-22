import echarts from 'echarts';

import api from '@/api/api';
import util from '@/tools/util';

// 引入 ECharts 主模块

// var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
  name: 'customerimg',
  components: {
  },
  data() {
    return {
      // 月收入图表配置
      salary_month: {
        xAxis: {
          data: [],
          axisLabel: {
            // inside: true,
            textStyle: {
              color: '#999',
              fontSize: '12px',
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#999',
            },
          },
        },
        // dataZoom: [
        //   {
        //     type: 'inside',
        //   },
        // ],
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: { color: 'rgba(0,0,0,0.05)' },
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            // data: dataShadow,
            animation: false,
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                // color: new echarts.graphic.LinearGradient(
                //   0, 0, 0, 1,
                //   [
                //     { offset: 0, color: '#83bff6' },
                //     { offset: 0.5, color: '#188df0' },
                //     { offset: 1, color: '#188df0' },
                //   ],
                // ),
                color: '#9cd159',
              },
              emphasis: {
                // color: new echarts.graphic.LinearGradient(
                //   0, 0, 0, 1,
                //   [
                //     { offset: 0, color: '#2378f7' },
                //     { offset: 0.7, color: '#2378f7' },
                //     { offset: 1, color: '#83bff6' },
                //   ],
                // ),
                color: 'rgba(156,209,89,0.8)',
              },
            },
            data: [],
          },
        ],
      },
      // 月消费图表配置
      waste_month: {
        xAxis: {
          data: [],
          axisLabel: {
            // inside: true,
            textStyle: {
              color: '#999',
              fontSize: '12px',
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#999',
            },
          },
        },
        // dataZoom: [
        //   {
        //     type: 'inside',
        //   },
        // ],
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: { color: 'rgba(0,0,0,0.05)' },
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            // data: dataShadow,
            animation: false,
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                // color: new echarts.graphic.LinearGradient(
                //   0, 0, 0, 1,
                //   [
                //     { offset: 0, color: '#83bff6' },
                //     { offset: 0.5, color: '#188df0' },
                //     { offset: 1, color: '#188df0' },
                //   ],
                // ),
                color: '#4a8ef1',
              },
              emphasis: {
                // color: new echarts.graphic.LinearGradient(
                //   0, 0, 0, 1,
                //   [
                //     { offset: 0, color: '#2378f7' },
                //     { offset: 0.7, color: '#2378f7' },
                //     { offset: 1, color: '#83bff6' },
                //   ],
                // ),
                color: 'rgba(74,142,241,0.8)',
              },
            },
            data: [],
          },
        ],
      },
      // 年龄图表配置
      // age_options: {
      //   xAxis: {
      //     data: [],
      //     axisLabel: {
      //       // inside: true,
      //       textStyle: {
      //         color: '#999',
      //         fontSize: '12px',
      //       },
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     axisLine: {
      //       show: false,
      //     },
      //     z: 10,
      //   },
      //   yAxis: {
      //     axisLine: {
      //       show: false,
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     axisLabel: {
      //       textStyle: {
      //         color: '#999',
      //       },
      //     },
      //   },
      //   // dataZoom: [
      //   //   {
      //   //     type: 'inside',
      //   //   },
      //   // ],
      //   series: [
      //     { // For shadow
      //       type: 'bar',
      //       itemStyle: {
      //         normal: { color: 'rgba(0,0,0,0.05)' },
      //       },
      //       barGap: '-100%',
      //       barCategoryGap: '40%',
      //       // data: dataShadow,
      //       animation: false,
      //     },
      //     {
      //       type: 'bar',
      //       itemStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(
      //             0, 0, 0, 1,
      //             [
      //               { offset: 0, color: '#83bff6' },
      //               { offset: 0.5, color: '#188df0' },
      //               { offset: 1, color: '#188df0' },
      //             ],
      //           ),
      //         },
      //         emphasis: {
      //           color: new echarts.graphic.LinearGradient(
      //             0, 0, 0, 1,
      //             [
      //               { offset: 0, color: '#2378f7' },
      //               { offset: 0.7, color: '#2378f7' },
      //               { offset: 1, color: '#83bff6' },
      //             ],
      //           ),
      //         },
      //       },
      //       data: [],
      //     },
      //   ],
      // },
      age_options: {
        color: ['#3398DB'],
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        //     type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
        //   },
        // },
        grid: {
          left: '20px',
          right: '20px',
          bottom: '36px',
          top: '40px',
          containLabel: true,
        },
        xAxis: [
          {
            // type: 'category',
            data: [],
            // axisTick: {
            //   alignWithLabel: true,
            // },
            axisLine: { // 修改线的颜色
              onZero: false,
              lineStyle: {
                color: '#e1e5eb',
              },
            },
            axisLabel: {  // 修改线文字的颜色
              show: true,
              textStyle: {
                color: '#999',
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: { // 修改线的颜色
              onZero: false,
              lineStyle: {
                color: '#e1e5eb',
              },
            },
            axisLabel: {  // 修改线文字的颜色
              show: true,
              textStyle: {
                color: '#999',
              },
            },
          },
        ],
        series: [
          {
            // name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [],
          },
        ],
      },
      // 姓别比例
      manChartsOptions: {
        backgroundColor: '#ffffff',
        color: ['#Fc9d34', '#378cfe'],
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)',
        // },
        legend: {     // 饼图外的各项数据item
          orient: 'vertical',
          left: '60%',
          top: '30%',
          itemWidth: 8,
          itemHeight: 8,
          // data: [`贷款${data.unit}万/${data.month}个月`, `月供${data.per}元`],
        },
        series: [{    // 饼图的属性配置
          name: '性别比例',
          type: 'pie',
          center: ['49%', '47%'],
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          startAngle: 20,
          itemStyle: {
            normal: {
              label: {
                show: false,
                // formatter: '{b} : {c}\n( {d}% )',
              },
              labelLine: {
                show: false,
              },
              borderWidth: 10,
              borderColor: '#ffffff',
            },
          },
          // 图形样式
          label: {
            normal: {
              show: true,
              position: 'outside',
              textStyle: {
                fontSize: 14,
                color: '#333',
              },
              formatter: '{b} : {c}\n( {d}% )',
            },
          },
          labelLine: {
            normal: {
              show: true,
              // length: 20,
              // length2: 80,
              lineStyle: {
                // width: 2,
                color: '#e1e5eb',
              },
            },
            emphasis: {
              show: true,
              length: 20,
              length2: 80,
              lineStyle: {
                // width: 2,
                color: '#e1e5eb',
              },
            },
          },
          data: [],
        }],
      },
      // 婚否比例
      marriedChartsOptions: {
        backgroundColor: '#ffffff',
        color: ['#378cef', '#FE4847'],
        legend: {     // 饼图外的各项数据item
          orient: 'vertical',
          left: '60%',
          top: '30%',
          itemWidth: 8,
          itemHeight: 8,
        },
        series: [{    // 饼图的属性配置
          name: '性别比例',
          type: 'pie',
          center: ['49%', '47%'],
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          startAngle: 20,
          itemStyle: {
            normal: {
              label: {
                show: false,
                // formatter: '{b} : {c}\n( {d}% )',
              },
              labelLine: {
                show: false,
              },
              borderWidth: 10,
              borderColor: '#ffffff',
            },
          },
          // 图形样式
          label: {
            normal: {
              show: true,
              position: 'outside',
              textStyle: {
                fontSize: 14,
                color: '#333',
              },
              formatter: '{b} : {c}\n( {d}% )',
            },
          },
          labelLine: {
            normal: {
              show: true,
              length: 20,
              length2: 80,
              lineStyle: {
                color: '#e1e5eb',
              },
              // textStyle: {
              //   color: 'red',
              // },
            },
            emphasis: {
              show: true,
              length: 20,
              length2: 80,
              lineStyle: {
                // width: 2,
                color: '#e1e5eb',
              },
            },
          },
          data: [],
        }],
      },
      projectId: util.getCookie('projectId'),
    };
  },
  methods: {
    // 获取性别比列数据
    getSexBiliData() {
      api.useimg_getSexBiliChartsData({
        projectId: this.projectId,
      })
        .then((res) => {
          if (res && res.data) {
            // this.salary_month.
            res.data.splice(0, 1);
            this.manChartsOptions.series[0].data = res.data;
            this.myChartMan.setOption(this.manChartsOptions);
          }
        });
    },
    // 获取婚否比例数据
    getIsMarriedData() {
      api.useimg_getIsMarriedData({
        projectId: this.projectId,
      })
        .then((res) => {
          if (res && res.data) {
            res.data.splice(0, 1);
            this.marriedChartsOptions.series[0].data = res.data;
            this.chartsOfMarried.setOption(this.marriedChartsOptions);
          }
        });
    },
    // 获取年龄柱状图的数据
    getAgeChartsData() {
      api.useimg_getAgeLineData({
        projectId: this.projectId,
      })
        .then((res) => {
          this.age_options.xAxis[0].data = res.data.xLine;
          this.age_options.series[0].data = res.data.yLine;
          this.chartsAgeP.setOption(this.age_options);
        });
    },
    // 获取月收入柱状图的数据
    getMonthSalaryData() {
      api.useimg_getMonthSalaryData({
        projectId: this.projectId,
      })
        .then((res) => {
          if (res && res.data) {
            if (res && res.data) {
              this.salary_month.xAxis.data = res.data.xLine;
              this.salary_month.series[1].data = res.data.yLine;
              this.chartsSalaryMounth.setOption(this.salary_month);
            }
          }
        });
    },
    // 月消费图表数据
    getMonthWatse() {
      api.useimg_getMonthWasteData({
        projectId: this.projectId,
      })
        .then((res) => {
          if (res && res.data) {
            this.waste_month.xAxis.data = res.data.xLine;
            this.waste_month.series[1].data = res.data.yLine;
            this.chartsWasteMounth.setOption(this.waste_month);
          }
        });
    },
  },
  mounted() {
    // const myChartOne = echarts.init(document.getElementById('chartsOfsex'));
    this.myChartMan = echarts.init(document.getElementById('chartsOfman'));
    this.chartsOfMarried = echarts.init(document.getElementById('chartsOfMarried'));
    this.chartsSalaryMounth = echarts.init(document.getElementById('charts_salary_mounth'));
    this.chartsWasteMounth = echarts.init(document.getElementById('charts_mounth_watse'));
    this.chartsAgeP = echarts.init(document.getElementById('charts_age_p'));
    // chartsAgeP.setOption(this.age_options);

    this.getSexBiliData(); // 性别比列
    this.getIsMarriedData(); // 婚否比例
    this.getAgeChartsData(); // 年龄分布
    this.getMonthSalaryData(); // 月收入
    this.getMonthWatse(); // 月消费
  },
};
