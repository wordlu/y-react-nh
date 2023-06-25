import { isArray } from '@ysstech-data/type-utils';
import Bean, { BeanList } from '../bean';
import { ICodeData, IService } from '@ysstech-data/data-standard-types';
import { gateWay } from '@/utils/gateWay';

// const baseUrl = '/yapi/api/abcAnalysis';
export interface BaseItem {
  name: string;
  type: 'data' | 'service';
  target: string;
  path: string;
}
export interface DataItem extends BaseItem {
  useBaseURL?: boolean;
  gatewayType?: string;
  value: {
    url: string;
    method: 'POST' | 'GET';
  };
}
export interface ServiceItem extends BaseItem {}
const getUrl = (item: DataItem) => {
  const { value, useBaseURL, gatewayType } = item;
  if (useBaseURL) {
    return `${gatewayType ? gateWay[gatewayType] : ''}${value.url}`;
  }
  return value.url;
};

const registeData = (item: DataItem, addData: Function, addOption: Function) => {
  const { name, target, value, path, useBaseURL } = item;
  const dataBean = `${name}Data`;
  const optionBean = `${name}Option`;
  addData(Bean[dataBean], require('../../service/data/' + path)[target]);
  addOption(Bean[optionBean], {
    ...value,
    // url: `${useBaseURL ? baseUrl : ''}${value.url}`,
    url: getUrl(item),
  });
};
const registeService = (item: ServiceItem, addService: Function) => {
  const { name, target, path } = item;
  addService(Bean[name], require('../../service/service/' + path)[target]);
};

export const autoBindContainer = (addData: Function, addOption: Function, addService: Function) => {
  BeanList.forEach(item => {
    const { type } = item;
    switch (type) {
      case 'data':
        registeData(item, addData, addOption);
        break;
      case 'service':
        registeService(item, addService);
        break;
      default:
        console.error("cannot caught 'type' !");
    }
  });
};
