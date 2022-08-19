<!--  -->
<template>
  <div id="warehousecreat">
    <van-form
      @submit="onSubmit"
      @faile="onFailed"
      id="comForm"
      :show-error-message="false"
      :scroll-to-error="true"
    >
      <van-field name="图标" label="图标" required @click="select">
        <template #input>
          <span v-if="!formData.img_url" style="color: #cbc9d4">请选择</span>
          <img v-else style="width: 1.2rem" :src="formData.img_url" alt="" />
        </template>
      </van-field>

      <van-field
        v-model="formData.title"
        name="名称"
        required
        label="名称"
        placeholder="请输入名称"
        :rules="[{ required: true }]"
      />
      <div style="height: 2.4rem"></div>
      <div class="subbtn">
        <van-button round type="info" native-type="submit">提 交</van-button>
      </div>
    </van-form>
    <van-popup v-model="popshow" position="bottom" :style="{ height: '30%' }">
      <div class="imglist">
        <div
          @click="checked(item)"
          class="imgitem"
          v-for="(item, index) in urlList"
          :key="index"
        >
          <img :src="item.img_url" alt="" />
        </div>

        <div></div>
        <div></div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: '',
  data() {
    return {
      popshow: false,
      urlList: [],
      formData: {
        img_url: '',
        title: '',
      },
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    checked(item) {
      this.formData.img_url = item.img_url;
      this.popshow = false;
    },
    select() {
      this.popshow = true;
      console.log(1245);
    },
    onSubmit(values) {
      console.log('submit', values);
      let apiname =
        this.$route.query.type == 'creat'
          ? '/custom/createForm'
          : '/custom/menuEdit';
      this.axiosPost(apiname, this.formData).then(res => {
        if (res.data.code == 1) {
          this.$toast(res.data.msg);
          this.$router.go(-1);
        } else {
        }
      });
    },
    onFailed(errorInfo) {
      console.log('onFailed', errorInfo);
    },
    //图标数据
    imgList() {
      this.axiosPost('/custom/iconList').then(res => {
        if (res.data.code == 1) {
          this.urlList = res.data.data;
        }
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.imgList();
    console.log(this.$route.query);
    let queryData = this.$route.query;
    if (queryData.type != 'creat') {
      const { id, imgsrc, title } = queryData.item;

      this.formData = {
        img_url: imgsrc,
        title,
        id,
      };
    }
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
.imglist {
  display: flex;
  //   justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
  .imgitem {
    width: 2rem;
  }
}
</style>