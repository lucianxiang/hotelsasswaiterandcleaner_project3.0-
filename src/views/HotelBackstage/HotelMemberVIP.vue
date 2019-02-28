<template>
  <div>

    <h1 class="wrapTitle">会员管理</h1>

    <el-menu :default-active="vipNavIndex" class="el-menu-demo" mode="horizontal" @select="changeNav">
      <el-menu-item :index="item.value" v-for="item,index in vipNavigation" :key="index">{{item.label}}</el-menu-item>
    </el-menu>

    <!--会员管理-->

    <div class="vipTypeAdmin" v-show="vipNavIndex == 0">

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
            <el-input size="small" v-model="cardName" placeholder="输入持卡人姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="cardPhone" placeholder="输入持卡人手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="cardState" placeholder="选择卡状态" size="small">
              <el-option
                v-for="item in carState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="cardTypeId" placeholder="选择卡类类型" size="small">
              <el-option
                v-for="item in vipCardTypeList"
                :key="item.ht_ct_ID"
                :label="item.ht_ct_TypeName"
                :value="item.ht_ct_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Add" size="small">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->

      <el-table
        :data="vipUserCardList"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="身份证号:">
                <span>{{ props.row.ht_mi_CertNo }}</span>
              </el-form-item>
              <el-form-item label="会员生日:">
                <span>{{ props.row.ht_mi_Birthday }}</span>
              </el-form-item>
              <el-form-item label="支付金额:">
                <span>￥{{ props.row.ht_mi_ChargeMoney }}</span>
              </el-form-item>
              <el-form-item label="消费金额:">
                <span>￥{{ props.row.ht_mi_CostAll }}</span>
              </el-form-item>
              <el-form-item label="赠送金额:">
                <span>￥{{ props.row.ht_mi_GiveMoney }}</span>
              </el-form-item>
              <el-form-item label="冻结金额:">
                <span>￥{{ props.row.ht_mi_IceMoney }}</span>
              </el-form-item>
              <el-form-item label="操作者编码:">
                <span>{{ props.row.ht_mi_MakerID }}</span>
              </el-form-item>
              <el-form-item label="电话:">
                <span>{{ props.row.ht_mi_Tel }}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ props.row.ht_mi_CreateTime }}</span>
              </el-form-item>
              <el-form-item label="注销时间:">
                <span>{{ props.row.ht_mi_ExpireDate }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="编号"
          prop="ht_mi_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="卡号"
          prop="ht_mi_CardNo">
        </el-table-column>
        <el-table-column
          align="center"
          label="会员姓名"
          prop="ht_mi_Name">
        </el-table-column>
        <el-table-column
          align="center"
          label="卡状态">
          <template slot-scope="scope">
            {{scope.row.ht_mi_CardState | getCardState}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="剩余金额">
          <template slot-scope="scope">
            ￥{{scope.row.ht_mi_HasMoney}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="400"
          label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="Update(scope.row)">修 改</el-button>
            <el-button size="small" type="primary" @click="vipRecharge(scope.row.ht_mi_CardNo)">充 值</el-button>
            <el-button size="small" type="success" @click="updateVipPayPassword(scope.row.ht_mi_ID)">修改支付密码</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->

      <div class="block" style="text-align: right;">
        <el-pagination
          :page-size="10"
          @current-change="changePage"
          layout="total,prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>

      <!--添加-->

      <el-dialog
        title="添加会员类型"
        :visible.sync="addDialog"
        :modal-append-to-body="false"
        width="50%">
        <el-form :model="addOptions" label-width="120px">
          <el-form-item label="卡类型:">
            <el-select v-model="addOptions.ht_mi_CardTypeID" placeholder="选择卡类类型">
              <el-option
                v-for="item in vipCardTypeList"
                :key="item.ht_ct_ID"
                :label="item.ht_ct_TypeName"
                :value="item.ht_ct_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡号:">
            <el-input v-model="addOptions.ht_mi_CardNo" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input v-model="addOptions.ht_mi_Name" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="生日:">
            <el-date-picker
              v-model="addOptions.ht_mi_Birthday"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择生日">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="addOptions.ht_mi_Tel" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="身份证号:">
            <el-input v-model="addOptions.ht_mi_CertNo" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="有效期:">
            <el-date-picker
              v-model="haveDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="支付密码:">
            <el-input v-model="addOptions.ht_mi_Password" type="password" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="重复支付密码:">
            <el-input v-model="addOptions.repeatPassword" type="password" style="width: 200px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </span>
      </el-dialog>

      <!--修改-->

      <el-dialog
        title="添加会员类型"
        :visible.sync="updateDialog"
        :modal-append-to-body="false"
        width="50%">
        <el-form :model="updateObj" label-width="120px">
          <el-form-item label="卡类型:">
            <el-select v-model="updateObj.ht_mi_CardTypeID" placeholder="选择卡类类型">
              <el-option
                v-for="item in vipCardTypeList"
                :key="item.ht_ct_ID"
                :label="item.ht_ct_TypeName"
                :value="item.ht_ct_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡号:">
            <el-input v-model="updateObj.ht_mi_CardNo" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input v-model="updateObj.ht_mi_Name" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="生日:">
            <el-date-picker
              v-model="updateObj.ht_mi_Birthday"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择生日">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="updateObj.ht_mi_Tel" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="身份证号:">
            <el-input v-model="updateObj.ht_mi_CertNo" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="会员卡状态:">
            <el-select v-model="updateObj.ht_mi_CardState" placeholder="选择状态">
              <el-option
                v-for="item in updateCarState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效期:">
            <el-date-picker
              v-model="updateHaveDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </span>
      </el-dialog>


    </div>

    <!--会员类型管理-->

    <div class="vipTypeAdmin" v-show="vipNavIndex == 1">

      <!--查询-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="vipCardTypeName" placeholder="输入卡类型名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="vipCardState" placeholder="选择卡状态" size="small">
              <el-option
                v-for="item in carState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchVipCard" size="small">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addVipTypeCard" size="small">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->

      <el-table
        :data="vipCardTypeList"
        style="width: 100%">
        <el-table-column
          prop="ht_ct_ID"
          align="center"
          width="100"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="ht_ct_TypeName"
          align="center"
          label="类型名称">
        </el-table-column>
        <el-table-column
          align="center"
          width="80"
          label="等级">
          <template slot-scope="scope">
            Lv.{{scope.row.ht_ct_Level}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="卡费">
          <template slot-scope="scope">
            ￥{{scope.row.ht_ct_CardMoney}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="是否可充值">
          <template slot-scope="scope">
            {{scope.row.ht_ct_CanCharge | getIsOff}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="是否可透支">
          <template slot-scope="scope">
            {{scope.row.ht_ct_CanOut | getIsOff}}
          </template>
        </el-table-column>
        <el-table-column
          prop="ht_ct_Remark"
          align="center"
          label="备注">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="updateVipCardType(scope.row)">修改</el-button>
            <el-button size="small" type="success" @click="setVipRoomMoney(scope.row)">设置房型价格</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加-->

      <el-dialog
        title="添加会员类型"
        :visible.sync="addVipTypeCardDialog"
        :modal-append-to-body="false"
        width="50%">
        <el-form :model="addVipTypeOptions" label-width="120px">
          <el-form-item label="类型名称:">
            <el-input v-model="addVipTypeOptions.ht_ct_TypeName" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="级别:">
            <el-input v-model="addVipTypeOptions.ht_ct_Level" :min="0" style="width: 200px;" type="number"></el-input>
          </el-form-item>
          <el-form-item label="卡费:">
            <el-input v-model="addVipTypeOptions.ht_ct_CardMoney" style="width: 200px;" type="number"></el-input>
          </el-form-item>
          <el-form-item label="是否可充值:">
            <el-select v-model="addVipTypeOptions.ht_ct_CanCharge" placeholder="请选择">
              <el-option
                v-for="item in addIsOff"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否可透支:">
            <el-select v-model="addVipTypeOptions.ht_ct_CanOut" placeholder="请选择">
              <el-option
                v-for="item in addIsOff"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="addVipTypeOptions.ht_ct_Remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVipTypeCardDialog = false">取 消</el-button>
          <el-button type="primary" @click="addVipTypeCardSubmit">确 定</el-button>
        </span>
      </el-dialog>

      <!--修改-->

      <el-dialog
        title="修改会员类型"
        :visible.sync="updateVipCardTypeDialog"
        :modal-append-to-body="false"
        width="50%">
        <el-form :model="updateVipCardTypeObj" label-width="120px">
          <el-form-item label="类型名称:">
            <el-input v-model="updateVipCardTypeObj.ht_ct_TypeName" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="级别:">
            <el-input v-model="updateVipCardTypeObj.ht_ct_Level" :min="0" style="width: 200px;"
                      type="number"></el-input>
          </el-form-item>
          <el-form-item label="卡费:">
            <el-input v-model="updateVipCardTypeObj.ht_ct_CardMoney" style="width: 200px;" type="number"></el-input>
          </el-form-item>
          <el-form-item label="是否可充值:">
            <el-select v-model="updateVipCardTypeObj.ht_ct_CanCharge" placeholder="请选择">
              <el-option
                v-for="item in addIsOff"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否可透支:">
            <el-select v-model="updateVipCardTypeObj.ht_ct_CanOut" placeholder="请选择">
              <el-option
                v-for="item in addIsOff"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="updateVipCardTypeObj.ht_ct_Remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateVipCardTypeDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateVipCardTypeSubmit">确 定</el-button>
        </span>
      </el-dialog>

    </div>

    <!--修改会员支付密码-->

    <el-dialog
      title="修改会员支付密码"
      :visible.sync="updatePasswordDialog"
      :modal-append-to-body="false"
      width="50%">
      <el-form label-width="120px">
        <el-form-item label="新的支付密码:">
          <el-input v-model="newPayPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认支付密码:">
          <el-input v-model="repeatNewPayPassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatePasswordDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateVipPayPasswordSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!--充值-->

    <el-dialog
      title="会员充值"
      :visible.sync="rechargeDialog"
      :modal-append-to-body="false"
      width="50%">
      <el-form label-width="120px">
        <el-form-item label="充值金额:">
          <el-input v-model="rechargeOptions.charageMoney" type="number" :min="0"></el-input>
        </el-form-item>
        <el-form-item label="赠送金额:">
          <el-input v-model="rechargeOptions.giveMoney" type="number" :min="0"></el-input>
        </el-form-item>
        <el-form-item label="支付方式:">
          <el-radio-group v-model="rechargeOptions.payWay">
            <el-radio :label="item.value" v-for="item,index in payTypeList" :key="index">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargeDialog = false">取 消</el-button>
        <el-button type="primary" @click="vipRechargeSubmit">确认充值</el-button>
      </span>
    </el-dialog>

    <!--设置会员价格-->

    <el-dialog
      title="修改房间价格"
      :visible.sync="setVipMoneyDialog"
      :modal-append-to-body="false"
      width="80%">
      <el-table
        :data="setVipRoomMoneyList"
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
            <el-input size="small" v-model="scope.row.ht_mp_FullPrice" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="起步价">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_mp_StartPrice" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="单位时间加收价">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_mp_TimeAddPrice" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="加收封顶额">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_mp_TopPrice" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="预收房费">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_mp_BookPrice" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="早餐券数">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_mp_BreakfaseCount" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="备注">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.ht_mp_Remark"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setVipMoneyDialog = false">取 消</el-button>
        <el-button type="primary" @click="setVipMoneySubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {isPhoneNum, isCardNo} from '@/assets/js/public'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        //会员管理
        userInfo: {},
        cardTypeId: '',
        cardNum: '',
        cardName: '',
        cardPhone: '',
        cardState: '',
        vipNavIndex: '0',
        vipNavigation: [
          {
            value: '0',
            label: '会员管理'
          },
          {
            value: '1',
            label: '会员类型管理'
          }
        ],
        total: 0,
        vipUserCardList: [],
        addOptions: {
          "ht_mi_HotelID": "",//酒店编码
          "ht_mi_CardTypeID": "",//卡类型编码
          "ht_mi_CardNo": "",//卡号
          "ht_mi_Name": "",//姓名
          "ht_mi_Birthday": "",//生日
          "ht_mi_Tel": "",//手机号
          "ht_mi_MakerID": "",//办理员编码
          "ht_mi_CertNo": "",//证件号
          "ht_mi_CreateTime": "",//发卡日期
          "ht_mi_ExpireDate": "",//失效日期
          "ht_mi_Password": "",//会员支付密码
          "repeatPassword": "",//重复会员支付密码
        },
        addDialog: false,
        haveDate: "",
        updateDialog: false,
        updateObj: {},
        updateHaveDate: "",
        updateCarState: [
          {
            value: 0,
            label: '正常'
          },
          {
            value: 1,
            label: '作废'
          }
        ],
        //会员类型管理
        carState: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 0,
            label: '正常'
          },
          {
            value: 1,
            label: '作废'
          }
        ],
        vipCardTypeList: [],
        vipCardTypeName: '',
        vipCardState: '',
        addVipTypeCardDialog: false,
        addVipTypeOptions: {
          "ht_ct_HotelID": "",//酒店编码
          "ht_ct_TypeName": "",//类型名称
          "ht_ct_Level": "",//级别
          "ht_ct_CardMoney": "",//卡费
          "ht_ct_CanCharge": "",//是否可充值
          "ht_ct_CanOut": "",//是否可透支
          "ht_ct_Remark": "",//备注
        },
        addIsOff: [
          {
            value: 0,
            label: '是'
          },
          {
            value: 1,
            label: '否'
          }
        ],
        updateVipCardTypeDialog: false,
        updateVipCardTypeObj: {},
        //修改会员支付密码
        vipUserId: '',
        updatePasswordDialog: false,
        newPayPassword: '',
        repeatNewPayPassword: '',
        //会员充值
        rechargeDialog: false,
        payTypeList: [
          {
            value: "0",
            label: '现金'
          },
          {
            value: "1",
            label: '银行卡'
          },
          {
            value: "3",
            label: '支付宝'
          },
          {
            value: "4",
            label: '微信'
          },
        ],
        rechargeOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "charageMoney": "",//充值金额
          "giveMoney": "",//赠送金额
          "memberCard": "",//卡号
          "managerID": "",//酒店工作人员编码
          "hotelID": "",//酒店编码
          "payWay": "0",//支付方式0现金 1银行卡 2会员卡 3支付宝 4微信 5挂账
        },
        //设置房间类型价格
        setVipRoomMoneyList: [],
        setVipMoneyDialog: false,
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
      this.initVipCardType();
    },
    methods: {

      //切换导航

      changeNav(val) {
        this.vipNavIndex = val;
        this.vipCardTypeName = '';
        this.vipCardState = '';
        this.initVipCardType();
        if (val == 1) {

        }
        if (val == 0) {
          this.initData();
        }
      },

      //--------------------会员类型管理-----------------------

      //初始化卡类型

      initVipCardType() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_ct_ID": "",
          "ht_ct_HotelID": this.userInfo.CompanyID,//酒店编码
          "ht_ct_TypeName": this.vipCardTypeName,//类型名称
          "ht_ct_State": this.vipCardState,//卡状态(0正常 1作废)
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('initVipCardType', options)
          .then(data => {
            this.vipCardTypeTotal = Number(data.totalrows);
            this.vipCardTypeList = data.data;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },

      //查询会员类型

      searchVipCard() {
        this.initVipCardType();
      },

      //添加会员类型

      addVipTypeCard() {
        for (let attr in this.addVipTypeOptions) {
          this.addVipTypeOptions[attr] = '';
        }
        this.addVipTypeOptions.ht_ct_HotelID = this.userInfo.CompanyID;
        this.addVipTypeCardDialog = true;
      },

      //添加会员类型提交

      addVipTypeCardSubmit() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addVipTypeOptions
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('addVipTypeCardSubmit', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initVipCardType();
            this.addVipTypeCardDialog = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.addVipTypeCardDialog = false;
            this.$store.commit('hideLoading');
          })
          .catch(err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.addVipTypeCardDialog = false;
            this.$store.commit('hideLoading');
          })
      },

      //修改

      updateVipCardType(obj) {
        this.updateVipCardTypeObj = obj;
        this.updateVipCardTypeDialog = true;
      },

      //修改提交

      updateVipCardTypeSubmit() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateVipCardTypeObj
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('updateVipCardTypeSubmit', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initVipCardType();
            this.updateVipCardTypeDialog = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.updateVipCardTypeDialog = false;
            this.$store.commit('hideLoading');
          })
          .catch(err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.updateVipCardTypeDialog = false;
            this.$store.commit('hideLoading');
          })
      },

      //查询设置会员房型价格

      initSetVipRoomMoney() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.userInfo.CompanyID,//酒店编码
          "cardTypeID": this.setId,
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('searchSetVipRoomTypePrice', options)
          .then(data => {
            this.setVipRoomMoneyList = data.data;
            this.$store.commit('hideLoading');
            this.setVipMoneyDialog = true;
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

      //设置会员房型价格

      setVipRoomMoney(obj) {
        this.setId = obj.ht_ct_ID;
        this.initSetVipRoomMoney();
      },

      //设置会员房型价格提交

      setVipMoneySubmit() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "cardTypeID": this.setId,
          "data": this.setVipRoomMoneyList
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('setVipMoneySubmit', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.setVipMoneyDialog = false;
            this.initVipCardType();
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
            this.setVipMoneyDialog = false;
            this.$store.commit('hideLoading');
          })
      },

      //--------------------会员管理----------------------------

      //初始化数据

      initData(num) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_mi_ID": "",//会员ID
          "ht_mi_HotelID": this.userInfo.CompanyID,//酒店编码
          "ht_mi_CardTypeID": this.cardTypeId,//卡类型编码
          "ht_mi_CardNo": this.cardNum,//卡号
          "ht_mi_Name": this.cardName,//姓名
          "ht_mi_Birthday": "",//生日
          "ht_mi_Tel": this.cardPhone,//手机号
          "ht_mi_MakerID": "",//办理员编码
          "ht_mi_CardState": this.cardState,//卡状态
          "ht_mi_CertNo": "",//证件号
          "ht_mi_CreateFrom": "",//发卡日期从
          "ht_mi_CreateTo": "",//发卡日期到
          "page": num ? num : 1,
          "rows": 10,
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('initVipUserCard', options)
          .then(data => {
            this.total = Number(data.totalrows);
            this.vipUserCardList = data.data;
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

      //查询

      search() {
        this.initData();
      },

      //分页

      changePage(num) {
        this.initData(num);
      },

      //添加

      Add() {
        for (let attr in this.addOptions) {
          this.addOptions[attr] = '';
        }
        this.addOptions.ht_mi_HotelID = this.userInfo.CompanyID;
        this.addOptions.ht_mi_MakerID = this.userInfo.Id;
        this.addDialog = true;
      },

      //添加提交

      addSubmit() {

        if (this.addOptions.ht_mi_CardTypeID == '') {
          this.$notify({
            message: '请选择卡类型',
            type: 'error'
          })
          return
        }

        if (!this.addOptions.ht_mi_CardNo) {
          this.$notify({
            message: '请输入卡号',
            type: 'error'
          })
          return
        }

        if (!this.addOptions.ht_mi_Name) {
          this.$notify({
            message: '请输入姓名',
            type: 'error'
          })
          return
        }

        if (!this.addOptions.ht_mi_Birthday) {
          this.$notify({
            message: '请选择生日',
            type: 'error'
          })
          return
        }

        if (!isPhoneNum(this.addOptions.ht_mi_Tel)) {
          this.$notify({
            message: '手机号格式不正确',
            type: 'error'
          })
          return
        }

        if (!isCardNo(this.addOptions.ht_mi_CertNo)) {
          this.$notify({
            message: '身份证号格式不正确',
            type: 'error'
          })
          return
        }

        if (this.haveDate) {
          this.addOptions.ht_mi_CreateTime = this.haveDate[0];
          this.addOptions.ht_mi_ExpireDate = this.haveDate[1];
        } else {
          this.addOptions.ht_mi_CreateTime = "";
          this.addOptions.ht_mi_ExpireDate = "";
        }

        if (!this.addOptions.ht_mi_Password || (this.addOptions.ht_mi_Password != this.addOptions.repeatPassword)) {
          this.$notify({
            message: '请输入支付密码或两次输入不一致',
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
        this.$store.commit('showLoading');
        this.$store.dispatch('addVipUserCard', options)
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
            this.$store.commit('hideLoading');
          })
          .catch(err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.addDialog = false;
            this.$store.commit('hideLoading');
          })
      },

      //修改

      Update(obj) {
        this.updateObj = obj;
        this.updateHaveDate = [obj.ht_mi_CreateTime, obj.ht_mi_ExpireDate];
        this.updateDialog = true;
      },

      //修改提交

      updateSubmit() {

        if (this.updateObj.ht_mi_CardTypeID == '') {
          this.$notify({
            message: '请选择卡类型',
            type: 'error'
          })
          return
        }

        if (!this.updateObj.ht_mi_CardNo) {
          this.$notify({
            message: '请输入卡号',
            type: 'error'
          })
          return
        }

        if (!this.updateObj.ht_mi_Name) {
          this.$notify({
            message: '请输入姓名',
            type: 'error'
          })
          return
        }

        if (!this.updateObj.ht_mi_Birthday) {
          this.$notify({
            message: '请选择生日',
            type: 'error'
          })
          return
        }

        if (!isPhoneNum(this.updateObj.ht_mi_Tel)) {
          this.$notify({
            message: '手机号格式不正确',
            type: 'error'
          })
          return
        }

        if (!isCardNo(this.updateObj.ht_mi_CertNo)) {
          this.$notify({
            message: '身份证号格式不正确',
            type: 'error'
          })
          return
        }

        if (this.updateHaveDate) {
          this.updateObj.ht_mi_CreateTime = this.updateHaveDate[0];
          this.updateObj.ht_mi_ExpireDate = this.updateHaveDate[1];
        } else {
          this.updateObj.ht_mi_CreateTime = "";
          this.updateObj.ht_mi_ExpireDate = "";
        }

        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateObj
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('updateVipUserCard', options)
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
            this.$store.commit('hideLoading');
          })
          .catch(err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.updateDialog = false;
            this.$store.commit('hideLoading');
          })
      },

      //修改会员支付密码

      updateVipPayPassword(id) {
        this.newPayPassword = '';
        this.repeatNewPayPassword = '';
        this.vipUserId = id;
        this.updatePasswordDialog = true;
      },

      //修改会员支付密码提交

      updateVipPayPasswordSubmit() {

        if (!this.newPayPassword || (this.newPayPassword != this.repeatNewPayPassword)) {
          this.$notify({
            message: '请输入新的支付密码或两次输入不一致',
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
          "Id": this.vipUserId,//会员标识
          "PassWord": this.newPayPassword,//新密码
        };

        this.$store.commit('showLoading');
        this.$store.dispatch('updateVipPayPasswordSubmit', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.updatePasswordDialog = false;
            this.initData();
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
            this.updatePasswordDialog = false;
            this.$store.commit('hideLoading');
          })
      },

      //会员充值

      vipRecharge(id) {
        this.rechargeOptions.charageMoney = "";
        this.rechargeOptions.giveMoney = "";
        this.rechargeOptions.payWay = "0";

        this.rechargeOptions.memberCard = id;
        this.rechargeOptions.managerID = this.userInfo.Id;
        this.rechargeOptions.hotelID = this.userInfo.CompanyID;

        this.rechargeDialog = true;
      },

      //会员充值提交

      vipRechargeSubmit() {
        this.$store.commit('showLoading');
        this.$store.dispatch('vipRechargeSubmit', this.rechargeOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.rechargeDialog = false;
            this.initData();
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
            this.rechargeDialog = false;
            this.$store.commit('hideLoading');
          })
      },

    }
  }
</script>
<style scoped>

  .vipTypeAdmin {
    padding-top: 20px;
  }

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

</style>
