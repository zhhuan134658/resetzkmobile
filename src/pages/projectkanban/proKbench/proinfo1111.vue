<!-- 项目简介 -->
<template>
  <div id="proinfo">
    <!-- 标题 -->

    <comfont :fontdata="'项目简介'"></comfont>

    <!-- 项目简介 -->
    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>
    <!-- 标题 -->

    <comfont :fontdata="'视频动态'"></comfont>

    <!-- 视频 -->
    <div class="div_video">
      <div
        style="
          width: 100%;
          height: 100%;
          background: #fff;
          font-size: 20px;
          line-height: 3rem;
        "
        v-if="video.url === ''"
      >
        暂无视频
      </div>
      <vueMiniPlayer
        v-else
        ref="vueMiniPlayer"
        :video="video"
        :mutex="true"
        @fullscreen="handleFullscreen"
      />
    </div>
    <!-- 标题 -->

    <comfont :fontdata="'详细情况'"></comfont>

    <div class="vantform">
      <div class="btncli" @click="fontClick">
        {{ readfont ? '编辑' : '保存' }}
      </div>
      <van-form
        id="comForm"
        :show-error-message="false"
        :scroll-to-error="true"
      >
        <div v-for="(item, index) in comForeList" :key="index">
          <van-field
            :readonly="readfont"
            class="textarea"
            v-if="item.fieldtype == 'TextareaField'"
            v-model="formData[item.filedmodel]"
            rows="2"
            autosize
            :label="item.fieldlable"
            type="textarea"
            maxlength="200"
            :placeholder="`请输入${item.fieldlable}`"
            show-word-limit
          />

          <van-field
            :readonly="readfont"
            v-else
            v-model="formData[item.filedmodel]"
            :name="item.fieldlable"
            maxlength="50"
            :label="item.fieldlable"
            :placeholder="`请输入${item.fieldlable}`"
            :rules="[{ required: item.fieldrequired }]"
          /></div
      ></van-form>
    </div>
    <!-- 标题 -->

    <comfont :fontdata="'数据分析'"></comfont>

    <div class="div_unit">
      <div class="unit_top">
        <div class="unit_top_left">
          <van-tabs
            color="#0089FF"
            title-active-color="#0089FF"
            @click="tabsChange"
          >
            <van-tab
              v-for="(item, index) in tabsList"
              :title="item.name"
              :key="index"
            >
            </van-tab>
          </van-tabs>
        </div>
        <div class="unit_top_right" @click="unitadd">
          <van-icon size="20" color="#0089FF" name="plus" />
        </div>
      </div>
      <div v-if="unitList && unitList.length == 0" class="unit_table">
        <img
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//EBC6ydZ7Tj1663407965807.png"
          alt=""
        />
        <!-- <div style="color: #909399">暂时还没有数据哦~快去添加</div> -->
      </div>
      <div class="unit_table">
        <div
          class="unit_table_item"
          v-for="(item, index) in unitList"
          :key="index"
        >
          <div class="unit_table_item_left">
            <div class="unit_table_item_left_one">张三</div>
            <div class="unit_table_item_left_two">职务：技术</div>
            <div class="unit_table_item_left_two">电话：13303772773</div>
          </div>
          <div class="unit_table_item_right">
            <van-icon name="ellipsis" size="20" />
          </div>
        </div>
      </div>
    </div>
    <!-- 项目大事记 -->

    <comfont :fontdata="'项目大事记'"></comfont>

    <div class="div_unit">
      <div class="unit_table">
        <div class="unit_table_item">
          <div class="unit_table_item_left">
            <div class="unit_table_item_left_one">张三</div>
            <div class="unit_table_item_left_two">职务：技术</div>
            <div class="unit_table_item_left_two">电话：13303772773</div>
          </div>
          <div class="unit_table_item_right">
            <van-icon name="ellipsis" size="20" />
          </div>
        </div>
        <div class="unit_table_item">
          <div class="unit_table_item_left">
            <div class="unit_table_item_left_one">张三</div>
            <div class="unit_table_item_left_two">职务：技术</div>
            <div class="unit_table_item_left_two">电话：13303772773</div>
          </div>
          <div class="unit_table_item_right">
            <van-icon name="ellipsis" size="20" />
          </div>
        </div>
      </div>
    </div>

    <van-popup v-model="unitshow" position="bottom" :style="{ height: '35%' }">
      <van-form
        id="comForm"
        validate-first
        @failed="onFailed"
        ref="addunitForm"
      >
        <van-field
          @click="opensheet"
          label="单位类型"
          v-model="addunitForm.unit_typename"
          name="unit_typename"
          placeholder="请选择"
          :rules="[{ message: '请输入正确内容' }]"
        />

        <van-field
          label="姓名"
          v-model="addunitForm.full_name"
          name="full_name"
          placeholder="请输入"
          :rules="[{ message: '请输入正确内容' }]"
        />

        <van-field
          label="职务"
          v-model="addunitForm.zhi_wu"
          name="zhi_wu"
          placeholder="请输入"
          :rules="[{ message: '请输入正确内容' }]"
        />
        <van-field
          label="电话"
          v-model="addunitForm.mobile"
          name="mobile"
          placeholder="请输入"
          :rules="[{ message: '请输入正确内容' }]"
        />
        <div style="margin: 16px" class="suitbtn">
          <van-button type="info" @click="onSubmit" native-type="submit"
            >提交</van-button
          >
          <van-button type="warning" @click="onEdit">取消</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import commtitle from './comtitle.vue';
