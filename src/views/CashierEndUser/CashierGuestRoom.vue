<template>
  <div>
    <div class="wrap">
      <div class="leftRoom clearfix">
        <!--筛选-->
        <div class="leftRoomCondition clearfix">
          <div>
            <strong>客源:</strong>
            <el-checkbox-group v-model="options.orderFrom" @change="changeSourceList">
              <el-checkbox v-for="item,index in sourceList" :label="item.wayID" :key="index">
                {{item.wayName}}({{item.bookFromCount}})
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
            <strong>订单类型:</strong>
            <el-checkbox-group v-model="options.custFrom" @change="changeSourceList">
              <el-checkbox v-for="item,index in custFromList" :label="item.memberID" :key="index">
                {{item.memberName}}({{item.fromCount}})
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <!--房间列表-->
        <div class="hotelRoomListWrap">
          <div class="hotelRoomList" v-for="item,index in floorConditionList">
            <strong>{{item.Level}}</strong>
            <ul class="floorRoom clearfix">
              <li v-for="ite,i in item.RoomList"
                  :class="{active: i == roomIndex && item.Level == floorLevel}"
                  @click.stop="changeRoom(ite,i,item.Level)"
              >
                <!--房间状态-->
                <!--havePersonal  有客人-->
                <!--emptyPersonal  空房-->
                <!--repairPersonal  维修房-->
                <!--cleanerPersonal  待打扫-->
                <!--lockPersonal 锁房-->
                <div class="thisRoomState"
                     :class="[
                       {havePersonal:ite.ht_re_State == 2 || ite.ht_re_State == 3},
                       {emptyPersonal: ite.ht_re_State == 0},
                       {repairPersonal: ite.ht_re_State == 4},
                       {cleanerPersonal: (ite.ht_re_State == 1 || ite.ht_re_State == 3) && ite.ht_re_NeedClean },
                       {lockPersonal: ite.ht_re_LockState}
                     ]"
                >
                  <strong>{{ite.ht_re_RoomID}}{{ite.roomTypeName}}</strong>
                  <!--有客人-->
                  <div class="haveUserRoom" v-show="ite.ht_re_State == 2 || ite.ht_re_State == 3">
                    <span class="guestName">{{ite.bookName}}</span>
                    <i class="userIcon"></i>
                    <!--住人脏-->
                    <i class="haveCleanerIcon" v-show="ite.ht_re_NeedClean"></i>
                  </div>
                  <!--空房-->
                  <span class="emptyRoom"
                        v-show="ite.ht_re_State == 0 && !ite.ht_re_NeedClean && !ite.ht_re_LockState ">空</span>
                  <!--维修-->
                  <i class="repairIcon" v-show="!ite.ht_re_NeedClean && ite.ht_re_State == 4"></i>
                  <!--空脏-->
                  <i class="cleanerIcon"
                     v-show="(ite.ht_re_State == 1 || ite.ht_re_State == 3) && ite.ht_re_NeedClean"></i>
                  <!--锁房-->
                  <i class="lockIcon"
                     v-show="!ite.ht_re_NeedClean && ite.ht_re_LockState == 1 && ite.ht_re_State == 0"></i>
                </div>
                <!--房间操作-->
                <div class="noUserOperation"
                     v-show="
                     i == roomIndex &&
                     item.Level == floorLevel &&
                     (ite.ht_re_State == 0 || ite.ht_re_State == 4 || ite.ht_re_State == 1)"
                     @click.stop="clickWhite"
                >
                  <i @click.stop="closeRoomOperation"></i>
                  <strong>{{ite.ht_re_RoomID}}{{ite.roomTypeName}}</strong>
                  <div class="clearfix">
                    <a href="javascript:;"
                       @click.stop="openCheckIn(ite)"
                       v-show="!ite.ht_re_NeedClean && ite.ht_re_LockState == 0 &&
                       ite.ht_re_State != 4"
                    >入 住</a>
                    <a href="javascript:;"
                       @click.stop="hotelLockRoom(ite)"
                       v-show="!ite.ht_re_NeedClean && ite.ht_re_LockState == 0 &&
                       (ite.ht_re_State == 0||ite.ht_re_State == 1) &&
                        ite.ht_re_State != 4"
                    >锁 房</a>
                    <a href="javascript:;"
                       @click.stop="hotelLockRoom(ite)"
                       v-show="!ite.ht_re_NeedClean && ite.ht_re_LockState == 1 &&
                        (ite.ht_re_State == 0||ite.ht_re_State == 1) &&
                         ite.ht_re_State != 4"
                    >取消锁房</a>
                    <!--<a href="javascript:;"-->
                    <!--v-show="!ite.ht_re_NeedClean && ite.ht_re_LockState != 1 &&-->
                    <!--ite.ht_re_State != 4"-->
                    <!--&gt;预 定</a>-->
                    <a href="javascript:;" v-show="!ite.ht_re_NeedClean && ite.ht_re_State != 4 &&
                    (ite.ht_re_LockState ==  0 || ite.ht_re_LockState == 2) "
                       @click.stop="updateDirtyRoom(ite,0)"
                    >脏 房</a>
                    <a href="javascript:;" v-show="!ite.ht_re_NeedClean && ite.ht_re_LockState != 1 &&
                     ite.ht_re_State != 4"
                       @click.stop="updateDirtyRoom(ite,1)"
                    >维 修</a>
                    <a href="javascript:;" v-show="!ite.ht_re_NeedClean && ite.ht_re_State == 4"
                       @click.stop="roomOperationOver(ite,1)">维修完成</a>
                    <a href="javascript:;" v-show="ite.ht_re_NeedClean"
                       @click.stop="roomOperationOver(ite,0)">打扫完成</a>
                  </div>
                </div>
                <!--已入住操作-->
                <div class="haveUserOperation"
                     v-show="
                     i == roomIndex &&
                     item.Level == floorLevel &&
                     (ite.ht_re_State == 2 || ite.ht_re_State == 3)"
                     @click.stop="clickWhite"
                >
                  <i @click.stop="closeRoomOperation"></i>
                  <strong>{{ite.ht_re_RoomID}}{{ite.roomTypeName}}</strong>
                  <div class="haveUserOperationNav clearfix">
                    <a href="javascript:;"
                       v-for="v,index in haveUserOperation" @click.stop="changeRoomState(ite,index,item.Level)"
                       :class="{active: index == roomStateIndex}"
                    >{{v.label}}</a>
                  </div>
                  <!--入住人信息-->
                  <div class="roomUserInfo" v-show="roomStateIndex == 0">
                    <div class="roomUserInfoCon clearfix">
                      <img
                        src="http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/HotelBackstage/userIcon.png"
                        alt="">
                      <div class="clearfix">
                        <span class="time">入/离时间: {{userOrderInfo.inTime}} - {{userOrderInfo.outTime}}</span>
                        <span>天数: {{userOrderInfo.Days}}天</span>
                        <span>房价: ￥{{userOrderInfo.ht_re_RoomTypePrice}}</span>
                      </div>
                    </div>
                    <div class="roomUserInfoOperation clearfix">
                      <a href="javascript:;" @click.stop="updateDirtyRoom(ite,0)" v-show="!ite.ht_re_NeedClean">脏 房</a>
                      <a href="javascript:;" @click.stop="roomOperationOver(ite,0)"
                         v-show="ite.ht_re_NeedClean">打扫完成</a>
                      <a href="javascript:;" @click.stop="initUserOrder(ite)">查询详情</a>
                    </div>
                  </div>
                  <!--远期房态-->
                  <ul class="roomState clearfix" v-show="roomStateIndex == 1">
                    <li v-for="item,index in longRoomStateList">
                      <strong>{{item.month}}/{{item.day}}</strong>
                      <span>{{item.planState}}</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <p v-show="!floorConditionList.length">暂无数据</p>
        </div>
      </div>
      <!--房间筛选条件-->
      <div class="rightQueryCondition">
        <strong>营业实况/房间检索</strong>
        <!--房卡查询-->
        <!--<div class="roomNumSearch">-->
        <!--<strong>房卡查询</strong>-->
        <!--<div>-->
        <!--<input type="text" placeholder="房号/姓名">-->
        <!--<div>-->
        <!--<i class="el-icon-search"></i>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--房态-->
        <div class="searchRoomState">
          <strong>房间状态</strong>
          <el-checkbox-group v-model="options.roomState" @change="changeSourceList">
            <el-checkbox v-for="item,index in conditionList" :label="item.roomStateID" :key="index">
              {{item.roomStateName}}({{item.stateCount}})
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <!--栋数-->
        <div class="searchRoomType">
          <strong>栋<span>(总房数/空房数)</span></strong>
          <ul class="tungFloorList clearfix">
            <li
              v-for="item,index in hotelToungList"
              :class="{active: index == tungIndex}"
              @click.stop="changeTung(item,index)"
            >
              {{item.BuildNo}}栋({{item.BuildRoomCount}}/{{item.BuildRoomCount - item.BuildPersonCount}})
            </li>
          </ul>
        </div>
        <!--楼层-->
        <div class="searchRoomType" v-show="floorConditionList.length">
          <strong>楼层<span>(总房数/空房数)</span></strong>
          <ul class="tungFloorList clearfix">
            <li
              v-for="item,index in floorCondition"
              :class="{active: index == floorIndex}"
              @click.stop="changeFloor(item,index)"
            >
              {{item.Level}}层({{item.LevelRoomCount}}/{{item.LevelRoomCount - item.LevelUseCount}})
            </li>
          </ul>
        </div>
      </div>
      <!--底部内容-->
      <footer>
        <div class="roomData">
          <div class="allRoom">
            <strong>全部({{searchConditionObj.totalRows}})</strong>
          </div>
          <div class="hotelEmptyRoom">
            <i></i>
            <strong>空房({{searchConditionObj.emptyRoomCount}})</strong>
          </div>
          <div class="havePeRoom">
            <i></i>
            <strong>住人({{searchConditionObj.personRoomCount}})</strong>
          </div>
          <div class="repairRoom">
            <i></i>
            <strong>维修({{searchConditionObj.mendRoomCount}})</strong>
          </div>
          <div class="nowOccupancyRate">
            当前入住率: {{Math.floor((searchConditionObj.inFate * 100) ? (searchConditionObj.inFate * 100) : 0)}}%
          </div>
        </div>
      </footer>
    </div>
    <!--入住弹窗-->
    <div class="checkInWindow" v-show="showFillInInfo" @click.stop="closeCheckIn">
      <div class="checkInWindowBox" @click.stop="clickWhite">
        <div class="checkIntitle">
          <strong>入住</strong>
          <i @click.stop="closeCheckIn"></i>
        </div>
        <!--入住类型-->
        <!--<div class="checkInNav clearfix">-->
        <!--<a href="javscript:;" v-for="item,index in checkInType"-->
        <!--:class="{active: index == checkIndex}">{{item.label}}</a>-->
        <!--</div>-->
        <!--个人入住-->
        <div class="personalCheckIn">
          <!--录入个人信息-->
          <div class="personalInfo clearfix">
            <img src="http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/HotelBackstage/userIcon.png"
                 alt="">
            <el-form :inline="true" :model="addOrderOptions" class="demo-ruleForm" :rules="rules0" ref="newRuleForm0">
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="addOrderOptions.name" placeholder="姓名" size="small" style="width: 200px;"
                          @blur="setMainPersonInfoName"></el-input>
              </el-form-item>
              <el-form-item label="身份证号:" prop="idcard">
                <el-input v-model="addOrderOptions.idcard" placeholder="身份证号" size="small"
                          style="width: 200px;" @blur="setMainPersonInfoIdcard"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" prop="phone">
                <el-input v-model="addOrderOptions.phone" placeholder="手机号" size="small"
                          style="width: 200px;" @blur="setMainPersonInfoPhone"></el-input>
              </el-form-item>
              <el-form-item label="入住类型:" required>
                <el-select v-model="addOrderOptions.orderType" size="mini" placeholder="请选择"
                           @change="changeOrderType">
                  <el-option
                    v-for="item in orderType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="会员卡号:" v-show="showVIP" required>
                <el-input size="mini" style="width: 200px;" v-model="addOrderOptions.cardNo"></el-input>
              </el-form-item>
              <el-form-item label="选择合作企业:" v-show="showCompany">
                <el-select v-model="addOrderOptions.companyID" size="mini" placeholder="请选择">
                  <el-option
                    v-for="item in companyList"
                    :key="item.ht_ui_ID"
                    :label="item.ht_ui_Name"
                    :value="item.ht_ui_ID">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="停车位个数:">
                <el-input size="mini" style="width: 200px;" type="number" :min="0"
                          v-model="addOrderOptions.carSeats"></el-input>
              </el-form-item>
              <el-form-item label="特殊需求:">
                <el-input size="mini" style="width: 200px;" v-model="addOrderOptions.specialNeed"></el-input>
              </el-form-item>
              <el-form-item label="选择入离时间:" required>
                <el-date-picker
                  v-model="inOutDate"
                  size="mini"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  @change="selectDate"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="warning" @click.stop="clearGuestData">清除客人资料</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--添加订单信息-->
          <div class="personalCheckInOrder">
            <strong>订单信息</strong>
            <div class="addRoomBtn">
              <el-button type="primary" icon="el-icon-plus" size="small" @click.stop="checkInSelectRoom">添加房间
              </el-button>
            </div>
            <el-form :inline="true" :model="addOrderOptions" class="demo-ruleForm"
                     v-for="item,index in addInRoomList" :key="index"
            >
              <p class="clearfix">{{item.roomID}} :
                <span
                  style="
                  float: right;
                  cursor: pointer;
                  color: #e6a23c;
                  padding: 5px 10px;
                  border: 1px solid #e6a23c;
                  -webkit-border-radius: 5px;
                  -moz-border-radius: 5px;
                  border-radius: 5px;"
                  @click.stop="cancelInPeople(item)"
                >取消</span>
                <span
                  class="readCard"
                  @click.stop="getOtherIdCardInfo(item.mainPersonInfo)"
                >识别身份证</span></p>
              <el-form-item label="住户姓名:">
                <el-input style="width: 200px;" size="mini" v-model="item.mainPersonInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="身份证号:">
                <el-input style="width: 200px;" size="mini" v-model="item.mainPersonInfo.idcard"></el-input>
              </el-form-item>
              <el-form-item label="手机号码:">
                <el-input style="width: 200px;" size="mini" v-model="item.mainPersonInfo.phone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-plus" size="small" @click.stop="addOtherPerson(item,index)">
                  添加同来人
                </el-button>
                <el-form :inline="true" :model="ite" class="demo-ruleForm" :rules="rules1" ref="newRuleForm1"
                         v-for="ite,index in item.otherPersonInfo" :key="index"
                >
                  <p class="clearfix">同来人信息{{index + 1}}:
                    <span
                      style="
                      float: right;
                      cursor: pointer;
                      color: #e6a23c;
                      padding: 5px 10px;
                      font: 14px/1 '微软雅黑';
                      border: 1px solid #e6a23c;
                      -webkit-border-radius: 5px;
                      -moz-border-radius: 5px;
                      border-radius: 5px;"
                      @click.stop="cancelInOtherPeople(item,index)"
                    >取消</span>
                    <span
                      class="readCard"
                      @click.stop="getOtherIdCardInfo(ite)"
                    >识别身份证</span></p>
                  <el-form-item label="同来人姓名:" prop="name">
                    <el-input style="width: 200px;" size="mini" v-model="ite.name"></el-input>
                  </el-form-item>
                  <el-form-item label="同来人身份证号:" prop="idcard">
                    <el-input style="width: 200px;" size="mini" v-model="ite.idcard"></el-input>
                  </el-form-item>
                  <el-form-item label="同来人手机号码:" prop="phone">
                    <el-input style="width: 200px;" size="mini" v-model="ite.phone"></el-input>
                  </el-form-item>
                </el-form>
              </el-form-item>
            </el-form>
          </div>
          <div class="addOrderConfirm">
            <el-button @click.stop="showFillInInfo = false" size="small">取 消</el-button>
            <el-button type="primary" @click.stop="addOrderConfirm" size="small">确 定</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--续住弹窗-->
    <el-dialog
      :title="conRoom+'续住'"
      :visible.sync="continuedResidenceDialog"
      :modal-append-to-body="false"
      width="500px">
      <el-input
        style="width: 300px;"
        size="small"
        type="number"
        :min="1"
        placeholder="请输入续住天数"
        v-model="dayNum"
      ></el-input>
      天
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="continuedResidenceDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click.stop="continuedResidenceSubmit" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--锁房弹窗-->
    <el-dialog
      title="锁房"
      :visible.sync="lockRoomDialog"
      :modal-append-to-body="false"
      width="700px">
      <span style="margin-right: 10px; font-size: 14px;line-height: 32px;">备注:</span>
      <el-input style="width: 600px;" size="small" placeholder="备注" v-model="lockRemark"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="lockRoomDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click.stop="hotelLockRoomConfirm" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--选房弹窗-->
    <el-dialog
      title="选房"
      :visible.sync="selectRoomDialog"
      :modal-append-to-body="false"
      width="1000px">
      <div class="selectRoomListWrap">
        <strong>当前为{{tungNum}}栋</strong>
        <dl class="selectRoomList clearfix" v-for="item,index in selectInRoomList" v-show="item.RoomList.length">
          <dt>{{item.Level}}</dt>
          <dd v-for="item,index in item.RoomList" :class="{active: item.isState}"
              @click.stop="changeInRoom(item,index)">{{item.ht_re_RoomID}}
          </dd>
        </dl>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="selectRoomDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click.stop="checkInSelectRoomSumit" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--维修或置脏原因-->
    <el-dialog
      title="原因"
      :visible.sync="showDirtyOrClearnReason"
      :modal-append-to-body="false"
      width="700px">
      <span style="margin-right: 10px; font-size: 14px;line-height: 32px;">原因:</span>
      <el-input style="width: 600px;" size="small" placeholder="原因" v-model="dirtyOrClearnReason"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="showDirtyOrClearnReason = false" size="small">取 消</el-button>
        <el-button type="primary" @click.stop="updateDirtyRoomSubmit" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--账单详情弹窗-->
    <el-dialog
      :title="conRoom+'账单'"
      :visible.sync="showBillDetails"
      :modal-append-to-body="false"
      width="1200px">
      <div class="billDetails clearfix">
        <div class="bill">
          <div class="billInfo clearfix">
            <img src="http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/HotelBackstage/userIcon.png"
                 alt="">
            <ul class="billInfoCon">
              <li class="clearfix">
                <strong>房间号:</strong>
                <div>
                  <span>{{guestBillObj.ht_re_RoomID}}</span>
                </div>
              </li>
              <li class="clearfix">
                <strong>入住天数:</strong>
                <div>
                  <span>{{guestBillObj.Days}}天</span>
                </div>
              </li>
              <li class="clearfix">
                <strong>入住人:</strong>
                <div>
                  <span>{{guestBillObj.ht_re_Name}}</span>
                </div>
              </li>
              <li class="clearfix">
                <strong>房间名称:</strong>
                <div>
                  <span>{{guestBillObj.ht_re_RoomTypeName}}</span>
                </div>
              </li>
              <li class="clearfix">
                <strong>房间价格:</strong>
                <div>
                  <span>￥{{guestBillObj.ht_od_SellPrice}}</span>
                </div>
              </li>
              <li class="clearfix">
                <strong>订单类型:</strong>
                <div>
                  <span>{{guestBillObj.orderTypeName}}</span>
                </div>
              </li>
              <li class="clearfix">
                <strong>订单号:</strong>
                <div>
                  <span>{{guestBillObj.ht_or_OrderID}}</span>
                </div>
              </li>
              <li class="clearfix">
                <strong>入离时间:</strong>
                <div>
                  <span>{{guestBillObj.inDate}} - {{guestBillObj.outDate}}</span>
                </div>
              </li>
            </ul>
          </div>
          <dl class="connectingRoom">
            <dt class="clearfix"><strong>房号</strong><span>姓名</span><em>入住时间</em></dt>
            <dd class="clearfix" v-for="item,index in guestBillObj.whereList" :key="index">
              <strong>{{item.ht_od_RoomID}}</strong>
              <span>{{item.ht_od_UserName}}</span>
              <em>{{item.ht_od_CreateTime}}</em>
              <dl class="billInfoList" v-if="item.otherList.length">
                <dt>同来人信息</dt>
                <dd v-for="i,index in item.otherList" class="clearfix" :key="index">
                  <strong>{{i.ht_op_Name}}</strong>
                  <span>{{i.ht_op_Idcard}}</span>
                </dd>
              </dl>
            </dd>
          </dl>
        </div>
        <div class="roomDetails">
          <div class="aboutRoomMoney">
            <strong>支付信息:</strong>
            <div class="clearfix">
              <strong>合计消费: ￥{{guestBillObj.payData ? guestBillObj.payData.ht_or_SumPrice : ''}}</strong>
              <span>已支付: ￥{{guestBillObj.payData ? guestBillObj.payData.frontPayMoney : ''}}</span>
            </div>
          </div>
          <!--表格-->
          <el-table
            :data="guestBillObj.dataList"
            style="width: 100%">
            <el-table-column
              prop="ht_od_GoodsListName"
              label="房间名称">
            </el-table-column>
            <el-table-column
              prop="ht_od_OutDate"
              width="200"
              label="离店日期">
            </el-table-column>
            <el-table-column
              prop="balanceState"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="ht_od_SellPrice"
              label="价格">
            </el-table-column>
            <el-table-column
              prop="ht_od_RoomID"
              label="房号">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="small" @click.stop="cancelOrder">退 单</el-button>
        <el-button type="primary" @click.stop="continuedResidence" size="small">续 住</el-button>
        <el-button type="danger" @click.stop="initSearchDeposit" size="small"
                   v-show="guestBillObj.payData && !guestBillObj.payData.frontPayMoney && guestBillObj.ht_or_OrderType"
        >支付押金</el-button>
        <el-button type="danger" size="small" @click.stop="settleAccounts">结 账</el-button>
        <el-button @click.stop="showBillDetails = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
    <!--支付弹窗-->
    <el-dialog
      :title="(isState?'结账': '押金')+'支付'"
      :visible.sync="showHandOverDeposit"
      :modal-append-to-body="false"
      width="700px">
      <!--支付方式-->
      <div class="changePayWay">
        <el-radio-group v-model="payWayId">
          <el-radio :label="item.payID" v-for="item,index in payWayList" :key="index">{{item.payName}}</el-radio>
        </el-radio-group>
      </div>
      <el-form ref="form" label-width="100px">
        <el-form-item label="订单号:">
          <p>{{orderId}}</p>
        </el-form-item>
        <el-form-item label="支付金额:">
          <el-input type="number" :min="0" v-model="depositNum" size="small" :disabled="isState"
                    style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="会员卡密码:" v-show="payWayId == 2">
          <el-input type="password" size="small" style="width: 200px;" v-model="vipPassword"
                    placeholder="请输入会员卡密码"></el-input>
          <el-button size="small" @click.stop="handOverDeposit">确 定</el-button>
        </el-form-item>
      </el-form>
      <div>
      </div>
      <!--现金-->
      <div class="cashPay" v-show="payWayId == 0">
        <el-button size="small" type="password" @click.stop="handOverDeposit">确认收钱</el-button>
      </div>
      <!--银行卡-->
      <div class="cashPay" v-show="payWayId == 1">
        <el-button size="small" type="password" @click.stop="handOverDeposit">确认收钱</el-button>
      </div>
      <!--会员卡-->
      <!--<div class="VIPPay" v-show="payWayId == 2">-->
      <!--<span>会员卡密码:</span>-->
      <!--<el-input type="password" size="small" style="width: 200px;" v-model="vipPassword"-->
      <!--placeholder="请输入会员卡密码"></el-input>-->
      <!--<el-button size="small" @click.stop="handOverDeposit">确 定</el-button>-->
      <!--</div>-->
      <!--支付宝-->
      <div class="cashPay" v-show="payWayId == 3">
        <el-button size="small" type="password" @click.stop="handOverDeposit">确认收钱</el-button>
      </div>
      <!--微信-->
      <div class="cashPay" v-show="payWayId == 4">
        <el-button size="small" type="password" @click.stop="handOverDeposit">确认收钱</el-button>
      </div>
      <!--<div class="weChatPay" v-show="payWayId == 4">-->
      <!--</div>-->
      <!--挂账-->
      <div class="toSettleAccounts" v-show="payWayId == 5">
        <el-button size="small" type="primary" @click.stop="handOverDeposit">确认挂账</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="showHandOverDeposit = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
    <!--退款弹窗-->
    <el-dialog
      title="退款"
      :visible.sync="showRefundType"
      :modal-append-to-body="false"
      width="700px">
      <!--支付方式-->
      <div class="changePayWay">
        <el-radio-group v-model="refundTypeId">
          <el-radio :label="item.outID" v-for="item,index in refundTypeList" :key="index">{{item.outName}}</el-radio>
        </el-radio-group>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="订单号:">
          <p>{{orderId}}</p>
        </el-form-item>
        <el-form-item label="退款金额:">
          <el-input type="number" :min="0" v-model="depositNum" size="small" :disabled="isState"
                    style="width: 300px;"></el-input>
        </el-form-item>
      </el-form>
      <div>
      </div>
      <!--现金-->
      <div class="cashPay" v-show="refundTypeId == 0">
        <el-button size="small" type="password" @click.stop="handOverDeposit">确认已退款</el-button>
      </div>
      <!--银行卡-->
      <div class="cashPay" v-show="refundTypeId == 1">
        <el-button size="small" type="password" @click.stop="handOverDeposit">确认已退款</el-button>
      </div>
      <!--支付宝-->
      <div class="cashPay" v-show="refundTypeId == 3">
        <el-button size="small" type="password" @click.stop="handOverDeposit">确认已退款</el-button>
      </div>
      <!--微信-->
      <div class="cashPay" v-show="refundTypeId == 4">
        <el-button size="small" type="password" @click.stop="handOverDeposit">确认已退款</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="showRefundType = false" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <!--识别身份证中弹窗-->

    <div class="distinguishIngWrap" v-if="showCancelTime">

      <div class="distinguishIng">

        <strong>身份证识别中...</strong>

        <span>{{cancelTime}}s未识别自动关闭</span>

        <div>

          <a href="javascript:;" @click.stop="closeTimerBtn">取消</a>

        </div>

      </div>

    </div>

    <audio src="http://hly.1000da.com.cn/audio/roomstatechange.mp3" ref="messageAudio">
      您的浏览器不支持 audio 标签。
    </audio>
    <audio src="http://hly.1000da.com.cn/audio/ordervoice.mp3" ref="orderAudio">
      您的浏览器不支持 audio 标签。
    </audio>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {isPhoneNum, isCardNo} from '@/assets/js/public'
  import gusetRoomMixin from '@/assets/mixins/gusetRoomMixin'

  export default {
    computed: mapGetters([]),
    mixins: [
      gusetRoomMixin
    ],
    data() {
      var idcardPass = (rule, value, callback) => {
        if (isCardNo(value)) {
          callback();
        } else {
          callback(new Error('身份证格式有误!'));
        }
      };
      var phonePass = (rule, value, callback) => {
        if (isPhoneNum(value)) {
          callback();
        } else {
          callback(new Error('电话号码有误!'));
        }
      };
      return {
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'change'}
          ],
          idcard: [
            {validator: idcardPass, required: true}
          ],
          phone: [
            {validator: phonePass, required: true}
          ],
        },
        rules0: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'change'}
          ],
          idcard: [
            {validator: idcardPass, trigger: 'blur', required: true}
          ],
          phone: [
            {validator: phonePass, trigger: 'blur', required: true}
          ],
        },
        rules1: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          idcard: [
            {validator: idcardPass, trigger: 'blur', required: true}
          ],
          phone: [
            {validator: phonePass, trigger: 'blur', required: true}
          ],
        },
        tungNum: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < (Date.now() - 86400000);
          },
        },
        lungRadio: "1",
        floorRadio: "1",
        checked: false,
        haveUserOperation: [
          {
            value: 0,
            label: '在住信息'
          },
          {
            value: 1,
            label: '远期房态'
          },
//          {
//            value: 2,
//            label: '房价明细'
//          },
        ],//已入住操作
        roomStateIndex: 0,//房间
        checkInType: [
          {
            value: 0,
            label: '个人入住'
          },
          {
            value: 1,
            label: '企业入住'
          }
        ],
        hotelId: '',
        searchConditionObj: {},//查询条件
        sourceList: [],//客源
        conditionList: [],//房态
        custFromList: [],//订单类型
        hotelToungList: [],//栋筛选
        hotelConditionList: [],//栋数列表
        floorConditionList: [],//层数列表
        floorConditionList2: [],
        floorCondition: [],//层筛选
        options: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": "",//酒店编码
          "roomState": [],//房间状态0空净 1空脏  2住人净 3住人脏  4维修
          "custFrom": [],//0散客 1会员 2企业
          "orderFrom": [],//下单方式 0线下 1线上
          "buildNo": [],//楼栋
