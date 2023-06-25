import { IService } from '@ysstech-data/data-standard-types';
export interface SetAlertPoolService extends IService {
  getDictionary<Params>(params?: Params): Promise<any>;
  getPrimaryList<Params>(params?: Params): Promise<any>;
  doFocus<Params>(params?: Params): Promise<any>;
  alertPoolRemove<Params>(params?: Params): Promise<any>;
  queryAlertPool<Params>(params?: Params): Promise<any>;
  addAlertPool<Params>(params?: Params): Promise<any>;
  updateAlertPool<Params>(params?: Params): Promise<any>;
  alertPoolCollect<Params>(params?: Params): Promise<any>;
  deleteAlertPool<Params>(params?: Params): Promise<any>;
  getDetailList<Params>(params?: Params): Promise<any>;
  setAlertPoolExcel<Params>(params?: Params): Promise<any>;
  earlywarnpoolTemplate<Params>(params?: Params): Promise<any>;
  earlywarnpoolInfo<Params>(params?: Params): Promise<any>;
  saveBatchByUpload<Params>(params?: Params): Promise<any>;
  validAlertPoolName<Params>(params?: Params): Promise<any>;
  getConditions<Params>(params?: Params): Promise<any>;
  getCompositeTreeConditions<Params>(params?: Params): Promise<any>;
  getAlertPoolDetail<Params>(params?: Params): Promise<any>;
  updateAlertPoolCondition<Params>(params?: Params): Promise<any>;
  getAlertPoolDisplayCondition<Params>(params?: Params): Promise<any>;
}
