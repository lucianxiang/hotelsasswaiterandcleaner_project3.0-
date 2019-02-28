/**
 * Created by LiuXiang on 18/04/09.
 */
// import request from "request";
import {getNewStr} from '@/assets/js/public'

export default {

  //查询设置会员房型价格
  searchSetVipRoomTypePrice({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberPrice/SignRoomPrice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            let arr = res.data
            relove(res)
          } else {
            reject(res.resultcontent)
          }
        })
    })
  },
  //设置会员房型价格
  setVipMoneySubmit({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberPrice/MakeTypePrice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            let arr = res.data
            relove(res.resultcontent)
          } else {
            reject(res.resultcontent)
          }
        })
    })
  },
  //收银台投诉初始化信息
  initCashierComplaintAction({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelSuggest/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            let arr = res.data
            relove(res)
          } else {
            reject(res.resultcontent)
          }
        })
    })
  },
  //会员初始化信息
  initCashierMenberVipAction({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            let arr = res.data
            relove(res)
          } else {
            reject(res.resultcontent)
          }
        })
    })
  },
  //收银员订单初始化信息
  initCashierOrder({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/OnLineOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            let arr = res.data
            relove(res)
          } else {
            reject(res.resultcontent)
          }
        })
    })
  },
  //收银员初始化信息
  initCashierDeskAction({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/OperateIndex', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            let arr = res.data
            commit('initCashierDeskAction', res.data);
            relove(res)
          } else {
            reject(res.resultcontent)
          }
        })
    })
  },
  //收银员根据条件查询房
  cashierDeskConditionSearchAction({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/OperateIndex', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            commit('cashierDeskConditionSearchAction', res.data);
            relove(res)
          } else {
            reject(res.resultcontent)
          }
        })
    })
  },
  //首页查询条件
  homeSearchConditionAction({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/IndexWhere', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            commit('homeSearchConditionAction', res.data);
            relove(res)
          } else {
            reject(res.resultcontent)
          }
        })
    })
  },
  //首页查询条件
  initSearchCondition({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/IndexWhere', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //首页数据
  initCashierGuestRoom({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/OperateIndex', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data.BuildNoList)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //收银台会员类型查询
  searchVipCardTypeAction({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/CardType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            let arr = res.data
            relove(res)
          } else {
            reject(res)
          }
        })
    })
  },
  //收银台会员类型查询
  onLineDealEnterRoomAction(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/DealOnLine', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            let arr = res.data
            relove(res)
          } else {
            reject(res)
          }
        })
    })
  },
  //订单
  initCashierOrder(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/OnLineOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            relove(res)
          } else {
            reject(res)
          }
        })
    })
  },
  //入住
  checkInSubmit(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/DealOnLine', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            relove(res.resultcontent)
          } else {
            reject(res.resultcontent)
          }
        })
    })
  },
  //发送呼叫消息
  addSendCallContent(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/CallInfo/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          var res = res.data;
          if (Number(res.resultcode) == 200) {
            relove(res.resultcontent)
          } else {
            reject(res.resultcontent)
          }
        })
    })
  },
  initStaffList(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/Manager/SelectManager', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((data) => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店确认订单
  ConfirmOrder(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelOrder/OutOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //消费报表
  initConsumptionForm(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberInfo/CostInfo', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //会员入住率
  initVipRate(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberInfo/MemberInFee', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.data)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //呼叫信息
  initHistoryMessage(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/CallInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
}
