<!--  -->
<template>
  <div id="">
    <div class="titltione">
      <div class="titltitwo">
        <div class="van-hairline--top"></div>
        <van-row>
          <van-col class="itemone" span="8">
            <van-row>
              <van-col span="8">累计收款</van-col>
              <van-col span="8">
                <div class="itemitem">合同收款</div>
                <div class="van-hairline--top"></div>
                <div class="itemitem">合同外收款</div>
              </van-col>
              <van-col span="8">
                <div class="itemitem itemcolor">
                  {{ titleData.contract_collection_money || 0 }}
                </div>
                <div class="van-hairline--top"></div>
                <div class="itemitem itemcolor">
                  {{ titleData.contract_collection_out || 0 }}
                </div></van-col
              >
            </van-row>
          </van-col>
          <van-col class="itemone" span="8">
            <van-row>
              <van-col span="8">累计付款</van-col>
              <van-col span="8">
                <div class="itemitem">合同付款</div>
                <div class="van-hairline--top"></div>
                <div class="itemitem">其他付款</div>
              </van-col>
              <van-col span="8">
                <div class="itemitem itemcolor">
                  {{ titleData.contract_payment || 0 }}
                </div>
                <div class="van-hairline--top"></div>
                <div class="itemitem itemcolor">
                  {{ titleData.other_payment || 0 }}
                </div></van-col
              >
            </van-row>
          </van-col>
          <van-col class="itemone" span="8">
            <van-row>
              <van-col span="12">现金流差</van-col>
              <van-col span="12" class="itemcolor">
                {{ titleData.cash_flow_cha || 0 }}
              </van-col>
            </van-row>
          </van-col>
        </van-row>
        <div class="van-hairline--top"></div>
        <van-row>
          <van-col class="itemone" span="8">
            <van-row>
              <van-col span="8">收入结算</van-col>
              <van-col span="8">
                <div class="itemitem">合同结算</div>
                <div class="van-hairline--top"></div>
                <div class="itemitem">合同外结算</div>
              </van-col>
              <van-col span="8">
                <div class="itemitem itemcolor">
                  {{ titleData.shou_contract_sett || 0 }}
                </div>
                <div class="van-hairline--top"></div>
                <div class="itemitem itemcolor">
                  {{ titleData.shou_contract_sett_out || 0 }}
                </div></van-col
              >
            </van-row>
          </van-col>
          <van-col class="itemone" span="8">
            <van-row>
              <van-col span="8">支出结算</van-col>
              <van-col span="8">
                <div class="itemitem">合同结算</div>
                <div class="van-hairline--top"></div>
                <div class="itemitem">其他结算</div>
              </van-col>
              <van-col span="8">
                <div class="itemitem itemcolor">
                  {{ titleData.zhi_contract_sett || 0 }}
                </div>
                <div class="van-hairline--top"></div>
                <div class="itemitem itemcolor">
                  {{ titleData.zhi_other_sett || 0 }}
                </div></van-col
              >
            </van-row>
          </van-col>
          <van-col class="itemone" span="8">
            <van-row>
              <van-col span="12">结算差</van-col>
              <van-col span="12" class="itemcolor">
                {{ titleData.settlement_cha || 0 }}
              </van-col>
            </van-row>
          </van-col>
        </van-row>
        <div class="van-hairline--top"></div>
        <van-row>
          <van-col class="itemtwo" span="8">
            <van-row>
              <van-col span="16">应收账款</van-col>
              <van-col span="8" class="itemcolor">{{
                titleData.accounts_receivable || 0
              }}</van-col>
            </van-row>
          </van-col>
          <van-col class="itemtwo" span="8">
            <van-row>
              <van-col span="16">应付账款</van-col>
              <van-col span="8" class="itemcolor">{{
                titleData.accounts_payable || 0
              }}</van-col>
            </van-row>
          </van-col>
          <van-col class="itemtwo" span="8">
            <van-row>
              <van-col span="12">利润率</van-col>
              <van-col span="12" class="itemcolor">{{
                titleData.li_run_lv || 0
              }}</van-col>
            </van-row>
          </van-col>
        </van-row>
        <div class="van-hairline--top"></div>
      </div>
      <div class="van-hairline--top"></div>
    </div>

    <!-- <comfont :fontdata="'经营分析'"></comfont> -->

    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>
    <!-- 成本问题分析 -->
    <comfont :fontdata="'现金流分析'"></comfont>
    <commoneacharts
      :key="pierceTableid"
      :eachid="casw"
      :eachartData="eachartData"
      :tableList="tableList"
      :tableName="tableName"
      :fatherMethod="getqualityProblem"
    ></commoneacharts>
    <!-- 产值结算分析 -->
    <comfont :fontdata="'产值结算分析'"></comfont>

    <commoneacharts
      :key="pierceTableid1"
      :eachid="'dweqasd'"
      :eachartData="eachartData1"
      :tableList="tableList1"
      :tableName="tableName1"
      :fatherMethod="getqualityProblem1"
    ></commoneacharts>
    <!-- 应收账款分析 -->
    <comfont :fontdata="'应收账款分析'"></comfont>

    <commoneacharts
      :key="pierceTableid2"
      :eachid="'dwsdaeqasd'"
      :eachartData="eachartData2"
      :tableList="tableList2"
      :tableName="tableName2"
      :fatherMethod="getqualityProblem2"
    ></commoneacharts>
    <!-- 应付账款分析 -->
    <comfont :fontdata="'应付账款分析'"></comfont>

    <commoneacharts
      :key="pierceTableid3"
      :eachid="'aeqasd'"
      :eachartData="eachartData3"
      :tableList="tableList3"
      :tableName="tableName3"
      :fatherMethod="getqualityProblem3"
    ></commoneacharts>
    <!-- 预期利润分析 -->
    <comfont :fontdata="'实际利润分析'"></comfont>

    <commoneacharts
      :key="pierceTableid4"
      :eachid="'aeqaerwesd'"
      :eachartData="eachartData4"
      :tableList="tableList4"
      :tableName="tableName4"
      :fatherMethod="getqualityProblem4"
    ></commoneacharts>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import comfont from './comfont.vue';
