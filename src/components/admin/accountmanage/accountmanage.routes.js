// import AccountManage from './accountmanage.component.vue';
const AccountManage = (resolve) => {
  require.ensure(['./accountmanage.component.vue'], () => {
    /* eslint-disable global-require */
    resolve(require('./accountmanage.component.vue'));
  });
};
const accountmanageRoutes = [{
  path: 'accountmanage',
  name: 'accountmanage',
  component: AccountManage,
}];

export default accountmanageRoutes;
