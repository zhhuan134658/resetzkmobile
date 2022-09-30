<!-- 任务 -->
<template>
  <div id="taskindex">
    <van-sticky>
      <van-search
        v-model="searchValue"
        left-icon=""
        placeholder="请输入搜索关键词"
        @input="onSearch"
      >
        <template #right-icon>
          <van-icon name="filter-o" />
        </template>
      </van-search>
      <div class="topPro">
        <div style="font-size: 0.42rem">项目名称:</div>

        <van-dropdown-menu style="width: 80%" active-color="#1989fa">
          <van-dropdown-item
            @change="changeDrop"
            v-model="proName"
            :options="columnsList"
          />
        </van-dropdown-menu>
      </div>
      <!-- <div class="proName">项目名称：{{ proName }}</div> -->
    </van-sticky>
    <div class="divdfiv"></div>
    <div class="vancell">
      <van-cell
        v-for="(item, index) in vancellList"
        :key="index"
        :title="item.name"
        size="large"
        is-link
        @click="goNext(item)"
      />
    </div>

    <van-popup v-model="proShow" position="bottom" :style="{ height: '40%' }">
      <van-picker
        title="选择项目"
        show-toolbar
        value-key="project_name"
        :columns="columnsList"
        @confirm="onConfirm"
        @cancel="proShow = false"
    /></van-popup>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: '',
  data() {
    return {
      proName: '',
      columnsList: [],
      proShow: false,
      searchValue: '',
      vancellList: [
        {
          name: '全部任务',
          approval_status: '',
        },
        {
          approval_status: '8',
          name: '我的任务',
        },
        {
          approval_status: '9',
          name: '我参与的',
        },
        {
          approval_status: '10',
          name: '我创建的',
        },
        {
          approval_status: '11',
          name: '抄送我的',
        },
        {
          approval_status: '12',
          name: '逾期任务',
        },
        {
          approval_status: '13',
          name: '即将逾期任务',
        },
        {
          approval_status: '14',
          name: '已完成任务',
        },
      ],
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    //   跳转
    goNext(item) {
      console.log('4867', item);
      this.$store.commit('settasktype', item.approval_status);
      this.$router.push({ path: '/task/tasklist' });
    },
    onSearch() {},
    //选择项目
    selectPro() {
      this.proShow = true;
    },
    onConfirm(value) {
      this.proName = value.project_name;
      this.$store.commit('settaskProject', this.proName);

      console.log(value);
      this.proShow = false;
    },
    changeDrop(value) {
      console.log('789456', value);
      this.$store.commit('settaskProject', this.proName);
    },
    // 获取项目列表
    getproList() {
      this.axiosPost('/baselibrary/getproject').then(res => {
        this.columnsList = [];
        res.data.data.forEach(element => {
          this.columnsList.push({
            text: element.project_name,
            value: element.project_name,
          });
        });

        if (!this.proName) {
          this.proName = res.data.data[0].project_name;
          this.$store.commit('settaskProject', this.proName);
        }
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getproList();
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