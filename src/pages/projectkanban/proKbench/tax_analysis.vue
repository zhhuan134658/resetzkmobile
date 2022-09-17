<template>
  <!-- 税务分析 -->
  <div id="Project_board">
    <comfont :fontdata="'税务分析'"></comfont>
    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>
    <!-- 销项税分析 -->
    <comfont :fontdata="'销项税分析'"></comfont>
    <commonlist :tableList="tableList4" :listList="listList"> </commonlist>
  </div>
</template>

<script>
import commonlist from './comoldlist.vue';
import commtitle from './comtitle.vue';
import comfont from './comfont.vue';
export default {
  components: { commonlist, comfont, commtitle },
  data() {
    return {
      iteminfo: {},

      tableList4: [],
      project_id: this.$route.query.proitem.project_name,
      project_name: this.$route.query.proitem.id,
      listList: [
        {
          listname: '标题:',
          val: 'riqi',
        },
        {
          listname: '销项发票额:',
          val: 'xiaox_money',
        },
        {
          listname: '销项税率:',
          val: 'xiaox_lv',
        },
        {
          listname: '销项税额:',
          val: 'xiaox_shui',
        },
      ],
      titleData: {
        revenue_money: 0, //收入合同金额
        collection_money: 0, //收款金额
        xiaox_money: 0, //销项发票
        xiaox_shui: 0, //销项税额
        kai_nopay: 0, //已开票未收款
        expenditure_ht_money: 0, //支出合同金额
        pay_money: 0, //支出金额
        jinx_money: 0, //进项发票
        jinx_shui: 0, //进项税额
        shou_nopay: 0, //已收票未支付
      },
      titleAllList: [
        {
          title: '收入合同金额',
          value: 'revenue_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//FDenAfQbFY1663404450770.png',
        },
        {
          title: '收款金额',
          value: 'collection_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//cZZhX2MGyc1663404451173.png',
        },
        {
          title: '销项发票',
          value: 'xiaox_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//6ijJRpxr5r1663404451479.png',
        },
        {
          title: '销项税额',
          value: 'xiaox_shui',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//MABJTjZEKj1663404451777.png',
        },
        {
          title: '已开票未收款',
          value: 'kai_nopay',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//fN5S6fKNcT1663404451933.png',
        },
        {
          title: '支出合同金额',
          value: 'expenditure_ht_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//8irp77RZeT1663404452287.png',
        },
        {
          title: '支出金额',
          value: 'pay_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//FDenAfQbFY1663404450770.png',
        },
        {
          title: '进项发票',
          value: 'jinx_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//cZZhX2MGyc1663404451173.png',
        },
        {
          title: '进项税额',
          value: 'jinx_shui',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//8eRrnEixDF1663404452476.png',
        },
        {
          title: '已收票未支付',
          value: 'shou_nopay',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//KHMm8epnQj1663404451626.png',
        },
      ],
      topIinfo: {},
    };
  },
  methods: {
    //   获取顶部信息
    getTopInfo() {
      this.axiosPost('/bulletin/taxInvoiceInfo', {
        project_id: this.project_id,
        project_name: this.project_name,
      }).then(res => {
        this.topIinfo = res.data.data;
      });
    },

    getqualityProblem2() {
      this.axiosPost('/bulletin/taxInvoiceXiaox', {
        project_id: this.project_id,
        project_name: this.project_name,
        page: 1,
        number: 100000,
      }).then(res => {
        // this.tableList4 = [
        //   {
        //     riqi: '日期',
        //     xiaox_money: '销项发票额',
        //     xiaox_lv: '销项税率',
        //     xiaox_shui: '销项税额',
        //   },
        // ];
        this.tableList4 = res.data.data;
      });
    },
  },
  created() {
    this.iteminfo = this.$route.query.proitem;
    this.project_id = this.iteminfo.id;
    this.project_name = this.iteminfo.project_name;

    this.getTopInfo();

    this.getqualityProblem2();
  },
};
</script>       

<style>
</style>