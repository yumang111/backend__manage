var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  // API_ROOT: '"http://oldhouseinfo.wh.tst.fdc.com.cn"',
  // //数据字典
  // API_ROOT_DICT: '"http://test.gw.fdc.com.cn"',
  // //homeapi接口
  // API_ROOT_HOME: '"http://test.homeapi.fdc.com.cn"',
  // //用户中心接口地址
  // API_ROOT_UC: '"http://test.uc.fdc.com.cn"',
  // API_ROOT_CRM: '"http://test.scweb.fdc.com.cn"',
  API_ROOT_LOCAL: '"http://huoban.fdc.com.cn"',
  // API_ROOT_LOCAL2: '"http://192.168.20.40"',
})
