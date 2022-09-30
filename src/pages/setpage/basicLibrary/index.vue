<!-- 往來單位 -->
<template>
  <div id="warehouseindex">
    <van-sticky>
      <van-search
        v-model="searchValue"
        left-icon=""
        placeholder="请输入搜索关键词"
        @input="onSearch"
        clearable
      >
        <template #right-icon>
          <van-icon
            v-if="objectlength > 0"
            @click="vipsearch"
            name="filter-o"
            :badge="objectlength"
          />
          <van-icon v-else @click="vipsearch" name="filter-o" />
        </template>
      </van-search>
    </van-sticky>

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
        v-for="(item, index) in proList"
        :key="index"
        @click="goCreat('edit', item)"
        class="comlist"
      >
        <div
          v-for="(iitem, iindex) in titleList"
          :key="iindex"
          :class="iindex == 0 ? 'listtitle' : 'listcont'"
        >
          {{ `${iindex == 0 ? '' : iitem.label + ':'}` }}
          {{ item[iitem.value] ? item[iitem.value] : '--' }}
        </div>
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
    </van-list>
    <div style="height: 3.1rem"></div>
    <div class="sureBtn">
      <van-button
        round
        type="info"
        native-type="submit"
        @click="goCreat('creat', '')"
        >添 加</van-button
      >
    </div>
  </div>
</template>
<script>
import baseMixins from '../mixins';

export default {
  mixins: [baseMixins],

  name: '',
  data() {
    return {
      //   11111111111111111111111
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    //筛选
    vipsearch() {
      this.$router.push({
        path: '/setpage/comSearch',
        query: {
          searchTyppe: 'material_info',
        },
      });
    },
    //   删除
    deleteitem(item) {
      this.$dialog
        .confirm({
          title: '警告提示',
          message: '数据删除后不可恢复，请谨慎删除！',
        })
        .then(() => {
          this.axiosPost('/project/projectDel', {
            id_arr: [item.id],
            b_name: 'material_info',
            title: '物资基础库',
            sign_arr: [item.goods_name],
            mx_name: '',
          }).then(res => {
            if (res.data.code == 1) {
              this.onSearch();
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
        path: '/setpage/basicLibrarycreat',
        query: { type, item, b_name: 'material_info' },
      });
    },

    getTableList() {
      let parmars = {
        number: 10,
        page: this.page,

        b_name: 'material_info',
      };
      if (this.searchValue) {
        Object.assign(parmars, { biz_data: `like|${this.searchValue}` });
      }
      this.axiosPost('/OaSuite/materialList', parmars).then(res => {
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
  created() {
    // this.getTableList();
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