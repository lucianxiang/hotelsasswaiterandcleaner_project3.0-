<template>
  <div class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px 0px 0px 20px">
      <el-breadcrumb-item :to="{ path:'/hotelBackstageHome/hotelRoomAdmin'}">房间</el-breadcrumb-item>
      <el-breadcrumb-item>酒店房间设施</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="wrapTitle">酒店房间设施管理</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <!--<span>房间产品名称筛选:</span>-->
        </el-form-item>
        <el-form-item>
          <!--<el-input type="text" v-model="roomName" auto-complete="off" placeholder="房间产品名称" size="small"></el-input>-->
        </el-form-item>
        <el-form-item>
          <!--<el-button type="primary" @click="search" size="small">查询</el-button>-->
          <el-button type="primary" @click="Add" size="small">新增</el-button>
          <el-button type="danger" size="mini" style="margin-left: 5px" @click="FaciltiesArrDelete">批量删除</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="hotelRoomRoomFacilitiesList"
      v-loading="isLoading"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="ht_rth_ID"
        label="房间房间设施ID"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_rth_RoomHardName"
        label="房间设施名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_rth_RoomHardTypeName"
        label="房间设施类型名称"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Update(scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.ht_rth_ID)">删除
          </el-button>
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

    <!--添加房间房间设施-->
    <el-dialog title="添加房间设施" :modal-append-to-body="false" :visible.sync="addDialog" :close-on-click-modal="false">
      <el-form :model="addOptions">

        <el-form-item label="房间设施类型:" :label-width="formLabelWidth">
          <el-select v-model="RoomFacilitiesTypeID" placeholder="请选择类型" @change="changeRoomFacilities">
            <el-option
              v-for="item in hotelRoomFacilitiesTypeList"
              :key="item.ht_rht_ID"
              :label="item.ht_rht_Name"
              :value="item.ht_rht_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间设施:" :label-width="formLabelWidth">
          <el-select v-model="ht_rth_RoomHardIDList" multiple placeholder="请选择">
            <el-option
              v-for="item in roomFacilitiesList"
              :key="item.ht_rh_ID"
              :label="item.ht_rh_Name"
              :value="item.ht_rh_ID">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改房间房间设施-->
    <el-dialog title="修改房间设施" :modal-append-to-body="false" :visible.sync="updateDialog" :close-on-click-modal="false">
      <el-form :model="updateHotelRoomRoomFacilitiesObj">

        <el-form-item label="房间设施类型:" :label-width="formLabelWidth">
          <el-select v-model="updateHotelRoomRoomFacilitiesObj.ht_rth_RoomHardTypeId" placeholder="请选择类型"
                     @change="changeRoomFacilities">
            <el-option
              v-for="item in hotelRoomFacilitiesTypeList"
              :key="item.ht_rht_ID"
              :label="item.ht_rht_Name"
              :value="item.ht_rht_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间设施:" :label-width="formLabelWidth">
          <el-select v-model="updateHotelRoomRoomFacilitiesObj.ht_rth_RoomHardID" placeholder="请选择">
            <el-option
              v-for="item in roomFacilitiesList"
              :key="item.ht_rh_ID"
              :label="item.ht_rh_Name"
              :value="item.ht_rh_ID">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        roomID: '',
        total: 0,
        isLoading: false,
        selectList: [],//全选选中值
        addDialog: false,
        updateDialog: false,
        formLabelWidth: '120px',
        RoomFacilitiesTypeID: '',
        ht_rth_RoomHardIDList: [],
        Updateht_rth_RoomHardIDList: [],
        updateHotelRoomRoomFacilitiesObj: {},
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_rth_RoomHardID": "",//房间设施
            "ht_rth_RoomID": "",//房间ID
            "ht_ht_hotelID": "",//酒店ID
          }
        }
      }
    },
    computed: mapGetters([
      'hotelRoomRoomFacilitiesList',
      'hotelRoomFacilitiesTypeList',
      'roomFacilitiesList',
    ]),
    created() {
      let id = this.$route.params.id;
      if (!id) {
        this.$notify({
          message: '请先选择房间!',
          position: 'top-left',
          type: 'error'
        });
        this.$router.push({name: 'HotelRoom'});
        return
      }
      this.hotelID = sessionStorage.getItem('hotelID');
      this.roomID = id;
      this.initData(1);
      this.initFacilitiesType();
    },
    methods: {
      //批量删除
      FaciltiesArrDelete() {
        if (!this.selectList.length) {
          this.$notify({
            message: '请选择需要删除的房间设施!',
            type: 'error'
          });
          return
        }
        let arr = []
        for (var i = 0; i < this.selectList.length; i++) {
          arr[i] = this.selectList[i].ht_rth_ID
        }
        this.getValue(arr)
          .then(suc => {
            this.$notify({
              message: '删除成功',
              type: 'success'
            });
            this.initData(1)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      async getValue(arr) {
        for (var i = 0; i < arr.length; i++) {
          await this.ArrDelete(arr[i])
        }
      },
      //批量删除
      ArrDelete(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "data": {
            "ht_rth_ID": id//房间房间设施ID
          }
        };
        return this.$store.dispatch('DeleteHotelRoomRoomFacilities', deleteOptions)
      },
      //全选
      handleSelectionChange(arr) {
        this.selectList = arr;
      },
      //惠乐游房间设施类型
      initFacilitiesType() {
        let roomTypeOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_rht_ID": "",//房间设施类型ID
          "ht_rht_Name": "",//类型名称
        }
        this.$store.dispatch('initHotelRoomFacilitiesType', roomTypeOptions)
      },
      //选中房间设施类型
      changeRoomFacilities() {
        //获取对应设施
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "ht_rh_ID": "",//房型设施
          "ht_rh_Name": "",//设施名称
          "ht_rh_RoomHardTypeID": this.RoomFacilitiesTypeID,//房间设施类型ID
          "ht_rh_IsHot": "",//是否热门
        }
        this.$store.dispatch('initRoomFacilities', options)
      },
      //选中房间设施类型
      changeRoomFacilitiesID(id) {
        //获取对应设施
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "ht_rh_ID": "",//房型设施
          "ht_rh_Name": "",//设施名称
          "ht_rh_RoomHardTypeID": id,//房间设施类型ID
          "ht_rh_IsHot": "",//是否热门
        }
        return this.$store.dispatch('initRoomFacilities', options)
      },
      //分页
      handleCurrentChange(num) {
        this.initData(num);
      },
      initData(page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_rth_ID": "",//房间房间设施ID
          "ht_rth_RoomHardID": "",//房间设施
          "ht_rth_RoomID": this.roomID,//房间ID
          "ht_ht_hotelID": this.hotelID,//酒店ID
          "page": page ? page : 1,//页码编号
          "rows": "5",//单页显示数量
        };
        console.log(options)
        this.isLoading = true;
        this.$store.dispatch('initHotelRoomRoomFacilities', options)
          .then((total) => {
            this.total = total;
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search() {

      },
      Add() {
        for (let attr in this.addOptions.data) {
          if (typeof this.addOptions.data[attr] == 'object') {
            for (let attr1 in this.addOptions.data[attr]) {
              this.addOptions.data[attr][attr1] = ''
            }
          } else {
            this.addOptions.data[attr] = ''
          }
        }
        this.ht_rth_RoomHardIDList = [];
        this.RoomFacilitiesTypeID = ''
        ;
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        this.addOptions.data.ht_ht_hotelID = this.hotelID;
        this.addOptions.data.ht_rth_RoomID = this.roomID;
        this.addOptions.data.ht_rth_RoomHardID = this.ht_rth_RoomHardIDList.join(',')
        this.$store.dispatch('AddHotelRoomRoomFacilities', this.addOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(1)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      Update(obj) {
//        this.Updateht_rth_RoomHardIDList = [];
        this.changeRoomFacilitiesID(obj.ht_rth_RoomHardTypeId)
          .then(() => {
            console.log(obj)
//          this.Updateht_rth_RoomHardIDList.push(obj.ht_rth_RoomHardID)
            this.updateHotelRoomRoomFacilitiesObj = obj;
            this.updateDialog = true;
          })
      },
      //修改提交
      updateSubmit() {
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelRoomRoomFacilitiesObj
        };
//        updateOptions.data.ht_rth_RoomHardID = this.Updateht_rth_RoomHardIDList.join(',')
        this.$store.dispatch('UpdateHotelRoomRoomFacilities', updateOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(1)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false;
      },
      //删除
      Delete(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "data": {
            "ht_rth_ID": id//房间房间设施ID
          }
        };
        this.$store.dispatch('DeleteHotelRoomRoomFacilities', deleteOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(1)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
    },
  }
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-form-item .el-form-item {
    margin-bottom: 20px !important;
  }
</style>
