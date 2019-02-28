<<<<<<< HEAD
<template>
  <div>
    <div class="container clearfix">
      <div class="containerLeft">
        <div class="headImg"></div>
        <div class="turnBack" @click="turnBack">回到主页</div>
      </div>
      <div class="content">
        <div class="contentBox">
          <!--顶部-->
          <header>
            <ul class="navList clearfix">
              <!--导航-->
              <li :class="{navActive:navActiveIndex==index}" v-for="item,index in navList"
                  @click.stop="clickNavList(item,index)">
                <div class="navImgBox"></div>
                <div>{{item.name}}</div>
              </li>
              <!--人-->
              <div class="peopleRight clearfix">
                <div class="peopleBox">
                  <span>小王</span>
                  <i></i>
                </div>
                <ul class="funcIcon clearfix">
                  <li>一</li>
                  <li>口</li>
                  <li>X</li>
                </ul>
              </div>
            </ul>
          </header>
          <!--内容-->
          <section class="clearfix">
            <div class="sessionLeft">
              <!--栋选项卡-->
              <ul class="sectionNav clearfix">
                <li v-for="item,index in sectionNavList" :class="{sectionNavActive:sectionNavIndex==index}"
                    @click="clickSectionNav(item,index)">
                  <div class="cansleX">X</div>
                  <span>{{item.BuildNo}}栋</span>
                </li>
              </ul>
              <div class="sessionLeftContentBox">
                <!--客源-->
                <ul class="roomType clearfix">
                  <li class="clearfix">
                    <!--筛选条件名称-->
                    <div class="roomTypeHeadName">客源:</div>
                    <!--筛选具体项目名称-->
                    <ul class="roomTypeDetail clearfix">
                      <div style="margin: 1px 0;"></div>
                      <el-checkbox-group v-model="checkedKeYuanData" @change="handleCheckedKeYuanChange">
                        <el-checkbox v-for="keYuan in newKeYuanList" :key="keYuan.wayID" :label="keYuan" >{{keYuan.wayName}}({{keYuan.bookFromCount}})</el-checkbox>
                      </el-checkbox-group>
                    </ul>
                  </li>
                  <li class="clearfix">
                    <!--筛选条件名称-->
                    <div class="roomTypeHeadName">入住渠道:</div>
                    <!--筛选具体项目名称-->
                    <ul class="roomTypeDetail clearfix">
                      <div style="margin: 1px 0;"></div>
                      <el-checkbox-group v-model="checkedGoRoomWay" @change="handleCheckedGoRoomWayChange">
                        <el-checkbox v-for="goRoomWay in newGoRoomWayList":key="goRoomWay.memberID" :label="goRoomWay" >{{goRoomWay.memberName}}({{goRoomWay.fromCount}})</el-checkbox>
                      </el-checkbox-group>
                    </ul>
                  </li>
                </ul>
                <!--具体房间信息-->
                <div class="roomDetailContentBox">
                  <div class="roomDetailContent">
                    <ul class="allRoomIfoUL">
                      <li v-for="itemRoomInfo,indexRoomInfo in roomStatesList">
                        <!--楼层-->
                        <div class="marktBox">{{itemRoomInfo.Level}}</div>
                        <!--房间4种状况-->
                        <ul class="roomIfoUL clearfix"
                            :class="{clickRoomBaseClassHeight:clickRoomBaseClassHeight==indexRoomInfo && clickRoomBaseClassState==2}">
                          <li
                            :class="[{roomActive0: itemRoomList.ht_re_State==0},{roomActive1: itemRoomList.ht_re_State==1},{roomActive2: itemRoomList.ht_re_State==2},{roomActive3: itemRoomList.ht_re_State==3},{roomActive4: itemRoomList.ht_re_State==4},]"
                            @click.stop="clickRoom(itemRoomInfo,indexRoomInfo,itemRoomList,indexRoomList)"
                            class="roomIfoLi"
                            v-for="itemRoomList,indexRoomList in itemRoomInfo.RoomList">
                            <h1>
                              <div>
                                {{itemRoomList.ht_re_HouseNumber}}
                                {{itemRoomList.roomTypeName}}
                              </div>
                            </h1>
                            <div v-show="itemRoomList.ht_re_State==0">
                              <h3>空</h3>
                            </div>
                            <div v-show="itemRoomList.ht_re_State==1">
                              <h3>空</h3>
                              <div class="broomImgBox"></div>
                            </div>
                            <div v-show="itemRoomList.ht_re_State==2">
                              <h2>{{itemRoomList.bookName}}</h2>
                              <div class="roomPeopleImg"></div>
                            </div>
                            <div v-show="itemRoomList.ht_re_State==3">
                              <h2>{{itemRoomList.bookName}}</h2>
                              <div class="roomPeopleImg"></div>
                              <div class="broomImgBox"></div>
                            </div>
                            <div v-show="itemRoomList.ht_re_State==4">
                              <div class="maintainImgBox"></div>
                            </div>
                            <!--入住-->
                            <div
                              v-show="
                              indexRoomInfo == pIndex && indexRoomList == cIndex && (itemRoomList.ht_re_State==0|| itemRoomList.ht_re_State==1 || itemRoomList.ht_re_State==4)"
                              class="clickRoomClass">
                              <ul class="roomTypeList clearfix">
                                <li @click.stop="clickGoRoom">入住</li>
                                <li>锁房</li>
                                <li>...</li>

                                <!--                              <li @click="clickRoomTypeList(item,index)" v-for="item,index in roomTypeDetailList">
                                                                {{item.name}}
                                                              </li>-->

                              </ul>
                              <div class="otherRoomType">
                                <div>
                                  <h1>维修</h1>
                                  <h1>脏房</h1>
                                  <h1>预定</h1>
                                </div>
                                <div></div>
                              </div>
                              <div class="roomIsShowX" @click.stop="roomIsShowX">X</div>
                            </div>
                            <!--在住信息Box-->
                            <!--<div v-show="onlineInfo&&itemRoomList.ht_re_State==2" class="clickRoomBaseClass">-->
                            <div
                              v-show="indexRoomInfo == pIndex && indexRoomList == cIndex && (itemRoomList.ht_re_State==2||itemRoomList.ht_re_State==3)"
                              class="clickRoomBaseClass">
                              <div>
                                <h1>{{itemRoomList.ht_re_HouseNumber}}{{itemRoomList.roomTypeName}}</h1>
                                <ul class="clearfix">
                                  <li :class="{onGoRoomInfoActive:onGoRoomInfoIndex ==index}"
                                      v-for="item,index in onGoRoomInfoList"
                                      @click.stop="clickOnGoRoomInfo(item,index)">{{item.name}}
                                  </li>
                                </ul>
                                <div @click.stop="clickCansleXOnlineInfo">X</div>
                              </div>
                              <!--在住信息-->
                              <div v-show="onGoRoomInfoIsShow" class="onRoomInfo clearfix">
                                <div></div>
                                <div>
                                  <h1>
                                    抵/离时间 : 2018/11/29 04:41 - 2018/11/29 12:00
                                  </h1>
                                  <h1>
                                    天数 : 1
                                    <span>房价 : 278.00</span>
                                  </h1>
                                  <h1>
                                    收款 : 278.00
                                  </h1>
                                </div>
                                <ul>
                                  <li @click.stop="clickAccountBox">账单</li>
                                  <li>续住</li>
                                  <li>换房</li>
                                  <li>改房</li>
                                  <li>改价</li>
                                  <li>...</li>
                                </ul>
                              </div>
                              <!--远期房态-->
                              <div v-show="farAwayRoomStateIsShow" class="farAwayRoomState clearfix">
                                <ul class="farAayRoomStateCon">
                                  <li v-for="item,index in 20">
                                    <h1>12/06</h1>
                                    <h1>空</h1>
                                  </li>
                                </ul>
                              </div>
                              <!--房价明细-->
                              <div v-show="roomPriceDetailIsShow" class="roomPriceDetail clearfix">
                                <ul class="clearfix">
                                  <li>日期</li>
                                  <li>房价</li>
                                </ul>
                                <ul class="clearfix">
                                  <li>2018/12/06</li>
                                  <li>120.00</li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
            <div class="sessionRight">
              <div class="states">营业实况/房间检索</div>
              <div class="roomCard">房卡查询</div>
              <!--房号/姓名搜索-->
              <div class="searchBox clearfix">
                <input type="text" placeholder="房号/姓名">
                <div class="searchImg">
                  <div></div>
                </div>
              </div>
              <div class="divLine"></div>
              <div class="roomStateContent">
                <ul>
                  <!--房态-->
                  <li >
                    <h1>房态</h1>
                    <div>
                      <el-checkbox :indeterminate="isIndeterminateRoomTai" v-model="checkAllRoomState" @change="handleCheckAllChangeRoomState">全选</el-checkbox>
                      <div style="margin: 15px 0;"></div>
                      <el-checkbox-group v-model="checkedRoomStateData" @change="handleCheckedRoomStateChange">
                        <el-checkbox v-for="roomTai in roomTaiList" :key="roomTai.roomStateID" :label="roomTai" >{{roomTai.roomStateName}}({{roomTai.stateCount}})</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </li>
                  <!--楼栋-->
                  <li >
                    <h1>楼栋<span>(总房数/空房数)</span></h1>
                    <div>
                      <el-radio-group v-model="louDongModel">
                        <el-radio
                          :label="itemLouDong"
                          :key="indexLouDong"
                          v-for="itemLouDong,indexLouDong in louDongList"
                          @change="changeLouDong(itemLouDong,indexLouDong)"
                        >
                          {{itemLouDong.BuildNo}}({{itemLouDong.BuildRoomCount}}/{{itemLouDong.BuildRoomCount-itemLouDong.BuildPersonCount}})&nbsp&nbsp
                        </el-radio>
                      </el-radio-group>
                    </div>
                  </li>
                  <!--楼层-->
                  <li >
                    <h1>楼层<span>(总层数/空房数)</span></h1>
                    <div>
                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                      <div style="margin: 15px 0;"></div>
                      <el-checkbox-group v-model="checkedLouCengData" @change="handleCheckedLouCengChange">
                        <el-checkbox v-for="louCeng in newLouCengList" :label="louCeng" :key="louCeng">{{louCeng}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
            <!--底部房间信息-->
            <div class="roomDetailBottom">
              <ul>
                <li>
                  <div>
                    <div></div>
                    <div>全部</div>
                    <strong></strong>
                    <span>({{allRoom}})</span>
                  </div>
                </li>
                <li>
                  <div>
                    <div></div>
                    <div>空房</div>
                    <strong></strong>
                    <span>({{emptyRoomCount}})</span>
                  </div>
                </li>
                <li>
                  <div>
                    <div></div>
                    <div>住人</div>
                    <strong></strong>
                    <span>({{personRoomCount}})</span>
                  </div>
                </li>
                <li>
                  <div>
                    <div></div>
                    <div>维修</div>
                    <strong></strong>
                    <span>({{mendRoomCount}})</span>
                  </div>
                </li>
              </ul>
              <div class="currentOccupancy">当前入住率 : {{inFate}}%</div>
            </div>
          </section>
          <!--底部-->
          <footer class="clearfix">
            <div class="clearfix">
              <div @click="stageHelper" class="clearfix">
                <div class="phoneImg"></div>
                <span>前台助手</span>
              </div>
              <div @click="clickMessage" class="clearfix">
                <div class="messageImg"></div>
                <span>消息</span>
                <div class="liu">6</div>
              </div>
            </div>
          </footer>
          <!--入住-->
          <div class="goRoomBoxBig" v-show="goRoomBoxIsShow">
            <!--遮罩-->
            <div class="goRoomBoxShade"></div>
            <div class="goRoomBox">
              <!--头部-->
              <div class="goRoomBoxTitle">
                <span>入住</span>
                <div></div>
              </div>
              <div class="goRoomBoxTab clearfix">
                <div @click="clickgoRoomName(item,index)" :class="{goRoomNameActive: goRoomNameIndex==index}"
                     v-for="item,index in goRoomName">{{item.name}}
                </div>
              </div>
              <!--入住内容1-->
              <div class="goRoomBoxContent" v-show="personageGoRoom">
                <div class="peopleContentBox clearfix">
                  <!--左-->
                  <div class="peopleContentBoxLeft"></div>
                  <!--右-->
                  <div class="peopleContentBoxRight clearfix">
                    <!--右上盒子-->
                    <div class="formInputBox clearfix">
                      <div class="goRoomBoxInput">
                        <span>姓名:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                      <div class="goRoomBoxInput">
                        <span>证件类型:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                      <div class="goRoomBoxInput">
                        <span>证件号:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                      <div class="goRoomBoxInput">
                        <span>电话:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                    </div>
                    <!--清除客人资料-->
                    <div class="clearGuestInfo">清除客人资料</div>
                  </div>
                </div>
                <!--订单信息-->
                <div class="orderIfo clearfix">
                  <div></div>
                  <div>订单信息</div>
                  <div></div>
                </div>
                <!--日期选择-->
                <div class="dateChoise">
                  <!--天数-->
                  <div class="days">
                    <span>天数 : </span>
                    <input type="number">
                    <span>*</span>
                  </div>
                  离开日期:
                  <!--离开日期-->
                  <el-date-picker
                    v-model="value1"
                    height="25px"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>

                </div>
                <!--订单信息-->
                <div class="orderIfo clearfix">
                  <div></div>
                  <div>订单信息</div>
                  <div></div>
                </div>
                <!--table-->
                <div class="tableBox">
                  <el-table
                    ref="multipleTable"
                    :data="null"
                    tooltip-effect="dark"
                    style="width: 100%"
                  >
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      label="房号"
                      width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="房型"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="房价"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="姓名"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="证件号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="手机号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="操作"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>

                </div>
                <!--合计-->
                <div class="heji">
                  <span>合计<i>1</i>房间</span>
                  <span>选中<i>1</i>房间</span>
                </div>
                <!--选房-->
                <ul class="choiceRoom clearfix">
                  <li>选房</li>
                  <li>改价</li>
                </ul>
                <!--入住-->
                <ul class="goRoomAndCansle">
                  <li @click="clickGoRoomBox">入住</li>
                  <li @click="clickGoRoomBoxCansle">取消</li>
                </ul>
              </div>
              <!--入住内容2-->
              <div class="goRoomBoxContent" v-show="enterpriseGoRoom">
                <div class="peopleContentBox clearfix">
                  <!--左-->
                  <div class="peopleContentBoxLeft"></div>
                  <!--右-->
                  <div class="peopleContentBoxRight clearfix">
                    <!--右上盒子-->
                    <div class="formInputBox clearfix">
                      <div class="goRoomBoxInput">
                        <span>企业名称:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                      <div class="goRoomBoxInput">
                        <span>手机号:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                    </div>
                    <!--清除客人资料-->
                    <div class="clearGuestInfo">清除客人资料</div>
                  </div>
                </div>
                <!--订单信息-->
                <div class="orderIfo clearfix">
                  <div></div>
                  <div>订单信息</div>
                  <div></div>
                </div>
                <!--日期选择-->
                <div class="dateChoise">
                  <!--天数-->
                  <div class="days">
                    <span>天数 : </span>
                    <input type="number">
                    <span>*</span>
                  </div>
                  离开日期:
                  <!--离开日期-->
                  <el-date-picker
                    v-model="value1"
                    height="25px"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>

                </div>
                <!--订单信息-->
                <div class="orderIfo clearfix">
                  <div></div>
                  <div>订单信息</div>
                  <div></div>
                </div>
                <!--table-->
                <div class="tableBox">
                  <el-table
                    ref="multipleTable"
                    :data="null"
                    tooltip-effect="dark"
                    style="width: 100%"
                  >
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      label="房号"
                      width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="房型"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="房价"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="姓名"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="手机号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="操作"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>

                </div>
                <!--合计-->
                <div class="heji">
                  <span>合计<i>1</i>房间</span>
                  <span>选中<i>1</i>房间</span>
                </div>
                <!--选房-->
                <ul class="choiceRoom clearfix">
                  <li>选房</li>
                  <li>改价</li>
                </ul>
                <!--入住-->
                <ul class="goRoomAndCansle">
                  <li>入住</li>
                  <li>取消</li>
                </ul>
              </div>
              <!--入住窗口-->
              <div v-show="goRoomBoxLittleBoxIsTrue">
                <div class="goRoomBoxLittleBoxShade"></div>
                <div class="goRoomBoxLittleBox">
                  <h1>选房间</h1>
                  <div class="goRoomBoxLittleBoxCon">
                    <h1>
                      <input type="radio">
                      <span>按房型</span>
                    </h1>
                    <div class="clearfix">
                      <div class="goRoomBoxLittleBoxConLeft">
                        <div>房型</div>
                        <ul>
                          <li v-for="item,index in roomTypeChoiceList">{{item.name}}</li>
                        </ul>
                      </div>
                      <div class="goRoomBoxLittleBoxConRight">
                        <ul class="goRoomBoxLittleBoxConRightTitle clearfix">
                          <li v-for="item,index in loudongList">{{item.name}}</li>
                        </ul>
                        <ul class="goRoomBoxLittleBoxConRightCon">
                          <li v-for="item,index in 3" class="clearfix">
                            <div>1</div>
                            <div>2</div>
                            <div><input type="checkbox"></div>
                            <ul>
                              <li>201</li>
                              <li>202</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h2>已选房间</h2>
                    <div class="choicedRoomContent">
                      <ul class="clearfix">
                        <li>房型</li>
                        <li>数量</li>
                        <li>房号</li>
                      </ul>
                      <div>
                        <div class="clearfix" v-for="item,index in roomTypeConList">
                          <div>{{item.name}}</div>
                          <div>{{item.num}}</div>
                          <div>
                            <div>{{item.roomNumber}}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="goRoomBoxLittleBoxBot">
                    <div><span>已选合计 <span>8</span> 间</span></div>
                    <ul class="clearfix">
                      <li @click="clickGoRoomSure">确定</li>
                      <li @click="clickGoRoomCansle">取消</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--账单信息-->
          <div class="accountInfoBox" v-show="accountInfoIsShow">
            <!--遮罩-->
            <div class="accountInfoShade"></div>
            <div class="accountInfo">
              <!--账单信息头部-->
              <div class="accountInfoTitle">
                <span>账单信息</span>
                <div @click="clickAccountInfoFalse"></div>
              </div>
              <!--账单信息内容-->
              <div class="accountInfoContent clearfix">
                <!--账单信息内容左-->
                <div class="accountInfoContentLeft">
                  <!--账单信息人信息-->
                  <div class="accountInfoContentLeftPeopleInfo">
                    <div class="peopleBoxContent clearfix">
                      <div class="peopleBoxContentLeft"></div>
                      <div class="peopleBoxContentRight">
                        <h1>501</h1>
                        <h1>普通大房</h1>
                        <h1>王小容</h1>
                      </div>
                    </div>
                    <div class="roomPriceBox">
                      <h1>房价 : 120.00</h1>
                      <h1>抵离 : 18/12/06-18/12/04</h1>
                      <h1>王小容</h1>
                    </div>
                  </div>
                  <!--账单信息的房号-->
                  <div class="roomNumber">
                    <ul class="roomNumberTitle clearfix">
                      <li>房号</li>
                      <li>姓名</li>
                      <li>入住时间</li>
                    </ul>
                    <ul class="roomNumberContent clearfix">
                      <li class="clearfix">
                        <div>407</div>
                        <div>555</div>
                        <div>18/12/06 09:59</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--账单信息内容右-->
                <div class="accountInfoContentRight">
                  <!--结账-->
                  <div class="costAccount">结账</div>
                  <!--总计Box-->
                  <div class='AllMoney clearfix'>
                    <div class="AllMoneyLeft">
                      <h1>总计 :</h1>
                      <h1>应收120.00</h1>
                    </div>
                    <div class="AllMoneyRight">
                      <h1>房费 : 120.00</h1>
                      <h1>押金 : 120.00</h1>
                      <h1>其他消费 : 0</h1>
                    </div>
                  </div>
                  <!--总数-->
                  <div class="allNumber clearfix">
                    <span>总数 : 1</span>
                    <span>选中数 : 1</span>
                  </div>
                  <!--显示-->
                  <div class="displayBox">
                    <div class="displayBoxInfo">显示当前消费信息</div>
                    <el-table
                      ref="multipleTable"
                      :data="null"
                      tooltip-effect="dark"
                      style="width: 100%"
                    >
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        label="消费时间"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="营业项目"
                        width="120">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="类型"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="业务详情"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="状态"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="数量"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="金额"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="属性"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="房号"
                        show-overflow-tooltip>
                      </el-table-column>
                    </el-table>

                  </div>

                </div>
              </div>
              <!--结账方式选择-->
              <div class="payWayChoice" v-show="payWayChoiceIsShow">
                <h1>结账方式选择</h1>
                <!--结账方式选择内容-->
                <ul class="payWayChoiceContent">
                  <li>
                    <div class="payWayChoiceName">收款方式:</div>
                    <div class="payWayChoiceInput">
                      <input type="radio">
                      <span>现金</span>
                      <input type="radio">
                      <span>惠乐游app</span>
                      <input type="radio">
                      <span>支付宝</span>
                      <input type="radio">
                      <span>微信</span>
                    </div>
                  </li>
                  <li>
                    <div class="payWayChoiceName">收款金额:</div>
                    <div class="payWayChoiceInput">
                      <input type="number" placeholder="13.00">
                    </div>
                  </li>
                  <li>
                    <div class="payWayChoiceName">备注:</div>
                    <div class="payWayChoiceInput">
                      <input type="text">
                    </div>
                  </li>
                </ul>
                <!--结账方式选择底部-->
                <ul class="payWayChoiceFoot clearfix">
                  <li @click="payWayChoiceSure">确定</li>
                  <li @click="payWayChoiceCansle">取消</li>
                </ul>
              </div>
            </div>
          </div>
          <!--收银助手-->
          <div class="cashierAssistant" v-show="cashierAssistantIsShow">
            <div class="cashierAssistantTitle">收银助手</div>
            <div class="cashierAssistantContent">
              <ul class="clearfix">
                <li v-for="item,index in cashierAssistantList" @click="clickCashierAssistantName(item,index)"
                    :class="{cashierAssistantLiActive:cashierAssistantLiIndex==index}">
                  <div>
                    <div>
                      <div :class="{cashierAssistantImgActive:cashierAssistantLiIndex==index}"></div>
                    </div>
                    <h1>{{item.name}}</h1>
                  </div>
                </li>
              </ul>
              <div></div>
              <div>
                <textarea type="text" placeholder="请输入你的..."></textarea>
              </div>
              <div @click="send">发送</div>
            </div>
          </div>
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
          <!--订单-->
          <div class="orderBox" v-show="false">
          </div>
          <!--消息-->
          <div class="messageBox" v-show="messageBoxIsTrue">
            <div>
              <ul class="clearfix">
                <li :class="{clickMassageNavActive:clickMassageNavIndex == index}" @click="clickMassageNav(item,index)"
                    v-for="item,index in messageList">{{item.name}}
                </li>
              </ul>
            </div>
            <ul>
              <li class="messageCont" v-for="item,index in messageContList">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    conputed: mapGetters([
      'initCashierDeskList',//初始化数据
      'cashierDeskConditionSearchList',//收银员根据条件查询房列表
      'homeSearchConditionList',//首页查询条件列表
    ]),
    data() {
      return {
        louDongIndex:0,//楼栋index
        hotelID:4,//酒店编码
        roomState:[],//房态
        custFrom:[],//入住渠道
        orderFrom:[],//客源
        buildNo:[],//栋数
        levelNo:[],//楼层
        allLevelNo:[],//全选楼层
        louDongModel: 0,
        checkAll: false,//楼层全选
        checkAllRoomState: false,//房态全选
        checkAllKeYuan: false,//客源全选
        checkAllGoRoomWay: false,//入住渠道全选
        checkedLouCengData: [],//楼层选中数据
        checkedRoomStateData: [],//房态选中数据
        checkedKeYuanData: [],//客源选中数据
        checkedGoRoomWay: [],//入住渠道选中数据
        newLouCengList: [],//新的楼层数组
        newRoomTaiList: [],//新的房态数组
        newKeYuanList: [],//新的客源数组
        newGoRoomWayList: [],//新的入住渠道数组
        keYuanList: [],//客源数组
        isIndeterminate: true,//楼层是否全选
        isIndeterminateRoomTai: true,//房态是否全选
        isIndeterminateKeYuan: true,//客源是否全选
        isIndeterminateGoRoomWay: true,//入住渠道是否全选
        louDongChecked:-1,//选择楼栋
        louCengChecked:-1,//选择楼层
        louDongList:[],//楼栋列表
        louCengList:[],//楼层列表
        pIndex: -1,
        cIndex: -1,
        isShow: false,
        clickRoomBaseClassHeight: -1,//在住信息Box高度是否改变
        clickRoomBaseClassState: -1,
        passengerSourceList: [],//客源列表
        InChannelList: [],//入住渠道列表
        roomTypeChoiseList: [],//房间类型选择条件列表
        roomTaiList: [],//房态
        sectionNavIndex: 0,//默认选中第一栋
        inFate: 0,//当前入住率
        allRoom: 0,//全部
        emptyRoomCount: 0,//空房
        personRoomCount: 0,//住人
        mendRoomCount: 0,//维修
        onGoRoomInfoIsShow: true,
        farAwayRoomStateIsShow: false,
        roomPriceDetailIsShow: false,
        onGoRoomInfoIndex: 0,
        onGoRoomInfoList: [
          {name: "在住信息"},
          {name: "远期房态"},
          {name: "房价明细"},
        ],
        clickRoomIndex: -1,
        clickRoomInfoIndex: -1,
        roomActive: [
          {id: 0},
          {id: 1},
          {id: 2},
          {id: 3},
        ],
        roomIndex: -1,
        roomStatesList: [],//房间数据
        orginRoomStatesList: [],//初始房间数据
        goRoomBoxLittleBoxIsTrue: true,
        payWayChoiceIsShow: true,
        messageContList: [],
        clickMassageNavIndex: 1,
        messageList: [
          {name: "未读消息"},
          {name: "已读消息"},
        ],
        roomTypeConList: [],
        loudongList: [
          {name: "楼栋"},
          {name: "楼层"},
          {name: "全选"},
          {name: "房号"},
        ],
        roomTypeChoiceList: [
          {name: "双人房"},
          {name: "普通大床房"},
          {name: "标准大床房"},
          {name: "标准套房"},
        ],
        cashierAssistantList: [
          {name: '清洁工'},
          {name: '服务员'},
          {name: '清洁工'},
        ],
        value1: [],
        personageGoRoom: true,
        messageBoxIsTrue: false,
        onlineInfo: false,
        handClassBoxIsTrue: false,//交班
        goRoomBoxIsShow: false,
        accountInfoIsShow: false,
        enterpriseGoRoom: false,
        cashierAssistantIsShow: false,
        goRoomNameIndex: 0,
        cashierAssistantLiIndex: 0,
        goRoomName: [
          {name: '个人入住'},
          {name: '企业入住'}
        ],
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        roomTypeDetailList: [
          {
            name: '入住',
          },
          {
            name: '锁房',
          },
          {
            name: '...',
          },
        ],
        roomIsShow: false,
        roomDetailList: [
          {
            roomName: '全部',
            number: 47
          },
          {
            roomName: '空房',
            number: 38
          },
          {
            roomName: '住人',
            number: 9
          },
          {
            roomName: '维修',
            number: 0
          },
        ],
        roomTypeList: [],
        navActiveIndex: 0,
        sectionNavList: [],
        roomDetailContentList: [],//具体房间信息列表
        navList: [
          {name: '客房'},
          {name: '订单'},
          {name: '会员'},
          {name: '投诉'},
          {name: '交班'},
        ],
      }
    },
    created() {
//      初始化首页查询条件
      this.homeSearchCondition();
//      初始化房间数据
      this.initRoomData();
      for (let i = 0; i < 3; i++) {
        this.roomTypeConList.push(
          {name: '双人房', num: 1, roomNumber: 301}
        )
      }
      ;
//    消息数据
      for (let i = 0; i < 10; i++) {
        this.messageContList.push(
          {name: '308退房'}
        )
      };
//    房间类型选择条件列表
      for (let i = 0; i < 2; i++) {
        this.roomTypeChoiseList[0] = {name: '客源'};
        this.roomTypeChoiseList[1] = {name: '入住渠道'};
      }
      ;
    },
    methods: {
      /**
       * 上筛选点击客源
       * **/
      handleCheckedKeYuanChange(value){
        value=value.map((item)=>{
          return item.wayID
        });
        this.orderFrom=value;
        this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);
        let checkedCount = value.length;
        this.checkAllKeYuan = checkedCount === this.newKeYuanList.length;
        this.isIndeterminateKeYuan = checkedCount > 0 && checkedCount < this.newKeYuanList.length;
      },
      /**
       * 上筛选点击入住渠道
       * **/
      handleCheckedGoRoomWayChange(value){
        value=value.map((item)=>{
          return item.memberID
        });
        this.custFrom=value;
        this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);
        let checkedCount = value.length;
        this.checkAllGoRoomWay = checkedCount === this.newGoRoomWayList.length;
        this.isIndeterminateGoRoomWay = checkedCount > 0 && checkedCount < this.newGoRoomWayList.length;
      },
      /**
       * 右侧筛选点击楼栋
       * **/
      changeLouDong(obj,index){
        this.louDongIndex=index;
        this.sectionNavIndex=index;
        this.allLevelNo=[];
        this.allLevelNo=obj.LevelList.map((item)=>{
          return item.Level;
        });
        this.buildNo=obj.BuildNo
        /**
         * 点击楼栋显示楼层数据
         * */
        this.louCengList=[];//清空楼层数据
        this.newLouCengList=[];//清空新楼层数据
        this.checkedLouCengData=[];//选择楼层数据
        this.checkAll=false;//全选
/*        this.louCengList=obj.LevelList;//楼层数据
        //改变楼层数据
        this.louCengList.map((item)=>{
          this.newLouCengList.push(item.Level+"("+item.LevelRoomCount+"/"+(item.LevelRoomCount-item.LevelUseCount)+")");
        });*/

        /**
         * 点击楼栋查询楼栋的数据
         * */
        //根据条件楼栋编号查询楼栋数据
        this.buildNo=[];
        this.buildNo.push(obj.BuildNo);
        this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);
      },
      /**
       * 右侧筛选点击楼层
       * **/
      //全选
      handleCheckAllChange(val) {
        if(this.levelNo==[]){
          this.checkAll=false;
        };
        if(val){
          this.levelNo=this.allLevelNo;
          this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);
        }else {
          this.roomStatesList=[];
        }
        this.checkedLouCengData = val ? this.newLouCengList : [];
        this.isIndeterminate = false;
      },
      //选择楼层
      handleCheckedLouCengChange(value) {
        //点击这栋楼的楼层获取楼层数组
        value=value.map((item)=>{
          return Number(item.toString().substring(0,1))
        });
        this.levelNo=value;
        //根据楼栋和楼层查询并更新更新楼层数据
        this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);
        //得到所有房间更新后的数据筛选出所选的对应房间
        this.roomStatesList=this.orginRoomStatesList.filter((item)=>{
          for(let i=0;i<=value.length;i++){
            if(item.Level==value[i]){
              return true;
            };
          };
        });
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.newLouCengList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.newLouCengList.length;
      },
      /**
       * 右侧筛选点击房态
       * **/
      //全选房态
      handleCheckAllChangeRoomState(val){
        this.checkedRoomStateData = val ? this.newRoomTaiList : [];
        this.isIndeterminateRoomTai = false;
      },
      //选中房态
      handleCheckedRoomStateChange(value){
        value=value.map((item)=>{
          return Number(item.roomStateID)
        });
        this.roomState=value;
        this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);

        let checkedCount = value.length;
        this.checkAllRoomState = checkedCount === this.newRoomTaiList.length;
        this.isIndeterminateRoomTai = checkedCount > 0 && checkedCount < this.newRoomTaiList.length;
      },
      //点击X取消房间状态
      roomIsShowX() {
        this.pIndex = -1;
      },
      //点击X取消在住信息
      clickCansleXOnlineInfo() {
        this.pIndex = -1;
        this.clickRoomBaseClassHeight = -1;
      },
      //点击栋标签页
      clickSectionNav(item, index) {
        this.sectionNavIndex = index;
        this.orginRoomStatesList = item.LevelList;
        this.roomStatesList = item.LevelList;
        //清空上筛选条件
        this.checkedKeYuanData=[];
        this.checkedGoRoomWay=[];
      },
      //回到主页
      turnBack() {
        this.$router.go(-1)
      },
      //首页查询条件
      homeSearchCondition(){
        //查询请求数据时清空所有条件数据
        this.allRoom=0;
        this.emptyRoomCount=0;
        this.personRoomCount=0;
        this.mendRoomCount=0;
        this.inFate=0;
        this.keYuanList=[];
        this.newKeYuanList=[];
        this.goRoomWayList=[];
        this.newGoRoomWayList=[];
        this.roomTaiList=[];
        this.newRoomTaiList=[];

        this.louDongList=[];
        let option = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": 4,//酒店编码
        };
        this.$store.dispatch("homeSearchConditionAction", option)
          .then(
            data => {
              /**
               * 选择楼栋更新上部筛选条件
               * */
              //客源
              this.keYuanList=[];//清空客源数据
              this.newKeYuanList=[];//清空新客源数据
              this.keYuanList=data.data.bookWayList;
              this.newKeYuanList=this.keYuanList;

              //入住渠道
              this.goRoomWayList=[];//清空入住渠道数据
              this.newGoRoomWayList=[];//清空新入住渠道数据
              this.goRoomWayList=data.data.custFromList;
              this.newGoRoomWayList=this.goRoomWayList;

              /**
               * 更新底部数据
               * */
              this.goRoomWayList='';//清空全部
              this.emptyRoomCount='';//清空空房
              this.personRoomCount='';//清空住人
              this.mendRoomCount='';//清空维修
              this.inFate='';//清空当前入住率
              //全部
              this.allRoom = data.data.totalRows;
              //空房
              this.emptyRoomCount = data.data.emptyRoomCount;
              //住人
              this.personRoomCount = data.data.personRoomCount;
              //维修
              this.mendRoomCount = data.data.mendRoomCount;
              //当前入住率
              this.inFate = data.data.inFate;

              /**
               * 右侧条件初始化
               * **/
              //房态
              this.roomTaiList = data.data.conditionList;
              this.roomTaiList.map((item)=>{
                this.newRoomTaiList.push(item.roomStateName+"("+item.stateCount+")");
              });
              // 楼栋
              this.louDongList=data.data.hotelConditionList;
              this.louDongModel=this.louDongList[0];//默认楼栋

              /**
               * 初始化成功返回消息
               * **/
              this.$notify({
                type: 'success',
                message: '初始化筛选条件成功'
              });
            }, err => {
              this.$notify({
                type: 'err',
                message: err
              });
            })
      },
