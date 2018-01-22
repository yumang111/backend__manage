import Vue from 'vue';
import Router from 'vue-router';
// import store from '@/store/index';
import api from '@/api/api';
import util from '@/tools/util';
// import store from '@/store';

// import {
//   userRoutes,
// } from '@/user/user.routes';
import adminRoutes from '@/components/admin/admin.routes';
import userloginRoutes from '@/components/userlogin/userlogin.routes';
import Hello from '@/components/Hello';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    // ...userRoutes,
    // { path: '/admin/', component: adminRoutes },
    { path: '/', redirect: '/userlogin' },
    ...userloginRoutes,
    ...adminRoutes,
    {
      path: '*',
      component: Hello,
    },
  ],
});

/* eslint-disable */
router.beforeEach((to, from, next) => {
  let accessMenu = [];
  api.account_showMenuList({ accountId: util.getCookie('accountId') })
    .then((res) => {
      if (res && res.data) {
        accessMenu = res.data;
      }
      const path = to.matched.filter(v => v.meta.requireAuth);
      if (path.length) {
        if (path[0].meta.requireAuth === true) {
          if (!util.getCookie('accountId')) {
            next({
              path: '/userlogin',
            });
          } else {
            // console.log(to, '我是to');
            // console.log(from, '我是from')
            if (to.name) {
              next()
              // const toName = to.name
              // let canGo = findName(toName, accessMenu)
              // if (canGo) {
              //   next()
              // } else {
              //   next({ path: from.path })
              // }
            }
          }
        }
      } else {
        next();
      }
    })
});

function findName(name, totalName) {
  for (var i = 0; i < totalName.length; i++) {
    if (name == totalName[i].menuTitle) {
      return true;
      break;
    }
  }
}
export default router;
