<template>
  <div>
    <div class="container clearfix">
      <div class="containerLeft">
        <div class="headImg"></div>
        <!--<div class="turnBack">回到主页</div>-->
      </div>
      <div class="content">
        <div class="contentBox">
          <!--顶部-->
          <header>
            <ul class="navList clearfix">
              <!--导航-->
              <li :class="{navActive:navActiveIndex==index}" v-for="item,index in navList" @click="clickNavList(item,index)">
                <div class="navImgBox"></div>
                <div>{{item.name}}</div>
              </li>
              <!--人-->
              <div class="peopleRight clearfix">
                <div class="peopleBox">
                  <span>小王</span>
                  <i></i>
                </div>
                <ul class="funcIcon clearfix">
                  <li>一</li>
                  <li>口</li>
                  <li>X</li>
                </ul>
              </div>
            </ul>
          </header>
          <ul class="sectionNav clearfix">
            <li v-for="item,index in sectionNavList">{{item.name}}</li>
          </ul>
          <!--内容-->
          <section class="clearfix">

          </section>
          <!--底部-->
          <footer class="clearfix">
            <div class="clearfix">
              <div @click="stageHelper" class="clearfix">
                <div class="phoneImg"></div>
                <span>前台助手</span>
              </div>
              <div @click="clickMessage" class="clearfix">
                <div class="messageImg"></div>
                <span>消息</span>
                <div class="liu">6</div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        onGoRoomInfoIsShow:true,
        farAwayRoomStateIsShow:false,
        roomPriceDetailIsShow:false,
        onGoRoomInfoIndex:0,
        onGoRoomInfoList:[
          {name:"在住信息"},
          {name:"远期房态"},
          {name:"房价明细"},
        ],
        clickRoomIndex:-1,
        roomActive:[
          {id:0},
          {id:1},
          {id:2},
          {id:3},
        ],
        roomIndex: -1,
        roomStatesList:[],
        goRoomBoxLittleBoxIsTrue:true,
        payWayChoiceIsShow:true,
        messageContList:[],
        clickMassageNavIndex:1,
        messageList:[
          {name:"未读消息"},
          {name:"已读消息"},
        ],
        roomTypeConList:[],
        loudongList:[
          {name:"楼栋"},
          {name:"楼层"},
          {name:"全选"},
          {name:"房号"},
        ],
        roomTypeChoiceList:[
          {name:"双人房"},
          {name:"普通大床房"},
          {name:"标准大床房"},
          {name:"标准套房"},
        ],
        cashierAssistantList:[
          {name:'清洁工'},
          {name:'服务员'},
          {name:'清洁工'},
        ],
        value1:[],
        personageGoRoom: true,
        messageBoxIsTrue: false,
        onlineInfo: false,
        handClassBoxIsTrue: false,
        goRoomBoxIsShow: false,
        accountInfoIsShow: false,
        enterpriseGoRoom: false,
        cashierAssistantIsShow: false,
        goRoomNameIndex: 0,
        cashierAssistantLiIndex: 0,
        goRoomName:[
          {name:'个人入住'},
          {name:'企业入住'}
        ],
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        roomTypeDetailList:[
          {
            name:'入住',
          },
          {
            name:'锁房',
          },
          {
            name:'...',
          },
        ],
        roomIsShow: false,
        roomDetailList:[
          {
            roomName:'全部',
            number:47
          },
          {
            roomName:'空房',
            number:38
          },
          {
            roomName:'住人',
            number:9
          },
          {
            roomName:'维修',
            number:0
          },
        ],
        roomTypeList:[
          {
            headName:"床型:",
            typeList:[
              {name:"单人床"},
              {name:"双人床"},
              {name:"三人床"},
              {name:"多人床"},
            ],
          },
          {
            headName:"早餐:",
            typeList:[
              {name:"无早"},
              {name:"单早"},
              {name:"双早"},
              {name:"三早"},
              {name:"四早"},
              {name:"多早"},
            ],
          },
          {
            headName:"宽带:",
            typeList:[
              {name:"免费WIFI"},
              {name:"免费有线宽带"},
              {name:"收费有线宽带"},
              {name:"收费有线宽带和免费无线宽带"},
              {name:"免费有线宽带和免费无线宽带"},
              {name:"收费有线宽带和收费无线宽带"},
              {name:"无"},
              {name:"收费无线宽带"},
            ],
          },
        ],
        navActiveIndex:3,
        sectionNavList:[
          {name:'意见投诉'},
          {name:'意见投诉'},
          {name:'意见投诉'},
        ],
        navList:[
          {name:'客房'},
          {name:'订单'},
          {name:'会员'},
          {name:'投诉'},
          {name:'交班'},
        ],
      }
    },
    methods:{
//    点击在住信息
      clickOnGoRoomInfo(item,index){
        this.onGoRoomInfoIndex=index;
        if(index==0){
          this.onGoRoomInfoIsShow=true;
          this.farAwayRoomStateIsShow=false;
          this.roomPriceDetailIsShow=false;
        }if(index==1){
          this.onGoRoomInfoIsShow=false;
          this.farAwayRoomStateIsShow=true;
          this.roomPriceDetailIsShow=false;
        }if(index==2){
          this.onGoRoomInfoIsShow=false;
          this.farAwayRoomStateIsShow=false;
          this.roomPriceDetailIsShow=true;
        }

      },
//    确定结账方式选择
      payWayChoiceSure(){
        this.payWayChoiceIsShow=false;
      },
//    取消结账方式选择
      payWayChoiceCansle(){
        this.payWayChoiceIsShow=false;
      },
//    点击选房间取消
      clickGoRoomCansle(){
        this.goRoomBoxLittleBoxIsTrue=false;
      },
//    点击选房间取消
      clickGoRoomSure(){
        this.goRoomBoxLittleBoxIsTrue=false;
      },
//    点击消息盒子导航条
      clickMassageNav(item,index){
        this.clickMassageNavIndex=index;
      },
//    点击消息
      clickMessage(){
        this.messageBoxIsTrue=!this.messageBoxIsTrue;
      },
      handClassCansle(){
        this.handClassBoxIsTrue=false;
      },
      handClassSure(){
        this.handClassBoxIsTrue=false;
      },
      clickHandClass(){
        this.handClassBoxIsTrue=false;
      },
      clickAccountInfoFalse(){
        this.accountInfoIsShow=false;
      },
      clickAccountBox(){
        this.onlineInfo=false;
        this.accountInfoIsShow=true;
      },
      send(){
        this.cashierAssistantIsShow=false;
      },
      clickCashierAssistantName(item,index){
        this.cashierAssistantLiIndex=index;
      },
      stageHelper(){
        this.cashierAssistantIsShow=true;
      },
      clickGoRoomBox(){
        this.goRoomBoxIsShow=false;
      },
      clickGoRoomBoxCansle(){
        this.goRoomBoxIsShow=false;
      },
//    点击入住
      clickgoRoomName(item,index){
        this.goRoomNameIndex=index;
        if(index==0){
          this.personageGoRoom=true;
          this.enterpriseGoRoom=false;
        }else{

          this.personageGoRoom=false;
          this.enterpriseGoRoom=true;
        }
      },
//    入住
      clickGoRoom(){
        this.roomIsShow=false;
        this.goRoomBoxIsShow=true;
      },
      clickRoomTypeList(item,index){
        if(index==2){

        };
      },
      clickNavList(item,index){
        this.navActiveIndex=index;
//      点击交班
        if(index==4){
          this.handClassBoxIsTrue=true;
        };
      },
      clickRoom(item,index){
        this.clickRoomIndex=index;
        if(item.state==1){
          this.roomIsShow=!this.roomIsShow;
          this.onlineInfo=false;
        }if(item.state==0){
          this.roomIsShow=false;
          this.onlineInfo=!this.onlineInfo;
        }if(item.state==2){
          this.roomIsShow=!this.roomIsShow;
          this.onlineInfo=false;
        }
        if(item.state==3){
          this.roomIsShow=!this.roomIsShow;
          this.onlineInfo=false;
        }
      },
    },
    created(){
      for(let i=0;i<3;i++){
        this.roomTypeConList.push(
          {name:'双人房',num:1,roomNumber:301}
        )
      };
//    消息数据
      for(let i=0;i<10;i++){
        this.messageContList.push(
          {name:'308退房'}
        )
      };
//    房间状态数据
      for(let i=0;i<4;i++){
        this.roomStatesList.push(
          {name:'标准大床房',state:i}
        )
      };
    },
  }
