<!--  -->
<template>
  <div id="warehousecreat">
    <comForm
      :key="reitem"
      :formData="formData"
      :comForeList="comForeList"
      @addData="addData"
    ></comForm>
  </div>
</template>
<script>
import comForm from '../comForm.vue';

export default {
  name: '',
  components: { comForm },
  data() {
    return {
      reitem: +new Date(),

      comForeList: [
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '仓库名称', //输入框lable
          fieldrequired: true, //是否必填
          filedmodel: 'warehouse_name', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '仓库编号', //输入框lable
          fieldrequired: true, //是否必填
          filedmodel: 'warehouse_number', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '仓库地址', //输入框lable
          fieldrequired: false, //是否必填
          filedmodel: 'warehouse_address', //输入框model
        },
        {
          fieldtype: 'TextareaField', //输入框类型
          fieldlable: '备注', //输入框lable
          fieldrequired: false, //是否必填
          filedmodel: 'remarks', //输入框model
        },
      ],
      formData: {
        warehouse_name: '',
        warehouse_number: '',
        warehouse_address: '',
        remarks: '',
        process_code: '',
        id: '',
      },
      username: '',
      password: '',
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    // 新建
    addData() {
      this.axiosPost('/baselibrary/warehouseAdd', this.formData).then(res => {
        if (res.data.code == 1) {
          this.$toast(res.data.msg);
          this.$router.go(-1);
        }
      });
    },
    //编辑 获取详情
    getInfo() {
      this.axiosPost('/baselibrary/warehouseAdd', this.formData).then(res => {
        if (res.data.code == 1) {
          this.$toast(res.data.msg);
        }
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$route.query);
    let queryData = this.$route.query;
    if (queryData.type != 'creat') {
      if (queryData.b_name == 'warehouse_info') {
        this.formData = queryData.item;
      } else {
      }
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
</style>