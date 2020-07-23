import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import Vuex from "vuex";
Vue.use(Vuex);

//数据
const state = {
  list: []
};
//action  执行异步操作，不可以修改state数据
const actions = {};
//mutation 可直接修改state数据
const mutations = {
  add(state, n) {
    //   if(state.list.length=0){}
    n.num = 1;
    state.list.push(n);
  },

  //   删除开始
  delete(state, n) {
    state.list.splice(n, 1);
  },
  //    加开始
  jia(state, n) {
    state.list[n].num++;
  },
  jian(state, n) {
    state.list[n].num--;
  }
};
//getter
const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [createPersistedState()] //会自动保存创建的状态。刷新还在
});
