<!--  -->
<template>
  <div id="">
    <div class="infocontent">
      <div
        class="infocontent_item"
        v-for="(item, index) in titleAllList"
        :key="index"
      >
        <img :src="item.imgUrl" alt="" />

        <div class="item_right">
          <div class="right_top">{{ titleData[item.value] }}</div>
          <div class="right_bot">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: '',
  props: {
    titleAllList: Array,
    titleData: Object,
  },
  data() {
    return {};
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {},
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