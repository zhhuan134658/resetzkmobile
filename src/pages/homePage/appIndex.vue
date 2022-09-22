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
        <van-icon size="20" name="setting-o" @click="editmenu" />
      </div>
      <div class="comcont">
        <div
          class="comcont_it"
          v-for="(item1, index) in commonlyTypelist"
          :key="index"
          @click="openDDsp(item1)"
        >
          <i
            :class="
              item1.mobile_icon
                ? `font_family ${item1.mobile_icon}`
                : 'font_family icon-zanwuxinxi'
            "
            style="font-size: 0.8rem"
            :style="`color:#${
              item1.mobile_color ? item1.mobile_color : '15BC83'
            }`"
          ></i>
          <div class="sonfont">
            {{
              item1.title.length > 6
                ? item1.title.substring(0, 6) + '...'
                : item1.title
            }}
          </div>
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
        <div
          class="taskview_it"
          v-for="(item, index) in taskList"
          :key="index"
          @click="goNext(item)"
        >
          <img :src="item.imgurl" alt="" />
          <div class="right_task">
            <div class="right_task_t" style="color: #000">
              {{ item.taskname }}
            </div>
            <div :style="`color:${item.color}`" class="right_task_b">
              {{ taskNumber[item.tasknum] }}
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
      taskNumber: {},
      daichuli: '',
      shoudao: '',
      commonlyTypelist: [],
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
          approval_status: '',
          tasknum: 'all',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//w2dDAJZcaJ1660637093357.png',
        },
        {
          id: '1',
          color: '#9E60EB',
          taskname: '我的任务',
          approval_status: '8',
          tasknum: 'my',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//drkydPTDpS1660637093197.png',
        },
        {
          id: '1',
          taskname: '我参与的',
          approval_status: '9',
          color: '#FE6542',
          tasknum: 'partake',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pe7bJwx64B1660637093519.png',
        },
        {
          id: '1',
          color: '#0087F9',
          taskname: '我创建的',
          approval_status: '10',
          tasknum: 'found',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//hmrkD52kBD1660637092648.png',
        },
        {
          id: '1',
          color: '#FF9130',
          approval_status: '11',
          taskname: '抄送我的',
          tasknum: 'cc',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//xiwwDPYsPJ1660637093033.png',
        },
        {
          id: '1',
          color: '#F5407F',
          approval_status: '12',
          taskname: '逾期任务',
          tasknum: 'beoverdue',
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

    openDDsp(item1) {
      console.log('414', item1);
      if (item1.mobile_route != '') {
        this.$router.push({ path: item1.mobile_route });
      } else {
        this.axiosPost('/project/projectAdd', {
          b_name: item1.biao_name,
          title: item1.title,
        }).then(res => {
          if (res.data.code == 1) {
            const _this = this;
            let openurl =
              'https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=' +
              _this.$store.state.userInfo.corpid +
              '&swfrom=qrshareh5&tempalteName=' +
              item1.title +
              '&processCode=' +
              res.data.data +
              '&back=native#/custom';
            dd.ready(function () {
              dd.biz.util.openLink({
                url: openurl, //要打开链接的地址
                onSuccess: function () {
                  /**/
                },
                onFail: function () {},
              });
            });
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    },
    editmenu() {
      this.$router.push({ path: '/homePage/editmenu' });
    },
    golist(item) {
      this.$router.push({
        path: '/homePage/spList',
        query: {
          typeid: item.id,
        },
      });
    },
    goNext(item) {
      console.log('4867', item);
      this.$store.commit('settasktype', item.approval_status);
      this.$router.push({ path: '/task/tasklist' });
    },
    getcommonlyTypelist() {
      this.axiosPost('/baselibrary/commonlyTypelist', {
        userid: this.$store.state.userInfo.userid,
      }).then(res => {
        this.commonlyTypelist = res.data.data;
      });
    },
    gettaskNumber() {
      this.axiosPost('/baselibrary/taskNumber').then(res => {
        let resData = res.data.data;
        this.taskNumber = JSON.parse(JSON.stringify(resData));
      });
    },
  },
  mounted() {},
  created() {
    this.$utils.checkding();
    this.gettaskNumber();
    this.getcommonlyTypelist();
  },
};
</script>
<style lang="less">
</style>
