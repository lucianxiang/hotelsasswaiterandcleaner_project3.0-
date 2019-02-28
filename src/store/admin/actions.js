/**
 * Created by LiuXiang on 18/04/09.
 */
import {getNewStr} from '@/assets/js/public'
//
export default {
  //会员初始化信息
  initAdminMenberVipAction({commit}, data) {
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
  //后台会员添加
  adminVipAddAction(store, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/MemberInfo/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //后台会员卡片类型查询
  adminVipSearchCardTypeAction(store, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/CardType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //后台会员修改
  adminVipUpdateAction(store, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/MemberInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //酒店信息
  initHotelInfomation({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelWebPage/Detail', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initHotelInfomation', data.data.HotelModel)
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //初始化房间
  initHotelRoom({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/Room/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          let arr = data.data;
          commit('initHotelRoom', data.data);
          relove(Number(data.totalrows))
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加房间
  AddHotelRoom({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/Room/Insert', JSON.stringify(data), {
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
  //修改酒店房间
  UpdateHotelRoom({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/Room/Update', JSON.stringify(data), {
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
  //删除酒店房间
  DeleteHotelRoom({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/Room/Delete', JSON.stringify(data), {
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
  //房间设施
  initRoomFacilities({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomHard/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          commit('initRoomFacilities', data.data);
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加房间房间设施
  AddHotelRoomRoomFacilities({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomTypeHard/Insert', JSON.stringify(data), {
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
  //修改房间房间设施
  UpdateHotelRoomRoomFacilities({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomTypeHard/Update', JSON.stringify(data), {
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
  //删除房间房间设施
  DeleteHotelRoomRoomFacilities({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomTypeHard/Delete', JSON.stringify(data), {
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
  //惠乐游房间设施类型
  initHotelRoomFacilitiesType({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomHardType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          commit('initHotelRoomFacilitiesType', data.data)
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //初始化房间产品
  initHotelRoomProduct({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomProductPrice/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          commit('initHotelRoomProduct', data.data);
          relove(Number(data.totalrows))
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加房间产品
  AddHotelRoomProduct({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomProductPrice/Insert', JSON.stringify(data), {
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
  //修改酒店房间产品
  UpdateHotelRoomProduct({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomProductPrice/Update', JSON.stringify(data), {
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
  //删除酒店房间产品
  DeleteHotelRoomProduct({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomProductPrice/Delete', JSON.stringify(data), {
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
  //初始化房间实体
  initHotelRoomEntity({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomEntity/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          commit('initHotelRoomEntity', data.data);
          relove(Number(data.totalrows))
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加房间实体
  AddHotelRoomEntity({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomEntity/BathInsert', JSON.stringify(data), {
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
  //修改房间实体
  UpdateHotelRoomEntity({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomEntity/Update', JSON.stringify(data), {
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
  //删除房间实体
  DeleteHotelRoomEntity({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomEntity/Delete', JSON.stringify(data), {
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
  //初始化酒店房间房间设施
  initHotelRoomRoomFacilities({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomTypeHard/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            if (data.data.length) {
              commit('initHotelID', data.data[0].ht_ht_hotelID)
            }
            commit('initHotelRoomRoomFacilities', data.data);
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //房间实体生成房间
  AddHotelRoomNumber({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoomSeat/GenerateRoom', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //查询酒店员工
  initHotelStaffAdmin({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/Manager/SelectManager', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //查询角色
  initHotelRole({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoleInfo/Select', JSON.stringify(data), {
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

  //添加角色权限

  addHotelStaffAdmin({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/Manager/AddManager', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //修改角色权限

  updateHotelStaffAdmin({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/Manager/UpdateManager', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //修改密码

  updateHotelStaffAdminPassword({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/Manager/ModifyPassword', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //投诉
  initHotelComplaint({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelSuggest/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //回复投诉
  replyComplaint({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/HotelResponse', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //合作企业
  initHotelEnterprise({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/UnitInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加合作企业
  addHotelEnterprise({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/UnitInfo/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改合作企业
  updateHotelEnterprise({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/UnitInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //清洁员报表
  initHotelCleanerForm({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/CleanerWorkBill', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //查询财务报表
  initFinancialStatements(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/MoneyBill', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //用户入住率
  initGuestForm(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/UserInFee', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化会员
  initHotelMemberVIP(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //在住信息
  initHotelInRoomInfo(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/RoomCustomData', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //远期房态
  initLongRoomState(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/NearDateState', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //续住
  continuedResidence(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/BookGoOn', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //账单
  initUserOrder(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/BillPage', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //锁房
  hotelLockRoomConfirm(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/LockOper', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //取消锁房
  cancelHotelLockRoom(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/LockOper', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化选房List
  initCheckInSelectRoom(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/RoomInfo', JSON.stringify(data), {
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
  //置脏或置为维修
  updateDirtyRoom(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/MakeRoomDirty', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //房间操作
  roomOperationOver(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/MakeRoomClean', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //查询房间状态
  searchRoomDate(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/GetRoomState', JSON.stringify(data), {
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
  //线下下订单
  outPlacingOrder(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/MakeHotelOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //交押金
  handOverDeposit(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApiSe/PayFrontMoney', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化支付方式
  initHotelPayWay(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApiSe/PayWayInfo', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //查询押金
  initSearchDeposit(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApiSe/QueryFrontMoney', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //合作企业
  initCooperativeEnterprise(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/UnitInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //退房金额查询
  hotelSettleAccounts(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApiSe/GetBackMoney', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //退房
  hotelCheckOut(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/BalanceBill', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //退款方式
  initRefundType(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApiSe/OutPayInfo', JSON.stringify(data), {

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //取消订单
  hotelCancelOrder(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApiSe/ReturnBill', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改会员密码
  updateVIPPassword(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberInfo/ModifyPayCode', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //充值VIP
  confirmPayVIP(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberInfo/ChargeMoney', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化会员卡类型
  initVipCardType(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/CardType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加
  addVipTypeCardSubmit(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/CardType/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改
  updateVipCardTypeSubmit(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/CardType/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //查询会员
  initVipUserCard(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加会员
  addVipUserCard(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberInfo/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改会员
  updateVipUserCard(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改会员支付密码
  updateVipPayPasswordSubmit(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberInfo/ModifyPayCode', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //会员充值
  vipRechargeSubmit(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/MemberInfo/ChargeMoney', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },

  //初始化合作企业房间列表

  initHotelCooperationRoom(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/UnitPrice/UnitRoomPrice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },

  //修改合作企业房间列表

  updateCooperationRoomMoneySubmit(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/UnitPrice/MakeUnitTypePrice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },

  //初始化内部角色

  initAllAdmin(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelApi/InnerRoleSelect', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },

  //添加角色

  addHotelAdminOptions(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoleInfo/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },

  //修改角色

  updateHotelAdminOptions(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/RoleInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //查询系统OTA
  initSysEnumOTA(store,data){
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/OTAManage/GetSysEnum', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.data);
        } else {
          reject(data.resultcontent);
        }
      })
    })
  },
  //酒店OTA
  initHotelOTA(store,data){
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/OTAManage/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.data);
        } else {
          reject(data.resultcontent);
        }
      })
    })
  },
  //修改酒店OTA
  UpdateOTAAdmin(store,data){
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/OTAManage/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent);
        } else {
          reject(data.resultcontent);
        }
      })
    })
  },
  //添加酒店OTA
  AddOTAAdmin(store,data){
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/OTAManage/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent);
        } else {
          reject(data.resultcontent);
        }
      })
    })
  }

}

