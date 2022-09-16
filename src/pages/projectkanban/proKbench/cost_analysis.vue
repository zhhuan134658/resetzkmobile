<!-- 成本分析 -->
<template>
  <div id="">
    <comfont :fontdata="'成本分析'"></comfont>
    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>
    <!-- 直接费分析 -->
    <div style="background-color: #fff">
      <comfont :fontdata="'直接费分析'"></comfont>
      <comecharts
        :cost="true"
        ref="comecharts"
        :earcherid="earcherid"
        :tablelist="tablelist"
        :tableclumes="tableclumes"
        :tableleftlist="tableleftlist"
        @getqualityProblem="getqualityProblem"
      ></comecharts>
    </div>

    <!-- 间接费分析 -->
    <div style="background-color: #fff">
      <comfont :fontdata="'间接费分析'"></comfont>
      <comecharts
        :cost="true"
        ref="comecharts"
        :earcherid="earcherid1"
        :tablelist="tablelist1"
        :tableclumes="tableclumes1"
        :tableleftlist="tableleftlist1"
        @getqualityProblem="getqualityProblem1"
      ></comecharts>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import comfont from './comfont.vue';
import commtitle from './comtitle.vue';
import comecharts from './comecharts.vue';

export default {
  components: { comfont, commtitle, comecharts },

  name: '',
  data() {
    return {
      apiData: {
        project_id: this.$route.query.proitem.project_name,
        project_name: this.$route.query.proitem.id,
      },
      titleAllList: [
        {
          title: '直接成本预算',
          value: 'zhi_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '间接成本预算',
          value: 'jian_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '直接费实际支出',
          value: 'zhi_sj_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '间接费实际支出',
          value: 'jian_sj_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
      ],
      titleData: {},
      //直接费分析
      earcherid: 'earcheridb',

      tableclumes: [], //统计表下方表格的字段

      tableleftlist: [
        //统计表下方表格的左侧显示
        { name: '指标/类型', isshow: true },
        { name: '直接成本预算', isshow: true },
        { name: '直接实际支出', isshow: true },
        { name: '差额', isshow: true },
      ],
      tablelist: [], //统计表下方表格数据
      //直接费分析
      earcherid1: 'earcheridbnn',

      tableclumes1: [], //统计表下方表格的字段

      tableleftlist1: [
        //统计表下方表格的左侧显示
        { name: '指标/类型', isshow: true },
        { name: '间接成本预算', isshow: true },
        { name: '间接实际支出', isshow: true },
        { name: '差额', isshow: true },
      ],
      tablelist1: [], //统计表下方表格数据
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
      this.axiosPost('/bulletin/costInfo', this.apiData).then(res => {
        this.titleData = res.data.data;
      });
    },
    //直接费分析
    getqualityProblem() {
      this.axiosPost('/bulletin/costDirect', this.apiData).then(res => {
        let resDATA = res.data.data;

        this.tablelist = resDATA;

        let earchList = [['标题', '直接成本预算', '直接实际支出']];

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
    //   间接费分析
    getqualityProblem1() {
      this.axiosPost('/bulletin/costIndirect', this.apiData).then(res => {
        let resDATA = res.data.data;

        this.tablelist = resDATA;

        let earchList = [['标题', '间接成本预算', '间接实际支出']];

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
          this.$refs.comecharts.getearchdata(earchList, this.earcherid1);
        });
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getTopInfo();
    this.getqualityProblem();
    this.getqualityProblem1();
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