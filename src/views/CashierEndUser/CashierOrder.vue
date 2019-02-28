<template>
  <div>
    <!--标题-->
    <h1 class="wrapTitle">订单管理</h1>
    <!--搜索-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>订单筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="options.onLineNo" auto-complete="off" placeholder="凭证码"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="options.telephone" auto-complete="off" placeholder="手机号"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="options.userCode" auto-complete="off" placeholder="账号" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="options.payState" placeholder="请选择支付状态" size="small">
            <el-option v-for="item in payStateList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-select v-model="options.useState" placeholder="请选择使用状态" size="small">-->
        <!--<el-option-->
        <!--v-for="item in useStateList"-->
        <!--:key="item.id"-->
        <!--:label="item.name"-->
        <!--:value="item.id">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table v-loading="isLoading" :data="cashierOrderList" row-key="id" :expand-row-keys="expands"
              @row-click="rowClick" border style="width: 100%;height: 100%;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单ID:">
              <span>{{ props.row.ht_or_OrderID }}</span>
            </el-form-item>
            <el-form-item label="用户编码:">
              <span>{{ props.row.ht_or_UserID }}</span>
            </el-form-item>
            <el-form-item label="用户名称:">
              <span>{{ props.row.ht_or_UserName }}</span>
            </el-form-item>
            <el-form-item label="商户编码:">
              <span>{{ props.row.ht_or_TouristTraderID }}</span>
            </el-form-item>
            <el-form-item label="商户名称:">
              <span>{{ props.row.ht_or_TouristTraderName }}</span>
            </el-form-item>
            <el-form-item label="凭证码:">
              <span>{{ props.row.ht_or_Password }}</span>
            </el-form-item>
            <el-form-item label="总间数:">
              <span>{{ props.row.ht_or_TicketCount}}间</span>
            </el-form-item>
            <el-form-item label="总的网售手续费:">
              <span>{{ props.row.ht_or_SumService ? props.row.ht_or_SumService : 0 }}元</span>
            </el-form-item>
            <el-form-item label="出单状态:">
              <span>{{ props.row.ht_or_OutStatus | getOutStatus }}</span>
            </el-form-item>
            <el-form-item label="单价:">
              <span>{{ props.row.ht_or_FullPrice ? props.row.ht_or_FullPrice : 0 }}元</span>
            </el-form-item>
            <el-form-item label="入住日期:">
              <span>{{ props.row.ht_or_InDate }}</span>
            </el-form-item>
            <el-form-item label="离店日期:">
              <span>{{ props.row.ht_or_OutDate }}</span>
            </el-form-item>
            <el-form-item label="发起订单时间:">
              <span>{{ props.row.ht_or_CreateTime }}</span>
            </el-form-item>
            <el-form-item label="订单支付时间:">
              <span>{{ props.row.ht_or_PayTime }}</span>
            </el-form-item>
            <el-form-item label="支付方式:">
              <span>{{ props.row.ht_or_PayWay }}</span>
            </el-form-item>
            <el-form-item label="订单支付码:">
              <span>{{ props.row.ht_or_PayParam }}</span>
            </el-form-item>
            <el-form-item label="订单状态:">
              <span>{{ props.row.ht_or_PayState | getPayState}}</span>
            </el-form-item>
            <el-form-item label="手机号:">
              <span>{{ props.row.ht_od_Phone }}</span>
            </el-form-item>
            <el-form-item label="是否结算:">
              <span>{{ props.row.ts_to_IsBalance == 1 ? '已结算' : '未结算' }}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{ props.row.ts_to_Remark }}</span>
            </el-form-item>
            <el-form-item label="停车位数:">
              <span>{{ props.row.ht_or_CarSeats }}</span>
            </el-form-item>
            <el-form-item label="服务员编码:">
              <span>{{ props.row.ht_or_WaiterID }}</span>
            </el-form-item>
            <el-form-item label="订单类型:">
              <span>{{ props.row.ht_or_OrderType | getOrderType }}</span>
            </el-form-item>
            <el-form-item label="编码(公司编码或会员卡号):">
              <span>{{ props.row.ht_or_ComOrMemID }}</span>
            </el-form-item>
            <el-form-item label="是否联房:">
              <span>{{ props.row.ht_or_IsConnect == 1 ? '联房' : '未联房' }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="ht_or_OrderID" label="订单ID">
      </el-table-column>
      <el-table-column prop="ht_or_UserName" label="用户名称">
      </el-table-column>
      <el-table-column prop="otaTypeName" label="OTA">
      </el-table-column>
      <el-table-column prop="ht_od_Phone" label="手机号">
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <span>{{scope.row.ht_or_PayState | getPayState}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-search" type="primary" size="small" @click="selectOrderDetail(scope.row)">订单明细
          </el-button>
          <el-button type="success" size="small" @click="confirmOrder(scope.row.ht_or_OrderID)"
                     v-show="scope.row.ht_or_OutStatus!=1">确认订单
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="text-align: right;margin-top: 10px;">
      <el-pagination layout="total,prev, pager, next" :page-size="10" :total="total" v-show="total"
                     @current-change="changePage">
      </el-pagination>
    </div>
    <!--订单明细-->
    <el-dialog title="订单明细" :modal-append-to-body="false" :visible.sync="orderDetailDialog"
               :close-on-click-modal="false" width="70%">
      <el-table :data="orderDetailList" border style="width: 100%">
        <el-table-column prop="ht_od_ID" label="明细ID" width="180">
        </el-table-column>
        <el-table-column prop="ht_od_BuildNo" label="栋" width="180">
        </el-table-column>
        <el-table-column prop="ht_od_LevelNo" label="层">
        </el-table-column>
        <el-table-column prop="ht_od_RoomID" label="房间号">
        </el-table-column>
        <el-table-column prop="ht_od_SellPrice" label="单价(元)">
        </el-table-column>
        <el-table-column align="center" label="使用状态">
          <template slot-scope="scope">
            <span>{{scope.row.useStatusStr}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small"
                       v-show="scope.row.item.ht_or_Password&&scope.row.ht_od_UseStatus==0"
                       @click="CheckIn(scope.row)">
              入住
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="入住" :visible.sync="checkInDialog" :modal-append-to-body="false">
      <el-form :model="orderDetailObj.mainPersonInfo" label-width="120px" class="demo-ruleForm" :rules="rules"
               ref="ruleForm">
        <el-form-item label="住户姓名:" prop="name">
          <el-input v-model="orderDetailObj.mainPersonInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" prop="idcard">
          <el-input v-model="orderDetailObj.mainPersonInfo.idcard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="orderDetailObj.mainPersonInfo.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addSameBearer">
            添加同来人
          </el-button>
          <div v-for="item,index in orderDetailObj.otherPersonInfo">
            <div class="clearfix">
              <span style="width: 100px;display: inline-block;float: left;">同来人{{index + 1}}</span>
              <span
                style="display: inline-block;float: right;padding: 3px;color: #f60;border:1px solid #f60;line-height: 1;font-size: 12px;border-radius: 5px;cursor: pointer"
                @click.stop="cancel(item)">取消</span>
              <span
                class="readCard"
                @click.stop="getOtherIdCardInfo(item)"
              >识别身份证</span>
            </div>
            <el-form label-width="120px" :key="index" class="demo-ruleForm">
              <el-form-item label="住户姓名:" prop="name">
                <el-input v-model="item.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证号:" prop="idcard">
                <el-input v-model="item.idcard" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" prop="phone">
                <el-input v-model="item.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkInDialog = false">取 消</el-button>
        <el-button type="primary" @click="checkInSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--识别身份证中弹窗-->

    <div class="distinguishIngWrap" v-if="showCancelTime">

      <div class="distinguishIng">

        <strong>身份证识别中...</strong>

        <span>{{cancelTime}}s未识别自动关闭</span>

        <div>

          <a href="javascript:;" @click.stop="closeTimerBtn">取消</a>

        </div>

      </div>

    </div>

    <audio src="http://hly.1000da.com.cn/audio/ordervoice.mp3" ref="messageAudio">
      您的浏览器不支持 audio 标签。
    </audio>
    <audio src="http://hly.1000da.com.cn/audio/roomstatechange.mp3" ref="roomstatechange1">
      您的浏览器不支持 audio 标签。
    </audio>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    generateUUID,
    isPhoneNum,
    isCardNo
  } from '@/assets/js/public'

  import cashierOrderMixin from '@/assets/mixins/cashierOrderMixin'

  export default {
    mixins: [
      cashierOrderMixin
    ],
    name: '',
    data() {
      var idcardPass = (rule, value, callback) => {
        if (isCardNo(value)) {
          callback();
        } else {
          callback(new Error('身份证格式有误!'));
        }
      };
      var phonePass = (rule, value, callback) => {
        if (isPhoneNum(value)) {
          callback();
        } else {
          callback(new Error('电话号码有误!'));
        }
      };
      return {
        timer: null,
        num: 1,
        rules: {
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'change'
          }],
          idcard: [{
            validator: idcardPass,
            required: true
          }],
          phone: [{
            validator: phonePass,
            required: true
          }],
        },
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": '',
          "operateUserName": "",
          "pcName": "",
          "hotelID": '', //酒店编码
          orderDetailList: []
        },
        orderDetailObj: {
          ht_od_ID: '', //订单明细编码
          "mainPersonInfo": { //住户信息
            "name": "", //住户姓名
            "idcard": "", //身份证号
            "phone": "", //手机号码
          },
          otherPersonInfo: [], //同来人信息
        },
        checkInDialog: false, //入住弹窗
        orderDetailDialog: false, //订单明细弹窗
        //使用状态
        useStateList: [{
          name: '未使用',
          id: 0,
        },
          {
            name: '已使用',
            id: 1,
          },
          {
            name: '已退票',
            id: 2,
          },
        ],
        //支付状态
        payStateList: [{
          name: '未支付',
          id: 0,
        },
          {
            name: '支付成功',
            id: 1,
          },
          {
            name: '已取消',
            id: 2,
          },
        ],
        options: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": '', //酒店编码
          "onLineNo": "", //凭证码查询
          "telephone": "", //手机号码查询
          "userCode": "", //用户账号查询
          "createTimeFrom": "", //创建时间
          "createTimeTo": "", //创建时间
          //"payState": 0,//支付状态(0未支付1支付成功2已取消)
          //"useState": 0,//使用状态(0未使用1已使用2已退票)
          "page": 1,
          "rows": 10
        },
        hotelID: '',
        cashierOrderList: [], //订单列表
        orderDetailList: [], //订单明细
        expands: [],
        total: 0,
        userInfo: {},
        isWebSocket: false,
        isWebsocketclose:true,
      }
    },
    computed: mapGetters([]),
    created() {
      let hotelID = sessionStorage.getItem('hotelID')
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      if (userInfo) {
        this.userInfo = userInfo
        this.addOptions.operateUserID = userInfo.Id
        this.initWebSocket()
      }
      if (hotelID) {
        this.options.hotelID = hotelID;
        this.addOptions.hotelID = hotelID
        this.hotelID = hotelID;
        //初始化订单数据
        this.initData()
      }
    },
    beforeRouteLeave(to, from, next) {
      this.isWebsocketclose = false
      this.websocketclose()
      clearInterval(this.timer)
      next()
    },
    methods: {
      initWebSocket() { //初始化weosocket
        this.Newloading = this.$loading({
          lock: true,
          text: '正在连接服务器....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const wsuri = "ws://140.143.87.152:6767/";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen() { //连接建立之后执行send方法发送数据
        this.Newloading.close();
        let actions = {
          action: "Login",
          UserName: this.userInfo.serviceName,
          SystemName: '酒店SASS',
          DataType: this.userInfo.CompanyID
        };
        this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror() { //连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e) { //数据接收
        let data = JSON.parse(e.data)
        if (Number(data.resultcode) == 200) {
          //登录成功
          console.log('订单链接服务器成功')
        } else {
          //接受数据
          if (data) {
            if (data.NotifyMessage) {
              let obj = JSON.parse(data.NotifyMessage)
              this.MessageType = Number(obj.msgType)
              switch (Number(obj.msgType)) {
                case 2:
                  if (this.$refs.messageAudio) {
                    this.$refs.messageAudio.play()
                  }
                  this.initData()
                  break;
                case 3:
                  //房态
                  if (this.$refs.roomstatechange1) {
                    this.$refs.roomstatechange1.play();
                  }
                  break;
              }
            }
          }
        }
      },
      websocketsend(Data) { //数据发送
        this.websock.send(Data);
      },
      websocketclose(e) { //关闭
        console.log('断开连接', e);
        if (this.isWebSocket) {
          this.initWebSocket();
          this.isWebSocket = false
        } else {
          if(this.isWebsocketclose){
            const loading = this.$loading({
              lock: true,
              text: '正在连接服务器',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              console.log('5秒')
              this.initWebSocket();
            }, 5000)
          }
        }
      },
      changePage(num) {
        this.options.page = num;
        this.initData();
      },
      //确认订单
      confirmOrder(OrderID) {
        let orderOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_or_OrderID": OrderID, //订单ID
        };
        this.$store.dispatch('ConfirmOrder', orderOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //入住确定
      checkInSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let arr = this.orderDetailObj.otherPersonInfo
            for (let j = 0; j < arr.length; j++) {
              if (!arr[j].name.trim()) {
                this.$notify({
                  message: '请确保同来人姓名都以填写完整',
                  type: 'error'
                })
                return
              }
              if (!isCardNo(arr[j].idcard.trim())) {
                this.$notify({
                  message: '请确保同来人身份证号是否填写正确',
                  type: 'error'
                })
                return
              }
              if (!isPhoneNum(arr[j].phone.trim())) {
                this.$notify({
                  message: '请确保同来人手机号是否填写正确',
                  type: 'error'
                })
                return
              }
            }
            this.addOptions.orderDetailList = []
            this.addOptions.orderDetailList.push(this.orderDetailObj)
            //入住
            this.$store.dispatch('checkInSubmit', this.addOptions)
              .then((res) => {
                this.$notify({
                  message: res,
                  type: 'success'
                })
                this.checkInDialog = false;
                this.orderDetailDialog = false
                this.initData();
              }, err => {
                this.$notify({
                  message: err,
                  type: 'error'
                })
                this.checkInDialog = false;
                this.orderDetailDialog = false
              }).catch(err => {
              this.$notify({
                message: err,
                type: 'error'
              })
              this.checkInDialog = false;
              this.orderDetailDialog = false
            })
          } else {
            this.$notify({
              message: '请输入必填项!',
              type: 'error'
            })
            return false;
          }
        })
      },
      //取消
      cancel(obj) {
        this.orderDetailObj.otherPersonInfo = this.orderDetailObj.otherPersonInfo.filter(item => {
          if (item.id == obj.id) {
            return false;
          }
          return true
        })
      },
      //添加同来人
      addSameBearer() {
        this.orderDetailObj.otherPersonInfo.push({
          id: this.num,
          "name": "", //住户姓名
          "idcard": "", //身份证号
          "phone": "", //手机号码
        })
        this.num++;
      },
      //入住
      CheckIn(obj) {
        this.orderDetailObj = {
          ht_od_ID: '', //订单明细编码
          "mainPersonInfo": { //住户信息
            "name": "", //住户姓名
            "idcard": "", //身份证号
            "phone": "", //手机号码
          },
          otherPersonInfo: [], //同来人信息
        }
        this.orderDetailObj.ht_od_ID = obj.ht_od_ID
        this.checkInDialog = true;
        this.getIdCardInfo();

      },
      rowClick(row, event, column) {
        Array.prototype.remove = function (val) {
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };

        if (this.expands.indexOf(row.id) < 0) {
          this.expands = []
          row.id = generateUUID();
          this.expands.push(row.id);
        } else {
          this.expands.remove(row.id);
        }

      },
      //订单明细
      selectOrderDetail(obj) {
        for (var i = 0; i < obj.orderDetailList.length; i++) {
          obj.orderDetailList[i].item = obj
        }

        this.orderDetailList = obj.orderDetailList;
        this.orderDetailDialog = true;
      },
      //查询
      search() {
        this.initData()
      },
      initData() {
        this.isLoading = true
        this.$store.dispatch('initCashierOrder', this.options)
          .then(data => {
            this.total = Number(data.totalRows);
            this.cashierOrderList = data.data;
            this.isLoading = false;
          }, err => {
            this.$notify.error({
              title: err,
            });
            this.isLoading = false;
          })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.timer = setInterval(() => {
          if (this.websock) {
            this.websocketsend('来了');
          }
        }, 60000)
      })
    }
  }
</script>
<style scoped>
  .el-form-item {
    margin-bottom: 20px;
  }

  .distinguishIngWrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 10000;
  }

  .distinguishIng {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #fff;
    padding: 0 30px 10px;
    width: 300px;
    transform: translate(-150px, -50%);
  }

  .distinguishIng > strong {
    display: block;
    font: 16px/3 "微软雅黑";
    text-align: center;
    color: #3a8ee6;
  }

  .distinguishIng > span {
    display: block;
    font: 16px/2 "微软雅黑";
    text-align: center;
    color: red;
  }


  .distinguishIng > div {
    text-align: right;
    margin-top: 20px;
  }

  .distinguishIng a {
    display: inline-block;
    font: 16px/24px "微软雅黑";
    padding: 0 8px;
    background-color: #3a8ee6;
    color: #fff;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  .readCard {
    float: right;
    cursor: pointer;
    color: #409EFF;
    padding: 5px 10px;
    border: 1px solid #409EFF;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    font: 14px/1 "微软雅黑";
    margin-right: 10px;
    border-radius: 5px;
  }

  .readCard:hover {
    background-color: #409EFF;
    color: #fff;
  }

</style>
