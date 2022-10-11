<!-- 全部应用 -->
<template>
  <div id="allapplication">
    <div class="allapp">
      <div class="allapp_item">
        <div class="item_con">
          <div class="item_com_son" v-for="item1 in commonlyList">
            <van-icon
              name="clear"
              @click="iconClick(item1)"
              color="#F2412C"
              size="16"
            />
            <div
              class="customDiv"
              :style="`background-color:#${
                item1.mobile_color ? item1.mobile_color : '15BC83'
              }`"
            >
              <i
                :class="
                  item1.mobile_icon
                    ? `iconfont ${item1.mobile_icon}`
                    : 'iconfont icon-zanwuxinxi'
                "
                style="font-size: 0.6rem; color: #fff"
              ></i>
            </div>
            <div class="sonfont">
              {{ item1.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 常用应用 -->
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import { Dialog } from 'vant';
export default {
  name: '',
  data() {
    return {
      activeTab: '',
      colorList: [
        '15BC83',
        'FF7C00',
        'F2412C',
        'FF9F00',
        '0089FF',
        '4E6EEE',
        //++++++++++
        '722ED1',
        'F5222D',
        '13C2C2',
        'FAAD14',
      ],
      editshow: false,
      // 头部常用列表
      editList: [],
      allmenu: [],
      commonlyList: [],
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    get() {
      //   this.$toast.loading({
      //     message: '加载中...',
      //     duration: 0,
      //   });
      let filedata = [
        {
          id: 'file',
          imgsrc: '',
          title: '工程文档',
          children: [
            {
              id: 'file',
              imgsrc: 'icon-file_box_fill-01',
              mobile_route: '/engineeringDocument/latelyFile',
              title: '最近文件',
              mobile_color: '15BC83',
              mobile_icon: 'icon-zuijinwenjian',
            },
            {
              id: 'file',
              imgsrc: 'icon-file_box_fill-01',
              mobile_route: '/engineeringDocument/recycleBin',
              title: '回收站',
              mobile_color: 'FF7C00',
              mobile_icon: 'icon-huishouzhan',
            },
            {
              id: 'file',
              imgsrc: 'icon-file_box_fill-01',
              mobile_route: '/engineeringDocument/myCollection',
              mobile_color: 'F2412C',
              title: '我的收藏',
              mobile_icon: 'icon-wodeshoucang',
            },
            {
              id: 'file',
              imgsrc: 'icon-file_box_fill-01',
              mobile_route: '/engineeringDocument/DocumenFile',
              title: '文件',
              mobile_color: 'F5222D',
              mobile_icon: 'icon-wenjian',
            },
            {
              id: 'file',
              imgsrc: 'icon-file_box_fill-01',
              mobile_route: '/engineeringDocument/standardAtlas',
              mobile_color: 'FF9F00',
              mobile_icon: 'icon-kaipiaoshoukuanhuizong',

              title: '规范图集',
            },
            {
              id: 'file',
              imgsrc: 'icon-file_box_fill-01',
              mobile_route: '/engineeringDocument/privateDocuments',
              mobile_color: '0089FF',
              title: '私人文件',
              mobile_icon: 'icon-shoupiaodengji',
            },
          ],
        },
      ];
      let tasklist = [
        {
          id: 'task',
          imgsrc: '',
          title: '任务',
          children: [
            {
              id: 'task',
              imgsrc: 'icon-file_box_fill-01',
              mobile_route: '/task/taskindex',
              title: '任务',
              mobile_color: '15BC83',
              mobile_icon: 'icon-zuijinwenjian',
            },
          ],
        },
      ];

      this.axiosPost('/baselibrary/menuPc', {
        userid: this.$store.state.userInfo.userid,
        type: '',
      }).then(res => {
        if (res.data.code == 1) {
          let resData = res.data.data.concat(filedata).concat(tasklist);
          this.allmenu = resData;
          //   let queryitem = this.$route.query.item;
          //   resData.map((item, index) => {
          //     if (item.id == queryitem.id) {
          //       console.log('1221', item);
          //       //   resData.unshift(resData.splice(index, 1)[0]);

          //       this.allmenu = [item];
          //     }
          //   });
          //   //   this.allmenu = resData;

          console.log('resData', resData);
          //   this.$toast.clear();
        }
      });
    },
    // 获取常用应用列表
    getcommonlyList() {
      this.axiosPost('/baselibrary/commonlyTypelist', {
        userid: this.$store.state.userInfo.userid,
      }).then(res => {
        if (res.data.code == 1) {
          let resData = res.data.data;

          this.commonlyList = resData;
        }
      });
    },
    // 编辑
    editClick() {
      this.editshow = !this.editshow;
    },
    // 图标事件
    iconClick(item) {
      if (item.isselected == 0) {
        // 添加常用

        this.axiosPost('/baselibrary/commonlyTypeadd', {
          cid: item.id,
        }).then(res => {
          if (res.data.code == 1) {
            this.get();
            this.getcommonlyList();
          } else {
            this.$toast(res.data.msg);
          }
        });
      } else {
        //删除常用

        Dialog.confirm({
          title: '是否删除',
          message: '是否删除常用应用',
        })
          .then(() => {
            this.axiosPost('/baselibrary/commonlyTypedel', {
              id: item.id,
            }).then(res => {
              if (res.data.code == 1) {
                this.get();
                this.getcommonlyList();
              } else {
                this.$toast(res.data.msg);
              }
            });
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      }
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.get();
    this.getcommonlyList();
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