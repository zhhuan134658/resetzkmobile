<!-- 全部应用 -->
<template>
  <div id="allapplication">
    <!-- 全部 -->

    <div class="allapp">
      <div v-for="(item, index) in allmenu.children">
        <div class="allapp_item" v-if="item.interface != '/'">
          <div class="item_top">{{ item.title }}</div>
          <div class="item_con">
            <div
              class="item_com_son"
              v-for="item1 in item.children"
              @click="openDDsp(item1)"
            >
              <van-icon
                @click="iconClick(item1)"
                v-if="editshow"
                :name="item1.commonly != 0 ? 'clear' : 'add'"
                :color="item1.commonly != 0 ? '#F2412C' : '#0089FF'"
                size="16"
              />
              <i
                :class="
                  item1.mobile_icon
                    ? `font_family ${item1.mobile_icon}`
                    : 'font_family icon-zanwuxinxi'
                "
                style="font-size: 0.8rem"
                :style="`color:#${
                  item1.mobile_color ? item1.mobile_color : '15BC83'
                }`"
              ></i>

              <div class="sonfont">
                {{
                  item1.title.length > 8
                    ? item1.title.substring(0, 8) + '...'
                    : item1.title
                }}
              </div>
            </div>
          </div>
        </div>

        <div class="allapp_item" v-else>
          <div class="item_top">{{ item.title }}</div>
          <div class="item_con">
            <div class="item_com_son" @click="openDDsp(item)">
              <van-icon
                @click="iconClick(item)"
                v-if="editshow"
                :name="item.commonly != 0 ? 'clear' : 'add'"
                :color="item.commonly != 0 ? '#F2412C' : '#0089FF'"
                size="16"
              />
              <i
                :class="
                  item.mobile_icon
                    ? `font_family ${item.mobile_icon}`
                    : 'font_family icon-zanwuxinxi'
                "
                style="font-size: 0.8rem"
                :style="`color:#${
                  item.mobile_color ? item.mobile_color : '15BC83'
                }`"
              ></i>

              <div class="sonfont">
                {{
                  item.title.length > 8
                    ? item.title.substring(0, 8) + '...'
                    : item.title
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'allapplication',
  data() {
    return {
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
      allmenu: {},
      commonlyList: [],
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    openDDsp(item, item1) {
      console.log('414', item, item);
      if (item.id == 'file' || item.id == 'task') {
        this.$router.push({
          path: item.mobile_route,
          query: {
            typename: 'first',
            itemdata: { file_id: 0, id: '0', parent_id: '0' },
          },
        });
      } else {
        this.axiosPost('/project/projectAdd', {
          b_name: item.biao_name,
          title: item.title,
        }).then(res => {
          if (res.data.code == 1) {
            const _this = this;
            let openurl =
              'https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=' +
              _this.$store.state.userInfo.corpid +
              '&swfrom=qrshareh5&tempalteName=' +
              item.title +
              '&processCode=' +
              res.data.data +
              '&back=native#/custom';
            dd.ready(function () {
              dd.biz.util.openLink({
                url: openurl, //要打开链接的地址
                onSuccess: function () {
                  /**/
                },
                onFail: function () {},
              });
            });
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    },
    get() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
      });
      let filedata = [
        {
          id: 'file',
          imgsrc: '',
          title: '工程文档',
          children: [
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
          ],
        },
      ];

      this.axiosPost('/menu/menuMobile').then(res => {
        if (res.data.code == 1) {
          console.log('45454', filedata, tasklist);

          let resData = _.concat(res.data.data, filedata, tasklist);

          //   res.data.data.concat(filedata).concat(tasklist);
          console.log('45454', resData);
          let queryitem = this.$store.state.worlitem;
          resData.map((item, index) => {
            if (item.id == queryitem.id) {
              console.log('1221', item);
              //   resData.unshift(resData.splice(index, 1)[0]);

              this.allmenu = item;
            }
          });

          console.log('resData', resData);
          this.$toast.clear();
        }
      });
    },
    // 获取常用应用列表
    // getcommonlyList() {
    //   this.axiosPost('/baselibrary/commonlyTypelist', {
    //     userid: this.$store.state.userInfo.userid,
    //   }).then(res => {
    //     if (res.data.code == 1) {
    //       let resData = res.data.data;
    //       this.commonlyList = resData;
    //     }
    //   });
    // },
    // 编辑
    editClick() {
      this.editshow = !this.editshow;
    },
    // 图标事件
    iconClick(item) {
      if (item.commonly == 0) {
        // 添加常用

        this.axiosPost('/baselibrary/commonlyTypeadd', {
          cid: item.id,
        }).then(res => {
          if (res.data.code == 1) {
            this.get();
            this.getcommonlyList();
          }
        });
      } else {
        //删除常用
        this.axiosPost('/baselibrary/commonlyTypedel', {
          id: item.id,
        }).then(res => {
          if (res.data.code == 1) {
            this.get();
            this.getcommonlyList();
          }
        });
      }
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.get();
    // this.getcommonlyList();
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