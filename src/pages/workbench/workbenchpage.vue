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
        <img :src="item.mobile_icon" alt="" />
        <div class="item_font">{{ item.name }}</div>
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
      contentList: [],

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
    getList() {
      let newPage = [
        {
          name: '任务',
          id: 'task',
          mobile_icon:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//yjBFRCjR8C1661409251507.png',
        },
        {
          name: '工程文档',
          id: 'file',
          mobile_icon:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//aTBxCJiibQ1661409250851.png',
        },
      ];
      this.axiosPost('/menu/menuMobile').then(res => {
        if (res.data.code == 1) {
          this.contentList = _.concat(res.data.data, newPage);
        }
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getList();
  },
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