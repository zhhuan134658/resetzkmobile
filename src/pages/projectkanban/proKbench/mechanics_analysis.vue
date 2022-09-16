<!--专业分包分析  -->
<template>
  <div id="">
    <comfont :fontdata="'专业分包分析'"></comfont>
    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>
    <comfont :fontdata="'合同分析'"></comfont>
    <commonlist :tableList="tableList4" :listList="listList"> </commonlist>
    <div style="background-color: #fff">
      <comfont :fontdata="'分包结构数据'"></comfont>

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
  components: { comfont, commtitle, commonlist, comecharts },

  name: '',
  data() {
    return {
      earcherid: 'earc22he324rid',
      tablelist: [], //统计表下方表格数据
      tableclumes: [], //统计表下方表格的字段
      tableleftlist: [],
      topList: [],
      apiData: {
        project_id: this.$route.query.proitem.project_name,
        project_name: this.$route.query.proitem.id,
      },
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
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//YYc5Rdad5S1654650000501.png',
        },
        {
          title: '结算金额',
          value: 'settle_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//AHJseCJA3e1654649924458.png',
        },
        {
          title: '已支付金额',
          value: 'paid_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pem7iadhHd1654649982399.png',
        },
        {
          title: '待支付金额',
          value: 'no_paid_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//WBSbGRBNMd1654649959911.png',
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
      tableList4: [],
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
        {
          listname: '签约单位:',
          val: 'unit_name',
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
    //   获取顶部信息
    getTopInfo() {
      this.axiosPost('/bulletin/leaseInfo', this.apiData).then(res => {
        this.titleData = res.data.data;
      });
    },

    getqualityProblem2() {
      let newapidata = Object.assign(this.apiData, { page: 1, number: 100000 });

      this.axiosPost('/bulletin/leaseContractAnalysisUnit', newapidata).then(
        res => {
          this.tableList4 = res.data.data;
        },
      );
    },
    getqualityProblem(active) {
      let newapiData = Object.assign(this.apiData);
      this.axiosPost('/bulletin/leaseMainAnalysis', newapiData).then(res => {
        // this.echartskey = new Date() + 1;
        let resDATA = res.data.data;
        // let resDATA = [
        //   {
        //     name: 'c20混凝土', //材料名称
        //     size: 'c20', //规格型号
        //     unit: '吨', //单位
        //     supplier: null, //供应单位
        //     quantity: 0, //用量
        //     subtotal: 0, //合计
        //     jun_price: 0, //采购均价
        //     zh_plan_quantity: 0, //计划用量
        //     cha_er: 0, //计划用量差额
        //   },
        //   {
        //     name: 'c20混凝土', //材料名称
        //     size: 'c20', //规格型号
        //     unit: '吨', //单位
        //     supplier: null, //供应单位
        //     quantity: 0, //用量
        //     subtotal: 0, //合计
        //     jun_price: 0, //采购均价
        //     zh_plan_quantity: 0, //计划用量
        //     cha_er: 0, //计划用量差额
        //   },
        // ];
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
            seriesdata.push(Number(item.quantity));
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
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getTopInfo();
    this.getqualityProblem2();
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