import echarts from 'echarts';
import api from '@/api/api';
import util from '@/tools/util';
// 引入柱状图
// require('echarts/lib/chart/bar');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
/* eslint-disable consistent-return*/
/* eslint-disable consistent-return*/
export default {
  name: 'customercount',
  data() {
    return {
      msg: '待确认',
      formInline: {
        user: '',
        region: '',
        checked: true,
      },
      pageParams: {
        currentPage: 1, // 当前是第多少页
        pages: 1, // 输入即将查询的页码
        totalDatas: null, // 总共多少条数据
        totalPages: 1, // 总页数
        pageSize: 10, // 每页显示多少条数据
        pagelist: [5, 10, 20], // 预定义的页码数组 这个可以进行抽离
        adminId: util.getCookie('adminId') || util.getCookie('accountId'),
        // accountId: util.getCookie('accountId') || util.getCookie('adminId'),
      },
      totalCount: '',
      itemColor: ['#5695f2', '#534dfc', '#e44e4e', '#fc9d34'],
      tableData: [],
      showChartsData: [],
      projectHouseName: util.getCookie('projectName'),
    };
  },
  methods: {
    //  每页多少条
    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.rungetTableData();
    },
    // 切换页数
    handleCurrentChange(val) {
      this.pageParams.currentPage = val;
      this.rungetTableData();
    },
    rungetTableData() {
      this.getTableLisData().then((data) => {
        this.tableData = data.dataList;
        this.pushIndexOrderInData(data.dataList);
        this.operateTime(data.dataList);
        this.pageParams.totalDatas = Number(data.totalDatas);
        this.pageParams.totalPages = data.totalPages;
      });
    },
    getChartData() {
      return new Promise((resolve) => {
        api
          .usecount_getCustonCountChartData({
            adminId: util.getCookie('adminId') || util.getCookie('accountId'),
            // accountId: util.getCookie('accountId') || util.getCookie('adminId'),
          })
          .then((res) => {
            if (res && res.data) {
              this.totalCount = res.data[0].value;
              resolve(res.data);
            }
          });
      });
    },
    getTableLisData() {
      return new Promise((resolve) => {
        api.usecount_getCustonTableListData(this.pageParams).then((res) => {
          if (res && res.data) {
            if (res.data.dataList) {
              res.data.dataList.forEach((v) => {
                if (v.createTime) {
                  v.createTime = util.transferTime(v.createTime);
                  return v;
                }
              });
            }
            resolve(res.data);
          }
        });
      });
    },
    // 给表格增加序号
    pushIndexOrderInData(data) {
      data.forEach((item, index) => {
        const temp = item;
        temp.orderIndex =
          index +
          1 +
          (this.pageParams.currentPage - 1) * this.pageParams.pageSize;
        return temp;
      });
    },
    // 格式化时间
    operateTime(data) {
      data.forEach((item) => {
        if (item.createTime) {
          return `${item.createTime.substring(
            0,
            4,
          )}-${item.createTime.substring(4, 6)}-${item.createTime.substring(
            6,
            8,
          )}`;
        }
      });
    },
  },
  components: {},
  activated() {
    this.projectHouseName = util.getCookie('projectName');
  },
  created() {
    this.rungetTableData();
  },
  mounted() {
    const myChart = echarts.init(document.getElementById('myCircleChart'));
    this.getChartData().then((resdata) => {
      resdata.splice(0, 1);
      this.showChartsData = resdata.slice();
      let allNum = 0;
      const classArr = ['highwilingbuy', 'surebuy', 'albuy', 'nowilingbuy'];
      classArr.forEach((v, k) => {
        console.log(v, k);
        resdata[k].classNa = v;
        if (k !== 0) {
          allNum += resdata[k].value;
        }
        console.log(allNum);
      });
      this.showChartsData.splice(1, 0, { name: '', value: allNum });
      console.log(this.showChartsData, 'this.showChartsData');
      myChart.setOption({
        title: {
          // text: '某站点用户访问来源',
          // subtext: '纯属虚构',
          x: 'center',
        },
        color: this.itemColor,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['25%', '40%'],
            center: ['48%', '35%'],
            data: resdata,
            label: {
              normal: {
                show: true,
                position: 'outside',
                textStyle: {
                  fontSize: 14,
                  color: '#666',
                },
                formatter: '{b} : {c}\n( {d}% )',
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 15,
                length2: 50,
                lineStyle: {
                  color: '#e1e5eb',
                },
              },
              emphasis: {
                show: true,
                length: 15,
                length2: 50,
                lineStyle: {
                  color: '#e1e5eb',
                },
              },
            },
          },
        ],
      });
    });
    // 绘制图表
  },
};
