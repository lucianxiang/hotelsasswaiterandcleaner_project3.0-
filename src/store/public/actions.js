/**
 * Created by LiuXiang on 18/04/09.
 */
// import request from "request";
import {getNewStr} from '@/assets/js/public'

export default {
  HotelLogin(store,data){
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/Manager/ManagerLogin', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((res) => {
        var res = res.data;
        if (Number(res.resultcode) == 200) {
          relove(res)
        }else{
          reject(res.resultcontent)
        }
      })
    })
  }
}
