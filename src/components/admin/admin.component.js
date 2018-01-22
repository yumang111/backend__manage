import listAside from '@/components/core/list-aside/list-aside.component';
import userInfo from '@/components/core/app-header/userinfo/userinfo';
import password from '@/components/core/app-header/password/password';

export default {
  name: 'app-admin',
  data() {
    return {
      msg: 'admin',
      bodyHeight: 0,
      leftHeight: 0,
      activeName2: 'first',
      // dialogFlag: false,
    };
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll);
    this.$nextTick(() => {
      // document.querySelector('#trans-tooltip').remove();
    });
  },
  computed: {
    dialogFlag() {
      return this.$store.state.user.userInfoDialog;
    },
  },
  created() {
    // this.leftHeight = document.body.clientHeight;
    // console.log(document.getElementById("aaa").offsetHeight);
    // this.leftHeight = document.getElementById("aaa").offsetHeight;
    // console.log('fsafsafsa'+this.leftHeight);
  },
  // ready () {
  //   window.addEventListener('scroll', this.handleScroll);
  // },
  methods: {
    resetDialogFlag() {
      this.$store.commit('CTR_USERINFO_DIALOG_CLOSE');
    },
    handleScroll() {
      // let contentH = document.getElementById('rightContent').offsetHeight,
      //   clientH = document.body.clientHeight;
      // this.leftHeight = clientH > contentH ? clientH : contentH;
    },
    clickMe() {
      this.leftHeight = document.body.clientHeight;
    },
  },
  components: {
    listAside,
    userInfo,
    password,
  },
};
