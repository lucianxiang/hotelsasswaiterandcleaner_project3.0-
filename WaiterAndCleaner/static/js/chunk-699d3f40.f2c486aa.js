(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-699d3f40"],{"1ddb":function(e,t,r){"use strict";var o=r("7f41"),a=r.n(o);a.a},"5b22":function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"wrap"}},[r("div",{attrs:{id:"leftNav"}},[r("div",{staticClass:"headPortraitBox"},[r("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.userInfo.HeadImage?e.userInfo.HeadImage:"http://hly.1000da.com.cn/assets/images/timg.jpeg",expression:"userInfo.HeadImage?userInfo.HeadImage:'http://hly.1000da.com.cn/assets/images/timg.jpeg'"}],attrs:{alt:""}})]),r("div",{staticClass:"goHomePage"},[r("router-link",{attrs:{to:"/home"}},[e._v("返回首页")])],1),r("ul",{staticClass:"routerList"},e._l(e.routerNav,function(t,o){return r("li",{class:{active:o==e.routerIndex},on:{click:function(r){r.stopPropagation(),e.changeSectionRouter(t,o)}}},[r("a",{attrs:{href:"javascript:;"}},[e._v(e._s(t.label))]),r("i",{on:{click:function(r){r.stopPropagation(),e.closeListRouter(t,o)}}})])}),0)]),r("div",{attrs:{id:"rightContent"}},[r("header",[r("div",{staticClass:"headerOperation"},e._l(e.headerOperationList,function(t,o){return r("a",{class:[t.className,{active:o==e.routerNavIndex}],attrs:{href:"javascript:;"},on:{click:function(r){r.stopPropagation(),e.changeRouterNav(t,o)}}},[r("i"),r("strong",[e._v(e._s(t.label))])])}),0),r("div")]),r("section",[r("div",{attrs:{id:"sectionWrap"}},[r("router-view")],1)])])])},a=[],s=(r("7f7f"),r("f499")),i=r.n(s),n=(r("cadf"),r("551c"),r("097d"),r("5880")),u=(r("d046"),{computed:Object(n["mapGetters"])([]),data:function(){return{headerOperationList:[{className:"reportForm",label:"报表",routerName:"HotelReportForm",index:0},{className:"hotelStaff",label:"员工",routerName:"HotelStaffAdmin",index:1},{className:"hotelComplaint",label:"投诉",routerName:"HotelComplaint",index:2},{className:"hotelVIP",label:"会员",routerName:"HotelMemberVIP",index:3},{className:"hotelRoom",label:"房间",routerName:"HotelRoomAdmin",index:4},{className:"cooperativeEnterprise",label:"合作企业",routerName:"HotelCooperativeEnterprise",index:5},{className:"otaAdmin",label:"OTA管理",routerName:"OTAAdmin",index:6}],routerNavIndex:0,routerNav:[],routerIndex:0,userInfo:{},routerObj:{}}},watch:{$route:function(e,t){sessionStorage.setItem("router",i()({name:e.name,params:e.params,query:e.query}))}},created:function(){sessionStorage.getItem("router")&&(this.routerObj=JSON.parse(sessionStorage.getItem("router"))),this.initRouter(),sessionStorage.getItem("userInfo")?this.userInfo=JSON.parse(sessionStorage.getItem("userInfo")):this.$router.push({name:"Login"})},methods:{initRouter:function(){var e=this;if("HotelBackstageHome"==this.$route.name)this.routerNav.push(this.headerOperationList[0]),this.$router.push({name:this.routerNav[0].routerName});else{var t=this.headerOperationList.filter(function(t){return t.routerName==e.$route.name})[0];t?this.routerNav.push(t):(this.$router.push({name:this.routerObj.name,params:this.routerObj.params,query:this.routerObj.query}),this.routerNav.push({className:"hotelRoom",label:"房间",routerName:"HotelRoomAdmin",index:4}))}for(var r=0;r<this.headerOperationList.length;r++)if(this.headerOperationList[r].routerName==this.routerNav[0].routerName){this.routerNavIndex=r;break}},closeListRouter:function(e,t){if(this.routerNav=this.routerNav.filter(function(t){return t.routerName!=e.routerName}),this.routerNav.length||this.routerNav.push(this.headerOperationList[0]),e.routerName==this.$route.name){this.$router.push({name:this.routerNav[this.routerNav.length-1].routerName}),this.routerIndex=this.routerNav.length-1;for(var r=0;r<this.routerNav.length;r++)if(this.routerNav[r].routerName==this.routerNav[this.routerNav.length-1].routerName)return this.routerIndex=r,void(this.routerNavIndex=this.routerNav[r].index)}else t<this.routerIndex&&this.routerIndex--,t==this.routerIndex&&(this.routerIndex=this.routerNav.length-1),this.routerNavIndex=this.routerNav[this.routerIndex].index,this.$router.push({name:this.routerNav[this.routerIndex].routerName})},changeSectionRouter:function(e,t){this.routerNavIndex=e.index,this.routerIndex=t,this.$router.push({name:e.routerName})},changeRouterNav:function(e,t){this.routerNavIndex=t;for(var r=0;r<this.routerNav.length;r++)if(this.routerNav[r].routerName==e.routerName)return this.routerIndex=r,void this.$router.push({name:e.routerName});this.routerNav.push(e),this.routerIndex=this.routerNav.length-1,this.$router.push({name:e.routerName})},initData:function(){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",token:this.userInfo.token,sm_ai_AgentInfoID:this.userInfo.CompanyID};this.$store.dispatch("initHotelInfomation",t).then(function(){},function(t){e.$notify({message:t,type:"error"})})}},mounted:function(){}}),h=u,m=(r("1ddb"),r("2877")),l=Object(m["a"])(h,o,a,!1,null,"fe6cf5e6",null);t["default"]=l.exports},"7f41":function(e,t,r){},"7f7f":function(e,t,r){var o=r("86cc").f,a=Function.prototype,s=/^\s*function ([^ (]*)/,i="name";i in a||r("9e1e")&&o(a,i,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(e){return""}}})}}]);