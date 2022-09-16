<!-- 间接费分析 -->
<template>
  <div id="">
    <comfont :fontdata="'间接费分析'"></comfont>
    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>
    <!-- 间接费分析 -->
    <div style="background-color: #fff">
      <comfont :fontdata="'间接费分析'"></comfont>
      <comecharts
        :cost="true"
        ref="comecharts"
        :earcherid="earcherid"
        :topList="topList"
        :tablelist="tablelist"
        :tableclumes="tableclumes"
        :tableleftlist="tableleftlist"
        @getqualityProblem="getqualityProblem"
      ></comecharts>
    </div>
    <!-- 规费分析 -->
    <comfont :fontdata="'规费分析'"></comfont>

    <div class="div_eacharts">
      <div style="width: 100%; height: 360px" id="eachbing"></div>
      <div class="ezchers_t">
        <div v-if="tableList3 && tableList3.length > 0" class="ezchers_con">
          <div class="ezchers_con_left">
            <div class="ezchers_con_left_a" v-for="(item, index) in tableName8">
              {{ item.name }}
            </div>
          </div>
          <div class="ezchers_con_left" v-for="(item, index) in tableList3">
            <div
              v-for="(item1, index1) in tableName8"
              :class="
                index1 == 0
                  ? 'ezchers_con_left_a'
                  : 'ezchers_con_left_a ezchers_con_left_b'
              "
            >
              {{ item[item1.value] }}
            </div>
          </div>
        </div>
        <div v-else>
          <img
            src="http://oazhukuai.zzdingyun.com/app/dist/static/img/bianji1.f4d09d63.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import * as echarts from 'echarts';

import comfont from './comfont.vue';
import commtitle from './comtitle.vue';
import comecharts from './comecharts.vue';

export default {
  components: { comfont, commtitle, comecharts },

  name: '',
  data() {
    return {
      tableList3: [],
      tableName8: [
        { name: '名称', value: 'type' },
        { name: '金额', value: 'money' },
      ],
      eachartData: {
        xList: [],
        yList: [],
        nameList: [],
      },
      //间接费分析
      earcherid: 'earfgfdcherid',
      topList: [],
      tableclumes: [], //统计表下方表格的字段

      tableleftlist: [
        //统计表下方表格的左侧显示
        { name: '指标/类型', isshow: true },
        { name: '间接成本预算', isshow: true },
        { name: '间接费实际支出', isshow: true },
        { name: '差额', isshow: true },
      ],
      tablelist: [], //统计表下方表格数据
      apiData: {
        project_id: this.$route.query.proitem.project_name,
        project_name: this.$route.query.proitem.id,
      },
      titleAllList: [
        {
          title: '支出金额',
          value: 'zhi_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//WBSbGRBNMd1654649959911.png',
        },
        {
          title: '预算金额',
          value: 'yu_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ekzMKs83Zy1615168260242.png',
        },
        {
          title: '预算对比',
          value: 'bi_lv',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//QQjan8xTz31654650015155.png',
        },
      ],
      titleData: {
        zhi_money: 0, //支出金额
        yu_money: 0, //预算金额
        bi_lv: 0, //预算对比
      },
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    //   获取顶部信息
    getTopInfo() {
      this.axiosPost('/bulletin/indirectInfo', this.apiData).then(res => {
        this.titleData = res.data.data;
      });
    },
    //间接费分析
    getqualityProblem() {
      let newapiData = Object.assign(this.apiData);
      this.axiosPost('/bulletin/costIndirect', newapiData).then(res => {
        this.echartskey = new Date() + 1;
        let resDATA = res.data.data;

        // let resDATA = [
        //   {
        //     type: '企业管理费',
        //     ys_money: 50000,
        //     sj_money: 0,
        //     cha_money: 50000,
        //   },
        //   {
        //     type: '规费',
        //     ys_money: 30000,
        //     sj_money: 0,
        //     cha_money: 30000,
        //   },
        //   {
        //     type: '其他',
        //     ys_money: 0,
        //     sj_money: 0,
        //     cha_money: 0,
        //   },
        // ];
        this.tablelist = resDATA;

        let earchList = [['标题', '间接成本预算', '间接费实际支出']];

        if (resDATA.length > 0) {
          resDATA.forEach(item => {
            // console.log('77777', Object.keys(item));
            this.tableclumes = Object.keys(item);

            let newdata = [
              item.type,
              Number(item[Object.keys(item)[1]]),
              Number(item[Object.keys(item)[2]]),
            ];

            earchList.push(newdata);
          });
          //   console.log('44545earchList', earchList);
        } else {
          earchList = [
            ['示例数据1', 10, 20],
            ['示例数据2', 30, 40],
          ];
        }

        this.$nextTick(() => {
          this.$refs.comecharts.getearchdata(earchList, this.earcherid);
        });
      });
    },
    getzhu() {
      var chartDom = document.getElementById('eachbing');
      var myChart = echarts.init(chartDom);
      var option;

      this.axiosPost('/bulletin/indirectGuifee', this.apiData).then(res => {
        // this.tableList3 = res.data.data;
        // let alldata = res.data.data;

        let alldata = [
          {
            type: '社会保险费',
            sj_money: 0, //实际金额
            ys_money: 0, //预算金额
            cha_money: 0, //差额
          },
          {
            type: '住房公积金',
            sj_money: 0, //实际金额
            ys_money: 0, //预算金额
            cha_money: 0, //差额
          },
        ];
        this.tableList3 = [
          {
            type: '社会保险费',
            sj_money: 0, //实际金额
            ys_money: 0, //预算金额
            cha_money: 0, //差额
          },
          {
            type: '住房公积金',
            sj_money: 0, //实际金额
            ys_money: 0, //预算金额
            cha_money: 0, //差额
          },
        ];

        alldata.forEach(item => {
          item.value = item.sj_money;
          item.name = item.type;
        });
        option = {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: '5%',
            left: 'center',
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: alldata,
            },
          ],
        };
        option && myChart.setOption(option);
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getTopInfo();
    this.getqualityProblem();
    this.getzhu();
  },
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