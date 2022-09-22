<!-- 收入分析 -->
<template>
  <div id="">
    <comfont :fontdata="'收入分析'"></comfont>
    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>
    <!-- 详细情况 -->
    <comfont :fontdata="'详细信息'"></comfont>
    <div class="vantform">
      <div class="btncli" @click="fontClick">
        {{ isEdit ? '编辑' : '保存' }}
      </div>
      <van-form
        id="comForm"
        :show-error-message="false"
        :scroll-to-error="true"
      >
        <div v-for="(item, index) in contentList" :key="index">
          <van-field
            :readonly="isEdit"
            class="textarea"
            v-if="item.fieldtype == 'TextareaField'"
            v-model="contentInfo[item.content]"
            rows="2"
            autosize
            :label="item.name"
            type="textarea"
            maxlength="200"
            :placeholder="`请输入${item.name}`"
            show-word-limit
          />

          <van-field
            :readonly="isEdit"
            v-else
            v-model="contentInfo[item.content]"
            :name="item.name"
            maxlength="50"
            :label="item.name"
            :placeholder="`请输入${item.name}`"
            :rules="[{ required: item.fieldrequired }]"
          /></div
      ></van-form>
    </div>
    <!-- <div class="div_content">
      <div class="div_one">
        <div></div>
        <div class="one_right">
          <span v-if="isEdit" @click="editinfo">编辑</span>
          <span v-else @click="save('2')">保存</span>
        </div>
      </div>
      <div v-for="(item, index) in contentList" :key="index">
        <div class="div_two topfor" v-if="notready.includes(item.name)">
          <van-field
            :label="item.name"
            readonly
            input-align="right"
            show-word-limit
            v-model="contentInfo[item.content]"
            placeholder="--"
          />
        </div>

        <div class="div_two topfor" v-else>
          <van-field
            :label="item.name"
            :readonly="isEdit"
            input-align="right"
            show-word-limit
            v-model="contentInfo[item.content]"
            placeholder="--"
          />
        </div>
      </div>


    </div> -->

    <!-- 安全问题分析 -->
    <comfont :fontdata="'安全问题分析'"></comfont>
    <commoneacharts
      :key="pierceTableid"
      :activeindex="activeindex"
      :eachid="casw"
      :eachartData="eachartData"
      :tableList="tableList"
      :titltList="titltList"
      :tableName="tableName"
      :fatherMethod="getqualityProblem"
    ></commoneacharts>
    <!-- 收入结算数据分析 -->
    <comfont :fontdata="'收入结算数据分析'"></comfont>
    <commoneacharts
      :key="pierceTableid1"
      :activeindex="activeindex1"
      :eachid="'dweqasd'"
      :title="'收入结算数据分析'"
      :eachartData="eachartData1"
      :tableList="tableList1"
      :titltList="titltList"
      :tableName="tableName1"
      :fatherMethod="getqualityProblem1"
    ></commoneacharts>

    <comfont :fontdata="'合同变更记录'"></comfont>
    <!-- 合同变更记录 -->
    <div class="div_eacharts">
      <div class="div_list">
        <div
          v-if="tableList2 && tableList2.length > 0"
          v-for="(item, index) in tableList2"
          class="list_item"
        >
          <div class="item_top">{{ item.project_name }}</div>

          <div class="cont_one">
            签证变更名称<span style="color: #0089ff">{{
              item.ivisa_name
            }}</span>
          </div>
          <div class="cont_one">
            所属合同<span style="color: #0089ff">{{ item.contract_name }}</span>
          </div>
          <div class="cont_one">
            合同金额<span style="color: #0089ff">{{
              item.contract_amount
            }}</span>
          </div>
          <div class="cont_one">
            签证金额<span style="color: #0089ff">{{ item.ivisa_money }}</span>
          </div>
        </div>

        <div v-else class="aaa">
          <img
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//EBC6ydZ7Tj1663407965807.png"
            alt=""
          />
          <!-- <div>暂时还没有数据哦~快去添加</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import comfont from './comfont.vue';
