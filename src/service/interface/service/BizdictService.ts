import { IService } from '@ysstech-data/data-standard-types';
export interface CustomqueryService extends IService {
  state<Params>(params?: Params): Promise<any>;
  item<Params>(params?: Params): Promise<any>;
  page<Params>(params?: Params): Promise<any>;
  bizdict<Params>(params?: Params): Promise<any>;
  bizdictAdd<Params>(params?: Params): Promise<any>;
  bizdictImport<Params>(params?: Params): Promise<any>;
  bizdictDel<Params>(params?: Params): Promise<any>;
  bizdictCache<Params>(params?: Params): Promise<any>;
  bizdictItemDel<Params>(params?: Params): Promise<any>;
  subList<Params>(params?: Params): Promise<any>;
  bizdictList<Params>(params?: Params): Promise<any>;
  bizdictExport<Params>(params?: Params): Promise<any>;
  bizdictTemplate<Params>(params?: Params): Promise<any>;
}
