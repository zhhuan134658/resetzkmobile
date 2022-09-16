<template>
  <!-- 应用  -->
  <div id="application">
    <!-- 头像 -->
    <div class="avatar">
      <div class="avat_item">
        <img
          v-if="$store.state.userInfo.userimg"
          :src="$store.state.userInfo.userimg"
          alt
        />

        <span>{{ this.$store.state.userInfo.username }},您好</span>
      </div>
      <div class="avat_item1"></div>
    </div>
    <div class="process">
      <div
        class="process_item"
        v-for="(item, index) in List"
        :key="index"
        @click="golist(item)"
      >
        <img :src="item.imgurl" alt="" />

        <div class="item_font">{{ item.name }}</div>

        <div v-if="index == 0 && daichuli != 0" class="tag">
          {{ daichuli }}
        </div>
        <div v-if="index == 3 && shoudao != 0" class="tag">
          {{ shoudao }}
        </div>
      </div>
    </div>
    <div class="NoticeBar">
      <div class="NoticeBar_item">
        <div class="it_left">
          <img
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ebJbJ5ytkk1660617945291.png"
            alt=""
          />
        </div>
        <div class="it_right">
          <div class="it_top">这是一段预警标题</div>
          <van-notice-bar
            background="#F8F9FC"
            color="#999"
            scrollable
            text="技术是开发它的人的共同灵魂。"
          />
        </div>
      </div>
    </div>
    <!-- 常用应用 -->
    <div class="common_app">
      <div class="toptit">
        <div class="topdiv">常用应用</div>
        <van-icon size="20" name="setting-o" />
      </div>
      <div class="comcont">
        <div class="comcont_it" v-for="(item, index) in filelist" :key="index">
          <img
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ekzMKs83Zy1615168260242.png"
            alt=""
          />
          <div class="comfont">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <!-- 任务统计 -->
    <div class="common_app">
      <div class="toptit">
        <div class="topdiv">任务统计</div>
        <!-- <van-icon size="20" name="setting-o" /> -->
      </div>
      <div class="taskview">
        <div class="taskview_it" v-for="(item, index) in taskList" :key="index">
          <img :src="item.imgurl" alt="" />
          <div class="right_task">
            <div class="right_task_t" style="color: #000">
              {{ item.taskname }}
            </div>
            <div :style="`color:${item.color}`" class="right_task_b">
              {{ item.tasknum }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'application',
  data() {
    return {
      daichuli: '',
      shoudao: '',
      filelist: [
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
        { name: '最近文件', path: '' },
      ],
      imgurl: '',
      List: [
        {
          num: 0,
          id: 1,
          name: '待我审批',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ekzMKs83Zy1615168260242.png',
        },
        {
          num: 0,
          id: 2,
          name: '我已审批',

          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ZENBT2Jb6c1615168260641.png',
        },
        {
          num: 0,
          id: 3,
          name: '我发起的',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/acScXfjWe21615168260809.png',
        },
        {
          num: 1,
          id: 4,
          name: '抄送我的',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/zMwhyyt33t1615168260954.png',
        },
      ],
      taskList: [
        {
          id: '1',
          taskname: '全部任务',
          color: '#00D9B5',
          tasknum: 10,
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//w2dDAJZcaJ1660637093357.png',
        },
        {
          id: '1',
          color: '#9E60EB',
          taskname: '我的任务',
          tasknum: 10,
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//drkydPTDpS1660637093197.png',
        },
        {
          id: '1',
          taskname: '我参与的',
          color: '#FE6542',
          tasknum: 10,
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pe7bJwx64B1660637093519.png',
        },
        {
          id: '1',
          color: '#0087F9',
          taskname: '我创建的',
          tasknum: 10,
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//hmrkD52kBD1660637092648.png',
        },
        {
          id: '1',
          color: '#FF9130',
          taskname: '抄送我的',
          tasknum: 10,
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//xiwwDPYsPJ1660637093033.png',
        },
        {
          id: '1',
          color: '#F5407F',
          taskname: '逾期任务',
          tasknum: 10,
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//HJd5dYPNiK1660637092876.png',
        },
      ],
    };
  },
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: '首页', //控制标题文本，空字符串表示显示默认文本
          onSuccess: function () {},
          onFail: function () {},
        });
      });
    },
  },
  mounted() {},
  created() {
    this.$utils.checkding();
  },
};
</script>
<style lang="less">
</style>
