import Vue from 'vue';
import VueRouter from 'vue-router';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);
const routes = [
  //-----------首页
  {
    path: '/',
    redirect: '/home',
    component: () => import('../pages/home.vue'),
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/homePage/homePageindex',
    component: () => import('../pages/home.vue'),
    children: [
      //首页
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('../pages/homePage/index.vue'),
        redirect: '/homePage/homePageindex',
        children: [
          {
            path: '/homePage/homePageindex', //首页-我的工作
            name: 'homePageindex',
            component: () => import('../pages/homePage/appIndex.vue'),
          },
        ],
      },
      //项目看板

      {
        path: '/projectkanban',
        name: 'projectkanban',
        redirect: '/projectkanban/projectkanban',
        component: () => import('../pages/projectkanban/index.vue'),
        children: [
          //首页
          {
            path: '/projectkanban/projectkanban',
            name: 'projectkanban',
            component: () => import('../pages/projectkanban/projectkanban.vue'),
          },

          {
            path: '/projectkanban/proKbench',
            name: 'proKbench',
            component: () =>
              import('../pages/projectkanban/proKbench/index.vue'),
          },
        ],
      },
      //工作台

      {
        path: '/workbench',
        name: 'workbench',
        redirect: '/workbench/workbench',
        component: () => import('../pages/workbench/index.vue'),
        children: [
          {
            path: '/workbench/workbenchpage',
            name: 'workbenchpage',
            component: () => import('../pages/workbench/workbenchpage.vue'),
          },
          {
            path: '/workbench/allapplication',
            name: 'allapplication',
            component: () => import('../pages/workbench/allapplication.vue'),
          },
          //任务
          {
            path: '/task/taskindex',
            name: 'taskindex',
            component: () => import('../pages/task/taskindex.vue'),
          },
          //任务列表
          {
            path: '/task/tasklist',
            name: 'tasklist',
            component: () => import('../pages/task/tasklist.vue'),
          },
          //任务新建
          {
            path: '/task/taskcreat',
            name: 'taskcreat',
            component: () => import('../pages/task/taskcreat.vue'),
          },
          //任务详情
          {
            path: '/task/taskinfo',
            name: 'taskinfo',
            component: () => import('../pages/task/taskinfo.vue'),
          },
          //工程文档-最近文件
          {
            path: '/engineeringDocument/latelyFile',
            name: 'latelyFile',
            component: () =>
              import('../pages/engineeringDocument/latelyFile.vue'),
          },
          //回收站
          {
            path: '/engineeringDocument/recycleBin',
            name: 'recycleBin',
            component: () =>
              import('../pages/engineeringDocument/recycleBin.vue'),
          },
          //我的收藏
          {
            path: '/engineeringDocument/myCollection',
            name: 'myCollection',
            component: () =>
              import('../pages/engineeringDocument/myCollection.vue'),
          },
          //文件
          {
            path: '/engineeringDocument/DocumenFile',
            name: 'DocumenFile',
            component: () =>
              import('../pages/engineeringDocument/DocumenFile.vue'),
          },
          //规范图集
          {
            path: '/engineeringDocument/standardAtlas',
            name: 'standardAtlas',
            component: () =>
              import('../pages/engineeringDocument/standardAtlas.vue'),
          },
          //私人文件
          {
            path: '/engineeringDocument/privateDocuments',
            name: 'privateDocuments',
            component: () =>
              import('../pages/engineeringDocument/privateDocuments.vue'),
          },
          {
            path: '/engineeringDocument/commenu',
            name: 'commenu',
            component: () => import('../pages/engineeringDocument/commenu.vue'),
          },
        ],
      },

      //中心

      {
        path: '/setpage',
        name: 'setpage',
        redirect: '/setpage/setpageindex',
        component: () => import('../pages/setpage/index.vue'),
        children: [
          {
            path: '/setpage/setpageindex',
            name: 'setpageindex',
            component: () => import('../pages/setpage/setpageindex.vue'),
          },
          //仓库
          {
            path: '/setpage/warehouseindex',
            name: 'warehouseindex',
            component: () => import('../pages/setpage/warehouse/index.vue'),
          },
          {
            path: '/setpage/warehousecreat',
            name: 'warehousecreat',
            component: () => import('../pages/setpage/warehouse/creat.vue'),
          },
          //往來單位
          {
            path: '/setpage/intercUnitindex',
            name: 'intercUnitindex',
            component: () => import('../pages/setpage/intercUnit/index.vue'),
          },
          {
            path: '/setpage/intercUnitcreat',
            name: 'intercUnitcreat',
            component: () => import('../pages/setpage/intercUnit/creat.vue'),
          },
          //物资基础库
          {
            path: '/setpage/basicLibraryindex',
            name: 'basicLibraryindex',
            component: () => import('../pages/setpage/basicLibrary/index.vue'),
          },
          {
            path: '/setpage/basicLibrarycreat',
            name: 'basicLibrarycreat',
            component: () => import('../pages/setpage/basicLibrary/creat.vue'),
          },
          //自定义
          {
            path: '/setpage/customindex',
            name: 'customindex',
            component: () => import('../pages/setpage/custom/index.vue'),
          },
          {
            path: '/setpage/customcreat',
            name: 'customcreat',
            component: () => import('../pages/setpage/custom/creat.vue'),
          },
          //意见反馈
          {
            path: '/setpage/feedback',
            name: 'feedback',
            component: () => import('../pages/setpage/feedback.vue'),
          },
          //消息通知
          {
            path: '/setpage/message',
            name: 'message',
            component: () => import('../pages/setpage/message.vue'),
          },
          //角色成员
          {
            path: '/setpage/rolemembers',
            name: 'rolemembers',
            component: () =>
              import('../pages/setpage/rolemembers/rolemembers.vue'),
          },
          {
            path: '/setpage/peoplelist',
            name: 'peoplelist',
            component: () =>
              import('../pages/setpage/rolemembers/peoplelist.vue'),
          },
          //搜索
          {
            path: '/setpage/comSearch',
            name: 'comSearch',
            component: () => import('../components/comSearch.vue'),
          },
        ],
      },
    ],
  },
];
const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === '/error' || to.path === '/errorOut') {
    next();
  } else {
    let token = sessionStorage.getItem('errcode');
    if (token == 2 || token == 0) {
      next('/error');
    } else if (token == 3) {
      next('/errorOut');
    } else {
      next();
    }
  }
});
export default router;
