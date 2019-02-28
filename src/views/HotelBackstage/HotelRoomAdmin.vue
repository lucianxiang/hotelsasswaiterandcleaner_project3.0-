<template>
  <div class="clearfix">
    <h1 class="wrapTitle">酒店房型管理</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>房型名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="roomName" auto-complete="off" placeholder="房型名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="Add" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="hotelRoomList"
      v-loading="isLoading"
      style="width: 100%"
      row-key="id"
      :expand-row-keys="expands"
      @row-click="rowClick"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="楼层:">
              <span>{{ props.row.ht_bt_Level }}</span>
            </el-form-item>
            <el-form-item label="房型图片:">
              <img
                v-for="item,index in props.row.ht_bt_ImagePath"
                v-lazy="item"
                :key="item"
                alt=""
                style="width: 100px;height: 100px;margin-right: 10px;"
                @click="$seeImage"
              >
              <!--@click="lookImg(item)"-->
            </el-form-item>
            <el-form-item label="面积:">
              <span>{{ props.row.ht_bt_Area }}m<sup>2</sup></span>
            </el-form-item>
            <el-form-item label="无烟房:">
              <span>{{ props.row.ht_bt_Smoke }}</span>
            </el-form-item>
            <el-form-item label="加床:">
              <span>{{ props.row.ht_bt_AddBed }}</span>
            </el-form-item>
            <el-form-item label="最多入住数(人):">
              <span>{{ props.row.ht_bt_MostIn }}</span>
            </el-form-item>
            <el-form-item label="床型:">
              <span>{{ props.row.ht_bt_BedType }}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ props.row.ht_bt_CreateTime | getUseTime}}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{ props.row.ht_bt_Remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        width="140"
        prop="ht_bt_RoomID"
        label="房型编码"
      >
      </el-table-column>
      <el-table-column
        prop="ht_bt_RoomName"
        width="140"
        label="房型名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ht_bt_BookPay"
        width="140"
        label="押金"
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
            @click="Delete(scope.row.ht_bt_RoomID)">删除
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="toRoomProduct(scope.row.ht_bt_RoomID)">前往房间产品
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="toRoomFacilities(scope.row.ht_bt_RoomID)">前往房间设施
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
    <!--添加酒店房间-->
    <el-dialog title="添加酒店房型" :modal-append-to-body="false" :visible.sync="addDialog" :close-on-click-modal="false"
               width="70%">
      <!--<div class="dialogList">-->
      <!--<span v-for="item,index in textList" :class="{active:n==index}"><em>{{item.name}}</em></span>-->
      <!--</div>-->
      <!--房间添加-->
      <el-form :model="addOptions">
        <el-form-item label="房间名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.ht_bt_RoomName"></el-input>
        </el-form-item>
        <!--<el-form-item label="床型:" :label-width="formLabelWidth">-->
          <!--<el-input v-model="addOptions.ht_bt_BedType"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="最多入住数:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.ht_bt_MostIn"></el-input>
        </el-form-item>
        <el-form-item label="楼层:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.ht_bt_Level"></el-input>
        </el-form-item>
        <el-form-item label="面积(平方):" :label-width="formLabelWidth">
          <el-input v-model="addOptions.ht_bt_Area"></el-input>
        </el-form-item>
        <el-form-item label="无烟房:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.ht_bt_Smoke"></el-input>
        </el-form-item>
        <el-form-item label="加床:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.ht_bt_AddBed"></el-input>
        </el-form-item>
        <el-form-item label="押金:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.ht_bt_BookPay" style="width: 200px;"></el-input> 元
        </el-form-item>
        <el-form-item label="图片上传:" :label-width="formLabelWidth">
          <p>单张图片不能大于600KB</p>
          <Upload @getData="getData" :attrs="imageObj"></Upload>

          <div class="imgWap">
            <p v-for="item,index in ImageURL"
               style="display: inline-block;position: relative;margin-right: 70px">
              <span style="color: #f60" @click="deleteImageURL(item)">X</span>
              <em>
                <el-radio v-model="radioIndex" :label="index+1">替换</el-radio>
              </em>
              <img
                :src="item"
                width="280"
                height="125"
                v-show="ImageURL.length"
              >
            </p>
          </div>
        </el-form-item>
        <el-form-item label="创建时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="addOptions.ht_bt_CreateTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addOptions.ht_bt_Remark">
          </el-input>
        </el-form-item>

      </el-form>
      <!--房间产品-->
      <el-form :model="roomInfoOptions">
        <el-form-item label="添加房间产品个数:" :label-width="newFormLabelWidth">
          <el-select v-model="num" filterable placeholder="请选择" style="width: 80px;float: left;"
                     @change="changeRoomInfo">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.id"
              :value="item.value">
            </el-option>
          </el-select>
          <div style="clear: both"></div>
          <div v-for="item,i in hotelRoomInfoList">
            <h2>房间产品{{i + 1}}</h2>
            <!--roomInfoOptions-->
            <el-form :model="item">
              <el-form-item label="房间产品名称:" :label-width="formLabelWidth">
                <el-input v-model="item.ht_rpp_Name"></el-input>
              </el-form-item>
              <el-form-item label="床型:" :label-width="formLabelWidth">
                <el-select v-model="item.ht_rpp_BedType" placeholder="请选择">
                  <el-option
                    v-for="item in BedTypeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="早餐类型:" :label-width="formLabelWidth">
                <el-select v-model="item.ht_rpp_BreakfastType" placeholder="请选择">
                  <el-option
                    v-for="item in BreakfastTypeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="WIFI:" :label-width="formLabelWidth">
                <el-select v-model="item.ht_rpp_WafiType" placeholder="请选择">
                  <el-option
                    v-for="item in WAFIList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="取消类型:" :label-width="formLabelWidth">
                <el-select v-model="item.ht_rpp_CancelType" placeholder="请选择">
                  <el-option
                    v-for="item in CancelTypeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房间产品价格:" :label-width="formLabelWidth">
                <el-input v-model="item.ht_rpp_ProductPrice"></el-input>
              </el-form-item>
              <!--<el-form-item label="房间数量:" :label-width="formLabelWidth">-->
              <!--<el-input v-model="addOptions.data.ht_rpp_RoomNumber"></el-input>-->
              <!--</el-form-item>-->
            </el-form>
            <el-form-item label="添加房间门牌号个数:" :label-width="newFormLabelWidth">
              <el-select v-model="item.num" filterable placeholder="请选择" style="width: 80px;float: left;"
                         @change="changeHouseNumberArry(i)">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.id"
                  :value="item.value">
                </el-option>
              </el-select>
              <div style="clear: both"></div>
              <div v-for="val,index in item.HouseNumberArry">
                <h2>房间门牌号{{index + 1}}</h2>
                <el-form :model="val">
                  <p style="color: red">注:房间门牌号添加规则(栋数-楼层-房号),例:8-8-08即8栋8楼08号 <span></span></p>
                  <p style="color: red">注: 没有栋数的(楼层-房号),例:8-08即8楼08号<span></span></p>
                  <p style="color: red">注: 门牌号以英文状态下的逗号隔开,例:1-1-01,1-1-02,1-1-03<span></span></p>
                  <el-form-item label="选中的房间门牌号:" :label-width="infoWidth">
                    <el-tag :key="j" type="warning" v-for="r,j in val.HouseNumberList" size="small" closable
                            @close="handleClose(r,j,i,index)" style="margin-right: 5px">{{r}}
                    </el-tag>
                  </el-form-item>
                  <el-form-item label="房间门牌号:" :label-width="formLabelWidth">
                    <el-input v-model="val.ht_re_HouseNumber" style="width: 300px" size="small" ref="input"></el-input>
                    <el-button @click="AddHouseNumber(val.ht_re_HouseNumber,index,i)" size="small" type="success">添加
                    </el-button>
                  </el-form-item>
                  <el-form-item label="房间图片上传:" :label-width="formLabelWidth">
                    <p>单张图片不能大于600KB</p>
                    <Upload @getData="HotelRoomEntityOptionsGetData" :attrs="imageObj" :index="index" :i="i"></Upload>

                    <div class="imgWap">
                      <p v-for="item,s in val.HotelRoomEntityImageURL"
                         style="display: inline-block;position: relative;margin-right: 70px">
                        <span style="color: #f60" @click="HotelRoomEntityDeleteImageURL(item,index,i)">X</span>
                        <em>
                          <el-radio v-model="HotelRoomEntityRadioIndex" :label="s+1">替换</el-radio>
                        </em>
                        <img
                          :src="item"
                          width="280"
                          height="125"
                          v-show="val.HotelRoomEntityImageURL.length"
                        >
                      </p>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </el-form-item>

            <!--HotelRoomEntityOptions-->

          </div>
        </el-form-item>
        <!--房间设施-->
        <el-form-item label="添加房间设施个数:" :label-width="newFormLabelWidth">
          <el-select v-model="HotelRoomRoomFacilitiesNum" filterable placeholder="请选择" style="width: 80px;float: left;"
                     @change="changeHotelRoomRoomFacilities">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.id"
              :value="item.value">
            </el-option>
          </el-select>
          <div style="clear: both"></div>
          <div v-for="val,index in HotelRoomRoomFacilitiesList">
            <h2>房间设施{{index + 1}}</h2>
            <el-form :model="val">

              <el-form-item label="房间设施类型:" :label-width="formLabelWidth">
                <el-select v-model="val.RoomFacilitiesTypeID" placeholder="请选择类型"
                           @change="changeRoomFacilities(val,index)">
                  <el-option
                    v-for="item in hotelRoomFacilitiesTypeList"
                    :key="item.ht_rht_ID"
                    :label="item.ht_rht_Name"
                    :value="item.ht_rht_ID">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房间设施:" :label-width="formLabelWidth">
                <el-select v-model="val.ht_rth_RoomHardIDList" multiple placeholder="请选择">
                  <el-option
                    v-for="item in roomFacilitiesList"
                    :key="item.ht_rh_ID"
                    :label="item.ht_rh_Name"
                    :value="item.ht_rh_ID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--查看大图-->
    <el-dialog
      title="图片"
      :visible.sync="imgShow"
      width="60%"
      center>
      <img :src="imgUrl" alt="" style="width: 100%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgShow = false">取 消</el-button>
        <el-button type="primary" @click="imgShow = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改酒店房间-->
    <el-dialog title="修改酒店房型" :modal-append-to-body="false" :visible.sync="updateDialog">
      <!--<ElUploader></ElUploader>-->
      <el-form :model="updateHotelRoomObj">
        <el-form-item label="房型名称:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_RoomName"></el-input>
        </el-form-item>
        <!--<el-form-item label="床型:" :label-width="formLabelWidth">-->
          <!--<el-input v-model="updateHotelRoomObj.ht_bt_BedType"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="最多入住数:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_MostIn"></el-input>
        </el-form-item>
        <el-form-item label="楼层:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_Level"></el-input>
        </el-form-item>
        <el-form-item label="面积(平方):" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_Area"></el-input>
        </el-form-item>
        <el-form-item label="无烟房:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_Smoke"></el-input>
        </el-form-item>
        <el-form-item label="加床:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_AddBed"></el-input>
        </el-form-item>
        <el-form-item label="押金:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomObj.ht_bt_BookPay" style="width: 200px;"></el-input> 元
        </el-form-item>
        <el-form-item label="图片上传:" :label-width="formLabelWidth">
          <p>单张图片不能大于600KB</p>
          <Upload @getData="updateImage" :attrs="imageObj"></Upload>
          <div class="imgWap">
            <p v-for="item,index in ImageURL1"
               style="display: inline-block;position: relative;margin-right: 70px">
              <span style="color: #f60" @click="deleteUpdateImageURL(item)">X</span>
              <em>
                <el-radio v-model="updateRadioIndex" :label="index+1">替换</el-radio>
              </em>
              <img
                :src="item"
                width="280"
                height="125"
                v-show="ImageURL1.length"
              >
            </p>
          </div>
        </el-form-item>
        <el-form-item label="创建时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="updateHotelRoomObj.ht_bt_CreateTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="updateHotelRoomObj.ht_bt_Remark">
          </el-input>
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
  import {getNewStr,isPhoneNum} from '@/assets/js/public'
  import Upload from '@/components/Upload'

  export default {
    name: '',
    components: {
      Upload,
    },
    data() {
      return {
        options: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "token": "",
          "data": {
            "ht_bt_HotelID": "",
            "ht_bt_RoomName": "",
            "ht_bt_BedType": "",
            "ht_bt_MostIn": "",
            "ht_bt_Level": "",
            "ht_bt_ImagePath": "",
            "ht_bt_Area": "",
            "ht_bt_Smoke": "",
            "ht_bt_AddBed": "",
            "ht_bt_IsDelete": "0",
            "ht_bt_Remark": "",
            "roomInfo": {
              "ht_rpp_Name": "",
              "ht_rpp_BedType": "",
              "ht_rpp_BreakfastType": "",
              "ht_rpp_WafiType": "",
              "ht_rpp_CancelType": "",
              "ht_rpp_ProductPrice": "",
              "ht_rpp_RoomNumber": "",
              "HouseNumberArry": [
                {
                  "ht_re_HouseNumber": "",
                  "ht_re_ImagePath": ""
                }
              ]
            },
            "HotelRoomHardArray": [
              {
                "ht_rth_RoomHardID": ""
              }
            ]
          }
        },
        newFormLabelWidth: '200px',
        //房间设施
        HotelRoomRoomFacilitiesOptions: {
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
        },
        ht_rth_RoomHardIDList: [],
        HotelRoomEntityImageURL: [],
        HotelRoomEntityRadioIndex: '',
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
        num: 0,
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
        //房间产品
        roomInfoOptions: {
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
        },
        HouseNumberList: [],//门牌号
        infoWidth: '180px',
        //房间门牌号
        HotelRoomEntityOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_rpp_ID": "",//房间产品ID
            "ht_re_HouseNumber": "",//房间门牌号
            "ht_re_ImagePath": "",//房间图片
          }
        },
        textList: [
          {
            name: '房间产品'
          },
          {
            name: '房间门牌号'
          },
          {
            name: '房间设施'
          }
        ],
        options: [],
        imgUrl: '',
        imgShow: false,
        ImageURL: [],
        ImageURL1: [],
        roomName: '',
        total: 0,
        hotelID: '',
        n: -1,
        isLoading: false,
        addDialog: false,
        updateDialog: false,
        formLabelWidth: '120px',
        addOptions: {
          "ht_bt_HotelID": "",//酒店编码
          "ht_bt_RoomName": "",//房间名称
          "ht_bt_BedType": "",//床型
          "ht_bt_MostIn": "",//最多入住数
          "ht_bt_Level": "",//楼层
          "ht_bt_ImagePath": "",//房间图片
          "ht_bt_Area": "",//面积
          "ht_bt_Smoke": "",//无烟房
          "ht_bt_AddBed": "",//加床
          "ht_bt_IsDelete": "",//是否启用
          "ht_bt_CreateTime": "",//创建时间
          "ht_bt_Remark": "",//备注
          "ht_bt_BookPay": ""//房型押金
        },
        imageObj: {accept: 'image/*'},
        radioIndex: 0,
        RoomID: '',
        updateRadioIndex: 0,
        RoomFacilitiesTypeID: '',
        isNewUploaNode: true,
        hotelRoomInfoList: [],
        HotelRoomRoomFacilitiesList: [],
        HotelRoomRoomFacilitiesNum: 0,
        HouseNumberArry: [],
        HouseNumberArryNum: 0,
        userInfo: {},
        expands:[], // 要展开的行，数值的元素是row的key值
      }
    },
    computed: mapGetters([
      'hotelRoomList',
      'hotelRoomFacilitiesTypeList',
      'updateHotelRoomObj',
      'roomFacilitiesList',
//      'hotelInfomationObj'
    ]),
    created() {
      for (var i = 1; i < 16; i++) {
        this.options.push({
          id: i,
          value: i
        })
      }
      if (sessionStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.hotelID = JSON.parse(sessionStorage.getItem('userInfo')).CompanyID;
      } else {
        this.$router.push({name: 'Login'})
      }
      this.initData()
      this.initFacilitiesType();
    },
    methods: {
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
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
      },
      //选择房间门牌号个数
      changeHouseNumberArry(index) {
//        this.HouseNumberArry = []
        this.hotelRoomInfoList[index].HouseNumberArry = []
        for (var i = 0; i < this.hotelRoomInfoList[index].num; i++) {
          this.hotelRoomInfoList[index].HouseNumberArry.push({
            HouseNumberList: [],
            HotelRoomEntityImageURL: [],
            "ht_rth_RoomID": "",//房间ID
            "ht_ht_hotelID": "",//酒店ID
          })
        }
      },
      //选择房间设施个数
      changeHotelRoomRoomFacilities() {
        this.HotelRoomRoomFacilitiesList = []
        for (var i = 0; i < this.HotelRoomRoomFacilitiesNum; i++) {
          this.HotelRoomRoomFacilitiesList.push({
            ht_rth_RoomHardIDList: [],
            RoomFacilitiesTypeID: ''
          })
        }
      },
      //选择房间产品个数
      changeRoomInfo() {
        this.hotelRoomInfoList = [];
        for (var i = 0; i < this.num; i++) {
          this.hotelRoomInfoList.push({
            num: 0,
            "ht_rpp_RoomID": "",//房间编码
            "ht_rpp_Name": "",//房间产品名称
            "ht_rpp_BedType": "",//床型 1单床 2双床 3三床
            "ht_rpp_BreakfastType": "",//0无早  1 单早 2 双早 3 三早 4 四早
            "ht_rpp_WafiType": "",//0免费WAFI  1免费有线 2收费有线
            "ht_rpp_CancelType": "",//取消类型
            "ht_rpp_ProductPrice": "",//产品价格
            "ht_rpp_RoomNumber": "",//房间数量
            HouseNumberArry: []
          })
        }
      },
      //添加房间设施
      HotelRoomRoomFacilitiesSubmit() {
        this.HotelRoomRoomFacilitiesOptions.data.ht_ht_hotelID = this.hotelID;
        this.HotelRoomRoomFacilitiesOptions.data.ht_rth_RoomID = this.RoomID;
        this.HotelRoomRoomFacilitiesOptions.data.ht_rth_RoomHardID = this.ht_rth_RoomHardIDList.join(',')
        this.$store.dispatch('AddHotelRoomRoomFacilities', this.HotelRoomRoomFacilitiesOptions)
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
        this.addDialog = false;
      },
      //房间产品添加
      roomInfoOptionsSubmit() {
        this.roomInfoOptions.data.ht_rpp_RoomID = this.RoomID;
        this.$store.dispatch('AddHotelRoomProduct', this.roomInfoOptions)
          .then(data => {
            this.$notify({
              message: data.resultcontent,
              type: 'success'
            });
            //房间门牌号
            this.n = 1;
            if (data.data) {
              this.RoomProductID = data.data
            }
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      //选中房间设施类型
      changeRoomFacilities(val, index) {
        //获取对应设施
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "ht_rh_ID": "",//房型设施
          "ht_rh_Name": "",//设施名称
          "ht_rh_RoomHardTypeID": this.HotelRoomRoomFacilitiesList[index].RoomFacilitiesTypeID,//房间设施类型ID
          "ht_rh_IsHot": "",//是否热门
        }
        this.$store.dispatch('initRoomFacilities', options)
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
      //
      setClear(obj) {
        for (let attr in this.obj.data) {
          if (typeof this.obj.data[attr] == 'object') {
            for (let attr1 in this.obj.data[attr]) {
              this.obj.data[attr][attr1] = ''
            }
          } else {
            this.obj.data[attr] = ''
          }
        }
      },
      //添加房间门牌号
      HotelRoomEntitySubmit() {
        this.HotelRoomEntityOptions.data.ht_re_ImagePath = this.HotelRoomEntityImageURL.join(',');
        this.HotelRoomEntityOptions.data.ht_rpp_ID = this.RoomProductID;
        this.HotelRoomEntityOptions.data.ht_re_HouseNumber = this.HouseNumberList.join(',')
        this.$store.dispatch('AddHotelRoomEntity', this.HotelRoomEntityOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            //房间设施
            this.n = 2;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      //房间门牌号图片上传
      HotelRoomEntityOptionsGetData(data) {
        if (!this.HotelRoomEntityRadioIndex) {
          this.hotelRoomInfoList[data.i].HouseNumberArry[data.index].HotelRoomEntityImageURL.push(data.data);
        } else {
          this.hotelRoomInfoList[data.i].HouseNumberArry[data.index].HotelRoomEntityImageURL.splice(this.HotelRoomEntityRadioIndex - 1, 1, data.data);
          this.HotelRoomEntityRadioIndex = '';
        }
      },
      //删除房间门牌号对应图片
      HotelRoomEntityDeleteImageURL(val, index, i) {
        this.hotelRoomInfoList[i].HouseNumberArry[index].HotelRoomEntityImageURL = this.hotelRoomInfoList[i].HouseNumberArry[index].HotelRoomEntityImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //点击X
      handleClose(tag, j, i, index) {
        this.hotelRoomInfoList[i].HouseNumberArry[index].HouseNumberList.splice(this.hotelRoomInfoList[i].HouseNumberArry[index].HouseNumberList.indexOf(tag), 1);
      },
      //点击添加门票编码
      AddHouseNumber(v, index, i) {
        this.hotelRoomInfoList[i].HouseNumberArry[index].ht_re_HouseNumber = '';
//        this.$refs.input[index].focus()
        if (v) {
          if (v.indexOf(',') > -1) {
            this.hotelRoomInfoList[i].HouseNumberArry[index].HouseNumberList = this.hotelRoomInfoList[i].HouseNumberArry[index].HouseNumberList.concat(v.split(','));
          } else {
            this.hotelRoomInfoList[i].HouseNumberArry[index].HouseNumberList.push(v)
          }
        } else {
          this.$notify({
            message: '请输入内容!',
            type: 'error'
          });
        }
      },
      //图片上传
      getData(data) {
        if (!this.radioIndex) {
          this.ImageURL.push(data.data);
        } else {
          this.ImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.radioIndex = '';
        }
      },
      //修改图片
      updateImage(data) {
        if (!this.updateRadioIndex) {
          this.ImageURL1.push(data.data);
        } else {
          this.ImageURL1.splice(this.updateRadioIndex - 1, 1, data.data);
          this.updateRadioIndex = '';
        }
      },


      //删除修改对应图片
      deleteImageURL(val) {
        this.isNewUploaNode = false
        this.ImageURL = this.ImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //删除修改对应图片
      deleteUpdateImageURL(val) {
        this.isNewUploaNode = false
        this.ImageURL1 = this.ImageURL1.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //前往生成房间数
      toRoomNumber(RoomID) {
        this.$router.push({name: 'HotelRoomNumber', params: {id: RoomID}})
      },
      //前往房间房间设施
      toRoomFacilities(RoomID) {
        this.$router.push({name: 'HotelRoomRoomFacilities', params: {id: RoomID}})
      },
      //前往房间产品
      toRoomProduct(RoomID) {
        this.$router.push({name: 'HotelRoomProduct', params: {id: RoomID}})
      },
      lookImg(imgUrl) {
        ;
        this.imgShow = true;
        this.imgUrl = imgUrl;
      },
      //分页
      handleCurrentChange(num) {
        this.initData('', num);
      },
      //初始化
      initData(name, page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "ht_bt_RoomID": "",//房间编码
          "ht_bt_HotelID": this.hotelID,//酒店编码
          "ht_bt_RoomName": name ? name : '',
          "ht_bt_IsDelete": "",//是否启用
          "page": page ? page : 1,//页码编号
          "rows": "5",//单页显示数量
        };
        this.$store.commit('showLoading');
        for(let i in options){
          options[i]=options[i].toString().trim();
        };
        this.$store.dispatch('initHotelRoom', options)
          .then((total) => {
            this.total = total;
            this.$store.commit('hideLoading');
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
            this.$store.commit('hideLoading');
          })
      },
      //查询
      search() {
        this.initData(this.roomName, 1)
      },
      Add() {
        let uploader = document.querySelector('.uploader-list')
        if (uploader) {
          uploader.querySelector('ul').innerHTML = '';
        }
        for (let attr in this.addOptions) {
          if (typeof this.addOptions[attr] == 'object') {
            for (let attr1 in this.addOptions[attr]) {
              this.addOptions[attr][attr1] = ''
            }
          } else {
            this.addOptions[attr] = ''
          }
        }
        this.ImageURL = [];
        this.ImageURL1 = [];
        this.HotelRoomRoomFacilitiesList = []
        this.hotelRoomInfoList = []
        this.HotelRoomRoomFacilitiesNum = 0;
        this.num = 0;
        this.HouseNumberArryNum = 0
        ;
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        this.addOptions.ht_bt_HotelID = this.hotelID;
        this.addOptions.ht_bt_ImagePath = this.ImageURL.join(',');
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "token": this.userInfo.token,
          "data": {
            "ht_bt_HotelID": this.addOptions.ht_bt_HotelID,
            "ht_bt_RoomName": this.addOptions.ht_bt_RoomName,
            "ht_bt_BedType": this.addOptions.ht_bt_BedType,
            "ht_bt_MostIn": this.addOptions.ht_bt_MostIn,
            "ht_bt_Level": this.addOptions.ht_bt_Level,
            "ht_bt_ImagePath": this.addOptions.ht_bt_ImagePath,
            "ht_bt_Area": this.addOptions.ht_bt_Area,
            "ht_bt_Smoke": this.addOptions.ht_bt_Smoke,
            "ht_bt_AddBed": this.addOptions.ht_bt_AddBed,
            "ht_bt_IsDelete": '0',
            "ht_bt_Remark": this.addOptions.ht_bt_Remark,
//            HouseNumberArry
            "roomInfo": [],
            "HotelRoomHardArray": ''
          }
        }
        options.data.roomInfo = this.hotelRoomInfoList.map(item => {
          return {
            "ht_rpp_Name": item.ht_rpp_Name,
            "ht_rpp_BedType": item.ht_rpp_BedType,
            "ht_rpp_BreakfastType": item.ht_rpp_BreakfastType,
            "ht_rpp_WafiType": item.ht_rpp_WafiType,
            "ht_rpp_CancelType": item.ht_rpp_CancelType,
            "ht_rpp_ProductPrice": item.ht_rpp_ProductPrice,
            "ht_rpp_RoomNumber": '0',
            HouseNumberArry: item.HouseNumberArry.map(v => {
              return {
                "ht_re_HouseNumber": v.HouseNumberList.join(','),
                "ht_re_ImagePath": v.HotelRoomEntityImageURL.join(',')
              }
            })
          }
        })
        options.data.HotelRoomHardArray = this.HotelRoomRoomFacilitiesList.map(item => {
          return item.ht_rth_RoomHardIDList.join(',')
        }).join(',')
        this.$store.dispatch('AddHotelRoom', options)
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

      //修改
      Update(obj) {
        this.ImageURL1 = obj.ht_bt_ImagePath;
        ;
        this.updateDialog = true;
        this.$store.commit('UpdateHotelRoom', obj.ht_bt_RoomID)
      },
      //修改提交
      updateSubmit() {
        this.updateHotelRoomObj.ht_bt_ImagePath = this.ImageURL1.join(',');
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "data": this.updateHotelRoomObj
        };

        this.$store.dispatch('UpdateHotelRoom', updateOptions)
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
            "ht_bt_RoomID": id//房间编码
          }
        };
        this.$store.dispatch('DeleteHotelRoom', deleteOptions)
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
    }
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

  .dialogList {
    padding-left: 120px;
    width: 100%;
    overflow: hidden;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }

  .dialogList span {
    text-align: center;
    width: 33.333333%;
    float: left;
    color: #ccc;
    position: relative;
  }

  .dialogList span em {
    font-style: normal;
  }

  .dialogList span:after {
    content: '》';
    position: absolute;
    right: 0;
    top: 0;
  }

  .dialogList span.active:after {
    color: #409EFF;
  }

  .dialogList span:last-of-type:after {
    display: none;
  }

  .dialogList span.active em {
    color: #409EFF;
    font-style: normal;
    padding-bottom: 5px;
    border-bottom: 2px solid #409EFF;
  }

  .imgWap span {
    position: absolute;
    right: -15px;
    top: -6px;
  }

  .imgWap em {
    position: absolute;
    right: -55px;
    top: 30px;
    font-style: normal;
    color: #42b983;
  }
</style>
