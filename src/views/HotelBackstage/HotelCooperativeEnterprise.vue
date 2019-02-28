<template>
  <div>
    <h1 class="wrapTitle">合作企业</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="options.ht_ui_Name" auto-complete="off" placeholder="名称"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="options.ht_ui_ConnectName" auto-complete="off" placeholder="联系人"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input @blur="blurPhone" type="text" v-model="options.ht_ui_Tel" auto-complete="off" placeholder="手机号"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="options.ht_ui_UserState" placeholder="客户状态" size="small" style="width: 100px;">
            <el-option
              v-for="item in useState"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="options.ht_ui_PassState" placeholder="是否房价保密" size="small" style="width: 150px;">
            <el-option
              v-for="item in passwordState"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="options.ht_ui_State" placeholder="审核状态" size="small" style="width: 100px;">
            <el-option
              v-for="item in examineState"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="Add" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--数据展示-->
    <el-table
      v-loading="isLoading"
      :data="enterpriseList"
      row-key="id"
      :expand-row-keys="expands"
      @row-click="rowClick"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="电话号码:">
              <span>{{ props.row.ht_ui_Phone }}</span>
            </el-form-item>
            <el-form-item label="手机号:">
              <span>{{ props.row.ht_ui_Tel }}</span>
            </el-form-item>
            <el-form-item label="地址:">
              <span>{{ props.row.ht_ui_Address }}</span>
            </el-form-item>
            <el-form-item label="销售员编码:">
              <span>{{ props.row.ht_ui_UserCode }}</span>
            </el-form-item>
            <el-form-item label="客户状态:">
              <span>{{ props.row.ht_ui_UserState | getCustomerState }}</span>
            </el-form-item>
            <el-form-item label="合同生效期:">
              <span>{{ props.row.ht_ui_BeginDate }}</span>
            </el-form-item>
            <el-form-item label="是否房价保密:">
              <span>{{ props.row.ht_ui_PassState | getPassState }}</span>
            </el-form-item>
            <el-form-item label="审核状态:">
              <span>{{ props.row.ht_ui_State | getIsPass }}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{ props.row.ht_ui_Remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        label="编号"
        prop="ht_ui_ID">
      </el-table-column>
      <el-table-column
        label="企业名称"
        prop="ht_ui_Name">
      </el-table-column>
      <el-table-column
        label="联系人"
        prop="ht_ui_ConnectName">
      </el-table-column>
      <el-table-column
        label="挂账额度(RMB)"
        prop="ht_ui_Credit">
      </el-table-column>
      <el-table-column
        label="客户等级"
        prop="ht_ui_Level">
      </el-table-column>
      <el-table-column
        label="合同号"
        prop="ht_ui_AgreeMent">
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click.stop="Update(scope.row)">修改</el-button>
          <el-button type="primary" size="small" @click.stop="updateRoomMoney(scope.row)">修改房间价格</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->

    <div class="block" style="margin-top: 10px; text-align: right">
      <el-pagination
        layout="total, prev, pager, next"
        @current-change="changePage"
        v-show="total"
        :total="total">
      </el-pagination>
    </div>

    <!--添加-->

    <el-dialog
      title="添加合作企业"
      :modal-append-to-body="false"
      :visible.sync="addDialog"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form :model="addOptions" label-width="120px">
        <el-form-item label="企业名称:">
          <el-input v-model="addOptions.ht_ui_Name" placeholder="请输入" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="联系人:">
          <el-input v-model="addOptions.ht_ui_ConnectName" placeholder="请输入" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="addOptions.ht_ui_Phone" placeholder="请输入企业电话号码" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input @blur="blurPhone" v-model="addOptions.ht_ui_Tel" placeholder="请输入联系人手机号"
                    style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="挂账额度:">
          <el-input v-model="addOptions.ht_ui_Credit" placeholder="请输入" style="width: 200px;"></el-input>
          元
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="addOptions.ht_ui_Address" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="客户等级:">
          <el-input v-model="addOptions.ht_ui_Level" placeholder="请输入" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="合同号:">
          <el-input v-model="addOptions.ht_ui_AgreeMent" placeholder="请输入" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="合同生效期:">
          <el-date-picker
            v-model="addOptions.ht_ui_BeginDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="addOptions.ht_ui_Remark" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="是否房价保密:">
          <el-select v-model="addOptions.ht_ui_PassState" placeholder="请选择" size="small">
            <el-option
              v-for="item in passwordState"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改-->

    <el-dialog
      title="修改合作企业"
      :modal-append-to-body="false"
      :visible.sync="updateDialog"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form :model="updateObj" label-width="120px">
        <el-form-item label="企业名称:">
          <el-input v-model="updateObj.ht_ui_Name" placeholder="请输入" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="联系人:">
          <el-input v-model="updateObj.ht_ui_ConnectName" placeholder="请输入" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="updateObj.ht_ui_Phone" placeholder="请输入企业电话号码" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="updateObj.ht_ui_Tel" placeholder="请输入联系人手机号" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="挂账额度:">
          <el-input v-model="updateObj.ht_ui_Credit" placeholder="请输入" style="width: 200px;"></el-input>
          元
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="updateObj.ht_ui_Address" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="客户等级:">
          <el-input v-model="updateObj.ht_ui_Level" placeholder="请输入" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="合同号:">
          <el-input v-model="updateObj.ht_ui_AgreeMent" placeholder="请输入" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="合同生效期:">
          <el-date-picker
            v-model="updateObj.ht_ui_BeginDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="updateObj.ht_ui_Remark" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="客户状态:">
          <el-select v-model="updateObj.ht_ui_UserState" placeholder="请选择" size="small">
            <el-option
              v-for="item in useState"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否房价保密:">
          <el-select v-model="updateObj.ht_ui_PassState" placeholder="请选择" size="small">
            <el-option
              v-for="item in passwordState"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改房间价格-->

    <el-dialog
      title="修改房间价格"
      :visible.sync="updateRoomMoneyDialog"
      :modal-append-to-body="false"
      width="80%">
      <el-table
        :data="roomList"
        style="width: 100%">
        <el-table-column
          prop="ht_rpp_Name"
          align="center"
          label="房间名称">
        </el-table-column>
        <el-table-column
          align="center"
          label="全价">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_up_FullPrice" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="起步价">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_up_StartPrice" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="单位时间加收价">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_up_TimeAddPrice" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="加收封顶额">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_up_TopPrice" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="预收房费">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_up_BookPrice" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="早餐券数">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_up_BreakfaseCount" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="备注">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_up_Remark"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateRoomMoneyDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateRoomMoneySubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {isPhoneNum,valiDateTel} from '@/assets/js/public'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        passwordState: [
          {
            value: 0,
            label: '不保密'
          },
          {
            value: 1,
            label: '保密'
          }
        ],
        useState: [
          {
            value: 0,
            label: '有效'
          },
          {
            value: 1,
            label: '冻结'
          }
        ],
        examineState: [
          {
            value: 0,
            label: '未审核'
          },
          {
            value: 1,
            label: '已审核'
          }
        ],
        options: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_ui_ID": "",//单位信息编码
          "ht_ui_HotelID": "",//酒店编码
          "ht_ui_Name": "",//名称
          "ht_ui_ConnectName": "",//联系人
          "ht_ui_Phone": "",//电话
          "ht_ui_Tel": "",//手机号
          "ht_ui_UserCode": "",//销售员编码
          "ht_ui_UserState": "",//客户状态(0有效 1冻结)
          "ht_ui_PassState": "",//是否房价保密(0不保密  1保密)
          "ht_ui_State": "",//审核状态(0未审核 1已审核)
          "page": 1,
          "rows": 5
        },
        addDialog: false,
        updateDialog: false,
        total: 0,
        enterpriseList: [],
        isLoading: false,
        addOptions: {
          "ht_ui_HotelID": "",//酒店编码
          "ht_ui_Name": "",//名称
          "ht_ui_ConnectName": "",//联系人
          "ht_ui_Phone": "",//电话
          "ht_ui_Tel": "",//手机号
          "ht_ui_Credit": "",//挂账额度
          "ht_ui_UserCode": "",//销售员编码
          "ht_ui_Address": "",//地址
          "ht_ui_UserState": "",//客户状态(0有效 1冻结)
          "ht_ui_Level": "",//客户等级
          "ht_ui_AgreeMent": "",//合同号
          "ht_ui_BeginDate": "",//合同生效期
          "ht_ui_PassState": "",//是否房价保密(0不保密  1保密)
          "ht_ui_Remark": "",//备注
        },
        userInfo: {},
        updateObj: {},
        expands: [],
        roomList: [],//房间列表
        updateRoomMoneyDialog: false,
        setId: '',
      }
    },
    created() {
      if (sessionStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      } else {
        this.$router.push({name: 'Login'});
      }
      this.initData();
    },
    methods: {

      blurPhone() {
        if (this.options.ht_ui_Tel && !isPhoneNum(this.options.ht_ui_Tel)) {
          this.$notify({
            type: 'error',
            message: '您输入的手机号格式有误',
          });
          this.options.ht_ui_Tel = '';
        }
        if (this.addOptions.ht_ui_Tel && !isPhoneNum(this.addOptions.ht_ui_Tel)) {
          this.$notify({
            type: 'error',
            message: '您输入的手机号格式有误',
          });
          this.addOptions.ht_ui_Tel = '';
        }
      },
      //点击行展开
      rowClick(row, event, column) {
        Array.prototype.remove = function (val) {
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };

        if (this.expands.indexOf(row.id) < 0) {
          this.expands = []
          row.id = this.generateUUID();
          this.expands.push(row.id);
        } else {
          this.expands.remove(row.id);
        }

      },
      generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
      },
      //分页
      changePage(num) {
        this.options.page = num;
        this.initData();
      },
      //初始化数据
      initData() {
        this.$store.commit('showLoading');
//        for (let i in this.options) {
//          this.options[i] = this.options[i].toString().trim();
//        }
        this.options.ht_ui_HotelID = this.userInfo.CompanyID;
        this.isLoading = true;
        this.$store.dispatch('initHotelEnterprise', this.options)
          .then(data => {
            this.total = Number(data.totalrows);
            this.enterpriseList = data.data;
            this.isLoading = false;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.isLoading = false;
            this.$store.commit('hideLoading');
          })
      },
      search() {
        this.initData()
      },
      //添加
      Add() {
        for (let attr in this.addOptions) {
          this.addOptions[attr] = "";
        }
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        this.addOptions.ht_ui_UserState = 0;
        this.addOptions.ht_ui_HotelID = this.userInfo.CompanyID;
        this.addOptions.ht_ui_UserCode = this.userInfo.Id;
//        !valiDateTel(this.addOptions.ht_ui_Phone) ||
        if (!isPhoneNum(this.addOptions.ht_ui_Tel)) {
          this.$notify({
            message: '手机号格式不正确!',
            type: 'error'
          })
          return
        }
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions
        }
        this.isLoading = true;
        this.$store.dispatch('addHotelEnterprise', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.addDialog = false;
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.isLoading = true;
          })
      },
      //修改
      Update(obj) {
        this.updateObj = obj;
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit() {
//        !valiDateTel(this.updateObj.ht_ui_Phone) ||
        if (!isPhoneNum(this.updateObj.ht_ui_Tel)) {
          this.$notify({
            message: '手机号格式不正确!',
            type: 'error'
          })
          return
        }
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateObj
        }
        this.$store.dispatch('updateHotelEnterprise', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.updateDialog = false;
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
//            this.addDialog = false;
            this.updateDialog = true;
          })
      },

      //修改房间价格

      updateRoomMoney(row) {
        this.setId = row.ht_ui_ID;
        this.initHotelCooperationRoom();
      },

      //初始化酒店房间列表

      initHotelCooperationRoom() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.userInfo.CompanyID,//酒店编码
          "unitID": this.setId
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('initHotelCooperationRoom', options)
          .then(data => {
            this.roomList = data;
            this.$store.commit('hideLoading');
            this.updateRoomMoneyDialog = true;
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

      //修改房间价格提交

      updateRoomMoneySubmit() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "unitID": this.setId,//单位编码
          "data": this.roomList
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('updateCooperationRoomMoneySubmit', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.$store.commit('hideLoading');
            this.updateRoomMoneyDialog = false;
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

    },
  }
</script>
<style scoped>
</style>
