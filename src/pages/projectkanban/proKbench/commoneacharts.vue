<template>
  <div class="div_eacharts">
    <div class="charts_c">
      <div
        class="charts_c_item"
        v-for="(item, index) in titltList"
        @click="changeTitle(item, index)"
        :class="activeindex == index ? 'active' : ''"
      >
        {{ item.name }}
      </div>
    </div>
    <div style="width: 100%; height: 360px" :id="eachid"></div>
    <div class="earchtable" v-if="tableList && tableList.length > 0">
      <div class="earchtable_one">
        <div
          v-for="(item, index) in tableName"
          :key="index"
          :class="index % 2 == 0 ? 'commtop' : 'commtop'"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="earchtable_two">
        <div class="earchtable_one" v-for="(item, index) in tableList">
          <div
            v-for="(item1, index1) in tableName"
            :class="index % 2 == 0 ? 'commtop comback' : 'commtop'"
          >
            {{ item[item1.value] || 0 }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- <div>暂时还没有数据哦~快去添加</div> -->
      <img
        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//EBC6ydZ7Tj1663407965807.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: {
    eachid: String,
    eachartData: {
      type: Object,
    },
    title: String,
    titltList: Array,
    tableName: Array,
    tableList: Array,
    activeindex: Number,
    fatherMethod: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {
    changeTitle(item, index) {
      if (this.fatherMethod) {
        this.fatherMethod(index + 1);
      }
    },
    divEcharts() {
      console.log('45454', document.getElementById(this.eachid));
      var myChart = echarts.init(document.getElementById(this.eachid));

      var radarDataAvg = this.eachartData.yList; //y
      var lineDataAvg = this.eachartData.xList; //x
      var weekLineData = this.eachartData.nameList;

      let option = {
        // legend: {},图示
        backgroundColor: '#fff',
        color: ['#FCB224', '#3296FA'],
        grid: {
          left: '1%',
          right: '5%',
          top: '10%',
          bottom: '6%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: weekLineData,
        },
        yAxis: [
          {
            type: 'value',
          },
          {
            type: 'value',
            position: 'right',
            splitLine: {
              show: false,
            },
          },
        ],
        dataZoom: [
          {
            type: 'inside', //slider表示有滑动块的，inside表示内置的
            show: false,
            xAxisIndex: 0,
            start: 0,
            end: 50,
          },
        ],
        series: [
          {
            name: '1',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: '',
              },
            },
            barMaxWidth: 20, //柱状宽
            data: radarDataAvg,
          },
          {
            name: '2',
            smooth: true,
            type: 'line',
            symbolSize: 10,
            yAxisIndex: 1,
            lineStyle: {
              normal: {
                width: 2, //设置线宽
                shadowColor: 'rgba(0,0,0,0.4)',
              },
            },
            data: lineDataAvg,
          },
        ],
      };
      if (option) {
        myChart.setOption(option);
      }
    },
  },
  mounted() {
    this.divEcharts();
  },
  created() {},
};
</script>

<style>
</style>