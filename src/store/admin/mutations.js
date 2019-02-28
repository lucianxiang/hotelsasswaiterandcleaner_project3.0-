/**
 * Created by LiuXiang on 18/04/09.
 */
export default  {
  initHotelInfomation(state,data) {
    state.hotelInfomationObj = data;
  },
  initHotelRoom(state, data) {
    for (let i = 0; i < data.length; i++) {
      if(data[i].ht_bt_ImagePath){
        data[i].ht_bt_ImagePath = data[i].ht_bt_ImagePath.split(',')
      }else{
        data[i].ht_bt_ImagePath = []
      }

    }
    state.hotelRoomList = data;
  },
  UpdateHotelRoom(state, id) {
    state.updateHotelRoomObj = state.hotelRoomList.filter(item => {
      if (item.ht_bt_RoomID == id) {
        return true;
      }
      return false;
    })[0]
  },
  initHotelRoomFacilitiesType(state, data) {
    state.hotelRoomFacilitiesTypeList = data;
  },
  initHotelRoomProduct(state, data) {
    state.hotelRoomProductList = data;
  },
  initHotelRoomEntity(state, data) {
    for (let i = 0; i < data.length; i++) {
      data[i].ht_re_ImagePath = data[i].ht_re_ImagePath.split(',')
    }
    state.hotelRoomEntityList = data;
  },
  initRoomFacilities(state, data) {
    state.roomFacilitiesList = data;
  },

  UpdateHotelRoomProduct(state, id) {
    state.updateHotelRoomProductObj = state.hotelRoomProductList.filter(item => {
      if (item.ht_rpp_ID == id) {
        return true;
      }
      return false;
    })[0]
  },

  initHotelRoomRoomFacilities(state, data) {
    state.hotelRoomRoomFacilitiesList = data;
  },

  initHotelID(state, id) {
    state.hotelID = id;
  },

  UpdateHotelRoomEntity(state, id) {
    state.updateHotelRoomEntityObj = state.hotelRoomEntityList.filter(item => {
      if (item.ht_re_Id == id) {
        return true;
      }
      return false;
    })[0]
  },
}



