<template>
  <div>
    <h1 class="wrapTitle">酒店会员报表</h1>
    <!--报表导航-->
    <el-menu :default-active="vipNavIndex" class="el-menu-demo" mode="horizontal" @select="changeNav">
      <el-menu-item :index="item.value" v-for="item,index in vipNavigation" :key="index">{{item.label}}</el-menu-item>
    </el-menu>

    <!--消费报表-->

    <div class="consumptionForm" v-show="vipNavIndex == 0">

      <!--查询-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="cardNum" placeholder="输入卡号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="conDate"
              size="small"
              @change="changeConDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->

      <el-table
        :data="consumptionList"
        border
        :summary-method="getAllMoney"
        show-summary
        style="width: 100%">
        <el-table-column
          width="150"
          align="center"
          prop="ht_mi_Name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="ht_mi_CardNo"
          align="center"
          label="会员卡号">
        </el-table-column>
        <el-table-column
          prop="UserName"
          align="center"
          label="操作员账号">
        </el-table-column>
        <el-table-column
          prop="ht_cd_CostFee"
          align="center"
          label="消费金额(￥)">
        </el-table-column>
        <el-table-column
          prop="ht_cd_RoomID"
          align="center"
          label="房间编号">
        </el-table-column>
      </el-table>

      <!--分页-->

      <div class="block" style="text-taign: right;">
        <el-pagination
          :page-size="10"
          layout="total, prev, pager, next"
          @current-change="changePage"
          v-show="conTotal"
          :total="conTotal">
        </el-pagination>
      </div>

    </div>

    <!--入住率-->

    <div class="consumptionForm" v-show="vipNavIndex == 1">

      <!--查询-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="vipType" placeholder="请选择" size="small">
              <el-option
                v-for="item in cardTypeList"
                :key="item.ht_ct_ID"
                :label="item.ht_ct_TypeName"
                :value="item.ht_ct_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="inFeeDate"
              size="small"
              @change="changeInFeeDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchInFee" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->

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
  import {mapGetters} from 'vuex';
  import {isPhoneNum, isCardNo} from '@/assets/js/public'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        vipNavigation: [
          {
            value: '0',
            label: '消费报表'
          },
          {
            value: '1',
            label: '会员入住率'
          }
        ],
        vipNavIndex: '0',
        userInfo: {},
        //消费记录
        consumptionFormDate: '',
        consumptionToDate: '',
        vipType: '',
        consumptionList: [],
        conTotal: 0,
        cardTypeList: [],
        cardNum: '',
        conDate: '',
        //会员入住率
        num: 0,
        showTime: '',
        rateFromDate: '',
        rateToDate: '',
        vipType: '',
        inFeeDate: '',
      }
    },
    created() {
      if (sessionStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      } else {
        this.$router.push({name: 'Login'});
      }
      this.initConsumptionForm();
    },
    methods: {

      //切换导航

      changeNav(val) {
        this.vipNavIndex = val;
        if (val == 1) {
          this.initVipCardType();
          this.initVipRate();
        }
        if (val == 0) {
          this.initConsumptionForm();
        }
      },

      //-------------消费报表-------------------

      //会员卡类型

      initVipCardType(num) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_ct_ID": "",
          "ht_ct_HotelID": this.userInfo.CompanyID,//酒店编码
          "ht_ct_TypeName": "",//类型名称
          "ht_ct_State": 0,//卡状态(0正常 1作废)
          "page": num ? num : 1,
          "rows": 10
        };
        this.$store.dispatch('searchVipCardTypeAction', options)
          .then(data => {
            this.cardTypeList = data.data;
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

      //选择日期

      changeConDate(val) {
        if (val) {
          this.consumptionFormDate = val + ' 00:00:00';
          this.consumptionToDate = val + ' 23:59:59';
        } else {
          this.consumptionFormDate = '';
          this.consumptionToDate = '';
        }
      },

      //消费报表

      initConsumptionForm(num) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "dateFrom": this.consumptionFormDate,//开始时间
          "dateTo": this.consumptionToDate,//结束时间
          "memberID": "",//会员编码
          "memberCard": this.cardNum,//会员卡号
          "hotelID": this.userInfo.CompanyID,//酒店编码
          "page": num ? num : 1,//
          "rows": 10//
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('initConsumptionForm', options)
          .then(data => {
            this.conTotal = Number(data.totalRows);
            this.consumptionList = data.data;
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


      //分页

      changePage(num) {
        this.initConsumptionForm(num);
      },

      //查询

      search() {
        this.initConsumptionForm();
      },

      //获取总价

      getAllMoney(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总额';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (index === 3) {
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' 元';
            }
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
      },

      //-----------------会员入住率--------------------

      initVipRate() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.userInfo.CompanyID,//酒店编码
          "dateFrom": this.rateFromDate,//开始时间
          "dateTo": this.rateToDate,//结束时间
          "memberType": this.vipType //会员类型
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('initVipRate', options)
          .then(data => {
            this.num = Math.floor(((data.memberCount / data.totalCount) ? (data.memberCount / data.totalCount) : 0) * 100);
            this.showTime = this.rateFromDate ? (this.rateFromDate + ' ~ ' + this.rateToDate) : '所有时间';
            this.initCanvas();
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

      //选择查询日期

      changeInFeeDate(val) {
        if (val) {
          this.rateFromDate = val + ' 00:0:00';
          this.rateToDate = val + ' 23:59:59';
        } else {
          this.rateFromDate = "";
          this.rateToDate = "";
        }
      },

      //查询

      searchInFee() {
        this.initVipRate();
      },


    },
    mounted() {
    },
  }
</script>
<style scoped>

  .consumptionForm {
    padding-top: 20px;
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
