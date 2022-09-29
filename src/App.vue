<template>
  <div id="app">
    <!-- <keep-alive include="allapplication">
      <router-view class="app-bottom" />
    </keep-alive> -->
    <keep-alive include="allapplication">
      <router-view class="app-bottom" />
    </keep-alive>
    <div class="claldiv" v-if="tabbot"></div>
    <van-tabbar
      v-if="tabbot"
      v-model="active"
      class="appBottom"
      safe-area-inset-bottom
    >
      <van-tabbar-item replace to="/homePage/homePageindex" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/workbench/workbenchpage" icon="friends-o"
        >工作台</van-tabbar-item
      >
      <van-tabbar-item replace to="/projectkanban/projectkanban" icon="search">
        项目看板
      </van-tabbar-item>

      <van-tabbar-item replace to="/setpage/setpageindex" icon="setting-o"
        >设置</van-tabbar-item
      >
    </van-tabbar>
    <div class="app-version">
      <span>{{ version }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      tabbot: true,
      active: 0,
      showPage: '',

      version: '0.0.1Bate',
    };
  },
  watch: {
    $route() {
      switch (this.$route.path) {
        case '/homePage/homePageindex':
          this.tabbot = true;

          this.active = 0;
          break;

        case '/workbench/workbenchpage':
          this.tabbot = true;

          this.active = 1;
          break;
        case '/projectkanban/projectkanban':
          this.tabbot = true;

          this.active = 2;
          break;
        case '/setpage/setpageindex':
          this.tabbot = true;

          this.active = 3;
          break;
        default:
          this.tabbot = false;

          break;
      }
    },
  },
  methods: {
    _isMobile() {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
      );
      return flag;
    },
  },
  created() {
    if (this._isMobile()) {
      this.showPage = 1;
      console.log('手机');
    } else {
      this.showPage = 2;
      console.log('电脑');
    }
    console.log(this.showPage);
  },
};
</script>


<style lang="less">
@supports (bottom: env(safe-area-inset-bottom)) {
  // #indexApp,
  .appBottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
#app {
  min-height: 100vh;
  .app-version {
    position: fixed;
    bottom: 0;
    right: 0;
    opacity: 0.15;
    pointer-events: none;
  }

  .claldiv {
    height: calc(1.4rem + constant(safe-area-inset-bottom));

    height: calc(1.4rem + env(safe-area-inset-bottom));
  }
}
</style>
