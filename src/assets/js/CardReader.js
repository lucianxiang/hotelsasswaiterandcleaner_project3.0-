var Ajax = {
  get: function (url, fn) {
    // XMLHttpRequest对象用于在后台与服务器交换数据
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      // readyState == 4说明请求已完成
      if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
        // 从服务器获得数据
        fn.call(this, xhr.responseText);
      }
    };
    xhr.send();
  },
  // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
  post: function (url, data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    // 添加http头，发送信息至服务器时内容编码类型
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
        fn.call(this, xhr.responseText);
      }
    };
    xhr.send(data);
  }
}

export const ReadCarId = (maxSecord, fnCallBack) => {

  Ajax.post("http://127.0.0.1:18008", JSON.stringify({action: "GetCarIdInfo", MaxSecord: maxSecord}), function (msg) {
    var data = JSON.parse(msg);
    if (data.resultcode * 1 == 200 || data.resultcode * 1 == 100) {
      //{Name:"",Sex:"",Nation:"名族",Birthday:"生日",Address:"户籍地址",Id:"身份证号",Department:"发证机关",StartDate:"起效日期",EndDate:"有效截至日期",HeadPortrait:"头像"}
      fnCallBack(data);
    }
    else
      fnCallBack(data);
  });
}

export const CancelRead = fnCallBack => {
  Ajax.post("http://127.0.0.1:18008", JSON.stringify({action: "CancelRead"}), function (msg) {
    var data = JSON.parse(msg);
    if (data.resultcode * 1 == 200 || data.resultcode * 1 == 100) {
      //{Name:"",Sex:"",Nation:"名族",Birthday:"生日",Address:"户籍地址",Id:"身份证号",Department:"发证机关",StartDate:"起效日期",EndDate:"有效截至日期",HeadPortrait:"头像"}
      if (fnCallBack && fnCallBack != null)
        fnCallBack(data);
    }
    else
      console.log(msg);
  });
}




