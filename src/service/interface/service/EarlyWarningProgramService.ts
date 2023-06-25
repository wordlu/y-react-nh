import { IService } from '@ysstech-data/data-standard-types';
export interface EarlyWarningProgramService extends IService {
  querySchemeName<Params>(params?: Params): Promise<any>;
  getDetails<Params>(params?: Params): Promise<any>;
  getOptionsByType<Params>(params?: Params): Promise<any>;
  getPublicSentimentDictionary<Params>(params?: Params): Promise<any>;
  getPageList<Params>(params?: Params): Promise<any>;
  deleteEarlyWarnCase<Params>(params?: Params): Promise<any>;
  addEarlyWarnCase<Params>(params?: Params): Promise<any>;
  updateEarlyWarnCase<Params>(params?: Params): Promise<any>;
  getEmailList<Params>(params?: Params): Promise<any>;
  statelist<Params>(params?: Params): Promise<any>;
  creditPressurelist<Params>(params?: Params): Promise<any>;
  warningPool<Params>(params?: Params): Promise<any>;
  warningScheme<Params>(params?: Params): Promise<any>;
  alertEmailPage<Params>(params?: Params): Promise<any>;
  alertEmail<Params>(params?: Params): Promise<any>;
  recipient<Params>(params?: Params): Promise<any>;
  itemSimples<Params>(params?: Params): Promise<any>;
  alertEmailState<Params>(params?: Params): Promise<any>;
  emailPageList<Params>(params?: Params): Promise<any>;
  alertEmailFile<Params>(params?: Params): Promise<any>;
}
