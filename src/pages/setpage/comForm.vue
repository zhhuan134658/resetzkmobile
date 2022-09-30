<!--  -->
<template>
  <div id="warehousecreat">
    <!-- {{ formData }} -->
    <van-form
      @submit="onSubmit"
      @faile="onFailed"
      id="comForm"
      :show-error-message="false"
      :scroll-to-error="true"
    >
      <div v-for="(item, index) in comForeList" :key="index">
        <van-field
          class="textarea"
          v-if="item.fieldtype == 'TextareaField'"
          v-model="formData[item.filedmodel]"
          rows="2"
          autosize
          :label="item.fieldlable"
          type="textarea"
          maxlength="200"
          :placeholder="`请输入${item.fieldlable}`"
          show-word-limit
        />

        <van-field
          v-else-if="item.fieldtype == 'DDSelectField'"
          v-model="formData[item.filedmodel]"
          :name="item.fieldlable"
          :required="item.fieldrequired"
          readonly
          :label="item.fieldlable"
          :placeholder="`请选择${item.fieldlable}`"
          :rules="[{ required: item.fieldrequired }]"
          @click="seleckClick(item, item.filedmodel)"
        />
        <van-field
          v-else-if="item.fieldtype == 'DDSelectField11'"
          v-model="formData.goods_typename"
          :name="item.fieldlable"
          :required="item.fieldrequired"
          readonly
          :label="item.fieldlable"
          :placeholder="`请选择${item.fieldlable}`"
          :rules="[{ required: item.fieldrequired }]"
          @click="seleckClick(item, item.filedmodel)"
        />
        <van-field
          v-else-if="item.fieldtype == 'TextnumField'"
          v-model="formData[item.filedmodel]"
          type="number"
          :name="item.fieldlable"
          :required="item.fieldrequired"
          :label="item.fieldlable"
          maxlength="30"
          :placeholder="`请输入${item.fieldlable}`"
          :rules="[{ required: item.fieldrequired }]"
        />
        <van-field
          v-else-if="item.fieldtype == 'TextphoneField'"
          v-model="formData[item.filedmodel]"
          :name="item.fieldlable"
          type="tel"
          maxlength="11"
          :required="item.fieldrequired"
          :label="item.fieldlable"
          :placeholder="`请输入${item.fieldlable}`"
          :rules="[{ required: item.fieldrequired }]"
        />
        <van-field
          v-else
          v-model="formData[item.filedmodel]"
          :name="item.fieldlable"
          maxlength="50"
          :required="item.fieldrequired"
          :label="item.fieldlable"
          :placeholder="`请输入${item.fieldlable}`"
          :rules="[{ required: item.fieldrequired }]"
        />
      </div>
      <div class="ddupload" v-if="formData.enclosure">
        <div class="ddtitle">
          <div class="ddleft">附件</div>
          <div @click="getnewSpaceid" class="ddright">上传附件</div>
        </div>
        <div
          class="ddlist"
          v-if="formData.enclosure && formData.enclosure.length > 0"
        >
          <div class="ddlist_item" v-for="(item, index) in formData.enclosure">
            <img :src="$utils.imgData(item.fileType)" alt="" />

            <div class="ddfilename">
              <div class="topname">{{ item.fileName }}</div>
              <div class="botname">
                {{ $utils.renderSize(item.fileSize) }}
                <span style="color: #0089ff" @click="viewImg(item, index)"
                  >预览</span
                >
              </div>
            </div>
            <van-icon
              @click="deleimg(item, index)"
              size="20"
              name="clear"
              color="#A4A4A4"
            />
          </div>
        </div>
      </div>
      <div style="height: 2.4rem"></div>
      <div class="subbtn">
        <van-button round type="info" native-type="submit">提 交</van-button>
      </div>
    </van-form>
    <!-- 选择器 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :value-key="valuekey"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <!-- <van-popup v-model="showPicker1" position="bottom">
      <van-picker
        value-key="name"
        show-toolbar
        title="标题"
        :columns="columns1"
      />
    </van-popup> -->
    <van-popup v-model="showPicker1" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择"
        :field-names="fieldNames"
        :options="options"
        @close="showPicker1 = false"
        @finish="onFinish"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';

