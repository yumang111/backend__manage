import vue from 'vue';
import util from './util';
/* eslint-disable */
const ajaxMethod = {
  ajax: function (type, method, param) {
    var param = Object.assign(param, {
      method: method,
      v: 1000,
      timestamp: new Date().getTime(),
    });
    var url = process.env.API_ROOT_LOCAL + "/datamarket" + "/" + method
    return vue.http[type](url, param)
      .then((response) => {
        return response.body.error_response ? response.body : response.body[util.getSuccessMethod(method)];
      }, (response) => {
        console.log('请求post失败')
      })
  },
  ajaxJsonp: function (url, type, method, param) {
    var param = Object.assign(param, {
      method: method,
      v: 1000,
      timestamp: new Date().getTime(),
      // adminId: util.getCookie('adminId')|| util.getCookie('accountId'),
      // accountId:util.getCookie('accountId'),
      // loginName:util.getCookie('realName'),
      // loginId:util.getCookie('accountId'),
    });
    return vue.http[type](process.env[url] + '/router/rest', {
        params: param,
        jsonp: 'uccallback'
      })
      .then((response) => {
        return response.body.error_response ? response.body : response.body[util.getSuccessMethod(method)];
      }, (response) => {
        console.log('请求失败');
      })
  },
}

export default {
  ajax: function (method, param) {
    return ajaxMethod.ajax('post', method, param)
  },
  ajaxJsonp: function (url, method, param) {
    return ajaxMethod.ajaxJsonp(url, 'jsonp', method, param)
  },
}
