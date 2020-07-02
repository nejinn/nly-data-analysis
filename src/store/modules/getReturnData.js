import localstorage from "../../utils/localstorage";

const state = {
  loginToken: localstorage.getLocalInfo("nly_data_analysis_login_token")
};

const getters = {
  getLoginToken(state) {
    return state.loginToken;
  }
};

const mutations = {
  setLoginUserInfo(state, payload) {
    state.loginToken = payload;
    localstorage.setLocalInfo("nly_data_analysis_login_token", payload);
  },
  clearLoginUserInfo(state) {
    state.loginToken = "";
    localstorage.clearLocalInfo("nly_data_analysis_login_token");
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
