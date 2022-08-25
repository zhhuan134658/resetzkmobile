<template>
  <!-- 我的 -->
  <div id="setpageindex">
    <div class="top">
      <div class="topname">
        <img :src="imgurl" alt="" />
        <div class="namename">
          <div class="nameone">{{ name }}</div>
          <div class="nametwo">{{ company }}</div>
        </div>
      </div>
      <div class="topbot">
        <div class="topbotone">
          <div class="topbotonetop">专业版会员</div>
          <div class="topbotonentn">2022-08-17到期(剩余0天)</div>
        </div>
        <div class="topbb">续费</div>
      </div>
    </div>
    <!--  -->
    <div class="more">
      <div class="topmore">更多服务</div>
      <div class="morebody">
        <div
          class="morebody_item"
          v-for="(item, index) in moreList"
          :key="index"
          @click="goNewpage(item)"
        >
          <img :src="item.imgurl" alt="" />
          <div class="itennmae">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <div class="more">
      <div class="topmore">常用功能</div>
      <div class="morebody">
        <div
          class="morebody_item"
          v-for="(item, index) in changmoreList"
          @click="goNewpage(item)"
          :key="index"
        >
          <img :src="item.imgurl" alt="" />
          <div class="itennmae">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <van-popup v-model="diashow" class="phonr">
      <div class="one" style="margin-top: 4.5rem">客服电话：0371-56775558</div>
      <div class="two" style="margin-top: 0.6rem" @click="callphone">
        立即拨打
      </div>
      <div class="three" style="margin-top: 0.4rem" @click="diashow = false">
        取消
      </div>
    </van-popup>
    <!-- <van-dialog v-model="diashow" title="" show-cancel-button>
      <img
        class="diaimg"
        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/zjWAXwNsjG1660812227161.png"
      />
    </van-dialog> -->
    <!-- <div class="version">版本号：4.2.2</div> -->
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  components: {},
  data() {
    return {
      diashow: false,
      moreList: [
        {
          name: '订单中心',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//sbay2JR5Bm1661412727289.png',
        },
        {
          name: '新手指引',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//6xd6y5E4Yi1661412727664.png',
        },
        {
          path: '/setpage/feedback',
          name: '意见反馈',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//zwcTPRK3Rd1661412727822.png',
        },
        {
          path: '/setpage/message',

          name: '消息通知',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pA7XFaSD8k1661412727985.png',
        },
      ],
      changmoreList: [
        {
          path: '/setpage/rolemembers',
          name: '角色成员',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//4G2Bh3YrBa1661412728133.png',
        },
        {
          path: '/setpage/warehouseindex',
          name: '仓库管理',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//yE3QN27zjD1661412728285.png',
        },
        {
          path: '/setpage/intercUnitindex',

          name: '往来单位',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//MCQPCPpe5R1661412728432.png',
        },
        {
          path: '/setpage/basicLibraryindex',
          name: '物资基础库',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//eafRAK48RJ1661412728582.png',
        },
        {
          path: '/setpage/customindex',

          name: '自定义',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//2YzwyGETke1661412728767.png',
        },
        {
          name: '服务电话',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//2YzwyGETke1661412728767.png',
        },
      ],
      roleView: 1,
      company: this.$store.state.userInfo.company,
      name: this.$store.state.userInfo.username,
      imgurl:
        'http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/ibwG5yjjsc1592967580830.jpg',
    };
  },

  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: '我的', //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    callphone() {
      window.location.href = 'tel://0371-56775558';
    },

    goNewpage(item) {
      if (item.name == '服务电话') {
        this.diashow = true;
        //
      } else {
        this.$router.push({ path: item.path });
      }
    },
  },
  mounted() {
    //   清空筛选数据
    this.$store.commit('setparmarsData', {});
    this.$store.commit('setsearchData', {});
  },
  created() {
    // this.setTitle();
    if (!this.$store.state.userInfo.userimg) {
      this.imgurl =
        'http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/ibwG5yjjsc1592967580830.jpg';
    } else {
      this.imgurl = this.$store.state.userInfo.userimg;
    }
  },
};
</script>
<style lang="less">
.phonr {
  border-radius: 0.2rem;
  overflow: hidden;

  width: 7.53rem;
  height: 8.29rem;
  background: url('https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/zjWAXwNsjG1660812227161.png')
    no-repeat;
  background-size: 7.53rem 8.29rem;
  text-align: center;
  .one {
    font-size: 0.37rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
  }
  .two {
    margin: auto;
    width: 70%;
    line-height: 1rem;
    height: 1.01rem;
    background: #2d91fa;
    border-radius: 0.5rem;
    font-size: 0.4rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fefefe;
  }
  .three {
    font-size: 0.4rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #2d91fa;
  }
}
.diaimg {
  width: 7.53rem;
  height: 8.29rem;
}
</style>
