<!--  -->
<template>
  <div id="proKbench">
    <div class="topTitle">
      <img
        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TAzxJaGxtY1662534061816.png"
        alt=""
      />
    </div>

    <div class="vantabs">
      <van-tabs v-model="activeName" color="#0089FF">
        <van-tab
          v-for="(item, index) in tabsList"
          :key="index"
          :title="item.text"
        >
          <proinfo v-if="item.value == 0"></proinfo>
          <qualityanalysis v-else-if="item.value == 1"></qualityanalysis>
          <safetyanalysis v-else-if="item.value == 2"></safetyanalysis>
          <progressanalysis v-else-if="item.value == 3"></progressanalysis>
          <costanalysis v-else-if="item.value == 4"></costanalysis>
          <revenueanalysis v-else-if="item.value == 5"></revenueanalysis>
          <outanalysis v-else-if="item.value == 6"></outanalysis>
          <taxanalysis v-else-if="item.value == 7"></taxanalysis>
          <materialanalysis v-else-if="item.value == 8"></materialanalysis>
          <majoranalysis v-else-if="item.value == 9"></majoranalysis>
          <labouranalysis v-else-if="item.value == 10"></labouranalysis>
          <mechanicsanalysis v-else-if="item.value == 11"></mechanicsanalysis>
          <indirectanalysis v-else-if="item.value == 12"></indirectanalysis>
          <managementanalysis v-else-if="item.value == 13"></managementanalysis>
          <riskanalysis v-else-if="item.value == 14"></riskanalysis>
        </van-tab>
      </van-tabs>
      <div class="vanticon">
        <!-- <van-icon name="setting-o" color="#000" size="25" /> -->
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="activeName" :options="tabsList" />
        </van-dropdown-menu>
      </div>
    </div>
    <van-popup v-model="popupshow" position="left" :style="{ height: '100%' }">
      <div
        class="tabitem"
        v-for="(item, index) in tabsList"
        :class="index === activeName ? 'activecolor' : ''"
        @click="popClick(item, index)"
      >
        {{ item.name }}
      </div>
    </van-popup>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import proinfo from './proinfo.vue';
import qualityanalysis from './qualityanalysis.vue';
import safetyanalysis from './safetyanalysis.vue';
import progressanalysis from './progress_analysis.vue';
import costanalysis from './cost_analysis.vue';
import revenueanalysis from './revenue_analysis.vue';
import outanalysis from './out_analysis.vue';
import taxanalysis from './tax_analysis.vue';
import materialanalysis from './material_analysis.vue';
import majoranalysis from './major_analysis.vue';
import labouranalysis from './labour_analysis.vue';
import mechanicsanalysis from './mechanics_analysis.vue';
import indirectanalysis from './indirect_analysis.vue';
import managementanalysis from './management_analysis.vue';
import riskanalysis from './risk_analysis.vue';

export default {
  components: {
    proinfo,
    qualityanalysis,
    safetyanalysis,
    progressanalysis,
    costanalysis,
    revenueanalysis,
    outanalysis,
    taxanalysis,
    materialanalysis,
    majoranalysis,
    labouranalysis,
    mechanicsanalysis,
    indirectanalysis,
    managementanalysis,
    riskanalysis,
  },
  name: '',
  data() {
    return {
      popupshow: false,
      activeName: 0,
      tabsList: [
        {
          value: 0,

          text: '项目简介',
        },
        { value: 1, text: '质量分析' },
        { value: 2, text: '安全分析' },
        {
          value: 3,
          text: '进度分析',
        },
        {
          value: 4,
          text: '成本分析',
        },
        { value: 5, text: '收入分析' },
        {
          value: 6,
          text: '支出分析',
        },
        {
          value: 7,
          text: '税务分析',
        },
        {
          value: 8,
          text: '材料分析',
        },
        {
          value: 9,
          text: '劳务分析',
        },
        {
          value: 10,
          text: '专业分包分析',
        },
        { value: 11, text: '机械租赁分析' },
        { value: 12, text: '间接费分析' },
        { value: 13, text: '经营分析' },
        { value: 14, text: '风险管理' },
      ],
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    iconClick() {
      this.popupshow = true;
    },
    popClick(item, index) {
      this.activeName = index;
      this.popupshow = false;
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