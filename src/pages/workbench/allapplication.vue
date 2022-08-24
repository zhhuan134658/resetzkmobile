<!-- 全部应用 -->
<template>
  <div id="allapplication">
    <!-- 常用 -->
    <div class="comuse">
      <div class="cuone">常用应用</div>
      <div class="cutwo">
        <div class="cutitrm">
          <i class="iconfont iconcha cticon" style="color: red"></i>
        </div>
      </div>
      <div class="cuthree">编辑</div>
    </div>
    <!-- 全部 -->
    <div class="allapp">
      <div class="allapp_item" v-for="(item, index) in all">
        <div class="item_top">{{ item.title }}</div>
        <div class="item_con">
          <div class="item_com_son" v-for="item1 in item.chile">
            <i class="iconfont iconcha" style="color: red"></i>

            <div class="sonfont">{{ item1.name }}</div>
            <!-- <div class="sonfont">{{
                            item.name.length > 4
                              ? item.name.substring(0, 4)
                              : item.name
                          }}</div> -->
          </div>
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
      // 头部常用列表
      editList: [],
      all: [
        {
          title: '投标',
          chile: [
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
          ],
        },
        {
          title: '投标',
          chile: [
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
            {
              name: '投标项目 信息登记',
            },
          ],
        },
      ],
    };
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