//    初始化房间数据
      initRoomData() {
        let option = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": 4,//酒店编码
          //"roomState": [0,1,2,3,4],//房间状态0空净 1空脏  2住人净 3住人脏  4维修
//          "custFrom": [0],//0散客 1会员 2企业
          //"orderFrom": [0],//下单方式 0线下 1线上
          //"buildNo": [1],//楼栋
          //"levelNo": [1,2,3,5],//楼层
        };
        this.$store.dispatch("initCashierDeskAction", option)
          .then(
            data => {
              //栋数标签页
              this.sectionNavList = data.data.BuildNoList;
              //初始化房间原始数据
              this.orginRoomStatesList = data.data.BuildNoList[0].LevelList;
              this.roomStatesList=this.orginRoomStatesList;
              // 初始化成功返回消息
              this.$notify({
                type: 'success',
                message: '初始化房间状态成功'
              });
            }, err => {
              this.$notify({
                type: 'err',
                message: err
              });
            })
      },
//    房间条件查询
      conditionRoomSearch(hotelID,roomState,custFrom,orderFrom,buildNo,levelNo) {
        let option = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": hotelID?hotelID:4,//酒店编码
          "roomState": roomState?roomState:[],//房间状态0空净 1空脏  2住人净 3住人脏  4维修
          "custFrom": custFrom?custFrom:[],//0散客 1会员 2企业
          "orderFrom": orderFrom?orderFrom:[],//下单方式 0线下 1线上
          "buildNo": buildNo?buildNo:[],//楼栋
          "levelNo": levelNo?levelNo:[],//楼层
        };
        this.$store.dispatch("cashierDeskConditionSearchAction", option)
          .then(
          data => {
            /**
             * 更新房间状态
             * */
            this.orginRoomStatesList=[];//清空原始房间状态数据
            this.roomStatesList=[];//清空房间状态数据
            console.log(data.data.BuildNoList)
            if(data.data.BuildNoList[0]){
              this.orginRoomStatesList = data.data.BuildNoList[0].LevelList;
            };
            this.roomStatesList=this.orginRoomStatesList;

            /**
             * 默认第一栋楼层数据
             * */
            this.louCengList=[];//清空楼层数据
            this.newLouCengList=[];//清空新楼层数据
            this.checkedLouCengData=[];//选择楼层数据
            this.checkAll=false;//全选
            this.louCengList=obj.LevelList;//楼层数据
            //改变楼层数据
            this.louCengList.map((item)=>{
              this.newLouCengList.push(item.Level+"("+item.LevelRoomCount+"/"+(item.LevelRoomCount-item.LevelUseCount)+")");
            });
            /**
             * 消息提示
             * */
            this.$notify({
              type: 'success',
              message: '当前楼栋以及条件数据查询成功'
            });
          }, err => {
            this.$notify({
              type: 'err',
              message: err
            });
          });
      },
//    点击在住信息
      clickOnGoRoomInfo(item, index) {
        this.onGoRoomInfoIndex = index;
        if (index == 0) {
          this.onGoRoomInfoIsShow = true;
          this.farAwayRoomStateIsShow = false;
          this.roomPriceDetailIsShow = false;
        }
        if (index == 1) {
          this.onGoRoomInfoIsShow = false;
          this.farAwayRoomStateIsShow = true;
          this.roomPriceDetailIsShow = false;
        }
        if (index == 2) {
          this.onGoRoomInfoIsShow = false;
          this.farAwayRoomStateIsShow = false;
          this.roomPriceDetailIsShow = true;
        }

      },
//    确定结账方式选择
      payWayChoiceSure() {
        this.payWayChoiceIsShow = false;
      },
//    取消结账方式选择
      payWayChoiceCansle() {
        this.payWayChoiceIsShow = false;
      },
//    点击选房间取消
      clickGoRoomCansle() {
        this.goRoomBoxLittleBoxIsTrue = false;
      },
//    点击选房间取消
      clickGoRoomSure() {
        this.goRoomBoxLittleBoxIsTrue = false;
      },
//    点击消息盒子导航条
      clickMassageNav(item, index) {
        this.clickMassageNavIndex = index;
      },
//    点击消息
      clickMessage() {
        this.messageBoxIsTrue = !this.messageBoxIsTrue;
      },
//      取消交班
      handClassCansle() {
        this.handClassBoxIsTrue = false;
      },
//      确定交班
      handClassSure() {
        this.handClassBoxIsTrue = false;
      },
//      叉掉交班
      clickHandClass() {
        this.handClassBoxIsTrue = false;
      },
      clickAccountInfoFalse() {
        this.accountInfoIsShow = false;
      },
      clickAccountBox() {
        this.onlineInfo = false;
        this.accountInfoIsShow = true;
      },
      send() {
        this.cashierAssistantIsShow = false;
      },
      clickCashierAssistantName(item, index) {
        this.cashierAssistantLiIndex = index;
      },
      stageHelper() {
        this.cashierAssistantIsShow = true;
      },
      clickGoRoomBox() {
        this.goRoomBoxIsShow = false;
      },
      clickGoRoomBoxCansle() {
        this.goRoomBoxIsShow = false;
      },
//    点击入住
      clickgoRoomName(item, index) {
        this.goRoomNameIndex = index;
        if (index == 0) {
          this.personageGoRoom = true;
          this.enterpriseGoRoom = false;
        } else {

          this.personageGoRoom = false;
          this.enterpriseGoRoom = true;
        }
      },
//    入住
      clickGoRoom() {
        this.roomIsShow = false;
        this.goRoomBoxIsShow = true;
      },
      clickRoomTypeList(item, index) {
        if (index == 2) {
        }
        ;
      },
      clickNavList(item, index) {
        this.navActiveIndex = index;
        switch(index){
          case 1:
            this.$router.push({name: 'AdminEndOrder'});
            break;
          case 3 :
            //      点击投诉
            this.$router.push({
              name:'Complain',
            });
            return ;
          case 4 :
            this.handClassBoxIsTrue = true;//      点击交班
            return;
        }
      },
      clickRoom(pItem, pIndex, item, index) {
        this.pIndex = pIndex;
        this.cIndex = index;
      }
    },
    mounted(){
      /**
       * 首页查询条件和房间隔10分钟刷新一次
       * */
      clearInterval(timer);
      var timer=setInterval(()=>{
        this.homeSearchCondition();
        this.initRoomData();
      },600000)
    },
  }
