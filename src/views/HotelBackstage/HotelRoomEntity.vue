<template>
  <div class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px 0px 0px 20px">
      <el-breadcrumb-item :to="{path:'/hotelBackstageHome/hotelRoomAdmin'}">房间</el-breadcrumb-item>
      <el-breadcrumb-item @click.native="goHotelRoomProduct">酒店房间产品</el-breadcrumb-item>
      <el-breadcrumb-item>酒店房间实体</el-breadcrumb-item>
      <!--<el-breadcrumb-item>前往生成房间数</el-breadcrumb-item>-->
    </el-breadcrumb>
    <h1 class="wrapTitle">酒店房间实体</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>房间门牌号筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="houseName" auto-complete="off" placeholder="房间门牌号" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="Add" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--<el-button type="primary" size="small" style="margin-left: 5px" @click="addHouseNumber">生成房间数</el-button>-->
    <el-button type="danger" size="small" style="margin-left: 5px" @click="RoomArrDelete">批量删除</el-button>
    <!--数据展示-->
    <el-table
      :data="hotelRoomEntityList"
      v-loading="isLoading"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        width="140"
        prop="ht_re_Id"
        label="房间实体ID"
        align="center"
      >
      </el-table-column>
      <!--<el-table-column-->
      <!--width="140"-->
      <!--prop="ht_rpp_ID"-->
      <!--label="房间产品ID"-->
      <!--align="center"-->
      <!--&gt;-->
      <!--</el-table-column>-->
      <el-table-column
        width="140"
        prop="ht_re_HouseNumber"
        label="房间门牌号"
      >
      </el-table-column>
      <el-table-column
        label="房间图片"
      >
        <template slot-scope="scope">
          <img v-for="item,index in scope.row.ht_re_ImagePath" v-lazy="item" style="height: 100px;margin-right: 10px;">
          <!--<span>{{scope.row.ht_hi_ImageURL}}</span>-->
          <!--<img  alt="" v-lazy="scope.row.ht_re_ImagePath" title="点击查看大图" style="width:100px;height:100px;cursor: pointer">-->
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--label="生成状态"-->
      <!--&gt;-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{scope.row.ht_re_MaxUseDate?'已生成':'未生成'}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--label="房间图片"-->
      <!--align="center"-->
      <!--&gt;-->

      <!--</el-table-column>-->
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
            @click="Delete(scope.row.ht_re_Id)">删除
          </el-button>
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="primary"-->
          <!--@click="toRoomNumber(scope.row.ht_re_Id)">前往生成房间数-->
          <!--</el-button>-->

        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>
    </div>

    <!--添加酒店房间实体-->
    <el-dialog title="添加酒店房间实体" :modal-append-to-body="false" :visible.sync="addDialog" :close-on-click-modal="false">
      <el-form :model="addOptions">
        <p style="color: red">注:房间门牌号添加规则(栋数-楼层-房号),例:8-8-08即8栋8楼08号 <span></span></p>
        <p style="color: red">注: 没有栋数的(楼层-房号),例:8-08即8楼08号<span></span></p>
        <el-form-item label="选中的房间门牌号:" :label-width="infoWidth" v-show="HouseNumberList.length">
          <el-tag :key="index" type="warning" v-for="item,index in HouseNumberList" size="small" closable
                  @close="handleClose(item)" style="margin-right: 5px">{{item}}
          </el-tag>
        </el-form-item>
        <el-form-item label="房间门牌号:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.ht_re_HouseNumber" style="width: 300px" size="small" ref="input"></el-input>
          <el-button @click="AddHouseNumber(addOptions.data.ht_re_HouseNumber)" size="small" type="success">添加
          </el-button>
        </el-form-item>
        <el-form-item label="房间图片上传:" :label-width="formLabelWidth">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改酒店房间实体-->
    <el-dialog title="修改酒店房间实体" :modal-append-to-body="false" :visible.sync="updateDialog"
               :close-on-click-modal="false">
      <el-form :model="updateHotelRoomEntityObj">
        <p style="color: red">注:房间门牌号添加规则(栋数-楼层-房号),例:8-8-08即8栋8楼08号 <span></span></p>
        <p style="color: red">注: 没有栋数的(楼层-房号),例:8-08即8楼08号<span></span></p>
        <el-form-item label="房间门牌号:" :label-width="formLabelWidth">
          <el-input v-model="updateHotelRoomEntityObj.ht_re_HouseNumber"></el-input>
        </el-form-item>
        <el-form-item label="房间图片上传:" :label-width="formLabelWidth">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--生成-->
    <el-dialog title="生成房间数" :modal-append-to-body="false" :visible.sync="addHouseNumberDialog"
               :close-on-click-modal="false">
      <el-form :model="addOptions">
        <el-form-item label="日期选择:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addHouseNumberDialog = false">取 消</el-button>
        <el-button type="primary" @click="addHouseNumberSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  import Upload from '@/components/Upload'

  export default {
    name: '',
    components: {
      Upload
    },
    data() {
      return {
        date: '',
        addHouseNumberDialog: false,
        HouseNumberList: [],//门牌号
        infoWidth: '180px',
        houseName: '',
        roomProductID: '',//房间产品编码
        total: 0,
        ImageURL: [],
        ImageURL1: [],
        isLoading: false,
        addDialog: false,
        updateDialog: false,
        formLabelWidth: '120px',
        options: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_rpp_ID": "",//房间产品ID
          "ht_rs_RoomEntityId": "",//房间实体ID
          "ht_rpp_BeginUseDate": "",//开始供应日期
          "ht_rpp_EndUseDate": "",//结束供应日期
        },
        addOptions: {
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
        imageObj: {accept: 'image/*'},
        radioIndex: 0,
        pageNum: 1,
        updateRadioIndex: 0,
        isNewUploaNode: true,
        selectList: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    computed: mapGetters([
      'hotelRoomEntityList',
      'updateHotelRoomEntityObj'
    ]),
    created() {
      let id = this.$route.params.id;
      if (!id) {
        this.$notify({
          message: '请先选择房间产品!',
          position: 'top-left',
          type: 'error'
        });
        this.$router.push({name: 'HotelRoomProduct'});
        return
      }
      this.options.ht_rpp_ID = id
      this.roomProductID = id;
      this.initData('', this.pageNum)
    },
    methods: {
      //点击批量删除
      async RoomArrDelete() {
        if (!this.selectList.length) {
          this.$notify({
            message: '请选择需要生成的房间实体!',
            type: 'error'
          });
          return
        }
        let arr = []
        for (var i = 0; i < this.selectList.length; i++) {
          arr[i] = this.selectList[i].ht_re_Id
        }
        this.getValue(arr)
          .then(suc => {
            this.$notify({
              message: '删除成功',
              type: 'success'
            });
            this.initData(this.houseName, this.pageNum)
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
      //点击生成房间数
      addHouseNumber() {

        if (!this.selectList.length) {
          this.$notify({
            message: '请选择需要生成的房间实体!',
            type: 'error'
          });
          return
        }
        this.date = ''
        this.addHouseNumberDialog = true;
      },
      //生成房间数提交
      addHouseNumberSubmit() {
        let arr = []
        for (var i = 0; i < this.selectList.length; i++) {
          arr[i] = this.selectList[i].ht_re_Id
        }
        if (!this.date.length) {
          this.$notify({
            message: '请选择生成日期范围!',
            type: 'error'
          });
          return
        }
        this.options.ht_rs_RoomEntityId = arr.join(',')
        this.options.ht_rpp_BeginUseDate = this.date[0];
        this.options.ht_rpp_EndUseDate = this.date[1];

        this.$store.dispatch('AddHotelRoomNumber', this.options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.houseName, this.pageNum)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addHouseNumberDialog = false;
      },
      //选中
      handleSelectionChange(arr) {
        this.selectList = arr;
      },
      //点击X
      handleClose(tag) {
        this.HouseNumberList.splice(this.HouseNumberList.indexOf(tag), 1);
      },
      AddHouseNumber(v) {
        this.addOptions.data.ht_re_HouseNumber = '';
        this.$refs.input.focus()
        if (v) {
          if (v.indexOf(',') > -1) {
            this.HouseNumberList = this.HouseNumberList.concat(v.split(','));
          } else {
            this.HouseNumberList.push(v)
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
      goHotelRoomProduct() {
        this.$router.push({name: 'HotelRoomProduct', params: {id: 1378}})
      },
      //前往生成房间数
      toRoomNumber(RoomProductID) {
        this.$router.push({name: 'HotelRoomNumber', params: {id: RoomProductID}})
      },
      //图片转二进制
      uploadImg(file) {
        return new Promise(function (relove, reject) {
          lrz(file)
            .then(data => {
              relove(data.base64.split(',')[1])
            })
        })
      },
      uploadToOSS(file) {
        return new Promise((relove, reject) => {
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", getNewStr + "/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText
                relove(JSON.parse(data))
              }
            } else {
//               if (xhr.responseText) {
//                 var data = xhr.responseText;
//                 reject(JSON.parse(data).resultcontent)
//               }
            }
          }
        })
      },
      uploaNode() {
        this.ImageURL = [];
        this.ImageURL1 = [];
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                // this.uploadImg(this.$refs.upload.files[i]).then(data => {
                //   this.$store.dispatch('hotelUploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL.push(data.data);
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
                //})
              }
            })
          }
          if (this.$refs.upload1) {
            this.$refs.upload1.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload1.files.length; i++) {
                // this.uploadImg(this.$refs.upload1.files[i]).then(data => {
                //   this.$store.dispatch('hotelUploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload1.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL1.push(data.data);
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
                // })
              }
            })
          }
        }, 30)
      },
      //分页
      handleCurrentChange(num) {
        this.pageNum = num
        this.initData(this.houseName, num)
      },
      initData(houseID, page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "page": page ? page : 1,//分页号
          "rows": "10",//单页显示数据量
          "ht_re_Id": "",//房间实体ID
          "ht_rpp_ID": this.roomProductID,//房间产品ID
          "ht_re_HouseNumber": houseID ? houseID : '',//房间门牌号
          "ht_re_ImagePath": "",//房间图片
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelRoomEntity', options)
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
      search() {
        this.initData(this.houseName, this.pageNum)
      },
      Add() {
        this.HouseNumberList = [];
        this.ImageURL = []
        let uploader = document.querySelector('.uploader-list')
        if (uploader) {
          uploader.querySelector('ul').innerHTML = ''
        }
        for (let attr in this.addOptions.data) {
          if (typeof this.addOptions.data[attr] == 'object') {
            for (let attr1 in this.addOptions.data[attr]) {
              this.addOptions.data[attr][attr1] = ''
            }
          } else {
            this.addOptions.data[attr] = ''
          }
        }
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        this.addOptions.data.ht_re_ImagePath = this.ImageURL.join(',');
        this.addOptions.data.ht_rpp_ID = this.roomProductID;
        this.addOptions.data.ht_re_HouseNumber = this.HouseNumberList.join(',')
        this.$store.dispatch('AddHotelRoomEntity', this.addOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
//          window.location.reload()
            this.initData(this.houseName, this.pageNum)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      Update(obj) {
        this.ImageURL1 = obj.ht_re_ImagePath;
        this.updateDialog = true;
        this.$store.commit('UpdateHotelRoomEntity', obj.ht_re_Id)
      },
      //修改提交
      updateSubmit() {
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelRoomEntityObj
        };
        updateOptions.data.ht_re_ImagePath = this.ImageURL1.join(',');
        this.$store.dispatch('UpdateHotelRoomEntity', updateOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.houseName, this.pageNum)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false;
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
            "ht_re_Id": id//房间实体ID
          }
        };
        return this.$store.dispatch('DeleteHotelRoomEntity', deleteOptions)
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
            "ht_re_Id": id//房间实体ID
          }
        };
        this.$store.dispatch('DeleteHotelRoomEntity', deleteOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.houseName, this.pageNum)
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
