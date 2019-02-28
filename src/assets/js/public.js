/**
 * Created by leibo on 17/11/11.
 */

import clsIDCard from './clsIDCard'

function toZear(num) {
  return num < 10 ? '0' + num : '' + num;
}

export const toZear2 = num => {
  return num < 10 ? '0' + num : '' + num;
}

//获取 年-月-日
export const getDateName = (obj, format) => {
  return obj.getFullYear() +
    format + toZear((obj.getMonth() + 1)) +
    format + toZear(obj.getDate())
}
//日期格式化
export const dateFormat = (fmt, date) => {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export const IsBackCode = (data, _this) => {
  if (data.backCode === '005' || data.backCode === '001' || data.backCode === '002' || data.backCode === '003' || data.backCode === '004' || data.backCode === '000') {
    _this.$message({
      showClose: true,
      message: data.backResult,
      type: 'error'
    });
  }
};
//POST,Promise请求
export const postPromise = (url, data) => {
  return new Promise(function(relove, reject) {
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else { // code for IE6, IE5
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xhr == null) {
      alert('您的浏览器不支持AJAX！');
      return;
    }
    // let oStr = '';
    // for (var key in data) {
    //   oStr += key + "=" + data[key] + "&";
    // }
    // ;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 1 || xhr.readyState == 2 || xhr.readyState == 3) {
        // 本地提示：加载中/处理中
      }
      if (xhr.readyState == 4 && xhr.status == 200) {
        relove(xhr.responseText)
      }
    }
  })
}

//前一天
export const getBeforeDay = (d, o) => {
  var m = new Date(d).getTime();
  var c;
  if (!o) {
    c = m - 86400000;
  } else {
    c = m + 86400000;
  }
  var newDate = new Date(c)
  return newDate.getFullYear() + '-' + toZear(newDate.getMonth() + 1) + '-' + toZear(newDate.getDate())
}

//从数组中删除错误的值
export const compact = (arr) => arr.filter(Boolean);

export const isCardID = code => {
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  var tip = "";
  var pass = true;

  // /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
  if (!code || !/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(code)) {
    tip = "身份证号格式错误";
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  if (!pass) return {
    tip,
    pass,
    code: 400
  };
  return {
    tip: "校验位成功",
    pass: true,
    code: 200
  }
};

export const isPhone = id => {
  return /^1[0-9]{10}$/.test(id);
};
//http://hly.1000da.com.cn

//传入日期返回天数
export const getDaysByDateString = (dateString1, dateString2) => {
  var startDate = Date.parse(dateString1.replace('/-/g', '/'));
  var endDate = Date.parse(dateString2.replace('/-/g', '/'));
  var diffDate = (endDate - startDate) + 1 * 24 * 60 * 60 * 1000;
  var days = diffDate / (1 * 24 * 60 * 60 * 1000);
  return days;
}
export const FormattedData =(data)=> {
  var result = new Array();
  Array.prototype.Select = function (fn_obj_obj) {
    var nArry = new Array();
    for (var key = 0; key < this.length; key++)
      nArry.push(fn_obj_obj(this[key]));
    return nArry;
  };
  Array.prototype.Where = function (fn_obj_bool) {
    var nArry = new Array();
    for (var key = 0; key < this.length; key++)
      if (fn_obj_bool(this[key]))
        nArry.push(this[key]);
    return nArry;
  };
  Array.prototype.FirstOrDefault = function (fn_obj_bool) {
    for (var key = 0; key < this.length; key++)
      if (fn_obj_bool(this[key])) return this[key];
    return null;
  };
  Array.prototype.GroupBy = function (fn_obj_val) {
    var nArry = new Array();
    for (var key = 0; key < this.length; key++) {
      var tVal = fn_obj_val(this[key]);
      var tArry = nArry.FirstOrDefault(function (n) { return fn_obj_val(n[0]) == tVal; });
      if (tArry == null) {
        tArry = new Array();
        tArry.push(this[key]);
        nArry.push(tArry);
      } else {
        tArry.push(this[key]);
      }
    }
    return nArry;
  };

  var nList = data.Select(function (u) {
    var tArry = u.HouseNumber.split('-');
    if (tArry.length == 2) {
      return {
        Id:u.Id,
        Tung: 1,
        Layer: tArry[0],
        Number: tArry[1],
        HouseNumber : u.HouseNumber
      };
    } else {
      return {
        Id:u.Id,
        Tung: tArry[0],
        Layer: tArry[1],
        Number: tArry[2],
        HouseNumber : u.HouseNumber
      };
    }
  })
  return nList.GroupBy(function (u) { return u.Tung; }).Select(function (u) {
    var LayerArry = u.GroupBy(function (n) { return n.Layer; });
    return {
      Tung: u[0].Tung,
      num:0,
      LayerArry: LayerArry.Select(function (n) {
        return {
          Layer: n[0].Layer,
          HouseArry: n.Select(function (z) {
            return {
              Id: z.Id,
              HouseNumber: z.HouseNumber,
              Number: z.Number,
              isOff:false
            }
          })
        }
      })
    }
  });
}



//判断是否是微信内置浏览器
export const isWeiXin = () => {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}


//验证邮箱

export const isEmil = str => {
  return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str)
}


