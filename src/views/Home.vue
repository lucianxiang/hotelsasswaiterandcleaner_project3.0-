<template>
  <div>
    <div class="container clearfix">
      <div class="containerLeft">
        <div class="headImg">
          <img v-lazy="userInfo.HeadImage?userInfo.HeadImage:'http://hly.1000da.com.cn/assets/images/timg.jpeg'" alt="">
        </div>
        <strong>{{userInfo.Nickname}}</strong>
        <strong @click="sinOut">退出登录</strong>
      </div>
      <div class="content">
        <div class="contentBox">
          <!--顶部-->
          <header>
            <div class="footerImgBox"></div>
            <span>{{userInfo.companyName}}</span>
          </header>
          <!--内容-->
          <section class="clearfix">
            <!--收银台-->
            <div @click="goCashierDesk" class="moneyTable" v-show="showCashier">
              <div></div>
              <h1>收银台</h1>
            </div>
            <!--后台管理-->
            <div class="adminManagement" @click.stop="goHotelBackstage" v-show="showHotelAdmin">
              <div></div>
              <h1>后台管理</h1>
            </div>
          </section>
          <!--右下-->
          <!--<ul class="rightDownBox">-->
          <!--<li v-for="item,index in otherList">-->
          <!--<div></div>-->
          <!--<h1>{{item.name}}</h1>-->
          <!--</li>-->
          <!--</ul>-->
          <!--底部-->
          <!--<footer class="clearfix">-->
            <!--<div class="footerImgBox"></div>-->
            <!--<span>{{userInfo.companyName}}</span>-->
            <!--&lt;!&ndash;<div>&ndash;&gt;-->
            <!--&lt;!&ndash;<span>24小时服务热线 : </span>&ndash;&gt;-->
            <!--&lt;!&ndash;<strong class="footerStrong">0830-3609803</strong>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--</footer>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        userInfo: {},
        otherList: [
          {name: "在线客服"},
          {name: "软件教程"},
          {name: "官网直接"},
          {name: "千里眼"},
          {name: "APP订房"},
          {name: "我要报障"},
        ],
        showCashier: false,
        showHotelAdmin: false,
      }
    },
    created() {
      if (sessionStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));;
        for (let i = 0; i < this.userInfo.roleLlist.length; i++) {
          //收银员
          if (this.userInfo.roleLlist[i].localRoleID == 0) {
            this.showCashier = true;
          }
          //管理员
          if (this.userInfo.roleLlist[i].localRoleID == 3) {
            this.showHotelAdmin = true;
          }
        }
      } else {
        this.$router.push({name: 'Login'})
      }
    },
    methods: {
      //去收银台
      goCashierDesk() {
        this.$router.push({name: 'CashierGuestRoom'})
      },
      //后台管理
      goHotelBackstage() {
        this.$router.push({name: 'HotelReportForm'})
      },
      //退出登录
      sinOut(){
        sessionStorage.removeItem('userInfo');
        window.location.reload();
      }
    },
  }
</script>

