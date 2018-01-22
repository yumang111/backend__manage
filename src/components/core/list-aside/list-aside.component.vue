<style lang="less" scoped>
// .router-aside {
//   background: #151825;
//   .menu-item {
//     display: block;
//     text-decoration: none;
//     line-height: 54px;
//     height: 54px;
//     font-size: 14px;
//     color: #7a9dbf;
//     &.router-link-active {
//       background: #08090c;
//       &:before {
//         margin: 0 14px 0 21px;
//       }
//     }
//     &:hover {
//       background: #08090c;
//     }
//     &:before {
//       content: "";
//       display: inline-block;
//       vertical-align: middle;
//       margin: 0 14px 0 24px;
//       width: 32px;
//       height: 32px;
//     }

//     &.paramset {
//       &.router-link-active {
//         border-left: 3px solid #005acd;
//       }
//       &:before {
//         background: url(../../../assets/image/paramset.png);
//         background-size: 100%;
//       }
//     }
//     &.accountsettings {
//       &.router-link-active {
//         border-left: 3px solid #005acd;
//       }
//       &:before {
//         background: url(../../../assets/image/paramset.png);
//         background-size: 100%;
//       }
//     }
//     &.projecthot {
//       &.router-link-active {
//         border-left: 3px solid #f67300;
//       }
//       &:before {
//         background: url(../../../assets/image/project-hot.png);
//         background-size: 100%;
//       }
//     }
//     &.customerallot {
//       &.router-link-active {
//         border-left: 3px solid #e8003e;
//       }
//       &:before {
//         background: url(../../../assets/image/customer-allot.png);
//         background-size: 100%;
//       }
//     }
//     &.customerfollowing {
//       &.router-link-active {
//         border-left: 3px solid #0cbb00;
//       }
//       &:before {
//         background: url(../../../assets/image/customer-follow.png);
//         background-size: 100%;
//       }
//     }
//     &.customercount {
//       &.router-link-active {
//         border-left: 3px solid #e8700f;
//       }
//       &:before {
//         background: url(../../../assets/image/use-accouont.png);
//         background-size: 100%;
//       }
//     }
//     &.customerimg {
//       &.router-link-active {
//         border-left: 3px solid #0071d6;
//       }
//       &:before {
//         background: url(../../../assets/image/customer-img.png);
//         background-size: 100%;
//       }
//     }
//     &.managecenter {
//       &.router-link-active {
//         border-left: 3px solid #e82372;
//       }
//       &:before {
//         background: url(../../../assets/image/account-set.png);
//         background-size: 100%;
//       }
//     }
//   }
// }
.bigData-logo {
  width: 260px;
  img {
    width: 260px;
  }
}
.aside {
  background: #151825 !important;
}
.el-menu-vertical-yjb {
  background: #151825;
  .el-menu-item {
    &:hover {
      background: #08090c;
    }
  }
}
@color-1: #005acd;
@color-2: #e8003e;
@color-3: #0cbb00;
@color-4: #e8700f;
@color-5: #e82372;
.yjbmeau-columns(5);
.yjbmeau-columns(@n, @i: 1) when (@i =< @n) {
  .yjbmeau-@{i} {
    padding-left: 0 !important;
    padding-right: 0 !important;
    .el-menu-item {
      a {
        color: #7a9dbf;
        text-decoration: none;
      }
    }
    .menu-item {
      display: block;
      text-decoration: none;
      line-height: 54px;
      height: 54px;
      font-size: 14px;
      color: #7a9dbf;
      &.router-link-active {
        background: #08090c;
        &:before {
          margin: 0 14px 0 21px;
        }
      }
      &:before {
        background: url("../../../assets/image/meau-icon/icon-@{i}.png");
        background-size: 100%;
      }
      &:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        margin: 0 14px 0 24px;
        width: 32px;
        height: 32px;
      }
    }
  }
  .yjbmeau-columns(@n, (@i + 1));
}
.bgc {
  background: #151825 !important;
}
.el-menu--dark .el-submenu .el-menu .el-menu-item:hover {
  background-color: #08090c;
}
.el-menu-item-group__title {
  padding-top: 0 !important;
}
.yjbmeau-1 {
  a {
    &.router-link-active {
      border-left: 3px solid #005acd;
    }
  }
}
.yjbmeau-2 {
  a {
    &.router-link-active {
      border-left: 3px solid #e8003e;
    }
  }
}
.yjbmeau-3 {
  a {
    &.router-link-active {
      border-left: 3px solid #0cbb00;
    }
  }
}
.yjbmeau-4 {
  a {
    &.router-link-active {
      border-left: 3px solid #e8700f;
    }
  }
}
.yjbmeau-5 {
  &.is-opened .el-submenu__title {
    border-left: 3px solid #e82372;
  }
  a {
    display: block;
    padding-left: 30px;
  }
  .menu-item {
    &:before {
      margin: 0 14px 0 4px;
    }
  }
}
</style>

<template>
  <div>
    <div class="bigData-logo">
      <img src="../../../assets/image/logo.png" />
    </div>
    <user-info></user-info>
    <div :default-active="curindex" class="router-aside">
      <el-menu theme="dark" default-active="2" class="el-menu-vertical-yjb">
        <template v-for="(item,index) in recommendTpl">
          <el-menu-item :class="'yjbmeau-'+(index+1)" v-if="item.menuTitle !== 'managecenter'" :key="index" index="index">
            <router-link class="menu-item" :key="index" :to="item.menuUrl">
              {{item.menuDesc}}
            </router-link>
          </el-menu-item>
          <el-submenu :class="'yjbmeau-'+(index+1)" v-else :key="index" index="index">
            <template slot="title">
              <span style='padding-left:0px' slot="title" class="menu-item">{{item.menuDesc}}</span>
            </template>
            <el-menu-item-group class="bgc">
              <el-menu-item v-for="(child,i) in item.childrenMenu" :key="i" :index="child.menuUrl">
                <router-link :to="child.menuUrl">
                  {{child.menuDesc}}
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
          
      <!-- <template v-for="(item,index) in recommendTpl">
        <router-link :key="index" class="menu-item" :class="item.menuTitle" :to="item.menuUrl">
          {{item.menuDesc}}
          <template v-if="item.children">
            <router-link :key="i" v-for="(child,i) in item.children" :to="child.menuUrl">
              {{child.menuDesc}}
            </router-link>
          </template>
        </router-link>
      </template> -->
    </div>
  </div>

</template>

<script>
import userInfo from '@/components/core/app-header/app-header.component';

export default {
  data() {
    return {
      curindex: '',
      urlLink: []
    };
  },
  computed: {
    recommendTpl() {
      return this.$store.state.user.routerList;
    },
  },
  methods: {
  },
  created() {
    this.$store.dispatch('GET_ROUTER_LIST');
    const paths = this.$route.path.split('/');
    const currentPath = paths[paths.indexOf('admin') + 1];
    this.curindex = currentPath;
  },
  components: {
    userInfo,
  }
};

</script>
