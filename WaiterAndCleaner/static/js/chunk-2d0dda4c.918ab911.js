(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0dda4c"],{"81eb":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("h1",{staticClass:"wrapTitle"},[t._v("OTA管理")]),o("el-col",{staticClass:"formSearch clearfix",attrs:{span:24}},[o("el-form",{attrs:{inline:!0}},[o("el-form-item",{staticStyle:{float:"right"}},[o("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.Add}},[t._v("新增")])],1)],1)],1),o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.HotelOTAList,border:""}},[o("el-table-column",{attrs:{label:"OTA名称",width:"200",prop:"ht_oe_otaName"}}),o("el-table-column",{attrs:{label:"是否启用",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(o){t.changeIsOpen(e.row)}},model:{value:e.row.ht_oe_isOpen,callback:function(o){t.$set(e.row,"ht_oe_isOpen",o)},expression:"scope.row.ht_oe_isOpen"}})]}}])}),o("el-table-column",{attrs:{width:"140",label:"是否自动确认订单"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(o){t.changeAutoCommand(e.row)}},model:{value:e.row.ht_oe_autoCommand,callback:function(o){t.$set(e.row,"ht_oe_autoCommand",o)},expression:"scope.row.ht_oe_autoCommand"}})]}}])}),o("el-table-column",{attrs:{label:"每日可订房次数"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isUpdate?[o("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:e.row.ht_oe_daySell,size:"small"},model:{value:e.row.ht_oe_daySell,callback:function(o){t.$set(e.row,"ht_oe_daySell",o)},expression:"scope.row.ht_oe_daySell"}}),o("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"warning",size:"small"},on:{click:function(o){t.cancel(e.row)}}},[t._v("取消")])]:o("span",[t._v(t._s(e.row.ht_oe_daySell))])]}}])}),o("el-table-column",{attrs:{align:"center",width:"200",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isUpdate?o("el-button",{attrs:{type:"success",icon:"el-icon-check",size:"small"},on:{click:function(o){t.UpdateOK(e.row)}}},[t._v("OK")]):o("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(o){o.stopPropagation(),t.Update(e.row)}}},[t._v("修改")])]}}])})],1),o("el-dialog",{attrs:{title:"新增OTA","modal-append-to-body":!1,visible:t.addDialog,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(e){t.addDialog=e}}},[o("el-form",{attrs:{model:t.addOptions,"label-width":"120px"}},[o("el-form-item",{attrs:{label:"OTA类型:"}},[o("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:t.addOptions.data.ht_oe_otaType,callback:function(e){t.$set(t.addOptions.data,"ht_oe_otaType",e)},expression:"addOptions.data.ht_oe_otaType"}},t._l(t.SysEnumOTAList,function(t){return o("el-option",{key:t.otaID,attrs:{label:t.otaName,value:t.otaID}})}),1)],1),o("el-form-item",{attrs:{label:"直连房间数:"}},[o("el-input",{staticStyle:{width:"500px"},attrs:{placeholder:"请输入"},model:{value:t.addOptions.data.ht_oe_daySell,callback:function(e){t.$set(t.addOptions.data,"ht_oe_daySell",e)},expression:"addOptions.data.ht_oe_daySell"}})],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1)],1)},i=[],n=(o("c5f6"),o("cadf"),o("551c"),o("097d"),o("5880")),s=o("466f"),l={computed:Object(n["mapGetters"])([]),data:function(){return{addDialog:!1,SysEnumOTAList:[],addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ht_oe_hotelID:"",ht_oe_daySell:"",ht_oe_autoCommand:"",ht_oe_otaType:""}},isLoading:!1,options:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",page:"1",rows:"20",ht_oe_ID:"",ht_oe_hotelID:"",ht_oe_isOpen:"",ht_oe_autoCommand:""},HotelOTAList:[],hotelID:"",page:1,oneObj:{}}},created:function(){var t=this,e=sessionStorage.getItem("hotelID");e&&(this.hotelID=e,this.options.ht_oe_hotelID=e,this.addOptions.ht_oe_hotelID=e),this.initSysEnumOTA().then(function(e){t.SysEnumOTAList=e,t.initData()},function(e){t.$notify({type:"error",message:e})})},methods:{addSubmit:function(){var t=this;this.addOptions.data.ht_oe_otaType?isNaN(this.addOptions.data.ht_oe_daySell)?this.$notify({type:"error",message:"请选择输入数字"}):this.$store.dispatch("AddOTAAdmin",this.addOptions).then(function(e){t.$notify({type:"success",message:e}),t.addDialog=!1,t.initData(t.page)},function(e){t.addDialog=!1,t.$notify({type:"error",message:e})}):this.$notify({type:"error",message:"请选择OTA类型"})},UpdateOK:function(t){var e=Number(t.ht_oe_isOpen),o=Number(t.ht_oe_autoCommand),a=Object(s["a"])(t);a.ht_oe_isOpen=e,a.ht_oe_autoCommand=o,this.UpdateSubmit(a)},cancel:function(t){t.ht_oe_daySell=this.oneObj.ht_oe_daySell,t.isUpdate=!1},Update:function(t){this.oneObj=Object(s["a"])(t),t.isUpdate=!0},changeAutoCommand:function(t){var e=Number(t.ht_oe_isOpen),o=Number(t.ht_oe_autoCommand),a=Object(s["a"])(t);a.ht_oe_isOpen=e,a.ht_oe_autoCommand=o,this.UpdateSubmit(a)},changeIsOpen:function(t){var e=Number(t.ht_oe_isOpen),o=Number(t.ht_oe_autoCommand),a=Object(s["a"])(t);a.ht_oe_isOpen=e,a.ht_oe_autoCommand=o,this.UpdateSubmit(a)},UpdateSubmit:function(t){var e=this,o={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ht_oe_ID:t.ht_oe_ID,ht_oe_otaName:t.ht_oe_otaName,ht_oe_daySell:t.ht_oe_daySell,ht_oe_isOpen:t.ht_oe_isOpen,ht_oe_autoCommand:t.ht_oe_autoCommand,ht_oe_otaType:t.ht_oe_otaType}};this.$store.dispatch("UpdateOTAAdmin",o).then(function(t){e.$notify({type:"success",message:t}),e.initData(e.page)},function(t){e.$notify({type:"error",message:t})})},initData:function(t){var e=this;t&&(this.options.page=t),this.isLoading=!0,this.$store.dispatch("initHotelOTA",this.options).then(function(t){t=t.map(function(t){return t.ht_oe_isOpen?t.ht_oe_isOpen=!0:t.ht_oe_isOpen=!1,t.ht_oe_autoCommand?t.ht_oe_autoCommand=!0:t.ht_oe_autoCommand=!1,t.isUpdate=!1,t}),e.isLoading=!1,e.HotelOTAList=t},function(t){e.isLoading=!1,e.$notify({type:"error",message:t})})},Add:function(){this.addOptions={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ht_oe_hotelID:this.hotelID,ht_oe_daySell:"",ht_oe_autoCommand:0,ht_oe_otaType:""}},this.addDialog=!0},initSysEnumOTA:function(){var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",type:0};return this.$store.dispatch("initSysEnumOTA",t)},search:function(){}}},r=l,d=o("2877"),c=Object(d["a"])(r,a,i,!1,null,"713a4bc0",null);e["default"]=c.exports}}]);