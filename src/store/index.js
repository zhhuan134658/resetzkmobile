import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    worlitem: {},
    searchData: {},
    parmarsData: {},
    togglevisible: false,
    taskProject: '',
    taskid: '',
    tasktype: '',
    //!缓存 一般信息
    primaryColor: window.sessionStorage.getItem('primaryColor'),
    menuChildren: window.sessionStorage.getItem('menuChildren'),
    isdUpdaTile: window.sessionStorage.getItem('isdUpdaTile'),
    biaoName: window.sessionStorage.getItem('biaoName'),
    logoImg: '',
    //extend_three: window.sessionStorage.getItem('extend_three'),
    userInfo: {
      //!缓存 userinfo接口返回的信息
      unionid: window.sessionStorage.getItem('unionid'),
      corpid: window.sessionStorage.getItem('corpid'),
      userid: window.sessionStorage.getItem('userid'),
      username: window.sessionStorage.getItem('username'),
      userimg: window.sessionStorage.getItem('userimg'),
      company: window.sessionStorage.getItem('company'),
    },
  },

  actions: {},
  getters: {},
  mutations: {
    setworlitem(state, worlitem) {
      state.worlitem = worlitem;
    },
    settasktype(state, tasktype) {
      state.tasktype = tasktype;
    },
    settaskid(state, taskid) {
      state.taskid = taskid;
    },
    settaskProject(state, taskProject) {
      state.taskProject = taskProject;
    },
    setsearchData(state, searchData) {
      state.searchData = searchData;
    },
    setparmarsData(state, parmarsData) {
      state.parmarsData = parmarsData;
    },
    setBiaoName(state, biaoName) {
      state.biaoName = biaoName;
      sessionStorage.setItem('biaoName', biaoName);
    },
    settogglevisible(state, togglevisible) {
      state.togglevisible = togglevisible;
    },
    setIsdUpdaTile(state, isdUpdaTile) {
      state.isdUpdaTile = isdUpdaTile;
      sessionStorage.setItem('isdUpdaTile', isdUpdaTile);
    },
    setmenuChildren(state, menuChildren) {
      state.menuChildren = menuChildren;
      sessionStorage.setItem('menuChildren', menuChildren);
    },
    setprimaryColor(state, primaryColor) {
      state.primaryColor = primaryColor;
      sessionStorage.setItem('primaryColor', primaryColor);
    },
    setCorpid(state, corpid) {
      state.userInfo.corpid = corpid;
      sessionStorage.setItem('corpid', corpid);
    },
    setUserid(state, userid) {
      state.userInfo.userid = userid;
      sessionStorage.setItem('userid', userid);
    },
    setUnionid(state, unionid) {
      state.userInfo.unionid = unionid;
      sessionStorage.setItem('unionid', unionid);
    },
    setUsername(state, username) {
      state.userInfo.username = username;
      sessionStorage.setItem('username', username);
    },
    setUserimg(state, userimg) {
      state.userInfo.userimg = userimg;
      sessionStorage.setItem('userimg', userimg);
    },
    setcompany(state, company) {
      state.userInfo.company = company;
      sessionStorage.setItem('company', company);
    },
    setLogoImg(state, logoImg) {
      state.logoImg = logoImg;
    },
  },
});
