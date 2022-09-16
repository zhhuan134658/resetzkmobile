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
          fieldlable: '物资名称', //输入框lable
          fieldrequired: true, //是否必填
          filedmodel: 'goods_name', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '规格型号', //输入框lable
          fieldrequired: true, //是否必填
          filedmodel: 'specs_type', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '单位', //输入框lable
          fieldrequired: true, //是否必填
          filedmodel: 'uint', //输入框model
        },
        {
          fieldtype: 'DDSelectField11', //输入框类型
          fieldlable: '物资类型', //输入框lable
          fieldrequired: true, //是否必填
          filedmodel: 'goods_type', //输入框model
          valuekey: 'name',

          selseckList: [],
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '参数', //输入框lable
          fieldrequired: false, //是否必填
          filedmodel: 'material_param', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '属性', //输入框lable
          fieldrequired: false, //是否必填
          filedmodel: 'material_nature', //输入框model
        },
        {
          fieldtype: 'TextnumField', //输入框类型
          fieldlable: '信息价格(元)', //输入框lable
          fieldrequired: false, //是否必填
          filedmodel: 'news_unit_price', //输入框model
        },
      ],
      formData: {
        goods_name: '',
        specs_type: '',
        uint: '',
        goods_type: '',
        goods_typename: '',
        material_param: '',
        material_nature: '',
        news_unit_price: '',
        material_remarks: '',
        material_accessory: [],
        enclosure: [],
        process_code: '',
        id: '',
      },
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
      this.formData.material_accessory = this.formData.enclosure;
      delete this.formData.enclosure;
      console.log('55555', this.formData);

      let apiname =
        this.formData.type == '1'
          ? '/OaSuite/materialUpdate'
          : '/OaSuite/materialAdd';
      this.axiosPost(apiname, this.formData).then(res => {
        if (res.data.code == 1) {
          this.$toast(res.data.msg);
          this.$router.go(-1);
        }
      });
    },
    getcode() {
      this.axiosPost('/project/projectAdd', {
        b_name: 'material_info',
        title: '物资基础库',
      }).then(res => {
        if (res.data.code == 1) {
          this.formData.process_code = res.data.data;
        }
      });
    },

    //编辑 获取详情
    getInfo(id) {
      this.axiosPost('/OaSuite/materialContent', { id }).then(res => {
        if (res.data.code == 1) {
          this.formData = res.data.data;
          this.formData.type = '1';
          this.formData.id = id;
          this.formData.enclosure = res.data.data.material_accessory;
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
        this.getInfo(queryData.item.id);
      }
    } else {
      this.getcode();
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