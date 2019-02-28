// import Vue from 'vue'

Vue.use(Vuex)

import publicStore from './public'
import cashier from './cashier'
import admin from './admin'
import getters from './getters'





const store = new Vuex.Store({
  modules: {
    publicStore,
    cashier,
    admin
  },
  getters
});

export default store
