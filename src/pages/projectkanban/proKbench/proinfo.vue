<template>
  <!-- 项目简介 -->
  <div id="">
    <!-- 顶部信息    -->
    <comfont :fontdata="'项目简介'"></comfont>
    <commtitle :titleAllList="titleAllList" :titleData="titleData"></commtitle>
    <comfont :fontdata="'视频动态'"></comfont>

    <!-- 视频 -->
    <div class="div_video">
      <div
        style="width: 100%; height: 100%; background: #fff; font-size: 20px"
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

    <comfont :fontdata="'详细情况'"></comfont>
    <!-- 详细情况 -->
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
    <!-- 施工单位 -->

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
          src="http://oazhukuai.zzdingyun.com/app/dist/static/img/bianji1.f4d09d63.png"
          alt=""
        />
        <div style="color: #909399">暂时还没有数据哦~快去添加</div>
      </div>
      <div v-else class="unit_table">
        <div class="unit unitb">
          <div class="name name1">姓名</div>
          <div class="name name2">职务</div>
          <div class="name name3">电话</div>
          <div class="name name4" style="color: #666666">操作</div>
        </div>
        <div class="unit" v-for="(item, index) in unitList">
          <div class="name name1">{{ item.full_name }}</div>
          <div class="name name2">{{ item.zhi_wu }}</div>
          <div class="name name3">{{ item.mobile }}</div>
          <div class="name name4" @click="moreInfo(item)">更多</div>
        </div>
      </div>
    </div>
    <!-- 项目大事记 -->
    <div class="div_big">
      <div class="div_one">
        <div class="one_left">项目大事记</div>
        <div class="one_right">
          <span @click="bigadd">新增</span>
        </div>
      </div>
      <div class="bit_content">
        <div class="big_item" v-for="(item, index) in bigIinfo">
          <div class="big_item_top">
            <div class="top_left">
              <img
                v-if="item.extend_first == '1'"
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//QZPzN7rYWH1654650029700.png"
                alt=""
              />
              <span>{{ item.title }}</span>
            </div>
            <div @click="bigcz(item)">...</div>
          </div>
          <div class="big_item_bottom">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>

    <!-- 添加 -->
    <van-popup v-model="unitshow" position="bottom" :style="{ height: '63%' }">
      <van-form validate-first @failed="onFailed" ref="addunitForm">
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
    <!-- 添加 -->
    <van-popup v-model="bigshow" position="bottom">
      <van-form validate-first @failed="onFailed">
        <van-field
          label="标题"
          v-model="addbigForm.title"
          name="unit_typename"
          placeholder="请选择"
          :rules="[{ message: '请输入正确内容' }]"
        />

        <van-field
          label="作者"
          v-model="addbigForm.author"
          name="full_name"
          placeholder="请输入"
          :rules="[{ message: '请输入正确内容' }]"
        />

        <van-field
          label="正文"
          type="textarea"
          v-model="addbigForm.content"
          name="zhi_wu"
          placeholder="请输入"
          :rules="[{ message: '请输入正确内容' }]"
        />

        <!-- 附件 -->
        <div class="imgupload">
          <div class="imgfont">
            <div>附件</div>
            <div
              class="imgfont1"
              style="color: #1989fa"
              @click="getspaceID('4')"
            >
              点击添加附件
            </div>
          </div>
          <div class="upList">
            <div
              class="xiangmu"
              v-for="(item, index) in addbigForm.extend_five"
              :key="index"
            >
              <div class="xmdiv xmimg">
                <div class="img">{{ item.fileType }}</div>
              </div>
              <div class="xmdiv xmjindu">
                <div class="clear">
                  <van-icon name="cross" @click="deletefile('4', item)" />
                </div>
                <div class="xmjindu-item">
                  <div class="xmjindu-item-font">
                    {{ item.fileName }}
                  </div>
                  <div class="xmjindu-item-font1">
                    {{ (item.fileSize / 1024 / 1024).toFixed(2) }}MB
                  </div>
                </div>
                <div class="yulan" @click="lookfile(item)">预览</div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin: 16px" class="suitbtn">
          <van-button type="info" @click="onbigSubmit" native-type="submit"
            >提交</van-button
          >
          <van-button type="warning" @click="bigshow = false">取消</van-button>
        </div>
      </van-form>
    </van-popup>
    <van-action-sheet
      v-model="sheetshow"
      :actions="actions"
      @select="onSelect"
    />
    <!-- 更多 -->
    <van-action-sheet
      v-model="actionshow"
      :actions="actionactions"
      @select="onSelectaction"
    />
    <!-- 更多 -->
    <van-action-sheet
      v-model="bigPopover"
      :actions="bigactions"
      @select="bigSelectaction"
    />
  </div>
</template>

<script>
import comfont from './comfont.vue';
import commtitle from './comtitle.vue';
import Vue from 'vue';
import vueMiniPlayer from 'vue-mini-player';
import 'vue-mini-player/lib/vue-mini-player.css';
Vue.use(vueMiniPlayer);

