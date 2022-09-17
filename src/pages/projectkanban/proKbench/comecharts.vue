<!--  -->
<template>
  <div id="">
    <div class="earchtitle">
      <div
        class="earchtitle_item"
        v-for="(item, index) in topList"
        @click="titleClick(item, index)"
        :class="activetop == index ? 'acyive' : ''"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div :id="earcherid" style="width: 100%; height: 360px"></div>
    <div class="earchtable" v-if="tablelist.length > 0">
      <div class="earchtable_one">
        <div
          v-for="(item, index) in tableleftlist"
          :key="index"
          :class="index % 2 == 0 ? 'commtop comback' : 'commtop'"
          v-if="item.isshow"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="earchtable_two" v-if="cost">
        <div
          class="earchtable_one"
          v-for="(item, index) in tablelist"
          :key="index"
        >
          <div class="commtop comback">{{ item[tableclumes[0]] }}</div>
          <div class="commtop">{{ item[tableclumes[1]] }}</div>

          <div class="commtop comback">
            {{ item[tableclumes[2]] }}
          </div>

          <div class="commtop">
            {{ item[tableclumes[3]] }}
          </div>
        </div>
      </div>
      <div class="earchtable_two" v-else>
        <div
          class="earchtable_one"
          v-for="(item, index) in tablelist"
          :key="index"
        >
          <div class="commtop comback">{{ item[tableclumes[0]] || '-' }}</div>
          <div class="commtop">{{ item[tableclumes[1]] || '-' }}</div>

          <div class="commtop comback">
            {{ item[tableclumes[2]] || '-' }}
          </div>

          <div class="commtop">
            {{
              isNaN((item[tableclumes[1]] / item[tableclumes[2]]).toFixed(2))
                ? '-'
                : (item[tableclumes[1]] / item[tableclumes[2]]).toFixed(2)
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import * as echarts from 'echarts';
export default {
  name: '',
  props: {
    cost: Boolean,
    earcherid: String,
    topList: Array,
    tableclumes: Array,
    tablelist: Array,
    aa: String,
    tableleftlist: Array,
  },
  data() {
    return {
      //   earcherid: 'earcherid',
      activetop: 0,
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    titleClick(item, index) {
      this.activetop = index;
      this.$emit('getqualityProblem', index);
    },
    getearchdata(source, id) {
      console.log('7777', this.earcherid, this.aa, id);
      var app = {};

      var chartDom = document.getElementById(id);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {},
        tooltip: {},
        dataset: {
          source,
        },
        dataZoom: [
          {
            type: 'inside', //slider表示有滑动块的，inside表示内置的
            show: false,
            xAxisIndex: 0,
            start: 0,
            end: 100,
          },
        ],
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar', barWidth: 20 },
          { type: 'bar', barWidth: 20 },
        ],
      };

      option && myChart.setOption(option);
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