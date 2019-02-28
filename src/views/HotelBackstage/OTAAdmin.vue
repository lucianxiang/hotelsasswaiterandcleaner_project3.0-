<template>
  <div>
    <h1 class="wrapTitle">OTA管理</h1>

    <el-col :span="24" class="formSearch clearfix">
      <el-form :inline="true">
        <!--<el-form-item>-->
        <!--<span>筛选:</span>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-input type="text" v-model="options.ht_ui_Name" auto-complete="off" placeholder="名称"-->
        <!--size="small"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item style="float: right;">
          <!--<el-button type="primary" @click="search" size="small">查询</el-button>-->
          <el-button type="primary" @click="Add" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--数据展示-->
    <el-table
            v-loading="isLoading"
            :data="HotelOTAList"
            border
            style="width: 100%">
      <!--<el-table-column-->
              <!--width="100"-->
              <!--label="ID"-->
              <!--prop="ht_oe_ID">-->
      <!--</el-table-column>-->
      <el-table-column
              label="OTA名称"
              width="200"
              prop="ht_oe_otaName">
      </el-table-column>
      <el-table-column
              label="是否启用"
              width="100"
      >
        <template slot-scope="scope">
          <el-switch
                  v-model="scope.row.ht_oe_isOpen"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeIsOpen(scope.row)"
          >
          </el-switch>
          <!--<span>{{scope.row.ht_oe_isOpen | getIsOpen}}</span>-->
        </template>
      </el-table-column>
      <el-table-column
              width="140"
              label="是否自动确认订单">
        <template slot-scope="scope">
          <el-switch
                  v-model="scope.row.ht_oe_autoCommand"
                  @change="changeAutoCommand(scope.row)"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
          </el-switch>
          <!--<span>{{scope.row.ht_oe_autoCommand | getAutoCommand}}</span>-->
        </template>
      </el-table-column>
      <el-table-column
              label="每日可订房次数">
        <template slot-scope="scope">
          <template v-if="scope.row.isUpdate">
            <el-input v-model="scope.row.ht_oe_daySell" :placeholder="scope.row.ht_oe_daySell" size="small" style="width:220px"></el-input>
            <el-button type="warning" size="small" style="margin-left: 20px" @click="cancel(scope.row)">取消</el-button>
          </template>
          <span v-else>{{scope.row.ht_oe_daySell}}</span>
        </template>
      </el-table-column>
      <el-table-column
              align="center"
              width="200"
              label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click.stop="Update(scope.row)" v-if="!scope.row.isUpdate">修改</el-button>
          <el-button type="success" icon="el-icon-check" size="small" v-else @click="UpdateOK(scope.row)">OK</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加-->

    <el-dialog
            title="新增OTA"
            :modal-append-to-body="false"
            :visible.sync="addDialog"
            :close-on-click-modal="false"
            width="50%"
    >
      <el-form :model="addOptions" label-width="120px">
        <el-form-item label="OTA类型:">
          <el-select v-model="addOptions.data.ht_oe_otaType" placeholder="请选择" size="small">
            <el-option
                    v-for="item in SysEnumOTAList"
                    :key="item.otaID"
                    :label="item.otaName"
                    :value="item.otaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="直连房间数:">
          <el-input v-model="addOptions.data.ht_oe_daySell" placeholder="请输入" style="width: 500px;"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {deepClone} from '@/assets/js/public'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        addDialog:false,
        SysEnumOTAList: [],//系统OTA
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ht_oe_hotelID": '',//酒店编码
            "ht_oe_daySell": '',//OTA每日可直连房间数
            "ht_oe_autoCommand": '',//是否自动确认订单(0否 1是)
            "ht_oe_otaType": ''//OTA枚举
          }
        },
        isLoading: false,
        options: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": "1",
          "rows": "20",
          "ht_oe_ID": '',//OTA标识
          "ht_oe_hotelID": '',//酒店编码
          "ht_oe_isOpen": '',//是否启用(0禁用 1启用)
          "ht_oe_autoCommand": ''//是否自动确认订单(0否 1是)
        },
        HotelOTAList: [],//酒店HotelOTA
        hotelID: '',
        page:1,
        oneObj:{}
      }
    },
    created(){
      let hotelID = sessionStorage.getItem('hotelID')
      if (hotelID) {
        this.hotelID = hotelID
        this.options.ht_oe_hotelID = hotelID
        this.addOptions.ht_oe_hotelID = hotelID
      }
      //初始化系统OTA
      this.initSysEnumOTA()
      .then(data => {
        this.SysEnumOTAList = data;
        this.initData()
      }, err => {
        this.$notify({
          type: 'error',
          message: err,
        });
      })
    },
    methods: {
      //添加提交
      addSubmit(){
        if(!this.addOptions.data.ht_oe_otaType){
          this.$notify({
            type: 'error',
            message: '请选择OTA类型',
          });
          return
        }
        if(isNaN(this.addOptions.data.ht_oe_daySell)){
          this.$notify({
            type: 'error',
            message: '请选择输入数字',
          });
          return
        }
        this.$store.dispatch('AddOTAAdmin',this.addOptions)
        .then(v=>{
          this.$notify({
            type: 'success',
            message: v,
          });
          this.addDialog = false
          this.initData(this.page)
        },err=>{
          this.addDialog = false
          this.$notify({
            type: 'error',
            message: err,
          });
        })
      },
      //修改OK
      UpdateOK(obj){
        let ht_oe_isOpen = Number(obj.ht_oe_isOpen)
        let ht_oe_autoCommand = Number(obj.ht_oe_autoCommand)
        let newObj = deepClone(obj)
        newObj.ht_oe_isOpen = ht_oe_isOpen
        newObj.ht_oe_autoCommand = ht_oe_autoCommand
        this.UpdateSubmit(newObj)
      },
      //取消
      cancel(obj){
        obj.ht_oe_daySell = this.oneObj.ht_oe_daySell
        obj.isUpdate = false
      },
      //修改
      Update(obj){
        this.oneObj = deepClone(obj)
        obj.isUpdate = true
      },
      changeAutoCommand(obj){
        let ht_oe_isOpen = Number(obj.ht_oe_isOpen)
        let ht_oe_autoCommand = Number(obj.ht_oe_autoCommand)
        let newObj = deepClone(obj)
        newObj.ht_oe_isOpen = ht_oe_isOpen
        newObj.ht_oe_autoCommand = ht_oe_autoCommand
        this.UpdateSubmit(newObj)
      },
      //是否启用
      changeIsOpen(obj){
        let ht_oe_isOpen = Number(obj.ht_oe_isOpen)
        let ht_oe_autoCommand = Number(obj.ht_oe_autoCommand)
        let newObj = deepClone(obj)
        newObj.ht_oe_isOpen = ht_oe_isOpen
        newObj.ht_oe_autoCommand = ht_oe_autoCommand
        this.UpdateSubmit(newObj)
      },
      UpdateSubmit(obj){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ht_oe_ID": obj.ht_oe_ID,//OTA标识
            "ht_oe_otaName": obj.ht_oe_otaName,//OTA名称
            "ht_oe_daySell": obj.ht_oe_daySell,//每日可直连房间数
            "ht_oe_isOpen": obj.ht_oe_isOpen,//是否启用(0禁用 1启用)
            "ht_oe_autoCommand": obj.ht_oe_autoCommand,//是否自动确认订单(0否 1是)
            "ht_oe_otaType": obj.ht_oe_otaType//OTA枚举
          }
        }
        this.$store.dispatch('UpdateOTAAdmin',options)
        .then(v=>{
          this.$notify({
            type: 'success',
            message: v,
          });
          this.initData(this.page)
        },err=>{
          this.$notify({
            type: 'error',
            message: err,
          });
        })
      },
      //初始化酒店OTA
      initData(page){
        if (page) {
          this.options.page = page
        }
        this.isLoading = true;
        this.$store.dispatch('initHotelOTA', this.options)
        .then(data => {
          data = data.map(item=>{
            if(item.ht_oe_isOpen){
              item.ht_oe_isOpen = true
            }else{
              item.ht_oe_isOpen = false
            }
            if(item.ht_oe_autoCommand){
              item.ht_oe_autoCommand = true
            }else{
              item.ht_oe_autoCommand = false
            }
            item.isUpdate = false
            return item
          })
          this.isLoading = false;
          this.HotelOTAList = data;
        }, err => {
          this.isLoading = false;
          this.$notify({
            type: 'error',
            message: err,
          });
        })
      },
      //添加
      Add(){
        this.addOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ht_oe_hotelID": this.hotelID,//酒店编码
            "ht_oe_daySell": '',//OTA每日可直连房间数
            "ht_oe_autoCommand": 0,//是否自动确认订单(0否 1是)
            "ht_oe_otaType": ''//OTA枚举
          }
        }
        this.addDialog = true
      },
      //初始化系统OTA
      initSysEnumOTA(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "type": 0,//(0查所有 1查所有加本地)
        }
        return this.$store.dispatch('initSysEnumOTA', options)
      },
      //查询
      search(){

      }
    },
  }
</script>
<style scoped>


</style>