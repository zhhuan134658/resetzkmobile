const mainmixins = {
  data() {
    return {
      newspaceid: '',
      publicspaceId: '',
      publicfileId: '',
      addfile: false,
      roleshow: false,
      newfilename: '',
      movetreeData: '',
      creatshow: false,
      resetnameshow: false, //重命名diao
      file_extension: '',
      newName: '',
      actionshow: false,
      loading: false, // 是否处在加载状态
      finished: false, // 是否已加载完成
      error: false, // 是否加载失败
      proList: [], // 列表
      page: 1, // 分页
      page_size: 10, // 每页条数
      total: 0, // 数据总条数

      searchValue: '',
    };
  },
  watch: {},
  methods: {
    //获取列表
    getSpaceList() {
      this.searchValue = '';

      this.finished = false; // 清空列表数据
      this.loading = true; // 将 loading 设置为 true，表示处于加载状态
      this.page = 1; // 分页数赋值为1
      this.proList = []; // 清空数组
      this.onLoad(); // 重新加载数据
    },
    // 获取列表数据方法
    onSearch() {
      this.finished = false; // 清空列表数据
      this.loading = true; // 将 loading 设置为 true，表示处于加载状态
      this.page = 1; // 分页数赋值为1
      this.proList = []; // 清空数组
      this.onLoad(); // 重新加载数据
    },
    // 被 @load调用的方法
    onLoad() {
      // 若加载条到了底部
      let timer = setTimeout(() => {
        // 定时器仅针对本地数据渲染动画效果,项目中axios请求不需要定时器
        this.getTableList(); // 调用上面方法,请求数据
        this.page++; // 分页数加一
        this.finished && clearTimeout(timer); //清除计时器
      }, 100);
    },
    // 加载失败调用方法
    onRefresh() {
      this.finished = false; // 清空列表数据
      this.loading = true; // 将 loading 设置为 true，表示处于加载状态
      this.page = 1; // 分页数赋值为1
      this.proList = []; // 清空数组
      this.onLoad(); // 重新加载数据
    },
  },
};
export default mainmixins;
