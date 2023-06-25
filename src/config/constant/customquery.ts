import { DataItem } from '.';
export default <DataItem[]>[
  {
    name: 'getDataSourceDownList',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/customquery/getDataSourceDownList',
      method: 'POST',
    },
    target: 'getDataSourceDownListDataImpl',
    // path: 'EarlyWarningDetailsData/EarlyWarningDetailsDataImpl',
    path: 'CustomqueryData/CustomqueryDataImpl',
  },
  {
    name: 'getDataSourceById',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/customquery/getDataSourceById',
      method: 'POST',
    },
    target: 'getDataSourceByIdDataImpl',
    path: 'CustomqueryData/CustomqueryDataImpl',
  },
  {
    name: 'addDataSource',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/customquery/addDataSource',
      method: 'POST',
    },
    target: 'addDataSourceDataImpl',
    path: 'CustomqueryData/CustomqueryDataImpl',
  },
  {
    name: 'queryData',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/customquery/queryData',
      method: 'POST',
    },
    target: 'queryDataDataImpl',
    path: 'CustomqueryData/CustomqueryDataImpl',
  },
  {
    name: 'updateDataSourceById',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/customquery/updateDataSourceById',
      method: 'POST',
    },
    target: 'updateDataSourceByIdDataImpl',
    path: 'CustomqueryData/CustomqueryDataImpl',
  },
  {
    name: 'deleteDataSourceById',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/customquery/deleteDataSourceById',
      method: 'POST',
    },
    target: 'deleteDataSourceByIdDataImpl',
    path: 'CustomqueryData/CustomqueryDataImpl',
  },
  {
    name: 'updateData',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/customquery/updateData',
      method: 'POST',
    },
    target: 'updateDataDataImpl',
    path: 'CustomqueryData/CustomqueryDataImpl',
  },
  {
    name: 'getLogsByExecuteId',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/customquery/getLogsByExecuteId',
      method: 'POST',
    },
    target: 'getLogsByExecuteIdDataImpl',
    path: 'CustomqueryData/CustomqueryDataImpl',
  }
];
