(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9c65af96"],{"3d75":function(e,t,a){"use strict";var o=a("68d2"),n=a.n(o);n.a},"68d2":function(e,t,a){},ab1e:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",{staticClass:"wrapTitle"},[e._v("酒店会员报表")]),a("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":e.vipNavIndex,mode:"horizontal"},on:{select:e.changeNav}},e._l(e.vipNavigation,function(t,o){return a("el-menu-item",{key:o,attrs:{index:t.value}},[e._v(e._s(t.label))])}),1),a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.vipNavIndex,expression:"vipNavIndex == 0"}],staticClass:"consumptionForm"},[a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[e._v("筛选:")])]),a("el-form-item",[a("el-input",{attrs:{size:"small",placeholder:"输入卡号"},model:{value:e.cardNum,callback:function(t){e.cardNum=t},expression:"cardNum"}})],1),a("el-form-item",[a("el-date-picker",{attrs:{size:"small","value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},on:{change:e.changeConDate},model:{value:e.conDate,callback:function(t){e.conDate=t},expression:"conDate"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.search}},[e._v("查询")])],1)],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.consumptionList,border:"","summary-method":e.getAllMoney,"show-summary":""}},[a("el-table-column",{attrs:{width:"150",align:"center",prop:"ht_mi_Name",label:"姓名"}}),a("el-table-column",{attrs:{prop:"ht_mi_CardNo",align:"center",label:"会员卡号"}}),a("el-table-column",{attrs:{prop:"UserName",align:"center",label:"操作员账号"}}),a("el-table-column",{attrs:{prop:"ht_cd_CostFee",align:"center",label:"消费金额(￥)"}}),a("el-table-column",{attrs:{prop:"ht_cd_RoomID",align:"center",label:"房间编号"}})],1),a("div",{staticClass:"block",staticStyle:{"text-taign":"right"}},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.conTotal,expression:"conTotal"}],attrs:{"page-size":10,layout:"total, prev, pager, next",total:e.conTotal},on:{"current-change":e.changePage}})],1)],1),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.vipNavIndex,expression:"vipNavIndex == 1"}],staticClass:"consumptionForm"},[a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[e._v("筛选:")])]),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:e.vipType,callback:function(t){e.vipType=t},expression:"vipType"}},e._l(e.cardTypeList,function(e){return a("el-option",{key:e.ht_ct_ID,attrs:{label:e.ht_ct_TypeName,value:e.ht_ct_ID}})}),1)],1),a("el-form-item",[a("el-date-picker",{attrs:{size:"small","value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},on:{change:e.changeInFeeDate},model:{value:e.inFeeDate,callback:function(t){e.inFeeDate=t},expression:"inFeeDate"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.searchInFee}},[e._v("查询")])],1)],1)],1),a("div",{staticClass:"cashierChart"},[a("p",[e._v("入住率: "+e._s(e.num)+"%")]),a("canvas",{attrs:{id:"canvas",width:"300",height:"300"}},[e._v("\n        您的浏览器不支持canvas\n      ")])]),a("strong",{staticClass:"cashierChartStrong"},[e._v(e._s(e.showTime))])],1)],1)},n=[],i=(a("ac6a"),a("c5f6"),a("bd86")),s=a("5880"),r=(a("466f"),{computed:Object(s["mapGetters"])([]),data:function(){var e;return e={vipNavigation:[{value:"0",label:"消费报表"},{value:"1",label:"会员入住率"}],vipNavIndex:"0",userInfo:{},consumptionFormDate:"",consumptionToDate:"",vipType:"",consumptionList:[],conTotal:0,cardTypeList:[],cardNum:"",conDate:"",num:0,showTime:"",rateFromDate:"",rateToDate:""},Object(i["a"])(e,"vipType",""),Object(i["a"])(e,"inFeeDate",""),e},created:function(){sessionStorage.getItem("userInfo")?this.userInfo=JSON.parse(sessionStorage.getItem("userInfo")):this.$router.push({name:"Login"}),this.initConsumptionForm()},methods:{changeNav:function(e){this.vipNavIndex=e,1==e&&(this.initVipCardType(),this.initVipRate()),0==e&&this.initConsumptionForm()},initVipCardType:function(e){var t=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",ht_ct_ID:"",ht_ct_HotelID:this.userInfo.CompanyID,ht_ct_TypeName:"",ht_ct_State:0,page:e||1,rows:10};this.$store.dispatch("searchVipCardTypeAction",a).then(function(e){t.cardTypeList=e.data},function(e){t.$notify({message:e,type:"error"})}).catch(function(e){t.$notify({message:e,type:"error"})})},changeConDate:function(e){e?(this.consumptionFormDate=e+" 00:00:00",this.consumptionToDate=e+" 23:59:59"):(this.consumptionFormDate="",this.consumptionToDate="")},initConsumptionForm:function(e){var t=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",dateFrom:this.consumptionFormDate,dateTo:this.consumptionToDate,memberID:"",memberCard:this.cardNum,hotelID:this.userInfo.CompanyID,page:e||1,rows:10};this.$store.commit("showLoading"),this.$store.dispatch("initConsumptionForm",a).then(function(e){t.conTotal=Number(e.totalRows),t.consumptionList=e.data,t.$store.commit("hideLoading")},function(e){t.$notify({message:e,type:"error"}),t.$store.commit("hideLoading")}).catch(function(e){t.$notify({message:e,type:"error"}),t.$store.commit("hideLoading")})},changePage:function(e){this.initConsumptionForm(e)},search:function(){this.initConsumptionForm()},getAllMoney:function(e){var t=e.columns,a=e.data,o=[];return t.forEach(function(e,t){if(0!==t){var n=a.map(function(t){return Number(t[e.property])});3===t?n.every(function(e){return isNaN(e)})||(o[t]=n.reduce(function(e,t){var a=Number(t);return isNaN(a)?e:e+t},0),o[t]+=" 元"):o[t]="N/A"}else o[t]="总额"}),o},initVipRate:function(){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",hotelID:this.userInfo.CompanyID,dateFrom:this.rateFromDate,dateTo:this.rateToDate,memberType:this.vipType};this.$store.commit("showLoading"),this.$store.dispatch("initVipRate",t).then(function(t){e.num=Math.floor(100*(t.memberCount/t.totalCount?t.memberCount/t.totalCount:0)),e.showTime=e.rateFromDate?e.rateFromDate+" ~ "+e.rateToDate:"所有时间",e.initCanvas(),e.$store.commit("hideLoading")},function(t){e.$notify({message:t,type:"error"}),e.$store.commit("hideLoading")}).catch(function(t){e.$notify({message:t,type:"error"}),e.$store.commit("hideLoading")})},initCanvas:function(){var e=document.getElementById("canvas"),t=e.getContext("2d");t.beginPath(),t.lineWidth=30,t.strokeStyle="#ccc",t.arc(150,150,120,0,2*Math.PI),t.stroke(),t.beginPath(),t.lineWidth=30,t.strokeStyle="#f00",t.arc(150,150,120,0,this.num/50*Math.PI),t.stroke()},changeInFeeDate:function(e){e?(this.rateFromDate=e+" 00:0:00",this.rateToDate=e+" 23:59:59"):(this.rateFromDate="",this.rateToDate="")},searchInFee:function(){this.initVipRate()}},mounted:function(){}}),c=r,l=(a("3d75"),a("2877")),m=Object(l["a"])(c,o,n,!1,null,"22799f6f",null);t["default"]=m.exports}}]);