<!--  -->
<template>
  <div id="comSearch">
    <van-form
      @submit="onSubmit"
      id="searchForm"
      :show-error-message="false"
      :scroll-to-error="true"
    >
      <div
        class="search_item"
        v-for="(item, index) in trueTitlelist"
        :key="index"
      >
        <div class="item_top">
          <div class="top_left">条件{{ index + 1 }}</div>
          <div class="top_right" @click="deleteSearch(item)">删除</div>
        </div>
        <div class="search_mid">
          <div class="mid_left">{{ item.label }}</div>
          <van-dropdown-menu v-if="item.component_name != 'DDDateField'">
            <van-dropdown-item
              @change="dropChange"
              v-model="item.seaechtype"
              :options="option1"
            />
          </van-dropdown-menu>
          <van-dropdown-menu v-else>
            <van-dropdown-item
              disabled
              v-model="item.seaechtype"
              :options="option1"
            />
          </van-dropdown-menu>
        </div>

        <div v-if="item.component_name === 'MoneyField'">
          <input
            maxlength="30"
            class="customInput"
            v-model="searchForm[item.value]"
            placeholder="请选择"
            type="number"
          />
        </div>
        <div v-else-if="item.component_name === 'DDSelectField'">
          <input
            class="customInput"
            type="text"
            v-model="searchForm[item.value]"
            placeholder="请选择"
            readonly
            @click="openSelect(item)"
          />
        </div>
        <div v-else-if="item.component_name === 'DDDateField'">
          <input
            class="customInput"
            type="text"
            v-model="searchForm[item.value]"
            placeholder="请选择"
            readonly
            @click="openCalendar(item)"
          />
        </div>
        <div v-else-if="item.component_name === 'InnerContactField'">
          <input
            class="customInput"
            type="text"
            v-model="searchForm[item.value]"
            placeholder="请选择"
            readonly
            @click="selectPeo(item.value)"
          />
        </div>
        <div v-else-if="item.component_name === 'DepartmentField'">
          <input
            class="customInput"
            type="text"
            v-model="searchForm[item.value]"
            placeholder="请选择"
            readonly
            @click="selectDepart(item.value)"
          />
        </div>
        <div v-else>
          <input
            class="customInput"
            type="text"
            v-model="searchForm[item.value]"
            placeholder="请输入"
            maxlength="30"
          />
          <!-- <van-field v-model="searchForm[item.value]" placeholder="请输入" /> -->
        </div>
      </div>
    </van-form>
    <div class="additem" @click="openSheet">
      <van-icon name="plus" />
      <span>添加筛选条件</span>
    </div>
    <div style="height: 3.1rem"></div>
    <div class="sureBtn">
      <van-button style="width: 40%" round type="info" @click="resetSearch"
        >重 置</van-button
      >

      <van-button style="width: 40%" round type="info" @click="suiteSearch"
        >确 定</van-button
      >
    </div>

    <van-action-sheet
      v-model="sheetshow"
      :actions="allTitlelist"
      cancel-text="取消"
      close-on-click-action
      @cancel="sheetshow = false"
      @select="onSelect"
    />
    <!-- 选择框 -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        value-key="name"
        :columns="columnsList"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 时间选择 -->
    <van-calendar
      color="#0089FF"
      v-model="calendarshow"
      type="range"
      :min-date="minDate"
      @confirm="oncalendarConfirm"
    />
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: '',
  data() {
    return {
      typeList: [],
      minDate: new Date(2000, 11, 1),
      calendarshow: false,

      selectData: {},
      showPicker: false,
      sheetshow: false,
      searchForm: {},
      columnsList: [],
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
      trueTitlelist: [],
      allTitlelist: [],

      value1: 0,
      option1: [
        { text: '属于', value: 'like|' },
        { text: '等于', value: '=|' },
      ],
      username: '',
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    //   选部门
    selectDepart(value) {
      console.log('547');
      const _this = this;
      dd.ready(() => {
        dd.biz.contact.departmentsPicker({
          title: '测试标题', //标题
          corpId: _this.$store.state.userInfo.corpid, //企业的corpId
          multiple: false, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxDepartments: 1, //最大选择部门数量
          pickedDepartments: [], //已选部门
          disabledDepartments: [], //不可选部门
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: 158, //微应用的Id
          permissionType: 'GLOBAL', //选人权限，目前只有GLOBAL这个参数
          onSuccess: function (result) {
            _this.searchForm[value] = result.departments[0].name;

            /**
        {
            userCount:1,                              //选择人数
            departmentsCount:1，//选择的部门数量
            departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */
          },
          onFail: function (err) {},
        });
      });
    },
    //   选人
    selectPeo(value) {
      console.log('547');
      const _this = this;
      dd.ready(() => {
        dd.biz.contact.complexPicker({
          title: '测试标题', //标题
          corpId: _this.$store.state.userInfo.corpid, //企业的corpId
          multiple: false, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxUsers: 1, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: 158, //微应用Id，企业内部应用查看AgentId
          permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: false, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            _this.searchForm[value] = result.users[0].name;
            if (value === 'send_name') {
              _this.searchForm.send_userid = result.users[0].emplId;
            } else if (value === 'in_charge') {
              _this.searchForm.in_chargeid = result.users[0].emplId;
            }

            /**
        {
            selectedCount:1,                              //选择人数
            users:[{"name":"","avatar":"","emplId ":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
            departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */
          },
          onFail: function (err) {},
        });
      });
    },
    //   选择时间
    openCalendar(item) {
      this.calendarshow = true;
      this.selectData = item;
    },
    oncalendarConfirm(date) {
      const [start, end] = date;
      const ade = this.selectData.value;

      this.searchForm[ade] = `${this.$utils.timeChange(
        start,
        2,
      )} - ${this.$utils.timeChange(end, 2)}`;
      console.log(this.$utils.timeChange(start, 2));
      this.calendarshow = false;
    },
    inputchange(value, item) {
      console.log(value, item);
      this.searchForm[item.dataIndex] = value;
      console.log('123456', this.searchForm);
    },

    //   选择框确认
    openSelect(item) {
      this.showPicker = true;
      this.selectData = item;
      this.columnsList = item.selectList;
    },
    onConfirm(value) {
      console.log(this.selectData);
      const ade = this.selectData.value;

      this.searchForm[ade] = value.name;

      console.log('85852', this.searchForm);

      this.showPicker = false;
    },
    //   所属等于
    dropChange(value) {
      console.log(value);
      this.$nextTick(() => {
        this.updateSearch();
      });
    },
    //打开添加面板
    openSheet() {
      this.sheetshow = true;
    },
    // 添加筛选选项
    onSelect(item) {
      console.log(item);
      this.allTitlelist.forEach(e => {
        if (e.value == item.value) {
          item.is_search = true;
        }
      });
      this.$nextTick(() => {
        this.updateSearch();
      });
    },
    // 删除筛选选项
    deleteSearch(item) {
      this.allTitlelist.forEach(e => {
        if (e.value == item.value) {
          item.is_search = false;
        }
      });
      this.$nextTick(() => {
        this.updateSearch();
      });
    },
    resetSearch() {
      const restData = this.searchForm;
      for (let key in restData) {
        restData[key] = undefined;
      }
    },
    //suiteSearch
    suiteSearch() {
      console.log(this.searchForm);
      let newData = {};
      let newValue = JSON.parse(JSON.stringify(this.searchForm));
      for (const key in newValue) {
        //   if (newValue[key] == ['', '']) newValue[key] = '';
        if (newValue[key].length != 0) {
          let asd = {};
          asd[key] = newValue[key];
          Object.assign(newData, asd);
          console.log('222', asd, key, newValue[key]);
        }
      }

      this.$store.commit('setsearchData', newData);
      let parmars = JSON.parse(JSON.stringify(newData));
      this.$store.commit(
        'setparmarsData',
        this.changeSearD(this.trueTitlelist, parmars),
      );
      this.$router.go(-1);
      console.log('111222222', newData);
    },
    //下拉菜单事件
    dropdownChange(value) {
      console.log(value);
    },
    onSubmit() {},
    //获取筛选显示项
    getsearchCriteria() {
      this.axiosPost('/baselibrary/searchCriteria', {
        table_name: this.$route.query.searchTyppe,
      }).then(res => {
        if (res.data.code == 1) {
          res.data.data.forEach(item => {
            item.name = item.label;
            item.disabled = item.is_search;
          });
          this.allTitlelist = res.data.data;
          console.log('444', this.allTitlelist);
          let newarr = [];
          res.data.data.forEach(element => {
            if (element.is_search) {
              newarr.push(element);
            }
          });
          this.trueTitlelist = newarr;

          this.trueTitlelist.forEach(e => {
            // e.seaechtype = 'like|';
            // this.searchForm[e.value] = '';
            if (e.value === 'unit_type') {
              this.typeListS(e);
            } else if (e.value === 'unit_nature') {
              e.selectList = this.selectApi.unit_naturelist;
            } else if (e.value === 'taxpayer_type') {
              e.selectList = this.selectApi.taxpayer_typelist;
            } else if (e.value === 'ticket_type') {
              e.selectList = this.selectApi.ticket_typelist;
            } else if (e.value === 'current_state') {
              e.selectList = this.selectApi.current_state_list;
            }
          });

          console.log('searchForm++++11', this.searchForm);
        } else {
        }
      });
    },
    //更新筛选
    updateSearch() {
      this.axiosPost('/baselibrary/searchUpdate', {
        table_name: this.$route.query.searchTyppe,
        show_data: JSON.stringify(this.allTitlelist),
        type: '2',
      }).then(res => {
        if (res.data.code == 1) {
          this.getsearchCriteria();
          //   this.$message.info(res.data.msg);
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    //往来单位类型列表
    typeListS(e) {
      this.axiosPost('/baselibrary/suppliertypeList')
        .then(res => {
          if (res.data.code === 1) {
            this.typeList = [];
            res.data.data.map(item => {
              item.name = item.unit_type;
              //   item.name = item.unit_type;
              this.typeList.push(item);
            });
            this.$nextTick(() => {
              e.selectList = this.typeList;
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //转换搜索
    changeSearD(newList, serachData) {
      newList.forEach(item => {
        if (serachData.hasOwnProperty(item.value)) {
          if (item.component_name != 'DDDateField') {
            serachData[item.value] =
              serachData[item.value] == ''
                ? ''
                : item.seaechtype + serachData[item.value];
          } else {
            console.log('8787878', serachData[item.value]);

            if (
              serachData[item.value][0] != '' &&
              serachData[item.value][1] != ''
            ) {
              let asdlist = serachData[item.value].split(' - ');
              let starttime = asdlist[0];
              let endtime = asdlist[1];

              serachData[item.value] = `>=|${starttime}|<=|${endtime}`;
              console.log('81111787878', serachData[item.value]);
            } else {
              serachData[item.value] = '';
            }
          }
        }
      });
      return serachData;
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getsearchCriteria();
  },
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.searchForm = this.$store.state.searchData;
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
#comSearch {
  #searchForm {
    .van-cell {
      display: inherit;
    }
    .search_item {
      margin-bottom: 0.15rem;
      //   background-color: #fff;
      .item_top {
        display: flex;
        padding: 0.26667rem 0.42667rem;
        align-items: center;
        justify-content: space-between;
        .top_left {
          font-size: 0.33rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;
        }
        .top_right {
          font-size: 0.37rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #0089ff;
        }
      }
      .search_mid {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.2rem 0.42667rem;
        border-bottom: 1px solid #f0f0f0;
        .mid_left {
          font-size: 0.4rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #000000;
        }
        .van-dropdown-menu {
          .van-dropdown-menu__bar {
            box-shadow: initial;
            height: auto;
          }
          .van-cell--clickable {
            display: flex;
          }
        }
      }
    }
    .customInput {
      box-sizing: border-box;
      border: 0;
      width: 100%;
      padding: 0.26667rem 0.42667rem;
      overflow: hidden;
      color: #323233;
      font-size: 0.37333rem;
      line-height: 0.64rem;
      background-color: #fff;
    }
  }
  .additem {
    height: 1.36rem;
    margin-top: 0.15rem;
    background-color: #fff;
    font-size: 0.4rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #0089ff;
    line-height: 1.36rem;
    padding: 0 0.42667rem;
  }
}
</style>