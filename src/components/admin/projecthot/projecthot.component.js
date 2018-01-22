
import echarts from 'echarts';
// 引入 ECharts 主模块
import util from '@/tools/util';

import api from '@/api/api';

// var echarts = require('echarts/lib/echarts');
// 引入柱状图
// require('echarts/lib/chart/line');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');

export default {
  name: 'projecthot',
  components: {
  },
  data() {
    return {
      datacollection: null,
      mylinetension: 0,
      curIndex: 1,
      myChartOne: Object,
      myChartMore: '',
      isActive: 7,
      iskActive: 7,
      myChartOneoptions: {
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            let tips = '';
            tips += '<div style="width:186px;heigh:92px;">';
            tips += `<div style="font-size:14px;color:#333;heigh:41px;border-bottom:1px solid #e1e5eb;line-height:42px;padding-left:25px;">${params[0] && params[0].name}</div>`;
            tips += `<div style="height:50px;padding-left:25px;font-size:14px;color:#666;line-height:50px;"><span style="padding-right:48px;">${params[0] && params[0].seriesName}</span><span>${params[0].data}</span></div>`;
            tips += '</div>';
            return tips;
          },
          backgroundColor: '#fff',
          padding: 0,
          extraCssText: 'box-shadow: 0 0 12px rgba(88, 103, 125, 0.4);',
        },
        grid: {
          left: '20px',
          right: '35px',
          bottom: '30px',
          top: '32px;',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // boundaryGap: ['20%', '20%'],
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          data: [],
          max: 'dataMax',
          splitLine: {  // 是否显示网格中的线条
            show: true,
          },
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
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
          },
          axisLine: {
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
        series: [
          {
            name: '浏览量',
            type: 'line',
            stack: '总量',
            // data: [120, 132, 101, 134, 90, 500, 210], // 纵轴
            data: [],
            // filterMode: 'empty',
            symbolSize: 5,  // 圆圈的大小
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#0cbb00',
                },
                borderColor: 'green',
              },
            },
          },
        ],
      },
      searchCountOptions: {
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            const circleBg = ['#005ce3', '#f67300', '#e8003e'];
            const header = `
              <div style="width:245px;">
                <div 
                  style="color:#666;border-bottom:1px solid #e1e5eb;height:41px;line-height:42px;padding-left:25px;">
                  ${params[0] && params[0].name}
                </div>
                <div style="font-size:14px;color:#666;font-weight:bold;padding-left:25px;height:50px;line-height:50px;"><span>搜索引擎</span><span style="float:right;padding-right:42px;">搜索量</span></div>
            `;

            const body = params
              .map((v, index) => `
                <div style="font-size:14px;color:#666;padding:0 0 13px 25px;">
                  <span style="display:inline-block;width:14px;height:14px;border-radius:50%;background-color:${circleBg[index]};position:relative;top:1px;"></span>
                  <span>${v.seriesName}</span>
                  <span style="float:right;padding-right:42px;">${v.data}</span>
                </div>
              `)
              .join('');

            const footer = '</div>';

            return header + body + footer;
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#333',
          },
          padding: 0,
          extraCssText: 'box-shadow: 0 0 12px rgba(88, 103, 125, 0.4)',
        },
        // legend: {
        //   data: ['百度', '360', '搜狗'],
        //   orient: 'vertical',
        //   top: 'center',
        //   right: 'right',
        //   padding: 10,
        //   // selectedMode: 'single',
        //   // textStyle: {
        //   //   color: 'red',
        //   // },
        // },
        grid: {
          left: '20px',
          right: '35px',
          bottom: '30px',
          top: '32px;',
          containLabel: true,
        },
        toolbox: {
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          splitLine: {
            show: true,
          },
          axisLine: {
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
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
          },
          axisLine: {
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
        series: [
          {
            name: '百度',
            type: 'line',
            stack: '总量',
            data: [],
            filterMode: 'empty',
            symbolSize: 0,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#005ce3',
                },
              },
            },
          },
          {
            name: '360',
            type: 'line',
            stack: '总量',
            data: [],
            symbolSize: 0,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#f67300',
                },
              },
            },
          },
          {
            name: '搜狗',
            type: 'line',
            stack: '总量',
            data: [],
            symbolSize: 0,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#e8003e',
                },
              },
            },
          },
        ],
      },
      projectHouseName: util.getCookie('projectName'),
    };
  },
  created() {

  },
  activated() {
    this.projectHouseName = util.getCookie('projectName');
  },
  mounted() {
    this.myChartOne = echarts.init(document.getElementById('lineChartOfHouse'));
    this.myChartMore = echarts.init(document.getElementById('kindsOfline'));
    // this.myChartOne.hideLoading();
    // 绘制图表
    this.getHouseViewCount(7);
    this.getHouseSearchCount(7);
    // myChartMore.setOption();
  },
  methods: {
    getHouseViewCount(day) {
      // this.myChartOne.showLoading({
      //   text: '图表数据正在努力加载...',
      // });
      api.projecthot_getHouseViewCount({
        projectId: util.getCookie('projectId'),
        daySpan: day,
      })
        .then((res) => {
          if (res && res.data) {
            // this.myChartOne.hideLoading();
            this.myChartOneoptions.xAxis.data = res.data.x;
            this.myChartOneoptions.series[0].data = res.data.y;
            this.myChartOne.setOption(this.myChartOneoptions);
          }
        });
    },
    getHouseSearchCount(day) {
      // this.myChartMore.showLoading({
      //   text: '图表数据正在努力加载...',
      // });
      api.projecthot_getHouseSearchCount({
        projectId: util.getCookie('projectId'),
        daySpan: day,
      })
        .then((res) => {
          if (res && res.data) {
            // this.myChartMore.hideLoading();
            this.searchCountOptions.xAxis.data = res.data.x;
            this.searchCountOptions.series[0].data = res.data['y-baidu'];
            this.searchCountOptions.series[1].data = res.data['y-360'];
            // this.searchCountOptions.series[2].data = res.data['y-sougou'];
            this.myChartMore.setOption(this.searchCountOptions);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeOneChartData(Num) {
      this.isActive = Num;
      this.getHouseViewCount(Num);
    },
    changeKindsChartData(Num) {
      this.iskActive = Num;
      this.getHouseSearchCount(Num);
    },
  },
};
