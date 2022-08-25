<!--  -->
<template>
  <div id="workbenchpage">
    <!-- 工作台 -->
    <div style="height: 0.2rem"></div>
    <div class="content">
      <div
        class="content_item"
        v-for="(item, index) in contentList"
        :key="index"
        @click="goNest(item)"
      >
        <img :src="item.imgurl" alt="" />
        <div class="item_font">{{ item.name }}</div>
      </div>
    </div>

    <!-- 常用应用 -->
    <!-- <div class="common_app">
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
    </div> -->
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: '',
  data() {
    return {
      contentList: [
        {
          name: '项目立项',
          id: '1',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//Mih72hB2541661409251669.png',
        },
        {
          name: '投标',
          id: '2',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//cnb8waAZJa1661409251873.png',
        },
        {
          name: '招标',
          id: '3',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//Dxdxh2wNRA1661409252236.png',
        },
        {
          name: '成本',
          id: '4',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//Y257Mj3mnc1661409251174.png',
        },
        {
          name: '收入',
          id: '5',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//KEBJyiJffM1661409252400.png',
        },
        {
          name: '支出',
          id: '6',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//cfFJDdcKGd1661409251338.png',
        },
        {
          name: '财务',
          id: '7',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//Ez6jHbxYcB1661409251019.png',
        },
        {
          name: '技术',
          id: '8',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//EGwTRAt2Wy1661409252050.png',
        },
        {
          name: '任务',
          id: 'rw',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//yjBFRCjR8C1661409251507.png',
        },
        {
          name: '工程文档',
          id: 'file',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//aTBxCJiibQ1661409250851.png',
        },
        {
          name: '设置',
          id: '12',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//PHj2kStGjf1661409250466.png',
        },
        {
          name: '自定义',
          id: '11',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//YceBGRwKjG1661409252562.png',
        },
      ],

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
    goNest(item) {
      this.$router.push({
        path: '/workbench/allapplication',
        query: {
          item,
        },
      });
    },
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