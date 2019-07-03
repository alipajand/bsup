import globalMethods from '../../methods';
import services from '../../api';

export default {
  namespaced: true,

  // -----------------------------------------------------------------
  state: {
    login: false
  },

  // -----------------------------------------------------------------
  getters: {
    isLogin: state => state.login
  },

  // -----------------------------------------------------------------
  mutations: {
    login: (state) => {
      state.login = true;
    },
    logout: (state) => {
      state.login = false;
    },
    saveToken({ commit }, token) {
      localStorage.setItem('token', token);
    }
  },

  // -----------------------------------------------------------------
  actions: {
    checkToken({ commit, dispatch }) {
      if (globalMethods.getToken() && !globalMethods.isTokenExpire()) {
        commit('login');
      } else {
        dispatch('resetToken');
      }
    },
    async logout({ dispatch }) {
      await services.shared.logout();
      dispatch('resetToken');
    },
    resetToken({ commit }) {
      commit('logout');
      localStorage.clear();
    }
  }
};
