import { DataItem } from '.';
export default <DataItem[]>[
  {
    name: 'state',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/state',
      method: 'GET',
    },
    target: 'stateDataImpl',
    // path: 'EarlyWarningDetailsData/EarlyWarningDetailsDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'item',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/item',
      method: 'POST',
    },
    target: 'itemDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'page',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/page',
      method: 'GET',
    },
    target: 'pageDataImpl',
    // path: 'EarlyWarningDetailsData/EarlyWarningDetailsDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'bizdict',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict',
      method: 'PUT',
    },
    target: 'bizdictDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'bizdictDel',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/state',
      method: 'PUT',
    },
    target: 'bizdictDelDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'bizdictTemplate',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/dictTemplate',
      method: 'PUT',
    },
    target: 'bizdictTemplateDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'bizdictExport',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/data',
      method: 'GET',
    },
    target: 'bizdictExportDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'bizdictCache',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/cache',
      method: 'DELETE',
    },
    target: 'bizdictCacheDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'bizdictItemDel',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/item/state',
      method: 'PUT',
    },
    target: 'bizdictItemDelDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'bizdictAdd',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict',
      method: 'POST',
    },
    target: 'bizdictAddDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'bizdictImport',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/import/data',
      method: 'POST',
    },
    target: 'bizdictImportDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'subList',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/item/list',
      method: 'GET',
    },
    target: 'subListDataImpl',
    // path: 'EarlyWarningDetailsData/EarlyWarningDetailsDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
  {
    name: 'bizdictList',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/list',
      method: 'GET',
    },
    target: 'bizdictListDataImpl',
    // path: 'EarlyWarningDetailsData/EarlyWarningDetailsDataImpl',
    path: 'BizdictData/BizdictDataImpl',
  },
];