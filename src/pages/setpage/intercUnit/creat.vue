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
          fieldlable: '单位名称', //输入框lable
          fieldrequired: true, //是否必填
          filedmodel: 'unit_name', //输入框model
        },
        {
          fieldtype: 'DDSelectField', //输入框类型
          fieldlable: '单位类型', //输入框lable
          fieldrequired: true, //是否必填
          filedmodel: 'unit_type', //输入框model
          valuekey: 'unit_type',
          selseckList: [], //倆拉框數據
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '统一社会信用代码', //输入框lable
          fieldrequired: false, //是否必填
          filedmodel: 'code', //输入框model
        },
        {
          fieldtype: 'DDSelectField', //输入框类型
          fieldlable: '单位性质', //输入框lable
          fieldrequired: true, //是否必填
          filedmodel: 'unit_nature', //输入框model
          valuekey: 'name',

          selseckList: [
            { name: '事业', id: '事业' },
            { name: '企业', id: '企业' },
            { name: '社团', id: '社团' },
            { name: '自然人', id: '自然人' },
            { name: '其他', id: '其他' },
          ],
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '地址', //输入框lable
          fieldrequired: false, //是否必填
          filedmodel: 'address', //输入框model
        },
        {
          fieldtype: 'TextphoneField', //输入框类型
          fieldlable: '电话', //输入框lable
          fieldrequired: false, //是否必填
          filedmodel: 'phone', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '银行账户', //输入框lable
          fieldrequired: false, //是否必填
          filedmodel: 'bank_card', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '开户行', //输入框lable
          fieldrequired: false, //是否必填
          filedmodel: 'bank_name', //输入框model
        },
        {
          fieldtype: 'TextField', //输入框类型
          fieldlable: '行号', //输入框lable
          fieldrequired: false, //是否必填
          filedmodel: 'shops', //输入框model
        },
      ],
      formData: {
        unit_name: '',
        unit_type: '',
        unit_nature: '',
        code: '',
        address: '',
        phone: '',
        bank_card: '',
        bank_name: '',
        shops: '',
        taxpayer_type: '',
        legal_representative: '',
        personnel_size: '',
        contacts: '',
        structure: '',
        scope: '',
        qualifications: '',
        in_department: '',
        in_charge: '',
        in_chargeid: '',
        ticket_type: [],
        enclosure: [],
        contacts_phone: '',
        remarks: '',
        regist_capital: '',
        establish_date: '',
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
    //单位类型列表
    typeList() {
      this.axiosPost('/baselibrary/suppliertypeList').then(res => {
        if (res.data.code == 1) {
          this.comForeList[1].selseckList = res.data.data;
        }
      });
    },
    // 新建
    addData() {
      this.axiosPost('/baselibrary/supplierinfoAdd', this.formData).then(
        res => {
          this.$toast(res.data.msg);

          if (res.data.code == 1) {
            this.$router.go(-1);
          }
        },
      );
    },
    //编辑 获取详情
    getInfo(id) {
      this.axiosPost('/baselibrary/suppliertypeHx', { id }).then(res => {
        if (res.data.code == 1) {
          this.formData = res.data.data;
        }
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.typeList();
    console.log(this.$route.query);
    let queryData = this.$route.query;
    if (queryData.type != 'creat') {
      if (queryData.b_name == 'warehouse_info') {
        this.formData = queryData.item;
      } else {
        this.getInfo(queryData.item.id);
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