<!-- 角色成员 -->
<template>
  <div id="rolemembers">
    <van-sticky>
      <van-search
        v-model="searchValue"
        right-icon="filter-o"
        left-icon=""
        placeholder="请输入姓名"
        @search="onSearch"
      />
    </van-sticky>
    <div v-if="roleshow">
      <van-cell
        class="cancell"
        :class="active == index ? 'active' : ''"
        v-for="(item, index) in roleList"
        :key="index"
        :title="`${item.name} (${item.role_number}人)`"
        is-link
        size="large"
        @click="gopeople(item, index)"
      />
    </div>
    <div v-else>
      <van-cell
        class="cancell"
        v-for="(item, index) in uuulist"
        :key="index"
        :title="`${item.name} `"
        :value="item.group_name[0]"
        size="large"
      />
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';

export default {
  name: 'rolemembers',
  data() {
    return {
      roleshow: true,
      searchValue: '',
      uuulist: [],

      active: 0,
      roleList: [],
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    searchValue: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.roleshow = false;
        } else {
          this.roleshow = true;
        }
      },
    },
  },
  //⽅法集合
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: '角色列表', //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    onSearch() {
      this.getuserlist();
    },
    getuserlist() {
      this.axiosPost('/rules/userSearch', {
        name: this.searchValue,
      }).then(res => {
        this.uuulist = res.data.data;
      });
    },
    getroleList() {
      this.axiosPost('/rules/roleList', { name: '' }).then(res => {
        this.roleList = res.data.data;
      });
    },
    gopeople(item, index) {
      this.active = index;
      this.$router.push({
        path: '/setpage/peoplelist',
        query: {
          item,
        },
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  activated() {
    // this.setTitle();

    this.getroleList();
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
.active {
  background: #0089ff;
  .van-cell__title {
    color: #fff !important;
  }
  .van-cell__right-icon {
    color: #fff;
  }
}
</style>