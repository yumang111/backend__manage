// import Paramset from './paramset.component.vue';

const Paramset = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['./paramset.component.vue'], () => {
    /* eslint-disable global-require*/
    resolve(require('./paramset.component.vue'));
  });
};

const ParamsetRoutes = [{
  path: 'paramset',
  name: 'paramset',
  component: Paramset,
}];

export default ParamsetRoutes;
