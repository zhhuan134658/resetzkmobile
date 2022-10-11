<!-- 人员 -->
<template>
  <div id="peoplelist">
    <div>
      <div class="listitem" v-for="(item, index) in Userlist" :key="index">
        <div v-if="item.avatar" class="itemimg1">
          <img :src="item.avatar" alt="" />
        </div>
        <div v-else class="itemimg">
          {{
            2 >= item.name.length
              ? item.name
              : item.name.substr(item.name.length - 2, 2)
          }}
        </div>
        <div class="itemname">{{ item.name }}</div>
        <div class="deletei" @click="czitem(item)">操作</div>
      </div>
      <van-empty v-if="Userlist.length < 1" description="暂无数据" />
    </div>
    <div style="height: 3.1rem"></div>
    <div class="sureBtn">
      <van-button round @click="addguamli('1')" type="info"
        >添加人员</van-button
      >
    </div>
    <van-action-sheet
      v-model="sheetshow"
      :actions="actions"
      @select="onSelect"
    />

    <van-popup v-model="popupshow" position="bottom" :style="{ height: '70%' }">
      <div>
        <div
          class="listitem"
          v-for="(item, index) in userScopeList"
          :key="index"
        >
          <div v-if="item.son_avatar" class="itemimg1">
            <img :src="item.son_avatar" alt="" />
          </div>
          <div v-else class="itemimg">
            {{
              2 >= item.son_name.length
                ? item.son_name
                : item.son_name.substr(item.son_name.length - 2, 2)
            }}
          </div>
          <div class="itemname">{{ item.son_name }}</div>
          <div class="deletei" @click="deletepop(item)">删除</div>
        </div>
        <van-empty v-if="userScopeList.length < 1" description="暂无数据" />
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
      popupshow: false,
      sheetshow: false,
      actions: [{ name: '查看' }, { name: '添加管理范围' }, { name: '删除' }],
      Userlist: [],
      noUserList: [],
      checkitem: {},
      userScopeList: [],
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    setTitle() {
      let _this = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: _this.$route.query.item.name, //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    czitem(item) {
      this.checkitem = item;
      this.sheetshow = true;
      console.log('444', item);
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起

      //   Toast(item.name);
      console.log('444', item);
      let _this = this;
      if (item.name == '删除') {
        _this.deleteitem(_this.checkitem);
      } else if (item.name == '添加管理范围') {
        _this.getuserScopeList();

        setTimeout(() => {
          _this.addguamli('2');
        }, 500);

        // this.adduserScopeAdd(5);
      } else {
        _this.popupshow = true;
        _this.getuserScopeList();
      }
      _this.sheetshow = false;
    },

    getuserScopeList() {
      this.axiosPost('/rules/userScopeList', {
        group_id: this.$route.query.item.id,
        userid: this.checkitem.userid,
      }).then(res => {
        if (res.data.code == 1) {
          this.userScopeList = res.data.data;
        } else {
        }
      });
    },
    deletepop(item) {
      this.$dialog
        .confirm({
          title: '警告提示',
          message: '此操作将永久删除选中成员，是否继续？',
        })
        .then(() => {
          this.axiosPost('/rules/userScopeDel', {
            id_arr: [item.id],
          }).then(res => {
            if (res.data.code == 1) {
              this.$toast(res.data.msg);

              this.getuserScopeList();
            } else {
              this.$toast(res.data.msg);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    getUserlist() {
      this.axiosPost('/rules/userList', {
        group_id: this.$route.query.item.id,
      }).then(res => {
        this.Userlist = res.data.data;
        let list = [];
        res.data.data.forEach(e => {
          e.check = false;
          list.push(e.userid);
        });
        this.noUserList = list;
      });
    },
    //添加人员.
    addguamli(type) {
      const that = this;
      let pickedUsers = [];

      that.userScopeList.map(item => {
        pickedUsers.push(item.son_userid);
      });

      console.log(pickedUsers);
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: '通讯录', //标题
          corpId: that.$store.state.userInfo.corpid, //企业的corpId
          multiple: true, //是否多选
          limitTips: '', //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: type == 1 ? [] : pickedUsers, //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: that.noUserList, //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: that.agentid, //微应用的Id
          permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            let chengyuanList = result.users;
            if (type == '1') {
              that.addpeo(chengyuanList);
            } else {
              that.adduserScopeAdd(chengyuanList);
            }
          },
          onFail: function (err) {},
        });
      });
    },
    adduserScopeAdd(row) {
      const { userid, name, avatar } = this.checkitem;
      this.axiosPost('/rules/userScopeAdd', {
        group_id: this.$route.query.item.id,
        userid,
        name,
        avatar,
        user_arr: row,
      }).then(res => {
        if (res.data.code == 1) {
          this.$toast(res.data.msg);

          this.getUserlist();
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    addpeo(userlist) {
      this.axiosPost('/rules/userAdd', {
        group_id: this.$route.query.item.id,
        userid_arr: JSON.stringify(userlist),
      }).then(res => {
        if (res.data.code == 1) {
          this.$toast(res.data.msg);

          this.getUserlist();
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    //删除人员
    deleteitem(item) {
      this.$dialog
        .confirm({
          title: '警告提示',
          message: '此操作将永久删除选中成员，是否继续？',
        })
        .then(() => {
          this.axiosPost('/rules/userDel', {
            group_id: this.$route.query.item.id,
            id_arr: [item.id],
          }).then(res => {
            if (res.data.code == 1) {
              this.$toast(res.data.msg);

              this.getUserlist();
            } else {
              this.$toast(res.data.msg);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.setTitle();
    this.getUserlist();
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