(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7911d36d"],{"09fa":function(t,e,a){var i=a("4588"),n=a("9def");t.exports=function(t){if(void 0===t)return 0;var e=i(t),a=n(e);if(e!==a)throw RangeError("Wrong length!");return a}},"0a49":function(t,e,a){var i=a("9b43"),n=a("626a"),o=a("4bf8"),r=a("9def"),s=a("cd1c");t.exports=function(t,e){var a=1==t,l=2==t,d=3==t,u=4==t,c=6==t,f=5==t||c,p=e||s;return function(e,s,h){for(var m,b,g=o(e),v=n(g),y=i(s,h,3),w=r(v.length),O=0,S=a?p(e,w):l?p(e,0):void 0;w>O;O++)if((f||O in v)&&(m=v[O],b=y(m,O,g),t))if(a)S[O]=b;else if(b)switch(t){case 3:return!0;case 5:return m;case 6:return O;case 2:S.push(m)}else if(u)return!1;return c?-1:d||u?u:S}}},"0f88":function(t,e,a){var i,n=a("7726"),o=a("32e9"),r=a("ca5a"),s=r("typed_array"),l=r("view"),d=!(!n.ArrayBuffer||!n.DataView),u=d,c=0,f=9,p="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");while(c<f)(i=n[p[c++]])?(o(i.prototype,s,!0),o(i.prototype,l,!0)):u=!1;t.exports={ABV:d,CONSTR:u,TYPED:s,VIEW:l}},1169:function(t,e,a){var i=a("2d95");t.exports=Array.isArray||function(t){return"Array"==i(t)}},"1cb5":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",{staticClass:"wrapTitle"},[t._v("酒店员工管理")]),a("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":t.navIndex,mode:"horizontal"},on:{select:t.changeNav}},t._l(t.navList,function(e,i){return a("el-menu-item",{key:i,attrs:{index:e.value}},[t._v(t._s(e.label))])}),1),a("div",{directives:[{name:"show",rawName:"v-show",value:1==t.navIndex,expression:"navIndex == 1"}],staticStyle:{"padding-top":"20px"}},[a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[t._v("筛选:")])]),a("el-form-item",[a("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"手机号",size:"small"},on:{blur:t.blurPhone},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),a("el-form-item",[a("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"账号",size:"small"},on:{blur:t.blurPhone},model:{value:t.accountNumber,callback:function(e){t.accountNumber=e},expression:"accountNumber"}})],1),a("el-form-item",[a("el-select",{attrs:{placeholder:"选择权限",size:"small"},model:{value:t.roleType,callback:function(e){t.roleType=e},expression:"roleType"}},t._l(t.roleList,function(t){return a("el-option",{key:t.Id,attrs:{label:t.Name,value:t.Id}})}),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查询")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.Add}},[t._v("新增")])],1)],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.staffList}},[a("el-table-column",{attrs:{prop:"UserName",align:"center",label:"账号"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("setUserCode")(e.row.UserName)))])]}}])}),a("el-table-column",{attrs:{prop:"Nickname",align:"center",width:"150",label:"昵称"}}),a("el-table-column",{attrs:{align:"center",width:"150",label:"头像"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.row.HeadImage,expression:"scope.row.HeadImage"}],key:t.row.HeadImage,attrs:{alt:"",width:"100"}})]}}])}),a("el-table-column",{attrs:{prop:"Email",align:"center",label:"邮箱"}}),a("el-table-column",{attrs:{align:"center",width:"150",label:"电话号码"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("setUserCode")(e.row.Phone)))])]}}])}),a("el-table-column",{attrs:{prop:"StateDes",align:"center",width:"100",label:"状态"}}),a("el-table-column",{attrs:{prop:"roleStr",align:"center",label:"角色权限"}}),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.Update(e.row)}}},[t._v("修改\n          ")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.updatePassword(e.row.Id)}}},[t._v("修改密码\n          ")])]}}])})],1),a("div",{staticClass:"block",staticStyle:{float:"right"}},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:"添加员工信息","modal-append-to-body":!1,visible:t.addDialog,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(e){t.addDialog=e}}},[a("el-form",{attrs:{model:t.addOptions}},[a("el-form-item",{attrs:{label:"账号:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"输入该员工的手机号"},on:{blur:t.blurPhone},model:{value:t.addOptions.data.UserName,callback:function(e){t.$set(t.addOptions.data,"UserName",e)},expression:"addOptions.data.UserName"}})],1),a("el-form-item",{attrs:{label:"密码:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"password",placeholder:"输入密码"},model:{value:t.addOptions.data.PassWord,callback:function(e){t.$set(t.addOptions.data,"PassWord",e)},expression:"addOptions.data.PassWord"}})],1),a("el-form-item",{attrs:{label:"昵称:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"输入昵称"},model:{value:t.addOptions.data.Nickname,callback:function(e){t.$set(t.addOptions.data,"Nickname",e)},expression:"addOptions.data.Nickname"}})],1),a("el-form-item",{attrs:{label:"手机号:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"输入手机号"},on:{blur:t.blurPhone},model:{value:t.addOptions.data.Phone,callback:function(e){t.$set(t.addOptions.data,"Phone",e)},expression:"addOptions.data.Phone"}})],1),a("el-form-item",{attrs:{label:"邮箱:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"输入邮箱(选填)"},model:{value:t.addOptions.data.Email,callback:function(e){t.$set(t.addOptions.data,"Email",e)},expression:"addOptions.data.Email"}})],1),a("el-form-item",{attrs:{label:"角色权限:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{multiple:"",placeholder:"选择角色权限",size:"small"},model:{value:t.addRoleList,callback:function(e){t.addRoleList=e},expression:"addRoleList"}},t._l(t.roleList,function(t){return a("el-option",{key:t.Id,attrs:{label:t.Name,value:t.Id}})}),1)],1),a("el-form-item",{attrs:{label:"上传头像:","label-width":t.formLabelWidth}},[a("div",{staticStyle:{"text-align":"center","margin-bottom":"20px"}},[a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(e){t.clickPhotograph("canvas")}}},[t._v("点击拍照")])],1),a("canvas",{attrs:{id:"canvas",width:"500",height:"320"}})])],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"头像上传","modal-append-to-body":!1,visible:t.showHeadPortrait,width:"600px"},on:{"update:visible":function(e){t.showHeadPortrait=e}}},[a("video",{staticStyle:{display:"block",margin:"0 auto"},attrs:{id:"video",width:"500",height:"320"}}),a("div",{staticStyle:{"text-align":"center","margin-top":"20px"}},[a("el-button",{attrs:{type:"primary",round:""},on:{click:t.upLoadImage}},[t._v("拍照")])],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.showHeadPortrait=!1}}},[t._v("取 消")])],1)]),a("el-dialog",{attrs:{title:"修改员工信息","modal-append-to-body":!1,visible:t.updateDialog,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(e){t.updateDialog=e}}},[a("el-form",{attrs:{model:t.updateObj}},[a("el-form-item",{attrs:{label:"账号:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"输入该员工的手机号"},on:{blur:t.blurPhone},model:{value:t.updateObj.UserName,callback:function(e){t.$set(t.updateObj,"UserName",e)},expression:"updateObj.UserName"}})],1),a("el-form-item",{attrs:{label:"昵称:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"输入昵称"},model:{value:t.updateObj.Nickname,callback:function(e){t.$set(t.updateObj,"Nickname",e)},expression:"updateObj.Nickname"}})],1),a("el-form-item",{attrs:{label:"手机号:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"输入手机号"},on:{blur:t.blurPhone},model:{value:t.updateObj.Phone,callback:function(e){t.$set(t.updateObj,"Phone",e)},expression:"updateObj.Phone"}})],1),a("el-form-item",{attrs:{label:"邮箱:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"输入邮箱(选填)"},model:{value:t.updateObj.Email,callback:function(e){t.$set(t.updateObj,"Email",e)},expression:"updateObj.Email"}})],1),a("el-form-item",{attrs:{label:"状态:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"状态",size:"small"},model:{value:t.updateObj.State,callback:function(e){t.$set(t.updateObj,"State",e)},expression:"updateObj.State"}},t._l(t.userState,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),a("el-form-item",{attrs:{label:"角色权限:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{multiple:"",placeholder:"选择角色权限",size:"small"},model:{value:t.updateRoleList,callback:function(e){t.updateRoleList=e},expression:"updateRoleList"}},t._l(t.roleList,function(t){return a("el-option",{key:t.Id,attrs:{label:t.Name,value:t.Id}})}),1)],1),a("el-form-item",{attrs:{label:"上传头像:","label-width":t.formLabelWidth}},[a("div",{staticStyle:{"text-align":"center","margin-bottom":"20px"}},[a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(e){t.clickPhotograph("upCanvas")}}},[t._v("点击拍照")])],1),a("canvas",{staticStyle:{position:"absolute","z-index":"-10000"},attrs:{id:"upCanvas",width:"500",height:"320"}}),a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.updateObj.HeadImage,expression:"updateObj.HeadImage"}],key:t.updateObj.HeadImage,attrs:{alt:"",width:"500"}})])],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"修改员工修改密码","modal-append-to-body":!1,visible:t.updatePasswordDialog,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(e){t.updatePasswordDialog=e}}},[a("span",[t._v("输入新密码 ")]),a("el-input",{staticStyle:{width:"200px"},attrs:{type:"password",placeholder:"输入新密码",size:"small"},model:{value:t.newPassword,callback:function(e){t.newPassword=e},expression:"newPassword"}}),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updatePasswordDialog=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.updatePasswordSub}},[t._v("确 定")])],1)],1)],1),a("div",{directives:[{name:"show",rawName:"v-show",value:0==t.navIndex,expression:"navIndex == 0"}],staticStyle:{"padding-top":"20px"}},[a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[t._v("筛选:")])]),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:t.roleState,callback:function(e){t.roleState=e},expression:"roleState"}},t._l(t.userState,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.searchAdmin}},[t._v("查询")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.addAdmin}},[t._v("新增")])],1)],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.roleAdminList}},[a("el-table-column",{attrs:{prop:"Name",align:"center",label:"类型名称"}}),a("el-table-column",{attrs:{align:"center",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("getCardState")(e.row.State))+"\n        ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.updateAdmin(e.row)}}},[t._v("修改\n          ")])]}}])})],1),a("el-dialog",{attrs:{title:"添加员工类型","modal-append-to-body":!1,visible:t.addTypeDialog,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(e){t.addTypeDialog=e}}},[a("el-form",{attrs:{model:t.addAdminOptions,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"名称:"}},[a("el-input",{attrs:{placeholder:"选填"},model:{value:t.addAdminOptions.Name,callback:function(e){t.$set(t.addAdminOptions,"Name",e)},expression:"addAdminOptions.Name"}})],1),a("el-form-item",{attrs:{label:"选择角色:"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.addAdminOptions.LocalRole,callback:function(e){t.$set(t.addAdminOptions,"LocalRole",e)},expression:"addAdminOptions.LocalRole"}},t._l(t.allAdminList,function(t){return a("el-option",{key:t.roleID,attrs:{label:t.roleName,value:t.roleID}})}),1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addTypeDialog=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.addAdminSubmit}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"修改员工类型","modal-append-to-body":!1,visible:t.updateTypeDialog,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(e){t.updateTypeDialog=e}}},[a("el-form",{attrs:{model:t.updateTypeObj,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"名称:"}},[a("el-input",{model:{value:t.updateTypeObj.Name,callback:function(e){t.$set(t.updateTypeObj,"Name",e)},expression:"updateTypeObj.Name"}})],1),a("el-form-item",{attrs:{label:"选择角色:"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.updateTypeObj.LocalRole,callback:function(e){t.$set(t.updateTypeObj,"LocalRole",e)},expression:"updateTypeObj.LocalRole"}},t._l(t.allAdminList,function(t){return a("el-option",{key:t.roleID,attrs:{label:t.roleName,value:t.roleID}})}),1)],1),a("el-form-item",{attrs:{label:"选择状态:"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.updateTypeObj.State,callback:function(e){t.$set(t.updateTypeObj,"State",e)},expression:"updateTypeObj.State"}},t._l(t.userState,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateTypeDialog=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.updateAdminSubmit}},[t._v("确 定")])],1)],1)],1)],1)},n=[],o=(a("6b54"),a("c5f6"),a("34ef"),a("4917"),a("28a5"),a("795b")),r=a.n(o),s=(a("7f7f"),a("cadf"),a("551c"),a("097d"),a("5880")),l=a("466f"),d={computed:Object(s["mapGetters"])([]),data:function(){return{context:"",elCanvas:"",showHeadPortrait:!1,navIndex:"0",navList:[{value:"0",label:"员工类型"},{value:"1",label:"员工管理"}],hotelId:"",pageNum:1,staffList:[],isLoading:!1,addDialog:!1,addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",roleData:"",data:{CompanyID:"",UserName:"",PassWord:"",Nickname:"",Phone:"",Email:"",SysType:"",HeadImage:""}},roleList:[],phone:"",accountNumber:"",roleType:"",total:0,formLabelWidth:"120px",addRoleList:[],updateDialog:!1,updateObj:{},updateRoleList:[],userState:[{value:0,label:"正常"},{value:1,label:"作废"}],newPassword:"",updatePasswordDialog:!1,id:"",roleState:"",roleAdminList:[],addTypeDialog:!1,addAdminOptions:{Name:"",LocalRole:"",CompanyId:"",SysID:""},allAdminList:[],updateTypeDialog:!1,updateTypeObj:{}}},created:function(){sessionStorage.getItem("hotelID")?this.hotelId=sessionStorage.getItem("hotelID"):this.$router.push({name:"Login"}),this.initHotelStaffAdmin(),this.initAllAdmin()},methods:{clickPhotograph:function(t){var e=this;this.elCanvas=t,this.showHeadPortrait=!0,this.$nextTick(function(){function a(t,e,a){navigator.mediaDevices.getUserMedia?navigator.mediaDevices.getUserMedia(t).then(e).catch(a):navigator.webkitGetUserMedia?navigator.webkitGetUserMedia(t,e,a):navigator.mozGetUserMedia?navigator.mozGetUserMedia(t,e,a):navigator.getUserMedia&&navigator.getUserMedia(t,e,a)}var i=document.getElementById("video"),n=document.getElementById(t);function o(t){window.URL||window.webkitURL;console.log(t),i.srcObject=t,i.play()}function r(t){console.log("访问用户媒体设备失败".concat(t.name,", ").concat(t.message))}e.context=n.getContext("2d"),navigator.mediaDevices.getUserMedia||navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia?a({video:{width:480,height:320}},o,r):alert("不支持访问用户媒体")})},photographSubmit:function(){var t=this;return new r.a(function(e,a){t.context.drawImage(video,0,0,500,320);var i=document.getElementById(t.elCanvas),n=i.toDataURL();function o(t,e){var a=t.split(","),i=a[0].match(/:(.*?);/)[1],n=atob(a[1]),o=n.length,r=new Uint8Array(o);while(o--)r[o]=n.charCodeAt(o);return new File([r],e,{type:i})}t.uploadToOSS(o(n,"123.png")).then(function(t){200==Number(t.resultcode)?e(t.data):a(t.resultcontent)})})},uploadToOSS:function(t){return new r.a(function(e,a){var i=new FormData;i.append("fileToUpload",t);var n=new XMLHttpRequest;n.open("POST","http://hly.1000da.com.cn/OSSFile/PostToOSS"),n.send(i),n.onreadystatechange=function(){if(4==n.readyState&&200==n.status&&n.responseText){var t=n.responseText;e(JSON.parse(t))}}})},upLoadImage:function(){var t=this;this.photographSubmit().then(function(e){t.addDialog&&(t.addOptions.data.HeadImage=e),t.updateDialog&&(t.updateObj.HeadImage=e),t.showHeadPortrait=!1},function(e){t.$notify({message:e,type:"error"})})},changeNav:function(t){this.navIndex=t,0==t&&(this.initHotelStaffAdmin(),this.initAllAdmin()),1==t&&(this.initData(),this.initHotelRole())},blurPhone:function(){this.phone&&!Object(l["f"])(this.phone)&&(this.$notify({type:"error",message:"您输入的手机号格式有误"}),this.phone=""),this.accountNumber&&!Object(l["f"])(this.accountNumber)&&(this.$notify({type:"error",message:"您输入的账号格式有误"}),this.accountNumber=""),this.addOptions.data.Phone&&!Object(l["f"])(this.addOptions.data.Phone)&&(this.$notify({type:"error",message:"您输入的手机号格式有误"}),this.addOptions.data.Phone=""),this.addOptions.data.UserName&&!Object(l["f"])(this.addOptions.data.UserName)&&(this.$notify({type:"error",message:"您输入的账号格式有误"}),this.addOptions.data.UserName=""),this.updateObj.UserName&&!Object(l["f"])(this.updateObj.UserName)&&(this.$notify({type:"error",message:"您输入的账号格式有误"}),this.updateObj.UserName=""),this.updateObj.Phone&&!Object(l["f"])(this.updateObj.Phone)&&(this.$notify({type:"error",message:"您输入的手机号格式有误"}),this.updateObj.Phone="")},initHotelRole:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",CompanyId:this.hotelId,SysID:0,State:0};this.isLoading=!0,this.$store.dispatch("initHotelRole",e).then(function(e){t.roleList=e,t.isLoading=!1},function(e){t.$notify({message:e,type:"error"}),t.isLoading=!1})},handleCurrentChange:function(t){this.pageNum=t,this.initData()},initData:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",page:this.pageNum,rows:"5",CompanyID:this.hotelId,UserName:this.accountNumber,Phone:this.phone,RoleID:this.roleType};for(var a in this.isLoading=!0,e)e[a]=e[a].toString().trim();this.$store.dispatch("initHotelStaffAdmin",e).then(function(e){t.total=Number(e.totalRows);for(var a=e.data,i=0;i<a.length;i++){a[i].roleStr="";for(var n=0;n<a[i].roleList.length;n++)a[i].roleStr+=a[i].roleList[n].roleName+" "}t.staffList=a,t.isLoading=!1},function(e){t.$notify({message:e,type:"error"}),t.isLoading=!1})},search:function(){this.pageNum=1,this.initData()},Add:function(){for(var t in this.addOptions.roleData="",this.addRoleList=[],this.addOptions.data)"SysType"!=this.addOptions.data[t]&&(this.addOptions.data[t]="");this.addOptions.data.SysType=0,this.addDialog=!0},addSubmit:function(){var t=this;Object(l["f"])(this.addOptions.data.UserName)&&Object(l["f"])(this.addOptions.data.Phone)?!this.addOptions.data.Email||Object(l["e"])(this.addOptions.data.Email)?this.addRoleList.length?(this.addOptions.roleData=this.addRoleList.join(","),this.addOptions.data.CompanyID=this.hotelId,this.isLoading=!0,this.$store.dispatch("addHotelStaffAdmin",this.addOptions).then(function(e){t.$notify({message:e,type:"success"}),t.addDialog=!1,t.initData()},function(e){t.$notify({message:e,type:"error"}),t.isLoading=!1})):this.$notify({message:"选择角色权限！",type:"error"}):this.$notify({message:"输入正确的邮箱！",type:"error"}):this.$notify({message:"账号或手机号输入格式错误！",type:"error"})},Update:function(t){this.updateRoleList=[],this.updateObj=t;for(var e=0;e<t.roleList.length;e++)this.updateRoleList.push(t.roleList[e].roleID);this.updateDialog=!0},updateSubmit:function(){var t=this;if(Object(l["f"])(this.updateObj.UserName)&&Object(l["f"])(this.updateObj.Phone))if(!this.updateObj.Email||Object(l["e"])(this.updateObj.Email))if(this.updateRoleList.length){var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",roleData:this.updateRoleList.join(","),data:this.updateObj};this.isLoading=!0,this.$store.dispatch("updateHotelStaffAdmin",e).then(function(e){t.$notify({message:e,type:"success"}),t.updateDialog=!1,t.initData()},function(e){t.$notify({message:e,type:"error"}),t.isLoading=!1})}else this.$notify({message:"选择角色权限！",type:"error"});else this.$notify({message:"输入正确的邮箱！",type:"error"});else this.$notify({message:"账号或手机号输入格式错误！",type:"error"})},updatePassword:function(t){this.newPassword="",this.id=t,this.updatePasswordDialog=!0},updatePasswordSub:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",Id:this.id,PassWord:this.newPassword};this.isLoading=!0,this.$store.dispatch("updateHotelStaffAdminPassword",e).then(function(e){t.$notify({message:e,type:"success"}),t.updatePasswordDialog=!1,t.initData()},function(e){t.$notify({message:e,type:"error"}),t.isLoading=!1})},initAllAdmin:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:""};this.$store.dispatch("initAllAdmin",e).then(function(e){t.allAdminList=e},function(e){t.$notify({message:e,type:"error"})}).catch(function(e){t.$notify({message:e,type:"error"})})},initHotelStaffAdmin:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",CompanyId:this.hotelId,SysID:0,State:this.roleState};this.$store.commit("showLoading"),this.$store.dispatch("initHotelRole",e).then(function(e){t.roleAdminList=e,t.$store.commit("hideLoading")},function(e){t.$notify({message:e,type:"error"}),t.$store.commit("hideLoading")}).catch(function(e){t.$notify({message:e,type:"error"}),t.$store.commit("hideLoading")})},searchAdmin:function(){this.initHotelStaffAdmin()},addAdmin:function(){for(var t in this.addAdminOptions)this.addAdminOptions[t]="";this.addTypeDialog=!0},addAdminSubmit:function(){var t=this;this.addAdminOptions.SysID=0,this.addAdminOptions.CompanyId=this.hotelId;var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addAdminOptions};this.$store.commit("showLoading"),this.$store.dispatch("addHotelAdminOptions",e).then(function(e){t.$notify({message:e,type:"success"}),t.addTypeDialog=!1,t.initHotelStaffAdmin()},function(e){t.$notify({message:e,type:"error"}),t.$store.commit("hideLoading")}).catch(function(e){t.$notify({message:e,type:"error"}),t.$store.commit("hideLoading")})},updateAdmin:function(t){this.updateTypeObj=Object(l["a"])(t),this.updateTypeDialog=!0},updateAdminSubmit:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.updateTypeObj};this.$store.commit("showLoading"),this.$store.dispatch("updateHotelAdminOptions",e).then(function(e){t.$notify({message:e,type:"success"}),t.updateTypeDialog=!1,t.initHotelStaffAdmin()},function(e){t.$notify({message:e,type:"error"}),t.$store.commit("hideLoading")}).catch(function(e){t.$notify({message:e,type:"error"}),t.$store.commit("hideLoading")})}}},u=d,c=a("2877"),f=Object(c["a"])(u,i,n,!1,null,"8a9a87ba",null);e["default"]=f.exports},"34ef":function(t,e,a){a("ec30")("Uint8",1,function(t){return function(e,a,i){return t(this,e,a,i)}})},"36bd":function(t,e,a){"use strict";var i=a("4bf8"),n=a("77f1"),o=a("9def");t.exports=function(t){var e=i(this),a=o(e.length),r=arguments.length,s=n(r>1?arguments[1]:void 0,a),l=r>2?arguments[2]:void 0,d=void 0===l?a:n(l,a);while(d>s)e[s++]=t;return e}},"7f7f":function(t,e,a){var i=a("86cc").f,n=Function.prototype,o=/^\s*function ([^ (]*)/,r="name";r in n||a("9e1e")&&i(n,r,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},ba92:function(t,e,a){"use strict";var i=a("4bf8"),n=a("77f1"),o=a("9def");t.exports=[].copyWithin||function(t,e){var a=i(this),r=o(a.length),s=n(t,r),l=n(e,r),d=arguments.length>2?arguments[2]:void 0,u=Math.min((void 0===d?r:n(d,r))-l,r-s),c=1;l<s&&s<l+u&&(c=-1,l+=u-1,s+=u-1);while(u-- >0)l in a?a[s]=a[l]:delete a[s],s+=c,l+=c;return a}},cd1c:function(t,e,a){var i=a("e853");t.exports=function(t,e){return new(i(t))(e)}},e853:function(t,e,a){var i=a("d3f4"),n=a("1169"),o=a("2b4c")("species");t.exports=function(t){var e;return n(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!n(e.prototype)||(e=void 0),i(e)&&(e=e[o],null===e&&(e=void 0))),void 0===e?Array:e}},ec30:function(t,e,a){"use strict";if(a("9e1e")){var i=a("2d00"),n=a("7726"),o=a("79e5"),r=a("5ca1"),s=a("0f88"),l=a("ed0b"),d=a("9b43"),u=a("f605"),c=a("4630"),f=a("32e9"),p=a("dcbc"),h=a("4588"),m=a("9def"),b=a("09fa"),g=a("77f1"),v=a("6a99"),y=a("69a8"),w=a("23c6"),O=a("d3f4"),S=a("4bf8"),L=a("33a4"),I=a("2aeb"),N=a("38fd"),U=a("9093").f,k=a("27ee"),D=a("ca5a"),A=a("2b4c"),P=a("0a49"),x=a("c366"),_=a("ebd6"),$=a("cadf"),j=a("84f2"),T=a("5cc5"),R=a("7a56"),E=a("36bd"),C=a("ba92"),H=a("86cc"),W=a("11e9"),z=H.f,M=W.f,F=n.RangeError,B=n.TypeError,V=n.Uint8Array,G="ArrayBuffer",Y="Shared"+G,J="BYTES_PER_ELEMENT",q="prototype",X=Array[q],K=l.ArrayBuffer,Q=l.DataView,Z=P(0),tt=P(2),et=P(3),at=P(4),it=P(5),nt=P(6),ot=x(!0),rt=x(!1),st=$.values,lt=$.keys,dt=$.entries,ut=X.lastIndexOf,ct=X.reduce,ft=X.reduceRight,pt=X.join,ht=X.sort,mt=X.slice,bt=X.toString,gt=X.toLocaleString,vt=A("iterator"),yt=A("toStringTag"),wt=D("typed_constructor"),Ot=D("def_constructor"),St=s.CONSTR,Lt=s.TYPED,It=s.VIEW,Nt="Wrong length!",Ut=P(1,function(t,e){return xt(_(t,t[Ot]),e)}),kt=o(function(){return 1===new V(new Uint16Array([1]).buffer)[0]}),Dt=!!V&&!!V[q].set&&o(function(){new V(1).set({})}),At=function(t,e){var a=h(t);if(a<0||a%e)throw F("Wrong offset!");return a},Pt=function(t){if(O(t)&&Lt in t)return t;throw B(t+" is not a typed array!")},xt=function(t,e){if(!(O(t)&&wt in t))throw B("It is not a typed array constructor!");return new t(e)},_t=function(t,e){return $t(_(t,t[Ot]),e)},$t=function(t,e){var a=0,i=e.length,n=xt(t,i);while(i>a)n[a]=e[a++];return n},jt=function(t,e,a){z(t,e,{get:function(){return this._d[a]}})},Tt=function(t){var e,a,i,n,o,r,s=S(t),l=arguments.length,u=l>1?arguments[1]:void 0,c=void 0!==u,f=k(s);if(void 0!=f&&!L(f)){for(r=f.call(s),i=[],e=0;!(o=r.next()).done;e++)i.push(o.value);s=i}for(c&&l>2&&(u=d(u,arguments[2],2)),e=0,a=m(s.length),n=xt(this,a);a>e;e++)n[e]=c?u(s[e],e):s[e];return n},Rt=function(){var t=0,e=arguments.length,a=xt(this,e);while(e>t)a[t]=arguments[t++];return a},Et=!!V&&o(function(){gt.call(new V(1))}),Ct=function(){return gt.apply(Et?mt.call(Pt(this)):Pt(this),arguments)},Ht={copyWithin:function(t,e){return C.call(Pt(this),t,e,arguments.length>2?arguments[2]:void 0)},every:function(t){return at(Pt(this),t,arguments.length>1?arguments[1]:void 0)},fill:function(t){return E.apply(Pt(this),arguments)},filter:function(t){return _t(this,tt(Pt(this),t,arguments.length>1?arguments[1]:void 0))},find:function(t){return it(Pt(this),t,arguments.length>1?arguments[1]:void 0)},findIndex:function(t){return nt(Pt(this),t,arguments.length>1?arguments[1]:void 0)},forEach:function(t){Z(Pt(this),t,arguments.length>1?arguments[1]:void 0)},indexOf:function(t){return rt(Pt(this),t,arguments.length>1?arguments[1]:void 0)},includes:function(t){return ot(Pt(this),t,arguments.length>1?arguments[1]:void 0)},join:function(t){return pt.apply(Pt(this),arguments)},lastIndexOf:function(t){return ut.apply(Pt(this),arguments)},map:function(t){return Ut(Pt(this),t,arguments.length>1?arguments[1]:void 0)},reduce:function(t){return ct.apply(Pt(this),arguments)},reduceRight:function(t){return ft.apply(Pt(this),arguments)},reverse:function(){var t,e=this,a=Pt(e).length,i=Math.floor(a/2),n=0;while(n<i)t=e[n],e[n++]=e[--a],e[a]=t;return e},some:function(t){return et(Pt(this),t,arguments.length>1?arguments[1]:void 0)},sort:function(t){return ht.call(Pt(this),t)},subarray:function(t,e){var a=Pt(this),i=a.length,n=g(t,i);return new(_(a,a[Ot]))(a.buffer,a.byteOffset+n*a.BYTES_PER_ELEMENT,m((void 0===e?i:g(e,i))-n))}},Wt=function(t,e){return _t(this,mt.call(Pt(this),t,e))},zt=function(t){Pt(this);var e=At(arguments[1],1),a=this.length,i=S(t),n=m(i.length),o=0;if(n+e>a)throw F(Nt);while(o<n)this[e+o]=i[o++]},Mt={entries:function(){return dt.call(Pt(this))},keys:function(){return lt.call(Pt(this))},values:function(){return st.call(Pt(this))}},Ft=function(t,e){return O(t)&&t[Lt]&&"symbol"!=typeof e&&e in t&&String(+e)==String(e)},Bt=function(t,e){return Ft(t,e=v(e,!0))?c(2,t[e]):M(t,e)},Vt=function(t,e,a){return!(Ft(t,e=v(e,!0))&&O(a)&&y(a,"value"))||y(a,"get")||y(a,"set")||a.configurable||y(a,"writable")&&!a.writable||y(a,"enumerable")&&!a.enumerable?z(t,e,a):(t[e]=a.value,t)};St||(W.f=Bt,H.f=Vt),r(r.S+r.F*!St,"Object",{getOwnPropertyDescriptor:Bt,defineProperty:Vt}),o(function(){bt.call({})})&&(bt=gt=function(){return pt.call(this)});var Gt=p({},Ht);p(Gt,Mt),f(Gt,vt,Mt.values),p(Gt,{slice:Wt,set:zt,constructor:function(){},toString:bt,toLocaleString:Ct}),jt(Gt,"buffer","b"),jt(Gt,"byteOffset","o"),jt(Gt,"byteLength","l"),jt(Gt,"length","e"),z(Gt,yt,{get:function(){return this[Lt]}}),t.exports=function(t,e,a,l){l=!!l;var d=t+(l?"Clamped":"")+"Array",c="get"+t,p="set"+t,h=n[d],g=h||{},v=h&&N(h),y=!h||!s.ABV,S={},L=h&&h[q],k=function(t,a){var i=t._d;return i.v[c](a*e+i.o,kt)},D=function(t,a,i){var n=t._d;l&&(i=(i=Math.round(i))<0?0:i>255?255:255&i),n.v[p](a*e+n.o,i,kt)},A=function(t,e){z(t,e,{get:function(){return k(this,e)},set:function(t){return D(this,e,t)},enumerable:!0})};y?(h=a(function(t,a,i,n){u(t,h,d,"_d");var o,r,s,l,c=0,p=0;if(O(a)){if(!(a instanceof K||(l=w(a))==G||l==Y))return Lt in a?$t(h,a):Tt.call(h,a);o=a,p=At(i,e);var g=a.byteLength;if(void 0===n){if(g%e)throw F(Nt);if(r=g-p,r<0)throw F(Nt)}else if(r=m(n)*e,r+p>g)throw F(Nt);s=r/e}else s=b(a),r=s*e,o=new K(r);f(t,"_d",{b:o,o:p,l:r,e:s,v:new Q(o)});while(c<s)A(t,c++)}),L=h[q]=I(Gt),f(L,"constructor",h)):o(function(){h(1)})&&o(function(){new h(-1)})&&T(function(t){new h,new h(null),new h(1.5),new h(t)},!0)||(h=a(function(t,a,i,n){var o;return u(t,h,d),O(a)?a instanceof K||(o=w(a))==G||o==Y?void 0!==n?new g(a,At(i,e),n):void 0!==i?new g(a,At(i,e)):new g(a):Lt in a?$t(h,a):Tt.call(h,a):new g(b(a))}),Z(v!==Function.prototype?U(g).concat(U(v)):U(g),function(t){t in h||f(h,t,g[t])}),h[q]=L,i||(L.constructor=h));var P=L[vt],x=!!P&&("values"==P.name||void 0==P.name),_=Mt.values;f(h,wt,!0),f(L,Lt,d),f(L,It,!0),f(L,Ot,h),(l?new h(1)[yt]==d:yt in L)||z(L,yt,{get:function(){return d}}),S[d]=h,r(r.G+r.W+r.F*(h!=g),S),r(r.S,d,{BYTES_PER_ELEMENT:e}),r(r.S+r.F*o(function(){g.of.call(h,1)}),d,{from:Tt,of:Rt}),J in L||f(L,J,e),r(r.P,d,Ht),R(d),r(r.P+r.F*Dt,d,{set:zt}),r(r.P+r.F*!x,d,Mt),i||L.toString==bt||(L.toString=bt),r(r.P+r.F*o(function(){new h(1).slice()}),d,{slice:Wt}),r(r.P+r.F*(o(function(){return[1,2].toLocaleString()!=new h([1,2]).toLocaleString()})||!o(function(){L.toLocaleString.call([1,2])})),d,{toLocaleString:Ct}),j[d]=x?P:_,i||x||f(L,vt,_)}}else t.exports=function(){}},ed0b:function(t,e,a){"use strict";var i=a("7726"),n=a("9e1e"),o=a("2d00"),r=a("0f88"),s=a("32e9"),l=a("dcbc"),d=a("79e5"),u=a("f605"),c=a("4588"),f=a("9def"),p=a("09fa"),h=a("9093").f,m=a("86cc").f,b=a("36bd"),g=a("7f20"),v="ArrayBuffer",y="DataView",w="prototype",O="Wrong length!",S="Wrong index!",L=i[v],I=i[y],N=i.Math,U=i.RangeError,k=i.Infinity,D=L,A=N.abs,P=N.pow,x=N.floor,_=N.log,$=N.LN2,j="buffer",T="byteLength",R="byteOffset",E=n?"_b":j,C=n?"_l":T,H=n?"_o":R;function W(t,e,a){var i,n,o,r=new Array(a),s=8*a-e-1,l=(1<<s)-1,d=l>>1,u=23===e?P(2,-24)-P(2,-77):0,c=0,f=t<0||0===t&&1/t<0?1:0;for(t=A(t),t!=t||t===k?(n=t!=t?1:0,i=l):(i=x(_(t)/$),t*(o=P(2,-i))<1&&(i--,o*=2),t+=i+d>=1?u/o:u*P(2,1-d),t*o>=2&&(i++,o/=2),i+d>=l?(n=0,i=l):i+d>=1?(n=(t*o-1)*P(2,e),i+=d):(n=t*P(2,d-1)*P(2,e),i=0));e>=8;r[c++]=255&n,n/=256,e-=8);for(i=i<<e|n,s+=e;s>0;r[c++]=255&i,i/=256,s-=8);return r[--c]|=128*f,r}function z(t,e,a){var i,n=8*a-e-1,o=(1<<n)-1,r=o>>1,s=n-7,l=a-1,d=t[l--],u=127&d;for(d>>=7;s>0;u=256*u+t[l],l--,s-=8);for(i=u&(1<<-s)-1,u>>=-s,s+=e;s>0;i=256*i+t[l],l--,s-=8);if(0===u)u=1-r;else{if(u===o)return i?NaN:d?-k:k;i+=P(2,e),u-=r}return(d?-1:1)*i*P(2,u-e)}function M(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]}function F(t){return[255&t]}function B(t){return[255&t,t>>8&255]}function V(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]}function G(t){return W(t,52,8)}function Y(t){return W(t,23,4)}function J(t,e,a){m(t[w],e,{get:function(){return this[a]}})}function q(t,e,a,i){var n=+a,o=p(n);if(o+e>t[C])throw U(S);var r=t[E]._b,s=o+t[H],l=r.slice(s,s+e);return i?l:l.reverse()}function X(t,e,a,i,n,o){var r=+a,s=p(r);if(s+e>t[C])throw U(S);for(var l=t[E]._b,d=s+t[H],u=i(+n),c=0;c<e;c++)l[d+c]=u[o?c:e-c-1]}if(r.ABV){if(!d(function(){L(1)})||!d(function(){new L(-1)})||d(function(){return new L,new L(1.5),new L(NaN),L.name!=v})){L=function(t){return u(this,L),new D(p(t))};for(var K,Q=L[w]=D[w],Z=h(D),tt=0;Z.length>tt;)(K=Z[tt++])in L||s(L,K,D[K]);o||(Q.constructor=L)}var et=new I(new L(2)),at=I[w].setInt8;et.setInt8(0,2147483648),et.setInt8(1,2147483649),!et.getInt8(0)&&et.getInt8(1)||l(I[w],{setInt8:function(t,e){at.call(this,t,e<<24>>24)},setUint8:function(t,e){at.call(this,t,e<<24>>24)}},!0)}else L=function(t){u(this,L,v);var e=p(t);this._b=b.call(new Array(e),0),this[C]=e},I=function(t,e,a){u(this,I,y),u(t,L,y);var i=t[C],n=c(e);if(n<0||n>i)throw U("Wrong offset!");if(a=void 0===a?i-n:f(a),n+a>i)throw U(O);this[E]=t,this[H]=n,this[C]=a},n&&(J(L,T,"_l"),J(I,j,"_b"),J(I,T,"_l"),J(I,R,"_o")),l(I[w],{getInt8:function(t){return q(this,1,t)[0]<<24>>24},getUint8:function(t){return q(this,1,t)[0]},getInt16:function(t){var e=q(this,2,t,arguments[1]);return(e[1]<<8|e[0])<<16>>16},getUint16:function(t){var e=q(this,2,t,arguments[1]);return e[1]<<8|e[0]},getInt32:function(t){return M(q(this,4,t,arguments[1]))},getUint32:function(t){return M(q(this,4,t,arguments[1]))>>>0},getFloat32:function(t){return z(q(this,4,t,arguments[1]),23,4)},getFloat64:function(t){return z(q(this,8,t,arguments[1]),52,8)},setInt8:function(t,e){X(this,1,t,F,e)},setUint8:function(t,e){X(this,1,t,F,e)},setInt16:function(t,e){X(this,2,t,B,e,arguments[2])},setUint16:function(t,e){X(this,2,t,B,e,arguments[2])},setInt32:function(t,e){X(this,4,t,V,e,arguments[2])},setUint32:function(t,e){X(this,4,t,V,e,arguments[2])},setFloat32:function(t,e){X(this,4,t,Y,e,arguments[2])},setFloat64:function(t,e){X(this,8,t,G,e,arguments[2])}});g(L,v),g(I,y),s(I[w],r.VIEW,!0),e[v]=L,e[y]=I}}]);