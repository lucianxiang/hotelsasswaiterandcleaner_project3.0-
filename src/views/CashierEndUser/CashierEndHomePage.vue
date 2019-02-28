<template>
  <div id="wrap">
    <!--左导航-->
    <div id="leftNav">
      <!--头像-->
      <div class="headPortraitBox">
        <img v-lazy="userInfo.HeadImage?userInfo.HeadImage:'http://hly.1000da.com.cn/assets/images/timg.jpeg'" alt="">
      </div>
      <!--返回首页-->
      <div class="goHomePage">
        <router-link to="/home">返回首页</router-link>
      </div>
      <!--路由list-->
      <ul class="routerList">
        <li
          v-for="item,index in routerNav"
          :class="{active: index == routerIndex}"
          @click.stop="changeSectionRouter(item,index)"
        >
          <a href="javascript:;">{{item.label}}</a><i @click.stop="closeListRouter(item,index)"></i>
        </li>
      </ul>
    </div>
    <!--右边内容-->
    <div id="rightContent">
      <!--头部-->
      <header>
        <div class="headerOperation">
          <a href="javascript:;"
             v-for="item,index in headerOperationList"
             :class="[item.className,{active: index == routerNavIndex}]"
             @click="changeRouterNav(item,index)"
          >
            <i></i>
            <strong>{{item.label}}</strong>
          </a>
        </div>
        <!--下拉框-->
        <div>
          <i></i>
        </div>
      </header>
      <section>
        <!--<nav class="sectionRouterNav">-->
        <!--<a-->
        <!--href="javascript:;"-->
        <!--:class="{active: index == routerIndex}"-->
        <!--v-for="item,index in routerNav"-->
        <!--@click.stop="changeSectionRouter(item,index)"-->
        <!--&gt;<span>{{item.label}}</span><i @click.stop="closeListRouter(item,index)"></i></a>-->
        <!--</nav>-->
        <!--路由-->
        <div id="sectionWrap">
          <router-view></router-view>
        </div>
        <!--消息-->
        <div class="footerMessage">
          <!--<a href="javascript:;" class="messageBtn"><i></i><strong>消息</strong><span>6</span></a>-->
          <a href="javascript:;" class="receptionAssistant" @click.stop="showReception"><i></i><strong>前台助手</strong></a>
        </div>
      </section>
      <!--前台助手-->
      <div id="receptionOperation" v-show="showReceptionOperation" @click.stop="showReceptionOperation = false">
        <div class="receptionOperationWrap" @click.stop="showReceptionOperation = true">
          <div class="operTitle">
            <strong>收银助手</strong>
            <i @click.stop="showReceptionOperation = false"></i>
          </div>
          <div class="operWrap">
            <ul class="operList clearfix">
              <li
                v-for="item,index in receptionOperation"
                :class="[item.className,{active: index == operIndex}]"
                @click="changeReOper(item,index)"
              >
                <i></i>
                <span>{{item.label}}</span>
              </li>
            </ul>
            <div class="roleBox">
              <el-select v-model="callederId" placeholder="请选择呼叫对象" size="small">
                <el-option
                  v-for="item in staffList"
                  :key="item.Id"
                  :label="item.Nickname"
                  :value="item.Id">
                </el-option>
              </el-select>
              <el-button size="small" @click.stop="historyMessage" v-if="this.callederId">历史呼叫</el-button>
            </div>
            <div class="callContent">
              <textarea placeholder="请输入内容" v-model="operContent"></textarea>
            </div>
            <div class="sendCallContent clearfix">
              <a href="javascript:;" @click="sendCallContent">发送</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio src="http://hly.1000da.com.cn/audio/ordervoice.mp3" ref="messageAudio">
      您的浏览器不支持 audio 标签。
    </audio>
    <audio src="http://hly.1000da.com.cn/audio/roomstatechange.mp3" ref="roomstatechange">
      您的浏览器不支持 audio 标签。
    </audio>

    <el-dialog
      title="历史呼叫信息"
      :visible.sync="showHistoryMessage"
      :modal-append-to-body="false"
      width="60%">

      <el-table
        :data="historyMessageList"
        style="width: 100%">
        <el-table-column
          prop="ht_ci_Content"
          label="呼叫内容">
        </el-table-column>
        <el-table-column
          prop="ht_ci_CallTime"
          width="200"
          label="呼叫时间">
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          width="100"
          label="处理状态">
          <template slot-scope="scope">
            {{scope.row.ht_ci_DealState | getHandleState }}
          </template>
        </el-table-column>
      </el-table>

      <div class="block" style="text-align: right">
        <el-pagination
          layout="total, prev, pager, next"
          @current-change="changePage"
          :page-size="10"
          v-if="historyMessageTotal"
          :total="historyMessageTotal">
        </el-pagination>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showHistoryMessage = false">取 消</el-button>
        <el-button type="primary" @click="showHistoryMessage = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {toZear2} from '@/assets/js/public'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        isWebSocket: false,
        headerOperationList: [
          {
            className: 'reportForm',
            label: '客房',
            routerName: 'CashierGuestRoom',
            index: 0,
          },
          {
            className: 'hotelStaff',
            label: '订单',
            routerName: 'CashierOrder',
            index: 1,
          },
          {
            className: 'hotelComplaint',
            label: '投诉',
            routerName: 'CashierComplaint',
            index: 2,
          },
          {
            className: 'hotelVIP',
            label: '会员',
            routerName: 'CashierMemberVIP',
            index: 3,
          },
        ],//路由
        routerNavIndex: 0,//右边头顶上的
        routerNav: [],
        routerIndex: 0,
        userInfo: {},
        operIndex: 0,
        //前台助手
        receptionOperation: [
          {
            value: 1,
            label: '服务员',
            className: 'callWaiter',
            typeVal: 2
          },
          {
            value: 2,
            label: '清洁员',
            className: 'callCleaner',
            typeVal: 4
          },
          {
            value: 4,
            label: '停车员',
            className: 'callParking',
            typeVal: 1
          },
        ],
        showReceptionOperation: false,
        operId: -1,
        operContent: '',
        callederId: "",
        staffList: [],//员工列表
        isWebsocketclose: true,
        showHistoryMessage: false,
        fromDate: '',
        toDate: '',
        historyMessageList: [],
        historyMessageTotal: 0,
        pageNum: 1,
        historyMessageType: 1
      }
    },
    beforeRouteLeave(to, from, next) {
      this.isWebsocketclose = false
      this.websocketclose()
      next()
    },
    created() {
      this.initRouter();
      if (sessionStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      } else {
        this.$router.push({name: 'Login'})
      }
      var t = new Date();
//      this.fromDate = t.getFullYear() + '-' + toZear2(t.getMonth()) + '-' + toZear2(t.getDate()) + ' 00:00:00';
//      this.toDate = t.getFullYear() + '-' + toZear2(t.getMonth()) + '-' + toZear2(t.getDate()) + ' 23:59:59';
    },
    watch: {
      '$route'(to, from) {
        if (to.name != 'CashierGuestRoom' && to.name != 'CashierOrder') {
          this.initWebSocket()
        }
      }
    },
    methods: {
      //历史呼叫
      historyMessage() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": this.pageNum,
          "rows": 10,
          "ht_ci_Type": this.historyMessageType,//呼叫类型(1收银员呼叫服务员  2收银员呼叫清洁员 3收银员呼叫接待员)
          "ht_ci_Calleder": this.callederId,//被呼叫员编码
//          "fromDate": this.fromDate,
//          "toDate": this.toDate,
          "ht_ci_Caller": this.userInfo.Id,//呼叫编码
        };
        this.$store.dispatch('initHistoryMessage', options)
          .then(data => {
            this.historyMessageList = data.data;
            this.historyMessageTotal = Number(data.totalrows);
            this.showHistoryMessage = true;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
          .catch(err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })

      },
      //分页
      changePage(num) {
        this.pageNum = num;
        this.historyMessage();
      },


