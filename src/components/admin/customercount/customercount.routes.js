// import customercount from './customercount.component.vue';
const customercount = (resolve) => {
  require.ensure(['./customercount.component.vue'], () => {
    /* eslint-disable global-require */
    resolve(require('./customercount.component.vue'));
  });
};
const customercountRoutes = [{
  path: 'customercount',
  name: 'customercount',
  component: customercount,
}];

export default customercountRoutes;
