<!-- 任务列表 -->
<template>
  <div id="tasklist">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="300"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <div class="list_item" v-for="(item, index) in proList" :key="index">
        <div class="list_item_left" @click="editTask(item)">
          <div class="font_top">{{ item.task_name }}</div>
          <div class="font_bot">
            {{ item.send_name }}-{{ item.current_state }}
          </div>
        </div>
        <div class="list_item_right" @click="deletask(item)">删除</div>
      </div>
    </van-list>
    <div style="height: 3.1rem"></div>

    <div class="sureBtn">
      <van-button round type="info" @click="goCreat('creat', '')"
        >添 加</van-button
      >
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import baseMixins from '../setpage/mixins';
import * as dd from 'dingtalk-jsapi';
export default {
  mixins: [baseMixins],

  name: 'tasklist',
  data() {
    return {};
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    deletask(item) {
      Dialog.confirm({
        title: '删除任务',
      })
        .then(() => {
          this.axiosPost('/baselibrary/taskDel', {
            id: [item.id],
          }).then(res => {
            this.finished = false; // 清空列表数据
            this.loading = true; // 将 loading 设置为 true，表示处于加载状态
            this.page = 1; // 分页数赋值为1
            this.proList = []; // 清空数组
            this.onLoad(); // 重新加载数据
            this.$toast(res.data.msg);
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    editTask(item) {
      this.$store.commit('settaskid', item.id);
      this.$router.push({
        path: '/task/taskinfo',
        query: {
          item,
        },
      });
    },

    goCreat() {
      this.$router.push({
        path: '/task/taskcreat',
        query: {
          pid: '0',
        },
      });
    },
    getTableList() {
      console.log('++++++++++++++++++', this.$store.state.parmarsData);
      let searce = this.$store.state.parmarsData;

      let parmars = {
        number: 10,
        page: this.page,
        approval_status: this.$store.state.tasktype,
        b_name: 'task',
      };
      Object.assign(parmars, searce);
      if (this.searchValue) {
        Object.assign(parmars, { biz_data: `like|${this.searchValue}` });
      }
      this.axiosPost('/baselibrary/taskList', parmars).then(res => {
        let resData = res.data.data;
        let mould_list = resData.mould_list;
        this.titleList = [];
        mould_list.forEach(element => {
          if (element.check) {
            this.titleList.push(element);
          }
        });

        if (this.titleList.length > 4) {
          this.titleList.splice(4);
          console.log('value0', this.titleList);
        }
        console.log('value', this.titleList);
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