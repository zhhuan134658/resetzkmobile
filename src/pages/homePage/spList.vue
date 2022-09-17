<!--  -->
<template>
  <div id="projectkanban">
    <van-sticky>
      <div class="kbtop">
        <van-search
          v-model="seaechname"
          right-icon=""
          left-icon=""
          placeholder="请输入搜索关键词"
          @search="onSearch"
        />
      </div>
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
        <div class="listBody_item1" v-for="(item, index) in proList">
          <div class="listBody_item1_one">{{ item.name }}</div>
          <div class="listBody_item1_two">{{ item.field_one }}</div>
          <div class="listBody_item1_two">{{ item.field_two }}</div>
          <div class="listBody_item1_two">{{ item.field_three }}</div>
          <div class="listBody_item1_bot">
            <div class="bot_left">
              <span class="spanong">{{ item.send_name[0] }}</span>
              <span>由{{ item.send_name }}提交</span>
            </div>
            <div
              class="bot_rigth"
              :style="
                item.status == '1'
                  ? 'color: #E8A54C;'
                  : item.status == '2'
                  ? 'color: #17c298'
                  : 'color: #FF3434'
              "
            >
              {{
                item.status == '1'
                  ? '审批中'
                  : item.status == '2'
                  ? '已同意'
                  : '已拒绝'
              }}
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      seaechname: '',
      loading: false, // 是否处在加载状态
      finished: false, // 是否已加载完成
      error: false, // 是否加载失败
      proList: [], // 列表
      page: 1, // 分页
      page_size: 10, // 每页条数
      total: 0, // 数据总条数

      searchValue: '',
      //   11111111111111111111111111111
      topXMlist: [
        {
          name: '项目总数',
          num: '10',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//wFTPEfsfEf1660637912938.png',
        },
        {
          name: '在建项目',
          num: '10',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//Tp6kdEBhnF1660637913103.png',
        },
        {
          name: '本年新增',
          num: '10',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//rP5TrKFhBF1660637912775.png',
        },
        {
          name: '本年竣工',
          num: '10',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//srCkj84dsP1660637912414.png',
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
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: '工作台', //控制标题文本，空字符串表示显示默认文本
          onSuccess: function () {},
          onFail: function () {},
        });
      });
    },
    gokanban(item) {
      //   this.$router.push({
      //     path: '/projectkanban/proKbench',
      //     query: {
      //       proitem: item,
      //     },
      //   });
    },
    //
    // 获取列表数据方法
    onSearch() {
      this.finished = false; // 清空列表数据
      this.loading = true; // 将 loading 设置为 true，表示处于加载状态
      this.page = 1; // 分页数赋值为1
      this.proList = []; // 清空数组
      this.onLoad(); // 重新加载数据
    },
    // 被 @load调用的方法
    onLoad() {
      // 若加载条到了底部
      let timer = setTimeout(() => {
        // 定时器仅针对本地数据渲染动画效果,项目中axios请求不需要定时器
        this.getTableList(); // 调用上面方法,请求数据
        this.page++; // 分页数加一
        this.finished && clearTimeout(timer); //清除计时器
      }, 100);
    },
    // 加载失败调用方法
    onRefresh() {
      this.finished = false; // 清空列表数据
      this.loading = true; // 将 loading 设置为 true，表示处于加载状态
      this.page = 1; // 分页数赋值为1
      this.proList = []; // 清空数组
      this.onLoad(); // 重新加载数据
    },
    getTableList() {
      this.axiosPost('/baselibrary/approvalList', {
        name: this.seaechname,
        number: 10,
        page: this.page,
        type: this.$route.query.typeid,
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
  created() {
    // this.onLoad();
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
</style>