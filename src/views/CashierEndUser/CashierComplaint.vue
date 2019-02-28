<template>
  <div>
    <h1 class="wrapTitle">投诉信息</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>投诉日期筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            size="small"
            v-model="dateVal"
            type="date"
            value-format="yyyy-MM-dd"
            end-placeholder
            :picker-options="pickerOptions"
            @change="changeTime"
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
      :data="complanitList"
      tooltip-effect="light"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="ht_hs_ID"
        align="center"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="ht_mi_Name"
        align="center"
        label="投诉姓名">
      </el-table-column>
      <el-table-column
        prop="ht_hs_Suggest"
        align="center"
        :show-overflow-tooltip="true"
        label="投诉内容">
      </el-table-column>
      <el-table-column
        align="center"
        width="330"
        label="图片">
        <template slot-scope="scope">
          <div v-show="scope.row.ht_hs_Image.length" class="imgStyle">
            <img v-for="item,index in scope.row.ht_hs_Image" v-lazy="item" alt="" :key="index">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="ht_hs_CreateTime"
        align="center"
        label="时间">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click.stop="replyMessage(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>
    </div>
    <!--回复-->
    <el-dialog
      title="回复投诉信息"
      :modal-append-to-body="false"
      :visible.sync="replyDialog"
      :close-on-click-modal="false"
      width="50%">
      <ul class="replyList">
        <li class="clearfix">
          <strong>{{replyObj.ht_mi_Name}}:</strong>
          <div>
            <span>{{replyObj.ht_hs_Suggest}}</span>
          </div>
        </li>
        <li class="clearfix" v-for="item,index in replyObj.responseList">
          <strong>回复内容:</strong>
          <div>
            <span>{{item.ht_ds_ResponseContent}}</span>
          </div>
        </li>
      </ul>
      <el-input v-model="replyOptions.responseContent" placeholder="输入回复内容" type="textarea"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="replyDialog = false">取 消</el-button>
        <el-button type="primary" @click="replySubmit">确认回复</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        hotelId: '',
        pageNum: 1,
        dateVal: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        fromDate: '',
        toDate: '',
        complanitList: [],
        total: 0,
        isLoading: false,
        replyContent: '',
        replyDialog: false,
        replyOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": "",//酒店编码
          "suggestID": "",//投诉编码
          "responseContent": "",
        },
        replyObj: {},
      }
    },
    created() {
      if (sessionStorage.getItem('hotelID')) {
        this.hotelId = sessionStorage.getItem('hotelID');
      } else {
        this.$router.push({name: 'Login'})
      }
      this.initData();
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.pageNum = num;
        this.initData();
      },
      //选择时间
      changeTime(val) {
        this.fromDate = val + ' 00:00:00';
        this.toDate = val + ' 23:59:59';
      },
      //初始化数据
      initData() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": this.pageNum,
          "rows": "5",
          //"ht_hs_ID": "1",//酒店投诉编码
          "ht_hs_HotelID": this.hotelId,//酒店编码
          //"ht_hs_UserCode": "1",//会用户编码
          "createTimeFrom": this.fromDate,
          "createTimeTo": this.toDate,//创建时间
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelComplaint', options)
          .then(data => {
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].ht_hs_Image) {
                data.data[i].ht_hs_Image = data.data[i].ht_hs_Image.split(',');
              }
            }
            this.total = Number(data.totalrows);
            this.complanitList = data.data;
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.isLoading = false;
          })
      },
      search() {
        this.initData()
      },
      //回复
      replyMessage(obj) {
        this.replyOptions.responseContent = "";
        this.replyObj = obj;
        this.replyOptions.suggestID = obj.ht_hs_ID;
        this.replyOptions.hotelID = this.hotelId;
        this.replyDialog = true;
      },
      replySubmit() {
        if (!this.replyOptions.responseContent.trim()) {
          this.$notify({
            message: "请输入回复内容",
            type: 'error'
          })
          return
        }
        this.isLoading = true;
        this.$store.dispatch('replyComplaint', this.replyOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.replyDialog = false;
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.isLoading = false;
          })
      }
    },
  }
</script>
<style scoped>
  .imgStyle > img {
    height: 100px;
    margin-right: 10px;
  }

  .replyStyle {
    text-align: left;
  }

  .replyList {
    overflow: auto;
    max-height: 500px;
    margin-bottom: 20px;
    font: 14px/20px "微软雅黑";
  }

  .replyList > li {
    padding: 5px 0;
  }

  .replyList strong {
    float: left;
    margin-right: 20px;
  }

  .replyList div {
    overflow: hidden;
  }

  .replyList span {
    float: left;
    width: 100%;
  }
</style>