<style scoped>

  header {
    font: 30px/50px "微软雅黑";
    color: #ffa110;
    padding: 20px;
  }


  .rightDownBox {
    position: absolute;
    bottom: 65px;
    right: 0;
  }

  .rightDownBox > li {
    float: left;
    width: 80px;
    height: 110px;
    margin-right: 45px;
  }

  .rightDownBox > li > div {
    width: 80px;
    height: 80px;
    border-radius: 50px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .rightDownBox > li:nth-of-type(1) > div {
    background: url("../assets/img/home/qq1.png") no-repeat;
  }

  .rightDownBox > li:nth-of-type(2) > div {
    background: url("../assets/img/home/conputed1.png") no-repeat;
  }

  .rightDownBox > li:nth-of-type(3) > div {
    background: url("../assets/img/home/lianjie1.png") no-repeat;
  }

  .rightDownBox > li:nth-of-type(4) > div {
    background: url("../assets/img/home/eye1.png") no-repeat;
  }

  .rightDownBox > li:nth-of-type(5) > div {
    background: url("../assets/img/home/hly1.png") no-repeat;
  }

  .rightDownBox > li:nth-of-type(6) > div {
    background: url("../assets/img/home/weixiu1.png") no-repeat;
  }

  .rightDownBox > li > h1 {
    margin-top: 10px;
    text-align: center;
    width: 80px;
    font: 20px/1 "微软雅黑";
  }

  .footerImgBox {
    float: left;
    width: 50px;
    height: 50px;
    background: url("../assets/img/home/hly.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-right: 10px;
  }

  .moneyTable {
    width: 285px;
    height: 285px;
    background-color: rgb(237, 148, 37);
    float: left;
    margin-right: 40px;
    box-shadow: 0px 0px 10px 2px rgb(237, 168, 123);
  }

  .moneyTable > div {
    width: 100px;
    height: 100px;
    margin: 60px auto 0;
    background: url("../assets/img/home/theme.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-bottom: 40px;

  }

  .adminManagement > div {
    width: 100px;
    height: 100px;
    margin: 60px auto 0;
    background: url("../assets/img/home/kucun.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-bottom: 40px;
  }

  .moneyTable > h1 {
    height: 28px;
    color: white;
    font: 28px/1 "微软雅黑";
    text-align: center;

  }

  .adminManagement > h1 {
    height: 28px;
    color: white;
    font: 28px/1 "微软雅黑";
    text-align: center;

  }

  .adminManagement {
    width: 285px;
    height: 285px;
    background-color: rgb(244, 142, 113);
    float: left;
    box-shadow: 0px 0px 10px 2px rgb(237, 168, 123);
  }

  .footerStrong {
    color: #000;
  }

  .container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .containerLeft {
    width: 135px;
    height: 100%;
    background-color: rgb(80, 80, 80);
    float: left;
  }

  .containerLeft > strong {
    font: 16px/24px "微软雅黑";
    display: block;
    text-align: center;
    color: #fff;
    margin-top: 20px;
  }

  .containerLeft > strong:last-of-type {
    cursor: pointer;
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

  .contentBox {
    height: 100%;
    width: 100%;
    float: left;
    background-color: rgb(238, 238, 238);
    position: relative;
  }

  .headImg {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: 2px solid white;
    margin: 40px auto 0;
    overflow: hidden;
  }

  .headImg > img {
    width: 100%;
    height: 100%;
  }

  .peopleBox > i {
    float: right;
    display: inline-block;
    margin: 5px 0px 0px 0px;
    border-color: rgb(180, 180, 180) transparent transparent transparent;
    border-width: 6px;
    border-style: solid;
    width: 0;
    height: 0;
  }

  section {
    width: calc(100% - 15px);
    /*height: 100%;*/
    position: absolute;
    top: 121px;
    right: 5px;
    left: 10px;
    bottom: 65px;
    /*border-bottom: 1px solid silver;*/
    overflow: hidden;
  }

  footer {
    position: absolute;
    height: 40px;
    right: 5px;
    left: 0px;
    bottom: 0px;
    width: 100%;
    background-color: white;
    font: 17px/2 "微软雅黑";
    color: silver;
    padding: 2px 35px 0 5px;
  }

  footer > div > div:first-of-type > div {
    width: 30px;
    height: 30px;
    background: url("../assets/img/roomReservation/phoneImg.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  footer > div > div {
    height: 35px;
  }

  footer > div > div:last-of-type {
    position: relative;
  }

  footer > div > div > div:first-of-type {
    margin-top: 3px;
    margin-left: 20px;
  }

  footer > div > div > span {
    margin-left: 10px;
  }

  footer > div > div:first-of-type > span {
    float: left;
    line-height: 35px;
  }

  footer > div > div:last-of-type > span {
    float: left;
    line-height: 35px;
  }

  footer > div {
    float: right;
  }

  footer > div > div {
    float: left;
  }

</style>
