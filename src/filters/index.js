/**
 * Created by leibo on 17/11/13.
 */
//获取日期 格式年-月-日
export const getNewDate = (value) => {
  let reg = /\d+/g
  if (value) {
    var num = value.match(reg)[0];
    var date = new Date(Number(num));
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

};
//支付状态
export const payStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未支付';
    case 1:
      return '已支付';
  }
};
//获取状态
export const getStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '空闲';
    case 1:
      return '锁定';
    default:
      return '使用'
  }
};
//获取启用状态
export const getDelete = (value) => {
  if (Number(value) == 0) {
    return '启用'
  } else {
    return '不启用'
  }
};
//获取入住状态
export const getUseStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未入住';
    case 1:
      return '已入住';
    case 2:
      return '已退房';
    default:
      return '未知';
  }
};
//使用状态
export const getNewUseStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未使用';
    case 1:
      return '已使用';
    case 2:
      return '已退票';
    case 3:
      return '使用中';
    default:
      return '未知';
  }
};
export const useStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未使用';
    case 1:
      return '已使用';
    case 2:
      return '已离店';
    default:
      return '未知';
  }
};
export const getGrade = (value) => {
  switch (Number(value)) {
    case 0:
      return '差评';
    case 1:
      return '中评';
    case 2:
      return '好评'
    default:
      return '未评级';
  }
};
export const getParkType = (val) => {
  switch (Number(val)) {
    case 0:
      return '用餐';
    case 1:
      return '景点';
    case 2:
      return '酒店';
    case 3:
      return '交通';
    default:
      return '未知';
  }
};
export const getEatType = (val) => {
  switch (Number(val)) {
    case 0:
      return '早餐';
    case 1:
      return '午餐';
    case 2:
      return '晚餐';
    default:
      return '未知';
  }
};
export const getOutStatus = (val) => {
  switch (Number(val)) {
    case 0:
      return '出单中';
    case 1:
      return '出单成功';
    case 2:
      return '出单失败';
    default:
      return '未知';
  }
};
export const getCheck = (val) => {
  switch (Number(val)) {
    case 0:
      return '审核中';
    case 1:
      return '通过';
    case 2:
      return '未通过';
    default:
      return '未知';
  }
};
export const getLongOut = val => {
  switch (Number(val)) {
    case 0:
      return '短线';
    case 1:
      return '长线';
    default:
      return '未知';
  }
}
export const getNewLongOut = val => {
  switch (Number(val)) {
    case 0:
      return '国内跟团';
    case 1:
      return '周边跟团';
    case 2:
      return '出境长线';
    case 3:
      return '出境短线';
    default:
      return '未知';
  }
}

export const getSex = val => {
  switch (Number(val)) {
    case 0:
      return '男';
    case 1:
      return '女';
    default:
      return '未知';
  }
};

//三证合一
export const getIncludeCert = val => {
  switch (Number(val)) {
    case 0:
      return '否';
    case 1:
      return '是';
    default:
      return '未知';
  }
}

//审核状态
export const getPass = val => {
  if (val == null) {
    return '未知'
  }
  switch (Number(val)) {
    case 0:
      return '审核中';
    case 1:
      return '审核成功';
    case 2:
      return '审核失败';
    default:
      return '未知';
  }
};

function getNum(num) {
  return num < 10 ? '0' + num : '' + num
}

//时间
export const getUseTime = val => {
  let date = new Date()
  if (!val) {
    return date.getFullYear() + '-' + getNum((date.getMonth() + 1)) + '-' + getNum(date.getDate()) + ' ' + getNum(date.getHours()) + ':' + getNum(date.getMinutes()) + ':' + getNum(date.getSeconds())
  } else {
    if (!val.includes('.')) {
      return val.replace(/T/, ' ')
    } else {
      return val.substring(0, val.indexOf('.')).replace(/T/, ' ')
    }
  }
};

