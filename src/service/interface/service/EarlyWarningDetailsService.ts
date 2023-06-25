import { IService } from '@ysstech-data/data-standard-types';
export interface EarlyWarningDetailsService extends IService {
  getSearchMessage<Params>(params?: Params): Promise<any>;
  search<Params>(params?: Params): Promise<any>;
  searchTab<Params>(params?: Params): Promise<any>;
  excel<Params>(params?: Params): Promise<any>;
  rightExcel<Params>(params?: Params): Promise<any>;
  getOpinionsInfo<Params>(params?: Params): Promise<any>;
  getPriceInfo<Params>(params?: Params): Promise<any>;
  getFinanceInfo<Params>(params?: Params): Promise<any>;
  getPositionInfo<Params>(params?: Params): Promise<any>;
  getSubjectDetailInfo<Params>(params?: Params): Promise<any>;
  distribution<Params>(params?: Params): Promise<any>;
  getEarlyWarnPools<Params>(params?: Params): Promise<any>;
  getEarlyWarnPlans<Params>(params?: Params): Promise<any>;
  getMainNames<Params>(params?: Params): Promise<any>;
  bizdictPosition<Params>(params?: Params): Promise<any>;
  bizdictDefault<Params>(params?: Params): Promise<any>;
  getPositionDetailInfo<Params>(params?: Params): Promise<any>;
  oneDayCreditPressure<Params>(params?: Params): Promise<any>;
  fiveDayCreditPressure<Params>(params?: Params): Promise<any>;
  thirtyDayCreditPressure<Params>(params?: Params): Promise<any>;
  exportPositions<Params>(params?: Params): Promise<any>;
  zhmcList<Params>(params?: Params): Promise<any>;
}