//          "levelNo": [],//楼层
        },
        tungIndex: 0,
        floorIndex: -1,
        floorLevel: -1,
        roomIndex: -1,
        userOrderInfo: {},
        longRoomStateList: [],//远期房态
        continuedResidenceDialog: false,
        dayNum: 1,//续住天数
        conFloor: '',//续住层
        conRoom: '',//续住房间号
        checkIndex: 0,
        inOutDate: '',
        addOrderOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//收银员编码
          "operateUserName": "",
          "pcName": "",
          "orderType": "",//0散客入住 1会员入住 2合作企业入住
          "companyID": "",//  合作企业编码/会员、散客入住填0
          "hotelID": "",//酒店编码
          "carSeats": "",//停车位数
          "fromDate": "",//开始日期  立即入住不需要填写
          "endDate": "",//预离日期
          "cardNo": "",//卡号 会员入住的时候需要填
          "name": "",//预订人姓名
          "idcard": "",//预订人身份证号
          "phone": "",//预订人手机号码
          "specialNeed": "",//特殊需求
          "roomInfoData": [],
        },
        orderType: [
          {
            value: 0,
            label: '散客入住'
          },
          {
            value: 1,
            label: '会员入住'
          },
          {
            value: 2,
            label: '合作企业入住'
          }
        ],
        showVIP: false,
        showFillInInfo: false,
        lockRoomDialog: false,//锁房弹窗
        lockFloor: '',
        lockRoom: '',
        lockRemark: '',
        selectRoomDialog: false,
        userInfo: {},
        dirtyOrClearnReason: '',
        showDirtyOrClearnReason: false,
        updateDirtyRoomObj: {},
        updateDirtyRoomId: '',
        selectInRoomList: [],//选择入住房间列表
        addInRoomList: [],//入住房间列表
        outLineOrderObj: {},//订单Obj
        showHandOverDeposit: false,//支付
        payWayList: [],//支付方式列表
        guestBillObj: {},//客人账单
        showBillDetails: false,//展示账单详情
        depositNum: '',//支付金额
        orderId: '',//订单号
        payWayId: 0,
        companyList: [],//合作企业列表
        showCompany: false,
        isState: false,
        vipPassword: '',//会员卡密码
        enterpriseId: '',//合作企业编码
        roomNum: '',//房间号
        refundTypeList: [],//退款方式列表
        showRefundType: false,
        refundTypeId: 0,//退款方式
        operType: 0,
        Newloading: false,
        isWebSocket: false,
        MessageType: -1,
        lockId: -1,
        isWebsocketclose: true
      }
    },
    beforeRouteLeave(to, from, next) {
      this.isWebsocketclose = false
      this.websocketclose()
      clearInterval(this.timer)
      next()
    },
    created() {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      if (userInfo) {
        this.userInfo = userInfo
      }
      if (sessionStorage.getItem('hotelID')) {

        this.hotelId = sessionStorage.getItem('hotelID');
      } else {
        this.$router.push({name: 'Login'})
      }
      this.options.hotelID = this.hotelId;
      this.initWebSocket()

      this.initList().then(() => {
        this.initHotelPayWay()
          .then(() => {
            this.$store.commit('hideLoading');
          })
      })
    },
    methods: {
      //取消入住房间
      cancelInPeople(obj) {
        this.addInRoomList = this.addInRoomList.filter(item => {
          if (item.roomID == obj.roomID) {
            return false
          }
          return true
        })
      },
      //
      cancelInOtherPeople(obj, index) {
        obj.otherPersonInfo = obj.otherPersonInfo.filter((item, i) => {
          if (i == index) {
            return false;
          }
          return true;
        })
      },
      initWebSocket() { //初始化weosocket
        this.Newloading = this.$loading({
          lock: true,
          text: '正在连接服务器....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const wsuri = "ws://140.143.87.152:6767/";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen() { //连接建立之后执行send方法发送数据
        this.Newloading.close();
        let actions = {
          action: "Login",
          UserName: this.userInfo.serviceName,
          SystemName: '酒店SASS',
          DataType: this.userInfo.CompanyID
        };
        this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror() {//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e) { //数据接收
        let data = JSON.parse(e.data)
        if (Number(data.resultcode) == 200) {
          //登录成功
          console.log('自己链接服务器成功')
        } else {
          //接受数据
          if (data) {
            if (data.NotifyMessage) {
              let obj = JSON.parse(data.NotifyMessage);
              this.MessageType = Number(obj.msgType);
              switch (Number(obj.msgType)) {
                case 2:
                  //订单
                  if (this.$refs.orderAudio) {
                    this.$refs.orderAudio.play()
                  }
                  break;
                case 3:

                  if (this.$refs.messageAudio) {
                    this.$refs.messageAudio.play()
                  }

                  for (let i = 0; i < this.hotelConditionList.length; i++) {
                    for (let j = 0; j < this.hotelConditionList[i].LevelList.length; j++) {
                      for (let k = 0; k < this.hotelConditionList[i].LevelList[j].RoomList.length; k++) {
                        if (this.hotelConditionList[i].LevelList[j].RoomList[k].ht_re_Id == obj.ht_re_Id) {
                          this.hotelConditionList[i].LevelList[j].RoomList[k] = obj;
                        }
                      }
                    }
                  }
                  //新的订单
                  this.initSearchCondition()
                  .then(() => {
                  })
                  break;
                case 9:

                  if (this.$refs.messageAudio) {
                    this.$refs.messageAudio.play()
                  }

                  for (let i = 0; i < this.hotelConditionList.length; i++) {
                    for (let j = 0; j < this.hotelConditionList[i].LevelList.length; j++) {
                      for (let k = 0; k < this.hotelConditionList[i].LevelList[j].RoomList.length; k++) {
                        if (this.hotelConditionList[i].LevelList[j].RoomList[k].ht_re_Id == obj.ht_re_Id) {
                          this.hotelConditionList[i].LevelList[j].RoomList[k] = obj;
                        }
                      }
                    }
                  }
                  //新的订单
                  this.initSearchCondition()
                    .then(() => {
                    })
                  break;
                case 10:

                  if (this.$refs.messageAudio) {
                    this.$refs.messageAudio.play()
                  }

                  for (let i = 0; i < this.hotelConditionList.length; i++) {
                    for (let j = 0; j < this.hotelConditionList[i].LevelList.length; j++) {
                      for (let k = 0; k < this.hotelConditionList[i].LevelList[j].RoomList.length; k++) {
                        if (this.hotelConditionList[i].LevelList[j].RoomList[k].ht_re_Id == obj.ht_re_Id) {
                          this.hotelConditionList[i].LevelList[j].RoomList[k] = obj;
                        }
                      }
                    }
                  }
                  //新的订单
                  this.initSearchCondition()
                  .then(() => {
                  })
                  break;
                case 8:
                  if (this.$refs.messageAudio) {
                    this.$refs.messageAudio.play()
                  }

                  for (let i = 0; i < this.hotelConditionList.length; i++) {
                    for (let j = 0; j < this.hotelConditionList[i].LevelList.length; j++) {
                      for (let k = 0; k < this.hotelConditionList[i].LevelList[j].RoomList.length; k++) {
                        if (this.hotelConditionList[i].LevelList[j].RoomList[k].ht_re_Id == obj.ht_re_Id) {
                          this.hotelConditionList[i].LevelList[j].RoomList[k] = obj;
                        }
                      }
                    }
                  }
                  //新的订单
                  this.initSearchCondition()
                    .then(() => {
                    })
                  break;
              }
            }
          }
        }
      },
      websocketsend(Data) {//数据发送
        this.websock.send(Data);
      },
      websocketclose(e) {  //关闭
        console.log('断开连接', e);
        if (this.isWebSocket) {
          this.initWebSocket();
          this.isWebSocket = false
        } else {
          if (this.isWebsocketclose) {
            const loading = this.$loading({
              lock: true,
              text: '正在连接服务器',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              console.log('5秒')
              this.initWebSocket();
            }, 5000)
          }
        }
      },
      //设置初始化名字
      setMainPersonInfoName() {
        this.addInRoomList[0].mainPersonInfo.name = this.addOrderOptions.name;
      },
      //设置身份证
      setMainPersonInfoIdcard() {
        this.addInRoomList[0].mainPersonInfo.idcard = this.addOrderOptions.idcard
      },
      //设置手机号
      setMainPersonInfoPhone() {
        this.addInRoomList[0].mainPersonInfo.phone = this.addOrderOptions.phone
      },
      //点击空白
      clickWhite() {
      },
      async initList() {
        await this.initSearchCondition()
        await this.initData()
      },
      //查询条件
      initSearchCondition() {
        return new Promise((relove, reject) => {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "hotelID": this.hotelId,//酒店编码
          };
          this.$store.dispatch('initSearchCondition', options)
            .then(data => {
              this.searchConditionObj = data;
              this.sourceList = data.bookWayList;
              this.conditionList = data.conditionList;
              this.custFromList = data.custFromList;


              //栋排序
              function sortTungNum(a, b) {
                return a.BuildNo - b.BuildNo
              }

              data.hotelConditionList.sort(sortTungNum);

              this.hotelToungList = data.hotelConditionList;

              //楼层排序
              function sortNumber(a, b) {
                return a.Level - b.Level;
              }

              for (let i = 0; i < data.hotelConditionList.length; i++) {
                data.hotelConditionList[i].LevelList.sort(sortNumber);
              }

              this.floorCondition = data.hotelConditionList[0].LevelList;

              relove()

            }, err => {
              this.$notify({
                message: err,
                type: 'error'
              })
              this.$store.commit('hideLoading');
            })
        })
      },
      //初始化数据
      initData() {
        this.$store.commit('showLoading');
        return new Promise((relove, reject) => {
          this.$store.dispatch('initCashierGuestRoom', this.options)
            .then(data => {

              //排序栋

              function sortTungNum(a, b) {
                return a.BuildNo - b.BuildNo
              }

              data.sort(sortTungNum);

              //排序楼层

              function sortNumber(a, b) {
                return a.Level - b.Level;
              }


              for (let i = 0; i < data.length; i++) {
                data[i].LevelList.sort(sortNumber);
              }

              //排序房间

              function sortRoomNum(a, b) {
                return a.ht_re_RoomID - b.ht_re_RoomID;
              }

              for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].LevelList.length; j++) {
                  data[i].LevelList[j].RoomList.sort(sortRoomNum)
                }
              }

              if (data[this.tungIndex]) {
                this.floorConditionList = data[this.tungIndex].LevelList;
                this.floorConditionList2 = data[this.tungIndex].LevelList;
              } else {
                this.floorConditionList = [];
                this.floorConditionList2 = [];
              }
              this.hotelConditionList = data;
              this.roomIndex = -1;
              relove()
            }, err => {
              this.$notify({
                message: err,
                type: 'error'
              })
              this.roomIndex = -1;
              this.$store.commit('hideLoading');
            })
        })
      },
      //选择房间
      changeRoom(item, i, index) {
        this.roomStateIndex = 0;
        this.conRoom = item.ht_re_RoomID;
        this.conFloor = index;
        this.tungNum = item.ht_re_BuildNo;
        this.roomNum = item.ht_re_RoomID;
        this.roomIndex = i;
        this.floorLevel = index;
        if (item.ht_re_State == 2 || item.ht_re_State == 3) {
          this.initInRoomInfo(item.ht_re_BuildNo, index, item.ht_re_RoomID);
        }
      },
      //关闭
      closeRoomOperation() {
        this.roomIndex = -1;
        this.floorLevel = -1;
        this.roomStateIndex = 0;
      },
      //筛选条件
      changeSourceList() {
        this.initData().then(() => {
          this.$store.commit('hideLoading');
        });
      },
      //筛选栋
      changeTung(item, index) {
        this.floorIndex = -1;
        this.tungIndex = index;
        this.floorCondition = this.hotelToungList[index].LevelList;
        this.tungNum = item.BuildNo;
        let arr = this.hotelConditionList.filter(ite => {
          if (ite.BuildNo == item.BuildNo) {
            return true;
          }
          return false;
        })

        this.floorConditionList = this.floorConditionList2 = (arr && arr.length) ? arr[0].LevelList : [];
        this.closeRoomOperation();
        this.initData().then(() => {
          this.$store.commit('hideLoading');
        });
      },
      //筛选层
      changeFloor(item, index) {
        this.floorIndex = index;
        this.closeRoomOperation();
        this.floorConditionList = this.floorConditionList2.filter(v => {
          if (v.Level == item.Level) {
            return true;
          }
          return false
        })
      },
      //查看已住
      changeRoomState(item, index, level) {
        this.roomStateIndex = index;
        switch (index) {
          case 0:
            this.initInRoomInfo(item.ht_re_BuildNo, level, item.ht_re_RoomID);
            break;
          case 1:
            this.initLongRoomState(item.ht_re_BuildNo, level, item.ht_re_RoomID);
            break;
          default:
            this.$notify({
              message: '该模块正在努力开发中',
              type: 'error'
            })
        }
      },
      //在住信息
      initInRoomInfo(tung, floor, room) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.hotelId,//酒店编码
          "buildNo": tung,//楼栋
          "buildLevel": floor,//楼层
          "roomID": room,//房间号
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('initHotelInRoomInfo', options)
          .then(data => {
            this.userOrderInfo = data.data;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //远期房态
      initLongRoomState(tung, floor, room) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.hotelId,//酒店编码
          "buildNo": tung,//楼栋
          "buildLevel": floor,//楼层
          "roomID": room,//房间号
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('initLongRoomState', options)
          .then(data => {
            for (let i = 0; i < data.data.length; i++) {
              let arr = data.data[i].date.split('-');
              data.data[i].year = arr[0];
              data.data[i].month = arr[1];
              data.data[i].day = arr[2];
            }
            this.longRoomStateList = data.data;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //续住
      continuedResidence() {
        this.showBillDetails = false;
        this.continuedResidenceDialog = true;
      },
      //续住提交
      continuedResidenceSubmit() {
        if (this.dayNum < 1) {
          this.$notify({
            message: '最少续住一天',
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
          "hotelID": this.hotelId,//酒店编码
          "buildNo": this.tungNum,//楼栋
          "buildLevel": this.conFloor,//楼层
          "roomID": this.conRoom,//房间号
          "goOnDay": this.dayNum,//续约天数
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('continuedResidence', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initSearchDeposit();
            this.continuedResidenceDialog = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.continuedResidenceDialog = false;
            this.$store.commit('hideLoading');
          })
      },
      //账单
      initUserOrder(item) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.hotelId,//酒店编码
          "buildNo": item.ht_re_BuildNo,//楼栋
          "buildLevel": item.ht_re_BuildLevel,//楼层
          "roomID": item.ht_re_RoomID,//房间号
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('initUserOrder', options)
          .then(data => {
            this.orderId = data.data.ht_or_OrderID;
            this.guestBillObj = data.data;
            this.showBillDetails = true;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //选择订单类型
      changeOrderType(val) {
        if (val == 1) {
          this.showVIP = true;
        } else {
          this.showVIP = false;
        }
        if (val == 2) {
          this.showCompany = true;
          this.initCooperativeEnterprise();
        } else {
          this.showCompany = false;
        }
      },
      //选择入离日期
      selectDate(val) {
        this.addOrderOptions.fromDate = val[0];
        this.addOrderOptions.endDate = val[1];
      },
      //打开入住弹窗
      openCheckIn(item) {
        this.clearGuestData();
        this.addOrderOptions.fromDate = '';
        this.addOrderOptions.endDate = '';
        this.inOutDate = '';
        this.addInRoomList = [];
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.hotelId,//酒店编码
          "buildNo": item.ht_re_BuildNo,//楼栋
          "buildLevel": item.ht_re_BuildLevel,//楼层
          "roomID": item.ht_re_RoomID,//房间号
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('searchRoomDate', options)
          .then(data => {
            if (data.ht_re_LockState == 0 && data.ht_re_State == 0 && (data.inCount == 0 || data.inCount < 0)) {
              this.addInRoomList.push({
                "buildNo": item.ht_re_BuildNo,//楼栋
                "levelNo": item.ht_re_BuildLevel,//楼层
                "roomID": item.ht_re_RoomID,//房间号
                "mainPersonInfo": {//住户信息
                  "name": "",//住户姓名
                  "idcard": "",//身份证号
                  "phone": "",//手机号码
                },
                "otherPersonInfo": [],//同来人信息
              });
              this.showFillInInfo = true;
              this.getIdCardInfo();
            } else {
              this.$notify({
                message: '该房间暂无法入住',
                type: 'error'
              })
              this.initList().then(() => {
                this.$store.commit('hideLoading');
              })
            }
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //关闭入住弹窗
      closeCheckIn() {
        this.showFillInInfo = false;
      },
      //入住选房间
      checkInSelectRoom() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.hotelId,//酒店编码
          "buildNo": [this.tungNum],//楼栋
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('initCheckInSelectRoom', options)
          .then(data => {
            //排序
            function sortNumber(a, b) {
              return a.Level - b.Level;
            }

            for (let i = 0; i < data.length; i++) {
              data[i].LevelList.sort(sortNumber);
            }
            //处理不能选择的房间
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < data[i].LevelList.length; j++) {
                data[i].LevelList[j].RoomList = data[i].LevelList[j].RoomList.filter(item => {
                  if (item.ht_re_State == 0 && item.ht_re_NeedClean == 0) {
                    item.isState = false;
                    for (let k = 0; k < this.addInRoomList.length; k++) {
                      if (item.ht_re_RoomID == this.addInRoomList[k].roomID) {
                        item.isState = true;
                      }
                    }
                    return true;
                  }
                  return false;
                })
              }
            }
            this.selectInRoomList = data[0].LevelList;
            this.selectRoomDialog = true;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //锁房
      hotelLockRoom(item) {
        if (!item.ht_re_LockState) {
          this.lockId = item.ht_re_Id;
          this.lockRoomDialog = true;
        } else {
          this.cancelLockRoom(item.ht_re_Id);
        }
      },
      //锁房提交
      hotelLockRoomConfirm() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "operType": 0,//操作(0锁房  1取消锁房)
          "hotelID": this.hotelId,//酒店编码
          "roomEntityID": this.lockId,
          "remark": this.lockRemark//锁房备注--取消锁房不填写
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('hotelLockRoomConfirm', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.roomIndex = -1;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
        this.lockRoomDialog = false;
      },
      //取消锁房
      cancelLockRoom(id) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "operType": 1,//操作(0锁房  1取消锁房)
          "hotelID": this.hotelId,//酒店编码
          "roomEntityID": id,
          "remark": ""//锁房备注--取消锁房不填写
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('cancelHotelLockRoom', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.roomIndex = -1;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //空房置脏
      updateDirtyRoom(ite, id) {
        this.dirtyOrClearnReason = "";
        this.updateDirtyRoomObj = ite;
        this.updateDirtyRoomId = id;
        this.showDirtyOrClearnReason = true;
      },
      //空房置脏提交
      updateDirtyRoomSubmit() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.hotelId,//酒店编码
          "roomID": this.updateDirtyRoomObj.ht_re_Id,//房间标识
          "managerID": this.userInfo.Id,//管理员编码
          "reason": this.dirtyOrClearnReason,//清理原因/维修原因
          "operType": this.updateDirtyRoomId,//0置脏 1维修
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('updateDirtyRoom', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.roomIndex = -1;
            this.initSearchCondition()
              .then(() => {
                this.$store.commit('hideLoading');
              })
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
        this.showDirtyOrClearnReason = false;
      },
      //维修打扫完成
      roomOperationOver(ite, id) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": this.hotelId,//酒店编码
          "roomID": ite.ht_re_Id,//房间标识
          "cleanerID": this.userInfo.Id,//清洁员编码/管理员编码
          "operType": id,//0置净 1维修
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('roomOperationOver', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.roomIndex = -1;
            this.initSearchCondition()
              .then(() => {
                this.$store.commit('hideLoading');
              })
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //选择入住房间
      changeInRoom(item, index) {
        item.isState = !item.isState;
      },
      //确认选择房间
      checkInSelectRoomSumit() {
        let arr = [];
        for (let i = 0; i < this.selectInRoomList.length; i++) {
          for (let j = 0; j < this.selectInRoomList[i].RoomList.length; j++) {
            if (this.selectInRoomList[i].RoomList[j].isState) {
              arr.push({
                "buildNo": this.selectInRoomList[i].RoomList[j].innerBuild,//楼栋
                "levelNo": this.selectInRoomList[i].RoomList[j].innerLevel,//楼层
                "roomID": this.selectInRoomList[i].RoomList[j].ht_re_RoomID,//房间号
                "mainPersonInfo": {//住户信息
                  "name": "",//住户姓名
                  "idcard": "",//身份证号
                  "phone": "",//手机号码
                },
                "otherPersonInfo": [],//同来人信息
              });
            }
          }
        }
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < this.addInRoomList.length; j++) {
            if (arr[i].roomID == this.addInRoomList[j].roomID) {
              arr[i] = this.addInRoomList[j];
            }
          }
        }
        this.addInRoomList = arr;
        this.selectRoomDialog = false;
      },
      //添加同来人
      addOtherPerson(item, index) {
        item.otherPersonInfo.push({
          "name": "",//同来人姓名
          "idcard": "",//同来人身份证号
          "phone": "",//同来人手机号码
        })
      },
      //添加订单
      addOrderConfirm() {
        if (!this.inOutDate) {
          this.$notify({
            message: '请选择入离日期',
            type: 'error'
          })
          return
        }
        if (this.addOrderOptions.orderType === '') {
          this.$notify({
            message: '请选择入住类型',
            type: 'error'
          })
          return
        }
        if (this.addOrderOptions.orderType == 1 && !this.addOrderOptions.cardNo.trim()) {
          this.$notify({
            message: '请填写会员账号',
            type: 'error'
          })
          return
        }
        var _this = this;
        this.$refs.newRuleForm0.validate((valid) => {
          if (valid) {
            if (!this.addInRoomList.length) {
              this.$notify({
                message: '请选择入住房间',
                type: 'warning'
              })
              return
            }
            for (let i = 0; i < this.addInRoomList.length; i++) {
              if (!this.addInRoomList[i].mainPersonInfo.name.trim()) {
                this.$notify({
                  message: '请确保住户姓名都以填写完整',
                  type: 'error'
                })
                return
              }
              if (!isCardNo(this.addInRoomList[i].mainPersonInfo.idcard.trim())) {
                this.$notify({
                  message: '请确保住户身份证号是否填写正确',
                  type: 'error'
                })
                return
              }
              if (!isPhoneNum(this.addInRoomList[i].mainPersonInfo.phone.trim())) {
                this.$notify({
                  message: '请确保住户手机号是否填写正确',
                  type: 'error'
                })
                return
              }
              for (let j = 0; j < this.addInRoomList[i].otherPersonInfo.length; j++) {
                if (!this.addInRoomList[i].otherPersonInfo[j].name.trim()) {
                  this.$notify({
                    message: '请确保同来人姓名都以填写完整',
                    type: 'error'
                  })
                  return
                }
                if (!isCardNo(this.addInRoomList[i].otherPersonInfo[j].idcard.trim())) {
                  this.$notify({
                    message: '请确保同来人身份证号是否填写正确',
                    type: 'error'
                  })
                  return
                }
                if (!isPhoneNum(this.addInRoomList[i].otherPersonInfo[j].phone.trim())) {
                  this.$notify({
                    message: '请确保同来人手机号是否填写正确',
                    type: 'error'
                  })
                  return
                }
              }
            }
            this.addOrderOptions.operateUserID = this.userInfo.Id;
            this.addOrderOptions.hotelID = this.hotelId;
            this.addOrderOptions.roomInfoData = this.addInRoomList;
            this.$store.commit('showLoading')
            this.$store.dispatch('outPlacingOrder', this.addOrderOptions)
              .then(data => {
                this.$notify({
                  message: data.resultcontent,
                  type: 'success'
                })
                this.initSearchCondition()
                this.outLineOrderObj = data.data;
                this.orderId = data.data.ht_or_OrderID;
                this.initSearchDeposit();
              }, err => {
                this.$notify({
                  message: err,
                  type: 'error'
                })
                this.$store.commit('hideLoading');
              })
          } else {
            this.$notify({
              message: '请输入必填项!',
              type: 'error'
            })
            return false;
          }
        })
      },
      //查询押金
      initSearchDeposit() {
        this.isState = false;
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "orderID": this.orderId,//订单编码
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('initSearchDeposit', options)
          .then(data => {
            this.depositNum = data;
            this.showFillInInfo = false;
            this.showBillDetails = false;
            this.showHandOverDeposit = true;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //清除客人资料
      clearGuestData() {
        this.addOrderOptions.orderType = "";
        this.addOrderOptions.companyID = "";
        this.addOrderOptions.hotelID = "";
        this.addOrderOptions.carSeats = "";
        this.addOrderOptions.cardNo = "";
        this.addOrderOptions.name = "";
        this.addOrderOptions.idcard = "";
        this.addOrderOptions.phone = "";
        this.addOrderOptions.specialNeed = "";
        this.showVIP = false;
        this.showCompany = false;
      },
      //支付
      handOverDeposit() {
        //押金
        if (!this.isState) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "orderID": this.orderId,//订单编码
            "payWay": this.payWayId,//支付方式0现金 1银行卡 2会员卡 3支付宝 4微信 5挂账
            "payMoney": this.depositNum,//预付款
            "memPassword": this.vipPassword,//会员卡密码  会员卡支付的时候填写
          };
          this.$store.commit('showLoading');
          this.$store.dispatch('handOverDeposit', options)
            .then(suc => {
              this.$notify({
                message: suc,
                type: 'success'
              })
              this.showHandOverDeposit = false;
              this.roomIndex = -1;
              this.$store.commit('hideLoading');
            }, err => {
              this.$notify({
                message: err,
                type: 'error'
              })
              this.$store.commit('hideLoading');
            })
        }
        //退房/结账
        else {
          this.payWayId = this.refundTypeId;
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": this.userInfo.Id,
            "operateUserName": "",
            "pcName": "",
            "hotelID": this.hotelId,//酒店编码
            "buildNo": this.tungNum,//楼栋
            "buildLevel": this.floorLevel,//楼层
            "roomID": this.roomNum,//房间号
            "payWay": this.payWayId,//支付方式0现金 1银行卡 2会员卡 3支付宝 4微信 5挂账
            "payMoney": this.depositNum,//支付金额
            "operType": this.operType,
            "memPassword": this.vipPassword,//会员密码
            "unidId": this.enterpriseId,//挂账的时候需要有合作企业码
          };
          this.$store.commit('showLoading');
          this.$store.dispatch('hotelCheckOut', options)
            .then(suc => {
              this.$notify({
                message: suc,
                type: 'success'
              })
              this.showHandOverDeposit = false;
              this.showRefundType = false;
              this.initSearchCondition()
                .then(() => {
                  this.$store.commit('hideLoading');
                })
            }, err => {
              this.$notify({
                message: err,
                type: 'error'
              })
              this.$store.commit('hideLoading');
            })
        }

      },
      //初始化支付方式
      initHotelPayWay() {
        return new Promise((relove, reject) => {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
          };
          this.$store.commit('showLoading');
          this.$store.dispatch('initHotelPayWay', options)
            .then(data => {
              this.payWayList = data;
//            this.$store.commit('hideLoading');
              relove()
            })
        })

      },
      //合作企业
      initCooperativeEnterprise() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
//          "page": "1",
//          "rows": "10",
//          "ht_ui_ID": 1,//单位信息编码
          "ht_ui_HotelID": this.hotelId,//酒店编码
//          "ht_ui_Name": "渤海明",//名称
//          "ht_ui_ConnectName": "饶",//联系人
//          "ht_ui_Phone": "18111729770",//电话
//          "ht_ui_Tel": "18111729770",//手机号
//          "ht_ui_UserCode": 1,//销售员编码
          "ht_ui_UserState": 0,//客户状态(0有效 1冻结)
//          "ht_ui_PassState": 0,//是否房价保密(0不保密  1保密)
          "ht_ui_State": 1,//审核状态(0未审核 1已审核)
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('initCooperativeEnterprise', options)
          .then(data => {
            this.companyList = data;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //结账
      settleAccounts() {
        this.payWayId = 0;
        this.vipPassword = '';
        this.isState = true;
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "orderID": this.orderId,//订单编码
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('hotelSettleAccounts', options)
          .then(data => {
            if (data >= 0) {
              this.operType = 0;
              this.showBillDetails = false;
              this.showHandOverDeposit = true;
              this.depositNum = data;
            }
            if (data == 0) {
              this.$notify({
                message: '无需退款以及补款',
                type: 'warning'
              })
            }
            if (data < 0) {
              this.operType = 1;
              this.showBillDetails = false;
              this.depositNum = data;
              if (this.guestBillObj.ht_or_OrderType > 1) {
                this.operType = 0;
                this.showHandOverDeposit = true;
              } else {
                this.initRefundType();
              }
            }
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //退款方式
      initRefundType() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": ""
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('initRefundType', options)
          .then(data => {
            this.refundTypeList = data;
            this.showRefundType = true;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      },
      //退单
      cancelOrder() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "orderNo": this.orderId,//订单号
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('hotelCancelOrder', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.showBillDetails = false;
            this.roomIndex = -1;
            this.initSearchCondition()
              .then(() => {
                this.$store.commit('hideLoading');
              })
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.$store.commit('hideLoading');
          })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.timer = setInterval(() => {
          if (this.websock) {
            this.websocketsend('来了');
          }
        }, 60000)
      })
      document.addEventListener('click', (e) => {
        this.roomIndex = -1;
      })
    }
  }
</script>
<style scoped>

  .distinguishIngWrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 10000;
  }

  .distinguishIng {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #fff;
    padding: 0 30px 10px;
    width: 300px;
    transform: translate(-150px, -50%);
  }

  .distinguishIng > strong {
    display: block;
    font: 16px/3 "微软雅黑";
    text-align: center;
    color: #3a8ee6;
  }

  .distinguishIng > span {
    display: block;
    font: 16px/2 "微软雅黑";
    text-align: center;
    color: red;
  }


  .distinguishIng > div {
    text-align: right;
    margin-top: 20px;
  }

  .distinguishIng a {
    display: inline-block;
    font: 16px/24px "微软雅黑";
    padding: 0 8px;
    background-color: #3a8ee6;
    color: #fff;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  .readCard {
    float: right;
    cursor: pointer;
    color: #409EFF;
    padding: 5px 10px;
    border: 1px solid #409EFF;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    font: 14px/1 "微软雅黑";
    margin-right: 10px;
    border-radius: 5px;
  }

  .readCard:hover {
    background-color: #409EFF;
    color: #fff;
  }

  .el-form-item {
    margin-bottom: 15px;
    margin-left: 100px;
  }

  .wrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding-bottom: 45px;
    overflow: auto;
    padding-top: 10px;
  }

  .leftRoom {
    width: 100%;
    padding-right: 225px;
  }

  .leftRoomCondition > div {
    float: left;
    width: 50%;
  }

  .leftRoomCondition {
    border-bottom: 1px solid #dfdfdf;
  }

  .leftRoomCondition strong {
    float: left;
    width: 80px;
    font: 14px/30px "微软雅黑";
    text-align: right;
    padding-right: 10px;
    color: #f6bc4c;
  }

  .leftRoomCondition ul {
    float: left;
  }

  .leftRoomCondition li {
    float: left;
    margin-right: 20px;
  }

  .hotelRoomListWrap {
    position: absolute;
    top: 50px;
    bottom: 45px;
    left: 0;
    right: 225px;
    overflow: auto;
  }

  .hotelRoomListWrap > p {
    font: 16px/2 "微软雅黑";
    color: #ccc;
    display: block;
    text-align: center;
    margin-top: 200px;
  }

  .hotelRoomList {
    margin-top: 10px;
  }

  .hotelRoomList > strong {
    display: block;
    width: 60px;
    height: 30px;
    font: 16px/30px "微软雅黑";
    background-color: #505050;
    color: #fff;
    text-align: center;
  }

  .floorRoom {
    padding-left: 20px;
  }

  .floorRoom > li {
    width: 147px;
    height: 96px;
    position: relative;
    float: left;
    margin: 10px 10px 0 0;
  }

  .floorRoom > li.active {
    z-index: 999;
  }

  .thisRoomState {
    width: 100%;
    height: 100%;
  }

  .thisRoomState > strong {
    font: 14px/2 "微软雅黑";
    color: #fff;
    display: block;
    padding: 0 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }

  .thisRoomState .lockIcon {
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    margin: -10px 0 0 -20px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/HotelBackstage/lockIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .thisRoomState.havePersonal {
    background-color: #ff5656;
  }

  .haveUserRoom {
    font: 12px/1.3 "微软雅黑";
  }

  .haveUserRoom span {
    display: block;
    text-align: center;
    color: #fff;
  }

  .haveUserRoom .userIcon {
    display: block;
    height: 40px;
    width: 33px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/HotelBackstage/guestIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .haveCleanerIcon {
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: 18px;
    height: 22px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/HotelBackstage/cleanerIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .emptyPersonal {
    background-color: #1296d7;
  }

  .emptyRoom {
    font: 20px/60px "微软雅黑";
    color: #fff;
    display: block;
    text-align: center;
  }

  .repairPersonal {
    background-color: #8f8f8f;
  }

  .repairIcon {
    display: block;
    width: 56px;
    height: 56px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/HotelBackstage/repairIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .cleanerPersonal {
    background-color: #ffbb18;
  }

  .lockPersonal {
    background-color: #505050;
  }

  .cleanerIcon {
    display: block;
    width: 38px;
    height: 42px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/HotelBackstage/cleanerIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 15px auto 0;
  }

  .noUserOperation,
  .haveUserOperation {
    position: absolute;
    bottom: 0;
    left: 0;
    -webkit-transform: translateY(100%);
    -moz-transform: translateY(100%);
    -ms-transform: translateY(100%);
    -o-transform: translateY(100%);
    transform: translateY(100%);
    background-color: #505050;
    width: 300px;
    padding: 10px;
  }

  .noUserOperation > i,
  .haveUserOperation > i {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 15px;
    height: 15px;
    background: url("http://hly.1000da.com.cn/game/closeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .noUserOperation > strong,
  .haveUserOperation > strong {
    font: 14px/18px "微软雅黑";
    color: #fff;
    padding-bottom: 10px;
    display: block;
  }

  .noUserOperation > div {
    font: 14px/30px "微软雅黑";
  }

  .noUserOperation > div > a {
    float: left;
    padding: 0 20px;
    background-color: #ffbf44;
    margin: 5px 10px;
    color: #fff;
  }

  .haveUserOperation {
    width: 450px;
    background-color: #ff6363;
    padding: 0;
  }

  .haveUserOperationNav {
    font: 12px/2 "微软雅黑";
    border-bottom: 1px solid #bda579;
    padding: 0 5px;
  }

  .haveUserOperation > strong {
    padding: 5px 20px 5px 5px;
  }

  .haveUserOperationNav > a {
    float: left;
    color: #fff;
    padding: 0 10px;
  }

  .haveUserOperationNav > a.active {
    background-color: #fff;
    color: #333;
  }

  .roomUserInfo {
    background-color: #505050;
    padding: 5px 10px;
  }

  .roomUserInfoCon img {
    float: left;
    width: 85px;
    height: 108px;
  }

  .roomUserInfoCon > div {
    float: left;
    margin-left: 14px;
    width: 330px;
    font: 12px/2 "微软雅黑";
    color: #fff;
  }

  .roomUserInfoCon > div > span {
    float: left;
    margin-right: 50px;
  }

  .roomUserInfoCon > div > .time {
    margin-right: 0;
  }

  .roomUserInfoOperation {
    margin-top: 50px;
  }

  .roomUserInfoOperation > a {
    float: right;
    font: 12px/2 "微软雅黑";
    padding: 0 8px;
    background-color: #fec24f;
    color: #fff;
    margin-right: 5px;
  }

  .roomUserInfoOperation .searchRoom {
    float: left;
    margin-right: 0;
  }

  .roomState {
    padding: 5px 10px;
    background-color: #505050;
    height: 250px;
    overflow: auto;
  }

  .roomState > li {
    float: left;
    width: 10%;
    text-align: center;
    font: 12px/1.3 "微软雅黑";
    color: #fff;
    margin-top: 5px;
  }

  .roomState > li.active > span {
    color: #ff6363;
  }

  .roomState > li > strong,
  .roomState > li > span {
    display: block;
  }

  .rightQueryCondition {
    position: absolute;
    right: 0;
    bottom: 45px;
    top: 0;
    width: 220px;
    border: 1px solid #f6bc4c;
    border-top: none;
    border-right: none;
    overflow-y: auto;
  }

  .rightQueryCondition > strong {
    font: 16px/2 "微软雅黑";
    background-color: #f6bc4c;
    color: #fff;
    text-align: center;
    display: block;
  }

  .roomNumSearch,
  .searchRoomState,
  .searchRoomType {
    padding: 10px;
    border-bottom: 1px solid #f6bc4c;
  }

  .searchRoomType:last-of-type {
    border-bottom: none;
  }

  .roomNumSearch > strong,
  .searchRoomState > strong,
  .searchRoomType > strong {
    display: block;
    text-align: center;
    font: 13px/1.5 "微软雅黑";
    color: #f6bc4c;
    margin-bottom: 5px;
  }

  .searchRoomType > strong span {
    color: #808080;
  }

  .roomNumSearch > div {
    border: 1px solid #808080;
    overflow: hidden;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    width: 182px;
    margin: 0 auto;
  }

  .roomNumSearch input {
    border: none;
    padding: 0 5px;
    float: left;
    font: 12px/2 "微软雅黑";
    width: 150px;
    border-right: 1px solid #808080;
  }

  .roomNumSearch div div {
    width: 30px;
    height: 24px;
    float: left;
    cursor: pointer;
  }

  .roomNumSearch i {
    margin: 5px;
  }

  .roomStateList > li {
    float: left;
    width: 50%;
  }

  footer {
    position: absolute;
    bottom: 10px;
    left: 0;
  }

  footer .roomData {
    float: left;
    padding-left: 20px;
  }

  footer .roomData div {
    float: left;
    margin-right: 10px;
    font: 12px/2 "微软雅黑";
    border: 1px solid #ececed;
    padding: 0 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  footer .roomData div:last-of-type {
    margin-right: 0;
  }

  footer .roomData div > i {
    float: left;
    height: 15px;
    width: 15px;
    margin-top: 4px;
    margin-right: 8px;
  }

  footer .roomData div > strong {
    float: left;
    font: 12px/1.8 "微软雅黑";
  }

  .allRoom {
    color: #fec24f;
  }

  .hotelEmptyRoom {
    color: #4f81bd;
  }

  .hotelEmptyRoom > i {
    background-color: #4f81bd;
  }

  .havePeRoom {
    color: #ff0000;
  }

  .havePeRoom > i {
    background-color: #ff0000;
  }

  .repairRoom {
    color: #7f7f7f;
  }

  .repairRoom > i {
    background-color: #7f7f7f;
  }

  footer .roomData .nowOccupancyRate {
    border: 0;
    color: #008000;
  }

  .tungFloorList > li {
    float: left;
    width: 85px;
    margin-right: 10px;
    text-align: center;
    font: 14px/2 "微软雅黑";
    margin-top: 10px;
    cursor: pointer;
    color: #333;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .tungFloorList > li:nth-of-type(2n) {
    margin-right: 0;
  }

  .tungFloorList > li.active {
    color: #fff;
    background-color: #409EFF;
  }

  .checkInWindow {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    padding: 30px 0;
    z-index: 1000;
    overflow: auto;
  }

  .checkInWindowBox {
    margin: 0 auto;
    width: 1000px;
    background-color: #fff;
    position: relative;
    overflow: hidden;
  }

  .checkIntitle {
    background-color: #1296d7;
    font: 16px/34px "微软雅黑";
    text-align: center;
    color: #fff;
  }

  .checkIntitle > i {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 15px;
    height: 15px;
    background: url("http://hly.1000da.com.cn/game/closeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .checkInNav {
    padding: 10px 60px;
    font: 12px/38px "微软雅黑";
  }

  .checkInNav > a {
    float: left;
    width: 430px;
    text-align: center;
    color: #444;
    background-color: #eee;
    margin-right: 20px;
  }

  .checkInNav > a.active {
    background-color: #f6bc4c;
  }

  .checkInNav > a:last-of-type {
    margin-right: 0;
  }

  .personalCheckIn {
    padding: 20px;
  }

  .personalInfo > img {
    width: 144px;
    float: left;
  }

  .personalInputInfo {
    overflow: hidden;
  }

  .personalInputInfo > div {
    float: left;
    width: 100%;
    margin-left: 20px;
  }

  .personalInputInfo > div > div {
    float: left;
    width: 50%;
    margin-top: 20px;
    color: #333;
  }

  .personalInputInfo > div > div:last-of-type {
    width: 100%;
  }

  .personalCheckInOrder {
    margin-top: 20px;
  }

  .personalCheckInOrder > strong {
    display: block;
    text-align: center;
    font: 16px/2 "微软雅黑";
    color: #666;
  }

  .addRoomBtn {
    margin: 10px 0;
  }

  .inUserInfo > li > p {
    font: 15px/2 "微软雅黑";
    padding-bottom: 10px;
    color: #333;
  }

  .inUserInfoContent {
    padding-left: 20px;
  }

  .inUserInfoContent > div {
    margin-bottom: 10px;
  }

  .inUserInfoContent > div:last-of-type {
    margin-bottom: 0;
  }

  .inUserInfo > li {
    float: left;
    width: 50%;
    margin-bottom: 20px;
  }

  .inUserInfo > li:last-of-type {
    margin-bottom: 0;
  }

  .inUserInfo > li > div {
    margin-bottom: 10px;
    padding-left: 20px;
  }

  .inUserInfo > li > div > span {
    font: 14px/2 "微软雅黑";
    margin-right: 10px;
    color: #333;
  }

  .inUserInfo > li .sameWith {
    margin-bottom: 0;
  }

  .sameWith > strong {
    display: block;
    font: 15px/2 "微软雅黑";
    color: #333;
  }

  .sameWithList {
    padding-left: 20px;

  }

  .sameWithList > li {
    margin-bottom: 20px;
  }

  .sameWithList > li:last-of-type {
    margin-bottom: 0;
  }

  .sameWithList > li > div {
    margin-bottom: 10px;
  }

  .sameWithList > li > div > span {
    font: 14px/2 "微软雅黑";
    margin-right: 10px;
    color: #333;
  }

  .selectRoomListWrap > strong {
    display: block;
    font: 17px/2 "微软雅黑";
    color: #333;
    padding-bottom: 20px;
  }

  .selectRoomList {
    padding-left: 20px;
    margin-bottom: 10px;
  }

  .selectRoomList > dt {
    display: block;
    width: 60px;
    font: 15px/2 "微软雅黑";
    background-color: #505050;
    color: #fff;
    text-align: center;
  }

  .selectRoomList > dd {
    float: left;
    padding: 0 40px;
    border: 1px solid #ccc;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    font: 16px/2.5 "微软雅黑";
    color: #333;
    margin: 10px 0 0 10px;
    cursor: pointer;
  }

  .selectRoomList > dd.active {
    background-color: #409EFF;
    border-color: #409EFF;
    color: #fff;
  }

  .addOrderConfirm {
    margin-top: 10px;
    text-align: right;
  }

  .billDetails > .bill {
    float: left;
    width: 370px;
  }

  .billDetails > .bill > .billInfo > img {
    float: left;
    width: 100px;
    height: 125px;
    margin-right: 20px;
  }

  .billInfoCon {
    float: left;
  }

  .billInfoCon > li {
    width: 250px;
    font: 14px/20px "微软雅黑";
    padding: 5px 0;
    color: #333;
  }

  .billInfoCon > li strong {
    float: left;
    margin-right: 10px;
  }

  .billInfoCon > li div {
    overflow: hidden;
  }

  .billInfoCon > li span {
    float: left;
    width: 100%;
  }

  .billDetails > .roomDetails {
    float: left;
    width: 790px;
    padding-left: 20px;
  }

  .connectingRoom {
    margin-top: 10px;
    font: 14px/2 "微软雅黑";
  }

  .connectingRoom > dt {
    background-color: rgb(86, 86, 86);
    color: #fff;
  }

  .connectingRoom > dt strong,
  .connectingRoom > dd strong {
    float: left;
    padding-left: 5px;
    width: 80px;
  }

  .connectingRoom > dt span,
  .connectingRoom > dd span {
    float: left;
    padding-left: 5px;
    width: 100px;
  }

  .connectingRoom > dt em,
  .connectingRoom > dd em {
    float: left;
    padding-left: 5px;
    width: 180px;
  }

  .connectingRoom > dd {
    border-bottom: 1px solid #ccc;
  }

  .aboutRoomMoney > strong {
    display: block;
    font: bold 16px/2 "微软雅黑";
    color: #666;
  }

  .aboutRoomMoney > div {
    font: 14px/2 "微软雅黑";
  }

  .aboutRoomMoney > div > strong {
    float: left;
    width: 50%;
  }

  .aboutRoomMoney > div > span {
    float: left;
    width: 50%;
  }

  .cashPay,
  .toSettleAccounts {
    text-align: center;
    margin-top: 30px;
  }

  .weChatPay {
    margin-top: 30px;
  }

  .weChatPay > p {
    font: 14px/2 "微软雅黑";
    color: #666;
    text-align: center;
  }

  .weChatPay > .qrCode {
    width: 220px;
    height: 220px;
    padding: 9px;
    border: 1px solid #666;
    margin: 10px auto 0;
  }

  .changePayWay {
    padding-bottom: 20px;
  }

  .VIPPay {
    margin-top: 20px;
  }

  .VIPPay > span {
    margin-right: 10px;
    line-height: 24px;
  }

  .billInfoList {
    padding-left: 20px;
    float: left;
    width: 100%;
  }

  .billInfoList dt {
    position: relative;
    padding-left: 10px;
  }

  .billInfoList dt:before {
    content: '';
    position: absolute;
    top: 6px;
    left: 0;
    width: 3px;
    height: 16px;
    background-color: red;
  }

  .billInfoList > dd > strong {
    float: left;
    width: 100px;
  }

  .billInfoList > dd > span {
    float: left;
    width: 250px;
  }

</style>
