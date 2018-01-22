// import accountsettings from './accountsettings.component.vue';

const accountsettings = (resolve) => {
  require.ensure(['./accountsettings.component.vue'], () => {
    /* eslint-disable global-require */
    resolve(require('./accountsettings.component.vue'));
  });
};
const accountsettingsRoutes = [
  {
    path: 'accountsettings',
    name: 'accountsettings',
    component: accountsettings,
  },
];

export default accountsettingsRoutes;
