<template>
  <div>
    <h1 class="wrapTitle">酒店后台管理报表</h1>
    <!--报表导航-->
    <el-menu :default-active="formNavIndex" class="el-menu-demo" mode="horizontal" @select="changeNav">
      <el-menu-item :index="item.value" v-for="item,index in formNavList" :key="index">{{item.label}}
      </el-menu-item>
    </el-menu>
    <!--清洁员报表-->
    <div class="cleanerForm" v-show="formNavIndex == 0">
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>日期筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              size="small"
              v-model="cleanerTime"
              type="date"
              value-format="yyyy-MM-dd"
              @change="changeCleanerTime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchCleanerForm" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="cleanerFormList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="ht_ci_Dealer"
          label="工号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="ht_ci_Name"
          label="昵称">
        </el-table-column>
        <el-table-column
          align="center"
          label="打扫房间数">
          <template slot-scope="scope">
            {{scope.row.roomCleanCount}} 间
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="ht_ci_Name"
          label="昵称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="ht_ci_Phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="RoomIdArry"
          label="房间号">
        </el-table-column>
      </el-table>
    </div>
    <!--财务报表-->
    <div class="financeForm" v-show="formNavIndex == 1">
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>日期筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              size="small"
              v-model="financeTime"
              type="date"
              value-format="yyyy-MM-dd"
              @change="changeFinanceTime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchFinanceForm" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="financialFormList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="ht_od_RoomPriceID"
          align="center"
          label="房间价格ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="出售价格">
          <template slot-scope="scope">
            ￥{{scope.row.ht_od_SellPrice}}
          </template>
        </el-table-column>
        <el-table-column
          prop="ht_rpp_Name"
          align="center"
          label="房间名称">
        </el-table-column>
        <el-table-column
          align="center"
          label="入住天数">
          <template slot-scope="scope">
            {{scope.row.roomTypeCount}} 天
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--用户入住率-->
    <div class="financeForm" v-show="formNavIndex == 2">
      <el-col :span="24" class="formSearch clearfix">
        <el-form :inline="true">
          <el-form-item>
            <span>日期筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              size="small"
              v-model="userTime"
              type="date"
              value-format="yyyy-MM-dd"
              @change="changeGuestTime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchGuestForm" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <div class="cashierChart">
        <p>入住率: {{ num }}%</p>
        <canvas id="canvas" width="300" height="300">
          您的浏览器不支持canvas
        </canvas>
      </div>
      <strong class="cashierChartStrong">{{showTime}}</strong>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        formNavIndex: "0",
        formNavList: [
          {
            value: "0",
            label: '清洁员报表'
          },
          {
            value: "1",
            label: '财务报表'
          },

          {
            value: "2",
            label: '用户入住率'
          }
        ],
        //清洁员
        cleanerFromDate: '',
        cleanerToDate: '',
        hotelId: '',
        cleanerTime: '',
        cleanerTotal: 0,
        cleanerFormList: [],
        //财务报表
        financeTime: '',
        financeFromDate: '',
        financeToDate: '',
        financialFormList: [],

        //用户入住率
        userTime: '',
        guestFormObj: {},
        guestFromDate: '',
        guestToDate: '',
        gusetTime: '',
        num: 0,
        showTime: '',
      }
    },
    created() {
      var t = new Date();
      //清洁工
      this.cleanerFromDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 00:00:00";
      this.cleanerToDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 23:59:59";
      //财务
      this.financeFromDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 00:00:00";
      this.financeToDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 23:59:59";
      //用户
      this.guestFromDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 00:00:00";
      this.guestToDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 23:59:59";
      if (sessionStorage.getItem('hotelID')) {
        this.hotelId = JSON.parse(sessionStorage.getItem('hotelID'));
      } else {
        this.$router.push({name: 'Login'});
      }
      this.initCleanerForm();
    },
    methods: {
      //初始化财务报表
      initFinancialStatements() {
        this.isLoading = true;
        let option = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.hotelId,//酒店编码
          "fromDate": this.financeFromDate,
          "toDate": this.financeToDate
        };
        this.isLoading = true;
        this.$store.dispatch("initFinancialStatements", option)
          .then(data => {
            this.financialFormList = data.data;
//            this.$notify({
//              message: data.resultcontent,
//              type: 'success'
//            });
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
            this.isLoading = false;
          })
      },
      //补零
      addZero(val) {
        if (val < 10) {
          return "0" + val;
        } else {
          return val;
        }
      },
      //选择清洁工时间
      changeCleanerTime(val) {
        this.cleanerFromDate = val + " 00:00:00";
        this.cleanerToDate = val + " 23:59:59";
        if (!val) {
          let t = new Date();
          this.cleanerFromDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 00:00:00";
          this.cleanerToDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 23:59:59";
        }
      },
      //选择财务时间
      changeFinanceTime(val) {
        this.financeFromDate = val + " 00:00:00";
        this.financeToDate = val + " 23:59:59";
        if (!val) {
          let t = new Date();
          this.financeFromDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 00:00:00";
          this.financeToDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 23:59:59";
        }
      },
      //选择用户时间
      changeGuestTime(val) {
        this.guestFromDate = val + " 00:00:00";
        this.guestToDate = val + " 23:59:59";
        if (!val) {
          let t = new Date();
          this.guestFromDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 00:00:00";
          this.guestToDate = t.getFullYear() + "-" + this.addZero(t.getMonth() + 1) + "-" + this.addZero(t.getDate()) + " 23:59:59";
        }
      },
      //选择导航
      changeNav(val) {
        this.formNavIndex = val;
        switch (val) {
          case "0":
            this.initCleanerForm();
            break;
          case '1':
            this.initFinancialStatements();
            break;
          case '2':
            this.initGuestForm();
            break;
          default:
            this.$notify({
              message: '该功能暂未开放',
              type: 'error'
            })
        }
      },
      //初始化清洁员报表
      initCleanerForm() {
        this.isLoading = true;
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.hotelId,//酒店编码
          "fromDate": this.cleanerFromDate,//开始日期
          "toDate": this.cleanerToDate,//结束日期
        };
        this.$store.dispatch('initHotelCleanerForm', options)
          .then(data => {
            this.cleanerFormList = data.data;
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
            this.isLoading = false;
          })
      },
      //查询清洁员报表
      searchCleanerForm() {
        this.initCleanerForm();
      },
      //查询财务报表
      searchFinanceForm() {
        this.initFinancialStatements();
      },
      //查询用户入住率
      searchGuestForm() {
        this.initGuestForm();
      },
      //初始化用户入住率
      initGuestForm() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.hotelId,//酒店编码
          "fromDate": this.guestFromDate,
          "toDate": this.guestToDate
        };
        this.isLoading = true;
        this.$store.dispatch('initGuestForm', options)
          .then(data => {
            this.showTime = this.guestFromDate + ' ~ ' + this.guestToDate;
            this.guestFormObj = data.data[0];
            this.num = data.data.length ? Math.round(this.guestFormObj.inCount / this.guestFormObj.roomCount * 100) : 0;
            this.$nextTick(() => {
              this.initCanvas();
            })
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //入住路图表
      initCanvas() {
        let c = document.getElementById('canvas');
        let ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = 30;
        ctx.strokeStyle = "#ccc";
        ctx.arc(150, 150, 120, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 30;
        ctx.strokeStyle = "#f00";
        ctx.arc(150, 150, 120, 0, ((this.num / 50) * Math.PI));
        ctx.stroke();
      },
    },
  }
</script>
<style scoped>
  .cleanerForm {
    padding-top: 10px;
  }

  .financeForm {
    padding-top: 10px;
  }

  .cashierChart {
    float: left;
    width: 100%;
    position: relative;
  }

  .cashierChart canvas {
    display: block;
    margin: 0 auto;
    transform: rotateZ(-90deg);
  }

  .cashierChart > p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font: bold 20px/2 "微软雅黑";
    color: #f00;
  }

  .cashierChartStrong {
    font: 14px/2 "微软雅黑";
    display: block;
    text-align: center;
    color: #666;
  }
</style>
