<!--  -->
<template>
  <div id="workbenchpage">
    <!-- 常用应用 -->
    <div class="common_app">
      <div class="toptit">
        <div class="topdiv">常用应用</div>
        <van-icon size="20" name="setting-o" />
      </div>
      <div class="comcont">
        <div
          @click="gopage(item)"
          class="comcont_it"
          v-for="(item, index) in filelist"
          :key="index"
        >
          <img
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ekzMKs83Zy1615168260242.png"
            alt=""
          />
          <div class="comfont">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: '',
  data() {
    return {
      filelist: [
        { name: '最近文件', path: '/engineeringDocument/latelyFile' },
        { name: '回收站', path: '/engineeringDocument/recycleBin' },
        { name: '我的收藏', path: '/engineeringDocument/myCollection' },
        { name: '文件', path: '/engineeringDocument/DocumenFile' },
        { name: '规范图集', path: '/engineeringDocument/standardAtlas' },
        { name: '私人文件', path: '/engineeringDocument/privateDocuments' },
      ],
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    gopage(item) {
      if (item.name == '规范图集') {
        const _this = this;
        _this.$utils
          .axiosFilePost('/engineering/dingAtlasSpaceAdd')
          .then(function (res) {
            let aa = {
              file_id: res.data.data.file_id,
              space_id: res.data.data.space_id,
            };
            _this.$router.push({
              path: item.path,
              query: {
                typename: 'first',
                itemdata: JSON.stringify(aa),
              },
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
      if (item.name == '私人文件') {
        const _this = this;
        _this.$utils
          .axiosFilePost('/engineering/dingPrivateSpaceAdd')
          .then(function (res) {
            let aa = {
              file_id: res.data.data.file_id,
              space_id: res.data.data.space_id,
            };
            _this.$router.push({
              path: item.path,
              query: {
                typename: 'first',
                itemdata: JSON.stringify(aa),
              },
            });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$router.push({
          path: item.path,
          query: {
            typename: 'first',
          },
        });
      }
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
</style>