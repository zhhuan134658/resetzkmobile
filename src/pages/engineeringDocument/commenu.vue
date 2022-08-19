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
        @load="onLoad"
        offset="300"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <div
          class="listBody_item"
          v-for="(item, index) in proList"
          :key="index"
          @click="fileclick(item)"
          v-if="item.file_type == 'folder'"
        >
          <img :src="$utils.imgData(item.file_extension)" alt="" />
          <div class="middle">
            <div class="middletop">{{ item.file_name }}</div>
            <div class="middlebot">
              {{ $utils.renderSize(item.file_size) }} {{ item.send_name }}
              {{ item.update_time }}
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <van-empty v-if="proList.length < 1" description="暂无数据" />

    <div style="height: 2rem"></div>
    <div class="bottomBtn">
      <div
        class="btn"
        v-if="$route.query.typename == 'first'"
        style="color: #e2e2e2"
      >
        新建文件夹
      </div>
      <div class="btn" v-else @click="oncreatSelect">新建文件夹</div>
      <div class="btn" style="background: #0089ff; color: #fff">移动到这里</div>
    </div>
    <!-- 新建文件夹 -->
    <van-dialog
      v-model="resetnameshow"
      title="新建文件夹"
      show-cancel-button
      @confirm="addfileOk"
    >
      <van-field
        v-model="newfilename"
        :maxLength="50"
        label=""
        placeholder="请输入"
      />
    </van-dialog>
    <!-- 新建上传 -->
    <van-action-sheet
      v-model="creatqqshow"
      :actions="creatlist"
      @select="oncreatSelect"
    />
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import mainmixins from './mainmixins.js';
export default {
  mixins: [mainmixins],
  name: '',
  data() {
    return {
      actionslist: [{ name: '权限' }, { name: '重命名' }, { name: '删除' }],
      creatlist: [{ name: '移动到这里' }, { name: '新建文件夹' }],
      typename: 'first',
      checkitem: {},
      deonFileitem: {},
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route() {
      console.log('8888', this.$route.query);
      let _this = this;
      _this.$nextTick(() => {
        _this.getSpaceList(_this.$route.query.itemdata);
      });
    },
  },
  //⽅法集合
  methods: {
    ddupload() {
      this.creatshow = true;
    },
    oncreatSelect() {
      this.resetnameshow = true;
    },
    //新建文件夹
    addfileOk() {
      const data = JSON.parse(this.$route.query.itemdata);
      console.log('7888', data);
      //   return;
      const { space_id, file_id } = data;
      let param = {
        space_id,
        parent_id: data.parent_id == '0' ? '0' : file_id,
        file_type: 'folder',
        file_name: this.newfilename,
        type: '1',
      };
      const _this = this;
      _this.$utils
        .axiosFilePost('/engineering/dingFileUpload', param)
        .then(function (res) {
          _this.newfilename = '';
          _this.addfile = false;
          _this.getSpaceList();
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 行点击  下探
    fileclick(itemdata) {
      //   this.deonFileitem = itemdata;
      console.log('qqqq');
      this.$router.push({
        path: '/engineeringDocument/commenu',
        query: {
          typename: 'other',
          queryname: itemdata.id,
          itemdata: JSON.stringify(itemdata),
        },
      });
      //   let _this = this;
      //   _this.$nextTick(() => {
      //     _this.getSpaceList();
      //   });
    },
    //   文件预览

    viewCclick(record) {
      const _this = this;
      console.log('1212', record.id);
      //   _this.addlatelyFileAdd(record.id);
      dd.ready(function () {
        dd.biz.cspace.preview({
          corpId: _this.$store.state.userInfo.corpid,
          spaceId: record.space_id,
          fileId: record.file_id,
          fileName: record.file_name,
          fileSize: record.file_size,
          fileType: record.file_extension,
          onSuccess: function () {
            //无，直接在native显示文件详细信息
          },
          onFail: function () {
            // 无，直接在native页面显示具体的错误
          },
        });
      });
    },
    //添加最近预览文件
    addlatelyFileAdd(id) {
      this.axiosPost('/engineering/latelyFileAdd', {
        id,
      })
        .then(res => {})
        .catch(error => {
          console.log(error);
        });
    },

    // -------------------
    getTableList() {
      //   console.log(JSON.parse(this.$route.query.itemdata));
      let type = this.$route.query.typename;
      let apiname =
        type == 'first' ? '/engineering/spaceList' : '/engineering/fileList';
      let prams = Object.assign(
        {
          number: 10,
          page: this.page,
          field: '', //排序字段 创建时间create_time   大小file_size  文件名file_name
          sort: '', //升序asc  降序desc
          file_name: this.searchValue,
        },
        {
          type: type == 'first' ? '' : 1,
          file_id:
            type == 'first'
              ? ''
              : JSON.parse(this.$route.query.itemdata)?.file_id,
        },
      );

      this.axiosPost(apiname, prams).then(res => {
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
    // this.typename = this.$route.query.typename;
    console.log('444');
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