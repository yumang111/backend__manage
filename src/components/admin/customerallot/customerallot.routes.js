// import Customerallot from './customerallot.component.vue';
const Customerallot = (resolve) => {
  require.ensure(['./customerallot.component.vue'], () => {
    /* eslint-disable global-require */
    resolve(require('./customerallot.component.vue'));
  });
};
const customerallotRoutes = [
  {
    path: 'customerallot',
    name: 'customerallot',
    component: Customerallot,
  },
];

export default customerallotRoutes;
