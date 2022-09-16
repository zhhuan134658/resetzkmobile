<template>
  <!-- 风险分析 -->
  <div id="Project_board">
    <comfont :fontdata="'经营分析'"></comfont>
    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>

    <!-- 总金额分析 -->
    <commonlist
      :activeindex="activeindex"
      :titltList="titltList"
      :title="'总金额分析'"
      :tableList="tableList4"
      :listList="listList"
      :fatherMethod="getqualityProblem2"
    >
    </commonlist>
  </div>
</template>

<script>
import comfont from './comfont.vue';
import commtitle from './comtitle.vue';

import commonlist from './comoldlist.vue';

export default {
  components: { commonlist, comfont, commtitle },
  data() {
    return {
      apiData: {
        project_name: this.$route.query.proitem.project_name,
        project_id: this.$route.query.proitem.id,
      },
      activeindex: 0,
      tableList4: [],
      titltList: [
        { name: '质量事故汇报', index: 0 },
        { name: '安全事故汇报', index: 1 },
      ],
      listList: [
        {
          listname: '标题:',
          val: 'accidenttitle',
        },
        {
          listname: '负责人：',
          val: 'send_name',
        },
        {
          listname: '事故等级：',
          val: 'accidentGrade',
        },
        {
          listname: '质量事故类型：',
          val: 'accidenttype',
        },
        {
          listname: '事故金额(元)：',
          val: 'accidenmoney',
        },
        {
          listname: '事故详情：',
          val: 't1',
        },
      ],
      titleAllList: [
        {
          title: '总金额(元)',
          value: 'accident_money',
          img: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//YARffGZB5b1654649906094.png',
        },
      ],
      titleData: {},
    };
  },
  methods: {
    //   获取顶部信息
    getTopInfo() {
      this.axiosPost('/bulletin/riskLoss', this.apiData).then(res => {
        this.titleData = res.data.data;
      });
    },

    getqualityProblem2(val) {
      this.activeindex = val - 1;

      this.axiosPost(val == 1 ? '/finance/zhilian' : '/finance/anquanzhilian', {
        //   project_id: this.project_id,
        proname: this.apiData.project_name,
        page: 1,
        number: 100000,
        corp_id: this.$store.state.userInfo.corpid,
        userid: this.$store.state.userInfo.userid,
      }).then(res => {
        this.tableList4 = res.data.content.list;
      });
    },
  },
  created() {
    // this.iteminfo = this.$store.state.userInfo.xminfo;
    // this.project_id = this.iteminfo.id;
    // this.project_name = this.iteminfo.name;

    this.getTopInfo();

    this.getqualityProblem2(1);
  },
};
</script>

<style>
</style>