import comfont from './comfont.vue';
export default {
  components: { commtitle, comfont },
  name: '',
  data() {
    return {
      addunitForm: {
        id: '',
        full_name: '',
        zhi_wu: '',
        mobile: '',
        project_id: '',
        project_name: '',
        unit_type: '',
        unit_typename: '',
        status: '',
      },
      unitshow: false,
      apiData: {
        project_id: this.$route.query.proitem.id,
        project_name: this.$route.query.proitem.project_name,
      },
      unitList: [],
      tabsList: [
        { name: '施工单位' },
        { name: '建设单位' },
        { name: '勘察单位' },
        { name: '监理单位' },
        { name: '总承包单位' },
        { name: '其他单位' },
      ],
      readfont: true,
      video: {
        // 视频播放源
        url: '',
        // 视频海报
        cover: '',
        muted: false, // 是否静音播放
        loop: false, // 视频是否循环播放
        preload: 'auto', // 视频预加载
        poster: '', // 原生视频默认海报暂不设置
        volume: 1, // 默认音量
        autoplay: false, // 视频自动播放
      },
      titleAllList: [
        {
          title: '中标时间',
          value: 'bid_riqi',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '工程规模',
          value: 'quantities',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '合同金额(元)',
          value: 'contract_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '计划开工日期',
          value: 'plan_end_riqi',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '计划竣工日期',
          value: 'bid_riqi',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '项目类型',
          value: 'type',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '项目状态',
          value: 'project_status',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
        {
          title: '项目地址',
          value: 'address',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XMnin8iWxy1662540525449.png',
        },
      ],
      titleData: {
        bid_riqi: '1970-01-01', //中标时间
        quantities: null, //工程规模
        contract_money: 0, //合同金额
        plan_start_riqi: null, //计划开工日期
        type: null, //项目类型
        project_status: null, //项目状态
        plan_end_riqi: null, //计划竣工日期
        address: '-', //项目地址
        project_video: '', //视频链接
        project_video_id: '', //视频链接id
      },
      formData: {
        id: '',
        build_unit: '', //建设单位
        design_unit: '', //设计单位
        survey_unit: '', //勘察单位
        supervisor_unit: '', //监理单位
        construction_unit: '', //施工单位
        zong_unit: '', //总承包单位
        project_introduction: '', //项目简介
      },
      comForeList: [
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '建设单位', //输入框lable
          filedmodel: 'build_unit', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '设计单位', //输入框lable
          filedmodel: 'design_unit', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '勘察单位', //输入框lable
          filedmodel: 'survey_unit', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '监理单位', //输入框lable
          filedmodel: 'supervisor_unit', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '施工单位', //输入框lable
          filedmodel: 'construction_unit', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '总承包单位', //输入框lable
          filedmodel: 'zong_unit', //输入框model
        },
        {
          fieldtype: 'TextareaField', //输入框类型
          fieldlable: '项目简介', //输入框lable
          filedmodel: 'project_introduction', //输入框model
        },
      ],
      project_info: {},
      project_situation: {},
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    unitadd() {
      console.log('2222');
      this.unitshow = true;
      this.infoisedit = false;
    },
    opensheet() {
      this.sheetshow = true;
    },
    onSelect(item) {
      this.sheetshow = false;
      console.log(item);
      this.addunitForm.unit_typename = item.name;
      this.addunitForm.unit_type = item.index;
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
    onSubmit() {
      if (!this.infoisedit) {
        delete this.addunitForm.id;
      }
      this.addunitForm.status = '1';
      this.addunitForm.project_id = this.$route.query.proitem.id;
      this.addunitForm.project_name = this.$route.query.proitem.project_name;
      console.log(this.addunitForm);

      this.formApi(this.addunitForm);
      this.unitshow = false;
    },
    formApi(val) {
      this.axiosPost('/bulletin/projectContactsAdd', val).then(res => {
        this.getunitInfo(val.unit_type);
      });
    },
    onEdit() {
      this.unitshow = false;
    },
    //   项目简介-联系人
    getunitInfo(val) {
      let newval = Object.assign({ unit_type: val }, this.apiData);
      this.axiosPost('/bulletin/projectBriefIntroduction1', newval).then(
        res => {
          this.unitList = res.data.data;
        },
      );
    },
    tabsChange() {},
    fontClick() {
      this.readfont = !this.readfont;
      if (this.readfont) {
        console.log('保存');
        this.saveInfo(this.formData);
      }
    },
    saveInfo(val) {
      let newval = Object.assign(val, this.apiData);
      this.axiosPost('/bulletin/projectSituationAdd', newval).then(res => {
        this.$toast(res.data.msg);
      });
    },
    handleFullscreen() {},

    //项目简介
    getprojectInfo() {
      this.axiosPost('/bulletin/projectInfo', this.apiData).then(res => {
        this.project_info = res.data.data.project_info;
        this.titleData = res.data.data.project_info;

        this.project_situation = res.data.data.project_situation;
        this.video.url = res.data.data.project_info.project_video;
        this.formData = res.data.data.project_situation;
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log('项目简介');
  },
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getprojectInfo();
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