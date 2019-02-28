<template>
  <div id="app">
    <!--加载罩-->
    <div id="loading" v-show="isLoading">
      <i class="el-icon-loading"></i>
    </div>


    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
    computed: mapGetters([
      'isLoading',
    ]),
  }
</script>

<style lang="less" type="text/less">

  @r: 30rem;
  /*body {*/
  /*background-color: #fbf9fe;*/
  /*}*/

  #loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .9);
    z-index: 100000;
  }

  #loading i {
    font-size: 30px;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>
