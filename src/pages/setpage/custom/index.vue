<!-- 往來單位 -->
<template>
  <div id="warehouseindex">
    <van-sticky>
      <van-search
        v-model="searchValue"
        right-icon="filter-o"
        left-icon=""
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </van-sticky>

    <div
      v-for="(item, index) in proList"
      :key="index"
      @click="goCreat('edit', item)"
      class="comlist"
    >
      <div class="listtitle">
        <img :src="item.imgsrc" alt="" />
        <span> {{ item.name }}</span>
      </div>
      <div class="listcont">创建人:{{ item.create_name }}</div>

      <div class="listcont">创建时间:{{ item.create_time }}</div>
      <div class="deletebtn">
        <van-button
          @click.native.stop="deleteitem(item)"
          round
          plain
          hairline
          type="info"
          >删除</van-button
        >
      </div>
    </div>

    <div style="height: 3.1rem"></div>
    <div class="sureBtn">
      <van-button round type="info" @click="goCreat('creat', '')"
        >添 加</van-button
      >
    </div>
  </div>
</template>
<script>
// import baseMixins from '../mixins';

export default {
  //   mixins: [baseMixins],

  name: '',
  data() {
    return {
      searchValue: '',
      proList: [],
      //   11111111111111111111111
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    onSearch() {},
    //   删除
    //   删除
    deleteitem(item) {
      this.$dialog
        .confirm({
          title: '警告提示',
          message: '数据删除后不可恢复，请谨慎删除！',
        })
        .then(() => {
          this.axiosPost('/custom/menuDel', {
            id_arr: [item.id],
          }).then(res => {
            if (res.data.code == 1) {
              this.getTableList();
            }
            this.$toast(res.data.msg);
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //   新建
    goCreat(type, item) {
      this.$router.push({
        path: '/setpage/customcreat',
        query: { type, item },
      });
    },

    getTableList() {
      this.axiosPost('/menu/menu', {
        corp_id: this.$store.state.userInfo.corpid,
        userid: this.$store.state.userInfo.userid,
        type: 11,
      }).then(res => {
        let resData = res.data.data;
        this.proList = resData;
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTableList();
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