//      常连接
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
      websocketonerror() {//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e) { //数据接收
        let data = JSON.parse(e.data)
        if (Number(data.resultcode) == 200) {
          //登录成功
          console.log('链接服务器成功')
        } else {
          //接受数据
          if (data) {
            if (data.NotifyMessage) {
              let obj = JSON.parse(data.NotifyMessage)
              this.MessageType = Number(obj.msgType)
              console.log(obj);
              switch (Number(obj.msgType)) {
                case 2:
                  //订单
                  if (this.$refs.messageAudio) {
                    this.$refs.messageAudio.play()
                  }
                  break;
                case 3:
                  //房态
                  if (this.$refs.roomstatechange) {
                    this.$refs.roomstatechange.play()
                  }
                  break;
              }
            }
          }
        }
      },
      websocketsend(Data) {//数据发送
        this.websock.send(Data);
      },
      websocketclose(e) {  //关闭
        console.log('断开连接', e);
        if (this.isWebSocket) {
          this.initWebSocket();
          this.isWebSocket = false
        } else {
          if (this.isWebsocketclose) {
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
      //初始化路由
      initRouter() {
        if (this.$route.name == 'CashierEndHomePage') {
          this.routerNav.push(this.headerOperationList[0]);
          this.$router.push({name: this.routerNav[0].routerName})
        } else {
          let obj = this.headerOperationList.filter(item => {
            if (item.routerName == this.$route.name) {
              return true;
            }
            return false;
          })[0];
          this.routerNav.push(obj);
        }
        for (let i = 0; i < this.headerOperationList.length; i++) {
          if (this.headerOperationList[i].routerName == this.routerNav[0].routerName) {
            this.routerNavIndex = i;
            break;
          }
        }
      },
      //关闭路由
      closeListRouter(item, index) {
        this.routerNav = this.routerNav.filter(i => {
          if (i.routerName == item.routerName) {
            return false;
          }
          return true;
        })
        if (!this.routerNav.length) {
          this.routerNav.push(this.headerOperationList[0])
        }
        if (item.routerName == this.$route.name) {
          this.$router.push({name: this.routerNav[this.routerNav.length - 1].routerName});
          this.routerIndex = this.routerNav.length - 1;
          for (let i = 0; i < this.routerNav.length; i++) {
            if (this.routerNav[i].routerName == this.routerNav[this.routerNav.length - 1].routerName) {
              this.routerIndex = i;
              this.routerNavIndex = this.routerNav[i].index;
              return
            }
          }
        } else {
          if (index < this.routerIndex) {
            this.routerIndex--;
          }
          if (index == this.routerIndex) {
            this.routerIndex = this.routerNav.length - 1;
          }
        }
      },
      //选择section部分路由
      changeSectionRouter(item, index) {
        this.routerNavIndex = item.index;
        this.routerIndex = index;
        this.$router.push({name: item.routerName});
      },
      //选择header部分路由
      changeRouterNav(item, index) {
        this.routerNavIndex = index;
        for (let i = 0; i < this.routerNav.length; i++) {
          if (this.routerNav[i].routerName == item.routerName) {
            this.routerIndex = i;
            this.$router.push({name: item.routerName});
            return
          }
        }
        this.routerNav.push(item);
        this.routerIndex = this.routerNav.length - 1;
        this.$router.push({name: item.routerName});
      },
      //显示前台助手
      showReception() {
        this.callederId = "";
        this.operId = this.receptionOperation[0].value;
        this.initAllStaff(this.receptionOperation[0].typeVal);
        this.showReceptionOperation = true;
      },
      initAllStaff(id) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "LocalRole": id,//内部角色
          "CompanyId": this.userInfo.CompanyID,
          "SysID": 0,
          "State": 0
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('initHotelRole', options)
          .then(data => {
            this.initStaffList(data[0].Id);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
          .catch(err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //change导航
      changeReOper(item, index) {
        switch (item.value) {
          case 1:
            this.historyMessageType = 1;
            break;
          case 2:
            this.historyMessageType = 2;
            break;
          case 4:
            this.historyMessageType = 3;
            break;
          default:
            this.historyMessageType = 1;
        }
        this.operIndex = index;
        this.operId = item.value;
        this.initAllStaff(item.typeVal);
        this.callederId = "";
      },
      //发送消息
      sendCallContent() {
        if (!this.operContent.trim()) {
          this.$notify({
            message: '请输入呼叫内容',
            type: 'error'
          })
          return
        }
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ht_ci_Type": this.operId,//呼叫类型(1收银员呼叫服务员  2收银员呼叫清洁员 3收银员呼叫接待员 4收银员呼叫迎宾员)
            "ht_ci_Caller": this.userInfo.Id,//呼叫员编码
            "ht_ci_Calleder": this.callederId,//被呼叫员编码
            "ht_ci_HotelID": this.userInfo.CompanyID,//酒店编码
            "ht_ci_Content": this.operContent,//呼叫内容
            "ht_ci_Remark": "",//备注
          }
        };
        this.$store.dispatch('addSendCallContent', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.operContent = '';
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //初始化员工
      initStaffList(id) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "CompanyID": this.userInfo.CompanyID,//公司编码
          "RoleID": id,//角色编码
        };
        this.$store.dispatch('initStaffList', options)
          .then(data => {
            data.unshift({
              Id: 0,
              Nickname: '全部'
            })
            this.staffList = data;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
          .catch(err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
    },
    mounted() {
      let name = this.$route.name
      if (name != 'CashierOrder' && name != 'CashierGuestRoom') {
        this.initWebSocket()
      }
      this.$nextTick(() => {
        setInterval(() => {
          if (this.websock) {
            this.websocketsend('来了');
          }
        }, 60000)
      })
    }
  }
</script>
<style scoped>
  #wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #eee;
    display: flex;
  }

  #leftNav {
    float: left;
    width: 134px;
    background-color: #505050;
    height: 100%;
  }

  .headPortraitBox {
    width: 101px;
    height: 101px;
    border: 5px solid #fff;
    margin: 42px auto;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
  }

  .headPortraitBox > img {
    width: 100%;
    height: 100%;
  }

  .goHomePage {
    margin-top: 27px;
    font: 16px/38px "微软雅黑";
  }

  .goHomePage > a {
    display: block;
    width: 100%;
    color: #fff;
    text-align: center;
  }

  .routerList {
    padding: 18px 0;
    font: 16px/40px "微软雅黑";
    text-align: center;
  }

  .routerList > li {
    position: relative;
  }

  .routerList > li:hover a,
  .routerList > li.active a {
    background-color: #1b71b1;
  }

  .routerList a {
    color: #fff;
    display: block;
    width: 100%;
    padding-right: 19px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .routerList i {
    position: absolute;
    right: 5px;
    top: 14px;
    width: 12px;
    height: 12px;
    background: url("http://hly.1000da.com.cn/game/closeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  #rightContent {
    width: 100%;
    height: 100%;
    float: left;
    position: relative;
  }

  header {
    height: 68px;
    background-color: #fff;
    width: 100%;
  }

  .headerOperation {
    float: left;
    padding-left: 10px;
  }

  .headerOperation > a {
    float: left;
    width: 78px;
    height: 100%;
    color: #1b71b1;
    text-align: center;
    font-size: 14px;
    font-family: "微软雅黑";
  }

  .headerOperation > a.active {
    background-color: #1296d7;
    color: #fff;
  }

  .headerOperation .reportForm {
    line-height: 28px;
  }

  .headerOperation .reportForm > i {
    display: block;
    width: 36px;
    height: 32px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/cashierHome.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 8px auto 0;
  }

  .headerOperation .reportForm.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/cashierHome2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .headerOperation .hotelStaff {
    line-height: 28px;
  }

  .headerOperation .hotelStaff > i {
    display: block;
    width: 26px;
    height: 33px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/cashierOrder.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 7px auto 0;
  }

  .headerOperation .hotelStaff.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/cashierOrder2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .headerOperation .hotelComplaint {
    line-height: 29px;
  }

  .headerOperation .hotelComplaint > i {
    display: block;
    width: 33px;
    height: 33px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/hotelComplaint.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 6px auto 0;
  }

  .headerOperation .hotelComplaint.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/hotelComplaint2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .headerOperation .hotelVIP {
    line-height: 28px;
  }

  .headerOperation .hotelVIP > i {
    display: block;
    width: 35px;
    height: 35px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/hotelVIP.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 5px auto 0;
  }

  .headerOperation .hotelVIP.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/hotelVIP2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .headerOperation .handOverDuty {
    line-height: 28px;
  }

  .headerOperation .handOverDuty > i {
    display: block;
    width: 38px;
    height: 33px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/cashierHandOverDuty.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 7px auto 0;
  }

  .headerOperation .handOverDuty.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/cashierHandOverDuty2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  section {
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 13px 35px;
  }

  #sectionWrap {
    width: 100%;
    height: 100%;
    border: 1px solid #f6bc4c;
    background-color: #fff;
    padding: 10px;
    overflow: auto;
    position: relative;
  }

  .sectionRouterNav {
    position: absolute;
    left: 13px;
    top: 17px;
    right: 13px;
    font: 14px/31px "微软雅黑";
  }

  .sectionRouterNav > a {
    width: 100px;
    padding: 0 20px 0 5px;
    color: #fff;
    background-color: #505050;
    text-align: center;
    position: relative;
    float: left;
    margin-right: 1px;
  }

  .sectionRouterNav > a span {
    float: left;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .sectionRouterNav > a.active {
    background-color: #f6bc4c;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .sectionRouterNav > a > i {
    position: absolute;
    right: 5px;
    top: 10px;
    width: 10px;
    height: 10px;
    background: url("http://hly.1000da.com.cn/game/closeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .footerMessage {
    position: absolute;
    bottom: 0;
    right: 35px;
    height: 35px;
    font: 15px/35px "微软雅黑";
  }

  .footerMessage .messageBtn {
    float: right;
  }

  .footerMessage .messageBtn i {
    float: left;
    width: 28px;
    height: 28px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/messageICon.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 3px;
    margin-right: 8px;
  }

  .footerMessage .messageBtn span {
    float: left;
    font: 16px/27px "微软雅黑";
    background-color: #f91717;
    color: #fff;
    margin-top: -14px;
    margin-left: -10px;
    padding: 0 9px;
    -webkit-border-radius: 13px;
    -moz-border-radius: 13px;
    border-radius: 13px;
  }

  .footerMessage .messageBtn strong,
  .footerMessage .receptionAssistant strong {
    float: left;
    color: #000;
  }

  .footerMessage .receptionAssistant {
    float: right;
    margin-right: 20px;
  }

  .footerMessage .receptionAssistant i {
    float: left;
    width: 28px;
    height: 28px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/phoneIcon.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 5px;
    margin-right: 5px;
  }

  #receptionOperation {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0);
    z-index: 10;
    padding: 100px 0;
    overflow: auto;
    z-index: 1000;
  }

  .receptionOperationWrap {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 0 20px #000;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    overflow: hidden;
  }

  .operTitle {
    height: 60px;
    background-color: #f6bc4c;
    position: relative;
  }

  .operTitle > strong {
    display: block;
    font: 20px/3 "微软雅黑";
    color: #fff;
    text-align: center;
  }

  .operTitle > i {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 20px;
    height: 20px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/HotelBackstage/closeCallIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .operWrap {
    padding: 20px 60px;
  }

  .operList > li {
    float: left;
    width: 33.3333%;
    background-color: #f5f5f5;
    border-right: 5px solid #fff;
    cursor: pointer;
  }

  .operList > li.active {
    background-color: #fff;
  }

  .operList > li > span {
    font: 14px/22px "微软雅黑";
    color: #c2c2c2;
    display: block;
    text-align: center;
  }

  .callWaiter > i {
    display: block;
    width: 42px;
    height: 48px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/peopleW.png") no-repeat;
    margin: 8px auto 0;
  }

  .callWaiter.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/peopleC.png") no-repeat;
  }

  .callCleaner > i {
    display: block;
    width: 47px;
    height: 48px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/saodiW.png") no-repeat;
    margin: 8px auto 0;
  }

  .callCleaner.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/saodiC.png") no-repeat;
  }

  .callParking > i {
    display: block;
    width: 48px;
    height: 38px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/carW.png") no-repeat;
    margin: 18px auto 0;
  }

  .callParking.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/carC.png") no-repeat;
  }

  .callContent {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #666;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .callContent > textarea {
    width: 100%;
    height: 200px;
    border: none;
    font: 14px/20px "微软雅黑";
    color: #666;
  }

  .sendCallContent {
    margin-top: 20px;
  }

  .sendCallContent > a {
    width: 100px;
    font: 14px/3 "微软雅黑";
    text-align: center;
    background-color: #f6bc4c;
    float: right;
    color: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .roleBox {
    margin-top: 20px;
  }
</style>