//验证手机号码
export const isPhoneNum = id => {
  return /^1[0-9]{10}$/.test(id);
}

//验证身份证
export const isCardNo = CardNoID => {
  var checkFlag = new clsIDCard(CardNoID);
  return checkFlag.IsValid();
};
//返回传递给他的任意对象的类
function isClass(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8, -1);
}
//深度克隆
export const deepClone = (obj) => {
  var result = {},
    oClass = isClass(obj);
  if (oClass === "Object") {
    result = {};
  } else if (oClass === "Array") {
    result = [];
  } else {
    return obj;
  }
  for (var key in obj) {
    var copy = obj[key];
    if (isClass(copy) == "Object") {
      result[key] = deepClone(copy);
    } else if (isClass(copy) == "Array") {
      result[key] = deepClone(copy);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};
export const getHouseNumber = v=>{
  if(v){
    let arr = v.split(',');
    let one = arr[0].split('-')
    let newArr = []
    if(one.length>2){
      //3个
      for(var i=0;i<arr.length;i++){
        let arrList = arr[i].split('-');
        newArr.push( arrList[0]+'栋'+arrList[1]+'楼'+arrList[2]+'号')
      }
    }else{
      //2个
      for(var i=0;i<arr.length;i++){
        let arrList = arr[i].split('-');
        newArr.push( arrList[0]+'楼'+arrList[1]+'号')
      }
    }
    return newArr.join(',')
  }
}
//处理数据
export const getSortList = (foodList, hotelList, tourList) => {
  let newArr = [];
  newArr = foodList.concat(tourList, hotelList)
  for (var i = 0; i < newArr.length; i++) {
    // ||newArr[i].ts_hl_Time||newArr[i].ts_ts_Time
    if (newArr[i].ts_fd_Time) {
      newArr[i].time = newArr[i].ts_fd_Time
    }
    if (newArr[i].ts_hl_Time) {
      newArr[i].time = newArr[i].ts_hl_Time
    }
    if (newArr[i].ts_ts_Time) {
      newArr[i].time = newArr[i].ts_ts_Time
    }

    if (newArr[i].ts_fd_Image) {
      if (newArr[i].ts_fd_Image !== 'null') {
        newArr[i].ts_fd_Image = JSON.parse(newArr[i].ts_fd_Image)
      } else {
        newArr[i].ts_fd_Image = [];
      }
    } else {
      newArr[i].ts_fd_Image = [];
    }
    if (newArr[i].ts_hl_HotelImage) {
      if (newArr[i].ts_hl_HotelImage !== 'null') {
        newArr[i].ts_hl_HotelImage = JSON.parse(newArr[i].ts_hl_HotelImage)
      } else {
        newArr[i].ts_hl_HotelImage = [];
      }
    } else {
      newArr[i].ts_hl_HotelImage = [];
    }
    if (newArr[i].ts_ts_Image) {
      if (newArr[i].ts_ts_Image !== 'null') {
        newArr[i].ts_ts_Image = JSON.parse(newArr[i].ts_ts_Image)
      } else {
        newArr[i].ts_ts_Image = [];
      }
    } else {
      newArr[i].ts_ts_Image = [];
    }
  }
  return newArr.sort(function(a, b) {
    if (a.time < b.time) {
      return -1;
    } else if (a.time > b.time) {
      return 1;
    } else {
      if (a.time < b.time) {
        return 1;
      } else if (a.time > b.time) {
        return -1;
      }
      return 0;
    }
  })
};
//判断是否是对象
export function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
//判断是否是数组
export function isArray(a) {
  return Object.prototype.toString.call(a) === "[object Array]";
}
//判断是否是空对象
export function isEmptyObject(o) {
  return !Object.keys(o).length;
}
//去重
export function distinct(target) {
  const tempArr = [];
  target.forEach(item => {
    if (!tempArr.includes(item)) {
      tempArr.push(item);
    }
  });
  return tempArr;
}

//返回不同的码
export const generateUUID = ()=>{
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}


//去掉字符串头尾空格
function valueTrim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

//验证座机号
export const valiDateTel = v => {
  var reg = /^(\d3,4|\d{3,4}-)?\d{7,8}$/;
  v = valueTrim(v);
  if (!reg.test(v)) {
    return false;
  }
  return true;
};


//http://hly.1000da.com.cn
export const getNewStr = '/api';//   /api
