import { DataItem } from '.';
export default <DataItem[]>[
  // 交易风险监控-表格查询
  {
    name: 'riskMonitoring',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/flowabilityRiskManagement/riskMonitoring',
      method: 'POST',
    },
    target: 'riskMonitoringDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'getMenu',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/flowabilityRiskManagement/getMenu',
      method: 'POST',
    },
    target: 'getMenuDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 交易风险监控-组合模糊查询
  {
    name: 'riskMonitoringFuzzySearchForPF',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/flowabilityRiskManagement/riskMonitoringFuzzySearchForPF',
      method: 'POST',
    },
    target: 'riskMonitoringFuzzySearchForPFDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 交易风险监控-导出
  {
    name: 'riskMonitoringExportExcel',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/flowabilityRiskManagement/riskMonitoringExportExcel',
      method: 'POST',
    },
    target: 'riskMonitoringExportExcelDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 流动性敞口-组合树类型
  {
    name: 'getPFTreeDownList',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/flowabilityRiskManagement/getPFTreeDownList',
      method: 'POST',
    },
    target: 'getPFTreeDownListDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 流动性敞口-树
  {
    name: 'getPFTree',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/flowabilityRiskManagement/getPFTree',
      method: 'POST',
    },
    target: 'getPFTreeDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 流动性敞口-查询
  {
    name: 'exposureCount',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/flowabilityRiskManagement/exposureCount',
      method: 'POST',
    },
    target: 'exposureCountDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 交易日推算接口
  {
    name: 'getExchangeDay',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/flowabilityRiskManagement/getExchangeDay',
      method: 'POST',
    },
    target: 'getExchangeDayDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 流动性敞口-导出
  {
    name: 'exposureCountExportExcel',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/flowabilityRiskManagement/import/exposureCountExportExcel',
      method: 'POST',
    },
    target: 'exposureCountExportExcelDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 压力测试方案-方案名称下拉
  {
    name: 'getSchemaList',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/stress/calculate/getSchemaList',
      method: 'POST',
    },
    target: 'getSchemaListDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 压力测试方案-查询
  {
    name: 'list',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/stress/schema/list',
      method: 'POST',
    },
    target: 'listDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 压力测试方案-新增
  {
    name: 'schemaAdd',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/stress/schema/add',
      method: 'POST',
    },
    target: 'schemaAddDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 压力测试方案-编辑
  {
    name: 'edit',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/stress/schema/edit',
      method: 'POST',
    },
    target: 'editDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 压力测试方案-指数下拉数据
  {
    name: 'dictQuery',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/dict/query/800001',
      method: 'GET',
    },
    target: 'dictQueryDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 压力测试方案-删除
  {
    name: 'schemaDelete',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/stress/schema/delete',
      method: 'POST',
    },
    target: 'schemaDeleteDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 压力测试-表格数据
  {
    name: 'calculateList',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/stress/calculate/list',
      method: 'POST',
    },
    target: 'calculateListDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 压力测试-抗压级别
  {
    name: 'dictQuery2',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/dict/query/800002',
      method: 'GET',
    },
    target: 'dictQuery2DataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 压力测试-组合是否合并
  {
    name: 'dictQuery3',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/dict/query/800003',
      method: 'GET',
    },
    target: 'dictQuery3DataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 压力测试-导出
  {
    name: 'calculateDownload',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/stress/calculate/download',
      method: 'POST',
    },
    target: 'calculateDownloadDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 组合树保存用户勾选记录
  {
    name: 'saveMarkPfTree',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/flowabilityRiskManagement/saveMarkPfTree',
      method: 'POST',
    },
    target: 'saveMarkPfTreeDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 获取组合树用户勾选记录
  {
    name: 'getMarkPfTree',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'financingRepurchase',
    value: {
      url: '/flowabilityRiskManagement/getMarkPfTree',
      method: 'GET',
    },
    target: 'getMarkPfTreeDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 报告查询-模板组合树类型
  {
    name: 'qryAllTemplateTree',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/ReportController/qryAllTemplateTree',
      method: 'GET',
    },
    target: 'qryAllTemplateTreeDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 报告查询-模板组合指定树
  {
    name: 'qryTemplateTree',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/ReportController/qryTemplateTree',
      method: 'GET',
    },
    target: 'qryTemplateTreeDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 报告查询-模板查询
  {
    name: 'sendSmartbi',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/ReportController/sendSmartbi',
      method: 'GET',
    },
    target: 'sendSmartbiDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 报告查询-smart获取参数
  {
    name: 'sendSmartbiDataResult',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/ReportController/sendSmartbiDataResult',
      method: 'GET',
    },
    target: 'sendSmartbiDataResultDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },

  // wodelu
  // 报告授权-用户
  {
    name: 'userQry',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/UserController/userQry',
      method: 'GET',
    },
    target: 'userQryDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  // 报告授权-角色
  {
    name: 'roleQry',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/RoleController/roleQry',
      method: 'GET',
    },
    target: 'roleQryDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'qryATemplateInfo',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/ReportController/qryATemplateInfo',
      method: 'GET',
    },
    target: 'qryATemplateInfoDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'authorizeUsers',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/ReportController/authorizeUsers',
      method: 'POST',
    },
    target: 'authorizeUsersDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'roleTemplateAssocition',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/ReportController/roleTemplateAssocition',
      method: 'POST',
    },
    target: 'roleTemplateAssocitionDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'roleAdd',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/RoleController/roleAdd',
      method: 'POST',
    },
    target: 'roleAddDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'roleUpdate',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/RoleController/roleUpdate',
      method: 'GET',
    },
    target: 'roleUpdateDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'roleDelete',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/RoleController/roleDelete',
      method: 'POST',
    },
    target: 'roleDeleteDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'reportTempSync',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/RoleController/reportTempSync',
      method: 'POST',
    },
    target: 'reportTempSyncDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'saveEnvariable',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/ReportController/saveEnvariable',
      method: 'POST',
    },
    target: 'saveEnvariableDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'queryEnvariable',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/ReportController/queryEnvariable',
      method: 'GET',
    },
    target: 'queryEnvariableDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'deleteTemplate',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/temp/deleteTemplate',
      method: 'POST',
    },
    target: 'deleteTemplateDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
  {
    name: 'createTemplate',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/temp/createTemplate',
      method: 'POST',
    },
    target: 'createTemplateDataImpl',
    path: 'FinancingRepurchaseData/FinancingRepurchaseDataImpl',
  },
];
