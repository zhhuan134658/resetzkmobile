<template>
  <!-- 支出分析 -->
  <div id="">
    <comfont :fontdata="'支出分析'"></comfont>
    <div class="outinfo">
      <div class="outinfo_con">
        <van-row>
          <van-col span="4" class="backColor onecol">累计支付金额(元):</van-col>
          <van-col span="2" class="onecol">{{ topIinfo.lj_money }}</van-col>
          <van-col span="18">
            <van-row>
              <van-col span="4" class="backColor twocol">直接费(元):</van-col>
              <van-col span="3" class="twocol">{{
                topIinfo.zhi_money
              }}</van-col>
              <van-col span="4">
                <div class="backColor threecol">劳务(元):</div>
                <div class="threecol">{{ topIinfo.service_zhi }}</div>
              </van-col>
              <van-col span="3">
                <div class="backColor threecol">材料(元):</div>
                <div class="threecol">{{ topIinfo.material_zhi }}</div>
              </van-col>
              <van-col span="3">
                <div class="backColor threecol">分包(元):</div>
                <div class="threecol">{{ topIinfo.sub_zhi }}</div>
              </van-col>
              <van-col span="4">
                <div class="backColor threecol">租赁/机械(元):</div>
                <div class="threecol">{{ topIinfo.lease_zhi }}</div>
              </van-col>
              <van-col span="3">
                <div class="backColor threecol">其他(元):</div>
                <div class="threecol">{{ topIinfo.other_jian }}</div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="4" class="backColor twocol">间接费(元):</van-col>
              <van-col span="3" class="twocol">{{
                topIinfo.jian_money
              }}</van-col>
              <van-col span="4">
                <div class="backColor threecol">企业管理费(元):</div>
                <div class="threecol">{{ topIinfo.qy_jian }}</div>
              </van-col>
              <van-col span="3">
                <div class="backColor threecol">规费(元):</div>
                <div class="threecol">{{ topIinfo.gui_jian }}</div>
              </van-col>
              <van-col span="3">
                <div class="backColor threecol">税金(元):</div>
                <div class="threecol">{{ topIinfo.shui_jian }}</div>
              </van-col>
              <van-col span="4">
                <div class="backColor threecol">其他(元):</div>
                <div class="threecol">{{ topIinfo.other_zhi }}</div>
              </van-col>
              <van-col span="3"> </van-col>
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="4" class="backColor twocol">已结算产值(元):</van-col>
          <van-col span="4" class="twocol">{{ topIinfo.settlement }}</van-col>
          <van-col span="4" class="backColor twocol"
            >剩余未支付金额(元):</van-col
          >
          <van-col span="4" class="twocol">{{ topIinfo.no_pay_money }}</van-col>
          <van-col span="4" class="backColor twocol">支付比率:</van-col>
          <van-col span="4" class="twocol">{{ topIinfo.bi_lv }}</van-col>
        </van-row>
      </div>
    </div>
    <comfont :fontdata="'直接费数据分析'"></comfont>
    <!-- 直接费数据分析 -->
    <commoneacharts
      :key="pierceTableid"
      :activeindex="activeindex"
      :eachid="casw"
      :eachartData="eachartData"
      :tableList="tableList"
      :tableName="tableName"
      :fatherMethod="getqualityProblem"
    ></commoneacharts>

    <!-- 间接费数据分析 -->
    <comfont :fontdata="'间接费数据分析'"></comfont>

    <commoneacharts
      :key="pierceTableid1"
      :activeindex="activeindex1"
      :eachid="'dweqasdasda'"
      :eachartData="eachartData1"
      :tableList="tableList"
      :tableName="tableName1"
      :fatherMethod="getqualityProblem1"
    ></commoneacharts>
    <!-- 支付数据分析 -->
    <comfont :fontdata="'支付数据分析'"></comfont>
    <commoneacharts
      :key="pierceTableid2"
      :activeindex="activeindex2"
      :eachid="'dwefg'"
      :titltList="titltList"
      :eachartData="eachartData2"
      :tableList="tableList2"
      :tableName="tableName2"
      :fatherMethod="getqualityProblem2"
    ></commoneacharts>
    <!-- 结算数据分析 -->
    <comfont :fontdata="'结算数据分析'"></comfont>
    <commoneacharts
      :key="pierceTableid3"
      :activeindex="activeindex3"
      :eachid="'dwdfdefgoo'"
      :titltList="titltList"
      :eachartData="eachartData3"
      :tableList="tableList3"
      :tableName="tableName3"
      :fatherMethod="getqualityProblem3"
    ></commoneacharts>

    <!-- <commonlist
      :title="'安全问题关联单位排名'"
      :tableList="tableList4"
      :listList="listList"
    >
    </commonlist> -->
  </div>
