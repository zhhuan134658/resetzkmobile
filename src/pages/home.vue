<!--  -->
<template>
  <div id="home">
    <router-view />
  </div>
</template>
<script>
import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'home',
  components: {},
  data() {
    return {};
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化

  //⽅法集合
  methods: {
    //获取个人信息
    getReady() {
      const that = this;
      let corpId = that.GetQueryString('corpid');
      // 免登录信息获取
      dd.ready(function () {
        dd.runtime.permission.requestAuthCode({
          corpId: corpId,
          onSuccess: function (result) {
            if (result.code != '') {
              that
                .axiosPost('/user/userinfo', {
                  corp_id: corpId,
                  code: result.code,
                })
                .then(res => {
                  if (res.data.code == 1) {
                    let userData = JSON.parse(
                      JSON.stringify(res.data.data.content),
                    );
                    that.firmName = userData.company;
                    // vuex缓存
                    that.$store.commit('setUserid', userData.userid);
                    that.$store.commit('setUnionid', userData.unionid);
                    that.$store.commit('setUsername', userData.name);
                    that.$store.commit('setUserimg', userData.avatar);
                    that.$store.commit('setcompany', userData.company);

                    that.$nextTick(() => {});

                    // let user = userData.userid;
                    // that.Image = userData.avatar;
                    // that.uname = userData.name;
                    // that.$store.commit('setUname', that.uname);
                    // that.$store.commit('setCname', userData.company);
                    // that.$store.commit('setAvatar', that.Image);
                    // that.$store.commit('setUid', user);
                    // that.$store.commit('setAdmin', userData.zk_admin);
                    // 判断是不是个人版   个人版 2  企业版 1
                    // if (res.data.data.content.type == 2) {
                    //     that.firstshow = true;
                    // } else {
                    //     that.firstshow = false;
                    // }
                  }
                });
            }
          },
          onFail: function () {},
        });
      });
    },
    login() {
      const that = this;
      const code = '';
      that
        .axiosPost('/user/userinfo', {
          //   corp_id: 'dingea47c602975497f935c2f4657eb6378f', //that.$store.state.cid,
          corp_id: that.$store.state.userInfo.corpid,
          code: code,
        })
        .then(res => {
          if (res.data.code == 1) {
            let userData = JSON.parse(JSON.stringify(res.data.data.content));
            that.firmName = userData.company;
            that.$store.commit('setUserid', '1955162522782338');
            that.$store.commit('setUnionid', userData.unionid);
            that.$store.commit('setUsername', userData.name);
            that.$store.commit('setUserimg', userData.avatar);
            that.$store.commit('setcompany', userData.company);
          }
        });
    },
    //获取cropid
    GetQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log('45445454545+++++++++++++');
    const _this = this;
    let CorpId = '';
    var url = decodeURIComponent(location.search); //获取url中"?"符后的字串
    CorpId = url.split('?corpid=')[1];
    _this.$store.commit('setCorpid', CorpId);

    // _this.getallrouter();
    if (process.env.VUE_APP_AUTH_CODE == 888) {
      const hostname = ['localhost', '192.168.31'];
      if (hostname.includes(location.hostname)) {
        // _this.$message.warning('本地测试环境', 2);
        _this.$store.commit(
          'setCorpid',
          'dingea47c602975497f935c2f4657eb6378f',
        );
        _this.login();
      } else {
        // _this.$message.warning('服务器测试环境', 2);
        _this.getReady();
        _this.$utils.checkding();
      }
    } else {
      _this.getReady();
      this.$utils.checkding();
    }
  },
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.$refs.childmenuList.getMenuList();
    // this.getReady();
  },

  //beforeCreate() {}, //⽣命周期 - 创建之前
  //beforeMount() {}, //⽣命周期 - 挂载之前
  //beforeUpdate() {}, //⽣命周期 - 更新之前
  //updated() {}, //⽣命周期 - 更新之后
  //beforeDestroy() {}, //⽣命周期 - 销毁之前
  //destroyed() {}, //⽣命周期 - 销毁完成
  //activated() {}, //如果页⾯有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'>
#home {
}
</style>