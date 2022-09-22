<!--  -->
<template>
  <div id="projectkanban">
    <van-sticky>
      <div class="kbtop">
        <van-search
          v-model="searchNmae"
          right-icon="filter-o"
          left-icon=""
          placeholder="请输入搜索关键词"
          @search="onSearch"
        />
        <div class="forediv">
          <div
            class="forediv_item"
            v-for="(item, index) in topXMlist"
            :key="index"
            @click="searchtop(item)"
          >
            <img :src="item.imgurl" alt="" />
            <div class="forediv_item_div">
              <div class="itemtop">{{ item.name }}</div>
              <div class="itemnum">{{ tjData[item.num] }}</div>
            </div>
          </div>
        </div>
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
        <div
          class="listBody_item"
          v-for="(item, index) in proList"
          :key="index"
          @click="gokanban(item)"
        >
          <div class="itemtop">
            <div class="itemleft">
              {{
                item.project_name.length > 8
                  ? item.project_name.substring(0, 8) + '...'
                  : item.project_name
              }}
              <van-tag plain size="medium" color="#38CC9C" type="primary">{{
                item.project_status
              }}</van-tag>
            </div>
            <div class="itemright">已同意</div>
            <!-- <div class="itemright">{{item.status}}</div> -->
          </div>

          <div class="itemcon">
            <div class="conone">
              <div class="cononetop">{{ item.jindu || '--' }}</div>
              <div class="cononebot">项目进度</div>
            </div>
            <div class="conone">
              <div class="cononetopqq">{{ item.project_person || '--' }}</div>
              <div class="cononebot">项目负责人</div>
            </div>
            <div class="conone">
              <div class="cononetopqq">{{ item.day_number || '--' }}</div>
              <div class="cononebot">总工期/天</div>
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
      searchtopdata: {},
      searchNmae: '',
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
          id: '1',
          name: '项目总数',
          num: 'project_num',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//wFTPEfsfEf1660637912938.png',
        },
        {
          id: '2',
          name: '在建项目',
          num: 'project_under_num',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//Tp6kdEBhnF1660637913103.png',
        },
        {
          id: '3',
          name: '本年新增',
          num: 'project_add_num',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//rP5TrKFhBF1660637912775.png',
        },
        {
          id: '4',
          name: '本年竣工',
          num: 'project_completed_num',
          imgurl:
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//srCkj84dsP1660637912414.png',
        },
      ],
      tjData: {
        project_completed_num: 0,
        project_completed_money: 0,
        project_add_num: 0,
        project_add_money: 0,
        project_under_num: 0,
        project_under_money: 0,
        project_num: 0,
        project_money: 0,
      },
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
      this.$router.push({
        path: '/projectkanban/proKbench',
        query: {
          proitem: item,
        },
      });
    },
    searchtop(item) {
      let date1 = new Date();
      let year1 = date1.getFullYear();
      let firstMonth = year1 + '-' + '01' + '-' + '01';
      let lastDay = year1 + '-' + '12' + '-' + '31';

      let apidata = `>=|${new Date(firstMonth).getTime() / 1000}|<=|${
        new Date(lastDay).getTime() / 1000
      }`;
      if (item.id == 1) {
        this.searchtopdata = {};
      } else if (item.id == 2) {
        this.searchtopdata = { project_status: 'like|在建' };
      } else if (item.id == 3) {
        this.searchtopdata = { update_time: apidata };
      } else if (item.id == 4) {
        this.searchtopdata = {
          update_time: apidata,
          project_status: 'like|竣工',
        };
      }
      this.$nextTick(() => {
        this.finished = false; // 清空列表数据
        this.loading = true; // 将 loading 设置为 true，表示处于加载状态
        this.page = 1; // 分页数赋值为1
        this.proList = []; // 清空数组
        this.onLoad(); // 重新加载数据
      });
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
      let newapidata = Object.assign(
        {
          page: this.page,
          number: 10000,
          biz_data: `like|${this.searchNmae}`,
        },
        this.searchtopdata,
      );
      this.axiosPost('/project/bulletinProjectList', newapidata).then(res => {
        this.tjData = res.data.data.jiben;
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