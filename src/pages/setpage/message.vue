<!-- 消息通知 -->


<template>
  <div id="message">
    <!-- 内容 分条分段 -->
    <div class="message_item" v-for="(item, index) in messList" :key="index">
      <div class="time">{{ item.time }}</div>
      <div class="messbody">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="content">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      messList: [
        {
          time: '2020-06-04',
          title: ' 筑快OA为更好帮助企业发展新增以下功能模块快 来体验吧！',
          content:
            '1、保证金报表，保证金去向一 目了然；2、费用报销明细表，报销情况、备用金花费情况清晰呈现；3、应付款汇总表， 以收款单位的角度统计已收发票和已付款金额收票付款汇总表，统计支同执行情 况及收票情况。感谢体验！',
        },
        {
          time: '2020-06-04',
          title: ' 筑快OA为更好帮助企业发展新增以下功能模块快 来体验吧！',
          content:
            '1、保证金报表，保证金去向一 目了然；2、费用报销明细表，报销情况、备用金花费情况清晰呈现；3、应付款汇总表， 以收款单位的角度统计已收发票和已付款金额收票付款汇总表，统计支同执行情 况及收票情况。感谢体验！',
        },
        {
          time: '2020-06-04',
          title: ' 筑快OA为更好帮助企业发展新增以下功能模块快 来体验吧！',
          content:
            '1、保证金报表，保证金去向一 目了然；2、费用报销明细表，报销情况、备用金花费情况清晰呈现；3、应付款汇总表， 以收款单位的角度统计已收发票和已付款金额收票付款汇总表，统计支同执行情 况及收票情况。感谢体验！',
        },
        {
          time: '2020-06-04',
          title: ' 筑快OA为更好帮助企业发展新增以下功能模块快 来体验吧！',
          content:
            '1、保证金报表，保证金去向一 目了然；2、费用报销明细表，报销情况、备用金花费情况清晰呈现；3、应付款汇总表， 以收款单位的角度统计已收发票和已付款金额收票付款汇总表，统计支同执行情 况及收票情况。感谢体验！',
        },
      ],
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: '消息通知', //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
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