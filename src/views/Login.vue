<template>
  <div>
    <div class="container">
      <div class="content">
        <div class="contentImg"></div>
        <h1>全域惠乐游酒店管理系统</h1>
        <div class="loginBox">
        </div>
        <ul class="loginInputBox">
          <li>
            <div></div>
            <input v-model="options.userCode" type="text" placeholder="请输入手机号">
          </li>
          <li>
            <div></div>
            <input v-model="options.passWord" type="password" placeholder="请输入密码">
          </li>
          <!--<li>-->
          <!--<el-button type="primary"  style="width: 100%">登录</el-button>-->
          <!--</li>-->

          <li @click="login">登录</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        account: '',
        password: '',
        options: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sysID": 0,//系统编码(0酒店  1美食)
          //"companyID": 4,//店面或酒店ID
          "userCode": "",//账号13888888888
          "passWord": "",//密码
        }
      }
    },
    computed: mapGetters([]),
    created() {

    },
    methods: {
      login() {
        const loading = this.$loading({
          lock: true,
          text: '拼命登录中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$store.dispatch("HotelLogin", this.options)
          .then(data => {
            loading.close();
            for (let i = 0; i < data.data.roleLlist.length; i++) {
              if (data.data.roleLlist[i].localRoleID == 0 || data.data.roleLlist[i].localRoleID == 3) {
                this.$notify({
                  type: 'success',
                  message: '登录成功'
                });
                sessionStorage.setItem('userInfo', JSON.stringify(data.data));
                sessionStorage.setItem('hotelID', data.data.CompanyID);
                this.$router.push({name: 'Home'});
                break;
              } else {
                this.$notify({
                  message: '您没有登录权限!!',
                  type: 'error'
                })
              }
            }
          }, err => {
            loading.close();
            this.$notify({
              type: 'err',
              message: err
            });
          })
      },
    },
    mounted(){
      document.addEventListener('keydown',(e)=>{
        if(e.keyCode==13){
          this.login()
        }
      });
    }
  }
</script>
<style scoped>
  .loginInputBox {
    position: absolute;
    bottom: 45px;
    left: 40px;
  }

  .loginInputBox > li {
    width: 415px;
    height: 65px;
    margin-bottom: 20px;
    background-color: white;
    border-radius: 10px;
  }

  .loginInputBox > li > input {
    height: 65px;
    font: 25px/65px "微软雅黑";
    width: 360px;
    padding-left: 10px;
    border: none;
  }

  .loginInputBox > li:nth-of-type(1),
  .loginInputBox > li:nth-of-type(2) {
    box-shadow: 0px 0px 10px 1px silver;
  }

  .loginInputBox > li:nth-of-type(1) > div {
    width: 25px;
    height: 35px;
    background: url("../assets/img/login/phoneInput.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin: 15px 0 0 15px;
  }

  .loginInputBox > li:nth-of-type(2) > div {
    width: 25px;
    height: 35px;
    background: url("../assets/img/login/clock.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin: 15px 0 0 15px;
  }

  .loginInputBox > li:nth-of-type(2) {
    margin-bottom: 40px;
  }

  .loginInputBox > li:nth-of-type(3) {
    background-color: rgb(38, 158, 218);
    color: white;
    text-align: center;
    font: 20px/65px "微软雅黑";
  }

  /*  .loginBox>ul{

    }
    .loginBox>ul>li{
      width: 415px;
      height: 65px;
      background-color: red;
    }*/
  .contentImg {
    width: 280px;
    height: 165px;
    background: url("../assets/img/login/bird.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .container {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background: url("../assets/img/login/homeImg.png") no-repeat;
    -webkit-background-size: 100% 63%;
    background-size: 100% 63%;
    background-position: 0 0;
  }

  .content {
    width: 500px;
    height: 600px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    /*background-color: royalblue;*/
  }

  .content > h1 {
    width: 500px;
    height: 33px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    font: 33px/33px "微软雅黑";
    color: rgb(208, 220, 229);
  }

  .loginBox {
    width: 500px;
    height: 350px;
    background-color: white;
    opacity: 0.5;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 2px silver;
  }
</style>
