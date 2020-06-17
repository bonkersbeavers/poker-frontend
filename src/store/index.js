import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playersNumber: 0,
    playersStack: {},
    playersNames: {},
    playersSeat: {}
  },
  mutations: {},
  getters: {
    getPlayersNumber: state => {
      return state.playersNumber
    }
  }
});