import { Toast } from 'vant';

export default {
  components: { commtitle, comfont },

  data() {
    return {
      readfont: true,
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
      apiData: {
        project_id: this.$route.query.proitem.id,
        project_name: this.$route.query.proitem.project_name,
      },
      iteminfo: {},
      project_name: '',
      project_id: '',
      biginfo: '',
      bigPopover: false,
      bigactions: [],
      addbigForm: {
        id: '',
        title: '',
        author: '',
        content: '',
        status: '',
        extend_first: '',
        project_id: '',
        project_name: '',
        extend_five: [],
      },
      bigIinfo: [],
      bigshow: false,
      infoisedit: false,
      chackedInfo: '',
      actionshow: false,
      sheetshow: false,
      actionactions: [
        { name: '编辑', index: '1' },
        { name: '删除', index: '2' },
      ],
      actions: [
        { name: '施工单位', index: '1' },
        { name: '建设单位', index: '2' },
        { name: '勘察单位', index: '3' },
        { name: '监理单位', index: '4' },
        { name: '总承包单位', index: '5' },
        { name: '其他单位', index: '6' },
      ],
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
      unitList: [],
      isEdit: true,
      value: '',
      tabsList: [
        { name: '施工单位' },
        { name: '建设单位' },
        { name: '勘察单位' },
        { name: '监理单位' },
        { name: '总承包单位' },
        { name: '其他单位' },
      ],
      titleAllList: [
        {
          title: '中标时间',
          value: 'bid_riqi',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//CpMR376Pr51654649861721.png',
        },
        {
          title: '工程规模',
          value: 'quantities',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//YARffGZB5b1654649906094.png',
        },
        {
          title: '合同金额/元',
          value: 'contract_money',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//AHJseCJA3e1654649924458.png',
        },
        {
          title: '计划开工日期',
          value: 'plan_start_riqi',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//YZE2nB8tSF1654649943255.png',
        },
        {
          title: '项目类型',
          value: 'type',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//WBSbGRBNMd1654649959911.png',
        },
        {
          title: '项目状态',
          value: 'project_status',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pem7iadhHd1654649982399.png',
        },
        {
          title: '计划竣工日期',
          value: 'plan_end_riqi',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//YYc5Rdad5S1654650000501.png',
        },
        {
          title: '项目地址',
          value: 'address',
          imgUrl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//QQjan8xTz31654650015155.png',
        },
      ],
      titleData: {
        bid_riqi: '', //中标时间
        quantities: '', //工程规模
        contract_money: 0, //合同金额
        plan_start_riqi: '', //计划开工日期
        type: '', //项目类型
        project_status: '', //项目状态
        plan_end_riqi: '', //计划竣工日期
        address: '-', //项目地址
        project_video: '', //视频链接
        project_video_id: '', //视频链接id
      },
      contentList: [
        { name: '建设单位：', content: 'build_unit' },
        { name: '设计单位：', content: 'design_unit' },
        { name: '勘察单位：', content: 'survey_unit' },
        { name: '监理单位：', content: 'supervisor_unit' },
        { name: '施工单位：', content: 'construction_unit' },
        { name: '总承包单位：', content: 'zong_unit' },
        { name: '项目简介：', content: 'project_introduction' },
      ],
      contentInfo: '',
      topIinfo: '',
      project_id: '',
      project_name: '',
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
      uptype: '',
    };
  },
  computed: {},
  methods: {
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
    //附件
    //获取企业自定义空间
    getspaceID(val) {
      this.uptype = val;
      this.axiosPost('/dingding/getAuthUp', {
        type: 'add',

        fileids: '',
      }).then(res => {
        console.log(res.data.data);
        if (val == '1' || val == '2') {
          this.imguploadAtta(res.data.data.toString());
        } else if (val == '3' || val == '4') {
          this.imguploadAtta(res.data.data.toString());
        }
      });
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter(arr => !res.has(arr.fileId) && res.set(arr.fileId, 1));
    },
    imguploadAtta(newspaceid) {
      const _this = this;

      dd.ready(function () {
        dd.biz.util.uploadAttachment({
          image: {
            multiple: true,
            compress: false,
            max: 9,
            spaceId: newspaceid,
          },
          space: {
            corpId: _this.$store.state.userData.cid,
            spaceId: newspaceid,
            isCopy: 1,
            max: 9,
          },
          file: { spaceId: newspaceid, max: 1 },
          types: ['photo', 'camera', 'file', 'space'], //PC端支持["photo","file","space"]
          onSuccess: function (result) {
            if (_this.uptype == '1') {
            } else if (_this.uptype == '4') {
              _this.addbigForm.extend_five = _this.deunique(
                _this.addbigForm.extend_five.concat(result.data),
              );
            }
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },

    lookfile(item) {
      const _this = this;
      _this
        .axiosPost('/dingding/getAuthUp', {
          type: 'download',

          fileids: item.fileId,
        })
        .then(res => {
          dd.ready(function () {
            dd.biz.cspace.preview({
              corpId: _this.$store.state.userData.cid,
              spaceId: item.spaceId,
              fileId: item.fileId,
              fileName: item.fileName,
              fileSize: item.fileSize,
              fileType: item.fileType,
              onSuccess: function () {
                //无，直接在native显示文件详细信息
              },
              onFail: function (err) {
                // 无，直接在native页面显示具体的错误
              },
            });
          });
        });
    },
    //删除
    deletefile(val, item) {
      if (val == '1') {
      } else if (val == '4') {
        this.addbigForm.extend_five.splice(
          this.addbigForm.extend_five.indexOf(item),
          1,
        );
      }
    },
    //大事件
    bigcz(item) {
      if (item.extend_first == '1') {
        this.bigactions = [
          { name: '编辑' },
          { name: '撤销' },
          { name: '取消置顶' },
        ];
      } else {
        this.bigactions = [
          { name: '编辑' },
          { name: '撤销' },
          { name: '置顶' },
        ];
      }

      this.$nextTick(() => {
        this.bigPopover = true;
        this.biginfo = item;
      });
    },
    onbigSubmit() {
      this.bigApi(this.addbigForm);
    },

    bigadd() {
      this.bigshow = true;
      this.addbigForm.status = '1';
      this.addbigForm.extend_first = '0';
      delete this.addbigForm.id;
    },
    bigApi(val) {
      this.addbigForm.project_id = this.project_id;
      this.addbigForm.project_name = this.project_name;
      this.axiosPost('/bulletin/projectNotesAdd', val).then(res => {
        this.getbigInfo();
        this.bigshow = false;
      });
    },
    bigSelectaction(item) {
      if (item.name == '编辑') {
        this.bigshow = true;
        this.addbigForm = this.biginfo;
        this.bigApi(this.biginfo);
        this.bigPopover = false;
      } else if (item.name == '撤销') {
        this.biginfo.status = '0';
        this.bigApi(this.biginfo);
        this.bigPopover = false;
      } else if (item.name == '置顶') {
        this.biginfo.extend_first = '1';
        this.bigApi(this.biginfo);
        this.bigPopover = false;
      } else if (item.name == '取消置顶') {
        this.biginfo.extend_first = '0';
        this.bigApi(this.biginfo);
        this.bigPopover = false;
      }
    },
    //   施工单位
    moreInfo(item) {
      console.log('item', item);
      this.chackedInfo = item;
      this.actionshow = true;
    },
    onSelectaction(item) {
      if (item.name == '编辑') {
        this.infoisedit = true;
        this.addunitForm = this.chackedInfo;
        this.addunitForm.id = this.chackedInfo.id;
        this.actions.forEach(item => {
          if (item.index == this.chackedInfo.unit_type)
            this.addunitForm.unit_typename = item.name;
        });

        this.unitshow = true;

        console.log(this.chackedInfo);
      } else {
        this.chackedInfo.status = '0';
        this.formApi(this.chackedInfo);
      }
      this.actionshow = false;
    },
    // 删除
    tabsChange(name, title) {
      console.log(name, title);
      this.getunitInfo(name + 1);
    },
    unitadd() {
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
      this.addunitForm.project_id = this.project_id;
      this.addunitForm.project_name = this.project_name;
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
      this.axiosPost('/bulletin/projectSituationAdd', val).then(res => {
        Toast(res.data.msg);
      });
    },

    handleFullscreen() {},
    //获取大事件列表
    getbigInfo() {
      this.axiosPost('/bulletin/projectBriefIntroduction2', {
        project_id: this.project_id,
        project_name: this.project_name,
        page: 1,
        number: 999999,
      }).then(res => {
        this.bigIinfo = res.data.data;
      });
    },
    //   获取顶部信息
    getTopInfo() {
      this.axiosPost('/bulletin/projectInfo', this.apiData).then(res => {
        this.titleData = res.data.data.project_info;
        this.contentInfo = res.data.data.project_situation;
        this.video.url = this.titleData.project_video;
      });
    },
    //   项目简介-联系人
    getunitInfo(val) {
      this.axiosPost('/bulletin/projectBriefIntroduction1', {
        project_id: this.project_id,
        project_name: this.project_name,
        unit_type: val, //单位类型 1施工单位 2建设单位 3勘察单位 4监理单位 5总承包单位 6其他
      }).then(res => {
        this.unitList = res.data.data;
      });
    },
  },
  mounted() {},
  created() {
    this.iteminfo = this.$route.query.proitem;
    this.project_id = this.iteminfo.id;
    this.project_name = this.iteminfo.project_name;

    this.getTopInfo();
    this.getunitInfo(1);
    this.getbigInfo();
  },
};
</script>
<style lang="less">
</style>
