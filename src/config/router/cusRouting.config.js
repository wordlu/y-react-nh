export default [
  // {
  //   value: '/test',
  //   id: '1222',
  //   render: () => import('@/pages/test-demo'),
  // },
  {
    value: '/abcAnalysis/home',
    id: 'home',
    text: '首页',
    render: () => import('@/pages/home'),
  },
  {
    value: '/abcAnalysis/publicSentiment',
    id: 'public-sentiment',
    text: '债券风险预警',
    children: [
      {
        value: '/abcAnalysis/publicSentiment/set-alert-pool',
        id: 'set-alert-pool',
        text: '预警池管理',
        render: () => import('@/pages/set-alert-pool'),
      },
      {
        value: '/abcAnalysis/publicSentiment/early-warning-details',
        id: 'early-warning-details',
        text: '预警详情',
        render: () => import('@/pages/early-warning-details'),
      },
      {
        value: '/abcAnalysis/publicSentiment/early-warning-program',
        id: 'early-warning-program',
        text: '预警方案',
        render: () => import('@/pages/early-warning-program'),
      },
      {
        value: '/abcAnalysis/publicSentiment/early-warning-email',
        id: 'early-warning-email',
        text: '邮件设置',
        render: () => import('@/pages/early-warning-email'),
      },
      {
        value: '/abcAnalysis/publicSentiment/task-management',
        id: 'task-management',
        text: '任务管理',
        render: () => import('@/pages/task-management'),
      },
      {
        value: '/abcAnalysis/publicSentiment/search-plan',
        id: 'search-plan',
        text: '报告查询',
        render: () => import('@/pages/search-plan'),
      },
      {
        value: '/abcAnalysis/publicSentiment/report-auth',
        id: 'search-plan',
        text: '报告授权',
        render: () => import('@/pages/report-auth'),
      },
    ],
  },
  {
    value: '/abcAnalysis/financingRepurchase',
    id: 'financing-repurchase',
    text: '融资回购',
    children: [{
        value: '/abcAnalysis/financingRepurchase/transaction-risk-monitoring',
        id: 'transaction-risk-monitoring',
        text: '融资回购交易风险监控',
        render: () => import('@/pages/transaction-risk-monitoring-new/index2'),
      },
      {
        value: '/abcAnalysis/financingRepurchase/transaction-risk-monitoring-1',
        id: 'transaction-risk-monitoring-1',
        text: '融资回购交易风险监控-旧',
        render: () => import('@/pages/transaction-risk-monitoring'),
      },
      {
        value: '/abcAnalysis/financingRepurchase/liquidity-exposure',
        id: 'liquidity-exposure',
        text: '流动性敞口统计',
        render: () => import('@/pages/liquidity-exposure/index2'),
      },
      {
        value: '/abcAnalysis/financingRepurchase/stressTestingProgram',
        id: 'stress-testing-program',
        text: '设置压力测试方案',
        render: () => import('@/pages/stress-testing-program'),
      },
      {
        value: '/abcAnalysis/financingRepurchase/stress-testing',
        id: 'stress-testing',
        text: '压力测试',
        render: () => import('@/pages/stress-testing/index2'),
      },
    ],
  },
  {
    value: '/abcAnalysis/userAuth',
    id: 'user-auth',
    text: '用户数据授权',
    children: [{
      value: '/abcAnalysis/userAuth/user-auth',
      id: 'user-data-auth',
      text: '数据授权',
      render: () => import('@/pages/user-auth')
    }]
  },
  {
    value: '/abcAnalysis/customquery',
    id: 'customquery',
    text: '用户数据源',
    children: [
      {
        value: '/abcAnalysis/customquery/user-data-source',
        id: 'user-data-source',
        text: '自定义数据查询',
        render: () => import('@/pages/user-data-source')
      },
      {
        value: '/abcAnalysis/customquery/user-data-source-add',
        id: 'user-data-source-add',
        text: '自定义更新',
        render: () => import('@/pages/user-data-source-add')
      }
    ]
  },
  {
    value: '/abcAnalysis/dictionaryEntry',
    id: 'dictionary-entry',
    text: '字典项',
    children: [{
      value: '/abcAnalysis/dictionaryEntry/dictionary-entry',
      id: 'dictionary-entry',
      text: '字典项',
      render: () => import('@/pages/dictionary-entry')
    }]
  },
  {
    value: '/404',
    id: 'not-found',
    render: () => import('@/pages/not-found'),
  },
];
