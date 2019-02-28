<template>
  <div>

    <h1 class="wrapTitle">酒店员工管理</h1>

    <!--导航-->

    <el-menu :default-active="navIndex" class="el-menu-demo" mode="horizontal" @select="changeNav">
      <el-menu-item :index="item.value" v-for="item,index in navList" :key="index">{{item.label}}</el-menu-item>
    </el-menu>

    <!--员工管理-->

    <div style="padding-top: 20px;" v-show="navIndex == 1">

      <!--查询-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input @blur="blurPhone" type="text" v-model="phone" auto-complete="off" placeholder="手机号"
                      size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input @blur="blurPhone" type="text" v-model="accountNumber" auto-complete="off" placeholder="账号"
                      size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="roleType" placeholder="选择权限" size="small">
              <el-option
                v-for="item in roleList"
                :key="item.Id"
                :label="item.Name"
                :value="item.Id">
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
        :data="staffList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="UserName"
          align="center"
          label="账号">
          <template slot-scope="scope">
            <span>{{scope.row.UserName | setUserCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Nickname"
          align="center"
          width="150"
          label="昵称">
        </el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="头像">
          <template slot-scope="scope">
            <img v-lazy="scope.row.HeadImage" :key="scope.row.HeadImage" alt="" width="100">
          </template>
        </el-table-column>
        <el-table-column
          prop="Email"
          align="center"
          label="邮箱">
        </el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="电话号码">
          <template slot-scope="scope">
            <span>{{scope.row.Phone | setUserCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="StateDes"
          align="center"
          width="100"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="roleStr"
          align="center"
          label="角色权限">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="updatePassword(scope.row.Id)">修改密码
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

      <!--添加-->

      <el-dialog title="添加员工信息" :modal-append-to-body="false" :visible.sync="addDialog" :close-on-click-modal="false"
                 width="50%">
        <el-form :model="addOptions">
          <el-form-item label="账号:" :label-width="formLabelWidth">
            <el-input @blur="blurPhone" v-model="addOptions.data.UserName" placeholder="输入该员工的手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.PassWord" type="password" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item label="昵称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.Nickname" placeholder="输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" :label-width="formLabelWidth">
            <el-input @blur="blurPhone" v-model="addOptions.data.Phone" placeholder="输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.Email" placeholder="输入邮箱(选填)"></el-input>
          </el-form-item>
          <el-form-item label="角色权限:" :label-width="formLabelWidth">
            <el-select v-model="addRoleList" multiple placeholder="选择角色权限" size="small">
              <el-option
                v-for="item in roleList"
                :key="item.Id"
                :label="item.Name"
                :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传头像:" :label-width="formLabelWidth">
            <div style="text-align: center;margin-bottom: 20px;">
              <el-button size="small" type="success" @click="clickPhotograph('canvas')">点击拍照</el-button>
            </div>
            <canvas id="canvas" width="500" height="320"></canvas>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--上传头像弹窗-->

      <el-dialog
        title="头像上传"
        :modal-append-to-body="false"
        :visible.sync="showHeadPortrait"
        width="600px">

        <video id="video" width="500" height="320" style="display: block;margin: 0 auto;"></video>

        <div style="text-align: center;margin-top: 20px;">

          <el-button type="primary" round @click="upLoadImage">拍照</el-button>

        </div>

        <span slot="footer" class="dialog-footer">

          <el-button @click="showHeadPortrait = false">取 消</el-button>

        </span>

      </el-dialog>

      <!--修改-->

      <el-dialog title="修改员工信息" :modal-append-to-body="false" :visible.sync="updateDialog" :close-on-click-modal="false"
                 width="50%">
        <el-form :model="updateObj">
          <el-form-item label="账号:" :label-width="formLabelWidth">
            <el-input @blur="blurPhone" v-model="updateObj.UserName" placeholder="输入该员工的手机号"></el-input>
          </el-form-item>
          <el-form-item label="昵称:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.Nickname" placeholder="输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" :label-width="formLabelWidth">
            <el-input @blur="blurPhone" v-model="updateObj.Phone" placeholder="输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.Email" placeholder="输入邮箱(选填)"></el-input>
          </el-form-item>
          <el-form-item label="状态:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.State" placeholder="状态" size="small">
              <el-option
                v-for="item in userState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色权限:" :label-width="formLabelWidth">
            <el-select v-model="updateRoleList" multiple placeholder="选择角色权限" size="small">
              <el-option
                v-for="item in roleList"
                :key="item.Id"
                :label="item.Name"
                :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传头像:" :label-width="formLabelWidth">
            <div style="text-align: center;margin-bottom: 20px;">
              <el-button size="small" type="success" @click="clickPhotograph('upCanvas')">点击拍照</el-button>
            </div>
            <canvas id="upCanvas" width="500" height="320" style="position: absolute;z-index: -10000;"></canvas>
            <img v-lazy="updateObj.HeadImage" alt="" width="500" :key="updateObj.HeadImage">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改密码-->

      <el-dialog title="修改员工修改密码" :modal-append-to-body="false" :visible.sync="updatePasswordDialog"
                 :close-on-click-modal="false"
                 width="50%">
        <span>输入新密码 </span>
        <el-input v-model="newPassword" type="password" placeholder="输入新密码" style="width: 200px;"
                  size="small"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updatePasswordDialog = false">取 消</el-button>
          <el-button type="primary" @click="updatePasswordSub">确 定</el-button>
        </div>
      </el-dialog>

    </div>

    <!--员工类型管理-->

    <div style="padding-top: 20px;" v-show="navIndex == 0">

      <!--查询-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="roleState" placeholder="请选择" size="small">
              <el-option
                v-for="item in userState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchAdmin" size="small">查询</el-button>
            <el-button type="primary" @click="addAdmin" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->

      <el-table
        :data="roleAdminList"
        style="width: 100%">
        <el-table-column
          prop="Name"
          align="center"
          label="类型名称">
        </el-table-column>
        <el-table-column
          align="center"
          label="状态">
          <template slot-scope="scope">
            {{scope.row.State | getCardState}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="updateAdmin(scope.row)">修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加-->

      <el-dialog title="添加员工类型" :modal-append-to-body="false" :visible.sync="addTypeDialog"
                 :close-on-click-modal="false"
                 width="50%">
        <el-form :model="addAdminOptions" label-width="120px">
          <el-form-item label="名称:">
            <el-input v-model="addAdminOptions.Name" placeholder="选填"></el-input>
          </el-form-item>
          <el-form-item label="选择角色:">

            <el-select v-model="addAdminOptions.LocalRole" placeholder="请选择">
              <el-option
                v-for="item in allAdminList"
                :key="item.roleID"
                :label="item.roleName"
                :value="item.roleID">
              </el-option>
            </el-select>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addTypeDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdminSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->

      <el-dialog title="修改员工类型" :modal-append-to-body="false" :visible.sync="updateTypeDialog"
                 :close-on-click-modal="false"
                 width="50%">
        <el-form :model="updateTypeObj" label-width="120px">
          <el-form-item label="名称:">
            <el-input v-model="updateTypeObj.Name"></el-input>
          </el-form-item>
          <el-form-item label="选择角色:">
            <el-select v-model="updateTypeObj.LocalRole" placeholder="请选择">
              <el-option
                v-for="item in allAdminList"
                :key="item.roleID"
                :label="item.roleName"
                :value="item.roleID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择状态:">
            <el-select v-model="updateTypeObj.State" placeholder="请选择">
              <el-option
                v-for="item in userState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateTypeDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminSubmit">确 定</el-button>
        </div>
      </el-dialog>


    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {isPhoneNum, isEmil, deepClone} from '@/assets/js/public'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        context: '',
        elCanvas: '',
        showHeadPortrait: false,
        navIndex: '0',
        navList: [
          {
            value: '0',
            label: '员工类型'
          },
          {
            value: '1',
            label: '员工管理'
          }
        ],
        hotelId: '',
        pageNum: 1,
        staffList: [],
        isLoading: false,
        addDialog: false,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "roleData": "",
          "data": {
            "CompanyID": "",//公司编码对应酒店编码
            "UserName": "",//账号
            "PassWord": "",//密码
            "Nickname": "",//昵称
            "Phone": "",//手机号
            "Email": "",//电子邮箱
            "SysType": '',//系统编码(0酒店 1美食)
            "HeadImage": '',//头像
          }
        },
        roleList: [],
        phone: '',
        accountNumber: '',
        roleType: '',
        total: 0,
        formLabelWidth: '120px',
        addRoleList: [],
        updateDialog: false,
        updateObj: {},
        updateRoleList: [],
        userState: [
          {
            value: 0,
            label: '正常'
          },
          {
            value: 1,
            label: '作废'
          }
        ],
        newPassword: '',
        updatePasswordDialog: false,
        id: '',

        //酒店角色

        roleState: '',
        roleAdminList: [],
        addTypeDialog: false,
        addAdminOptions: {
          "Name": "",//名称
          "LocalRole": "",//内部角色
          "CompanyId": "",//公司ID对应酒店编码
          "SysID": "",//系统编码(0酒店1美食)
        },
        allAdminList: [],
        updateTypeDialog: false,
        updateTypeObj: {},
      }
    },
    created() {
      if (sessionStorage.getItem('hotelID')) {
        this.hotelId = sessionStorage.getItem('hotelID');
      } else {
        this.$router.push({name: 'Login'})
      }
      this.initHotelStaffAdmin();
      this.initAllAdmin();
    },
    methods: {

      //拍照

      clickPhotograph(el) {

        this.elCanvas = el;

        this.showHeadPortrait = true;

        this.$nextTick(() => {
          //访问用户媒体设备的兼容方法
          function getUserMedia(constraints, success, error) {
            if (navigator.mediaDevices.getUserMedia) {
              //最新的标准API
              navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
            } else if (navigator.webkitGetUserMedia) {
              //webkit核心浏览器
              navigator.webkitGetUserMedia(constraints, success, error)
            } else if (navigator.mozGetUserMedia) {
              //firfox浏览器
              navigator.mozGetUserMedia(constraints, success, error);
            } else if (navigator.getUserMedia) {
              //旧版API
              navigator.getUserMedia(constraints, success, error);
            }
          }

          let video = document.getElementById('video');
          let canvas = document.getElementById(el);
          this.context = canvas.getContext('2d');

          function success(stream) {
            //兼容webkit核心浏览器
            let CompatibleURL = window.URL || window.webkitURL;
            //将视频流设置为video元素的源
            console.log(stream);

            //video.src = CompatibleURL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
          }

          function error(error) {
            console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
          }

          if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
            //调用用户媒体设备, 访问摄像头
            getUserMedia({video: {width: 480, height: 320}}, success, error);
          } else {
            alert('不支持访问用户媒体');
          }
        })
      },

      //拍照提交

      photographSubmit() {
        return new Promise((resolve, reject) => {
          this.context.drawImage(video, 0, 0, 500, 320);
          let newCanvas = document.getElementById(this.elCanvas);
          var base64 = newCanvas.toDataURL();

          function dataURLtoFile(dataurl, filename) {//将base64转换为文件
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type: mime});
          }

          this.uploadToOSS(dataURLtoFile(base64, "123.png"))
            .then(data => {
              if (Number(data.resultcode) == 200) {
                resolve(data.data);
              } else {
                reject(data.resultcontent);
              }
            })
        })
      },

      //图片上传OSS

      uploadToOSS(file) {
        return new Promise((relove, reject) => {
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://hly.1000da.com.cn/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText
                relove(JSON.parse(data))
              }
            } else {
            }
          }
        })
      },

      //上传图片

      upLoadImage() {

        this.photographSubmit()
          .then(data => {
            if( this.addDialog ){
              this.addOptions.data.HeadImage = data;
            }
            if( this.updateDialog ){
              this.updateObj.HeadImage = data;
            }
            this.showHeadPortrait = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })

      },

      //导航

      changeNav(val) {

        this.navIndex = val;

        if (val == 0) {
          this.initHotelStaffAdmin();
          this.initAllAdmin();
        }

        if (val == 1) {
          this.initData();
          this.initHotelRole();
        }

      },

      //-------------员工管理----------------------------

