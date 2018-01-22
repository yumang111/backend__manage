import router from '@/router';
import {
  cloneDeep,
} from 'lodash';
import util from '@/tools/util';
import api from '@/api/api';
// import Vue from 'vue';
import MD5 from 'md5';
import * as mutationTypes from '../mutation-types';
import * as actionTypes from '../action-types';

/* eslint-disable */
/* eslint-disable no-shadow*/
/* eslint-disable no-param-reassign*/
// initial state
const state = {
  projectInfo: null,
  userInfo: null,
  urlLink: [], // 路由列表
  routerList: [],
  realName: '',
  loginImageUrl: '',
  userInfoDialog: false,
};
const getters = {
  getRouterList(state) {
    return state.routerList;
  },
};
// mutations
const mutations = {
  [mutationTypes.SAVE_USER_INFO](state, data) {
    state.projectInfo = data;
    state.urlLink = data[0];
    router.push('/admin/' + state.urlLink[0].menuTitle);
  },
  [mutationTypes.USER_INFO](state, data) {
    state.realName = data.realName;
    state.loginImageUrl = data.imgUrl;
    state.userInfo = data;
  },
  [mutationTypes.SAVE_ROUTER_LIST](state, data) {
    state.routerList = data;
  },
  [mutationTypes.SAVE_USER_IMG](state, data) {
    state.loginImageUrl = data;
  },
  [mutationTypes.REMOVE_USER_IMG](state) {
    state.loginImageUrl = '';
  },
  [mutationTypes.CTR_USERINFO_DIALOG_OPEN](state) {
    state.userInfoDialog = true;
  },
  [mutationTypes.CTR_USERINFO_DIALOG_CLOSE](state) {
    state.userInfoDialog = false;
  },
};

// actions
const actions = {
  [actionTypes.USER_LOGIN]({
    commit
  }, params) {
    // 请求接口登陆
    const loginParams = cloneDeep(params);
    if (!util.getCookie('loginPasd')) {
      loginParams.password = MD5(loginParams.password);
    } else {
      loginParams.password = util.getCookie('loginPasd');
    }
    return new Promise((resolve, reject) => {
      api.userLoginIn(loginParams)
        .then((response) => {
          if (response && response.status === 'success') {
            util.setCookie('loginName', loginParams.loginName, 1);
            // util.setCookie('projectId', response.data[1].projectId, 1);
            // util.setCookie('projectName', response.data[1].projectName, 1);
            util.setCookie('accountId', response.data[1].accountId, 1);
            util.setCookie('phone', response.data[1].phone, 1);
            util.setCookie('realName', response.data[1].realName, 1);
            util.setCookie('accountName', response.data[1].accountName, 1);
            util.setCookie('adminId', response.data[1].adminId, 1);
            if (!response.data[0].length) {
              reject({
                type: 'error',
                message: '您没有被分配权限，请联系管理员！',
                duration: 1000,
              });
            } else {
              commit('SAVE_USER_INFO', response.data);
              router.push('/admin/' + response.data[0][0].menuTitle);
            }
          }
          if (response && response.errMsg) {
            reject({
              type: 'error',
              message: response.errMsg,
              duration: 1000,
            });
          }
        })
        .catch(() => reject('登陆失败'));
    });
  },
  [actionTypes.GET_USER_INFO]({
    commit
  }) {
    api.user_getUserInfo({
        accountId: util.getCookie('accountId')
      })
      .then((respond) => {
        if (respond.data) {
          commit('USER_INFO', respond.data);
        }
      });
  },
  [actionTypes.GET_ROUTER_LIST]({
    commit
  }) {
    api.account_showMenuList({
        accountId: util.getCookie('accountId')
      })
      .then((res) => {
        if (res && res.data) {
          commit('SAVE_ROUTER_LIST', res.data);
        }
      });
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
