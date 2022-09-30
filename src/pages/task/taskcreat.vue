<!-- 任务新建 -->
<template>
  <div id="taskcreat">
    <van-field
      class="tasktitle"
      v-model="taskform.task_name"
      placeholder="输入任务标题 如：策划活动"
    />
    <van-cell class="taskcell" size="large" :border="false">
      <template #title>
        <span style="color: #c8c9cc"
          >项目名称：{{ taskform.project_name }}</span
        >
      </template>
      <template #icon>
        <van-icon class="left_icon" name="label-o" size="20" />
      </template>
    </van-cell>
    <!-- 执行人 -->
    <van-cell class="taskcell" size="large" :border="false">
      <template #title>
        <div @click="selectDDpeo(false, 1)">
          {{ taskform.waitme.name || '' }}
        </div>
        <div
          style="color: #c8c9cc"
          @click="selectDDpeo(false, 1)"
          v-if="!taskform.waitme.name"
        >
          请选择执行人
        </div>
        <div v-if="taskform.waitme.name" class="titleright">执行人</div>
      </template>
      <template #icon>
        <img
          v-if="taskform.waitme && taskform.waitme.avatar"
          :src="taskform.waitme.avatar"
          alt=""
          class="left_icon left_icon_one"
        />
        <span
          v-if="
            taskform.waitme && !taskform.waitme.avatar && taskform.waitme.name
          "
          class="left_icon left_icon_one"
          >{{ taskform.waitme.name[taskform.waitme.name.length] }}</span
        >
      </template>
      <template #right-icon>
        <van-icon
          v-if="taskform.waitme.name"
          class="righticon"
          color="#BEBEBE"
          name="cross"
        />
        <van-icon
          @click="selectDDpeo(false, 1)"
          class="righticon"
          color="#BEBEBE"
          name="arrow"
        />
      </template>
    </van-cell>
    <!-- 日期 -->
    <van-cell class="taskcell" size="large" :border="false">
      <template #title>
        <!-- <div>设置截止时间</div> -->
        <!-- <div>{{ date }}</div> -->
        <div @click="selectTime" v-if="taskform.start_time.length > 0">
          {{ `${taskform.start_time[0]} -- ${taskform.start_time[1]}` }}
        </div>
        <div @click="selectTime" style="color: #c8c9cc" v-else>
          设置起止时间
        </div>
      </template>
      <template #icon>
        <van-icon class="left_icon" name="underway-o" size="20" />
      </template>
      <template #right-icon>
        <van-icon class="righticon" color="#BEBEBE" name="arrow" />
      </template>
    </van-cell>
    <div style="height: 0.03rem; background: #ededed"></div>
    <!-- 备注 -->
    <van-cell class="taskcell" size="large" :border="false">
      <template #icon>
        <van-icon class="left_icon" name="notes-o" size="20" />
      </template>
      <template #title>
        <van-field
          class="vancellfield"
          v-model="taskform.remarks"
          placeholder="添加备注"
        />
      </template>
    </van-cell>
    <!-- 参与人 -->
    <div @click="selectDDpeo(true, 1)">
      <van-cell
        class="taskcell taskcellone"
        size="large"
        :border="false"
        is-link
      >
        <template #title>
          <span style="color: #c8c9cc">参与人</span>
        </template>
        <template #icon>
          <van-icon class="left_icon" name="contact" size="20" />
        </template>
      </van-cell>
      <div class="people">
        <div v-for="(item, index) in taskform.cc_user" :key="index">
          <img
            v-if="item.avatar"
            :src="item.avatar"
            alt=""
            class="people_icon"
          />
          <div v-else class="people_icon">
            {{ item.name[0] }}
          </div>
        </div>
      </div>
    </div>
    <!-- 附件 -->
    <div>
      <van-cell
        class="taskcell taskcellone"
        size="large"
        :border="false"
        is-link
        @click="getnewSpaceid"
      >
        <template #title>
          <span style="color: #c8c9cc">附件</span>
        </template>
        <template #icon>
          <van-icon class="left_icon" name="description" size="20" />
        </template>
      </van-cell>

      <div
        class="ddlist"
        v-if="taskform.enclosure && taskform.enclosure.length > 0"
      >
        <div class="ddlist_item" v-for="(item, index) in taskform.enclosure">
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
            size="18"
            name="clear"
            color="#A4A4A4"
          />
        </div>
      </div>
    </div>
    <!-- 工时 -->
    <van-cell
      class="taskcell"
      title="工时"
      size="large"
      :border="false"
      is-link
      @click="slectHourse"
    >
      <template #title>
        <span style="color: #c8c9cc">工时</span>
      </template>
      <template #icon>
        <van-icon class="left_icon" name="browsing-history-o" size="20" />
      </template>
    </van-cell>

    <div style="height: 3.1rem"></div>

    <div class="sureBtn">
      <van-button round type="info" @click="goCreat">添 加</van-button>
    </div>
    <!--选择日期区间  -->
    <van-calendar
      color="#1989fa"
      v-model="calendarshow"
      type="range"
      @confirm="onConfirm"
    />
    <van-calendar
      color="#1989fa"
      v-model="calendarshowONE"
      :min-date="minDate"
      :max-date="maxDate"
      type="range"
      @confirm="onConfirmone"
    />
    <!-- 设置工时 -->
    <van-popup v-model="hourseshow" position="top">
      <van-form id="searchForm" label-align="right">
        <van-field
          v-model="taskform.man_hour.executor.name || ''"
          name="工时执行者"
          label="工时执行者"
          placeholder="工时执行者"
          :rules="[{ required: true, message: '请选择工时执行者' }]"
          clickable
          readonly
          @click="selectDDpeo(false, 2)"
        />
        <van-field
          readonly
          clickable
          name="datetimePicker"
          v-model="taskform.man_hour.start_time"
          label="时间"
          placeholder="点击选择时间"
          @click="calendarshowONE = true"
        />

        <van-field name="switch" label="计划工时数" class="couste">
          <template #input>
            <van-field
              class="textinput"
              v-model="taskform.man_hour.worktime"
              type="number"
              placeholder="请选择计划工时"
              @input="inputChange"
            >
              <template #button>
                <span>小时</span>
              </template>
            </van-field>
            <van-dropdown-menu>
              <van-dropdown-item
                @change="dropChange"
                v-model="value1"
                :options="option1"
              />
            </van-dropdown-menu>
          </template>
        </van-field>
        <div
          style="margin-left: 6.2em; padding-left: 1.1rem; line-height: 0.8rem"
        >
          <van-icon name="info-o" />
          {{
            value1 === '总计' ? `共${addXS || 0}小时` : `日均${addXS || 0}小时`
          }}
        </div>
      </van-form>
    </van-popup>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'taskcreat',
  data() {
    return {
      addXS: 0,
      dayNumbs: 0,
      value1: '总计',
      option1: [
        { text: '总计', value: '总计' },
        { text: '每天', value: '每天' },
      ],
      minDate: new Date(),
      maxDate: new Date(),
      calendarshowONE: false,
      hourseshow: false,

      calendarshow: false,
      date: '',
      value: '',
      taskform: {
        enclosure: [],
        task_name: '',
        pid: '0',
        waitme: {},
        start_time: [],
        // end_time: '',
        project_name: this.$store.state.taskProject || '',
        remarks: '',
        label: [],
        cc_user: [],
        task_type: '1',
        send_user: {
          id: this.$store.state.userInfo.userid,
          name: this.$store.state.userInfo.username,
          avatar: this.$store.state.userInfo.userimg,
        },
        man_hour: {
          executor: {},
          is_total_day: '总计',
          send_user: {
            id: this.$store.state.userInfo.userid,
            name: this.$store.state.userInfo.username,
            avatar: this.$store.state.userInfo.userimg,
          },
          start_time: [],
          type: '',
          worktime: '',
        },
        current_state: '',
      },
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    selectTime() {
      console.log('12121');
      this.calendarshow = true;
    },
    //   工时
    inputChange() {
      if (this.taskform.man_hour.is_total_day == '每天') {
        this.addXS = (this.taskform.man_hour.worktime / this.dayNumbs).toFixed(
          2,
        );
      } else {
        this.addXS = (this.taskform.man_hour.worktime * this.dayNumbs).toFixed(
          2,
        );
      }
    },
    dropChange(value) {
      console.log(value);
      this.taskform.man_hour.is_total_day = value;
      if (value == '每天') {
        this.addXS = (this.taskform.man_hour.worktime / this.dayNumbs).toFixed(
          2,
        );
      } else {
        this.addXS = (this.taskform.man_hour.worktime * this.dayNumbs).toFixed(
          2,
        );
      }
    },
    slectHourse() {
      if (this.taskform.start_time.length > 0) {
        this.hourseshow = true;
      } else {
        this.$toast('请选择时间');
      }
    },
    onConfirmone(date) {
      const [start, end] = date;

      this.taskform.man_hour.start_time = [
        `${this.formatDate(start)}`,
        `${this.formatDate(end)}`,
      ];

      this.calendarshowONE = false;
      this.dayNumbs = this.$utils.timestampToTime(
        start.getTime(),
        end.getTime(),
        true,
      );
    },
    //   附件
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

            _this.taskform.enclosure = result.data;
          },
          onFail: function (err) {},
        });
      });
    },
    //删除
    deleimg(item, index) {
      this.taskform.enclosure.splice(index, 1);
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
    //   日期确认
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      console.log(date);
      const [start, end] = date;

      this.taskform.start_time = [
        `${this.formatDate(start)}`,
        `${this.formatDate(end)}`,
      ];
      this.calendarshow = false;

      this.minDate = start; //new Date(2010, 0, 1)
      this.maxDate = end;

      console.log(' this.minDate', this.minDate);
    },
    //选择人员
    selectDDpeo(multiple, type) {
      let _this = this;
      let pickedUsers = [];
      if (multiple) {
        if (_this.taskform.cc_user.length > 0) {
          pickedUsers = _this.taskform.cc_user.map(item => {
            return item.emplId;
          });
        }
      } else {
        if (_this.taskform.waitme.emplId) {
          pickedUsers = [_this.taskform.waitme.emplId];
        }
      }
      dd.ready(() => {
        dd.biz.contact.complexPicker({
          title: '测试标题', //标题
          corpId: _this.$store.state.userInfo.corpid, //企业的corpId
          multiple: multiple, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxUsers: 91, //最大可选人数
          pickedUsers: pickedUsers, //已选用户
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
            if (multiple) {
              // 参与人
              _this.taskform.cc_user = result.users;
            } else {
              if (type == 1) {
                // 执行人
                _this.taskform.waitme = result.users[0];
              } else {
                _this.taskform.man_hour.executor = result.users[0];
              }
            }
          },
          onFail: function (err) {},
        });
      });
    },
    // 新建
    goCreat() {
      console.log(this.taskform);
      if (this.taskform.task_name == '') {
        return this.$toast('请填写任务名称');
      }
      this.axiosPost('/baselibrary/taskAdd', this.taskform).then(res => {
        this.$router.go(-1);
        this.$toast(res.data.msg);
      });
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
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