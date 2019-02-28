<template>
<div>
  <!--交班-->
  <div class="handClassBox" v-show="handClassBoxIsTrue">
    <!--遮罩-->
    <div class="handClassShade"></div>
    <div class="handClass">
      <h1>交班
          <div @click="clickHandClass"></div>
        </h1>
      <div class="handClassContent">
        <div><span>工作时间</span> : 2018-12-10 9 : 30 ~ 2018-12-10 18 :30</div>
        <ul class="clearfix">
          <li @click="handClassCansle">取消</li>
          <li @click="handClassSure">确定</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'

export default {
  computed: mapGetters([]),
  data() {
    return {
      handClassBoxIsTrue: true, //交班
    }
  },
  methods: {
    initData() {},
    search() {
      this.initData()
    },
    //      叉掉交班
    clickHandClass() {
      this.handClassBoxIsTrue = false;
    },
    //      取消交班
    handClassCansle() {
      this.handClassBoxIsTrue = false;
    },
    //      确定交班
    handClassSure() {
      this.handClassBoxIsTrue = false;
    },
  },
}
</script>
<style scoped>
.handClassShade {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 300;
  /*background-color: royalblue;*/
}

.handClass {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 300;
  width: 670px;
  height: 280px;
  margin: auto;
  background-color: rgb(238, 238, 238);
  box-shadow: 0px 0px 50px 2px silver;
}

.handClass>h1 {
  height: 35px;
  font: 18px/35px "微软雅黑";
  text-align: center;
  background-color: rgb(18, 150, 215);
  color: white;
}

.handClass>div {
  height: 245px;
  width: 670px;
}

.handClass>h1>div {
  width: 20px;
  height: 20px;
  /*background: url("../assets/img/roomReservation/false.png") no-repeat;*/
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  position: absolute;
  top: 7px;
  right: 10px;
}

.handClassContent {
  position: relative;
}

.handClassContent>div {
  padding: 70px 20px 0 20px;
  font-size: 18px;
  font-weight: 500;
}

.handClassContent>div>span {
  font-size: 28px;
  font-weight: 400;
}

.handClassContent>ul {
  position: absolute;
  bottom: 20px;
}

.handClassContent>ul>li {
  float: left;
  width: 235px;
  height: 40px;
  color: white;
  text-align: center;
  line-height: 40px;
  font-size: 23px;
}

.handClassContent>ul>li:nth-of-type(1) {
  background-color: rgb(184, 184, 184);
  margin-right: 88px;
  margin-left: 60px;
}

.handClassContent>ul>li:nth-of-type(2) {
  background-color: rgb(246, 188, 76);
}
</style>
