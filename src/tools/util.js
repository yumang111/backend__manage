/* eslint-disable */
export default {
  getSuccessMethod(method) {
    let strTempmethod = method.substring(method.indexOf('.') + 1);
    strTempmethod = strTempmethod.replace(/\./g, '_');
    strTempmethod += '_response';
    return strTempmethod;
  },
  getCookie(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=")
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        var c_end = document.cookie.indexOf(";", c_start)
        if (c_end == -1) { c_end = document.cookie.length }
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  },
  // expireHours以小时为单位
  setCookie(c_name, value, expireHours) {
    var exdate = new Date()
    exdate.setHours(exdate.getHours() + expireHours)
    document.cookie = c_name + "=" + escape(value) +
      ((expireHours == null) ? "" : ";expires=" + exdate.toGMTString())
  },
  formatDate(dateStr) {
    var year = dateStr.substring(0, 4);
    var month = dateStr.substring(4, 6);
    var day = dateStr.substring(6, 8);
    var hour = dateStr.substring(8, 10);
    var mins = dateStr.substring(10, 12);
    var second = dateStr.substring(12, 14);
    return year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + second
  },
  formatPhone(value) {
    return value.slice(0, 3) + "****" + value.slice(7);
  },
  formatPhone2(value) {
    return value.slice(0, 3) + "****";
  },
  formatGetTime() {
    const d = new Date(),
          year = d.getFullYear();
    let month = d.getMonth() + 1,
          day = d.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    return year+month+day;
  },
  transferTime(value){
    return value.slice(0,4)+"-"+value.slice(4,6)+"-"+value.slice(6,8);
  },
  transferSexValue(value){
    let data="";
    switch(value){
      case '2':
        data="女";
        break;
      case '1':
        data="男";
        break;
      default :
        data="未知";
        break;
    }
    return data;
  },
};

