<template>
  <div class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px 0px 0px 20px">
      <el-breadcrumb-item :to="{ path:'/hotelBackstageHome/hotelRoomAdmin'}">房间</el-breadcrumb-item>
      <el-breadcrumb-item>酒店房间产品</el-breadcrumb-item>
      <!--<el-breadcrumb-item>酒店房间实体</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>前往生成房间数</el-breadcrumb-item>-->
    </el-breadcrumb>

    <h1 class="wrapTitle">酒店房间产品管理</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>房间产品名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="roomName" auto-complete="off" placeholder="房间产品名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="Add" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="hotelRoomProductList"
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="床型:">
              <span>{{ props.row.ht_rpp_BedType | getBedType}}</span>
            </el-form-item>
            <el-form-item label="早餐:">
              <span>{{ props.row.ht_rpp_BreakfastType | getBreakfastType}}</span>
            </el-form-item>
            <el-form-item label="WIFI:">
              <span>{{ props.row.ht_rpp_WafiType | getWafiType}}</span>
            </el-form-item>
            <el-form-item label="取消类型:">
              <span>{{ props.row.ht_rpp_CancelType | getCancelType}}</span>
            </el-form-item>
            <!--<el-form-item label="房间数量:">-->
            <!--<span>{{ props.row.ht_rpp_RoomNumber }}间</span>-->
            <!--</el-form-item>-->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        prop="ht_rpp_ID"
        align="center"
        label="房间产品ID"
      >
      </el-table-column>
      <el-table-column
        width="300"
        prop="ht_rpp_Name"
        align="center"
        label="房间产品名称"
      >
      </el-table-column>
      <el-table-column
        width="140"
        prop="ht_rpp_ProductPrice"
        align="center"
        label="产品价格(元)"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Update(scope.row.ht_rpp_ID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.ht_rpp_ID)">删除
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="toRoomEntity(scope.row)">设置房间门牌号
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
    <!--添加酒店房间产品-->
    <el-dialog title="添加酒店房间产品" :modal-append-to-body="false" :visible.sync="addDialog" :close-on-click-modal="false">
      <el-form :model="addOptions">
        <el-form-item label="房间产品名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ht_rpp_Name"></el-input>
        </el-form-item>
        <el-form-item label="床型:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ht_rpp_BedType" placeholder="请选择">
            <el-option
              v-for="item in BedTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="早餐类型:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ht_rpp_BreakfastType" placeholder="请选择">
            <el-option
              v-for="item in BreakfastTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="WIFI:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ht_rpp_WafiType" placeholder="请选择">
            <el-option
              v-for="item in WAFIList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="取消类型:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.ht_rpp_CancelType" placeholder="请选择">
            <el-option
              v-for="item in CancelTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间产品价格:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ht_rpp_ProductPrice"></el-input>
        </el-form-item>
        <!--<el-form-item label="房间数量:" :label-width="formLabelWidth">-->
        <!--<el-input v-model="addOptions.data.ht_rpp_RoomNumber"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改酒店房间产品-->
    <el-dialog title="修改酒店房间产品" :modal-append-to-body="false" :visible.sync="updateDialog"
               :close-on-click-modal="false">
      <el-form :model="updateHotelRoomProductObj">
        <el-form-item label="房间产品名称:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomProductObj.ht_rpp_Name"></el-input>
        </el-form-item>
        <el-form-item label="床型:" :label-width="formLabelWidth">
          <el-select v-model="updateHotelRoomProductObj.ht_rpp_BedType" placeholder="请选择">
            <el-option
              v-for="item in BedTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="早餐类型:" :label-width="formLabelWidth">
          <el-select v-model="updateHotelRoomProductObj.ht_rpp_BreakfastType" placeholder="请选择">
            <el-option
              v-for="item in BreakfastTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="WIFI:" :label-width="formLabelWidth">
          <el-select v-model="updateHotelRoomProductObj.ht_rpp_WafiType" placeholder="请选择">
            <el-option
              v-for="item in WAFIList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="取消类型:" :label-width="formLabelWidth">
          <el-select v-model="updateHotelRoomProductObj.ht_rpp_CancelType" placeholder="请选择">
            <el-option
              v-for="item in CancelTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间产品价格:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomProductObj.ht_rpp_ProductPrice"></el-input>
        </el-form-item>
        <!--<el-form-item label="房间数量:" :label-width="formLabelWidth">-->
        <!--<el-input v-model="updateHotelRoomProductObj.ht_rpp_RoomNumber"></el-input>-->
        <!--</el-form-item>-->
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
        roomName: '',
        total: 0,
        roomID: '',
        isLoading: false,
        addDialog: false,
        updateDialog: false,
        formLabelWidth: '120px',
        //床型
        BedTypeList: [
          {
            name: '单床',
            value: 1
          },
          {
            name: '双床',
            value: 2
          },
          {
            name: '三床',
            value: 3
          },
          {
            name: '多床',
            value: 4
          },
        ],
        //早餐类型
        BreakfastTypeList: [
          {
            name: '无早',
            value: 0
          },
          {
            name: '单早',
            value: 1
          },
          {
            name: '双早',
            value: 2
          },
          {
            name: '三早',
            value: 3
          },
          {
            name: '四早',
            value: 4
          },
          {
            name: '多早',
            value: 5
          },
        ],
        //WAFI
        WAFIList: [
          {
            name: '无',
            value: 7
          },
          {
            name: '收费无线宽带',
            value: 8
          },
          {
            name: '免费WIFI',
            value: 0
          },
          {
            name: '免费有线宽带',
            value: 1
          },
          {
            name: '收费有线宽带',
            value: 2
          },
          {
            name: '收费有线宽带和免费无线宽带',
            value: 3
          },
          {
            name: '免费有线宽带和免费无线宽带',
            value: 4
          },
          {
            name: '免费有线宽带和收费无线宽带',
            value: 5
          },
          {
            name: '收费有线宽带和收费无线宽带',
            value: 6
          },
        ],
        //取消类型
        CancelTypeList: [
          {
            name: '可取消',
            value: 0
          },
          {
            name: '不可取消',
            value: 1
          },
          {
            name: '限时取消',
            value: 2
          }
        ],
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "data": {
            "ht_rpp_RoomID": "",//房间编码
            "ht_rpp_Name": "",//房间产品名称
            "ht_rpp_BedType": "",//床型 1单床 2双床 3三床
            "ht_rpp_BreakfastType": "",//0无早  1 单早 2 双早 3 三早 4 四早
            "ht_rpp_WafiType": "",//0免费WAFI  1免费有线 2收费有线
            "ht_rpp_CancelType": "",//取消类型
            "ht_rpp_ProductPrice": "",//产品价格
            "ht_rpp_RoomNumber": ""//房间数量
          }
        }
      }
    },
    computed: mapGetters([
      'hotelRoomProductList',
      'updateHotelRoomProductObj'
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
      this.roomID = id;
      this.initData('', 1)
    },
    methods: {
      //  前往房间实体
      toRoomEntity(item) {
        sessionStorage.setItem('roomProductID', item.ht_rpp_ID)
        this.$router.push({name: 'HotelRoomEntity', params: {id: item.ht_rpp_ID}})
      },
      toLotRoomNumber(id) {
        this.$router.push({name: 'HotelLotRoomNumber', params: {id: id}})
      },
      //前往生成房间数
      toRoomNumber(RoomProductID) {
        this.$router.push({name: 'HotelRoomNumber', params: {id: RoomProductID}})
      },
      //分页
      handleCurrentChange(num) {
        this.initData(this.roomName, num);
      },
      //初始化
      initData(name, page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_rpp_ID": "",//房间产品ID
          "ht_rpp_RoomID": this.roomID,//房间编码
          "ht_rpp_Name": name ? name : '',//房间产品名称
          "ht_rpp_BedType": "",//床型 1单床 2双床 3三床
          "ht_rpp_BreakfastType": "",//0无早  1 单早 2 双早 3 三早 4 四早
          "ht_rpp_WafiType": "",//0免费WAFI  1免费有线 2收费有线
          "ht_rpp_CancelType": "",//取消类型
          "ht_rpp_ProductPrice": "",//产品价格
          "page": page ? page : 1,//页码编号
          "rows": "5",//单页显示数量
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelRoomProduct', options)
          .then((total) => {
            this.total = total
            this.isLoading = false
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search() {
        this.initData(this.roomName, 1)
      },
      //添加
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
        ;
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        this.addOptions.data.ht_rpp_RoomID = this.roomID;
        this.$store.dispatch('AddHotelRoomProduct', this.addOptions)
          .then(data => {
            this.$notify({
              message: data.resultcontent,
              type: 'success'
            });
            this.initData(this.roomName, 1)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      Update(id) {
        ;
        this.updateDialog = true;
        this.$store.commit('UpdateHotelRoomProduct', id)
      },
      //修改提交
      updateSubmit() {
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelRoomProductObj
        }
        this.$store.dispatch('UpdateHotelRoomProduct', updateOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.roomName, 1)
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
            "ht_rpp_ID": id//房间产品ID
          }
        };
        this.$store.dispatch('DeleteHotelRoomProduct', deleteOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.roomName, 1)
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
