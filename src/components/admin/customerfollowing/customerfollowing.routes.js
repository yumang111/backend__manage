// import customerfollowing from './customerfollowing.component.vue';
const customerfollowing = (resolve) => {
  require.ensure(['./customerfollowing.component.vue'], () => {
    /* eslint-disable global-require */
    resolve(require('./customerfollowing.component.vue'));
  });
};
const customerfollowingRoutes = [{
  path: 'customerfollowing',
  name: 'customerfollowing',
  component: customerfollowing,
}];

export default customerfollowingRoutes;
