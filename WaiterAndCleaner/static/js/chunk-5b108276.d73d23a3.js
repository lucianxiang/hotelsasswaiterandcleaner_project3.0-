(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b108276"],{"0346":function(e,t,o){},4193:function(e,t,o){"use strict";var s=o("0346"),n=o.n(s);n.a},a55b:function(e,t,o){"use strict";o.r(t);var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"container"},[o("div",{staticClass:"content"},[o("div",{staticClass:"contentImg"}),o("h1",[e._v("全域惠乐游酒店管理系统")]),o("div",{staticClass:"loginBox"}),o("ul",{staticClass:"loginInputBox"},[o("li",[o("div"),o("input",{directives:[{name:"model",rawName:"v-model",value:e.options.userCode,expression:"options.userCode"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:e.options.userCode},on:{input:function(t){t.target.composing||e.$set(e.options,"userCode",t.target.value)}}})]),o("li",[o("div"),o("input",{directives:[{name:"model",rawName:"v-model",value:e.options.passWord,expression:"options.passWord"}],attrs:{type:"password",placeholder:"请输入密码"},domProps:{value:e.options.passWord},on:{input:function(t){t.target.composing||e.$set(e.options,"passWord",t.target.value)}}})]),o("li",{on:{click:e.login}},[e._v("登录")])])])])])},n=[],a=o("f499"),i=o.n(a),r=(o("cadf"),o("551c"),o("097d"),o("5880")),l={name:"",data:function(){return{account:"",password:"",options:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",sysID:0,userCode:"",passWord:""}}},computed:Object(r["mapGetters"])([]),created:function(){},methods:{login:function(){var e=this,t=this.$loading({lock:!0,text:"拼命登录中...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});this.$store.dispatch("HotelLogin",this.options).then(function(o){t.close();for(var s=0;s<o.data.roleLlist.length;s++){if(0==o.data.roleLlist[s].localRoleID||3==o.data.roleLlist[s].localRoleID){e.$notify({type:"success",message:"登录成功"}),sessionStorage.setItem("userInfo",i()(o.data)),sessionStorage.setItem("hotelID",o.data.CompanyID),e.$router.push({name:"Home"});break}e.$notify({message:"您没有登录权限!!",type:"error"})}},function(o){t.close(),e.$notify({type:"err",message:o})})}},mounted:function(){var e=this;document.addEventListener("keydown",function(t){13==t.keyCode&&e.login()})}},c=l,d=(o("4193"),o("2877")),p=Object(d["a"])(c,s,n,!1,null,"5f36f367",null);t["default"]=p.exports}}]);