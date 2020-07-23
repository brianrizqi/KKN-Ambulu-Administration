import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token'),
    snackbarColor: 'success',
    snackbarMessage: '',
    showSnackbar: false
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    showSnackbar(state){
      return state.showSnackbar;
    },
    snackbarColor(state){
      return state.snackbarColor;
    },
    snackbarMessage(state){
      return state.snackbarMessage;
    }
  },
  mutations: {
    removeUser(state) {
      state.token = null;
      state.user = null;
    },
    saveUser(state, data) {
      state.token = data.token;
      state.user = data.user;
    },
    showSnackbar(state, data){
      state.snackbarColor = data.color;
      state.snackbarMessage = data.message;
      state.showSnackbar = true;
    },
    changeSnackbarValue(state, value){
      state.showSnackbar = value;
    }
  },
  actions: {
    hideSnackbar(context){
      context.commit('hideSnackbar');
    },
    authLogin(context, data) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      context.commit('saveUser', data);
    },
    authLogout(context) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      context.commit('removeUser');
    },
    successSnackbar(context, message){
      context.commit('showSnackbar', {
        color: 'success',
        message: message
      });
    },
    errorSnackbar(context, message){
      context.commit('showSnackbar', {
        color: 'red',
        message: message
      });
    }
  },
  modules: {}
})