import commtitle from './comtitle.vue';
import commoneacharts from './commoneacharts.vue';
export default {
  components: { comfont, commtitle, commoneacharts },

  name: '',
  data() {
    return {
      apiData: {
        project_name: this.$route.query.proitem.project_name,
        project_id: this.$route.query.proitem.id,
      },
      titleAllList: [
        {
          title: '累计收入',
          value: 'lj_income',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//QQjan8xTz31654650015155.png',
        },
        {
          title: '累计支出',
          value: 'lj_expenditure',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//nC7f5XK8d21654650480253.png',
        },
        {
          title: '现金流差',
          value: 'cash_flow_cha',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//WBSbGRBNMd1654649959911.png',
        },
        {
          title: '收入结算',
          value: 'income_settlement',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pem7iadhHd1654649982399.png',
        },
        {
          title: '支出结算',
          value: 'expenditure_settlement',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//AHJseCJA3e1654649924458.png',
        },
        {
          title: '结算差',
          value: 'settlement_cha',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//YYc5Rdad5S1654650000501.png',
        },
        {
          title: '应收账款',
          value: 'accounts_receivable',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//CpMR376Pr51654649861721.png',
        },
        {
          title: '应付账款',
          value: 'accounts_payable',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//YARffGZB5b1654649906094.png',
        },
        {
          title: '实际利润',
          value: 'li_run',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//ryH2zaFdZf1654650524340.png',
        },
      ],
      titleData: {
        contract_collection_money: 0, //合同收款
        contract_collection_out: 0, //合同外收款
        contract_payment: 0, //合同付款
        other_payment: 0, //其他付款
        shou_contract_sett: 0, //合同结算
        shou_contract_sett_out: 0, //合同外结算
        zhi_contract_sett: 0, //合同结算
        zhi_other_sett: 0, //其他结算
        accounts_receivable: 0, //应收账款
        accounts_payable: 0, //应付账款
        cash_flow_cha: 0, //现金流差
        settlement_cha: 0, //结算差（实际利润）
        li_run_lv: '100%', //利润率
      },
      activeindex2: 0,
      activeindex: 0,
      activeindex1: 0,
      casw: 'dasd',
      casw1: 'dweqasd',
      pierceTableid: +new Date(),
      pierceTableid1: +new Date(),
      pierceTableid2: +new Date(),
      pierceTableid3: +new Date(),
      pierceTableid4: +new Date(),
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
      eachartData4: {
        xList: [],
        yList: [],
        nameList: [],
      },
      tableList: [],
      tableList1: [],
      tableList2: [],
      tableList3: [],
      tableList4: [],
      titleone1: '直接费分析',

      tableName: [
        { name: '指标/月份', value: 'month' },
        { name: '累计收入', value: 'lj_income' },
        { name: '累计支出', value: 'lj_expenditure' },
        { name: '现金流差', value: 'cash_flow_cha' },
      ],
      tableName1: [
        { name: '指标/月份', value: 'month' },
        { name: '收入结算', value: 'income_settlement' },
        { name: '支出结算', value: 'expenditure_settlement' },
        { name: '结算差', value: 'settlement_cha' },
      ],
      tableName2: [
        { name: '指标/月份', value: 'month' },
        { name: '累计收入', value: 'contract_collection_money' },
        { name: '收入结算', value: 'income_settlement' },
        { name: '应收账款', value: 'accounts_receivable' },
      ],
      tableName3: [
        { name: '指标/月份', value: 'month' },
        { name: '累计结算', value: 'expenditure_settlement' },
        { name: '累计支出', value: 'lj_htzhi' },
        { name: '应收账款', value: 'accounts_payable' },
      ],
      tableName4: [
        { name: '指标/月份', value: 'month' },
        { name: '应收账款', value: 'accounts_receivable' },
        { name: '应付账款', value: 'accounts_payable' },
        { name: '实际利润', value: 'expected_profit' },
      ],
      titltList2: [
        { name: '整改数量', index: '0' },
        { name: '按经济损失', index: '1' },
      ],
      titltList: [
        { name: '成本整改图标分析', index: '0' },
        { name: '按负责人排名', index: '1' },
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
      this.axiosPost('/bulletin/manageInfo', this.apiData).then(res => {
        this.titleData = res.data.data;
      });
    },
    // 成本问题分析
    getqualityProblem() {
      this.axiosPost('/bulletin/manageCashflow', this.apiData).then(res => {
        this.tableList = res.data.data;

        this.eachartData.xList = [];
        this.eachartData.yList = [];
        this.eachartData.nameList = [];
        this.tableList.forEach(item => {
          this.eachartData.xList.push(item.lj_income);
          this.eachartData.yList.push(item.lj_expenditure);
          this.eachartData.nameList.push(item.month);
        });
        this.$nextTick(() => {
          this.pierceTableid = +new Date() + '2';
        });
      });
    },
    getqualityProblem1() {
      this.axiosPost('/bulletin/manageSettlement', this.apiData).then(res => {
        this.tableList1 = res.data.data;

        this.eachartData1.xList = [];
        this.eachartData1.yList = [];
        this.eachartData1.nameList = [];
        this.tableList1.forEach(item => {
          this.eachartData1.xList.push(item.income_settlement);
          this.eachartData1.yList.push(item.expenditure_settlement);
          this.eachartData1.nameList.push(item.month);
        });
        this.$nextTick(() => {
          this.pierceTableid1 = +new Date() + 2;
        });
      });
    },
    getqualityProblem2() {
      this.axiosPost('/bulletin/manageAccountsReceivable', this.apiData).then(
        res => {
          this.tableList2 = res.data.data;

          this.eachartData2.xList = [];
          this.eachartData2.yList = [];
          this.eachartData2.nameList = [];
          this.tableList2.forEach(item => {
            this.eachartData2.xList.push(item.contract_collection_money);
            this.eachartData2.yList.push(item.income_settlement);
            this.eachartData2.nameList.push(item.month);
          });
          this.$nextTick(() => {
            this.pierceTableid2 = +new Date() + 2;
          });
        },
      );
    },
    getqualityProblem3() {
      this.axiosPost('/bulletin/manageAccountsPayable', this.apiData).then(
        res => {
          this.tableList3 = res.data.data;

          this.eachartData3.xList = [];
          this.eachartData3.yList = [];
          this.eachartData3.nameList = [];
          this.tableList3.forEach(item => {
            this.eachartData3.xList.push(item.expenditure_settlement);
            this.eachartData3.yList.push(item.lj_htzhi);
            this.eachartData3.nameList.push(item.month);
          });
          this.$nextTick(() => {
            this.pierceTableid3 = +new Date() + 3;
          });
        },
      );
    },
    getqualityProblem4() {
      this.axiosPost('/bulletin/manageExpectedprofit', this.apiData).then(
        res => {
          this.tableList4 = res.data.data;

          this.eachartData4.xList = [];
          this.eachartData4.yList = [];
          this.eachartData4.nameList = [];
          this.tableList4.forEach(item => {
            this.eachartData4.xList.push(item.shou_sett);
            this.eachartData4.yList.push(item.zhi_sett);
            this.eachartData4.nameList.push(item.month);
          });
          this.$nextTick(() => {
            this.pierceTableid4 = +new Date() + 4;
          });
        },
      );
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getTopInfo();
    this.getqualityProblem();
    this.getqualityProblem1();
    this.getqualityProblem2();
    this.getqualityProblem3();
    this.getqualityProblem4();
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
// 0 solid #ebedf0
.titltione {
  width: 100%;
  overflow: scroll;
  .titltitwo {
    width: 180%;
    font-size: 0.35rem;
    text-align: center;
    .van-col {
      border-left: 1px solid #ebedf0;
    }
    .itemone {
      line-height: 2rem;
    }
    .itemtwo {
      line-height: 1rem;
    }
    .itemitem {
      line-height: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .itemcolor {
      color: #409eff;
    }
  }
}
</style>