</script>

<style scoped>

  .cansleX {
    width: 10px;
    height: 10px;
    position: absolute;
    right: 2px;
    top: 2px;
    font-size: 10px;
    line-height: 10px;
    color: #fff;
  }

  .roomPeopleImg {
    width: 35px;
    height: 40px;
    background: url("../assets/img/home/people.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .farAayRoomStateCon > li {
    float: left;
    color: #fff;
  }

  .messageBox > ul {
    width: 230px;
    height: 200px;
    padding-right: 15px;
    overflow-y: scroll;
    border: 1px dashed black;
  }

  .messageBox > ul > li {
    border-bottom: 1px solid rgb(253, 223, 164);
    height: 30px;
    font: 15px/2 "微软雅黑";
    padding-left: 10px;
  }

  .messageBox > div > ul > li {
    float: left;
    width: 70px;
    height: 25px;
    text-align: center;
  }

  .messageBox > div > ul > li.clickMassageNavActive {
    color: #000;
    background-color: #fff;
  }

  .messageBox > div > ul {
    padding-top: 5px;
    padding-left: 5px;
  }

  .messageBox > div {
    height: 35px;
    width: 230px;
    background-color: rgb(255, 85, 85);
    color: #fff;
    line-height: 25px;
  }

  .messageBox {
    width: 230px;
    height: 230px;
    background-color: white;
    position: fixed;
    bottom: 35px;
    right: 5px;
    z-index: 70;
  }

  .choicedRoomContent > div > div > div {
    float: left;
    height: 30px;
  }

  .choicedRoomContent > div > div:nth-child(odd) {
    background-color: #fff;
  }

  .choicedRoomContent > div > div:nth-child(even) {
    background-color: rgb(242, 242, 242);
  }

  .choicedRoomContent > div > div > :nth-child(3) > div {
    color: #fff;
    background-color: rgb(255, 86, 86);
    width: 45px;
    text-align: center;
    height: 20px;
    margin-top: 5px;
    line-height: 20px;
  }

  .choicedRoomContent > div > div {

  }

  .choicedRoomContent > div {
    width: 620px;
    height: 70px;
    /*overflow: scroll;*/
  }

  .choicedRoomContent {
    height: 30px;
    width: 485px;
    line-height: 30px;
  }

  .choicedRoomContent > ul > li {
    color: white;
    background-color: rgb(80, 80, 80);
    float: left;
    font: 15px/2 "微软雅黑";
    padding-left: 5px;
  }

  .choicedRoomContent > ul > li:nth-child(1) {
    width: 120px;
    margin-right: 5px;
  }

  .choicedRoomContent > div > div > div:nth-child(1) {
    width: 120px;
    margin-right: 5px;
  }

  .choicedRoomContent > ul > li:nth-child(2) {
    width: 60px;
    margin-right: 5px;
  }

  .choicedRoomContent > div > div > div:nth-child(2) {
    width: 60px;
    margin-right: 5px;
  }

  .choicedRoomContent > ul > li:nth-child(3) {
    width: 430px;
  }

  .choicedRoomContent > div > div > div:nth-child(3) {
    width: 430px;
  }

  .goRoomBoxLittleBoxConRightTitle {

  }

  .goRoomBoxLittleBoxConRightTitle > li {
    float: left;
    height: 30px;
    background-color: rgb(80, 80, 80);
    color: #fff;
    line-height: 30px;
    padding-left: 5px;
    font-weight: 600;
  }

  .goRoomBoxLittleBoxConRightTitle > li:nth-child(1),
  .goRoomBoxLittleBoxConRightTitle > li:nth-child(2),
  .goRoomBoxLittleBoxConRightTitle > li:nth-child(3) {
    width: 50px;
    margin-right: 5px;
  }

  .goRoomBoxLittleBoxConRightTitle > li:nth-child(4) {
    width: 320px;
  }

  .goRoomBoxLittleBoxConRightCon {
    height: 120px;
    width: 485px;
    /*background-color: rosybrown;*/
    overflow-y: scroll;
  }

  .goRoomBoxLittleBoxConRightCon > li {
    height: 30px;
    width: 485px;
  }

  .goRoomBoxLittleBoxConRightCon > li > div {
    width: 50px;
    height: 30px;
    float: left;
    margin-right: 5px;
    text-align: center;
  }

  .goRoomBoxLittleBoxConRightCon > li > ul {
    float: left;
    padding-top: 5px;
  }

  .goRoomBoxLittleBoxConRightCon > li > ul > li {
    float: left;
    width: 50px;
    height: 20px;
    font-size: 12px;
    background-color: rgb(255, 86, 86);
    line-height: 20px;
    text-align: center;
    color: #fff;
    margin-right: 5px;
  }

  .goRoomBoxLittleBoxConRightCon > li:nth-child(odd) {
    background-color: #fff;
  }

  .goRoomBoxLittleBoxConRightCon > li:nth-child(even) {
    background-color: rgb(242, 242, 242);
  }

  .goRoomBoxLittleBoxConLeft > ul > li {
    height: 30px;
    width: 120px;
    line-height: 30px;
    font-size: 15px;
    padding-left: 5px;
  }

  .goRoomBoxLittleBoxConLeft > ul > li:nth-child(odd) {
    background-color: #fff;
  }

  .goRoomBoxLittleBoxConLeft > ul > li:nth-child(even) {
    background-color: rgb(242, 242, 242);
  }

  .goRoomBoxLittleBoxConLeft > div {
    padding-left: 5px;
    height: 30px;
    width: 120px;
    background-color: rgb(80, 80, 80);
    color: #fff;
    font-size: 11px;
    line-height: 30px;
    font-weight: 600;
  }

  .goRoomBoxLittleBoxConLeft {
    width: 120px;
    height: 150px;
    margin-right: 15px;
    /*background-color: brown;*/
    float: left;
  }

  .goRoomBoxLittleBoxConRight {
    width: 485px;
    height: 150px;
    /*background-color: navajowhite;*/
    float: left;
  }

  .goRoomBoxLittleBoxBot > div > span > span {
    color: red;
  }

  .goRoomBoxLittleBoxBot > div {
    float: left;
  }

  .goRoomBoxLittleBoxBot > ul > li {
    float: right;
    background-color: rgb(246, 188, 76);
    color: #000;
    height: 25px;
    width: 80px;
    text-align: center;
  }

  .goRoomBoxLittleBoxBot > ul > li:last-of-type {
    margin-right: 10px;
  }

  .goRoomBoxLittleBoxCon {
    width: 620px;
    height: 300px;
    /*background-color: red;*/
    margin-left: 10px;
  }

  .goRoomBoxLittleBoxCon > h1 {
    height: 25px;
    width: 620px;
  }

  .goRoomBoxLittleBoxCon > h1 > span {
    font-size: 12px;
    font-weight: 600;
  }

  .goRoomBoxLittleBoxCon > h2 {
    font-size: 12px;
    font-weight: 600;
    padding-left: 10px;
  }

  .goRoomBoxLittleBoxCon > div:first-of-type {
    height: 150px;
    width: 620px;
    /*background-color: royalblue;*/
  }

  .goRoomBoxLittleBoxCon > div:last-of-type {
    height: 100px;
    width: 620px;
    /*background-color: rosybrown;*/
  }

  .goRoomBoxLittleBoxBot {
    width: 620px;
    height: 25px;
    /*background-color: royalblue;*/
    margin-left: 10px;
    margin-top: 20px;
  }

  .goRoomBoxLittleBox {
    position: absolute;
    width: 640px;
    height: 400px;
    background-color: rgb(238, 238, 238);
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto auto;
    z-index: 60;
    box-shadow: 0px 0px 10px 1px silver;
  }

  .goRoomBoxLittleBox > h1 {
    width: 640px;
    color: #fff;
    height: 35px;
    background-color: rgb(79, 129, 189);
    font: 12px/35px "微软雅黑";
    text-align: center;
  }

  .payWayChoiceInput > span {
    margin-right: 20px;
  }

  .payWayChoiceInput > input {
    border: 1px solid #e1e1e1;
  }

  ul.payWayChoiceContent {
    margin: 60px 0 0 70px;
  }

  ul.payWayChoiceContent > li {
    height: 30px;
    margin-bottom: 10px;
    font: 11px/30px "微软雅黑";
  }

  ul.payWayChoiceContent > li:nth-of-type(1) > .payWayChoiceInput {

  }

  ul.payWayChoiceContent > li:nth-of-type(2) > .payWayChoiceInput {

  }

  ul.payWayChoiceContent > li:nth-of-type(2) > .payWayChoiceInput > input {
    width: 320px;
    height: 25px;
    /*float: right;*/
    text-align: right;
  }

  ul.payWayChoiceContent > li:nth-of-type(3) > .payWayChoiceInput {

  }

  ul.payWayChoiceContent > li:nth-of-type(3) > .payWayChoiceInput > input {
    width: 320px;
    height: 25px;
  }

  .payWayChoiceName {
    width: 60px;
    text-align: right;
    float: left;
  }

  .payWayChoiceInput {
    width: 320px;
    height: 25px;
    /*background-color: red;*/
    float: left;
    margin-left: 10px;
  }

  .payWayChoiceFoot {
    position: absolute;
    bottom: 20px;
    right: 10px;
  }

  .payWayChoiceFoot > li {
    float: left;
    width: 80px;
    height: 25px;
    text-align: center;
    background-color: rgb(246, 188, 76);
    color: rgb(80, 80, 80);
    margin-right: 10px;
    font: 16px/25px "微软雅黑";
  }

  .payWayChoice {
    width: 540px;
    height: 300px;
    box-shadow: 0px 0px 10px 1px silver;
    position: absolute;
    background-color: rgb(238, 238, 238);
    margin: auto auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 50;
  }

  .payWayChoice > h1 {
    height: 30px;
    color: #fff;
    text-align: center;
    background-color: rgb(18, 150, 215);
    font: 16px/30px "微软雅黑";
  }

  .handClassContent {
    position: relative;
  }

  .handClassContent > div {
    padding: 70px 20px 0 20px;
    font-size: 18px;
    font-weight: 500;
  }

  .handClassContent > div > span {
    font-size: 28px;
    font-weight: 400;
  }

  .handClassContent > ul {
    position: absolute;
    bottom: 20px;
  }

  .handClassContent > ul > li {
    float: left;
    width: 235px;
    height: 40px;
    color: white;
    text-align: center;
    line-height: 40px;
    font-size: 23px;
  }

  .handClassContent > ul > li:nth-of-type(1) {
    background-color: rgb(184, 184, 184);
    margin-right: 88px;
    margin-left: 60px;
  }

  .handClassContent > ul > li:nth-of-type(2) {
    background-color: rgb(246, 188, 76);
  }

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
    position: fixed;
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

  .handClass > h1 {
    height: 35px;
    font: 18px/35px "微软雅黑";
    text-align: center;
    background-color: rgb(18, 150, 215);
    color: white;
  }

  .handClass > div {
    height: 245px;
    width: 670px;
  }

  .handClass > h1 > div {
    width: 20px;
    height: 20px;
    background: url("../assets/img/roomReservation/false.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    top: 7px;
    right: 10px;
  }

  .tableBox {
    height: 200px;
  }

  .heji {
    margin: 10px auto 20px;
  }

  .dateChoise {
    margin: 50px 0;
  }

  .cashierAssistantContent > div:nth-of-type(3) {
    color: white;
    background-color: rgb(246, 188, 76);
    height: 55px;
    font: 27px/55px "微软雅黑";
    text-align: center;
    width: 360px;
    position: absolute;
    bottom: 50px;
    right: 75px;
  }

  .cashierAssistantContent > div:nth-of-type(2) {
    height: 300px;
    width: 850px;
  }

  .cashierAssistantContent > div:nth-of-type(2) > textarea {
    height: 300px;
    width: 850px;
    border-bottom: 1px solid silver;
  }

  .cashierAssistantContent > div:first-of-type {
    height: 80px;
    width: 850px;
    /*background-color: red;*/
    border-bottom: 1px solid silver;
  }

  .cashierAssistantContent > ul > li > div {
    width: 45px;
    height: 75px;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .cashierAssistantContent > ul > li > div > h1 {
    position: absolute;
    bottom: 5px;
    right: 0;
    left: 0;
    height: 20px;
    text-align: center;
    font: 13px/20px "微软雅黑";
  }

  .cashierAssistantContent > ul > li > div > div > div {
    width: 45px;
    height: 50px;
    background-size: 100% auto;
    background-position: 0 10px;
  }

  /*cashierAssistantImgActive*/
  .cashierAssistantContent > ul > li:nth-of-type(1) > div > div > div {
    background: url("../assets/img/roomReservation/saodiW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li:nth-of-type(1) > div > div > div.cashierAssistantImgActive {
    background: url("../assets/img/roomReservation/saodiC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li:nth-of-type(2) > div > div > div {
    background: url("../assets/img/roomReservation/peopleW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li:nth-of-type(2) > div > div > div.cashierAssistantImgActive {
    background: url("../assets/img/roomReservation/peopleC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li:nth-of-type(3) > div > div > div {
    background: url("../assets/img/roomReservation/saodiW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li:nth-of-type(3) > div > div > div.cashierAssistantImgActive {
    background: url("../assets/img/roomReservation/saodiC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li > div > div {
    width: 45px;
    height: 60px;
    /*padding-top: 10px;*/
    position: absolute;
    right: 0;
    left: 0;
    bottom: 15px;
    /*margin: 10px auto 0;*/
    margin: 0 auto 0;
  }

  .cashierAssistantContent > ul > li {
    width: 280px;
    height: 80px;
    background-color: rgb(245, 245, 245);
    float: left;
    color: silver;
    position: relative;
  }

  .cashierAssistantContent > ul > li.cashierAssistantLiActive {
    border-top: 5px solid rgb(246, 188, 76);
    background-color: white;
  }

  .cashierAssistantContent > ul > li:nth-of-type(1) {
    margin-right: 5px;
  }

  .cashierAssistantContent > ul > li:nth-of-type(2) {
    margin-right: 5px;
  }

  .cashierAssistantContent > ul > li:nth-of-type(3) {

  }

  .cashierAssistantContent {
    height: 640px;
    width: 1000px;
    /*background-color: royalblue;*/
    padding: 10px 75px 65px;
  }

  .cashierAssistantTitle {
    color: white;
    background-color: rgb(246, 188, 76);
    text-align: center;
    height: 80px;
    font: 30px/80px "微软雅黑";
  }

  .cashierAssistant {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 1000px;
    z-index: 30;
    height: 720px;
    margin: 50px auto;
    background-color: #fff;
    box-shadow: -1px 1px 2px 2px silver;
  }

  .onRoomInfo > ul {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .onRoomInfo > ul > li {
    background-color: rgb(254, 194, 79);
    height: 25px;
    float: left;
    color: #000;
    width: 50px;
    text-align: center;
    font-size: 12px;
    line-height: 25px;
    margin-right: 5px;
  }

  .onRoomInfo > div:first-of-type {
    width: 90px;
    height: 110px;
    float: left;
    background: url("../assets/img/home/peopleNone.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .onRoomInfo > div:nth-of-type(2) {
    float: left;
    width: 320px;
    height: 200px;
    /*background-color: royalblue;*/
    margin-left: 10px;
  }

  .onRoomInfo {
    width: 445px;
    height: 250px;
    padding: 0px 10px 5px;
  }

  .farAwayRoomState {
    width: 445px;
    height: 250px;
    padding: 0px 10px 5px;
  }

  .roomPriceDetail {
    width: 445px;
    height: 250px;
    padding: 0px 0px 5px;
    background-color: #fff;
    border: 1px solid silver;
  }

  .roomPriceDetail > ul:first-of-type > li {
    background-color: rgb(80, 80, 80);
  }

  .roomPriceDetail > ul > li {
    height: 30px;
    float: left;
    line-height: 30px;
    margin-right: 2px;
    padding-left: 5px;
  }

  .roomPriceDetail > ul:first-of-type {
    border: 1px solid silver;
  }

  .roomPriceDetail > ul:nth-child(2) > li {
    color: #000;
  }

  .roomPriceDetail > ul:nth-child(2) > li:first-of-type {
    border: 1px solid black;
  }

  .roomPriceDetail > ul > li:first-of-type {
    width: 100px;
    font: 15px/2 "微软雅黑";
  }

  .roomPriceDetail > ul > li:nth-child(2) {
    width: 80px;
  }

  .clickRoomBaseClass > div:first-of-type > h1 {
    color: white;
    height: 25px;
  }

  .clickRoomBaseClass > div:first-of-type {
    position: relative;
  }

  .clickRoomBaseClass > div:first-of-type > div {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    text-align: center;
  }

  .clickRoomBaseClass > div:first-of-type {
    background-color: rgb(255, 99, 99);
  }

  .clickRoomBaseClass > div:first-of-type > ul {
    height: 25px;
  }

  .clickRoomBaseClass > div:first-of-type > ul > li {
    width: 65px;
    height: 25px;
    float: left;
    text-align: center;
  }

  .clickRoomBaseClass > div:first-of-type > ul > li.onGoRoomInfoActive {
    color: #000;
    background-color: #fff;
  }

  .displayBoxInfo {
    margin: 5px 0px 5px 10px;
  }

  .displayBox {
    /*background-color: red;*/
    height: 450px;
    width: 715px;
  }

  .allNumber > span:first-of-type {
    margin-right: 50px;
    margin-left: 10px;
  }

  .allNumber {
    margin-top: 5px;
    color: rgb(0, 128, 0);
    text-align: left;
  }

  .allNumber > span {
    float: left;
  }

  .AllMoneyRight {
    float: left;
    color: red;
    padding: 20px;
  }

  .AllMoneyRight > h1 {
    font: 20px/40px '微软雅黑';
  }

  .AllMoneyLeft > h1 {
    color: red;
    font: 25px/55px "微软雅黑";
  }

  .AllMoneyLeft {
    float: left;
    width: 275px;
    height: 160px;
    border-right: 1px solid black;
    padding: 25px;
  }

  .AllMoney {
    width: 715px;
    height: 160px;
    border-top: 1px solid black;
    border-bottom: 1px solid silver;
    margin-top: 5px;
  }

  .costAccount {
    width: 80px;
    height: 30px;
    background-color: rgb(246, 188, 76);
    text-align: center;
    line-height: 30px;
  }

  .accountInfoContentRight {
    margin-left: 5px;
    /*background-color: royalblue;*/
    width: 720px;
    height: 690px;
  }

  .roomNumberContent > li > div {
    float: left;
  }

  .roomNumberContent > li > div:nth-of-type(1) {
    width: 65px;
  }

  .roomNumberContent > li > div:nth-of-type(2) {
    width: 85px;
  }

  .roomNumberContent > li > div:nth-of-type(3) {
    width: 105px;
  }

  .roomNumberContent > li {
    background-color: rgb(250, 220, 150);
  }

  .roomNumberTitle > li:nth-of-type(1) {
    width: 60px;
    margin-right: 5px;
  }

  .roomNumberTitle > li:nth-of-type(2) {
    width: 80px;
    margin-right: 5px;
  }

  .roomNumberTitle > li:nth-of-type(3) {
    width: 105px;
  }

  .roomNumberTitle > li {
    font-size: 10px;
    height: 30px;
    float: left;
    color: white;
    text-align: left;
    line-height: 30px;
    background-color: rgb(80, 80, 80);
  }

  .roomPriceBox {
    margin-top: 10px;
  }

  .peopleBoxContentLeft {
    height: 130px;
    width: 115px;
    background-color: red;
  }

  .peopleBoxContent > div {
    float: left;
  }

  .peopleBoxContentRight {
    padding: 10px;
    width: 140px;
    height: 130px;
    /*background-color: royalblue;*/
  }

  .peopleBoxContent {
    height: 130px;
    width: 255px;
    /*background-color: rebeccapurple;*/
  }

  .roomNumber {
    height: 390px;
    width: 255px;
    background-color: white;
  }

  .accountInfoContentLeftPeopleInfo {
    width: 255px;
    height: 270px;
    background-color: white;
    margin-bottom: 10px;
    padding: 10px;
  }

  .accountInfoContentLeft {
    width: 255px;
    height: 670px;
    /*background-color: red;*/
  }

  .accountInfoContent > div {
    float: left;
  }

  .accountInfoContent {
    width: 1000px;
    height: 690px;
    background-color: rgb(238, 238, 238);
    padding: 10px;
  }

  .accountInfoTitle {
    text-align: center;
    background-color: rgb(18, 150, 215);
    color: white;
    height: 30px;
    font: 15px/2 '微软雅黑';
    position: relative;
  }

  .accountInfoTitle > div {
    width: 20px;
    height: 20px;
    background: url("../assets/img/roomReservation/false.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    right: 10px;
  }

  .accountInfo {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 1000px;
    z-index: 20;
    height: 720px;
    margin: 50px auto;
    background-color: #fff;
    box-shadow: -1px 1px 2px 2px silver;
  }

  .accountInfoBox {
    /*    position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: royalblue;
        z-index: 18;
        position: relative;*/
  }

  .accountInfoShade {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    /*background-color: red;*/
    z-index: 19;
  }

  .goRoomAndCansle {
    float: right;
  }

  .goRoomAndCansle > li {
    margin-right: 5px;
    color: black;
    background-color: rgb(246, 188, 76);
    text-align: center;
    float: left;
    width: 80px;
    height: 25px;
    line-height: 25px;
  }

  .choiceRoom > li:last-of-type {
    background-color: rgb(251, 222, 166);
  }

  .choiceRoom > li {
    margin-right: 5px;
    color: black;
    background-color: rgb(246, 188, 76);
    text-align: center;
    float: left;
    width: 80px;
    height: 25px;
    line-height: 25px;
  }

  .days {
    float: left;
    margin-right: 20px;
  }

  .days > span:last-of-type {
    color: red;
  }

  .days > input {
    height: 40px;
    border: 1px solid silver;
  }

  .orderIfo {
    margin-top: 10px;
    height: 0px;
  }

  .orderIfo > div:first-of-type {
    border-bottom: 1px solid silver;
    width: 40%;
  }

  .orderIfo > div:nth-of-type(2) {
    width: 20%;
    text-align: center;
    margin-top: -10px;
  }

  .orderIfo > div:last-of-type {
    border-bottom: 1px solid silver;
    width: 40%;
  }

  .orderIfo > div {
    float: left;
  }

  .formInputBox {
    width: 830px;
    height: 105px;
    /*background-color: red;*/
    float: left;
    line-height: 25px;
    margin-left: 20px;
  }

  .clearGuestInfo {
    background-color: rgb(246, 188, 76);
    width: 150px;
    height: 25px;
    text-align: center;
    font: 12px/2 '微软雅黑';
    float: right;
  }

  .peopleContentBox {
    width: 950px;
    height: 130px;
    /*background-color: rebeccapurple;*/
  }

  .peopleContentBoxLeft {
    width: 120px;
    height: 130px;
    background-color: rosybrown;
    float: left;
  }

  .peopleContentBoxRight {
    height: 130px;
    width: 830px;
    /*background-color: royalblue;*/
    float: left;
  }

  .goRoomBoxContent {
    padding-top: 20px;
    padding-left: 25px;
    padding-right: 25px;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    /*background-color: rosybrown;*/
  }

  .goRoomBoxInput {
    height: 25px;
    width: 250px;
    float: left;
    /*background-color: rebeccapurple;*/
  }

  .goRoomBoxInput > span:last-of-type {
    color: red;
  }

  .goRoomBoxTitle {
    text-align: center;
    color: white;
    background-color: rgb(18, 150, 215);
    height: 30px;
    font: 15px/2 '微软雅黑';
  }

  .goRoomBoxTab {
    margin-top: 10px;
  }

  .goRoomBoxTab > div {
    float: left;
    height: 40px;
    width: 420px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    background-color: rgb(238, 238, 238);
  }

  .goRoomBoxTab > div:first-of-type {
    margin-right: 10px;
    margin-left: 75px;
  }

  .goRoomBoxTab > div:nth-of-type(2) {
    /*background-color: rgb(246,188,76);*/
  }

  .goRoomBoxTab > div.goRoomNameActive {
    background-color: rgb(246, 188, 76);
  }

  .goRoomBoxShade {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9;
  }

  .goRoomBox {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 1000px;
    z-index: 500;
    height: 720px;
    margin: 50px auto;
    background-color: #fff;
    box-shadow: -1px 1px 2px 2px silver;
  }

  .goRoomBoxLittleBoxShade {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /*background-color: rosybrown;*/
    z-index: 50;
  }

  .otherRoomType {
    width: 60px;
    height: 90px;
    position: absolute;
    bottom: 35px;
    right: 8px;
  }

  .roomIsShowX {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 0;
    top: 0;
  }

  .otherRoomType > div:first-of-type {
    background-color: rgb(255, 191, 68);
    width: 60px;
    height: 80px;
    text-align: center;
    color: #000;
    padding-top: 5px;
  }

  .otherRoomType > div:last-of-type {
    margin: 0 auto;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: rgb(255, 191, 68) transparent transparent transparent;
  }

  .roomTypeList {
    position: absolute;
    bottom: 10px;
    right: 20px;
  }

  .roomTypeList > li:nth-of-type(3) {
    width: 20px;
  }

  .roomTypeList > li {
    float: left;
    width: 45px;
    height: 25px;
    text-align: center;
    border: 1px solid white;
    margin-right: 5px;
    background-color: rgb(255, 191, 68);
    color: black;
  }

  .container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .containerLeft {
    width: 135px;
    height: 100%;
    background-color: rgb(80, 80, 80);
    float: left;
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

  .contentBox {
    height: 100%;
    width: 100%;
    float: left;
    padding-left: 10px;
    background-color: rgb(238, 238, 238);
    position: relative;
  }

  .headImg {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: 5px solid white;
    margin: 40px auto 0;
  }

  .turnBack {
    text-align: center;
    color: #fff;
    font: 20px/2 '微软雅黑';
    background-color: rgb(27, 113, 177);
    margin-top: 27px;
  }

  .navList {
    background-color: #fff;
  }

  .navList > li {
    float: left;
    height: 70px;
    width: 70px;
    font: 14px/2 '微软雅黑';
    color: rgb(27, 113, 177);
    text-align: center;
  }

  .navList > li.navActive {
    background-color: rgb(27, 113, 177);
    color: #fff;
  }

  .navList > li:nth-of-type(1).navActive > div:first-of-type {
    background: url("../assets/img/roomReservation/roomW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(2).navActive > div:first-of-type {
    background: url("../assets/img/roomReservation/orderW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(5).navActive > div:first-of-type {
    background: url("../assets/img/roomReservation/complainW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(4).navActive > div:first-of-type {
    background: url("../assets/img/roomReservation/classW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(3).navActive > div:first-of-type {
    background: url("../assets/img/home/memberW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li > div:first-of-type {
    height: 34px;
    /*background-color: #fff;*/
    width: 36px;
    margin: 8px auto 0;
  }

  .navList > li:nth-of-type(1) > div:first-of-type {
    background: url("../assets/img/roomReservation/roomC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(2) > div:first-of-type {
    background: url("../assets/img/roomReservation/orderC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(5) > div:first-of-type {
    background: url("../assets/img/roomReservation/complainC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(4) > div:first-of-type {
    background: url("../assets/img/roomReservation/classC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(3) > div:first-of-type {
    background: url("../assets/img/home/memberC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li > div:last-of-type {

  }

  .peopleRight {
    float: right;
    margin-top: 22px;
  }

  .peopleBox {
    float: left;
    height: 25px;
    width: 115px;
    border: 1px solid rgb(180, 180, 180);
    border-radius: 20px;
    padding: 5px 10px;
    font: 15px/1 "微软雅黑";
    color: rgb(180, 180, 180);
  }

  .peopleBox > i {
    float: right;
    display: inline-block;
    margin: 5px 0px 0px 0px;
    border-color: rgb(180, 180, 180) transparent transparent transparent;
    border-width: 6px;
    border-style: solid;
    width: 0;
    height: 0;
  }

  .funcIcon {
    float: left;
    margin-left: 15px;
  }

  .funcIcon > li {
    float: left;
    width: 30px;
    font-weight: 700;
  }

  .funcIcon > li:first-of-type {
  }

  .sectionNav {
    /*margin-top: 20px;*/
    position: absolute;
    top: -30px;
  }

  .sectionNav > li {
    margin-right: 1px;
    float: left;
    color: #fff;
    width: 100px;
    text-align: center;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    background-color: #666666;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    position: relative;
  }

  .sectionNav > li.sectionNavActive {
    background-color: rgb(246, 188, 76);
  }

  section {
    width: calc(100% - 15px);
    /*height: 100%;*/
    position: absolute;
    top: 121px;
    right: 5px;
    left: 10px;
    bottom: 35px;
    background-color: white;
    border: 1px solid rgb(246, 188, 76);
    /*overflow: hidden;*/
  }

  .allRoomIfoUL {
    padding-right: 140px;
  }

  .orderBox {
    width: calc(100% - 15px);
    /*height: 100%;*/
    position: absolute;
    top: 121px;
    right: 5px;
    left: 10px;
    bottom: 35px;
    background-color: white;
    border: 1px solid rgb(246, 188, 76);
    overflow: hidden;
  }

  footer {
    padding-right: 55px;
    position: absolute;
    height: 35px;
    right: 5px;
    left: 10px;
    bottom: 0px;
    width: 100%;
    /*background-color: royalblue;*/
  }

  footer > div > div:first-of-type > div {
    width: 30px;
    height: 30px;
    background: url("../assets/img/roomReservation/phoneImg.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  footer > div > div {
    height: 35px;
  }

  footer > div > div:last-of-type {
    position: relative;
  }

  footer > div > div > div:first-of-type {
    margin-top: 3px;
    margin-left: 20px;
  }

  footer > div > div > span {
    margin-left: 10px;
  }

  footer > div > div:first-of-type > span {
    float: left;
    line-height: 35px;
  }

  footer > div > div:last-of-type > span {
    float: left;
    line-height: 35px;
  }

  footer > div {
    float: right;
  }

  footer > div > div {
    float: left;
  }

  .messageImg {
    width: 30px;
    height: 30px;
    background: url("../assets/img/roomReservation/messageImg.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  .liu {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50px;
    color: white;
    position: absolute;
    text-align: center;
    line-height: 20px;
    right: -15px;
    top: -5px;
    z-index: 1000;
  }

  .sessionRight {
    position: absolute;
    /*top: 0;*/
    right: 0px;
    top: 0;
    width: 220px;
    height: 100%;
    bottom: 45px;
    border-left: 1px solid rgb(246, 188, 76);
  }

  .rightSession {

  }

  .sessionLeft {
    position: absolute;
    left: 0;
    right: 230px;
    height: 100%;
    bottom: 0;
    padding-bottom: 150px;
    z-index: 100;
    /*overflow: scroll;*/
  }

  .sessionLeftContentBox {
    /*padding-top: 50px;*/
    position: fixed;
    left: 145px;
    right: 235px;
    /*height: 100%;*/
    bottom: 85px;
    top: 120px;
    /*padding-bottom: 150px;*/
    /*overflow: scroll;*/
    z-index: 200;
    /*background-color: brown;*/
    overflow-y: scroll;
    background-color: #fff;
    border-left: 1px solid rgb(246, 188, 76);
  }

  .leftSession {

  }

  .roomType {
    /*    position: absolute;
        top: -2px;
        right: 0;
        z-index: 1000;
        left: 0px;*/
    width: 80%;
    border-bottom: 1px solid silver;
    padding-top: 10px;

    background-color: #fff;
  }

  .roomType > li {
    width: 50%;
    float: left;
  }

  .roomTypeHeadName {
    float: left;
    width: 65px;
    color: rgb(246, 188, 76);
    padding-left: 5px;
    font-size: 14px;
    margin-right: 5px;
    margin-top: 5px;
    text-align: right;
  }

  .roomTypeDetail {
    float: left;
    width: calc(100% - 70px);
    /*height: 100%;*/
    /*height: 30px;*/
    /*width: 200px;*/
    /*background-color: rosybrown;*/
    margin-bottom: 10px;
  }

  .roomTypeDetail > li {
    float: left;
  }

  .roomTypeDetailCon {
    color: #000;
    width: 80px;
    /*background-color: red;*/
    text-align: left;
    margin-right: 10px;
  }

  .roomTypeDetailConLeft {
    padding-top: 3px;
    width: 15px;
    height: 100%;
    float: left;
  }

  .roomTypeDetailConLeftInput {
    margin-top: 5px;
    width: 15px;
    height: 15px;
  }

  .roomTypeDetailCon > div:first-of-type {
    float: left;
    width: 15px;
    height: 100%;
  }

  .roomTypeDetailCon > div:last-of-type {
    height: 100%;
    width: 65px;
    overflow: hidden;
    color: #595959;
    font: 15px/2 '微软雅黑';
    font-weight: 500;
    /*background-color: rosybrown;*/
  }

  .roomTypeDetailCon > div:last-of-type > div {
    float: left;
    width: 100%;
    height: 100%;
  }

  .roomDetailContentBox {

    /*background-color: royalblue;*/
    /*height: 100%;*/
    width: 100%;
    /*    position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        top: 200px;*/
    /*overflow: scroll;*/
  }

  .roomDetailContent {
    /*padding-bottom: 50px;*/
    height: 100%;
    width: 100%;
    /*overflow: scroll;*/
    /*background-color: rebeccapurple;*/
    /*margin-bottom: 50px;*/
  }

  .roomDetailBottom {
    height: 50px;
    width: calc(100% - 280px);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    /*top: 400px;*/
    padding: 0px 0px 0px 50px;
    background-color: #fff;
  }

  .roomDetailBottom > ul > li {
    padding-top: 2px;
    margin-right: 10px;
    float: left;
  }

  .roomDetailBottom > ul > li > div {
    border: 1px solid silver;
    line-height: 25px;
    height: 25px;
    text-align: center;
    border-radius: 5px;
    padding: 0px 5px 0px 5px;
  }

  .roomDetailBottom > ul > li > div > div,
  .roomDetailBottom > ul > li > div > span,
  .roomDetailBottom > ul > li > div > strong {
    float: left;
  }

  .roomDetailBottom > ul > li > div > div:first-of-type {
    width: 15px;
    height: 15px;
    margin-top: 5px;
    margin-right: 5px;
  }

  .roomDetailBottom > ul > li:first-of-type > div > div:first-of-type {
    background-color: rgb(79, 129, 189);
  }

  .roomDetailBottom > ul > li:first-of-type {
    color: rgb(79, 129, 189);
  }

  .roomDetailBottom > ul > li {
    font: 15px/25px "微软雅黑";
    font-weight: 600;
  }

  .roomDetailBottom > ul > li:nth-of-type(2) {
    color: rgb(0, 176, 80);
  }

  .roomDetailBottom > ul > li:nth-of-type(2) > div > div:first-of-type {
    background-color: rgb(0, 176, 80);
  }

  .roomDetailBottom > ul > li:nth-of-type(3) > div > div:first-of-type {
    background-color: rgb(255, 0, 0);
  }

  .roomDetailBottom > ul > li:nth-of-type(3) {
    color: rgb(255, 0, 0);
  }

  .roomDetailBottom > ul > li:nth-of-type(4) > div > div:first-of-type {
    background-color: rgb(127, 127, 127);
  }

  .roomDetailBottom > ul > li:nth-of-type(4) {
    color: rgb(127, 127, 127);
  }

  .currentOccupancy {
    color: rgb(0, 128, 0);
    font: 15px/25px "微软雅黑";
    font-weight: 600;
    padding-top: 2px;
  }

  .marktBox {
    background-color: rgb(80, 80, 80);
    width: 60px;
    height: 30px;
    color: white;
    line-height: 30px;
    text-align: center;
    margin-top: 10px;
  }

  .roomIfoUL {
    margin: 10px 0px 0px 10px;
  }

  .roomIfoLi {
    width: 150px;
    height: 100px;
    margin: 0px 0px 10px 10px;
    float: left;
    color: #fff;
    position: relative;
  }

  .roomIfoLi.roomActive0 {
    background-color: rgb(18, 150, 215);
  }

  .roomIfoLi.roomActive1 {
    background-color: rgb(255, 187, 24);
  }

  .roomIfoLi.roomActive2 {

    background-color: rgb(255, 86, 86);
  }

  .roomIfoLi.roomActive3 {
    background-color: rgb(255, 86, 86);
  }

  .roomIfoLi.roomActive4 {
    background-color: rgb(143, 143, 143);
  }

  .clickRoomBaseClass {
    position: absolute;
    bottom: -200px;
    right: -295px;
    width: 445px;
    height: 300px;
    z-index: 100;
    background-color: rgb(80, 80, 80);
  }

  .roomIfoUL.clickRoomBaseClassHeight {
    height: 300px;
  }

  .clickRoomClass {
    position: absolute;
    bottom: -150px;
    right: -150px;
    width: 300px;
    height: 150px;
    background-color: rgb(80, 80, 80);
    z-index: 100;
  }

  .roomIfoLi > h1 {
    width: 150px;
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    margin-top: 8px;
    white-space: nowrap;
    position: absolute;
    left: 0;
    top: 0;
    /*z-index: 1;*/
    /*margin-left: 7px;*/
    /*background-color: rosybrown;*/
    overflow: hidden;
  }

  .roomIfoLi > h1 > div {
    width: 150px;
    height: 20px;
    position: absolute;
    transition: .5s;
    left: 0;
    top: 0;
  }

  .roomIfoLi > h1:hover > div {
    right: 0;
    left: -100%;
  }

  .roomIfoLi > div {
    margin-top: 30px;
  }

  .roomIfoLi > div > h2 {
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 10px;
  }

  .roomIfoLi > div > h3 {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }

  .maintainImgBox {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    background: url("../assets/img/home/maintain.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .broomImgBox {
    position: absolute;
    bottom: 5px;
    left: 5px;
    width: 20px;
    height: 20px;
    margin: 15px auto 0;
    background: url("../assets/img/home/broom.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .roomIfoLi > div > div {

  }

  .states {
    /*margin-top: 44px;*/
    background-color: rgb(246, 188, 76);
    color: #fff;
    height: 33px;
    width: 220px;
    padding-left: 5px;
    line-height: 33px;
  }

  .roomCard {
    color: rgb(0, 0, 255);
    border-bottom: 1px solid rgb(0, 0, 255);
    width: 60px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    margin: 5px auto 0;
  }

  .searchBox {
    height: 25px;
    width: 180px;
    border-radius: 5px;
    /*border: 1px solid silver;*/
    margin: 5px auto 0;
  }

  .searchBox > input {
    color: silver;
    height: 25px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    padding-left: 10px;
    width: 150px;
    float: left;
    border-right: 1px solid silver;
  }

  .searchImg {
    width: 28px;
    height: 25px;
    /*background-color: rosybrown;*/
    float: left;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    /*border-left: 1px solid silver;*/
    border-top: 1px solid silver;
    border-right: 1px solid silver;
    border-bottom: 1px solid silver;
  }
  .searchImg>div{
    width: 16px;
    height: 16px;
    margin: 3px auto 0;
    background: url("../assets/img/home/searchCondition.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .divLine {
    border: 1px solid rgb(246, 188, 76);
    margin-top: 8px;
  }

  .roomStateContent {
    /*background-color: rosybrown;*/
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 100px;
    padding-right: 15px;
    overflow-y: scroll;
  }

  .roomStateContent > ul > li {
    width: 200px;
    border-bottom: 1px solid rgb(246, 188, 76);
    padding: 10px 0px 10px 10px;
  }
  .roomStateContent > ul > li>div{
    margin-top: 10px;
  }

  .roomStateContent > ul > li > h1 {
    font-size: 12px;
    color: rgb(246, 188, 76);
    width: 180px;
    border-bottom: 1px solid black;
  }
  .roomStateContent > ul > li > h1 > span{
    color: #979797;
  }

  .roomState {
  }

/*  .roomState > li {
    width: 85px;
    float: left;
  }*/
/*

  .roomState > li > div:first-of-type {
    float: left;
    width: 20px;
    height: 100%;
    padding-top: 3px;
  }

  .roomState > li > div:last-of-type {
    overflow: hidden;
    height: 100%;
  }

  .roomState > li > div:last-of-type > div {
    width: 100%;
    height: 100%;
    font: 13px/24px "微软雅黑";
  }

  .roomState > li > div > input {
  }
  .roomState > li > div > input.louCengActive{
    background-color: #fff;
  }

  .roomState > li > div > span {
  }
*/


</style>
=======
<template>
  <div>
    <div class="container clearfix">
      <div class="containerLeft">
        <div class="headImg"></div>
        <div class="turnBack" @click="turnBack">回到主页</div>
      </div>
      <div class="content">
        <div class="contentBox">
          <!--顶部-->
          <header>
            <ul class="navList clearfix">
              <!--导航-->
              <li :class="{navActive:navActiveIndex==index}" v-for="item,index in navList"
                  @click.stop="clickNavList(item,index)">
                <div class="navImgBox"></div>
                <div>{{item.name}}</div>
              </li>
              <!--人-->
              <div class="peopleRight clearfix">
                <div class="peopleBox">
                  <span>小王</span>
                  <i></i>
                </div>
                <ul class="funcIcon clearfix">
                  <li>一</li>
                  <li>口</li>
                  <li>X</li>
                </ul>
              </div>
            </ul>
          </header>
          <!--内容-->
          <section class="clearfix">
            <div class="sessionLeft">
              <!--栋选项卡-->
              <ul class="sectionNav clearfix">
                <li v-for="item,index in sectionNavList" :class="{sectionNavActive:sectionNavIndex==index}"
                    @click="clickSectionNav(item,index)">
                  <div class="cansleX">X</div>
                  <span>{{item.BuildNo}}栋</span>
                </li>
              </ul>
              <div class="sessionLeftContentBox">
                <!--客源-->
                <ul class="roomType clearfix">
                  <li class="clearfix">
                    <!--筛选条件名称-->
                    <div class="roomTypeHeadName">客源:</div>
                    <!--筛选具体项目名称-->
                    <ul class="roomTypeDetail clearfix">
                      <div style="margin: 1px 0;"></div>
                      <el-checkbox-group v-model="checkedKeYuanData" @change="handleCheckedKeYuanChange">
                        <el-checkbox v-for="keYuan in newKeYuanList" :key="keYuan.wayID" :label="keYuan" >{{keYuan.wayName}}({{keYuan.bookFromCount}})</el-checkbox>
                      </el-checkbox-group>
                    </ul>
                  </li>
                  <li class="clearfix">
                    <!--筛选条件名称-->
                    <div class="roomTypeHeadName">入住渠道:</div>
                    <!--筛选具体项目名称-->
                    <ul class="roomTypeDetail clearfix">
                      <div style="margin: 1px 0;"></div>
                      <el-checkbox-group v-model="checkedGoRoomWay" @change="handleCheckedGoRoomWayChange">
                        <el-checkbox v-for="goRoomWay in newGoRoomWayList":key="goRoomWay.memberID" :label="goRoomWay" >{{goRoomWay.memberName}}({{goRoomWay.fromCount}})</el-checkbox>
                      </el-checkbox-group>
                    </ul>
                  </li>
                </ul>
                <!--具体房间信息-->
                <div class="roomDetailContentBox">
                  <div class="roomDetailContent">
                    <ul class="allRoomIfoUL">
                      <li v-for="itemRoomInfo,indexRoomInfo in roomStatesList">
                        <!--楼层-->
                        <div class="marktBox">{{itemRoomInfo.Level}}</div>
                        <!--房间4种状况-->
                        <ul class="roomIfoUL clearfix"
                            :class="{clickRoomBaseClassHeight:clickRoomBaseClassHeight==indexRoomInfo && clickRoomBaseClassState==2}">
                          <li
                            :class="[{roomActive0: itemRoomList.ht_re_State==0},{roomActive1: itemRoomList.ht_re_State==1},{roomActive2: itemRoomList.ht_re_State==2},{roomActive3: itemRoomList.ht_re_State==3},{roomActive4: itemRoomList.ht_re_State==4},]"
                            @click.stop="clickRoom(itemRoomInfo,indexRoomInfo,itemRoomList,indexRoomList)"
                            class="roomIfoLi"
                            v-for="itemRoomList,indexRoomList in itemRoomInfo.RoomList">
                            <h1>
                              <div>
                                {{itemRoomList.ht_re_HouseNumber}}
                                {{itemRoomList.roomTypeName}}
                              </div>
                            </h1>
                            <div v-show="itemRoomList.ht_re_State==0">
                              <h3>空</h3>
                            </div>
                            <div v-show="itemRoomList.ht_re_State==1">
                              <h3>空</h3>
                              <div class="broomImgBox"></div>
                            </div>
                            <div v-show="itemRoomList.ht_re_State==2">
                              <h2>{{itemRoomList.bookName}}</h2>
                              <div class="roomPeopleImg"></div>
                            </div>
                            <div v-show="itemRoomList.ht_re_State==3">
                              <h2>{{itemRoomList.bookName}}</h2>
                              <div class="roomPeopleImg"></div>
                              <div class="broomImgBox"></div>
                            </div>
                            <div v-show="itemRoomList.ht_re_State==4">
                              <div class="maintainImgBox"></div>
                            </div>
                            <!--入住-->
                            <div
                              v-show="
                              indexRoomInfo == pIndex && indexRoomList == cIndex && (itemRoomList.ht_re_State==0|| itemRoomList.ht_re_State==1 || itemRoomList.ht_re_State==4)"
                              class="clickRoomClass">
                              <ul class="roomTypeList clearfix">
                                <li @click.stop="clickGoRoom">入住</li>
                                <li>锁房</li>
                                <li>...</li>

                                <!--                              <li @click="clickRoomTypeList(item,index)" v-for="item,index in roomTypeDetailList">
                                                                {{item.name}}
                                                              </li>-->

                              </ul>
                              <div class="otherRoomType">
                                <div>
                                  <h1>维修</h1>
                                  <h1>脏房</h1>
                                  <h1>预定</h1>
                                </div>
                                <div></div>
                              </div>
                              <div class="roomIsShowX" @click.stop="roomIsShowX">X</div>
                            </div>
                            <!--在住信息Box-->
                            <!--<div v-show="onlineInfo&&itemRoomList.ht_re_State==2" class="clickRoomBaseClass">-->
                            <div
                              v-show="indexRoomInfo == pIndex && indexRoomList == cIndex && (itemRoomList.ht_re_State==2||itemRoomList.ht_re_State==3)"
                              class="clickRoomBaseClass">
                              <div>
                                <h1>{{itemRoomList.ht_re_HouseNumber}}{{itemRoomList.roomTypeName}}</h1>
                                <ul class="clearfix">
                                  <li :class="{onGoRoomInfoActive:onGoRoomInfoIndex ==index}"
                                      v-for="item,index in onGoRoomInfoList"
                                      @click.stop="clickOnGoRoomInfo(item,index)">{{item.name}}
                                  </li>
                                </ul>
                                <div @click.stop="clickCansleXOnlineInfo">X</div>
                              </div>
                              <!--在住信息-->
                              <div v-show="onGoRoomInfoIsShow" class="onRoomInfo clearfix">
                                <div></div>
                                <div>
                                  <h1>
                                    抵/离时间 : 2018/11/29 04:41 - 2018/11/29 12:00
                                  </h1>
                                  <h1>
                                    天数 : 1
                                    <span>房价 : 278.00</span>
                                  </h1>
                                  <h1>
                                    收款 : 278.00
                                  </h1>
                                </div>
                                <ul>
                                  <li @click.stop="clickAccountBox">账单</li>
                                  <li>续住</li>
                                  <li>换房</li>
                                  <li>改房</li>
                                  <li>改价</li>
                                  <li>...</li>
                                </ul>
                              </div>
                              <!--远期房态-->
                              <div v-show="farAwayRoomStateIsShow" class="farAwayRoomState clearfix">
                                <ul class="farAayRoomStateCon">
                                  <li v-for="item,index in 20">
                                    <h1>12/06</h1>
                                    <h1>空</h1>
                                  </li>
                                </ul>
                              </div>
                              <!--房价明细-->
                              <div v-show="roomPriceDetailIsShow" class="roomPriceDetail clearfix">
                                <ul class="clearfix">
                                  <li>日期</li>
                                  <li>房价</li>
                                </ul>
                                <ul class="clearfix">
                                  <li>2018/12/06</li>
                                  <li>120.00</li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
            <div class="sessionRight">
              <div class="states">营业实况/房间检索</div>
              <div class="roomCard">房卡查询</div>
              <!--房号/姓名搜索-->
              <div class="searchBox clearfix">
                <input type="text" placeholder="房号/姓名">
                <div class="searchImg">
                  <div></div>
                </div>
              </div>
              <div class="divLine"></div>
              <div class="roomStateContent">
                <ul>
                  <!--房态-->
                  <li >
                    <h1>房态</h1>
                    <div>
                      <el-checkbox :indeterminate="isIndeterminateRoomTai" v-model="checkAllRoomState" @change="handleCheckAllChangeRoomState">全选</el-checkbox>
                      <div style="margin: 15px 0;"></div>
                      <el-checkbox-group v-model="checkedRoomStateData" @change="handleCheckedRoomStateChange">
                        <el-checkbox v-for="roomTai in roomTaiList" :key="roomTai.roomStateID" :label="roomTai" >{{roomTai.roomStateName}}({{roomTai.stateCount}})</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </li>
                  <!--楼栋-->
                  <li >
                    <h1>楼栋<span>(总房数/空房数)</span></h1>
                    <div>
                      <el-radio-group v-model="louDongModel">
                        <el-radio
                          :label="itemLouDong"
                          :key="indexLouDong"
                          v-for="itemLouDong,indexLouDong in louDongList"
                          @change="changeLouDong(itemLouDong,indexLouDong)"
                        >
                          {{itemLouDong.BuildNo}}({{itemLouDong.BuildRoomCount}}/{{itemLouDong.BuildRoomCount-itemLouDong.BuildPersonCount}})&nbsp&nbsp
                        </el-radio>
                      </el-radio-group>
                    </div>
                  </li>
                  <!--楼层-->
                  <li >
                    <h1>楼层<span>(总层数/空房数)</span></h1>
                    <div>
                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                      <div style="margin: 15px 0;"></div>
                      <el-checkbox-group v-model="checkedLouCengData" @change="handleCheckedLouCengChange">
                        <el-checkbox v-for="louCeng in newLouCengList" :label="louCeng" :key="louCeng">{{louCeng}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
            <!--底部房间信息-->
            <div class="roomDetailBottom">
              <ul>
                <li>
                  <div>
                    <div></div>
                    <div>全部</div>
                    <strong></strong>
                    <span>({{allRoom}})</span>
                  </div>
                </li>
                <li>
                  <div>
                    <div></div>
                    <div>空房</div>
                    <strong></strong>
                    <span>({{emptyRoomCount}})</span>
                  </div>
                </li>
                <li>
                  <div>
                    <div></div>
                    <div>住人</div>
                    <strong></strong>
                    <span>({{personRoomCount}})</span>
                  </div>
                </li>
                <li>
                  <div>
                    <div></div>
                    <div>维修</div>
                    <strong></strong>
                    <span>({{mendRoomCount}})</span>
                  </div>
                </li>
              </ul>
              <div class="currentOccupancy">当前入住率 : {{inFate}}%</div>
            </div>
          </section>
          <!--底部-->
          <footer class="clearfix">
            <div class="clearfix">
              <div @click="stageHelper" class="clearfix">
                <div class="phoneImg"></div>
                <span>前台助手</span>
              </div>
              <div @click="clickMessage" class="clearfix">
                <div class="messageImg"></div>
                <span>消息</span>
                <div class="liu">6</div>
              </div>
            </div>
          </footer>
          <!--入住-->
          <div class="goRoomBoxBig" v-show="goRoomBoxIsShow">
            <!--遮罩-->
            <div class="goRoomBoxShade"></div>
            <div class="goRoomBox">
              <!--头部-->
              <div class="goRoomBoxTitle">
                <span>入住</span>
                <div></div>
              </div>
              <div class="goRoomBoxTab clearfix">
                <div @click="clickgoRoomName(item,index)" :class="{goRoomNameActive: goRoomNameIndex==index}"
                     v-for="item,index in goRoomName">{{item.name}}
                </div>
              </div>
              <!--入住内容1-->
              <div class="goRoomBoxContent" v-show="personageGoRoom">
                <div class="peopleContentBox clearfix">
                  <!--左-->
                  <div class="peopleContentBoxLeft"></div>
                  <!--右-->
                  <div class="peopleContentBoxRight clearfix">
                    <!--右上盒子-->
                    <div class="formInputBox clearfix">
                      <div class="goRoomBoxInput">
                        <span>姓名:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                      <div class="goRoomBoxInput">
                        <span>证件类型:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                      <div class="goRoomBoxInput">
                        <span>证件号:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                      <div class="goRoomBoxInput">
                        <span>电话:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                    </div>
                    <!--清除客人资料-->
                    <div class="clearGuestInfo">清除客人资料</div>
                  </div>
                </div>
                <!--订单信息-->
                <div class="orderIfo clearfix">
                  <div></div>
                  <div>订单信息</div>
                  <div></div>
                </div>
                <!--日期选择-->
                <div class="dateChoise">
                  <!--天数-->
                  <div class="days">
                    <span>天数 : </span>
                    <input type="number">
                    <span>*</span>
                  </div>
                  离开日期:
                  <!--离开日期-->
                  <el-date-picker
                    v-model="value1"
                    height="25px"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>

                </div>
                <!--订单信息-->
                <div class="orderIfo clearfix">
                  <div></div>
                  <div>订单信息</div>
                  <div></div>
                </div>
                <!--table-->
                <div class="tableBox">
                  <el-table
                    ref="multipleTable"
                    :data="null"
                    tooltip-effect="dark"
                    style="width: 100%"
                  >
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      label="房号"
                      width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="房型"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="房价"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="姓名"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="证件号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="手机号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="操作"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>

                </div>
                <!--合计-->
                <div class="heji">
                  <span>合计<i>1</i>房间</span>
                  <span>选中<i>1</i>房间</span>
                </div>
                <!--选房-->
                <ul class="choiceRoom clearfix">
                  <li>选房</li>
                  <li>改价</li>
                </ul>
                <!--入住-->
                <ul class="goRoomAndCansle">
                  <li @click="clickGoRoomBox">入住</li>
                  <li @click="clickGoRoomBoxCansle">取消</li>
                </ul>
              </div>
              <!--入住内容2-->
              <div class="goRoomBoxContent" v-show="enterpriseGoRoom">
                <div class="peopleContentBox clearfix">
                  <!--左-->
                  <div class="peopleContentBoxLeft"></div>
                  <!--右-->
                  <div class="peopleContentBoxRight clearfix">
                    <!--右上盒子-->
                    <div class="formInputBox clearfix">
                      <div class="goRoomBoxInput">
                        <span>企业名称:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                      <div class="goRoomBoxInput">
                        <span>手机号:</span>
                        <input type="text">
                        <span>*</span>
                      </div>
                    </div>
                    <!--清除客人资料-->
                    <div class="clearGuestInfo">清除客人资料</div>
                  </div>
                </div>
                <!--订单信息-->
                <div class="orderIfo clearfix">
                  <div></div>
                  <div>订单信息</div>
                  <div></div>
                </div>
                <!--日期选择-->
                <div class="dateChoise">
                  <!--天数-->
                  <div class="days">
                    <span>天数 : </span>
                    <input type="number">
                    <span>*</span>
                  </div>
                  离开日期:
                  <!--离开日期-->
                  <el-date-picker
                    v-model="value1"
                    height="25px"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>

                </div>
                <!--订单信息-->
                <div class="orderIfo clearfix">
                  <div></div>
                  <div>订单信息</div>
                  <div></div>
                </div>
                <!--table-->
                <div class="tableBox">
                  <el-table
                    ref="multipleTable"
                    :data="null"
                    tooltip-effect="dark"
                    style="width: 100%"
                  >
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      label="房号"
                      width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="房型"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="房价"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="姓名"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="手机号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="操作"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>

                </div>
                <!--合计-->
                <div class="heji">
                  <span>合计<i>1</i>房间</span>
                  <span>选中<i>1</i>房间</span>
                </div>
                <!--选房-->
                <ul class="choiceRoom clearfix">
                  <li>选房</li>
                  <li>改价</li>
                </ul>
                <!--入住-->
                <ul class="goRoomAndCansle">
                  <li>入住</li>
                  <li>取消</li>
                </ul>
              </div>
              <!--入住窗口-->
              <div v-show="goRoomBoxLittleBoxIsTrue">
                <div class="goRoomBoxLittleBoxShade"></div>
                <div class="goRoomBoxLittleBox">
                  <h1>选房间</h1>
                  <div class="goRoomBoxLittleBoxCon">
                    <h1>
                      <input type="radio">
                      <span>按房型</span>
                    </h1>
                    <div class="clearfix">
                      <div class="goRoomBoxLittleBoxConLeft">
                        <div>房型</div>
                        <ul>
                          <li v-for="item,index in roomTypeChoiceList">{{item.name}}</li>
                        </ul>
                      </div>
                      <div class="goRoomBoxLittleBoxConRight">
                        <ul class="goRoomBoxLittleBoxConRightTitle clearfix">
                          <li v-for="item,index in loudongList">{{item.name}}</li>
                        </ul>
                        <ul class="goRoomBoxLittleBoxConRightCon">
                          <li v-for="item,index in 3" class="clearfix">
                            <div>1</div>
                            <div>2</div>
                            <div><input type="checkbox"></div>
                            <ul>
                              <li>201</li>
                              <li>202</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h2>已选房间</h2>
                    <div class="choicedRoomContent">
                      <ul class="clearfix">
                        <li>房型</li>
                        <li>数量</li>
                        <li>房号</li>
                      </ul>
                      <div>
                        <div class="clearfix" v-for="item,index in roomTypeConList">
                          <div>{{item.name}}</div>
                          <div>{{item.num}}</div>
                          <div>
                            <div>{{item.roomNumber}}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="goRoomBoxLittleBoxBot">
                    <div><span>已选合计 <span>8</span> 间</span></div>
                    <ul class="clearfix">
                      <li @click="clickGoRoomSure">确定</li>
                      <li @click="clickGoRoomCansle">取消</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--账单信息-->
          <div class="accountInfoBox" v-show="accountInfoIsShow">
            <!--遮罩-->
            <div class="accountInfoShade"></div>
            <div class="accountInfo">
              <!--账单信息头部-->
              <div class="accountInfoTitle">
                <span>账单信息</span>
                <div @click="clickAccountInfoFalse"></div>
              </div>
              <!--账单信息内容-->
              <div class="accountInfoContent clearfix">
                <!--账单信息内容左-->
                <div class="accountInfoContentLeft">
                  <!--账单信息人信息-->
                  <div class="accountInfoContentLeftPeopleInfo">
                    <div class="peopleBoxContent clearfix">
                      <div class="peopleBoxContentLeft"></div>
                      <div class="peopleBoxContentRight">
                        <h1>501</h1>
                        <h1>普通大房</h1>
                        <h1>王小容</h1>
                      </div>
                    </div>
                    <div class="roomPriceBox">
                      <h1>房价 : 120.00</h1>
                      <h1>抵离 : 18/12/06-18/12/04</h1>
                      <h1>王小容</h1>
                    </div>
                  </div>
                  <!--账单信息的房号-->
                  <div class="roomNumber">
                    <ul class="roomNumberTitle clearfix">
                      <li>房号</li>
                      <li>姓名</li>
                      <li>入住时间</li>
                    </ul>
                    <ul class="roomNumberContent clearfix">
                      <li class="clearfix">
                        <div>407</div>
                        <div>555</div>
                        <div>18/12/06 09:59</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--账单信息内容右-->
                <div class="accountInfoContentRight">
                  <!--结账-->
                  <div class="costAccount">结账</div>
                  <!--总计Box-->
                  <div class='AllMoney clearfix'>
                    <div class="AllMoneyLeft">
                      <h1>总计 :</h1>
                      <h1>应收120.00</h1>
                    </div>
                    <div class="AllMoneyRight">
                      <h1>房费 : 120.00</h1>
                      <h1>押金 : 120.00</h1>
                      <h1>其他消费 : 0</h1>
                    </div>
                  </div>
                  <!--总数-->
                  <div class="allNumber clearfix">
                    <span>总数 : 1</span>
                    <span>选中数 : 1</span>
                  </div>
                  <!--显示-->
                  <div class="displayBox">
                    <div class="displayBoxInfo">显示当前消费信息</div>
                    <el-table
                      ref="multipleTable"
                      :data="null"
                      tooltip-effect="dark"
                      style="width: 100%"
                    >
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        label="消费时间"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="营业项目"
                        width="120">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="类型"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="业务详情"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="状态"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="数量"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="金额"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="属性"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="房号"
                        show-overflow-tooltip>
                      </el-table-column>
                    </el-table>

                  </div>

                </div>
              </div>
              <!--结账方式选择-->
              <div class="payWayChoice" v-show="payWayChoiceIsShow">
                <h1>结账方式选择</h1>
                <!--结账方式选择内容-->
                <ul class="payWayChoiceContent">
                  <li>
                    <div class="payWayChoiceName">收款方式:</div>
                    <div class="payWayChoiceInput">
                      <input type="radio">
                      <span>现金</span>
                      <input type="radio">
                      <span>惠乐游app</span>
                      <input type="radio">
                      <span>支付宝</span>
                      <input type="radio">
                      <span>微信</span>
                    </div>
                  </li>
                  <li>
                    <div class="payWayChoiceName">收款金额:</div>
                    <div class="payWayChoiceInput">
                      <input type="number" placeholder="13.00">
                    </div>
                  </li>
                  <li>
                    <div class="payWayChoiceName">备注:</div>
                    <div class="payWayChoiceInput">
                      <input type="text">
                    </div>
                  </li>
                </ul>
                <!--结账方式选择底部-->
                <ul class="payWayChoiceFoot clearfix">
                  <li @click="payWayChoiceSure">确定</li>
                  <li @click="payWayChoiceCansle">取消</li>
                </ul>
              </div>
            </div>
          </div>
          <!--收银助手-->
          <div class="cashierAssistant" v-show="cashierAssistantIsShow">
            <div class="cashierAssistantTitle">收银助手</div>
            <div class="cashierAssistantContent">
              <ul class="clearfix">
                <li v-for="item,index in cashierAssistantList" @click="clickCashierAssistantName(item,index)"
                    :class="{cashierAssistantLiActive:cashierAssistantLiIndex==index}">
                  <div>
                    <div>
                      <div :class="{cashierAssistantImgActive:cashierAssistantLiIndex==index}"></div>
                    </div>
                    <h1>{{item.name}}</h1>
                  </div>
                </li>
              </ul>
              <div></div>
              <div>
                <textarea type="text" placeholder="请输入你的..."></textarea>
              </div>
              <div @click="send">发送</div>
            </div>
          </div>
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
          <!--订单-->
          <div class="orderBox" v-show="false">
          </div>
          <!--消息-->
          <div class="messageBox" v-show="messageBoxIsTrue">
            <div>
              <ul class="clearfix">
                <li :class="{clickMassageNavActive:clickMassageNavIndex == index}" @click="clickMassageNav(item,index)"
                    v-for="item,index in messageList">{{item.name}}
                </li>
              </ul>
            </div>
            <ul>
              <li class="messageCont" v-for="item,index in messageContList">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    conputed: mapGetters([
      'initCashierDeskList',//初始化数据
      'cashierDeskConditionSearchList',//收银员根据条件查询房列表
      'homeSearchConditionList',//首页查询条件列表
    ]),
    data() {
      return {
        louDongIndex:0,//楼栋index
        hotelID:4,//酒店编码
        roomState:[],//房态
        custFrom:[],//入住渠道
        orderFrom:[],//客源
        buildNo:[],//栋数
        levelNo:[],//楼层
        allLevelNo:[],//全选楼层
        louDongModel: 0,
        checkAll: false,//楼层全选
        checkAllRoomState: false,//房态全选
        checkAllKeYuan: false,//客源全选
        checkAllGoRoomWay: false,//入住渠道全选
        checkedLouCengData: [],//楼层选中数据
        checkedRoomStateData: [],//房态选中数据
        checkedKeYuanData: [],//客源选中数据
        checkedGoRoomWay: [],//入住渠道选中数据
        newLouCengList: [],//新的楼层数组
        newRoomTaiList: [],//新的房态数组
        newKeYuanList: [],//新的客源数组
        newGoRoomWayList: [],//新的入住渠道数组
        keYuanList: [],//客源数组
        isIndeterminate: true,//楼层是否全选
        isIndeterminateRoomTai: true,//房态是否全选
        isIndeterminateKeYuan: true,//客源是否全选
        isIndeterminateGoRoomWay: true,//入住渠道是否全选
        louDongChecked:-1,//选择楼栋
        louCengChecked:-1,//选择楼层
        louDongList:[],//楼栋列表
        louCengList:[],//楼层列表
        pIndex: -1,
        cIndex: -1,
        isShow: false,
        clickRoomBaseClassHeight: -1,//在住信息Box高度是否改变
        clickRoomBaseClassState: -1,
        passengerSourceList: [],//客源列表
        InChannelList: [],//入住渠道列表
        roomTypeChoiseList: [],//房间类型选择条件列表
        roomTaiList: [],//房态
        sectionNavIndex: 0,//默认选中第一栋
        inFate: 0,//当前入住率
        allRoom: 0,//全部
        emptyRoomCount: 0,//空房
        personRoomCount: 0,//住人
        mendRoomCount: 0,//维修
        onGoRoomInfoIsShow: true,
        farAwayRoomStateIsShow: false,
        roomPriceDetailIsShow: false,
        onGoRoomInfoIndex: 0,
        onGoRoomInfoList: [
          {name: "在住信息"},
          {name: "远期房态"},
          {name: "房价明细"},
        ],
        clickRoomIndex: -1,
        clickRoomInfoIndex: -1,
        roomActive: [
          {id: 0},
          {id: 1},
          {id: 2},
          {id: 3},
        ],
        roomIndex: -1,
        roomStatesList: [],//房间数据
        orginRoomStatesList: [],//初始房间数据
        goRoomBoxLittleBoxIsTrue: true,
        payWayChoiceIsShow: true,
        messageContList: [],
        clickMassageNavIndex: 1,
        messageList: [
          {name: "未读消息"},
          {name: "已读消息"},
        ],
        roomTypeConList: [],
        loudongList: [
          {name: "楼栋"},
          {name: "楼层"},
          {name: "全选"},
          {name: "房号"},
        ],
        roomTypeChoiceList: [
          {name: "双人房"},
          {name: "普通大床房"},
          {name: "标准大床房"},
          {name: "标准套房"},
        ],
        cashierAssistantList: [
          {name: '清洁工'},
          {name: '服务员'},
          {name: '清洁工'},
        ],
        value1: [],
        personageGoRoom: true,
        messageBoxIsTrue: false,
        onlineInfo: false,
        handClassBoxIsTrue: false,//交班
        goRoomBoxIsShow: false,
        accountInfoIsShow: false,
        enterpriseGoRoom: false,
        cashierAssistantIsShow: false,
        goRoomNameIndex: 0,
        cashierAssistantLiIndex: 0,
        goRoomName: [
          {name: '个人入住'},
          {name: '企业入住'}
        ],
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        roomTypeDetailList: [
          {
            name: '入住',
          },
          {
            name: '锁房',
          },
          {
            name: '...',
          },
        ],
        roomIsShow: false,
        roomDetailList: [
          {
            roomName: '全部',
            number: 47
          },
          {
            roomName: '空房',
            number: 38
          },
          {
            roomName: '住人',
            number: 9
          },
          {
            roomName: '维修',
            number: 0
          },
        ],
        roomTypeList: [],
        navActiveIndex: 0,
        sectionNavList: [],
        roomDetailContentList: [],//具体房间信息列表
        navList: [
          {name: '客房'},
          {name: '订单'},
          {name: '会员'},
          {name: '投诉'},
          {name: '交班'},
        ],
      }
    },
    created() {
//      初始化首页查询条件
      this.homeSearchCondition();
//      初始化房间数据
      this.initRoomData();
      for (let i = 0; i < 3; i++) {
        this.roomTypeConList.push(
          {name: '双人房', num: 1, roomNumber: 301}
        )
      }
      ;
//    消息数据
      for (let i = 0; i < 10; i++) {
        this.messageContList.push(
          {name: '308退房'}
        )
      };
//    房间类型选择条件列表
      for (let i = 0; i < 2; i++) {
        this.roomTypeChoiseList[0] = {name: '客源'};
        this.roomTypeChoiseList[1] = {name: '入住渠道'};
      }
      ;
    },
    methods: {
      /**
       * 上筛选点击客源
       * **/
      handleCheckedKeYuanChange(value){
        value=value.map((item)=>{
          return item.wayID
        });
        this.orderFrom=value;
        this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);
        let checkedCount = value.length;
        this.checkAllKeYuan = checkedCount === this.newKeYuanList.length;
        this.isIndeterminateKeYuan = checkedCount > 0 && checkedCount < this.newKeYuanList.length;
      },
      /**
       * 上筛选点击入住渠道
       * **/
      handleCheckedGoRoomWayChange(value){
        value=value.map((item)=>{
          return item.memberID
        });
        this.custFrom=value;
        this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);
        let checkedCount = value.length;
        this.checkAllGoRoomWay = checkedCount === this.newGoRoomWayList.length;
        this.isIndeterminateGoRoomWay = checkedCount > 0 && checkedCount < this.newGoRoomWayList.length;
      },
      /**
       * 右侧筛选点击楼栋
       * **/
      changeLouDong(obj,index){
        this.louDongIndex=index;
        this.sectionNavIndex=index;
        this.allLevelNo=[];
        this.allLevelNo=obj.LevelList.map((item)=>{
          return item.Level;
        });
        this.buildNo=obj.BuildNo
        /**
         * 点击楼栋显示楼层数据
         * */
        this.louCengList=[];//清空楼层数据
        this.newLouCengList=[];//清空新楼层数据
        this.checkedLouCengData=[];//选择楼层数据
        this.checkAll=false;//全选
/*        this.louCengList=obj.LevelList;//楼层数据
        //改变楼层数据
        this.louCengList.map((item)=>{
          this.newLouCengList.push(item.Level+"("+item.LevelRoomCount+"/"+(item.LevelRoomCount-item.LevelUseCount)+")");
        });*/

        /**
         * 点击楼栋查询楼栋的数据
         * */
        //根据条件楼栋编号查询楼栋数据
        this.buildNo=[];
        this.buildNo.push(obj.BuildNo);
        this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);
      },
      /**
       * 右侧筛选点击楼层
       * **/
      //全选
      handleCheckAllChange(val) {
        if(this.levelNo==[]){
          this.checkAll=false;
        };
        if(val){
          this.levelNo=this.allLevelNo;
          this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);
        }else {
          this.roomStatesList=[];
        }
        this.checkedLouCengData = val ? this.newLouCengList : [];
        this.isIndeterminate = false;
      },
      //选择楼层
      handleCheckedLouCengChange(value) {
        //点击这栋楼的楼层获取楼层数组
        value=value.map((item)=>{
          return Number(item.toString().substring(0,1))
        });
        this.levelNo=value;
        //根据楼栋和楼层查询并更新更新楼层数据
        this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);
        //得到所有房间更新后的数据筛选出所选的对应房间
        this.roomStatesList=this.orginRoomStatesList.filter((item)=>{
          for(let i=0;i<=value.length;i++){
            if(item.Level==value[i]){
              return true;
            };
          };
        });
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.newLouCengList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.newLouCengList.length;
      },
      /**
       * 右侧筛选点击房态
       * **/
      //全选房态
      handleCheckAllChangeRoomState(val){
        this.checkedRoomStateData = val ? this.newRoomTaiList : [];
        this.isIndeterminateRoomTai = false;
      },
      //选中房态
      handleCheckedRoomStateChange(value){
        value=value.map((item)=>{
          return Number(item.roomStateID)
        });
        this.roomState=value;
        this.conditionRoomSearch(this.hotelID,this.roomState,this.custFrom,this.orderFrom,this.buildNo,this.levelNo);

        let checkedCount = value.length;
        this.checkAllRoomState = checkedCount === this.newRoomTaiList.length;
        this.isIndeterminateRoomTai = checkedCount > 0 && checkedCount < this.newRoomTaiList.length;
      },
      //点击X取消房间状态
      roomIsShowX() {
        this.pIndex = -1;
      },
      //点击X取消在住信息
      clickCansleXOnlineInfo() {
        this.pIndex = -1;
        this.clickRoomBaseClassHeight = -1;
      },
      //点击栋标签页
      clickSectionNav(item, index) {
        this.sectionNavIndex = index;
        this.orginRoomStatesList = item.LevelList;
        this.roomStatesList = item.LevelList;
        //清空上筛选条件
        this.checkedKeYuanData=[];
        this.checkedGoRoomWay=[];
      },
      //回到主页
      turnBack() {
        this.$router.go(-1)
      },
      //首页查询条件
      homeSearchCondition(){
        //查询请求数据时清空所有条件数据
        this.allRoom=0;
        this.emptyRoomCount=0;
        this.personRoomCount=0;
        this.mendRoomCount=0;
        this.inFate=0;
        this.keYuanList=[];
        this.newKeYuanList=[];
        this.goRoomWayList=[];
        this.newGoRoomWayList=[];
        this.roomTaiList=[];
        this.newRoomTaiList=[];

        this.louDongList=[];
        let option = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": 4,//酒店编码
        };
        this.$store.dispatch("homeSearchConditionAction", option)
          .then(
            data => {
              /**
               * 选择楼栋更新上部筛选条件
               * */
              //客源
              this.keYuanList=[];//清空客源数据
              this.newKeYuanList=[];//清空新客源数据
              this.keYuanList=data.data.bookWayList;
              this.newKeYuanList=this.keYuanList;

              //入住渠道
              this.goRoomWayList=[];//清空入住渠道数据
              this.newGoRoomWayList=[];//清空新入住渠道数据
              this.goRoomWayList=data.data.custFromList;
              this.newGoRoomWayList=this.goRoomWayList;

              /**
               * 更新底部数据
               * */
              this.goRoomWayList='';//清空全部
              this.emptyRoomCount='';//清空空房
              this.personRoomCount='';//清空住人
              this.mendRoomCount='';//清空维修
              this.inFate='';//清空当前入住率
              //全部
              this.allRoom = data.data.totalRows;
              //空房
              this.emptyRoomCount = data.data.emptyRoomCount;
              //住人
              this.personRoomCount = data.data.personRoomCount;
              //维修
              this.mendRoomCount = data.data.mendRoomCount;
              //当前入住率
              this.inFate = data.data.inFate;

              /**
               * 右侧条件初始化
               * **/
              //房态
              this.roomTaiList = data.data.conditionList;
              this.roomTaiList.map((item)=>{
                this.newRoomTaiList.push(item.roomStateName+"("+item.stateCount+")");
              });
              // 楼栋
              this.louDongList=data.data.hotelConditionList;
              this.louDongModel=this.louDongList[0];//默认楼栋

              /**
               * 初始化成功返回消息
               * **/
              this.$notify({
                type: 'success',
                message: '初始化筛选条件成功'
              });
            }, err => {
              this.$notify({
                type: 'err',
                message: err
              });
            })
      },
//    初始化房间数据
      initRoomData() {
        let option = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": 4,//酒店编码
          //"roomState": [0,1,2,3,4],//房间状态0空净 1空脏  2住人净 3住人脏  4维修
//          "custFrom": [0],//0散客 1会员 2企业
          //"orderFrom": [0],//下单方式 0线下 1线上
          //"buildNo": [1],//楼栋
          //"levelNo": [1,2,3,5],//楼层
        };
        this.$store.dispatch("initCashierDeskAction", option)
          .then(
            data => {
              //栋数标签页
              this.sectionNavList = data.data.BuildNoList;
              //初始化房间原始数据
              this.orginRoomStatesList = data.data.BuildNoList[0].LevelList;
              this.roomStatesList=this.orginRoomStatesList;
              // 初始化成功返回消息
              this.$notify({
                type: 'success',
                message: '初始化房间状态成功'
              });
            }, err => {
              this.$notify({
                type: 'err',
                message: err
              });
            })
      },
//    房间条件查询
      conditionRoomSearch(hotelID,roomState,custFrom,orderFrom,buildNo,levelNo) {
        let option = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "hotelID": hotelID?hotelID:4,//酒店编码
          "roomState": roomState?roomState:[],//房间状态0空净 1空脏  2住人净 3住人脏  4维修
          "custFrom": custFrom?custFrom:[],//0散客 1会员 2企业
          "orderFrom": orderFrom?orderFrom:[],//下单方式 0线下 1线上
          "buildNo": buildNo?buildNo:[],//楼栋
          "levelNo": levelNo?levelNo:[],//楼层
        };
        this.$store.dispatch("cashierDeskConditionSearchAction", option)
          .then(
          data => {
            /**
             * 更新房间状态
             * */
            this.orginRoomStatesList=[];//清空原始房间状态数据
            this.roomStatesList=[];//清空房间状态数据
            console.log(data.data.BuildNoList)
            if(data.data.BuildNoList[0]){
              this.orginRoomStatesList = data.data.BuildNoList[0].LevelList;
            };
            this.roomStatesList=this.orginRoomStatesList;

            /**
             * 默认第一栋楼层数据
             * */
            this.louCengList=[];//清空楼层数据
            this.newLouCengList=[];//清空新楼层数据
            this.checkedLouCengData=[];//选择楼层数据
            this.checkAll=false;//全选
            this.louCengList=obj.LevelList;//楼层数据
            //改变楼层数据
            this.louCengList.map((item)=>{
              this.newLouCengList.push(item.Level+"("+item.LevelRoomCount+"/"+(item.LevelRoomCount-item.LevelUseCount)+")");
            });
            /**
             * 消息提示
             * */
            this.$notify({
              type: 'success',
              message: '当前楼栋以及条件数据查询成功'
            });
          }, err => {
            this.$notify({
              type: 'err',
              message: err
            });
          });
      },
//    点击在住信息
      clickOnGoRoomInfo(item, index) {
        this.onGoRoomInfoIndex = index;
        if (index == 0) {
          this.onGoRoomInfoIsShow = true;
          this.farAwayRoomStateIsShow = false;
          this.roomPriceDetailIsShow = false;
        }
        if (index == 1) {
          this.onGoRoomInfoIsShow = false;
          this.farAwayRoomStateIsShow = true;
          this.roomPriceDetailIsShow = false;
        }
        if (index == 2) {
          this.onGoRoomInfoIsShow = false;
          this.farAwayRoomStateIsShow = false;
          this.roomPriceDetailIsShow = true;
        }

      },
//    确定结账方式选择
      payWayChoiceSure() {
        this.payWayChoiceIsShow = false;
      },
//    取消结账方式选择
      payWayChoiceCansle() {
        this.payWayChoiceIsShow = false;
      },
//    点击选房间取消
      clickGoRoomCansle() {
        this.goRoomBoxLittleBoxIsTrue = false;
      },
//    点击选房间取消
      clickGoRoomSure() {
        this.goRoomBoxLittleBoxIsTrue = false;
      },
//    点击消息盒子导航条
      clickMassageNav(item, index) {
        this.clickMassageNavIndex = index;
      },
//    点击消息
      clickMessage() {
        this.messageBoxIsTrue = !this.messageBoxIsTrue;
      },
//      取消交班
      handClassCansle() {
        this.handClassBoxIsTrue = false;
      },
//      确定交班
      handClassSure() {
        this.handClassBoxIsTrue = false;
      },
//      叉掉交班
      clickHandClass() {
        this.handClassBoxIsTrue = false;
      },
      clickAccountInfoFalse() {
        this.accountInfoIsShow = false;
      },
      clickAccountBox() {
        this.onlineInfo = false;
        this.accountInfoIsShow = true;
      },
      send() {
        this.cashierAssistantIsShow = false;
      },
      clickCashierAssistantName(item, index) {
        this.cashierAssistantLiIndex = index;
      },
      stageHelper() {
        this.cashierAssistantIsShow = true;
      },
      clickGoRoomBox() {
        this.goRoomBoxIsShow = false;
      },
      clickGoRoomBoxCansle() {
        this.goRoomBoxIsShow = false;
      },
//    点击入住
      clickgoRoomName(item, index) {
        this.goRoomNameIndex = index;
        if (index == 0) {
          this.personageGoRoom = true;
          this.enterpriseGoRoom = false;
        } else {

          this.personageGoRoom = false;
          this.enterpriseGoRoom = true;
        }
      },
//    入住
      clickGoRoom() {
        this.roomIsShow = false;
        this.goRoomBoxIsShow = true;
      },
      clickRoomTypeList(item, index) {
        if (index == 2) {
        }
        ;
      },
      clickNavList(item, index) {
        this.navActiveIndex = index;
        switch(index){
          case 1:
            this.$router.push({name: 'AdminEndOrder'});
            break;
          case 3 :
            //      点击投诉
            this.$router.push({
              name:'Complain',
            });
            return ;
          case 4 :
            this.handClassBoxIsTrue = true;//      点击交班
            return;
        }
      },
      clickRoom(pItem, pIndex, item, index) {
        this.pIndex = pIndex;
        this.cIndex = index;
      }
    },
    mounted(){
      /**
       * 首页查询条件和房间隔10分钟刷新一次
       * */
      clearInterval(timer);
      var timer=setInterval(()=>{
        this.homeSearchCondition();
        this.initRoomData();
      },600000)
    },
  }
</script>

<style scoped>

  .cansleX {
    width: 10px;
    height: 10px;
    position: absolute;
    right: 2px;
    top: 2px;
    font-size: 10px;
    line-height: 10px;
    color: #fff;
  }

  .roomPeopleImg {
    width: 35px;
    height: 40px;
    background: url("../assets/img/home/people.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .farAayRoomStateCon > li {
    float: left;
    color: #fff;
  }

  .messageBox > ul {
    width: 230px;
    height: 200px;
    padding-right: 15px;
    overflow-y: scroll;
    border: 1px dashed black;
  }

  .messageBox > ul > li {
    border-bottom: 1px solid rgb(253, 223, 164);
    height: 30px;
    font: 15px/2 "微软雅黑";
    padding-left: 10px;
  }

  .messageBox > div > ul > li {
    float: left;
    width: 70px;
    height: 25px;
    text-align: center;
  }

  .messageBox > div > ul > li.clickMassageNavActive {
    color: #000;
    background-color: #fff;
  }

  .messageBox > div > ul {
    padding-top: 5px;
    padding-left: 5px;
  }

  .messageBox > div {
    height: 35px;
    width: 230px;
    background-color: rgb(255, 85, 85);
    color: #fff;
    line-height: 25px;
  }

  .messageBox {
    width: 230px;
    height: 230px;
    background-color: white;
    position: fixed;
    bottom: 35px;
    right: 5px;
    z-index: 70;
  }

  .choicedRoomContent > div > div > div {
    float: left;
    height: 30px;
  }

  .choicedRoomContent > div > div:nth-child(odd) {
    background-color: #fff;
  }

  .choicedRoomContent > div > div:nth-child(even) {
    background-color: rgb(242, 242, 242);
  }

  .choicedRoomContent > div > div > :nth-child(3) > div {
    color: #fff;
    background-color: rgb(255, 86, 86);
    width: 45px;
    text-align: center;
    height: 20px;
    margin-top: 5px;
    line-height: 20px;
  }

  .choicedRoomContent > div > div {

  }

  .choicedRoomContent > div {
    width: 620px;
    height: 70px;
    /*overflow: scroll;*/
  }

  .choicedRoomContent {
    height: 30px;
    width: 485px;
    line-height: 30px;
  }

  .choicedRoomContent > ul > li {
    color: white;
    background-color: rgb(80, 80, 80);
    float: left;
    font: 15px/2 "微软雅黑";
    padding-left: 5px;
  }

  .choicedRoomContent > ul > li:nth-child(1) {
    width: 120px;
    margin-right: 5px;
  }

  .choicedRoomContent > div > div > div:nth-child(1) {
    width: 120px;
    margin-right: 5px;
  }

  .choicedRoomContent > ul > li:nth-child(2) {
    width: 60px;
    margin-right: 5px;
  }

  .choicedRoomContent > div > div > div:nth-child(2) {
    width: 60px;
    margin-right: 5px;
  }

  .choicedRoomContent > ul > li:nth-child(3) {
    width: 430px;
  }

  .choicedRoomContent > div > div > div:nth-child(3) {
    width: 430px;
  }

  .goRoomBoxLittleBoxConRightTitle {

  }

  .goRoomBoxLittleBoxConRightTitle > li {
    float: left;
    height: 30px;
    background-color: rgb(80, 80, 80);
    color: #fff;
    line-height: 30px;
    padding-left: 5px;
    font-weight: 600;
  }

  .goRoomBoxLittleBoxConRightTitle > li:nth-child(1),
  .goRoomBoxLittleBoxConRightTitle > li:nth-child(2),
  .goRoomBoxLittleBoxConRightTitle > li:nth-child(3) {
    width: 50px;
    margin-right: 5px;
  }

  .goRoomBoxLittleBoxConRightTitle > li:nth-child(4) {
    width: 320px;
  }

  .goRoomBoxLittleBoxConRightCon {
    height: 120px;
    width: 485px;
    /*background-color: rosybrown;*/
    overflow-y: scroll;
  }

  .goRoomBoxLittleBoxConRightCon > li {
    height: 30px;
    width: 485px;
  }

  .goRoomBoxLittleBoxConRightCon > li > div {
    width: 50px;
    height: 30px;
    float: left;
    margin-right: 5px;
    text-align: center;
  }

  .goRoomBoxLittleBoxConRightCon > li > ul {
    float: left;
    padding-top: 5px;
  }

  .goRoomBoxLittleBoxConRightCon > li > ul > li {
    float: left;
    width: 50px;
    height: 20px;
    font-size: 12px;
    background-color: rgb(255, 86, 86);
    line-height: 20px;
    text-align: center;
    color: #fff;
    margin-right: 5px;
  }

  .goRoomBoxLittleBoxConRightCon > li:nth-child(odd) {
    background-color: #fff;
  }

  .goRoomBoxLittleBoxConRightCon > li:nth-child(even) {
    background-color: rgb(242, 242, 242);
  }

  .goRoomBoxLittleBoxConLeft > ul > li {
    height: 30px;
    width: 120px;
    line-height: 30px;
    font-size: 15px;
    padding-left: 5px;
  }

  .goRoomBoxLittleBoxConLeft > ul > li:nth-child(odd) {
    background-color: #fff;
  }

  .goRoomBoxLittleBoxConLeft > ul > li:nth-child(even) {
    background-color: rgb(242, 242, 242);
  }

  .goRoomBoxLittleBoxConLeft > div {
    padding-left: 5px;
    height: 30px;
    width: 120px;
    background-color: rgb(80, 80, 80);
    color: #fff;
    font-size: 11px;
    line-height: 30px;
    font-weight: 600;
  }

  .goRoomBoxLittleBoxConLeft {
    width: 120px;
    height: 150px;
    margin-right: 15px;
    /*background-color: brown;*/
    float: left;
  }

  .goRoomBoxLittleBoxConRight {
    width: 485px;
    height: 150px;
    /*background-color: navajowhite;*/
    float: left;
  }

  .goRoomBoxLittleBoxBot > div > span > span {
    color: red;
  }

  .goRoomBoxLittleBoxBot > div {
    float: left;
  }

  .goRoomBoxLittleBoxBot > ul > li {
    float: right;
    background-color: rgb(246, 188, 76);
    color: #000;
    height: 25px;
    width: 80px;
    text-align: center;
  }

  .goRoomBoxLittleBoxBot > ul > li:last-of-type {
    margin-right: 10px;
  }

  .goRoomBoxLittleBoxCon {
    width: 620px;
    height: 300px;
    /*background-color: red;*/
    margin-left: 10px;
  }

  .goRoomBoxLittleBoxCon > h1 {
    height: 25px;
    width: 620px;
  }

  .goRoomBoxLittleBoxCon > h1 > span {
    font-size: 12px;
    font-weight: 600;
  }

  .goRoomBoxLittleBoxCon > h2 {
    font-size: 12px;
    font-weight: 600;
    padding-left: 10px;
  }

  .goRoomBoxLittleBoxCon > div:first-of-type {
    height: 150px;
    width: 620px;
    /*background-color: royalblue;*/
  }

  .goRoomBoxLittleBoxCon > div:last-of-type {
    height: 100px;
    width: 620px;
    /*background-color: rosybrown;*/
  }

  .goRoomBoxLittleBoxBot {
    width: 620px;
    height: 25px;
    /*background-color: royalblue;*/
    margin-left: 10px;
    margin-top: 20px;
  }

  .goRoomBoxLittleBox {
    position: absolute;
    width: 640px;
    height: 400px;
    background-color: rgb(238, 238, 238);
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto auto;
    z-index: 60;
    box-shadow: 0px 0px 10px 1px silver;
  }

  .goRoomBoxLittleBox > h1 {
    width: 640px;
    color: #fff;
    height: 35px;
    background-color: rgb(79, 129, 189);
    font: 12px/35px "微软雅黑";
    text-align: center;
  }

  .payWayChoiceInput > span {
    margin-right: 20px;
  }

  .payWayChoiceInput > input {
    border: 1px solid #e1e1e1;
  }

  ul.payWayChoiceContent {
    margin: 60px 0 0 70px;
  }

  ul.payWayChoiceContent > li {
    height: 30px;
    margin-bottom: 10px;
    font: 11px/30px "微软雅黑";
  }

  ul.payWayChoiceContent > li:nth-of-type(1) > .payWayChoiceInput {

  }

  ul.payWayChoiceContent > li:nth-of-type(2) > .payWayChoiceInput {

  }

  ul.payWayChoiceContent > li:nth-of-type(2) > .payWayChoiceInput > input {
    width: 320px;
    height: 25px;
    /*float: right;*/
    text-align: right;
  }

  ul.payWayChoiceContent > li:nth-of-type(3) > .payWayChoiceInput {

  }

  ul.payWayChoiceContent > li:nth-of-type(3) > .payWayChoiceInput > input {
    width: 320px;
    height: 25px;
  }

  .payWayChoiceName {
    width: 60px;
    text-align: right;
    float: left;
  }

  .payWayChoiceInput {
    width: 320px;
    height: 25px;
    /*background-color: red;*/
    float: left;
    margin-left: 10px;
  }

  .payWayChoiceFoot {
    position: absolute;
    bottom: 20px;
    right: 10px;
  }

  .payWayChoiceFoot > li {
    float: left;
    width: 80px;
    height: 25px;
    text-align: center;
    background-color: rgb(246, 188, 76);
    color: rgb(80, 80, 80);
    margin-right: 10px;
    font: 16px/25px "微软雅黑";
  }

  .payWayChoice {
    width: 540px;
    height: 300px;
    box-shadow: 0px 0px 10px 1px silver;
    position: absolute;
    background-color: rgb(238, 238, 238);
    margin: auto auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 50;
  }

  .payWayChoice > h1 {
    height: 30px;
    color: #fff;
    text-align: center;
    background-color: rgb(18, 150, 215);
    font: 16px/30px "微软雅黑";
  }

  .handClassContent {
    position: relative;
  }

  .handClassContent > div {
    padding: 70px 20px 0 20px;
    font-size: 18px;
    font-weight: 500;
  }

  .handClassContent > div > span {
    font-size: 28px;
    font-weight: 400;
  }

  .handClassContent > ul {
    position: absolute;
    bottom: 20px;
  }

  .handClassContent > ul > li {
    float: left;
    width: 235px;
    height: 40px;
    color: white;
    text-align: center;
    line-height: 40px;
    font-size: 23px;
  }

  .handClassContent > ul > li:nth-of-type(1) {
    background-color: rgb(184, 184, 184);
    margin-right: 88px;
    margin-left: 60px;
  }

  .handClassContent > ul > li:nth-of-type(2) {
    background-color: rgb(246, 188, 76);
  }

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
    position: fixed;
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

  .handClass > h1 {
    height: 35px;
    font: 18px/35px "微软雅黑";
    text-align: center;
    background-color: rgb(18, 150, 215);
    color: white;
  }

  .handClass > div {
    height: 245px;
    width: 670px;
  }

  .handClass > h1 > div {
    width: 20px;
    height: 20px;
    background: url("../assets/img/roomReservation/false.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    top: 7px;
    right: 10px;
  }

  .tableBox {
    height: 200px;
  }

  .heji {
    margin: 10px auto 20px;
  }

  .dateChoise {
    margin: 50px 0;
  }

  .cashierAssistantContent > div:nth-of-type(3) {
    color: white;
    background-color: rgb(246, 188, 76);
    height: 55px;
    font: 27px/55px "微软雅黑";
    text-align: center;
    width: 360px;
    position: absolute;
    bottom: 50px;
    right: 75px;
  }

  .cashierAssistantContent > div:nth-of-type(2) {
    height: 300px;
    width: 850px;
  }

  .cashierAssistantContent > div:nth-of-type(2) > textarea {
    height: 300px;
    width: 850px;
    border-bottom: 1px solid silver;
  }

  .cashierAssistantContent > div:first-of-type {
    height: 80px;
    width: 850px;
    /*background-color: red;*/
    border-bottom: 1px solid silver;
  }

  .cashierAssistantContent > ul > li > div {
    width: 45px;
    height: 75px;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .cashierAssistantContent > ul > li > div > h1 {
    position: absolute;
    bottom: 5px;
    right: 0;
    left: 0;
    height: 20px;
    text-align: center;
    font: 13px/20px "微软雅黑";
  }

  .cashierAssistantContent > ul > li > div > div > div {
    width: 45px;
    height: 50px;
    background-size: 100% auto;
    background-position: 0 10px;
  }

  /*cashierAssistantImgActive*/
  .cashierAssistantContent > ul > li:nth-of-type(1) > div > div > div {
    background: url("../assets/img/roomReservation/saodiW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li:nth-of-type(1) > div > div > div.cashierAssistantImgActive {
    background: url("../assets/img/roomReservation/saodiC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li:nth-of-type(2) > div > div > div {
    background: url("../assets/img/roomReservation/peopleW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li:nth-of-type(2) > div > div > div.cashierAssistantImgActive {
    background: url("../assets/img/roomReservation/peopleC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li:nth-of-type(3) > div > div > div {
    background: url("../assets/img/roomReservation/saodiW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li:nth-of-type(3) > div > div > div.cashierAssistantImgActive {
    background: url("../assets/img/roomReservation/saodiC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .cashierAssistantContent > ul > li > div > div {
    width: 45px;
    height: 60px;
    /*padding-top: 10px;*/
    position: absolute;
    right: 0;
    left: 0;
    bottom: 15px;
    /*margin: 10px auto 0;*/
    margin: 0 auto 0;
  }

  .cashierAssistantContent > ul > li {
    width: 280px;
    height: 80px;
    background-color: rgb(245, 245, 245);
    float: left;
    color: silver;
    position: relative;
  }

  .cashierAssistantContent > ul > li.cashierAssistantLiActive {
    border-top: 5px solid rgb(246, 188, 76);
    background-color: white;
  }

  .cashierAssistantContent > ul > li:nth-of-type(1) {
    margin-right: 5px;
  }

  .cashierAssistantContent > ul > li:nth-of-type(2) {
    margin-right: 5px;
  }

  .cashierAssistantContent > ul > li:nth-of-type(3) {

  }

  .cashierAssistantContent {
    height: 640px;
    width: 1000px;
    /*background-color: royalblue;*/
    padding: 10px 75px 65px;
  }

  .cashierAssistantTitle {
    color: white;
    background-color: rgb(246, 188, 76);
    text-align: center;
    height: 80px;
    font: 30px/80px "微软雅黑";
  }

  .cashierAssistant {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 1000px;
    z-index: 30;
    height: 720px;
    margin: 50px auto;
    background-color: #fff;
    box-shadow: -1px 1px 2px 2px silver;
  }

  .onRoomInfo > ul {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .onRoomInfo > ul > li {
    background-color: rgb(254, 194, 79);
    height: 25px;
    float: left;
    color: #000;
    width: 50px;
    text-align: center;
    font-size: 12px;
    line-height: 25px;
    margin-right: 5px;
  }

  .onRoomInfo > div:first-of-type {
    width: 90px;
    height: 110px;
    float: left;
    background: url("../assets/img/home/peopleNone.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .onRoomInfo > div:nth-of-type(2) {
    float: left;
    width: 320px;
    height: 200px;
    /*background-color: royalblue;*/
    margin-left: 10px;
  }

  .onRoomInfo {
    width: 445px;
    height: 250px;
    padding: 0px 10px 5px;
  }

  .farAwayRoomState {
    width: 445px;
    height: 250px;
    padding: 0px 10px 5px;
  }

  .roomPriceDetail {
    width: 445px;
    height: 250px;
    padding: 0px 0px 5px;
    background-color: #fff;
    border: 1px solid silver;
  }

  .roomPriceDetail > ul:first-of-type > li {
    background-color: rgb(80, 80, 80);
  }

  .roomPriceDetail > ul > li {
    height: 30px;
    float: left;
    line-height: 30px;
    margin-right: 2px;
    padding-left: 5px;
  }

  .roomPriceDetail > ul:first-of-type {
    border: 1px solid silver;
  }

  .roomPriceDetail > ul:nth-child(2) > li {
    color: #000;
  }

  .roomPriceDetail > ul:nth-child(2) > li:first-of-type {
    border: 1px solid black;
  }

  .roomPriceDetail > ul > li:first-of-type {
    width: 100px;
    font: 15px/2 "微软雅黑";
  }

  .roomPriceDetail > ul > li:nth-child(2) {
    width: 80px;
  }

  .clickRoomBaseClass > div:first-of-type > h1 {
    color: white;
    height: 25px;
  }

  .clickRoomBaseClass > div:first-of-type {
    position: relative;
  }

  .clickRoomBaseClass > div:first-of-type > div {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    text-align: center;
  }

  .clickRoomBaseClass > div:first-of-type {
    background-color: rgb(255, 99, 99);
  }

  .clickRoomBaseClass > div:first-of-type > ul {
    height: 25px;
  }

  .clickRoomBaseClass > div:first-of-type > ul > li {
    width: 65px;
    height: 25px;
    float: left;
    text-align: center;
  }

  .clickRoomBaseClass > div:first-of-type > ul > li.onGoRoomInfoActive {
    color: #000;
    background-color: #fff;
  }

  .displayBoxInfo {
    margin: 5px 0px 5px 10px;
  }

  .displayBox {
    /*background-color: red;*/
    height: 450px;
    width: 715px;
  }

  .allNumber > span:first-of-type {
    margin-right: 50px;
    margin-left: 10px;
  }

  .allNumber {
    margin-top: 5px;
    color: rgb(0, 128, 0);
    text-align: left;
  }

  .allNumber > span {
    float: left;
  }

  .AllMoneyRight {
    float: left;
    color: red;
    padding: 20px;
  }

  .AllMoneyRight > h1 {
    font: 20px/40px '微软雅黑';
  }

  .AllMoneyLeft > h1 {
    color: red;
    font: 25px/55px "微软雅黑";
  }

  .AllMoneyLeft {
    float: left;
    width: 275px;
    height: 160px;
    border-right: 1px solid black;
    padding: 25px;
  }

  .AllMoney {
    width: 715px;
    height: 160px;
    border-top: 1px solid black;
    border-bottom: 1px solid silver;
    margin-top: 5px;
  }

  .costAccount {
    width: 80px;
    height: 30px;
    background-color: rgb(246, 188, 76);
    text-align: center;
    line-height: 30px;
  }

  .accountInfoContentRight {
    margin-left: 5px;
    /*background-color: royalblue;*/
    width: 720px;
    height: 690px;
  }

  .roomNumberContent > li > div {
    float: left;
  }

  .roomNumberContent > li > div:nth-of-type(1) {
    width: 65px;
  }

  .roomNumberContent > li > div:nth-of-type(2) {
    width: 85px;
  }

  .roomNumberContent > li > div:nth-of-type(3) {
    width: 105px;
  }

  .roomNumberContent > li {
    background-color: rgb(250, 220, 150);
  }

  .roomNumberTitle > li:nth-of-type(1) {
    width: 60px;
    margin-right: 5px;
  }

  .roomNumberTitle > li:nth-of-type(2) {
    width: 80px;
    margin-right: 5px;
  }

  .roomNumberTitle > li:nth-of-type(3) {
    width: 105px;
  }

  .roomNumberTitle > li {
    font-size: 10px;
    height: 30px;
    float: left;
    color: white;
    text-align: left;
    line-height: 30px;
    background-color: rgb(80, 80, 80);
  }

  .roomPriceBox {
    margin-top: 10px;
  }

  .peopleBoxContentLeft {
    height: 130px;
    width: 115px;
    background-color: red;
  }

  .peopleBoxContent > div {
    float: left;
  }

  .peopleBoxContentRight {
    padding: 10px;
    width: 140px;
    height: 130px;
    /*background-color: royalblue;*/
  }

  .peopleBoxContent {
    height: 130px;
    width: 255px;
    /*background-color: rebeccapurple;*/
  }

  .roomNumber {
    height: 390px;
    width: 255px;
    background-color: white;
  }

  .accountInfoContentLeftPeopleInfo {
    width: 255px;
    height: 270px;
    background-color: white;
    margin-bottom: 10px;
    padding: 10px;
  }

  .accountInfoContentLeft {
    width: 255px;
    height: 670px;
    /*background-color: red;*/
  }

  .accountInfoContent > div {
    float: left;
  }

  .accountInfoContent {
    width: 1000px;
    height: 690px;
    background-color: rgb(238, 238, 238);
    padding: 10px;
  }

  .accountInfoTitle {
    text-align: center;
    background-color: rgb(18, 150, 215);
    color: white;
    height: 30px;
    font: 15px/2 '微软雅黑';
    position: relative;
  }

  .accountInfoTitle > div {
    width: 20px;
    height: 20px;
    background: url("../assets/img/roomReservation/false.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    right: 10px;
  }

  .accountInfo {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 1000px;
    z-index: 20;
    height: 720px;
    margin: 50px auto;
    background-color: #fff;
    box-shadow: -1px 1px 2px 2px silver;
  }

  .accountInfoBox {
    /*    position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: royalblue;
        z-index: 18;
        position: relative;*/
  }

  .accountInfoShade {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    /*background-color: red;*/
    z-index: 19;
  }

  .goRoomAndCansle {
    float: right;
  }

  .goRoomAndCansle > li {
    margin-right: 5px;
    color: black;
    background-color: rgb(246, 188, 76);
    text-align: center;
    float: left;
    width: 80px;
    height: 25px;
    line-height: 25px;
  }

  .choiceRoom > li:last-of-type {
    background-color: rgb(251, 222, 166);
  }

  .choiceRoom > li {
    margin-right: 5px;
    color: black;
    background-color: rgb(246, 188, 76);
    text-align: center;
    float: left;
    width: 80px;
    height: 25px;
    line-height: 25px;
  }

  .days {
    float: left;
    margin-right: 20px;
  }

  .days > span:last-of-type {
    color: red;
  }

  .days > input {
    height: 40px;
    border: 1px solid silver;
  }

  .orderIfo {
    margin-top: 10px;
    height: 0px;
  }

  .orderIfo > div:first-of-type {
    border-bottom: 1px solid silver;
    width: 40%;
  }

  .orderIfo > div:nth-of-type(2) {
    width: 20%;
    text-align: center;
    margin-top: -10px;
  }

  .orderIfo > div:last-of-type {
    border-bottom: 1px solid silver;
    width: 40%;
  }

  .orderIfo > div {
    float: left;
  }

  .formInputBox {
    width: 830px;
    height: 105px;
    /*background-color: red;*/
    float: left;
    line-height: 25px;
    margin-left: 20px;
  }

  .clearGuestInfo {
    background-color: rgb(246, 188, 76);
    width: 150px;
    height: 25px;
    text-align: center;
    font: 12px/2 '微软雅黑';
    float: right;
  }

  .peopleContentBox {
    width: 950px;
    height: 130px;
    /*background-color: rebeccapurple;*/
  }

  .peopleContentBoxLeft {
    width: 120px;
    height: 130px;
    background-color: rosybrown;
    float: left;
  }

  .peopleContentBoxRight {
    height: 130px;
    width: 830px;
    /*background-color: royalblue;*/
    float: left;
  }

  .goRoomBoxContent {
    padding-top: 20px;
    padding-left: 25px;
    padding-right: 25px;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    /*background-color: rosybrown;*/
  }

  .goRoomBoxInput {
    height: 25px;
    width: 250px;
    float: left;
    /*background-color: rebeccapurple;*/
  }

  .goRoomBoxInput > span:last-of-type {
    color: red;
  }

  .goRoomBoxTitle {
    text-align: center;
    color: white;
    background-color: rgb(18, 150, 215);
    height: 30px;
    font: 15px/2 '微软雅黑';
  }

  .goRoomBoxTab {
    margin-top: 10px;
  }

  .goRoomBoxTab > div {
    float: left;
    height: 40px;
    width: 420px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    background-color: rgb(238, 238, 238);
  }

  .goRoomBoxTab > div:first-of-type {
    margin-right: 10px;
    margin-left: 75px;
  }

  .goRoomBoxTab > div:nth-of-type(2) {
    /*background-color: rgb(246,188,76);*/
  }

  .goRoomBoxTab > div.goRoomNameActive {
    background-color: rgb(246, 188, 76);
  }

  .goRoomBoxShade {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9;
  }

  .goRoomBox {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 1000px;
    z-index: 500;
    height: 720px;
    margin: 50px auto;
    background-color: #fff;
    box-shadow: -1px 1px 2px 2px silver;
  }

  .goRoomBoxLittleBoxShade {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /*background-color: rosybrown;*/
    z-index: 50;
  }

  .otherRoomType {
    width: 60px;
    height: 90px;
    position: absolute;
    bottom: 35px;
    right: 8px;
  }

  .roomIsShowX {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 0;
    top: 0;
  }

  .otherRoomType > div:first-of-type {
    background-color: rgb(255, 191, 68);
    width: 60px;
    height: 80px;
    text-align: center;
    color: #000;
    padding-top: 5px;
  }

  .otherRoomType > div:last-of-type {
    margin: 0 auto;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: rgb(255, 191, 68) transparent transparent transparent;
  }

  .roomTypeList {
    position: absolute;
    bottom: 10px;
    right: 20px;
  }

  .roomTypeList > li:nth-of-type(3) {
    width: 20px;
  }

  .roomTypeList > li {
    float: left;
    width: 45px;
    height: 25px;
    text-align: center;
    border: 1px solid white;
    margin-right: 5px;
    background-color: rgb(255, 191, 68);
    color: black;
  }

  .container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .containerLeft {
    width: 135px;
    height: 100%;
    background-color: rgb(80, 80, 80);
    float: left;
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

  .contentBox {
    height: 100%;
    width: 100%;
    float: left;
    padding-left: 10px;
    background-color: rgb(238, 238, 238);
    position: relative;
  }

  .headImg {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: 5px solid white;
    margin: 40px auto 0;
  }

  .turnBack {
    text-align: center;
    color: #fff;
    font: 20px/2 '微软雅黑';
    background-color: rgb(27, 113, 177);
    margin-top: 27px;
  }

  .navList {
    background-color: #fff;
  }

  .navList > li {
    float: left;
    height: 70px;
    width: 70px;
    font: 14px/2 '微软雅黑';
    color: rgb(27, 113, 177);
    text-align: center;
  }

  .navList > li.navActive {
    background-color: rgb(27, 113, 177);
    color: #fff;
  }

  .navList > li:nth-of-type(1).navActive > div:first-of-type {
    background: url("../assets/img/roomReservation/roomW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(2).navActive > div:first-of-type {
    background: url("../assets/img/roomReservation/orderW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(5).navActive > div:first-of-type {
    background: url("../assets/img/roomReservation/complainW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(4).navActive > div:first-of-type {
    background: url("../assets/img/roomReservation/classW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(3).navActive > div:first-of-type {
    background: url("../assets/img/home/memberW.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li > div:first-of-type {
    height: 34px;
    /*background-color: #fff;*/
    width: 36px;
    margin: 8px auto 0;
  }

  .navList > li:nth-of-type(1) > div:first-of-type {
    background: url("../assets/img/roomReservation/roomC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(2) > div:first-of-type {
    background: url("../assets/img/roomReservation/orderC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(5) > div:first-of-type {
    background: url("../assets/img/roomReservation/complainC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(4) > div:first-of-type {
    background: url("../assets/img/roomReservation/classC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li:nth-of-type(3) > div:first-of-type {
    background: url("../assets/img/home/memberC.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList > li > div:last-of-type {

  }

  .peopleRight {
    float: right;
    margin-top: 22px;
  }

  .peopleBox {
    float: left;
    height: 25px;
    width: 115px;
    border: 1px solid rgb(180, 180, 180);
    border-radius: 20px;
    padding: 5px 10px;
    font: 15px/1 "微软雅黑";
    color: rgb(180, 180, 180);
  }

  .peopleBox > i {
    float: right;
    display: inline-block;
    margin: 5px 0px 0px 0px;
    border-color: rgb(180, 180, 180) transparent transparent transparent;
    border-width: 6px;
    border-style: solid;
    width: 0;
    height: 0;
  }

  .funcIcon {
    float: left;
    margin-left: 15px;
  }

  .funcIcon > li {
    float: left;
    width: 30px;
    font-weight: 700;
  }

  .funcIcon > li:first-of-type {
  }

  .sectionNav {
    /*margin-top: 20px;*/
    position: absolute;
    top: -30px;
  }

  .sectionNav > li {
    margin-right: 1px;
    float: left;
    color: #fff;
    width: 100px;
    text-align: center;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    background-color: #666666;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    position: relative;
  }

  .sectionNav > li.sectionNavActive {
    background-color: rgb(246, 188, 76);
  }

  section {
    width: calc(100% - 15px);
    /*height: 100%;*/
    position: absolute;
    top: 121px;
    right: 5px;
    left: 10px;
    bottom: 35px;
    background-color: white;
    border: 1px solid rgb(246, 188, 76);
    /*overflow: hidden;*/
  }

  .allRoomIfoUL {
    padding-right: 140px;
  }

  .orderBox {
    width: calc(100% - 15px);
    /*height: 100%;*/
    position: absolute;
    top: 121px;
    right: 5px;
    left: 10px;
    bottom: 35px;
    background-color: white;
    border: 1px solid rgb(246, 188, 76);
    overflow: hidden;
  }

  footer {
    padding-right: 55px;
    position: absolute;
    height: 35px;
    right: 5px;
    left: 10px;
    bottom: 0px;
    width: 100%;
    /*background-color: royalblue;*/
  }

  footer > div > div:first-of-type > div {
    width: 30px;
    height: 30px;
    background: url("../assets/img/roomReservation/phoneImg.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  footer > div > div {
    height: 35px;
  }

  footer > div > div:last-of-type {
    position: relative;
  }

  footer > div > div > div:first-of-type {
    margin-top: 3px;
    margin-left: 20px;
  }

  footer > div > div > span {
    margin-left: 10px;
  }

  footer > div > div:first-of-type > span {
    float: left;
    line-height: 35px;
  }

  footer > div > div:last-of-type > span {
    float: left;
    line-height: 35px;
  }

  footer > div {
    float: right;
  }

  footer > div > div {
    float: left;
  }

  .messageImg {
    width: 30px;
    height: 30px;
    background: url("../assets/img/roomReservation/messageImg.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  .liu {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50px;
    color: white;
    position: absolute;
    text-align: center;
    line-height: 20px;
    right: -15px;
    top: -5px;
    z-index: 1000;
  }

  .sessionRight {
    position: absolute;
    /*top: 0;*/
    right: 0px;
    top: 0;
    width: 220px;
    height: 100%;
    bottom: 45px;
    border-left: 1px solid rgb(246, 188, 76);
  }

  .rightSession {

  }

  .sessionLeft {
    position: absolute;
    left: 0;
    right: 230px;
    height: 100%;
    bottom: 0;
    padding-bottom: 150px;
    z-index: 100;
    /*overflow: scroll;*/
  }

  .sessionLeftContentBox {
    /*padding-top: 50px;*/
    position: fixed;
    left: 145px;
    right: 235px;
    /*height: 100%;*/
    bottom: 85px;
    top: 120px;
    /*padding-bottom: 150px;*/
    /*overflow: scroll;*/
    z-index: 200;
    /*background-color: brown;*/
    overflow-y: scroll;
    background-color: #fff;
    border-left: 1px solid rgb(246, 188, 76);
  }

  .leftSession {

  }

  .roomType {
    /*    position: absolute;
        top: -2px;
        right: 0;
        z-index: 1000;
        left: 0px;*/
    width: 80%;
    border-bottom: 1px solid silver;
    padding-top: 10px;

    background-color: #fff;
  }

  .roomType > li {
    width: 50%;
    float: left;
  }

  .roomTypeHeadName {
    float: left;
    width: 65px;
    color: rgb(246, 188, 76);
    padding-left: 5px;
    font-size: 14px;
    margin-right: 5px;
    margin-top: 5px;
    text-align: right;
  }

  .roomTypeDetail {
    float: left;
    width: calc(100% - 70px);
    /*height: 100%;*/
    /*height: 30px;*/
    /*width: 200px;*/
    /*background-color: rosybrown;*/
    margin-bottom: 10px;
  }

  .roomTypeDetail > li {
    float: left;
  }

  .roomTypeDetailCon {
    color: #000;
    width: 80px;
    /*background-color: red;*/
    text-align: left;
    margin-right: 10px;
  }

  .roomTypeDetailConLeft {
    padding-top: 3px;
    width: 15px;
    height: 100%;
    float: left;
  }

  .roomTypeDetailConLeftInput {
    margin-top: 5px;
    width: 15px;
    height: 15px;
  }

  .roomTypeDetailCon > div:first-of-type {
    float: left;
    width: 15px;
    height: 100%;
  }

  .roomTypeDetailCon > div:last-of-type {
    height: 100%;
    width: 65px;
    overflow: hidden;
    color: #595959;
    font: 15px/2 '微软雅黑';
    font-weight: 500;
    /*background-color: rosybrown;*/
  }

  .roomTypeDetailCon > div:last-of-type > div {
    float: left;
    width: 100%;
    height: 100%;
  }

  .roomDetailContentBox {

    /*background-color: royalblue;*/
    /*height: 100%;*/
    width: 100%;
    /*    position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        top: 200px;*/
    /*overflow: scroll;*/
  }

  .roomDetailContent {
    /*padding-bottom: 50px;*/
    height: 100%;
    width: 100%;
    /*overflow: scroll;*/
    /*background-color: rebeccapurple;*/
    /*margin-bottom: 50px;*/
  }

  .roomDetailBottom {
    height: 50px;
    width: calc(100% - 280px);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    /*top: 400px;*/
    padding: 0px 0px 0px 50px;
    background-color: #fff;
  }

  .roomDetailBottom > ul > li {
    padding-top: 2px;
    margin-right: 10px;
    float: left;
  }

  .roomDetailBottom > ul > li > div {
    border: 1px solid silver;
    line-height: 25px;
    height: 25px;
    text-align: center;
    border-radius: 5px;
    padding: 0px 5px 0px 5px;
  }

  .roomDetailBottom > ul > li > div > div,
  .roomDetailBottom > ul > li > div > span,
  .roomDetailBottom > ul > li > div > strong {
    float: left;
  }

  .roomDetailBottom > ul > li > div > div:first-of-type {
    width: 15px;
    height: 15px;
    margin-top: 5px;
    margin-right: 5px;
  }

  .roomDetailBottom > ul > li:first-of-type > div > div:first-of-type {
    background-color: rgb(79, 129, 189);
  }

  .roomDetailBottom > ul > li:first-of-type {
    color: rgb(79, 129, 189);
  }

  .roomDetailBottom > ul > li {
    font: 15px/25px "微软雅黑";
    font-weight: 600;
  }

  .roomDetailBottom > ul > li:nth-of-type(2) {
    color: rgb(0, 176, 80);
  }

  .roomDetailBottom > ul > li:nth-of-type(2) > div > div:first-of-type {
    background-color: rgb(0, 176, 80);
  }

  .roomDetailBottom > ul > li:nth-of-type(3) > div > div:first-of-type {
    background-color: rgb(255, 0, 0);
  }

  .roomDetailBottom > ul > li:nth-of-type(3) {
    color: rgb(255, 0, 0);
  }

  .roomDetailBottom > ul > li:nth-of-type(4) > div > div:first-of-type {
    background-color: rgb(127, 127, 127);
  }

  .roomDetailBottom > ul > li:nth-of-type(4) {
    color: rgb(127, 127, 127);
  }

  .currentOccupancy {
    color: rgb(0, 128, 0);
    font: 15px/25px "微软雅黑";
    font-weight: 600;
    padding-top: 2px;
  }

  .marktBox {
    background-color: rgb(80, 80, 80);
    width: 60px;
    height: 30px;
    color: white;
    line-height: 30px;
    text-align: center;
    margin-top: 10px;
  }

  .roomIfoUL {
    margin: 10px 0px 0px 10px;
  }

  .roomIfoLi {
    width: 150px;
    height: 100px;
    margin: 0px 0px 10px 10px;
    float: left;
    color: #fff;
    position: relative;
  }

  .roomIfoLi.roomActive0 {
    background-color: rgb(18, 150, 215);
  }

  .roomIfoLi.roomActive1 {
    background-color: rgb(255, 187, 24);
  }

  .roomIfoLi.roomActive2 {

    background-color: rgb(255, 86, 86);
  }

  .roomIfoLi.roomActive3 {
    background-color: rgb(255, 86, 86);
  }

  .roomIfoLi.roomActive4 {
    background-color: rgb(143, 143, 143);
  }

  .clickRoomBaseClass {
    position: absolute;
    bottom: -200px;
    right: -295px;
    width: 445px;
    height: 300px;
    z-index: 100;
    background-color: rgb(80, 80, 80);
  }

  .roomIfoUL.clickRoomBaseClassHeight {
    height: 300px;
  }

  .clickRoomClass {
    position: absolute;
    bottom: -150px;
    right: -150px;
    width: 300px;
    height: 150px;
    background-color: rgb(80, 80, 80);
    z-index: 100;
  }

  .roomIfoLi > h1 {
    width: 150px;
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    margin-top: 8px;
    white-space: nowrap;
    position: absolute;
    left: 0;
    top: 0;
    /*z-index: 1;*/
    /*margin-left: 7px;*/
    /*background-color: rosybrown;*/
    overflow: hidden;
  }

  .roomIfoLi > h1 > div {
    width: 150px;
    height: 20px;
    position: absolute;
    transition: .5s;
    left: 0;
    top: 0;
  }

  .roomIfoLi > h1:hover > div {
    right: 0;
    left: -100%;
  }

  .roomIfoLi > div {
    margin-top: 30px;
  }

  .roomIfoLi > div > h2 {
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 10px;
  }

  .roomIfoLi > div > h3 {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }

  .maintainImgBox {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    background: url("../assets/img/home/maintain.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .broomImgBox {
    position: absolute;
    bottom: 5px;
    left: 5px;
    width: 20px;
    height: 20px;
    margin: 15px auto 0;
    background: url("../assets/img/home/broom.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .roomIfoLi > div > div {

  }

  .states {
    /*margin-top: 44px;*/
    background-color: rgb(246, 188, 76);
    color: #fff;
    height: 33px;
    width: 220px;
    padding-left: 5px;
    line-height: 33px;
  }

  .roomCard {
    color: rgb(0, 0, 255);
    border-bottom: 1px solid rgb(0, 0, 255);
    width: 60px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    margin: 5px auto 0;
  }

  .searchBox {
    height: 25px;
    width: 180px;
    border-radius: 5px;
    /*border: 1px solid silver;*/
    margin: 5px auto 0;
  }

  .searchBox > input {
    color: silver;
    height: 25px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    padding-left: 10px;
    width: 150px;
    float: left;
    border-right: 1px solid silver;
  }

  .searchImg {
    width: 28px;
    height: 25px;
    /*background-color: rosybrown;*/
    float: left;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    /*border-left: 1px solid silver;*/
    border-top: 1px solid silver;
    border-right: 1px solid silver;
    border-bottom: 1px solid silver;
  }
  .searchImg>div{
    width: 16px;
    height: 16px;
    margin: 3px auto 0;
    background: url("../assets/img/home/searchCondition.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .divLine {
    border: 1px solid rgb(246, 188, 76);
    margin-top: 8px;
  }

  .roomStateContent {
    /*background-color: rosybrown;*/
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 100px;
    padding-right: 15px;
    overflow-y: scroll;
  }

  .roomStateContent > ul > li {
    width: 200px;
    border-bottom: 1px solid rgb(246, 188, 76);
    padding: 10px 0px 10px 10px;
  }
  .roomStateContent > ul > li>div{
    margin-top: 10px;
  }

  .roomStateContent > ul > li > h1 {
    font-size: 12px;
    color: rgb(246, 188, 76);
    width: 180px;
    border-bottom: 1px solid black;
  }
  .roomStateContent > ul > li > h1 > span{
    color: #979797;
  }

  .roomState {
  }

/*  .roomState > li {
    width: 85px;
    float: left;
  }*/
/*

  .roomState > li > div:first-of-type {
    float: left;
    width: 20px;
    height: 100%;
    padding-top: 3px;
  }

  .roomState > li > div:last-of-type {
    overflow: hidden;
    height: 100%;
  }

  .roomState > li > div:last-of-type > div {
    width: 100%;
    height: 100%;
    font: 13px/24px "微软雅黑";
  }

  .roomState > li > div > input {
  }
  .roomState > li > div > input.louCengActive{
    background-color: #fff;
  }

  .roomState > li > div > span {
  }
*/


</style>
>>>>>>> 3eaf4b520a506fe8d714879e481a64a39c5247be