//办理状态
export const getDoStatus = val => {
  switch (Number(val)) {
    case 0:
      return '待审核';
    case 1:
      return '已通过';
    case 2:
      return '未通过';
    default:
      return '未知';
  }
}
//床型
export const getBedType = val => {
  switch (Number(val)) {
    case 1:
      return '单床';
    case 2:
      return '双床';
    case 3:
      return '三床';
    default:
      return '未知';
  }
};
//早餐类型
export const getBreakfastType = val => {
  switch (Number(val)) {
    case 0:
      return '无早';
    case 1:
      return '单早';
    case 2:
      return '双早';
    case 3:
      return '三早';
    case 4:
      return '四早';
    default:
      return '未知';
  }
}
//WAFI
export const getWafiType = val => {
  switch (Number(val)) {
    case 0:
      return '免费WIFI';
    case 1:
      return '免费有线';
    case 2:
      return '收费有线';
    case 3:
      return '收费有线宽带和免费无线宽带';
    case 4:
      return '免费有线宽带和免费无线宽带';
    case 5:
      return '免费有线宽带和收费无线宽带';
    case 6:
      return '收费有线宽带和收费无线宽带';
    case 7:
      return '无';
    default:
      return '未知';
  }
};
//取消类型
export const getCancelType = val => {
  switch (Number(val)) {
    case 0:
      return '可取消';
    case 1:
      return '不可取消';
    case 2:
      return '限时取消';
    default:
      return '未知';
  }
};
//状态
export const getCancelState = val => {
  switch (Number(val)) {
    case 0:
      return '正常';
    case 1:
      return '取消';
    default:
      return '未知';
  }
}
//房间锁定状态
export const getLockStatus = val => {
  switch (Number(val)) {
    case 0:
      return '未锁定';
    case 1:
      return '锁定';
    case 2:
      return '已售出';
    default:
      return '未知';
  }
};
//广告申请是否通过
export const getAdApplyPass = val => {
  switch (Number(val)) {
    case 0:
      return '审核中';
    case 1:
      return '通过';
    case 2:
      return '未通过';
    default:
      return '未知';
  }
};
export const getCarUseStatus = val => {
  switch (Number(val)) {
    case 0:
      return '使用中';
    case 1:
      return '未使用';
    default:
      return '未知';
  }
};

//证件类型
export const getIDType = val => {
  switch (Number(val)) {
    case 1:
      return '二代身份证';
    case 2:
      return '护照';
    case 3:
      return '回乡证';
    case 4:
      return '台胞证';
    default:
      return '未知';
  }
}

//微电影系列连载状态
export const getSeriesState = val => {
  switch (Number(val)) {
    case 0:
      return '连载中';
    case 1:
      return '已完结';
    default:
      return '未知';
  }
};

//微电影系列连载状态
export const getMoneyState = val => {
  switch (Number(val)) {
    case 0:
      return '未确认';
    case 1:
      return '已确认';
    default:
      return '已取消';
  }
};


//微电影审核表视频类型
export const getFilmType = val => {
  switch (Number(val)) {
    case 1:
      return '广告';
    case 2:
      return '微电影';
    case 3:
      return '教育';
    case 4:
      return '栏目';
    case 5:
      return '首页大图';
    default:
      return '未知';
  }
};
//支付状态
export const getPayState = val => {
  switch (Number(val)) {
    case 0:
      return '未支付';
    case 1:
      return '已支付';
    case 2:
      return '已退票';
    default:
      return '未知';
  }
};
//使用状态
export const getUseState = val => {
  switch (Number(val)) {
    case 0:
      return '未使用';
    case 1:
      return '已使用';
    case 2:
      return '已退票';
    default:
      return '未知';
  }
};
//订单类型
export const getOrderType = val => {
  switch (Number(val)) {
    case 0:
      return '网上散客订单';
    case 1:
      return '线下散客订单';
    case 2:
      return '会员订单';
    case 3:
      return '合作企业订单';
    default:
      return '未知';
  }
};
//获取合作类型
export const getPProperType = val => {
  switch (Number(val)) {
    case 1:
      return '美食';
    case 2:
      return '酒店';
    case 3:
      return '旅行社';
    case 4:
      return '门票';
    case 5:
      return '汽车租赁';
    case 6:
      return '广告';
    case 7:
      return '微电影';
    default:
      return '所有';
  }
};
//产品类型
export const getTrandeType = val => {
  switch (Number(val)) {
    case 0:
      return '跟团游';
    case 1:
      return '自由行';
    default:
      return '其他';
  }
}
//是否境外景点
export const getIsOversea = val => {
  switch (Number(val)) {
    case 0:
      return '境内';
    case 1:
      return '境外';
    default:
      return '其他';
  }
}
export const getIsHot = val => {
  switch (Number(val)) {
    case 0:
      return '普通';
    case 1:
      return '热门';
    default:
      return '其他';
  }
}
export const getIsSeasonChoice = val => {
  switch (Number(val)) {
    case 0:
      return '否';
    case 1:
      return '是';
    default:
      return '其他';
  }
}
export const getIsShowTop = val => {
  switch (Number(val)) {
    case 0:
      return '否';
    case 1:
      return '是';
    default:
      return '其他';
  }
}
//审核状态
export const getIsPass = val => {
  switch (Number(val)) {
    case 0:
      return '未审核';
    case 1:
      return '已审核';
    default:
      return '其他';
  }
}
//客户状态
export const getCustomerState = val => {
  switch (Number(val)) {
    case 0:
      return '有效';
    case 1:
      return '冻结';
    default:
      return '其他';
  }
}
//放价保密
export const getPassState = val => {
  switch (Number(val)) {
    case 0:
      return '不保密';
    case 1:
      return '保密';
    default:
      return '其他';
  }
}