export default {
  name: '',
  props: {
    comForeList: Array,
    formData: Object,
  },
  data() {
    return {
      cascaderValue: '',
      showPicker1: false,
      fieldNames: {
        text: 'name',
        value: 'id',
        children: 'children',
      },
      options: [
        {
          text: '浙江省',
          value: '330000',
          children: [{ text: '杭州市', value: '330100' }],
        },
        {
          text: '江苏省',
          value: '320000',
          children: [{ text: '南京市', value: '320100' }],
        },
      ],
      newspaceid: '',
      showPicker: false,
      columns: [],
      valuekey: '',
      keyname: '',
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    onFinish({ selectedOptions }) {
      //   this.show = false;
      //   this.fieldValue = selectedOptions.map((option) => option.text).join('/');
    },
    onChange(value, selectedOptions, tabIndex) {
      this.formData.goods_typename =
        value.selectedOptions[value.selectedOptions.length - 1].name;

      this.formData.goods_type =
        value.selectedOptions[value.selectedOptions.length - 1].id;
      console.log(
        value,

        '22',
        this.formData.goods_typename,
      );
    },
    getnewSpaceid() {
      this.axiosPost('/engineering/dingCommonSpaceAdd').then(res => {
        this.newspaceid = res.data.data;
        this.dingpan(this.newspaceid);
      });
    },
    dingpan(newspaceid) {
      const _this = this;
      dd.ready(() => {
        dd.biz.util.uploadAttachment({
          image: {
            multiple: true,
            compress: false,
            max: 9,
            spaceId: newspaceid,
          },
          space: {
            corpId: _this.$store.state.userInfo.corpid,
            spaceId: newspaceid,
            isCopy: 1,
            max: 9,
          },
          file: { spaceId: newspaceid, max: 9 },
          types: ['photo', 'camera', 'file', 'space'], //PC端支持["photo","file","space"]
          onSuccess: function (result) {
            console.log('result', result);

            _this.formData.enclosure = result.data;
          },
          onFail: function (err) {},
        });
      });
    },
    //删除
    deleimg(item, index) {
      this.formData.enclosure.splice(index, 1);
    },
    //   文件预览

    viewImg(record, index) {
      const _this = this;
      console.log('1212', record.id);
      dd.ready(function () {
        dd.biz.cspace.preview({
          corpId: _this.$store.state.userInfo.corpid,
          spaceId: record.spaceId,
          fileId: record.fileId,
          fileName: record.fileName,
          fileSize: record.fileSize,
          fileType: record.fileType,
          onSuccess: function () {
            //无，直接在native显示文件详细信息
          },
          onFail: function () {
            // 无，直接在native页面显示具体的错误
          },
        });
      });
    },
    seleckClick(item, keyname) {
      console.log(item);
      if (item.fieldlable == '物资类型') {
        this.showPicker1 = true;
      } else {
        this.valuekey = item.valuekey;
        this.columns = item.selseckList;
        this.keyname = keyname;
        this.showPicker = true;
      }
    },
    onConfirm(value) {
      this.formData[this.keyname] = value[this.valuekey];
      console.log(value);
      this.showPicker = false;
    },
    onSubmit(values) {
      console.log('submit', values, this.formData);

      this.$emit('addData');
    },
    onFailed(errorInfo) {
      console.log('onFailed', errorInfo);
    },
    gettreeList() {
      this.axiosPost('/OaSuite/materialTypeList').then(res => {
        if (res.data.code == 1) {
          this.options = res.data.data;
        }
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.gettreeList();
  },
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log('onFailed', this.formData);
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