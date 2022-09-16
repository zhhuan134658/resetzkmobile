<!--  -->
<template>
  <div id="">
    <div :id="earcherid" style="width: 100%; height: 360px"></div>
    <div class="vant-table">
      <div class="" style="min-width: 100%">
        <table cellspacing="0" class="table">
          <tr>
            <th class="th" v-for="(item, index) in tableleftlist" :key="index">
              {{ item.lable }}
            </th>
          </tr>
          <tr v-for="(item, index) in tablelist" :key="index" class="list-tr">
            <td v-for="(context, i) in tableleftlist" :key="i">
              {{ item[context.prop] }}
            </td>
          </tr>
        </table>
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
    getearchdata(xAxisdata, seriesdata, id) {
      console.log('7777', this.earcherid, this.aa, id);
      var app = {};

      var chartDom = document.getElementById(id);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: 'category',
          data: xAxisdata,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: seriesdata,
            type: 'bar',
            barWidth: 20,
          },
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