import commtitle from './comtitle.vue';
import commoneacharts from './commoneacharts.vue';
export default {
  components: { commtitle, comfont, commoneacharts },

  name: '',
  data() {
    return {
      iteminfo: {},
      project_id: '',
      project_name: '',

      apiData: {
        project_id: this.$route.query.proitem.id,
        project_name: this.$route.query.proitem.project_name,
      },
      titleAllList: [
        {
          title: '合同金额(元)',
          value: 'contract_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//FDenAfQbFY1663404450770.png',
        },
        {
          title: '履约保证金(元)',
          value: 'income_bond_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//cZZhX2MGyc1663404451173.png',
        },
        {
          title: '质保金(元)',
          value: 'income_warranty_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//wcwDkNTRTK1663404451332.png',
        },
        {
          title: '签约人',
          value: 'contract_signer',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//6ijJRpxr5r1663404451479.png',
        },
        {
          title: '签证金额(元)',
          value: 'income_visa_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//KHMm8epnQj1663404451626.png',
        },

        {
          title: '签证占比',
          value: 'visa_bi',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//MABJTjZEKj1663404451777.png',
        },
        {
          title: '结算产值(元)',
          value: 'sett_output',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//fN5S6fKNcT1663404451933.png',
        },
        {
          title: '累计回款(元)',
          value: 'contract_collection_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//RJFS86pJan1663404452083.png',
        },
        {
          title: '甲方欠款(元)',
          value: 'jia_arrears',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//8irp77RZeT1663404452287.png',
        },
        {
          title: '回款比率',
          value: 'payment_bi',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//8eRrnEixDF1663404452476.png',
        },
      ],
      titleData: {
        contract_money: '', //质量检查条数
        income_bond_money: '', //质量整改通知条数
        income_warranty_money: '', //质量整改回复条数
        contract_signer: '', //质量事故条数
        income_visa_money: '', //事故金额
        visa_bi: '',
        sett_output: '',
        contract_collection_money: '',
        jia_arrears: '',
        payment_bi: '',
      },
      notready: ['甲方：', '乙方：', '工期：'],
      titlelist: [
        { lablename: '项目:', data: 'project_name' },
        { lablename: '签证变更名称：', data: 'name' },
        { lablename: '签证编号：', data: 'number' },
        { lablename: '合同金额(元)：', data: 'extend_four' },
        { lablename: '签证金额(元)：', data: 'change_money' },
        { lablename: '审批状态：', data: 'status' },
      ],
      isEdit: true,
      contentInfo: {
        id: '',
        main_clause: '',
        sett_clause: '',
        pay_clause: '',
        breach_clause: '',
        jia_unit: '',
        plan_period: '',
        yi_unit: '',
      },
      contentList: [
        { name: '合同条款：', content: 'main_clause' },
        { name: '结算条款：', content: 'sett_clause' },
        { name: '付款条款：', content: 'pay_clause' },
        { name: '违约条款：', content: 'breach_clause' },
        // { name: "签约主体：", content: "construction_unit" },
        { name: '甲方：', content: 'jia_unit' },
        { name: '乙方：', content: 'yi_unit' },
        // { name: "总承包单位：", content: "zong_unit" },
        { name: '工期：', content: 'plan_period' },
      ],
      activeindex2: 0,
      activeindex: 0,
      activeindex1: 0,
      casw: 'dasd',
      casw1: 'dweqasd',
      pierceTableid: +new Date(),
      pierceTableid1: +new Date(),
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
      tableList: [],
      tableList1: [],
      tableList2: [],
      titleone: '工程回款数据分析',
      tableName1: [
        { name: '指标/月份', value: 'month' },
        { name: '结算金额', value: 'sett_output' },
        { name: '结算占合同比', value: 'lj_sett_bi' },
      ],
      tableName: [
        { name: '指标/月份', value: 'month' },
        { name: '回款金额', value: 'contract_collection_money' },
        { name: '签证金额', value: 'income_visa_money' },
        { name: '回款占合同比', value: 'lj_return_bi' },
      ],

      titltList: [
        { name: '202', index: '0' },
        { name: '201', index: '1' },
        { name: '200', index: '2' },
      ],
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    fontClick() {
      this.isEdit = !this.isEdit;
      if (this.isEdit) {
        this.save('2');
      } else {
        this.editinfo;
      }
    },
    //   获取顶部信息
    getTopInfo() {
      this.axiosPost('/bulletin/incomeInfo', this.apiData).then(res => {
        this.titleData = res.data.data;
        this.contentInfo = res.data.data;
      });
    },
    //   编辑项目情况
    editinfo() {
      this.isEdit = false;
    },
    save(val) {
      this.isEdit = true;
      if (val === '2') {
        this.contentInfo.project_id = this.project_id;
        this.contentInfo.project_name = this.project_name;
        this.saveInfo(this.contentInfo);
        console.log(this.contentInfo);
      }
    },
    saveInfo(val) {
      val.id = val.project_situation_id;
      this.axiosPost('/bulletin/incomeClauseAdd', val).then(res => {
        this.$toast(res.data.msg);
      });
    },

    // 安全问题分析
    getqualityProblem(val) {
      this.activeindex = val - 1;

      let newYear = this.titltList[val - 1].name;

      this.axiosPost('/bulletin/incomeReturnMoney', {
        project_id: this.project_id,
        project_name: this.project_name,
        year: newYear, //1按检查类型分析 2按负责人分析
      }).then(res => {
        this.tableList = res.data.data;

        this.eachartData.xList = [];
        this.eachartData.yList = [];
        this.eachartData.nameList = [];
        this.tableList.forEach(item => {
          this.eachartData.xList.push(item.contract_collection_money);
          this.eachartData.yList.push(item.income_visa_money);
          this.eachartData.nameList.push(item.month);
        });
        this.$nextTick(() => {
          this.pierceTableid = +new Date() + '2';
        });
      });
    },
    getqualityProblem1(val) {
      this.activeindex1 = val - 1;
      let newYear = this.titltList[val - 1].name;
      this.axiosPost('/bulletin/incomeRevenueSettlement', {
        project_id: this.project_id,
        project_name: this.project_name,
        year: newYear, //	1按事故类型分析 2按负责人分析
      }).then(res => {
        this.tableList1 = res.data.data;

        this.eachartData1.xList = [];
        this.eachartData1.yList = [];
        this.eachartData1.nameList = [];
        this.tableList1.forEach(item => {
          this.eachartData1.xList.push(item.sett_output);
          this.eachartData1.yList.push(item.lj_sett_bi);
          this.eachartData1.nameList.push(item.month);
        });
        this.$nextTick(() => {
          this.pierceTableid1 = +new Date() + 2;
        });
      });
    },
    getqualityProblem2() {
      this.axiosPost('/project/projectList', {
        //   project_id: this.project_id,
        //   project_name: this.project_name,
        page: 1,
        number: 999999,
        b_name: 'ivisa_contract',
      }).then(res => {
        this.tableList2 = res.data.data.data;
        console.log('sdasdasds', this.tableList2);
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.iteminfo = this.$route.query.proitem;
    this.project_id = this.iteminfo.id;
    this.project_name = this.iteminfo.project_name;

    var date = new Date();
    date.getFullYear(); //获取完整的年份(4位)
    console.log(date.getFullYear());
    this.titltList.forEach((item, index) => {
      item.name = date.getFullYear() - index;
      item.index = date.getFullYear() - index;
    });
    console.log(this.titltList);
    this.getTopInfo();
    this.getqualityProblem(1);
    this.getqualityProblem1(1);
    this.getqualityProblem2();
  },
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