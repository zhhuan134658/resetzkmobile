<!-- 质量分析 -->
<template>
  <div id="qualityanalysis">
    <!-- 标题 -->

    <comfont :fontdata="'质量分析'"></comfont>
    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>
    <!-- 质量问题分析 -->
    <div style="background-color: #fff">
      <comfont :fontdata="'质量问题分析'"></comfont>
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

    <!-- 质量事故分析 -->
    <div style="background-color: #fff">
      <comfont :fontdata="'质量事故分析'"></comfont>
      <comecharts
        ref="comecharts"
        :earcherid="earcherid1"
        :topList="topList1"
        :tablelist="tablelist1"
        :tableclumes="tableclumes1"
        :tableleftlist="tableleftlist1"
        @getqualityProblem="getqualityProblem1"
      ></comecharts>
    </div>
    <!-- 安全问题关联排名 -->
    <div>
      <comfont :fontdata="'安全问题关联排名'"></comfont>
      <comlist :botmlist="botmlist" :listList="listList"></comlist>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';

import F2 from '@antv/f2';
import comfont from './comfont.vue';
import commtitle from './comtitle.vue';
import comlist from './comlist.vue';

import comecharts from './comecharts.vue';
export default {
  components: { commtitle, comecharts, comfont, comlist },

  name: '',
  data() {
    return {
      echartskey: '',
      apiData: {
        project_id: this.$route.query.proitem.project_name,
        project_name: this.$route.query.proitem.id,
      },

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

      tableleftlist: [
        //统计表下方表格的左侧显示
        { name: '指标/类型', isshow: true },
        { name: '质量整改通知条数', isshow: true },
        { name: '质量整改回复条数', isshow: true },
        { name: '整改比率', isshow: true },
      ],
      tablelist: [], //统计表下方表格数据
      //质量事故分析
      earcherid1: 'earcherid1',
      topList1: [
        //选项
        {
          name: '事故图表分析',
        },
        {
          name: '按负责人排名',
        },
      ],
      tableclumes1: [], //统计表下方表格的字段
      tableleftlist1: [
        //统计表下方表格的左侧显示
        { name: '指标/类型', isshow: true },
        { name: '事故数量', isshow: true },
        { name: '事故金额', isshow: true },
        { name: '整改比率', isshow: false },
      ],
      tablelist1: [], //统计表下方表格数据
      //安全问题关联排名
      topList2: [
        //选项
        {
          name: '按整改数量分析',
        },
        {
          name: '按经济损失分析',
        },
      ],
      botmlist: [],
      listList: [
        {
          listname: '公司名称:',
          val: 'unit',
        },
        {
          listname: '整改数量:',
          val: 'rectify_count',
        },
        {
          listname: '有无其他合作项目:',
          val: 'is_coop',
        },
      ],
      //
      data: [],
      titleAllList: [
        {
          title: '质量检查条数',
          value: 'quality_count',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '质量整改通知条数',
          value: 'rectify_notice_count',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '质量整改回复条数',
          value: 'rectify_reply_count',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '质量事故条数',
          value: 'quality_accident_count',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '事故金额(元)',
          value: 'quality_accident_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
      ],
      titleData: {
        quality_count: '', //质量检查条数
        rectify_notice_count: '', //质量整改通知条数
        rectify_reply_count: '', //质量整改回复条数
        quality_accident_count: '', //质量事故条数
        quality_accident_money: '', //事故金额
      },
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    //质量检查信息
    getqualityInfo() {
      this.axiosPost('/bulletin/qualityInfo', this.apiData).then(res => {
        this.titleData = res.data.data;

        // console.log('55555', Object.keys(res.data.data));
      });
    },
    //质量问题分析
    getqualityProblem(active) {
      let newapiData = Object.assign(this.apiData, { type: active + 1 });
      this.axiosPost('/bulletin/qualityProblem', newapiData).then(res => {
        this.echartskey = new Date() + 1;
        let resDATA = res.data.data;
        // let resDATA = [
        //   {
        //     type: '木工', //类型
        //     accident_count: '3', //事故数量
        //     accident_money: '4', //事故金额
        //   },
        // ];
        this.tablelist = resDATA;

        let earchList = [['标题', '质量整改通知条数', '质量整改回复条数']];

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
    //质量事故分析
    getqualityProblem1(active) {
      let newapiData = Object.assign(this.apiData, { type: active + 1 });
      this.axiosPost('/bulletin/qualityAccidentProblem', newapiData).then(
        res => {
          this.echartskey = new Date() + 2;
          let resDATA = res.data.data;
          // let resDATA = [
          //   {
          //     type: '木工', //类型
          //     accident_count: '3', //事故数量
          //     accident_money: '4', //事故金额
          //   },
          // ];
          this.tablelist = resDATA;

          let earchList = [['标题', '事故数量', '事故金额']];

          if (resDATA.length > 0) {
            resDATA.forEach(item => {
              // console.log('77777', Object.keys(item));
              this.tableclumes1 = Object.keys(item);

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
        },
      );
    },
    //安全问题被检查单位排名
    getqualityUnitProblem(active) {
      let newapiData = Object.assign(this.apiData, {
        type: active + 1,
        page: 1,
        number: 999,
      });
      this.axiosPost('/bulletin/qualityUnitProblem', newapiData).then(res => {
        this.botmlist = res.data.data.data;
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log('质量分析');
  },
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getqualityInfo();
    this.getqualityProblem(0);
    this.getqualityProblem1(0);
    this.getqualityUnitProblem(0);
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