//      phone accountNumber addOptions.data.Phone updateObj.UserName Phone
      blurPhone() {
        if (this.phone && !isPhoneNum(this.phone)) {
          this.$notify({
            type: 'error',
            message: '您输入的手机号格式有误',
          });
          this.phone = '';
        }
        if (this.accountNumber && !isPhoneNum(this.accountNumber)) {
          this.$notify({
            type: 'error',
            message: '您输入的账号格式有误',
          });
          this.accountNumber = '';
        }
        if (this.addOptions.data.Phone && !isPhoneNum(this.addOptions.data.Phone)) {
          this.$notify({
            type: 'error',
            message: '您输入的手机号格式有误',
          });
          this.addOptions.data.Phone = '';
        }
        if (this.addOptions.data.UserName && !isPhoneNum(this.addOptions.data.UserName)) {
          this.$notify({
            type: 'error',
            message: '您输入的账号格式有误',
          });
          this.addOptions.data.UserName = '';
        }
        if (this.updateObj.UserName && !isPhoneNum(this.updateObj.UserName)) {
          this.$notify({
            type: 'error',
            message: '您输入的账号格式有误',
          });
          this.updateObj.UserName = '';
        }
        if (this.updateObj.Phone && !isPhoneNum(this.updateObj.Phone)) {
          this.$notify({
            type: 'error',
            message: '您输入的手机号格式有误',
          });
          this.updateObj.Phone = '';
        }
      },

      initHotelRole() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          //"Id": "1",//
          //"Name": "财务",//名称
          //"LocalRole": "1",//内部角色
          "CompanyId": this.hotelId,//公司ID
          "SysID": 0,//系统编码(0酒店1美食)
          "State": 0//状态(0正常1作废)
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelRole', options)
          .then(data => {
            this.roleList = data;
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.isLoading = false;
          })
      },
