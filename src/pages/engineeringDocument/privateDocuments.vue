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
        >
          <img :src="$utils.imgData(item.file_extension)" alt="" />
          <div class="middle">
            <div class="middletop">{{ item.file_name }}</div>
            <div class="middlebot">
              {{ $utils.renderSize(item.file_size) }} {{ item.send_name }}
              {{ item.update_time }}
            </div>
          </div>
          <van-icon
            @click.native.stop="iconClick(item)"
            class="iconcc"
            name="ellipsis"
          />
        </div>
      </van-list>
    </div>
    <img
      v-if="$route.query.itemdata"
      @click="ddupload"
      class="ddupload"
      src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ryrm38GY351660891369600.png"
      alt=""
    />

    <van-empty v-if="proList.length < 1" description="暂无数据" />
    <!-- 文件的操作 -->
    <van-action-sheet
      v-model="actionshow"
      :actions="actionslist"
      @select="onSelect"
      cancel-text="取消"
      close-on-click-action
      @cancel="actionshow = false"
    />
    <!-- 重命名 -->
    <van-dialog
      v-model="resetnameshow"
      title="重命名"
      show-cancel-button
      @confirm="handleOk"
    >
      <van-field
        v-model="newName"
        :maxLength="50"
        label=""
        placeholder="请输入"
      />
    </van-dialog>

    <!-- 新建文件夹 -->
    <van-dialog
      v-model="addfile"
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
      v-model="creatshow"
      :actions="creatlist"
      @select="oncreatSelect"
      cancel-text="取消"
      close-on-click-action
      @cancel="creatshow = false"
    />
    <!--移动  -->
    <van-popup v-model="pppshow" position="top" :style="{ height: '60%' }">
      <a-tree
        class="antdtree"
        v-model="checkedKeys"
        :show-line="true"
        @select="onSelecttree"
        :tree-data="treeFileList"
        :replaceFields="{
          children: 'children',
          title: 'file_name',
          key: 'id',
        }"
      >
      </a-tree>
      <div class="bottomBtn">
        <!-- <div
          class="btn"
          v-if="$route.query.typename == 'first'"
          style="color: #e2e2e2"
        >
          新建文件夹
        </div>
        <div class="btn" v-else @click="oncreatSelect">新建文件夹</div> -->
        <div
          class="btn"
          @click="moveFile"
          style="background: #0089ff; color: #fff"
        >
          移动到这里
        </div>
      </div>
    </van-popup>

    <!-- 权限 -->
    <van-popup v-model="roleshow" position="bottom" :style="{ height: '80%' }">
      <div class="listitem" v-for="(item, index) in fileRulesList" :key="index">
        <div class="itemimg">
          {{
            2 >= item.member.memberName.length
              ? item.member.memberName
              : item.member.memberName.substr(
                  item.member.memberName.length - 2,
                  2,
                )
          }}
        </div>
        <div class="itemname">{{ item.member.memberName }}</div>
        <div @click="clickdiv(item)">
          {{ $utils.getRoleNmae(item.role).name }}
        </div>
      </div>
    </van-popup>
    <van-action-sheet
      v-model="roleshowop"
      :actions="actionsrole"
      cancel-text="取消"
      close-on-click-action
      @select="onSelectrole"
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
      checkrole: '',
      roleshowop: false,
      actionsrole: [
        {
          name: '可管理',
          subname: '可上传下载 / 查看 / 编辑 / 删除',
          itemdata: 'admin',
        },
        {
          name: '可编辑',
          subname: '可上传下载 / 查看 / 编辑',
          itemdata: 'editor',
        },
        {
          name: '可查看 / 下载',
          subname: '可下载 / 在线预览',
          itemdata: 'viewer',
        },
        {
          name: '仅可查看',
          subname: '仅可在线预览，不能下载',
          itemdata: 'only_viewer',
        },
        { name: '删除', color: '#ee0a24' },
      ],
      roleUserid: [],
      selectedKeys: [],
      checkedKeys: [],
      treeFileList: [],
      pppshow: false,
      actionslist: [],
      fileRulesList: [],
      amenuitem: [],
      amenuitemfile: [],
      creatlist: [{ name: '上传' }, { name: '新建文件夹' }],
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
    //获取文件权限列表
    getfileRulesList() {
      console.log('sfsdf', this.checkitem);
      const { space_id, file_id } = this.checkitem;
      this.axiosPost('/engineering/fileRulesList', {
        space_id,
        file_id: this.$route.query.typename == 'first' ? '0' : file_id,
      })
        .then(res => {
          let resData = res.data.data;
          if (res.data.code == 1) {
            // if (this.typename == 'first') {
            //   this.roleshow = true;
            // }
            this.fileRulesList = resData;
            let userid = [];
            resData.map(item => {
              userid.push(item.member.memberId);
            });
            this.roleUserid = userid;
            this.roleshow = true;

            // 判断登陆者权限
          } else {
            this.$toast(res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    clickdiv(item) {
      this.roleshowop = true;
      this.checkrole = item;
    },
    //修改权限
    onSelectrole(item) {
      //删除权限
      console.log(this.checkrole, item, this.checkitem);

      const { space_id, file_id } = this.checkitem;
      const { role } = this.checkrole;
      if (item.name == '删除') {
        // console.log('iitem', iitem);
        // const { role } = iitem;
        // const { space_id, file_id } = this.Operationdata;
        this.axiosPost('/engineering/fileRulesDel', {
          now_role: role,
          space_id,
          file_id,
          userid_json: JSON.stringify([this.checkrole.member.memberId]),

          role: role,
        })
          .then(res => {
            this.getfileRulesList();
            this.$toast(res.data.msg);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // console.log(this.checkrole, item, this.checkitem);

        // const { space_id, file_id } = this.checkitem;
        // const { role } = this.checkrole;
        this.axiosPost('/engineering/fileRulesEdit', {
          now_role: role,
          space_id,
          file_id,
          userid_json: JSON.stringify([this.checkrole.member.memberId]),
          role: item.itemdata,
        })
          .then(res => {
            this.getfileRulesList();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    //获取目录结构
    getTreefile(type) {
      this.axiosPost('/engineering/folderList', {
        type: 2,
      })
        .then(res => {
          console.log(res);
          this.treeFileList = [];
          let resData = res.data.data;
          resData.map(item => {
            item = Object.assign(item, { key: item.id, title: item.file_name });
            this.treeFileList.push(item);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    //文件移动
    moveFile() {
      console.log('4545.', this.movetreeData);
      //   return;
      const targetParentId =
        this.movetreeData.file_id == this.movetreeData.space_id
          ? '0'
          : this.movetreeData.file_id;
      this.axiosPost('/engineering/dingFileMove', {
        space_id: this.checkitem.space_id,
        id_arr: [this.checkitem.id],
        targetSpaceId: this.movetreeData.space_id,
        targetParentId,
      })
        .then(res => {
          this.pppshow = false;
          this.$toast(res.data.msg);
          this.getSpaceList();
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSelecttree(selectedKeys, info) {
      console.log('onSelect', selectedKeys, info);
      console.log('5555', info.selectedNodes[0].data.props);

      this.movetreeData = info.selectedNodes[0].data.props;

      this.selectedKeys = selectedKeys;
    },
    //   22
    ddupload() {
      this.creatshow = true;
    },
    oncreatSelect(item) {
      if (item.name == '新建文件夹') {
        this.addfile = true;
      } else {
        let newitem = JSON.parse(this.$route.query.itemdata);

        this.publicspaceId = newitem.space_id;
        this.publicfileId =
          newitem.file_id == newitem.space_id ? '0' : newitem.file_id;

        this.checkrolefun();
      }
    },
    // 上传
    checkrolefun() {
      this.axiosPost('/engineering/ruleVerification', {
        space_id: this.publicspaceId,
        file_id: this.publicfileId,
      }).then(res => {
        let roleList = ['admin', 'editor', 'owner'];

        if (res.data.code == 1) {
          if (res.data.data) {
            if (roleList.includes(res.data.data)) {
              console.log('dfsfd');
              this.getnewSpaceid();
            } else {
              this.$toast('无权限');
            }
          } else {
            this.$toast('无权限');
          }
        } else {
          this.$toast(res.data.data);
        }
      });
    },

    getnewSpaceid() {
      this.axiosPost('/engineering/dingCommonSpaceAdd').then(res => {
        this.newspaceid = res.data.data;
        this.dingpan(res.data.data);
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

            let newlist = result.data;
            // let newone = newlist.map(item => {
            //   return item.fileId;
            // });
            _this.addFile(newlist);
          },
          onFail: function (err) {},
        });
      });
    },
    addFile(file_arr) {
      this.axiosPost('/engineering/dingFileAdd', {
        file_arr,
        type: '2',
      })
        .then(res => {
          this.moveFileadd(
            this.newspaceid,
            res.data.data,
            this.publicspaceId,
            this.publicfileId,
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    moveFileadd(space_id, id_arr, targetSpaceId, targetParentId) {
      this.axiosPost('/engineering/dingFileMove', {
        space_id,
        id_arr,
        targetSpaceId,
        targetParentId,
      })
        .then(res => {
          this.getSpaceList();
          this.$toast(res.data.msg);
        })
        .catch(error => {
          console.log(error);
        });
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
        type: '2',
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
    //获取权限
    droClick(record) {
      this.amenuitem = [];
      this.amenuitemfile = [];
      this.Operationdata = record;
      console.log('sfsdf', this.Operationdata);
      const { space_id, file_id } = this.Operationdata;
      this.axiosPost('/engineering/ruleVerification', {
        space_id,
        file_id,
      }).then(res => {
        let resData = res.data.data;

        if (res.data.code == 1) {
          if (resData) {
            if (resData == 'owner') {
              this.amenuitem = [
                { name: '移动' },
                { name: '重命名' },
                { name: '下载' },
                { name: '删除' },
              ];
              this.amenuitemfile = [{ name: '重命名' }, { name: '删除' }];
            } else if (resData == 'admin') {
              this.amenuitem = [
                { name: '移动' },
                { name: '重命名' },
                { name: '下载' },

                { name: '删除' },
              ];
              this.amenuitemfile = [{ name: '重命名' }, { name: '删除' }];
            } else if (resData == 'editor') {
              this.amenuitem = [{ name: '重命名' }, { name: '下载' }];
              this.amenuitemfile = [{ name: '重命名' }];
            } else if (resData == 'viewer') {
              this.amenuitem = [{ name: '下载' }];
              this.amenuitemfile = [];
            } else if (resData == 'only_viewer') {
              this.amenuitem = [];
              this.amenuitemfile = [];
            }

            this.checkitem = record;
            this.actionshow = true;

            if (record.file_type == 'folder') {
              this.actionslist = this.amenuitemfile;
            } else {
              this.actionslist = this.amenuitem;
            }
          } else {
            this.$toast('您没有权限进行此操作');
          }
        } else {
          this.$toast('您没有权限进行此操作');
        }
      });
    },
    // 下载
    dewnapi(id_arr) {
      this.axiosPost('/engineering/downFileList', { id_arr }).then(res => {
        console.log('dsfsf', res);
        let resDat = res.data.data;
        let bewArr = [];
        resDat.map(item => {
          const fileurl = `https://space.dingtalk.com/attachment/mdown?biztype=file&bizid=${item.space_id}&objectid=${item.file_id}&version=1`;

          const filename = item.file_name;
          console.log('fileurl', fileurl, filename);

          bewArr.push({ fileUrl: fileurl, renameFileName: filename });
          this.dingdownloadFile(fileurl, filename);
        });
        // this.selectedRows = bewArr;
        // this.batchQrCodeZip(bewArr);
      });
    },
    dingdownloadFile(fileurl, filename) {
      const _this = this;
      dd.ready(() => {
        dd.biz.util.downloadFile({
          url: fileurl, //要下载的文件的url
          name: filename, //定义下载文件名字
          onProgress: function (msg) {
            _this.selectedRowKeys = [];
            // 文件下载进度回调
          },
          onSuccess: function (result) {
            /*
          true
        */
          },
          onFail: function () {},
        });
      });
    },
    //行点击 获取点击item
    iconClick(item) {
      this.amenuitem = [
        { name: '移动' },
        { name: '重命名' },
        { name: '下载' },
        { name: '删除' },
      ];
      this.amenuitemfile = [{ name: '重命名' }, { name: '删除' }];
      //   this.droClick(item);
      this.checkitem = item;
      this.actionshow = true;

      if (item.file_type == 'folder') {
        this.actionslist = this.amenuitemfile;
      } else {
        this.actionslist = this.amenuitem;
      }
      console.log('qqqq7777', item);
    },
    //操作选项
    onSelect(item) {
      this.actionshow = false;
      if (item.name == '删除') {
        this.deleFile([this.checkitem.id]);
      } else if (item.name == '重命名') {
        let record = this.checkitem;
        if (record.file_type == 'folder') {
          this.newName = record.file_name;
          this.file_extension = '';
        } else {
          let newarr = [];

          newarr = record.file_name.split('.');

          this.file_extension = record.file_extension;
          this.newName = newarr.slice(0, newarr.length - 1);
        }

        this.resetnameshow = true;
      } else if (item.name == '移动') {
        this.pppshow = true;
      } else if (item.name == '下载') {
        this.dewnapi([this.checkitem.id]);
      } else if (item.name == '权限') {
        this.getfileRulesList();
      }
    },
    //重命名
    handleOk() {
      const { space_id, file_id } = this.checkitem;

      this.axiosPost('/engineering/dingFileRename', {
        space_id,
        file_id,
        newFileName:
          this.file_extension != ''
            ? `${this.newName}.${this.file_extension}`
            : this.newName,
      })
        .then(res => {
          console.log(res);
          this.resetnameshow = false;
          this.newName = '';
          this.file_extension = '';
          this.getSpaceList();
          this.$toast(res.data.msg);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //文件删除
    deleFile(id_arr) {
      this.$dialog
        .confirm({
          title: '警告提示',
          message: '此操作将永久删除，是否继续？',
        })
        .then(() => {
          this.axiosPost('/engineering/dingFileDel', {
            id_arr,
          })
            .then(res => {
              console.log(res);
              this.getSpaceList();
              this.$toast(res.data.msg);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 行点击  下探
    fileclick(itemdata) {
      //   this.deonFileitem = itemdata;
      console.log('qqqq');
      this.$router.push({
        path: '/engineeringDocument/standardAtlas',
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
      //   let type = this.$route.query.typename;
      //   let apiname = '/engineering/atlasList';

      //   let prams = Object.assign(
      //     {
      //       number: 10,
      //       page: this.page,
      //       field: '', //排序字段 创建时间create_time   大小file_size  文件名file_name
      //       sort: '', //升序asc  降序desc
      //       file_name: this.searchValue,
      //     },
      //     {
      //       type: 1,
      //       file_id:
      //         type == 'first'
      //           ? ''
      //           : JSON.parse(this.$route.query.itemdata)?.file_id,
      //     },
      //   );

      let prams;

      const { file_id } = this.$route.query.itemdata;

      prams = Object.assign({
        file_name: this.searchValue,
        number: 10,
        page: this.page,
        field: '', //排序字段 创建时间create_time   大小file_size  文件名file_name
        sort: '', //升序asc  降序desc
        type: 2,
        file_id,
      });
      this.axiosPost('/engineering/fileList', prams).then(res => {
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
    this.getTreefile();
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