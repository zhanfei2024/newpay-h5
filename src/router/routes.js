export const routesConfig = [
  {
    path: '/demo',
    component(resolve) {
      require.ensure(['../views/demo'], () => {
        resolve(require('../views/demo'))
      }, "demo");
    }
  },
  {
    name: 'action',
    path: '/action',
    component(resolve) {
      require.ensure(['../views/action'], () => {
        resolve(require('../views/action'))
      }, "action");
    }
  },
  {
    name: 'work',
    path: '/',
    component(resolve) {
      require.ensure(['../views/work'], () => {
        resolve(require('../views/work'))
      }, "work");
    }
  },
  {
    name: 'census',
    path: '/census',
    component(resolve) {
      require.ensure(['../views/census/census'], () => {
        resolve(require('../views/census/census'))
      }, "census");
    }
  },
  {
    path: '/demo-chart',
    component(resolve) {
      require.ensure(['../views/demo-chart'], () => {
        resolve(require('../views/demo-chart'))
      }, "demo-chart");
    }
  },
  {
    name: 'login',
    path: '/login',
    component(resolve) {
      require.ensure(['../views/login'], () => {
        resolve(require('../views/login'))
      }, "login");
    }
  },


  // 商户管理
  // 商户管理、一级
  {
    path: '/merchant',
    component(resolve) {
      require.ensure(['../views/merchant/merchant-manage'], () => {
        resolve(require('../views/merchant/merchant-manage'))
      }, "merchant-manage");
    }
  },
  // 商户审核详情、一级
  {
    path: '/merchant-apply',
    component(resolve) {
      require.ensure(['../views/merchant/merchant-apply'], () => {
        resolve(require('../views/merchant/merchant-apply'))
      }, 'merchant-apply');
    }
  },
  {
    path: '/merchant-check',
    component(resolve) {
      require.ensure(['../views/merchant/merchant-check'], () => {
        resolve(require('../views/merchant/merchant-check'))
      }, 'merchant-check');
    }
  },
  // 门店详情、一级
  {
    path: '/merchant-store',
    component(resolve) {
      require.ensure(['../views/merchant/merchant-store'], () => {
        resolve(require('../views/merchant/merchant-store'))
      }, "merchant-store");
    }
  },
  // 商户详情、一级
  {
    path: '/merchant-info',
    component(resolve) {
      require.ensure(['../views/merchant/merchant-info'], () => {
        resolve(require('../views/merchant/merchant-info'))
      }, "merchant-info");
    },
  },
  // 用户管理
  // 用户管理、一级
  {
    path: '/user',
    component(resolve) {
      require.ensure(['../views/user/user'], () => {
        resolve(require('../views/user/user'))
      }, "user");
    }
  },
  // 用户信息、一级
  {
    path: '/user-info',
    component(resolve) {
      require.ensure(['../views/user/user-info'], () => {
        resolve(require('../views/user/user-info'))
      }, "user-info");
    }
  },
  // 统计
  // 统计首页、一级
  {
    name: 'census',
    path: '/census',
    component(resolve) {
      require.ensure(['../views/census/census'], () => {
        resolve(require('../views/census/census'))
      }, "census");
    }
  },
  // 交易明细列表、一级
  {
    name: 'trade-info',
    path: '/trade-info',
    component(resolve) {
      require.ensure(['../views/census/trade-info'], () => {
        resolve(require('../views/census/trade-info'))
      }, "trade-info");
    }
  },
  // 收款详情、一级
  {
    name: 'trade-info-detail',
    path: '/trade-info-detail',
    component(resolve) {
      require.ensure(['../views/census/trade-info-detail'], () => {
        resolve(require('../views/census/trade-info-detail'))
      }, "trade-info-detail");
    }
  },
  // 交易总额
  {
    name: 'trade-count',
    path: '/trade-count',
    component(resolve) {
      require.ensure(['../views/census/trade-count'], () => {
        resolve(require('../views/census/trade-count'))
      }, "trade-count");
    }
  },
  // 商户收款排行、一级
  {
    name: 'merchant-rank',
    path: '/merchant-rank',
    component(resolve) {
      require.ensure(['../views/census/merchant/merchant-rank'], () => {
        resolve(require('../views/census/merchant/merchant-rank'))
      }, "merchant-rank");
    }
  },
  // 收款详情、一级
  {
    name: 'merchant-trade-detail',
    path: '/merchant-trade-detail',
    component(resolve) {
      require.ensure(['../views/census/merchant/merchant-trade-detail'], () => {
        resolve(require('../views/census/merchant/merchant-trade-detail'))
      }, "merchant-trade-detail");
    }
  },
  {
    name: 'merchant-trade-list',
    path: '/merchant-trade-list',
    component(resolve) {
      require.ensure(['../views/census/merchant/merchant-trade-list'], () => {
        resolve(require('../views/census/merchant/merchant-trade-list'))
      }, "merchant-trade-list");
    }
  },
  // 门店排行、一级
  {
    name: 'door-rank',
    path: '/door-rank',
    component(resolve) {
      require.ensure(['../views/census/doors/door-rank'], () => {
        resolve(require('../views/census/doors/door-rank'))
      }, "door-rank");
    }
  },
  {
    name: 'door-trade-detail',
    path: '/door-trade-detail',
    component(resolve) {
      require.ensure(['../views/census/doors/door-trade-detail'], () => {
        resolve(require('../views/census/doors/door-trade-detail'))
      }, "door-trade-detail");
    }
  },
  {
    name: 'door-trade-list',
    path: '/door-trade-list',
    component(resolve) {
      require.ensure(['../views/census/doors/door-trade-list'], () => {
        resolve(require('../views/census/doors/door-trade-list'))
      }, "door-trade-list");
    }
  },
]