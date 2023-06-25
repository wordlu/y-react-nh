import { IService } from '@ysstech-data/data-standard-types';
export interface CustomqueryService extends IService {
  queryData<Params>(params?: Params): Promise<any>;
  addDataSource<Params>(params?: Params): Promise<any>;
  updateDataSourceById<Params>(params?: Params): Promise<any>;
  deleteDataSourceById<Params>(params?: Params): Promise<any>;
  updateData<Params>(params?: Params): Promise<any>;
  getLogsByExecuteId<Params>(params?: Params): Promise<any>;
  getDataSourceDownList<Params>(params?: Params): Promise<any>;
  getDataSourceById<Params>(params?: Params): Promise<any>;
}
