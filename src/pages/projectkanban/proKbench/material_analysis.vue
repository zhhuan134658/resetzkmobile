<!--  -->
<template>
  <div id="">
    <comfont :fontdata="'材料分析'"></comfont>
    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>
    <!-- 合同分析 -->
    <comfont :fontdata="'合同分析'"></comfont>
    <commonlist :tableList="tableList4" :listList="listList"> </commonlist>
    <div style="background-color: #fff">
      <comfont :fontdata="'主要材料分析'"></comfont>

      <comecharts
        ref="comecharts"
        :earcherid="earcherid"
        :topList="topList"
        :tablelist="tablelist"
        :tableclumes="tableclumes"
        :tableleftlist="tableleftlist"
        @getqualityProblem="getqualityProblem"
      ></comecharts>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import comfont from './comfont.vue';
import commtitle from './comtitle.vue';
import commonlist from './comoldlist.vue';
import comecharts from './comechartsone.vue';
export default {
  components: { commtitle, comfont, commonlist, comecharts },

  title: '',
  data() {
    return {
      //质量问题分析
      earcherid: 'earcherid',
      topList: [
        //选项
        {
          name: '质量整改图表分析',
        },
        {
          name: '按负责人排名',
        },
      ],
      tableclumes: [], //统计表下方表格的字段

      tableleftlist: [],
      tablelist: [], //统计表下方表格数据
      listList: [
        {
          listname: '标题:',
          val: 'unit_name',
        },
        {
          listname: '签约时间:',
          val: 'riqi',
        },
        {
          listname: '合同金额:',
          val: 'ht_money',
        },
        {
          listname: '结算金额:',
          val: 'sett_money',
        },
        {
          listname: '已支付金额:',
          val: 'paid_money',
        },
        {
          listname: '收票金额:',
          val: 'shou_money',
        },
        {
          listname: '付款比率:',
          val: 'bi_lv',
        },
      ],
      tableList4: [],
      project_id: this.$route.query.proitem.project_name,
      project_name: this.$route.query.proitem.id,
      titleAllList: [
        {
          title: '合同总金额',
          value: 'contract_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//nC7f5XK8d21654650480253.png',
        },
        {
          title: '合同份数',
          value: 'ht_number',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//YARffGZB5b1654649906094.png',
        },
        {
          title: '关联企业（家)',
          value: 'qy_number',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//CpMR376Pr51654649861721.png',
        },
        {
          title: '结算金额',
          value: 'settle_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//YYc5Rdad5S1654650000501.png',
        },
        {
          title: '已支付金额',
          value: 'paid_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//AHJseCJA3e1654649924458.png',
        },
        {
          title: '待支付金额',
          value: 'no_paid_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ekzMKs83Zy1615168260242.png',
        },
      ],
      titleData: {
        contract_money: 0, //合同总金额
        ht_number: 0, //合同份数
        qy_number: 0, //关联企业（家)
        settle_money: 0, //结算金额
        paid_money: 0, //已支付金额
        no_paid_money: 0, //待支付金额
      },
      apiData: {
        project_id: this.$route.query.proitem.project_name,
        project_name: this.$route.query.proitem.id,
      },
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    getqualityProblem(active) {
      let newapiData = Object.assign(this.apiData);
      this.axiosPost('/bulletin/materialMainAnalysis', newapiData).then(res => {
        // this.echartskey = new Date() + 1;
        let resDATA = res.data.data;

        this.tablelist = resDATA;

        this.tableleftlist = [
          { lable: '材料名称', prop: 'name' },
          { lable: '规格型号', prop: 'size' },
          { lable: '单位', prop: 'unit' },
          { lable: '供应单位', prop: 'supplier' },
          { lable: '用量', prop: 'quantity' },
          { lable: '合计', prop: 'subtotal' },
          { lable: '采购均价', prop: 'jun_price' },
          { lable: '计划用量', prop: 'zh_plan_quantity' },
          { lable: '计划用量差额', prop: 'cha_er' },
        ];

        let xAxisdata = [];
        let seriesdata = [];
        if (resDATA.length > 0) {
          resDATA.forEach(item => {
            xAxisdata.push(item.name);
            seriesdata.push(Number(item.zh_plan_quantity));
          });
          //   console.log('44545earchList', earchList);
        } else {
          xAxisdata = ['示例数据1', '示例数据1', '示例数据3'];
          seriesdata = [120, 200, 150];
          this.tableleftlist = [];
        }

        this.$nextTick(() => {
          this.$refs.comecharts.getearchdata(
            xAxisdata,
            seriesdata,
            this.earcherid,
          );
        });
      });
    },
    //   获取顶部信息
    getTopInfo() {
      this.axiosPost('/bulletin/materialInfo', {
        project_id: this.project_id,
        project_name: this.project_name,
      }).then(res => {
        this.titleData = res.data.data;
      });
    },

    getqualityProblem2() {
      this.axiosPost('/bulletin/materialContractAnalysisUnit', {
        project_id: this.project_id,
        project_name: this.project_name,
        page: 1,
        number: 100000,
      }).then(res => {
        this.tableList4 = res.data.data;
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTopInfo();
  },
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getqualityProblem();
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