</template>

<script>
import commoneacharts from './commoneacharts.vue';
import comfont from './comfont.vue';
// import commonlist from './commonlist.vue';
// import './index.less';
export default {
  components: { commoneacharts, comfont },
  data() {
    return {
      iteminfo: {},
      project_id: '',
      project_name: '',
      activeindex: 0,
      activeindex1: 0,
      activeindex2: 0,
      activeindex3: 0,
      activeindex4: 0,
      casw: 'd111asd',
      casw1: 'dweqasd',
      pierceTableid: +new Date(),
      pierceTableid1: +new Date(),
      pierceTableid2: +new Date(),
      pierceTableid3: +new Date(),
      eachartData: {
        xList: [],
        yList: [],
        nameList: [],
      },
      eachartData1: {
        xList: [],
        yList: [],
        nameList: [],
      },
      eachartData2: {
        xList: [],
        yList: [],
        nameList: [],
      },
      eachartData3: {
        xList: [],
        yList: [],
        nameList: [],
      },
      tableList: [],
      tableList1: [],
      tableList2: [],
      tableList3: [],
      tableList4: [],

      tableName: [
        { name: '指标/类型', value: 'type' },
        { name: '已支付金额', value: 'zhi_money' },
        { name: '已结算产值', value: 'sett_money' },
        { name: '未支付金额', value: 'nopay_money' },
        { name: '支付比率', value: 'bi_lv' },
      ],
      tableName1: [
        { name: '指标/类型', value: 'type' },
        { name: '已支付金额', value: 'zhi_money' },
        { name: '已审批金额', value: 'shem_money' },
        { name: '未支付金额', value: 'nopay_money' },
        { name: '支付比率', value: 'bi_lv' },
      ],
      tableName2: [
        { name: '指标/月份', value: 'month' },
        { name: '支出金额', value: 'lj_money' },
        { name: '支付与预算比', value: 'bi_lv' },
      ],
      tableName3: [
        { name: '指标/月份', value: 'month' },
        { name: '结算金额', value: 'settlement' },
        { name: '结算与预算比', value: 'bi_lv' },
      ],
      titltList2: [
        { name: '整改数量', index: '0' },
        { name: '按经济损失', index: '1' },
      ],
      titltList: [
        { name: '2', index: '0' },
        { name: '3', index: '1' },
        { name: '5', index: '2' },
      ],
      titltList4: [
        { name: '整改数量', index: '0' },
        { name: '经济损失', index: '1' },
      ],
      listList: [
        {
          listname: '标题:',
          val: 'name',
        },
        {
          listname: '合同金额:',
          val: 'money',
        },
        {
          listname: '付款金额:',
          val: 'pay_money',
        },
        {
          listname: '已结算产值:',
          val: 'sett_money',
        },
        {
          listname: '合同未付款:',
          val: 'ht_nopay',
        },
        {
          listname: '结算未付款:',
          val: 'sett_nopay',
        },
        {
          listname: '合同支付比例:',
          val: 'ht_pay_bi',
        },
        {
          listname: '结算支付比例:',
          val: 'sett_pay_bi',
        },
      ],
      topList: [
        {
          name: '安全检查',
          content: 'quality_count',
          img: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ekzMKs83Zy1615168260242.png',
        },
        {
          name: '安全整改管理',
          content: 'rectify_notice_count',
          img: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ekzMKs83Zy1615168260242.png',
        },
        {
          name: '安全整改回复',
          content: 'rectify_reply_count',
          img: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ekzMKs83Zy1615168260242.png',
        },
        {
          name: '安全事故',
          content: 'quality_accident_count',
          img: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ekzMKs83Zy1615168260242.png',
        },
        {
          name: '经济损失(元)',
          content: 'quality_accident_money',
          img: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ekzMKs83Zy1615168260242.png',
        },
      ],
      topIinfo: {},
    };
  },
  methods: {
    //   获取顶部信息
    getTopInfo() {
      this.axiosPost('/bulletin/expenditureInfo', {
        project_id: this.project_id,
        project_name: this.project_name,
      }).then(res => {
        this.topIinfo = res.data.data;
      });
    },
    // 安全问题分析
    getqualityProblem() {
      this.axiosPost('/bulletin/expenditureZhiAnalysis', {
        project_id: this.project_id,
        project_name: this.project_name,
      }).then(res => {
        this.tableList = res.data.data;

        this.eachartData.xList = [];
        this.eachartData.yList = [];
        this.eachartData.nameList = [];
        this.tableList.forEach(item => {
          this.eachartData.xList.push(item.sett_money);
          this.eachartData.yList.push(item.zhi_money);
          this.eachartData.nameList.push(item.type);
        });
        this.$nextTick(() => {
          this.pierceTableid = +new Date() + '2';
        });
      });
    },

    getqualityProblem1() {
      this.axiosPost('/bulletin/expenditureJianAnalysis', {
        project_id: this.project_id,
        project_name: this.project_name,
        //   type: val, //	1按事故类型分析 2按负责人分析
      }).then(res => {
        this.tableList1 = res.data.data;

        this.eachartData1.xList = [];
        this.eachartData1.yList = [];
        this.eachartData1.nameList = [];
        this.tableList1.forEach(item => {
          this.eachartData1.xList.push(item.shen_money);
          this.eachartData1.yList.push(item.zhi_money);
          this.eachartData1.nameList.push(item.type);
        });
        this.$nextTick(() => {
          this.pierceTableid1 = +new Date() + 2;
        });
      });
    },
    getqualityProblem2(val) {
      this.activeindex2 = val - 1;
      let newYear = this.titltList[val - 1].name;
      this.axiosPost('/bulletin/expenditurePayData', {
        project_id: this.project_id,
        project_name: this.project_name,
        year: newYear,
      }).then(res => {
        this.tableList2 = res.data.data;
        this.eachartData2.xList = [];
        this.eachartData2.yList = [];
        this.eachartData2.nameList = [];
        this.tableList2.forEach(item => {
          this.eachartData2.xList.push(item.bi_lv || 0);
          this.eachartData2.yList.push(item.lj_money);
          this.eachartData2.nameList.push(item.month);
        });
        this.$nextTick(() => {
          this.pierceTableid2 = +new Date() + 3;
        });
      });
    },
    getqualityProblem3(val) {
      this.activeindex3 = val - 1;
      let newYear = this.titltList[val - 1].name;
      this.axiosPost('/bulletin/expenditureSettData', {
        project_id: this.project_id,
        project_name: this.project_name,
        year: newYear,
      }).then(res => {
        this.tableList3 = res.data.data;
        this.eachartData3.xList = [];
        this.eachartData3.yList = [];
        this.eachartData3.nameList = [];
        this.tableList3.forEach(item => {
          this.eachartData3.xList.push(item.bi_lv || 0);
          this.eachartData3.yList.push(item.settlement);
          this.eachartData3.nameList.push(item.month);
        });
        this.$nextTick(() => {
          this.pierceTableid3 = +new Date() + 4;
        });
      });
    },
    getqualityProblem4(val) {
      this.axiosPost('/bulletin/expenditureCompanyRanking', {
        project_id: this.project_id,
        project_name: this.project_name,
      }).then(res => {
        this.tableList4 = res.data.data;
      });
    },
  },
  created() {
    this.iteminfo = this.$route.query.proitem;
    this.project_id = this.iteminfo.id;
    this.project_name = this.iteminfo.project_name;
    var date = new Date();
    date.getFullYear(); //获取完整的年份(4位)
    console.log(date.getFullYear());
    this.titltList.forEach((item, index) => {
      item.name = date.getFullYear() - index;
    });
    console.log(this.titltList);
    this.getTopInfo();
    this.getqualityProblem();
    this.getqualityProblem1();
    this.getqualityProblem2(1);
    this.getqualityProblem3(1);
    this.getqualityProblem4(1);
  },
};
</script>

<style>
</style>