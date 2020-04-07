import Vue from 'vue'
import Vuex from 'vuex'
import APIService from "../api.service";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countyList: [],
    worldWideResult: {},
    loading: false
  },
  mutations: {
    setCountryList(state, data) {
      state.countyList = data;
    },
    setWorldWide(state, data) {
      state.worldWideResult = data;
    },
    toggleLoading(state, val) {
      state.loading = val;
    }
  },
  actions: {
    getCountryList() {
      return APIService.getCountries();
    },
    getWorldWideData(context) {
      axios.get('https://covid19.mathdro.id/api').then(res => {
        context.commit('setWorldWide', res.data);
        context.commit('toggleLoading', true)
      })
    }
  }
})
