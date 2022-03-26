import Vue from "vue";
import Vuex from "vuex";
//import {mtgNameSearch} from "../api/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeCard: {},
  },
  mutations: {
    setActiveCard (state, data) {
      state.activeCard = data;
    },
  },
  actions: {
    
  },
  modules: {},
});