//审核状态
export const getWeek = val => {
  switch (Number(val)) {
    case 1:
      return '星期一';
    case 2:
      return '星期二';
    case 3:
      return '星期三';
    case 4:
      return '星期四';
    case 5:
      return '星期五';
    case 6:
      return '星期六';
    case 7:
      return '星期日';
    default:
      return '其他';
  }
}
//展示首页
export const getShowTop = val => {
  switch (Number(val)) {
    case 0:
      return '未审核';
    case 1:
      return '审核通过';
    case 2:
      return '申请中';
    default:
      return '申请失败';
  }
}

export const applyState = val => {
  switch (Number(val)) {
    case 0:
      return '未申请';
    case 1:
      return '申请中';
    case 2:
      return '申请成功';
    case 3:
      return '申请失败';
    default:
      return '其他';
  }
}

export const washRoomState = val => {
  switch (Number(val)) {
    case 0:
      return '无';
    case 1:
      return '有';
    default:
      return '其他';
  }
}
//获取乘车方式
export const getGoWay = val => {
  switch (val) {
    case 0:
      return '汽车';
    case 1:
      return '火车';
    case 2:
      return '飞机';
    case 3:
      return '轮船';
    default:
      return '';
  }
}
//获取早中晚
export const getUseType = val => {
  switch (Number(val)) {
    case 0:
      return '早餐';
    case 1:
      return '中餐';
    case 2:
      return '晚餐';
    default:
      return '其他';
  }
}
//获取美食状态
export const getInclude = val => {
  switch (Number(val)) {
    case 0:
      return '个人自理';
    case 1:
      return '已含';
    default:
      return '其他';
  }
}
//卡状态
export const getCardState = val => {
  switch (Number(val)) {
    case 0:
      return '正常';
    case 1:
      return '作废';
    default:
      return '其他';
  }
};
//订单房间使用状态
export const getOrderRoomState = val => {
  switch (Number(val)) {
    case 0:
      return '未使用';
    case 1:
      return '已使用';
    case 2:
      return '已退票';
    case 3:
      return '使用中';

  }
}
//是否启用
export  const getIsOpen = val=>{
  switch (Number(val)) {
    case 0:
      return '禁用';
    case 1:
      return '启用';
    default:
      return '其他'
  }
}
//是否启用
export  const getAutoCommand = val=>{
  switch (Number(val)) {
    case 0:
      return '否';
    case 1:
      return '是';
    default:
      return '其他'
  }
}


//是否可充值

export const getIsOff = val => {
  switch (Number(val)) {
    case 0:
      return '是';
    case 1:
      return '否';
    default:
      return '其他'

  }
}

export const getHandleState = val => {
  switch (Number(val)) {
    case 0:
      return '未处理';
    case 1:
      return '已处理';
    default:
      return '未知';
  }
}
//电话号码用*
export const setUserCode = val=>{
  return val.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}
export const setSuiName = val=>{
  let xin = ''
  let l = val.length-2
  if(val.length>=3){
    for(var i=0;i<l;i++){
      xin+='*'
    }
    return val.substring(0,1)+xin+val.substring(val.length-1)
  }else{
    return val.substring(0,1)+'*'
  }

}
