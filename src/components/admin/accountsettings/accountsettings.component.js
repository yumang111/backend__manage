import api from '@/api/api';
import util from '@/tools/util';

export default {
  name: 'accountsettings',
  data() {
    return {
      tags: [],
    };
  },
  methods: {
    showacustomerTags() {
      api
        .getAccountTags({
          adminId: util.getCookie('adminId') || util.getCookie('accountId'),
          accountId: util.getCookie('accountId') || util.getCookie('adminId'),
        })
        .then((res) => {
          if (res && res.data) {
            if (res.data.topTag) {
              this.tags = res.data.topTag;
              console.log(this.tags);
            }
          }
        });
    },
  },
  created() {
    console.log(111);
    this.showacustomerTags();
  },
};
