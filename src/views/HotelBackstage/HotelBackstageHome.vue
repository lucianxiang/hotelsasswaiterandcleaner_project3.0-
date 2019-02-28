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
             @click.stop="changeRouterNav(item,index)"
          >
            <i></i>
            <strong>{{item.label}}</strong>
          </a>
        </div>
        <!--下拉框-->
        <div></div>
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
        <!--<div class="footerMessage">-->
        <!--<a href="javascript:;" class="messageBtn"><i></i><strong>消息</strong><span>6</span></a>-->
        <!--<a href="javascript:;" class="receptionAssistant"><i></i><strong>前台助手</strong></a>-->
        <!--</div>-->
      </section>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import routes from '@/router/routes'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        headerOperationList: [
          {
            className: 'reportForm',
            label: '报表',
            routerName: 'HotelReportForm',
            index: 0,
          },
          {
            className: 'hotelStaff',
            label: '员工',
            routerName: 'HotelStaffAdmin',
            index: 1,
          },
          {
            className: 'hotelComplaint',
            label: '投诉',
            routerName: 'HotelComplaint',
            index: 2,
          },
          {
            className: 'hotelVIP',
            label: '会员',
            routerName: 'HotelMemberVIP',
            index: 3,
          },
          {
            className: 'hotelRoom',
            label: '房间',
            routerName: 'HotelRoomAdmin',
            index: 4,
          },
          {
            className: 'cooperativeEnterprise',
            label: '合作企业',
            routerName: 'HotelCooperativeEnterprise',
            index: 5,
          },
          {
            className: 'otaAdmin',
            label: 'OTA管理',
            routerName: 'OTAAdmin',
            index: 6,
          },
        ],
        routerNavIndex: 0,//右边头顶上的
        routerNav: [],
        routerIndex: 0,
        userInfo: {},
        routerObj: {},
      }
    },
    watch: {
      $route(to, from) {
        sessionStorage.setItem('router', JSON.stringify({
          name: to.name,
          params: to.params,
          query: to.query
        }));
      }
    },
    created() {
      if (sessionStorage.getItem('router')) {
        this.routerObj = JSON.parse(sessionStorage.getItem('router'));
      }
      this.initRouter();
      if (sessionStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      } else {
        this.$router.push({name: 'Login'})
      }
    },
    methods: {
      //初始化路由
      initRouter() {
        if (this.$route.name == 'HotelBackstageHome') {
          this.routerNav.push(this.headerOperationList[0]);
          this.$router.push({name: this.routerNav[0].routerName})
        } else {
          let obj = this.headerOperationList.filter(item => {
            if (item.routerName == this.$route.name) {
              return true;
            }
            return false;
          })[0];
          if( obj ){
            this.routerNav.push(obj);
          }else {
            this.$router.push({name: this.routerObj.name, params: this.routerObj.params, query: this.routerObj.query});
            this.routerNav.push({
              className: 'hotelRoom',
              label: '房间',
              routerName: 'HotelRoomAdmin',
              index: 4,
            })
          }
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
          this.routerNavIndex = this.routerNav[this.routerIndex].index;
          this.$router.push({name: this.routerNav[this.routerIndex].routerName});
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
      //init My Hotel Data
      initData() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          "sm_ai_AgentInfoID": this.userInfo.CompanyID,//供应商ID   二选一  优先使用酒店ID
        };
        this.$store.dispatch('initHotelInfomation', options)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },

    },
    mounted() {


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

  .routerList > li.active i {
    display: block;
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
    cursor: pointer;
    height: 12px;
    background: url("http://hly.1000da.com.cn/game/closeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    /*display: none;*/
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
    line-height: 26px;
  }

  .headerOperation .reportForm > i {
    display: block;
    width: 36px;
    height: 35px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/reportForm.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 7px auto 0;
  }

  .headerOperation .reportForm.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/reportForm2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .headerOperation .hotelStaff {
    line-height: 29px;
  }

  .headerOperation .hotelStaff > i {
    display: block;
    width: 37px;
    height: 28px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/hotelStaff.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 11px auto 0;
  }

  .headerOperation .hotelStaff.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/hotelStaff2.png") no-repeat;
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

  .headerOperation .hotelRoom {
    line-height: 28px;
  }

  .headerOperation .hotelRoom > i {
    display: block;
    width: 26px;
    height: 34px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/hotelRoom.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 6px auto 0;
  }

  .headerOperation .hotelRoom.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/hotelRoom2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .headerOperation .cooperativeEnterprise {
    line-height: 30px;
  }

  .headerOperation .cooperativeEnterprise > i {
    display: block;
    width: 20px;
    height: 29px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/cooperativeEnterprise.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 9px auto 0;
  }

  .headerOperation .cooperativeEnterprise.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/cooperativeEnterprise2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  section {
    position: absolute;
    top: 87px;
    left: 0;
    right: 0;
    bottom: 20px;
    padding: 0 13px 35px;
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

  .otaAdmin > i {
    display: block;
    width: 50px;
    height: 20px;
    background: url("../../assets/img/HotelBackstage/ota.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 13px auto 5px;
  }

  .otaAdmin.active > i {
    display: block;
    width: 50px;
    height: 20px;
    background: url("../../assets/img/HotelBackstage/ota1.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 13px auto 5px;
  }

  .otaAdmin strong {
    line-height: 30px;
    display: block;
  }

</style>
