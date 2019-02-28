import {ReadCarId, CancelRead} from '../js/CardReader'

export default {
  data() {
    return {
      cancelTime: 30,
      cancelTimer: null,
      showCancelTime: false,
    }
  },
  created() {
  },
  methods: {
    closeCancelTimer() {
      this.showCancelTime = true;
      this.cancelTimer = setInterval(() => {
        if( this.cancelTime < 1 ){
          clearInterval(this.cancelTimer);
          this.showCancelTime = false;
          CancelRead();
          this.cancelTime = 30;
        }
        this.cancelTime--;
      }, 1000)

    },
    //取消
    closeTimerBtn(){
      clearInterval(this.cancelTimer);
      this.showCancelTime = false;
      CancelRead();
      this.cancelTime = 30;
    },
    //第一次阅读身份证
    getIdCardInfo() {
      this.closeCancelTimer();
      ReadCarId(30000, (data) => {
        if (Number(data.resultcode) == 200) {
          var data = data.data;
          this.orderDetailObj.mainPersonInfo.name = data.Name;
          this.orderDetailObj.mainPersonInfo.idcard = data.Id;
          clearInterval(this.cancelTimer);
          this.cancelTime = 30;
          this.showCancelTime = false;
          CancelRead();
        } else {
          this.$notify({
            message: data.resultcontent,
            type: 'error'
          })
          clearInterval(this.cancelTimer);
          this.cancelTime = 30;
          this.showCancelTime = false;
          CancelRead();
        }
      })
    },
    //其他入住人
    getOtherIdCardInfo(item) {
      this.closeCancelTimer();
      ReadCarId(30000, (data) => {
        if (Number(data.resultcode) == 200) {
          var data = data.data;
          item.name = data.Name;
          item.idcard = data.Id;
          clearInterval(this.cancelTimer);
          this.showCancelTime = false;
          this.cancelTime = 30;
          CancelRead();
        } else {
          this.$notify({
            message: data.resultcontent,
            type: 'error'
          })
          clearInterval(this.cancelTimer);
          this.showCancelTime = false;
          this.cancelTime = 30;
          CancelRead();
        }
      })
    },
  },
  mounted() {
  }
}