</script>

<style scoped>
  .farAayRoomStateCon>li{
    float: left;
    color: #fff;
  }
  .messageBox>ul{
    width: 230px;
    height: 200px;
    padding-right: 15px;
    overflow: scroll;
    border: 1px dashed black;
  }
  .messageBox>ul>li{
    border-bottom: 1px solid rgb(253,223,164);
    height: 30px;
    font: 15px/2 "微软雅黑";
    padding-left: 10px;
  }
  .messageBox>div>ul>li{
    float: left;
    width: 70px;
    height: 25px;
    text-align: center;
  }
  .messageBox>div>ul>li.clickMassageNavActive{
    color: #000;
    background-color: #fff;
  }
  .messageBox>div>ul{
    padding-top: 5px;
    padding-left: 5px;
  }
  .messageBox>div{
    height: 35px;
    width: 230px;
    background-color: rgb(255,85,85);
    color: #fff;
    line-height: 25px;
  }
  .messageBox{
    width: 230px;
    height: 230px;
    background-color: white;
    position: fixed;
    bottom: 35px;
    right: 5px;
    z-index: 70;
  }
  .choicedRoomContent>div>div>div{
    float: left;
    height: 30px;
  }
  .choicedRoomContent>div>div:nth-child(odd){
    background-color: #fff;
  }
  .choicedRoomContent>div>div:nth-child(even){
    background-color: rgb(242,242,242);
  }
  .choicedRoomContent>div>div>:nth-child(3)>div{
    color: #fff;
    background-color: rgb(255,86,86);
    width: 45px;
    text-align: center;
    height: 20px;
    margin-top: 5px;
    line-height: 20px;
  }
  .choicedRoomContent>div>div{

  }
  .choicedRoomContent>div{
    width: 620px;
    height: 70px;
    /*overflow: scroll;*/
  }
  .choicedRoomContent{
    height: 30px;
    width: 485px;
    line-height: 30px;
  }
  .choicedRoomContent>ul>li{
    color: white;
    background-color: rgb(80,80,80);
    float: left;
    font: 15px/2 "微软雅黑";
    padding-left: 5px;
  }
  .choicedRoomContent>ul>li:nth-child(1){
    width: 120px;
    margin-right: 5px;
  }
  .choicedRoomContent>div>div>div:nth-child(1){
    width: 120px;
    margin-right: 5px;
  }
  .choicedRoomContent>ul>li:nth-child(2){
    width: 60px;
    margin-right: 5px;
  }
  .choicedRoomContent>div>div>div:nth-child(2){
    width: 60px;
    margin-right: 5px;
  }
  .choicedRoomContent>ul>li:nth-child(3){
    width: 430px;
  }
  .choicedRoomContent>div>div>div:nth-child(3){
    width: 430px;
  }
  .goRoomBoxLittleBoxConRightTitle{

  }
  .goRoomBoxLittleBoxConRightTitle>li{
    float: left;
    height: 30px;
    background-color: rgb(80,80,80);
    color: #fff;
    line-height: 30px;
    padding-left: 5px;
    font-weight: 600;
  }
  .goRoomBoxLittleBoxConRightTitle>li:nth-child(1),
  .goRoomBoxLittleBoxConRightTitle>li:nth-child(2),
  .goRoomBoxLittleBoxConRightTitle>li:nth-child(3)
  {
    width: 50px;
    margin-right: 5px;
  }
  .goRoomBoxLittleBoxConRightTitle>li:nth-child(4)
  {
    width: 320px;
  }
  .goRoomBoxLittleBoxConRightCon{
    height: 120px;
    width: 485px;
    /*background-color: rosybrown;*/
    overflow: scroll;
  }
  .goRoomBoxLittleBoxConRightCon>li{
    height: 30px;
    width: 485px;
  }
  .goRoomBoxLittleBoxConRightCon>li>div{
    width: 50px;
    height: 30px;
    float: left;
    margin-right: 5px;
    text-align: center;
  }
  .goRoomBoxLittleBoxConRightCon>li>ul{
    float: left;
    padding-top: 5px;
  }
  .goRoomBoxLittleBoxConRightCon>li>ul>li{
    float: left;
    width: 50px;
    height: 20px;
    font-size: 12px;
    background-color: rgb(255,86,86);
    line-height: 20px;
    text-align: center;
    color: #fff;
    margin-right: 5px;
  }
  .goRoomBoxLittleBoxConRightCon>li:nth-child(odd){
    background-color: #fff;
  }
  .goRoomBoxLittleBoxConRightCon>li:nth-child(even){
    background-color: rgb(242,242,242);
  }
  .goRoomBoxLittleBoxConLeft>ul>li{
    height: 30px;
    width: 120px;
    line-height: 30px;
    font-size: 15px;
    padding-left: 5px;
  }
  .goRoomBoxLittleBoxConLeft>ul>li:nth-child(odd){
    background-color: #fff;
  }
  .goRoomBoxLittleBoxConLeft>ul>li:nth-child(even){
    background-color: rgb(242,242,242);
  }
  .goRoomBoxLittleBoxConLeft>div{
    padding-left: 5px;
    height: 30px;
    width: 120px;
    background-color: rgb(80,80,80);
    color: #fff;
    font-size: 11px;
    line-height: 30px;
    font-weight: 600;
  }
  .goRoomBoxLittleBoxConLeft{
    width: 120px;
    height: 150px;
    margin-right: 15px;
    /*background-color: brown;*/
    float: left;
  }
  .goRoomBoxLittleBoxConRight{
    width: 485px;
    height: 150px;
    /*background-color: navajowhite;*/
    float: left;
  }
  .goRoomBoxLittleBoxBot>div>span>span{
    color: red;
  }
  .goRoomBoxLittleBoxBot>div{
    float: left;
  }
  .goRoomBoxLittleBoxBot>ul>li{
    float: right;
    background-color: rgb(246,188,76);
    color: #000;
    height: 25px;
    width: 80px;
    text-align: center;
  }
  .goRoomBoxLittleBoxBot>ul>li:last-of-type{
    margin-right: 10px;
  }
  .goRoomBoxLittleBoxCon{
    width: 620px;
    height: 300px;
    /*background-color: red;*/
    margin-left: 10px;
  }
  .goRoomBoxLittleBoxCon>h1{
    height: 25px;
    width: 620px;
  }
  .goRoomBoxLittleBoxCon>h1>span{
    font-size: 12px;
    font-weight: 600;
  }
  .goRoomBoxLittleBoxCon>h2{
    font-size: 12px;
    font-weight: 600;
    padding-left: 10px;
  }
  .goRoomBoxLittleBoxCon>div:first-of-type{
    height: 150px;
    width: 620px;
    /*background-color: royalblue;*/
  }
  .goRoomBoxLittleBoxCon>div:last-of-type{
    height: 100px;
    width: 620px;
    /*background-color: rosybrown;*/
  }
  .goRoomBoxLittleBoxBot{
    width: 620px;
    height: 25px;
    /*background-color: royalblue;*/
    margin-left: 10px;
    margin-top: 20px;
  }
  .goRoomBoxLittleBox{
    position: absolute;
    width: 640px;
    height: 400px;
    background-color: rgb(238,238,238);
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto auto;
    z-index: 60;
    box-shadow: 0px 0px 10px 1px silver;
  }
  .goRoomBoxLittleBox>h1{
    width: 640px;
    color: #fff;
    height: 35px;
    background-color: rgb(79,129,189);
    font: 12px/35px "微软雅黑";
    text-align: center;
  }
  .payWayChoiceInput>span{
    margin-right: 20px;
  }
  .payWayChoiceInput>input{
    border: 1px solid #e1e1e1;
  }
  ul.payWayChoiceContent{
    margin: 60px 0 0 70px;
  }
  ul.payWayChoiceContent>li{
    height: 30px;
    margin-bottom: 10px;
    font: 11px/30px "微软雅黑";
  }
  ul.payWayChoiceContent>li:nth-of-type(1)>.payWayChoiceInput{

  }
  ul.payWayChoiceContent>li:nth-of-type(2)>.payWayChoiceInput{

  }
  ul.payWayChoiceContent>li:nth-of-type(2)>.payWayChoiceInput>input{
    width: 320px;
    height: 25px;
    /*float: right;*/
    text-align: right;
  }
  ul.payWayChoiceContent>li:nth-of-type(3)>.payWayChoiceInput{

  }
  ul.payWayChoiceContent>li:nth-of-type(3)>.payWayChoiceInput>input{
    width: 320px;
    height: 25px;
  }
  .payWayChoiceName{
    width: 60px;
    text-align: right;
    float: left;
  }
  .payWayChoiceInput{
    width: 320px;
    height: 25px;
    /*background-color: red;*/
    float: left;
    margin-left: 10px;
  }
  .payWayChoiceFoot{
    position: absolute;
    bottom: 20px;
    right: 10px;
  }
  .payWayChoiceFoot>li{
    float: left;
    width: 80px;
    height: 25px;
    text-align: center;
    background-color: rgb(246,188,76);
    color: rgb(80,80,80);
    margin-right: 10px;
    font: 16px/25px "微软雅黑";
  }
  .payWayChoice{
    width: 540px;
    height: 300px;
    box-shadow: 0px 0px 10px 1px silver;
    position: absolute;
    background-color: rgb(238,238,238);
    margin: auto auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 50;
  }
  .payWayChoice>h1{
    height: 30px;
    color: #fff;
    text-align: center;
    background-color: rgb(18,150,215);
    font: 16px/30px "微软雅黑";
  }
  .handClassContent{
    position: relative;
  }
  .handClassContent>div{
    padding: 70px 20px 0 20px;
    font-size: 18px;
    font-weight: 500;
  }
  .handClassContent>div>span{
    font-size: 28px;
    font-weight: 400;
  }
  .handClassContent>ul{
    position: absolute;
    bottom: 20px;
  }
  .handClassContent>ul>li{
    float: left;
    width: 235px;
    height: 40px;
    color: white;
    text-align: center;
    line-height: 40px;
    font-size: 23px;
  }
  .handClassContent>ul>li:nth-of-type(1){
    background-color: rgb(184,184,184);
    margin-right: 88px;
    margin-left: 60px;
  }
  .handClassContent>ul>li:nth-of-type(2){
    background-color: rgb(246,188,76);
  }
  .handClassShade{
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 30;
    /*background-color: royalblue;*/
  }
  .handClass{
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 30;
    width: 670px;
    height: 280px;
    margin: auto;
    background-color: rgb(238,238,238);
    box-shadow: 0px 0px 50px 2px silver;
  }
  .handClass>h1{
    height: 35px;
    font: 18px/35px "微软雅黑";
    text-align: center;
    background-color: rgb(18,150,215);
    color: white;
  }
  .handClass>div{
    height: 245px;
    width: 670px;
  }
  .handClass>h1>div{
    width: 20px;
    height: 20px;
    background: url("../assets/img/roomReservation/false.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    top: 7px;
    right: 10px;
  }
  .tableBox{
    height: 200px;
  }
  .heji{
    margin: 10px auto 20px;
  }
  .dateChoise{
    margin: 50px 0;
  }
  .cashierAssistantContent>div:nth-of-type(3){
    color: white;
    background-color: rgb(246,188,76);
    height: 55px;
    font: 27px/55px "微软雅黑";
    text-align: center;
    width: 360px;
    position: absolute;
    bottom: 50px;
    right: 75px;
  }
  .cashierAssistantContent>div:nth-of-type(2){
    height: 300px;
    width: 850px;
  }
  .cashierAssistantContent>div:nth-of-type(2)>textarea{
    height: 300px;
    width: 850px;
    border-bottom: 1px solid silver;
  }
  .cashierAssistantContent>div:first-of-type{
    height: 80px;
    width: 850px;
    /*background-color: red;*/
    border-bottom: 1px solid silver;
  }
  .cashierAssistantContent>ul>li>div{
    width: 45px;
    height: 75px;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }
  .cashierAssistantContent>ul>li>div>h1{
    position: absolute;
    bottom: 5px;
    right: 0;
    left: 0;
    height: 20px;
    text-align: center;
    font: 13px/20px "微软雅黑";
  }

  .cashierAssistantContent>ul>li>div>div>div{
    width: 45px;
    height: 50px;
    background-size: 100% auto;
    background-position: 0 10px;
  }
  /*cashierAssistantImgActive*/
  .cashierAssistantContent>ul>li:nth-of-type(1)>div>div>div{
    background: url("../assets/img/roomReservation/saodiW.png") no-repeat;
  }
  .cashierAssistantContent>ul>li:nth-of-type(1)>div>div>div.cashierAssistantImgActive{
    background: url("../assets/img/roomReservation/saodiC.png") no-repeat;
  }
  .cashierAssistantContent>ul>li:nth-of-type(2)>div>div>div{
    background: url("../assets/img/roomReservation/peopleW.png") no-repeat;
  }
  .cashierAssistantContent>ul>li:nth-of-type(2)>div>div>div.cashierAssistantImgActive{
    background: url("../assets/img/roomReservation/peopleC.png") no-repeat;
  }
  .cashierAssistantContent>ul>li:nth-of-type(3)>div>div>div{
    background: url("../assets/img/roomReservation/saodiW.png") no-repeat;
  }
  .cashierAssistantContent>ul>li:nth-of-type(3)>div>div>div.cashierAssistantImgActive{
    background: url("../assets/img/roomReservation/saodiC.png") no-repeat;
  }
  .cashierAssistantContent>ul>li>div>div{
    width: 45px;
    height: 60px;
    /*padding-top: 10px;*/
    position: absolute;
    right: 0;
    left: 0;
    bottom: 15px;
    /*margin: 10px auto 0;*/
    margin: 0 auto 0;
  }
  .cashierAssistantContent>ul>li{
    width: 280px;
    height: 80px;
    background-color: rgb(245,245,245);
    float: left;
    color: silver;
    position: relative;
  }
  .cashierAssistantContent>ul>li.cashierAssistantLiActive{
    border-top: 5px solid rgb(246,188,76);
    background-color: white;
  }
  .cashierAssistantContent>ul>li:nth-of-type(1){
    margin-right: 5px;
  }
  .cashierAssistantContent>ul>li:nth-of-type(2){
    margin-right: 5px;
  }
  .cashierAssistantContent>ul>li:nth-of-type(3){

  }
  .cashierAssistantContent{
    height: 640px;
    width: 1000px;
    /*background-color: royalblue;*/
    padding: 10px 75px 65px;
  }
  .cashierAssistantTitle{
    color: white;
    background-color: rgb(246,188,76);
    text-align: center;
    height: 80px;
    font: 30px/80px "微软雅黑";
  }
  .cashierAssistant{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 1000px;
    z-index: 30;
    height: 720px;
    margin: 50px auto;
    background-color: #fff;
    box-shadow: -1px 1px 2px  2px  silver;
  }
  .onRoomInfo>ul{
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .onRoomInfo>ul>li{
    background-color: rgb(254,194,79);
    height: 25px;
    float: left;
    color: #000;
    width: 50px;
    text-align: center;
    font-size: 12px;
    line-height: 25px;
    margin-right: 5px;
  }
  .onRoomInfo>div:first-of-type{
    width: 90px;
    height: 110px;
    background-color: red;
    float: left;
  }
  .onRoomInfo>div:nth-of-type(2){
    float: left;
    width: 320px;
    height: 200px;
    /*background-color: royalblue;*/
    margin-left: 10px;
  }
  .onRoomInfo{
    width: 445px;
    height: 250px;
    padding: 0px 10px 5px;
  }
  .farAwayRoomState{
    width: 445px;
    height: 250px;
    padding: 0px 10px 5px;
  }
  .roomPriceDetail{
    width: 445px;
    height: 250px;
    padding: 0px 0px 5px;
    background-color: #fff;
    border: 1px solid silver;
  }
  .roomPriceDetail>ul:first-of-type>li{
    background-color: rgb(80,80,80);
  }
  .roomPriceDetail>ul>li{
    height: 30px;
    float: left;
    line-height: 30px;
    margin-right: 2px;
    padding-left: 5px;
  }
  .roomPriceDetail>ul:first-of-type{
    border: 1px solid silver;
  }
  .roomPriceDetail>ul:nth-child(2)>li{
    color: #000;
  }
  .roomPriceDetail>ul:nth-child(2)>li:first-of-type{
    border: 1px solid black;
  }
  .roomPriceDetail>ul>li:first-of-type{
    width: 100px;
    font: 15px/2 "微软雅黑";
  }
  .roomPriceDetail>ul>li:nth-child(2){
    width: 80px;
  }
  .clickRoomBaseClass>div:first-of-type>h1{
    color: white;
    height: 25px;
  }
  .clickRoomBaseClass>div:first-of-type{
    background-color: rgb(255,99,99);
  }
  .clickRoomBaseClass>div:first-of-type>ul{
    height: 25px;
  }
  .clickRoomBaseClass>div:first-of-type>ul>li{
    width: 65px;
    height: 25px;
    float: left;
    text-align: center;
  }
  .clickRoomBaseClass>div:first-of-type>ul>li.onGoRoomInfoActive{
    color: #000;
    background-color: #fff;
  }
  .displayBoxInfo{
    margin: 5px 0px 5px 10px;
  }
  .displayBox{
    /*background-color: red;*/
    height: 450px;
    width: 715px;
  }
  .allNumber>span:first-of-type{
    margin-right: 50px;
    margin-left: 10px;
  }
  .allNumber{
    margin-top: 5px;
    color: rgb(0,128,0);
    text-align: left;
  }
  .allNumber>span{
    float: left;
  }
  .AllMoneyRight{
    float: left;
    color: red;
    padding: 20px;
  }
  .AllMoneyRight>h1{
    font: 20px/40px '微软雅黑';
  }
  .AllMoneyLeft>h1{
    color: red;
    font: 25px/55px "微软雅黑";
  }
  .AllMoneyLeft{
    float:  left;
    width: 275px;
    height: 160px;
    border-right: 1px solid black;
    padding: 25px;
  }
  .AllMoney{
    width: 715px;
    height: 160px;
    border-top: 1px solid black;
    border-bottom: 1px solid silver;
    margin-top: 5px;
  }
  .costAccount{
    width: 80px;
    height: 30px;
    background-color: rgb(246,188,76);
    text-align: center;
    line-height: 30px;
  }
  .accountInfoContentRight{
    margin-left: 5px;
    /*background-color: royalblue;*/
    width: 720px;
    height: 690px;
  }
  .roomNumberContent>li>div{
    float: left;
  }
  .roomNumberContent>li>div:nth-of-type(1){
    width: 65px;
  }
  .roomNumberContent>li>div:nth-of-type(2){
    width: 85px;
  }
  .roomNumberContent>li>div:nth-of-type(3){
    width: 105px;
  }
  .roomNumberContent>li{
    background-color: rgb(250,220,150);
  }
  .roomNumberTitle>li:nth-of-type(1){
    width: 60px;
    margin-right: 5px;
  }
  .roomNumberTitle>li:nth-of-type(2){
    width: 80px;
    margin-right: 5px;
  }
  .roomNumberTitle>li:nth-of-type(3){
    width: 105px;
  }
  .roomNumberTitle>li{
    font-size: 10px;
    height: 30px;
    float: left;
    color: white;
    text-align: left;
    line-height: 30px;
    background-color: rgb(80,80,80);
  }
  .roomPriceBox{
    margin-top: 10px;
  }
  .peopleBoxContentLeft{
    height: 130px;
    width: 115px;
    background-color: red;
  }
  .peopleBoxContent>div{
    float: left;
  }
  .peopleBoxContentRight{
    padding: 10px;
    width: 140px;
    height: 130px;
    /*background-color: royalblue;*/
  }
  .peopleBoxContent{
    height: 130px;
    width: 255px;
    /*background-color: rebeccapurple;*/
  }
  .roomNumber{
    height: 390px;
    width: 255px;
    background-color: white;
  }
  .accountInfoContentLeftPeopleInfo{
    width: 255px;
    height: 270px;
    background-color: white;
    margin-bottom: 10px;
    padding: 10px;
  }
  .accountInfoContentLeft{
    width: 255px;
    height: 670px;
    /*background-color: red;*/
  }
  .accountInfoContent>div{
    float: left;
  }
  .accountInfoContent{
    width: 1000px;
    height: 690px;
    background-color: rgb(238,238,238);
    padding: 10px;
  }
  .accountInfoTitle{
    text-align: center;
    background-color: rgb(18,150,215);
    color: white;
    height: 30px;
    font: 15px/2 '微软雅黑';
    position: relative;
  }
  .accountInfoTitle>div{
    width: 20px;
    height: 20px;
    background: url("../assets/img/roomReservation/false.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    right: 10px;
  }
  .accountInfo{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 1000px;
    z-index: 20;
    height: 720px;
    margin: 50px auto;
    background-color: #fff;
    box-shadow: -1px 1px 2px  2px  silver;
  }
  .accountInfoBox{
    /*    position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: royalblue;
        z-index: 18;
        position: relative;*/
  }
  .accountInfoShade{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    /*background-color: red;*/
    z-index: 19;
  }
  .goRoomAndCansle{
    float: right;
  }
  .goRoomAndCansle>li{
    margin-right: 5px;
    color: black;
    background-color: rgb(246,188,76);
    text-align: center;
    float: left;
    width: 80px;
    height: 25px;
    line-height: 25px;
  }
  .choiceRoom>li:last-of-type{
    background-color: rgb(251,222,166);
  }
  .choiceRoom>li{
    margin-right: 5px;
    color: black;
    background-color: rgb(246,188,76);
    text-align: center;
    float: left;
    width: 80px;
    height: 25px;
    line-height: 25px;
  }
  .days{
    float: left;
    margin-right: 20px;
  }
  .days>span:last-of-type{
    color: red;
  }
  .days>input{
    height: 40px;
    border: 1px solid silver;
  }
  .orderIfo{
    margin-top: 10px;
    height: 0px;
  }
  .orderIfo>div:first-of-type{
    border-bottom: 1px solid silver;
    width: 40%;
  }
  .orderIfo>div:nth-of-type(2){
    width: 20%;
    text-align: center;
    margin-top:-10px;
  }
  .orderIfo>div:last-of-type{
    border-bottom: 1px solid silver;
    width: 40%;
  }
  .orderIfo>div{
    float: left;
  }
  .formInputBox{
    width: 830px;
    height: 105px;
    /*background-color: red;*/
    float: left;
    line-height: 25px;
    margin-left: 20px;
  }
  .clearGuestInfo{
    background-color: rgb(246,188,76);
    width: 150px;
    height: 25px;
    text-align: center;
    font: 12px/2 '微软雅黑';
    float: right;
  }
  .peopleContentBox{
    width: 950px;
    height: 130px;
    /*background-color: rebeccapurple;*/
  }
  .peopleContentBoxLeft{
    width: 120px;
    height: 130px;
    background-color: rosybrown;
    float: left;
  }
  .peopleContentBoxRight{
    height: 130px;
    width: 830px;
    /*background-color: royalblue;*/
    float: left;
  }
  .goRoomBoxContent{
    padding-top: 20px;
    padding-left: 25px;
    padding-right: 25px;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    /*background-color: rosybrown;*/
  }
  .goRoomBoxInput{
    height: 25px;
    width: 250px;
    float: left;
    /*background-color: rebeccapurple;*/
  }
  .goRoomBoxInput>span:last-of-type{
    color: red;
  }
  .goRoomBoxTitle{
    text-align: center;
    color: white;
    background-color: rgb(18,150,215);
    height: 30px;
    font: 15px/2 '微软雅黑';
  }
  .goRoomBoxTab{
    margin-top: 10px;
  }

  .goRoomBoxTab>div{
    float: left;
    height: 40px;
    width: 420px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    background-color: rgb(238,238,238);
  }
  .goRoomBoxTab>div:first-of-type{
    margin-right: 10px;
    margin-left: 75px;
  }
  .goRoomBoxTab>div:nth-of-type(2){
    /*background-color: rgb(246,188,76);*/
  }
  .goRoomBoxTab>div.goRoomNameActive{
    background-color: rgb(246,188,76);
  }
  .goRoomBoxShade{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9;
  }
  .goRoomBox{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 1000px;
    z-index: 10;
    height: 720px;
    margin: 50px auto;
    background-color: #fff;
    box-shadow: -1px 1px 2px  2px  silver;
  }
  .goRoomBoxLittleBoxShade{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /*background-color: rosybrown;*/
    z-index: 50;
  }
  .otherRoomType{
    width: 60px;
    height: 90px;
    position: absolute;
    bottom: 35px;
    right: 8px;
  }
  .otherRoomType>div:first-of-type{
    background-color: rgb(255,191,68);
    width: 60px;
    height: 80px;
    text-align: center;
    color: #000;
    padding-top: 5px;
  }
  .otherRoomType>div:last-of-type{
    margin: 0 auto;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: rgb(255,191,68) transparent transparent transparent;
  }
  .roomTypeList{
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
  .roomTypeList>li:nth-of-type(3){
    width: 20px;
  }
  .roomTypeList>li{
    float: left;
    width: 45px;
    height: 25px;
    text-align: center;
    border: 1px solid white;
    margin-right: 5px;
    background-color: rgb(255,191,68);
    color: black;
  }
  .container{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .containerLeft{
    width: 135px;
    height: 100%;
    background-color: rgb(80,80,80);
    float: left;
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
  .contentBox{
    height: 100%;
    width: 100%;
    float: left;
    padding-left: 10px;
    background-color: rgb(238,238,238);
    position: relative;
  }
  .headImg{
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: 2px solid white;
    margin: 40px auto 0;
  }
  .turnBack{
    text-align: center;
    color: #fff;
    font: 20px/2 '微软雅黑';
    background-color: rgb(27,113,177);
    margin-top: 27px;
  }
  .navList{
    background-color: #fff;
  }
  .navList>li{
    float: left;
    height: 70px;
    width: 70px;
    font: 14px/2 '微软雅黑';
    color: rgb(27,113,177);
    text-align: center;
  }
  .navList>li.navActive{
    background-color: rgb(27,113,177);
    color: #fff;
  }
  .navList>li:nth-of-type(1).navActive>div:first-of-type{
    background: url("../assets/img/roomReservation/roomW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .navList>li:nth-of-type(2).navActive>div:first-of-type{
    background: url("../assets/img/roomReservation/orderW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .navList>li:nth-of-type(5).navActive>div:first-of-type{
    background: url("../assets/img/roomReservation/complainW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .navList>li:nth-of-type(4).navActive>div:first-of-type{
    background: url("../assets/img/roomReservation/classW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .navList>li:nth-of-type(3).navActive>div:first-of-type{
    background: url("../assets/img/home/memberW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList>li>div:first-of-type{
    height: 34px;
    /*background-color: #fff;*/
    width: 36px;
    margin: 8px auto 0;
  }

  .navList>li:nth-of-type(1)>div:first-of-type{
    background: url("../assets/img/roomReservation/roomC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .navList>li:nth-of-type(2)>div:first-of-type{
    background: url("../assets/img/roomReservation/orderC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .navList>li:nth-of-type(5)>div:first-of-type{
    background: url("../assets/img/roomReservation/complainC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .navList>li:nth-of-type(4)>div:first-of-type{
    background: url("../assets/img/roomReservation/classC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .navList>li:nth-of-type(3)>div:first-of-type{
    background: url("../assets/img/home/memberC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .navList>li>div:last-of-type{

  }
  .peopleRight{
    float: right;
    margin-top: 22px;
  }
  .peopleBox{
    float: left;
    height: 25px;
    width: 115px;
    border: 1px solid rgb(180,180,180);
    border-radius: 20px;
    padding: 5px 10px;
    font: 15px/1 "微软雅黑";
    color: rgb(180,180,180);
  }
  .peopleBox>i{
    float: right;
    display: inline-block;
    margin: 5px 0px 0px 0px;
    border-color:  rgb(180,180,180) transparent transparent transparent;
    border-width: 6px;
    border-style: solid;
    width: 0;
    height: 0;
  }
  .funcIcon{
    float: left;
    margin-left: 15px;
  }
  .funcIcon>li{
    float: left;
    width: 30px;
    font-weight: 700;
  }
  .funcIcon>li:first-of-type{
  }
  .sectionNav{
    margin-top: 20px;
  }
  .sectionNav>li{
    margin-right: 1px;
    float: left;
    color: #fff;
    width: 100px;
    text-align: center;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    background-color: rgb(246,188,76);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  section{
    width: calc(100% - 15px);
    /*height: 100%;*/
    position: absolute;
    top: 121px;
    right: 5px;
    left: 10px;
    bottom: 35px;
    background-color: white;
    border: 1px solid rgb(246,188,76);
    overflow: hidden;
  }
  .orderBox{
    width: calc(100% - 15px);
    /*height: 100%;*/
    position: absolute;
    top: 121px;
    right: 5px;
    left: 10px;
    bottom: 35px;
    background-color: white;
    border: 1px solid rgb(246,188,76);
    overflow: hidden;
  }
  footer{
    padding-right: 55px;
    position: absolute;
    height: 35px;
    right: 5px;
    left: 10px;
    bottom: 0px;
    width: 100%;
    /*background-color: royalblue;*/
  }
  footer>div>div:first-of-type>div{
    width: 30px;
    height: 30px;
    background: url("../assets/img/roomReservation/phoneImg.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }
  footer>div>div{
    height: 35px;
  }
  footer>div>div:last-of-type{
    position: relative;
  }
  footer>div>div>div:first-of-type{
    margin-top: 3px;
    margin-left: 20px;
  }
  footer>div>div>span{
    margin-left: 10px;
  }
  footer>div>div:first-of-type>span{
    float: left;
    line-height: 35px;
  }
  footer>div>div:last-of-type>span{
    float: left;
    line-height: 35px;
  }
  footer>div{
    float: right;
  }
  footer>div>div{
    float: left;
  }
  .messageImg{
    width: 30px;
    height: 30px;
    background: url("../assets/img/roomReservation/messageImg.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }
  .liu{
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50px;
    color: white;
    position: absolute;
    text-align: center;
    line-height: 20px;
    right: -15px;
    top: -5px;
    z-index: 1000;
  }
  .sessionRight{
    position: absolute;
    /*top: 0;*/
    right: 5px;
    width: 220px;
    height: 100%;
    bottom: 45px;
    border: 1px solid rgb(246,188,76);
  }
  .rightSession{

  }
  .sessionLeft{
    position: absolute;
    left: 0;
    right: 230px;
    height: 100%;
    bottom: 0;
    padding-bottom: 150px;
    overflow: scroll;
  }
  .leftSession{

  }
  .roomType{
    /*    position: absolute;
        top: 0px;
        right: 0;
        left: 0px;*/
    width: 80%;
    border-bottom: 1px solid silver;
    padding-top: 10px;
  }
  .roomType>li{
    width: 50%;
    float: left;
  }
  .roomTypeHeadName{
    float: left;
    width: 40px;
    color: rgb(246,188,76);
  }
  .roomTypeDetail{
    float: left;
    width: 85%;
  }
  .roomTypeDetail>li{
    float: left;
  }
  .roomTypeDetailConLeftInput{
    margin-top: 5px;
  }
  .roomTypeDetailCon>div:first-of-type{
    float: left;
    width: 20px;
    height: 100%;
  }
  .roomTypeDetailCon>div:last-of-type{
    height: 100%;
    overflow: hidden;
  }
  .roomTypeDetailCon>div:last-of-type>div{
    float: left;
    width: 100px;
    height: 100%;
  }
  .roomDetailContentBox{

    /*background-color: royalblue;*/
    /*height: 100%;*/
    width: 100%;
    /*    position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        top: 200px;*/
    /*overflow: scroll;*/
  }
  .roomDetailContent{
    padding-bottom: 50px;
    height: 100%;
    width: 100%;
    /*overflow: scroll;*/
    /*background-color: rebeccapurple;*/
    /*margin-bottom: 50px;*/
  }
  .roomDetailBottom{
    height: 50px;
    width: calc(100% - 280px);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0px 0px 0px 50px;
    background-color: #fff;
  }
  .roomDetailBottom>ul>li{
    margin-right: 10px;
    float: left;
  }
  .roomDetailBottom>ul>li>div{
    border: 1px solid silver;
    line-height: 25px;
    height: 25px;
    text-align: center;
    border-radius: 5px;
    padding: 0px 5px 0px 5px;
  }
  .roomDetailBottom>ul>li>div>div,
  .roomDetailBottom>ul>li>div>span,
  .roomDetailBottom>ul>li>div>strong{
    float: left;
  }

  .roomDetailBottom>ul>li>div>div:first-of-type{
    width: 15px;
    height: 15px;
    margin-top: 5px;
    margin-right: 5px;
  }
  .roomDetailBottom>ul>li:first-of-type>div>div:first-of-type{
    background-color: rgb(79,129,189);
  }
  .roomDetailBottom>ul>li:first-of-type{
    color: rgb(79,129,189);
  }
  .roomDetailBottom>ul>li{
    font: 15px/25px "微软雅黑";
    font-weight: 600;
  }
  .roomDetailBottom>ul>li:nth-of-type(2){
    color: rgb(0,176,80);
  }
  .roomDetailBottom>ul>li:nth-of-type(2)>div>div:first-of-type{
    background-color: rgb(0,176,80);
  }
  .roomDetailBottom>ul>li:nth-of-type(3)>div>div:first-of-type{
    background-color: rgb(255,0,0);
  }
  .roomDetailBottom>ul>li:nth-of-type(3){
    color: rgb(255,0,0);
  }
  .roomDetailBottom>ul>li:nth-of-type(4)>div>div:first-of-type{
    background-color: rgb(127,127,127);
  }
  .roomDetailBottom>ul>li:nth-of-type(4){
    color: rgb(127,127,127);
  }
  .currentOccupancy{
    color: rgb(0,128,0);
    font: 15px/25px "微软雅黑";
    font-weight: 600;
  }
  .marktBox{
    background-color: rgb(80,80,80);
    width: 60px;
    height: 30px;
    color: white;
    line-height: 30px;
    text-align: center;
    margin-top: 10px;
  }
  .roomIfoUL{
    margin: 10px 0px 0px 10px;
  }
  .roomIfoLi{
    width: 150px;
    height: 100px;
    margin: 0px 0px 0px 10px;
    float: left;
    color: #fff;
    position: relative;
  }
  .roomIfoLi.roomActive0{
    background-color: rgb(255,86,86);
  }
  .roomIfoLi.roomActive1{
    background-color: rgb(18,150,215);
  }
  .roomIfoLi.roomActive2{
    background-color: rgb(143,143,143);
  }
  .roomIfoLi.roomActive3{
    background-color: rgb(255,187,24);
  }
  .clickRoomBaseClass{
    position: absolute;
    bottom: -200px;
    right: -295px;
    width: 445px;
    height: 300px;
    z-index: 100;
    background-color: rgb(80,80,80);
  }
  .clickRoomClass{
    position: absolute;
    bottom: -150px;
    right: -150px;
    width: 300px;
    height: 150px;
    background-color: rgb(80,80,80);
    z-index: 100;
  }
  .roomIfoLi>h1{
    font-size: 13px;
    margin-top: 8px;
    margin-left: 7px;
  }
  .roomIfoLi>h1>strong{

  }
  .roomIfoLi>h1>span{

  }
  .roomIfoLi>h2{
    text-align: center;
    font-size: 10px;
  }
  .roomIfoLi>div{

  }
  .states{
    margin-top: 44px;
    background-color: rgb(246,188,76);
    color: #fff;
    height: 33px;
    width: 220px;
    padding-left: 5px;
    line-height: 33px;
  }
  .roomCard{
    color: rgb(0,0,255);
    border-bottom: 1px solid rgb(0,0,255);
    width: 60px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    margin: 5px auto 0;
  }
  .searchBox{
    height: 25px;
    width: 180px;
    border-radius: 5px;
    /*border: 1px solid silver;*/
    margin: 5px auto 0;
  }
  .searchBox>input{
    color: silver;
    height: 25px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    padding-left: 10px;
    width: 150px;
    float: left;
    border-right: 1px solid silver;
  }
  .searchImg{
    width: 28px;
    height: 25px;
    /*background-color: rosybrown;*/
    float: left;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    /*border-left: 1px solid silver;*/
    border-top: 1px solid silver;
    border-right: 1px solid silver;
    border-bottom: 1px solid silver;
  }
  .divLine{
    border: 1px solid rgb(246,188,76);
    margin-top: 8px;
  }
  .roomStateContent{
    /*background-color: rosybrown;*/
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 160px;
    padding-right: 15px;
    overflow: scroll;
  }
  .roomStateContent>ul>li{
    width: 200px;
    border-bottom: 1px solid rgb(246,188,76);
    padding: 0px 0px 10px 10px;
  }
  .roomStateContent>ul>li>h1{
    font-size: 12px;
    color: rgb(246,188,76);
    width: 180px;
    border-bottom: 1px solid black;
  }
  .roomState{}
  .roomState>li{
    width: 85px;
    float: left;
  }
  .roomState>li>input{}
  .roomState>li>span{}

















</style>