//      分页
      handleCurrentChange(num) {
        this.pageNum = num;
        this.initData();
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
          //"Id": "1",//
          "CompanyID": this.hotelId,//公司编码
          "UserName": this.accountNumber,//账号
          "Phone": this.phone,//手机号
          //"SysType": "0",//系统编码
          "RoleID": this.roleType,//角色编码
          //"State":0//管理员状态
        };
        this.isLoading = true;
        for (let i in options) {
          options[i] = options[i].toString().trim();
        }

        this.$store.dispatch('initHotelStaffAdmin', options)
          .then(data => {
            this.total = Number(data.totalRows);
            var arr = data.data;
            for (let i = 0; i < arr.length; i++) {
              arr[i].roleStr = '';
              for (let j = 0; j < arr[i].roleList.length; j++) {
                arr[i].roleStr += arr[i].roleList[j].roleName + ' ';
              }
            }
            this.staffList = arr;
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.isLoading = false;
          })
      },
      //查询
      search() {
        this.pageNum = 1;
        this.initData()
      },
      //添加
      Add() {
        this.addOptions.roleData = '';
        this.addRoleList = [];
        for (let attr in this.addOptions.data) {
          if (this.addOptions.data[attr] != 'SysType') {
            this.addOptions.data[attr] = '';
          }
        }
        this.addOptions.data.SysType = 0;
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        if (!isPhoneNum(this.addOptions.data.UserName) || !isPhoneNum(this.addOptions.data.Phone)) {
          this.$notify({
            message: '账号或手机号输入格式错误！',
            type: 'error'
          })
          return
        }
        if (this.addOptions.data.Email && !isEmil(this.addOptions.data.Email)) {
          this.$notify({
            message: '输入正确的邮箱！',
            type: 'error'
          })
          return
        }
        ;
        if (!this.addRoleList.length) {
          this.$notify({
            message: '选择角色权限！',
            type: 'error'
          })
          return
        }
        this.addOptions.roleData = this.addRoleList.join(',');
        this.addOptions.data.CompanyID = this.hotelId;
        this.isLoading = true;
        this.$store.dispatch('addHotelStaffAdmin', this.addOptions)
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
            this.isLoading = false;
          })
      },
      //修改
      Update(obj) {
        this.updateRoleList = [];
        this.updateObj = obj;
        for (let i = 0; i < obj.roleList.length; i++) {
          this.updateRoleList.push(obj.roleList[i].roleID);
        }
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit() {
        if (!isPhoneNum(this.updateObj.UserName) || !isPhoneNum(this.updateObj.Phone)) {
          this.$notify({
            message: '账号或手机号输入格式错误！',
            type: 'error'
          })
          return
        }
        if (this.updateObj.Email && !isEmil(this.updateObj.Email)) {
          this.$notify({
            message: '输入正确的邮箱！',
            type: 'error'
          })
          return
        }
        if (!this.updateRoleList.length) {
          this.$notify({
            message: '选择角色权限！',
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
          "roleData": this.updateRoleList.join(','),
          "data": this.updateObj
        };
        this.isLoading = true;
        this.$store.dispatch('updateHotelStaffAdmin', options)
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
            this.isLoading = false;
          })
      },
      //删除
      updatePassword(id) {
        this.newPassword = '';
        this.id = id;
        this.updatePasswordDialog = true;
      },
      //修改密码
      updatePasswordSub() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "Id": this.id,//
          "PassWord": this.newPassword,//新密码
        }
        this.isLoading = true;
        this.$store.dispatch('updateHotelStaffAdminPassword', options)
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
            this.isLoading = false;
          })
      },

      //--------------------员工类型管理--------------------

      //初始化内部角色

      initAllAdmin() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        }
        this.$store.dispatch('initAllAdmin', options)
          .then(data => {
            this.allAdminList = data;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
          .catch(err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },

      //初始化员工类型

      initHotelStaffAdmin() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
//          "page": "1",
//          "rows": "10",
          //"Id": "1",//
          //"Name": "财务",//名称
          //"LocalRole": "1",//内部角色
          "CompanyId": this.hotelId,//公司ID
          "SysID": 0,//系统编码(0酒店1美食)
          "State": this.roleState//状态(0正常1作废)
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('initHotelRole', options)
          .then(data => {
            this.roleAdminList = data;
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

      //查询员工类型

      searchAdmin() {

        this.initHotelStaffAdmin();

      },

      //添加员工类型

      addAdmin() {

        for (let attr in this.addAdminOptions) {

          this.addAdminOptions[attr] = '';

        }

        this.addTypeDialog = true;

      },

      //添加员工类型提交

      addAdminSubmit() {

        this.addAdminOptions.SysID = 0;

        this.addAdminOptions.CompanyId = this.hotelId;

        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addAdminOptions
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('addHotelAdminOptions', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.addTypeDialog = false;
            this.initHotelStaffAdmin();
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

      //修改员工类型

      updateAdmin(obj) {

        this.updateTypeObj = deepClone(obj);

        this.updateTypeDialog = true;

      },

      //修改员工类型提交

      updateAdminSubmit() {

        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateTypeObj
        }

        this.$store.commit('showLoading');
        this.$store.dispatch('updateHotelAdminOptions', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.updateTypeDialog = false;
            this.initHotelStaffAdmin();
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
      }

    },
  }
</script>
<style scoped>
</style>
