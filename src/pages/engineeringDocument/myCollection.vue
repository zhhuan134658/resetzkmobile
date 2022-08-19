<!--文档  -->
<template>
  <div id="latelyFile">
    <van-sticky>
      <van-search
        v-model="searchValue"
        right-icon="filter-o"
        left-icon=""
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </van-sticky>
    <div class="listBody">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="300"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <div
          class="listBody_item"
          v-for="(item, index) in proList"
          :key="index"
        >
          <img :src="$utils.imgData(item.file_extension)" alt="" />
          <div class="middle">
            <div class="middletop">{{ item.file_name }}</div>
            <div class="middlebot">
              {{ $utils.renderSize(item.file_size) }}{{ item.update_time }}
            </div>
          </div>
          <van-icon
            @click="exitcoll(item)"
            name="like"
            size="20"
            color="#EE0A24"
          />
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import seconmixins from './secomixins.js';
export default {
  mixins: [seconmixins],
  name: '',
  data() {
    return {};
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    //   取消收藏.
    exitcoll(record) {
      this.axiosPost('/engineering/collectFileAdd', {
        id: record.id,
        is_collect: 0,
      }).then(res => {
        this.onSearch();
        this.$toast(res.data.msg);
      });
    },
    getTableList() {
      this.axiosPost('/engineering/collectFileList', {
        number: 10,
        page: this.page,
        file_name: this.searchValue,
      }).then(res => {
        let resData = res.data.data;
        // this.proList = resData.data;
        this.proList = [...this.proList, ...resData.data];
        if (resData.data.length === 0) {
          // 判断获取数据条数若等于0
          this.proList = []; // 清空数组
          this.finished = true; // 停止加载
        }

        // 若数据条数不等于0
        this.total = resData.total; // 给数据条数赋值
        console.log('111.,', this.proList);
        // 将数据放入list中
        this.loading = false; // 加载状态结束
        // 如果list长度大于等于总数据条数,数据全部加载完成
        // if (this.page == resData.page_total) {
        //   this.finished = true; // 结束加载状态
        // }
        if (this.proList.length >= resData.total) {
          this.finished = true; // 结束加载状态
        }
        // this.finished = true;
        // this.loading = false;
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
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