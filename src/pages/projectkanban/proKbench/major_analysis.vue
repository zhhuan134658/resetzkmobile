<!-- 劳务分析 -->
<template>
  <div id="">
    <comfont :fontdata="'劳务分析'"></comfont>
    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>

    <!-- 合同分析 -->
    <comfont :fontdata="'合同分析'"></comfont>
    <commonlist :tableList="tableList4" :listList="listList"> </commonlist>

    <comfont :fontdata="'劳务合同分析'"></comfont>
    <commonlist :tableList="tableList3" :listList="listList3"> </commonlist>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import comfont from './comfont.vue';
import commtitle from './comtitle.vue';
import commonlist from './comoldlist.vue';

export default {
  components: { comfont, commtitle, commonlist },

  name: '',
  data() {
    return {
      apiData: {
        project_id: this.$route.query.proitem.project_name,
        project_name: this.$route.query.proitem.id,
      },
      titleAllList: [
        {
          title: '劳务合同金额',
          value: 'ht_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//FDenAfQbFY1663404450770.png',
        },
        {
          title: '合同份数',
          value: 'ht_number',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//cZZhX2MGyc1663404451173.png',
        },
        {
          title: '关联企业（家)',
          value: 'qy_number',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//wcwDkNTRTK1663404451332.png',
        },
        {
          title: '累计入场工',
          value: 'worker_number',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//6ijJRpxr5r1663404451479.png',
        },
        {
          title: '结算金额',
          value: 'sett_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//MABJTjZEKj1663404451777.png',
        },
        {
          title: '已支付金额',
          value: 'paid_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//KHMm8epnQj1663404451626.png',
        },
        {
          title: '待支付金额',
          value: 'no_paid_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//fN5S6fKNcT1663404451933.png',
        },
        {
          title: '零星用工金额',
          value: 'spo_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//RJFS86pJan1663404452083.png',
        },
        {
          title: '自有工人金额',
          value: 'workers_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//8irp77RZeT1663404452287.png',
        },
        {
          title: '总支付金额',
          value: 'zong_paid_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//8irp77RZeT1663404452287.png',
        },
      ],
      titleData: {
        ht_money: 0, //劳务合同金额
        ht_number: 0, //合同份数
        qy_number: 0, //关联企业（家)
        worker_number: 0, //累计入场工人
        sett_money: 0, //结算金额
        paid_money: 0, //已支付金额
        no_paid_money: 0, //待支付金额
        spo_money: 0, //零星用工支付金额
        workers_money: 0, //自有工人支付金额
        zong_paid_money: 0, //总支付金额
      },
      tableList4: [],
      listList: [
        {
          listname: '签约单位:',
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
          listname: '付款金额:',
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
      tableList3: [],
      listList3: [
        {
          listname: '项目名称:',
          val: 'project_name',
        },
        {
          listname: '签证名称:',
          val: 'visa_name',
        },
        {
          listname: '所属劳务合同:',
          val: 'contract_name',
        },
        {
          listname: '签证金额:',
          val: 'visa_money',
        },

        {
          listname: '签证负责人:',
          val: 'visasigned_by',
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
      this.axiosPost('/bulletin/labourInfo', this.apiData).then(res => {
        this.titleData = res.data.data;
      });
    },
    getqualityProblem2() {
      let newapidata = Object.assign(this.apiData, { page: 1, number: 100000 });
      this.axiosPost('/bulletin/labourContractAnalysisUnit', newapidata).then(
        res => {
          this.tableList4 = res.data.data;
        },
      );
    },
    getqualityProblem3() {
      let newapidata = {
        b_name: 'laborcontract_visa',
        number: 777777,
        page: 1,
      };

      this.axiosPost('/project/projectList', newapidata).then(res => {
        this.tableList3 = res.data.data.data;
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getTopInfo();
    this.getqualityProblem2();
    this.getqualityProblem3();
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