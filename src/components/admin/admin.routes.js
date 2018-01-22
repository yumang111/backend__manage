// import paramsetRoutes from '@/components/admin/paramset/paramset.routes';
import accountsettingsRoutes from '@/components/admin/accountsettings/accountsettings.routes';
// import projecthotRoutes from '@/components/admin/projecthot/projecthot.routes';
import usercountRoutes from '@/components/admin/customercount/customercount.routes';
// import userimgRoutes from '@/components/admin/customerimg/customerimg.routes';
import accountmanageRoutes from '@/components/admin/accountmanage/accountmanage.routes';
import UserfollowingRoutes from '@/components/admin/customerfollowing/customerfollowing.routes';
import UserallotRoutes from '@/components/admin/customerallot/customerallot.routes';
import datainRoutes from '@/components/admin/datain/datain.routes';
// import Admin from './admin.component.vue';

const Admin = (resolve) => {
  require.ensure(['./admin.component.vue'], () => {
    /* eslint-disable global-require */
    resolve(require('./admin.component.vue'));
  });
};
const adminRoutes = [
  {
    path: '/admin',
    // name: 'Admin',
    component: Admin,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      ...accountsettingsRoutes,
      // ...paramsetRoutes,
      // ...projecthotRoutes,
      ...usercountRoutes,
      // ...userimgRoutes,
      ...accountmanageRoutes,
      ...UserfollowingRoutes,
      ...UserallotRoutes,
      ...datainRoutes
    ],
  },
];

export default adminRoutes;
