import { IService } from '@ysstech-data/data-standard-types';
export interface FinancingRepurchaseService extends IService {
  riskMonitoring<Params>(params?: Params): Promise<any>;
  getMenu<Params>(params?: Params): Promise<any>;
  getPFTree<Params>(params?: Params): Promise<any>;
  getPFTreeDownList<Params>(params?: Params): Promise<any>;
  exposureCount<Params>(params?: Params): Promise<any>;
  getExchangeDay<Params>(params?: Params): Promise<any>;
  exposureCountExportExcel<Params>(params?: Params): Promise<any>;
  riskMonitoringFuzzySearchForPF<Params>(params?: Params): Promise<any>;
  riskMonitoringExportExcel<Params>(params?: Params): Promise<any>;
  getSchemaList<Params>(params?: Params): Promise<any>;
  list<Params>(params?: Params): Promise<any>;
  edit<Params>(params?: Params): Promise<any>;
  dictQuery<Params>(params?: Params): Promise<any>;
  schemaAdd<Params>(params?: Params): Promise<any>;
  schemaDelete<Params>(params?: Params): Promise<any>;
  calculateList<Params>(params?: Params): Promise<any>;
  dictQuery2<Params>(params?: Params): Promise<any>;
  dictQuery3<Params>(params?: Params): Promise<any>;
  calculateDownload<Params>(params?: Params): Promise<any>;
  saveMarkPfTree<Params>(params?: Params): Promise<any>;
  getMarkPfTree<Params>(params?: Params): Promise<any>;
  qryAllTemplateTree<Params>(params?: Params): Promise<any>;
  qryTemplateTree<Params>(params?: Params): Promise<any>;
  sendSmartbi<Params>(params?: Params): Promise<any>;
  sendSmartbiDataResult<Params>(params?: Params): Promise<any>;
  userQry<Params>(params?: Params): Promise<any>;
  roleQry<Params>(params?: Params): Promise<any>;
  qryATemplateInfo<Params>(params?: Params): Promise<any>;
  authorizeUsers<Params>(params?: Params): Promise<any>;
  roleTemplateAssocition<Params>(params?: Params): Promise<any>;
  roleAdd<Params>(params?: Params): Promise<any>;
  roleUpdate<Params>(params?: Params): Promise<any>;
  roleDelete<Params>(params?: Params): Promise<any>;
  reportTempSync<Params>(params?: Params): Promise<any>;
  saveEnvariable<Params>(params?: Params): Promise<any>;
  queryEnvariable<Params>(params?: Params): Promise<any>;
  deleteTemplate<Params>(params?: Params): Promise<any>;
  createTemplate<Params>(params?: Params): Promise<any>;
}